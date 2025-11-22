-- Add videos to Module 4 Lesson 3: Physical Hazards
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=ddermx9hJ7k",
      "title": "Hearing Conservation - MSHA Part 62",
      "description": "Covers proper insertion of earplugs using the Roll, Pull, Hold method and hearing conservation requirements."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=hfXMxicjMQY",
      "title": "How to Adjust Your Air Ride Seat",
      "description": "Your seat is PPE for your spine. Learn the proper 30-second setup that can save you from a lifetime of back pain."
    },
    {
      "type": "video",
      "videoUrl": "https://www.youtube.com/watch?v=3ZcSoWxdQP4",
      "title": "Heat Illness Prevention",
      "description": "Distinguishes between Heat Exhaustion and Heat Stroke. Learn to recognize when a medical emergency requires immediate 911 response."
    }
  ]'::jsonb
)
WHERE id = 'f3a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c';