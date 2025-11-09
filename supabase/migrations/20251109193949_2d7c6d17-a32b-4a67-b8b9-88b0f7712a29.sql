-- Add video sections to Unit 1: The Foundation of Mine Site Safety
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{sections}',
  (
    SELECT jsonb_agg(
      CASE 
        -- Add first video after introduction section (around index 1)
        WHEN idx = 1 THEN 
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Miners Rights and Responsibilities',
            'url', 'https://www.youtube.com/watch?v=eEj1JOVu_eY',
            'description', 'These rights are the foundation of your safety. This video reviews your critical, legally-protected rights and responsibilities as defined by MSHA.'
          )
        -- Add second video after the data-driven section (around index 3)
        WHEN idx = 3 THEN
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: MSHA Rules To Live By',
            'url', 'https://www.youtube.com/watch?v=9J-Y-9Y_19E',
            'description', 'These are the existing, mandatory standards that are most critical to your survival. Watch this video explaining the ''Rules to Live By'' initiative.'
          )
        ELSE elem
      END
    )
    FROM jsonb_array_elements(content_data->'sections') WITH ORDINALITY AS t(elem, idx)
  )
)
WHERE id = 'ede59cf6-f358-4555-9d2c-152c3e0ff669';

-- Add video sections to Unit 2: Electrical Hazards
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{sections}',
  (
    SELECT jsonb_agg(
      CASE 
        -- Add arc flash video after physics section (around index 2)
        WHEN idx = 2 THEN 
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Electrical Arc Flash Demonstration',
            'url', 'https://www.youtube.com/watch?v=h-OLFRC_08Y',
            'description', 'Reading about 35,000 degrees is one thing. Understanding that power visually is another. This demonstration shows the destructive, explosive force of an electrical arc flash.'
          )
        -- Add LOTO video before the interactive simulation (around index 4)
        WHEN idx = 4 THEN
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Lockout Tagout (LOTO) Step by Step',
            'url', 'https://www.youtube.com/watch?v=V15VMOGZOrE',
            'description', 'This video provides a clear, step-by-step demonstration of a proper LOTO procedure. Pay close attention to each step.'
          )
        ELSE elem
      END
    )
    FROM jsonb_array_elements(content_data->'sections') WITH ORDINALITY AS t(elem, idx)
  )
)
WHERE id = '3e000d41-213a-488a-ac2c-f215374517c1';

-- Add video section to Unit 3: Ground Control
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{sections}',
  (
    SELECT jsonb_agg(
      CASE 
        -- Add stockpile safety video after angle of repose section (around index 3)
        WHEN idx = 3 THEN 
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: OSSGA - Stockpile Safety',
            'url', 'https://www.youtube.com/watch?v=TsYd9A-A8',
            'description', 'This video demonstrates why undercutting the toe of a stockpile is extremely dangerous and explains safe loading and dumping procedures.'
          )
        ELSE elem
      END
    )
    FROM jsonb_array_elements(content_data->'sections') WITH ORDINALITY AS t(elem, idx)
  )
)
WHERE id = '51f53ca2-bb20-4fee-8f3f-dddbf77dbffc';