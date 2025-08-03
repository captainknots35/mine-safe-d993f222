-- Fix search path security issues by setting proper search_path for functions

-- Fix get_user_role function
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS app_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT role FROM public.user_roles WHERE user_roles.user_id = $1 LIMIT 1;
$$;

-- Fix has_role function  
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    );
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;