-- Add heat stress video to Lesson 6: Hazmat Spills & Severe Weather Response
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "title": "Heat Stress Prevention",
      "description": "Understanding the progression from heat cramps to heat exhaustion to life-threatening heat stroke, and the critical importance of hydration and rest breaks.",
      "url": "https://www.youtube.com/watch?v=bzL57Y5gyM0"
    }
  ]'::jsonb
)
WHERE id = '1e9529ab-eede-42cb-a219-6419276591c9';

-- Add stress management and psychological first aid videos to Lesson 7
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "title": "Tactical / Box Breathing for Stress Management",
      "description": "Learn the \"Box Breathing\" technique to manage the fight-or-flight response during emergencies. This tactical breathing method helps maintain calm and clear decision-making under pressure.",
      "url": "https://www.youtube.com/watch?v=tLCESVdkjDc"
    },
    {
      "type": "video",
      "title": "Psychological First Aid: Look, Listen, Link",
      "description": "The \"Look, Listen, Link\" model for supporting traumatized coworkers after an emergency incident, providing crucial psychological support in the aftermath of a crisis.",
      "url": "https://www.youtube.com/watch?v=r4cd9Vm8DAE"
    }
  ]'::jsonb
)
WHERE id = 'c1a774bb-fe3b-4140-87e0-84d0d3baa12c';