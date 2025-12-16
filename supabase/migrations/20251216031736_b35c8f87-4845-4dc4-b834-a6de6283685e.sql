-- Add accuracy tracking columns to blog_posts table for enhanced fact-checking
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS regulatory_accuracy integer DEFAULT 100,
ADD COLUMN IF NOT EXISTS safety_accuracy integer DEFAULT 100,
ADD COLUMN IF NOT EXISTS requires_review boolean DEFAULT false;

-- Add comment explaining the columns
COMMENT ON COLUMN public.blog_posts.regulatory_accuracy IS 'Score 0-100 for CFR citation accuracy from fact-checker';
COMMENT ON COLUMN public.blog_posts.safety_accuracy IS 'Score 0-100 for safety-critical data accuracy from fact-checker';
COMMENT ON COLUMN public.blog_posts.requires_review IS 'Flag indicating post needs human review due to critical issues';