-- Schedule Federal Register fetcher (6 AM UTC daily)
SELECT cron.schedule(
  'fetch-federal-register-daily',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url:='https://yqpqfjmyghoehxzuevrz.supabase.co/functions/v1/fetch-federal-register',
    headers:=jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcHFmam15Z2hvZWh4enVldnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNTU2MDIsImV4cCI6MjA2OTgzMTYwMn0.nBGGlLXYbVijnIBsfvUvypZm5ZBKv9eE_uvfeOUQlDA'
    ),
    body:='{}'::jsonb
  );
  $$
);