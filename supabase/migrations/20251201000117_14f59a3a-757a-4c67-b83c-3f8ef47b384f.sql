-- Add unique constraint for enrollments (user_id, course_id) for upsert operations
ALTER TABLE public.enrollments 
ADD CONSTRAINT enrollments_user_course_unique UNIQUE (user_id, course_id);

-- Also allow users to update their own enrollment status
CREATE POLICY "Users can update own enrollment status"
ON public.enrollments
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);