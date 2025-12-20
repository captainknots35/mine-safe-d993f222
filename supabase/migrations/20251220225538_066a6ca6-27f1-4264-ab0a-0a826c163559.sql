-- Add admin role to focalpointshopify@gmail.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('492f5ca4-7232-43c9-9e4f-66f5dd436540', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;