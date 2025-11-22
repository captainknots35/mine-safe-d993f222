-- Add historical disaster videos to Lesson 1: Introduction
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "title": "Final Seconds - How Methane Gas Killed 439 Miners (Monongah Disaster)",
      "description": "Documentary reconstruction of the 1907 Monongah Mine Disaster, illustrating the lethal synergy between methane gas and coal dust that led to the creation of the U.S. Bureau of Mines.",
      "url": "https://www.youtube.com/watch?v=BMD05_Pg5_8"
    },
    {
      "type": "video",
      "title": "99 Miners Trapped Underground: The Farmington Mine Disaster",
      "description": "The 1968 Farmington Mine Disaster that catalyzed the Federal Coal Mine Health and Safety Act of 1969. This explosion was felt 12 miles away and led to modern emergency evacuation protocols.",
      "url": "https://www.youtube.com/watch?v=qQTF-uAPfNQ"
    },
    {
      "type": "video",
      "title": "The Sunshine Mine Disaster 1972",
      "description": "A silver mine disaster where 91 miners died primarily from carbon monoxide poisoning, leading to the Federal Mine Safety and Health Act of 1977 that unified all mining under one law.",
      "url": "https://www.youtube.com/watch?v=zBLFXTFHi0Q"
    }
  ]'::jsonb
)
WHERE id = '85f9580e-db35-44d8-9d32-00e715e183bd';

-- Add ground control and water safety videos to Lesson 2
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{sections}',
  COALESCE(content_data->'sections', '[]'::jsonb) || 
  '[
    {
      "type": "video",
      "title": "Highwall Hazard Recognition (MSHA)",
      "description": "MSHA training video depicting a veteran truck driver mentoring a new employee on identifying visual cues like loose rock, tension cracks, and overhangs that signal ground failure risk.",
      "url": "https://www.youtube.com/watch?v=Ok2p6cUe_sM"
    },
    {
      "type": "video",
      "title": "Stockpile Safety and Dumping Procedures",
      "description": "Demonstrates the safe interaction between haul trucks and loaders, reinforcing the critical \"dump short and push over\" rule and the dangers of undercutting stockpiles.",
      "url": "https://www.youtube.com/watch?v=d4c4OwTKmJM"
    },
    {
      "type": "video",
      "title": "5 Things You Should Know To Stay Safe in a Trench",
      "description": "Department of Labor video providing visualization of mandatory trench protections: Slope, Bench, Shore, and Shield. Critical for understanding why you never enter a trench deeper than five feet without protection.",
      "url": "https://www.youtube.com/watch?v=zV-sVn_AUEM"
    }
  ]'::jsonb
)
WHERE id = '9ec4eeeb-c4ae-47a1-8bcc-fea5a9991def';