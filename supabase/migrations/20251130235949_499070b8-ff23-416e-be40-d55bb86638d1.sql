-- Create table to track course purchases
CREATE TABLE public.course_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  stripe_payment_intent_id text,
  stripe_session_id text,
  amount_cents integer NOT NULL,
  currency text DEFAULT 'usd',
  status text NOT NULL DEFAULT 'pending',
  purchased_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE public.course_purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases"
ON public.course_purchases
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own purchases (for pending status)
CREATE POLICY "Users can create own purchases"
ON public.course_purchases
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Service role can update purchases (for webhook)
CREATE POLICY "Service role can update purchases"
ON public.course_purchases
FOR UPDATE
USING (true);

-- Admins can view all purchases
CREATE POLICY "Admins can view all purchases"
ON public.course_purchases
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Create index for faster lookups
CREATE INDEX idx_course_purchases_user_course ON public.course_purchases(user_id, course_id);
CREATE INDEX idx_course_purchases_stripe_session ON public.course_purchases(stripe_session_id);