-- Enable required extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule daily blog post generation at 9 AM UTC
SELECT cron.schedule(
  'generate-daily-blog-post',
  '0 9 * * *',
  $$
  SELECT net.http_post(
    url:='https://yqpqfjmyghoehxzuevrz.supabase.co/functions/v1/generate-blog-post',
    headers:=jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcHFmam15Z2hvZWh4enVldnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTU2MDIsImV4cCI6MjA2OTgzMTYwMn0.nBGGlLXYbVijnIBsfvUvypZm5ZBKv9eE_uvfeOUQlDA'
    ),
    body:='{}'::jsonb
  );
  $$
);