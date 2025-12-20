-- Update Travis Atwell (atwellspaving@gmail.com) to admin role
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '73fef1bc-0df9-4aa7-b7ef-f70a1dd26579';