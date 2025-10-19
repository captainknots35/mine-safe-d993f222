-- Update Module 5 duration to reflect actual lesson times (105+60+60+60 = 285 minutes)
UPDATE modules
SET duration_minutes = 285,
    updated_at = now()
WHERE id = '45b22bbb-77c0-439e-8d9b-e2ed1f824329';