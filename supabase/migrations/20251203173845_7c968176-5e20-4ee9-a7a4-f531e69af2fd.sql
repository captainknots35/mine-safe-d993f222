-- Remove the existing cron job
SELECT cron.unschedule(1);

-- Create new cron job that runs 3 times daily (9 AM, 1 PM, 5 PM UTC)
SELECT cron.schedule(
  'generate-blog-posts-3x-daily',
  '0 9,13,17 * * *',
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