-- Add Lesson 8: Emergency Response Simulations to Module 3
INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data, content_url)
VALUES (
  'c024a928-306b-4e68-9d07-14d3bd759a0a',
  'Emergency Response Simulations',
  'Apply your knowledge through interactive emergency scenario simulations. Practice decision-making under pressure in realistic mining emergency situations.',
  'interactive',
  8,
  45,
  true,
  jsonb_build_object(
    'introduction', 'These simulations test your ability to respond correctly to emergency situations. You will face realistic scenarios requiring quick thinking and proper application of emergency protocols.',
    'simulations', jsonb_build_array(
      jsonb_build_object(
        'id', 'ground_control_emergency',
        'title', 'Ground Control Emergency Response',
        'description', 'A roof fall has occurred in an active area. Identify hazards, initiate evacuation, and coordinate emergency response.',
        'scenario_type', 'ground_failure',
        'learning_objectives', jsonb_build_array(
          'Recognize signs of ground instability',
          'Implement emergency evacuation procedures',
          'Coordinate with emergency response team',
          'Establish exclusion zones'
        )
      ),
      jsonb_build_object(
        'id', 'water_inundation_drill',
        'title', 'Water Inundation Emergency Drill',
        'description', 'Water is rapidly entering the mine. You have limited time to evacuate and account for all personnel.',
        'scenario_type', 'water_emergency',
        'learning_objectives', jsonb_build_array(
          'Execute 90-second escape protocol',
          'Navigate to primary and secondary escape routes',
          'Account for all personnel',
          'Communicate with surface command'
        )
      ),
      jsonb_build_object(
        'id', 'fire_response_simulation',
        'title', 'Mine Fire Response',
        'description', 'A fire has been detected in the conveyor belt area. Assess the situation and take appropriate action.',
        'scenario_type', 'fire_emergency',
        'learning_objectives', jsonb_build_array(
          'Identify fire classification',
          'Apply P.A.S.S. technique correctly',
          'Determine when to fight vs. evacuate',
          'Activate fire suppression systems'
        )
      ),
      jsonb_build_object(
        'id', 'medical_emergency_triage',
        'title', 'Mass Casualty Medical Triage',
        'description', 'Multiple injuries have occurred. Prioritize victims and provide appropriate first aid.',
        'scenario_type', 'medical_emergency',
        'learning_objectives', jsonb_build_array(
          'Perform START triage protocol',
          'Recognize crush syndrome symptoms',
          'Apply appropriate first aid',
          'Coordinate with emergency medical services'
        )
      ),
      jsonb_build_object(
        'id', 'hazmat_incident',
        'title', 'Hazardous Materials Incident',
        'description', 'A chemical spill has occurred. Identify the material, contain the spill, and protect personnel.',
        'scenario_type', 'hazmat',
        'learning_objectives', jsonb_build_array(
          'Apply the Three C''s (Control, Contain, Clean)',
          'Reference SDS for proper response',
          'Establish hot, warm, and cold zones',
          'Use appropriate PPE'
        )
      ),
      jsonb_build_object(
        'id', 'severe_weather_response',
        'title', 'Severe Weather Emergency',
        'description', 'Severe weather is approaching the site. Make critical decisions to protect workers.',
        'scenario_type', 'weather',
        'learning_objectives', jsonb_build_array(
          'Apply 30-30 lightning rule',
          'Implement shelter-in-place procedures',
          'Monitor weather conditions',
          'Resume operations safely'
        )
      )
    ),
    'completion_requirements', jsonb_build_object(
      'minimum_score', 80,
      'required_simulations', 4,
      'time_limit_minutes', 45
    ),
    'instructions', 'Complete at least 4 of the 6 emergency simulations with a minimum score of 80% on each. Each simulation presents a realistic emergency scenario where you must make critical decisions under time pressure. Your choices will be evaluated based on MSHA regulations and industry best practices.'
  ),
  NULL
);