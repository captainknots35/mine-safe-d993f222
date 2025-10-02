-- Grant admin role to master profile
-- First, get the user_id for jccstull23@gmail.com and update/insert admin role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'jccstull23@gmail.com'
ON CONFLICT (user_id, role) 
DO UPDATE SET role = 'admin'::app_role;