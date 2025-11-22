-- Add videos to Module 4 Lesson 4: Controls, PPE & Emergency Response
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=7kwW_1wz0g0",
      "title": "Hierarchy of Controls Explained",
      "description": "Learn the strategic framework for controlling hazards, from elimination to PPE as the last line of defense."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=2xyNg2s1u7c",
      "title": "Respirator Fit Testing",
      "description": "Visualizes the difference between qualitative and quantitative testing, reinforcing the scientific rigor behind respirator requirements."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=rHmMzcBWt1Q",
      "title": "How to Use an Emergency Eyewash Station",
      "description": "Learn the proper technique: hold the eyelids open with your thumbs and roll your eyeballs for 15 minutes to save your vision."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=FjVvjjTH3KE",
      "title": "Chemical Spill Response Procedures",
      "description": "Demonstrates the practical use of spill kits and the importance of PPE during cleanup operations."
    }
  ]'::jsonb
)
WHERE id = 'f4a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c';