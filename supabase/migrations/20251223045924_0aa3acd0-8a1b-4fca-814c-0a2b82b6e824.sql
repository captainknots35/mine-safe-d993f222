-- Update Christopher Stull (jccstull30@gmail.com) to admin role
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '0ff2c90b-d4bf-4a90-baae-083c4855aa71';