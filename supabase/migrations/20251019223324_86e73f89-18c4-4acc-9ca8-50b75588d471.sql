-- Remove the inline Final Knowledge Check section from Lesson 4 (Controls, PPE & Emergency Response)
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{content}',
  to_jsonb(
    regexp_replace(
      content_data->>'content',
      E'### Final Knowledge Check((.|\n|\r)*?)### Resources for a Healthier Career',
      '### Resources for a Healthier Career',
      'g'
    )
  )
),
updated_at = now()
WHERE id = 'f4a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c';