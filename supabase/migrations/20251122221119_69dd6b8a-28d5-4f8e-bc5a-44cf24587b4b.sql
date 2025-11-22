-- Add videos to Module 4 Lesson 1: Introduction & Hazard Communication
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=WrnHZK9GhlM",
      "title": "What is MSHA?",
      "description": "Understanding the Mine Safety and Health Administration and its role in protecting miners."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=eEj1JOVu_eY",
      "title": "Miners Rights and Responsibilities",
      "description": "Learn about your federal rights as a miner and your responsibilities in maintaining a safe workplace."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=fbYpC7kc4PE",
      "title": "Hazard Communication with GHS Training",
      "description": "Comprehensive overview of the Globally Harmonized System of Classification and Labelling of Chemicals."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=hrkoe8ISehI",
      "title": "GHS Pictograms Explained",
      "description": "Detailed explanation of each GHS pictogram and what hazards they represent."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=EnCvbw9qsKo",
      "title": "How to Read a Safety Data Sheet (SDS)",
      "description": "Step-by-step guide to understanding and using Safety Data Sheets for chemical safety."
    }
  ]'::jsonb
)
WHERE id = 'f1a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c';