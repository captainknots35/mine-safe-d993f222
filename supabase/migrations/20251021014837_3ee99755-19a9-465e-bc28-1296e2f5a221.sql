-- Add P.A.S.S. method video to Lesson 5: Emergency Preparedness
UPDATE lessons
SET 
  content_data = jsonb_build_object(
    'content', (content_data->>'content') || E'\n\n---\n\n## Firefighting Training Video\n\n### How to Use a Fire Extinguisher: The P.A.S.S. Method\n\n**VIDEO: Fire Safety Training - P.A.S.S. Method**\nURL: https://www.youtube.com/watch?v=7EMJMPfQy9Q\n*Description: "Knowing how to use an extinguisher correctly is a critical skill. Let''s watch a demonstration of the P.A.S.S. method."*\n\nThe P.A.S.S. method:\n- **P**ull the pin\n- **A**im at the base of the fire\n- **S**queeze the handle\n- **S**weep from side to side\n\nThis visual demonstration builds both competence and confidence for using a fire extinguisher in an emergency.\n\n### Mine Emergency Evacuation\n\n**VIDEO: Mine Emergency Escape Procedures**\nURL: https://www.youtube.com/watch?v=3X_3iJ1FsV8\n*Description: Watch proper emergency evacuation procedures in a mine setting.*'
  )
WHERE id = '2131fb79-d2c0-4e83-aabb-78eebfd4be30';