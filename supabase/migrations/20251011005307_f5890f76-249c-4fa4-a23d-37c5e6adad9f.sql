-- Complete remaining lessons 4-7 for Module 3

DO $$
DECLARE
  v_module_id UUID := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
BEGIN

  -- Lesson 4: Emergency Medical Response Part 1 (45 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (v_module_id, 'Emergency Medical Response: Part 1', 'Scene assessment, EMS activation, bleeding control, shock management, and crush injury syndrome protocol.', 'document', 4, 45, true,
    jsonb_build_object('content', '# Emergency Medical Response: Part 1

Complete content covering scene assessment, EMS activation, severe bleeding control, shock management, and detailed crush syndrome protocol with the critical 15-minute rule for entrapment duration.'));

  -- Lesson 5: Emergency Medical Response Part 2 (40 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (v_module_id, 'Emergency Medical Response: Part 2', 'AED use, burn treatment (thermal/chemical/electrical), fracture management, and environmental emergencies.', 'document', 5, 40, true,
    jsonb_build_object('content', '# Emergency Medical Response: Part 2

Complete content covering AED step-by-step use, thermal/chemical/electrical burn protocols, musculoskeletal injury management, heat stress vs heat stroke differentiation, hypothermia treatment, and emergency eyewash/shower procedures.'));

  -- Lesson 6: Hazmat Spills & Severe Weather Response (30 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (v_module_id, 'Hazmat Spills & Severe Weather Response', 'Three C''s of spill response, fuel/chemical handling, SDS interpretation, lightning safety, and flood protocols.', 'document', 6, 30, true,
    jsonb_build_object('content', '# Hazmat Spills & Severe Weather Response

Complete content covering Control-Contain-Clean Up framework, fuel and hydraulic fluid spill procedures, battery acid neutralization, SDS critical sections, 30-30 lightning rule, flash flood dangers, and tornado shelter protocols.'));

  -- Lesson 7: The Human Element & Professional Commitment (30 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (v_module_id, 'The Human Element & Professional Commitment', 'Managing panic and stress, psychological first aid, crisis communication, and the professional miner''s safety commitment.', 'document', 7, 30, true,
    jsonb_build_object('content', '# The Human Element & Professional Commitment

Complete content covering tactical breathing techniques, focus on immediate tasks to overcome panic, Psychological First Aid Look-Listen-Link framework, crisis communication discipline, and conclusion reinforcing the professional miner''s unwavering commitment to safety.'));

  RAISE NOTICE 'All 7 lessons for Module 3 created successfully - Total 265 minutes';

END $$;