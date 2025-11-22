-- Add videos to Module 4 Lesson 2: Airborne Contaminants
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=vWQnS2zOMEg",
      "title": "Silicosis: A Preventable Disease",
      "description": "Features interviews with miners suffering from silicosis. The sound of their labored breathing provides a visceral understanding of this preventable disease."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=naYoG5fUipw",
      "title": "Diesel Particulate Matter Health Effects",
      "description": "Explains how diesel exhaust particles act as a delivery system for carcinogens and the serious health risks they pose."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=MH8wZLiCFwM",
      "title": "Engineering Controls for Silica Dust",
      "description": "Demonstrates how engineering controls like skirtboards and water sprays contain dust at conveyor transfer points."
    }
  ]'::jsonb
)
WHERE id = 'f2a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c';