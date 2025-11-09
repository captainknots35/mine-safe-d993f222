-- Remove three specific video sections from lesson 3
UPDATE lessons 
SET content_data = jsonb_set(
  content_data,
  '{sections}',
  (
    SELECT jsonb_agg(section)
    FROM jsonb_array_elements(content_data->'sections') AS section
    WHERE NOT (
      section->>'type' = 'video' AND (
        section->>'videoUrl' = 'https://www.youtube.com/watch?v=TzcKBwS58Kg' OR
        section->>'videoUrl' = 'https://www.youtube.com/watch?v=2F8rS7t6hAw' OR
        section->>'videoUrl' = 'https://www.youtube.com/watch?v=rQiHzUwJW_8'
      )
    )
  )
)
WHERE id = 'b2c3d4e5-f6a7-8901-bcde-112233445566';