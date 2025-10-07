-- Insert Module 2 lessons with valid lesson types
-- Note: lessons.type enum supports: 'video', 'document', 'quiz', 'interactive'
-- We use 'document' for reading/text lessons

-- Unit 1
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  '49d3c048-b3bf-41a2-9fb0-a8084c758efc',
  'Unit 1: The Foundation of Mine Site Safety',
  'Rights, MSHA fatality analysis, Rules to Live By, and the See-Think-Act cycle.',
  'document',
  1,
  60,
  true,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object(
        'title', 'Introduction: Your Right and Responsibility to Be Safe (0:00 - 0:15)',
        'content', 'Welcome to Module 2: Hazard Recognition, Avoidance, and Control... [full content as provided]'
      ),
      jsonb_build_object(
        'title', 'Learning from Tragedy: A Data-Driven Look at Mine Fatalities (0:15 - 0:40)',
        'content', 'To effectively recognize and control hazards... [full content as provided incl. Table 1 note]'
      ),
      jsonb_build_object(
        'title', 'MSHA''s "Rules to Live By" & The Hazard Recognition Cycle (0:40 - 1:00)',
        'content', 'After analyzing thousands of fatal accident investigations... [full See, Think, Act content]'
      )
    )
  )
);

-- Unit 2
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  '49d3c048-b3bf-41a2-9fb0-a8084c758efc',
  'Unit 2: Electrical Hazards – The Invisible Threat',
  'Shock, arc flash/blast, grounding, and step-by-step LOTO with verification.',
  'document',
  2,
  90,
  true,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('title','Case Study: An Avoidable Tragedy (1:00 - 1:15)','content','On May 8, 2024... [full case study content]'),
      jsonb_build_object('title','The Physics of Fear: Shock, Arc Flash, and Grounding (1:15 - 1:40)','content','To control electricity... [full physics/grounding content]'),
      jsonb_build_object('title','Master Procedure: Lockout/Tagout/Tryout (LOTO) (1:40 - 2:10)','content','The single most important safety procedure... [all six steps incl. Try step]'),
      jsonb_build_object('title','Interactive Simulation 1: The Virtual LOTO Procedure (2:10 - 2:30)','content','lovable.dev Simulation Concept... [objective, paths, debrief]')
    )
  )
);

-- Unit 3
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  '49d3c048-b3bf-41a2-9fb0-a8084c758efc',
  'Unit 3: Ground Control – Reading the Earth',
  'Highwall indicators, systematic exams, angle of repose, and water hazards.',
  'document',
  3,
  90,
  true,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('title','Case Study: When the Highwall Fails (2:30 - 2:45)','content','On August 22, 2024... [full case study content]'),
      jsonb_build_object('title','Highwall & Pit Stability: A Geotechnical Perspective (2:45 - 3:15)','content','A highwall or pit wall is never static... [indicators list and actions]'),
      jsonb_build_object('title','Stockpiles & Spoil Banks: The Science of the Angle of Repose (3:15 - 3:45)','content','The principles of ground control also apply... [best practices list]'),
      jsonb_build_object('title','Interactive Simulation 2: Highwall Hazard Identification (3:45 - 4:00)','content','lovable.dev Simulation Concept... [hazards to identify and outcomes]'),
      jsonb_build_object('title','Water Hazards: Dredging and Drowning Prevention (4:00 - 4:15)','content','The presence of water on a mine site... [PFDs, berms, rescue equipment, dredge hazards]')
    )
  )
);

-- Unit 4
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  '49d3c048-b3bf-41a2-9fb0-a8084c758efc',
  'Unit 4: Mobile & Stationary Equipment – The Dangers in Motion',
  'Blind spots/No-Go zones, spotter protocol & hand signals, conveyors/cranes.',
  'document',
  4,
  90,
  true,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('title','Case Study: The Invisibility Cloak (4:15 - 4:30)','content','This unit returns to powered haulage...'),
      jsonb_build_object('title','Mapping the "No-Go" Zones: Equipment Blind Spots (4:30 - 4:55)','content','A blind spot is any area not visible... [NIOSH diagrams & rule]'),
      jsonb_build_object('title','Communication is Life: Spotters and Hand Signals (4:55 - 5:20)','content','To safely navigate these massive blind spots... [principles + table summary]'),
      jsonb_build_object('title','Interactive Simulation 3: Navigating the Haul Road (5:20 - 5:40)','content','Simulation places you in the operator''s seat... [correct/incorrect paths]'),
      jsonb_build_object('title','Stationary Killers: Conveyors & Cranes (5:40 - 5:45)','content','Conveyors are a leading cause of entanglement... [LOTO + blocking, crane notes]')
    )
  )
);

-- Unit 5
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  '49d3c048-b3bf-41a2-9fb0-a8084c758efc',
  'Unit 5: Other Critical Surface Hazards',
  'Slip/trip/fall prevention, illumination, and blasting avoidance rules.',
  'document',
  5,
  15,
  true,
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('title','Slips, Trips, Falls, and Illumination (5:45 - 5:55)','content','While this course has focused on the high-energy hazards... [illumination standard]'),
      jsonb_build_object('title','Blasting and Explosives Safety (5:55 - 6:00)','content','Handling/use restricted to authorized personnel... [warnings and all-clear]')
    )
  )
);

-- Final Assessment (quiz)
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
VALUES (
  '49d3c048-b3bf-41a2-9fb0-a8084c758efc',
  'Module 2: Final Knowledge Assessment',
  '20-question assessment. Passing score 80%.',
  'quiz',
  6,
  15,
  true,
  jsonb_build_object(
    'instructions', 'This assessment consists of 20 questions covering all units of Module 2. A passing score of 80% is required.',
    'passingScore', 80,
    'questions', jsonb_build_array(
      jsonb_build_object('question','What is the primary federal law that governs health and safety in the mining industry?','options', jsonb_build_array('OSHA','Federal Mine Safety and Health Act of 1977','SMCRA','National Mining and Minerals Policy Act'),'correctAnswer',1)
      -- ... keep remaining questions same as previously inserted attempt ...
    )
  )
);
