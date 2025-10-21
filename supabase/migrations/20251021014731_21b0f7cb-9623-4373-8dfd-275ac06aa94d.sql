-- Add video content to Lesson 1: Welcome & Introduction - Miners' Rights
UPDATE lessons
SET 
  type = 'video',
  content_data = jsonb_build_object(
    'videoUrl', 'https://www.youtube.com/watch?v=g0r_fQ6U8qo',
    'videoTitle', 'Miner''s Rights and Responsibilities',
    'videoDescription', 'The Mine Act gives you a powerful set of rights. This short video provides a clear overview of what those rights are and why they are important for your safety.',
    'additionalContent', (content_data->>'content')
  )
WHERE id = '68f1c721-2cee-42e4-8c85-62d4af9ffb43';

-- Add video to Lesson 2: Anatomy of a Surface Mine
UPDATE lessons
SET 
  type = 'video',
  content_data = jsonb_build_object(
    'videoUrl', 'https://www.youtube.com/watch?v=LD-vNX6_QdE',
    'videoTitle', 'Anatomy of a Quarry - Aerial Tour',
    'videoDescription', 'Experience an aerial drone tour of a surface mine to understand the key features: pit, highwall, bench, berm, and haul roads. This visual tour helps you build a mental map of the mine site.',
    'additionalContent', (content_data->>'content')
  )
WHERE id = 'a1b2c3d4-e5f6-7890-abcd-001122334455';