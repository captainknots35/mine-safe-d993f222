-- Add video sections to Unit 4: Mobile & Stationary Equipment
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{sections}',
  (
    SELECT jsonb_agg(
      CASE 
        -- Add blind spot video after blind spot section (around index 1)
        WHEN idx = 1 THEN 
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: NIOSH Haul Truck Blind Spot Demonstration',
            'url', 'https://www.youtube.com/watch?v=C2-a1NAiJ1U',
            'description', 'The diagrams show you the ''No-Go'' zones. Now see for yourself what the operator sees—and more importantly, what they don''t see.'
          )
        -- Add hand signals video after spotter section (around index 3)
        WHEN idx = 3 THEN
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Standardized Hand Signals for Mobile Equipment',
            'url', 'https://www.youtube.com/watch?v=h-OLFRC_08Y',
            'description', 'This video demonstrates the common, standardized hand signals for directing heavy equipment. Watch how clear and deliberate each signal is.'
          )
        -- Add conveyor safety video after conveyor section (around index 6)
        WHEN idx = 6 THEN
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Working in Proximity to Belt Conveyors',
            'url', 'https://www.youtube.com/watch?v=k-s-x-1k8Y',
            'description', 'Never underestimate a conveyor. Entanglement can happen in a fraction of a second. This video highlights the specific dangers of working near conveyors.'
          )
        -- Add power line safety video after crane section (around index 7)
        WHEN idx = 7 THEN
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Overhead Power Line Safety',
            'url', 'https://www.youtube.com/watch?v=uPoVNVdnRF4',
            'description', 'When operating cranes or equipment with booms, the deadliest hazard is often silent and high above you. This video shows the critical importance of maintaining safe distances from overhead power lines.'
          )
        ELSE elem
      END
    )
    FROM jsonb_array_elements(content_data->'sections') WITH ORDINALITY AS t(elem, idx)
  )
)
WHERE id = '9707a80c-7f00-448e-af40-11fbc42bc4fa';

-- Add video section to Unit 5: Other Critical Surface Hazards
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{sections}',
  (
    SELECT jsonb_agg(
      CASE 
        -- Add slips/trips/falls video after illumination section (around index 1)
        WHEN idx = 1 THEN 
          jsonb_build_object(
            'type', 'video',
            'title', 'Video: Slips, Trips, and Falls',
            'url', 'https://www.youtube.com/watch?v=uA8EBDITxHs',
            'description', 'This MSHA video reviews these common, everyday hazards and stresses the importance of good housekeeping and being alert to your surroundings.'
          )
        ELSE elem
      END
    )
    FROM jsonb_array_elements(content_data->'sections') WITH ORDINALITY AS t(elem, idx)
  )
)
WHERE id = '17b24e54-5997-4591-9d60-c9aace8506b8';