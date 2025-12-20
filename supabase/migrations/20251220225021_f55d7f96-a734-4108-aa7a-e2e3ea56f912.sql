-- Enable the pg_net extension for making HTTP requests from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create function to notify on new user signup
CREATE OR REPLACE FUNCTION public.notify_new_signup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  payload jsonb;
BEGIN
  -- Build the payload
  payload := jsonb_build_object(
    'type', 'INSERT',
    'table', 'profiles',
    'record', jsonb_build_object(
      'id', NEW.id,
      'first_name', NEW.first_name,
      'last_name', NEW.last_name,
      'email', NEW.email,
      'created_at', NEW.created_at
    )
  );

  -- Make async HTTP request to edge function
  PERFORM net.http_post(
    url := 'https://yqpqfjmyghoehxzuevrz.supabase.co/functions/v1/notify-new-signup',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key', true)
    ),
    body := payload
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send signup notification: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger on profiles table
DROP TRIGGER IF EXISTS on_new_profile_notify ON public.profiles;
CREATE TRIGGER on_new_profile_notify
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_signup();