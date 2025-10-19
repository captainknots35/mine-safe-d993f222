-- Add Final Knowledge Check as an interactive quiz lesson (Lesson 6 for Module 4)
INSERT INTO lessons (
  id,
  module_id,
  title,
  description,
  type,
  order_index,
  duration_minutes,
  is_required,
  content_data
) VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'e8a3c5b2-7d9e-4f1a-8b2c-3e4f5a6b7c8d',
  'Final Knowledge Check',
  'Test your practical application of the concepts covered in this module',
  'quiz',
  6,
  20,
  true,
  jsonb_build_object(
    'passingScore', 70,
    'questions', jsonb_build_array(
      jsonb_build_object(
        'id', 'q1',
        'question', 'Scenario 1 (Chemical Hazard Communication): A contractor delivers a 55-gallon drum of a new cleaning solvent to the maintenance shop. The label is torn and mostly unreadable, and there is no SDS immediately available. What are the first three steps you should take?',
        'type', 'multiple-choice',
        'options', jsonb_build_array(
          jsonb_build_object('id', 'a', 'text', 'Immediately start using the solvent since it''s just a cleaning product'),
          jsonb_build_object('id', 'b', 'text', 'Do not handle or use the chemical; isolate the drum in a secure area; immediately report to supervisor to obtain SDS and proper labeling'),
          jsonb_build_object('id', 'c', 'text', 'Try to read what''s left of the label and use the chemical carefully'),
          jsonb_build_object('id', 'd', 'text', 'Store the drum with other chemicals until someone figures out what it is')
        ),
        'correctAnswer', 'b',
        'explanation', 'This demonstrates an understanding of the core principles of HazCom. You must never use an unidentified or improperly labeled chemical. The correct response is to: 1) Do not handle or use the chemical. 2) Isolate the drum in a secure area to prevent others from using it. 3) Immediately report the situation to a supervisor so that an SDS can be obtained and the drum can be properly labeled before it is put into service.'
      ),
      jsonb_build_object(
        'id', 'q2',
        'question', 'Scenario 2 (Airborne Hazard Control): You are operating a front-end loader to move crushed stone from a stockpile to a hopper. The loader has an enclosed cab, but you notice a significant amount of dust entering the cab through a broken door seal. What does this situation represent, and what should you do?',
        'type', 'multiple-choice',
        'options', jsonb_build_array(
          jsonb_build_object('id', 'a', 'text', 'This is normal - just wear a dust mask and continue working'),
          jsonb_build_object('id', 'b', 'text', 'This represents a failure of engineering controls; stop work, move equipment to safe location, report defective seal to maintenance and supervisor'),
          jsonb_build_object('id', 'c', 'text', 'Keep working but breathe through your shirt'),
          jsonb_build_object('id', 'd', 'text', 'Close the windows and turn on the air conditioning')
        ),
        'correctAnswer', 'b',
        'explanation', 'This represents a failure of an engineering control (the enclosed cab filtration system). You should stop work in the dusty area as soon as it is safe to do so, move the equipment to a safe location, and report the defective door seal to maintenance and your supervisor. Continuing to work would mean relying solely on a respirator (PPE), which violates the principle of the Hierarchy of Controls. The engineering control must be repaired first.'
      ),
      jsonb_build_object(
        'id', 'q3',
        'question', 'Scenario 3 (Emergency First Aid): During a water treatment process, a coworker accidentally splashes a corrosive flocculant into their eyes. They are in pain and cannot see clearly. What is the single most critical and immediate first aid action you should take?',
        'type', 'multiple-choice',
        'options', jsonb_build_array(
          jsonb_build_object('id', 'a', 'text', 'Have them lie down and cover their eyes with a clean cloth'),
          jsonb_build_object('id', 'b', 'text', 'Call for emergency medical help first before doing anything'),
          jsonb_build_object('id', 'c', 'text', 'Immediately flush eyes with clean water for at least 15 minutes while holding eyelids open'),
          jsonb_build_object('id', 'd', 'text', 'Try to neutralize the chemical with another substance')
        ),
        'correctAnswer', 'c',
        'explanation', 'The single most critical and immediate action is to immediately flush the eyes with clean, lukewarm water for at least 15 minutes, holding the eyelids open to ensure thorough rinsing. Speed is essential - every second counts in reducing the severity of a chemical eye burn. Do not waste time looking for a neutralizing agent. Call for emergency medical help while continuing the flushing process, or have someone else call.'
      )
    )
  )
);

-- Update Module 4 duration to include the new 20-minute quiz
UPDATE modules 
SET duration_minutes = duration_minutes + 20,
    updated_at = now()
WHERE id = 'e8a3c5b2-7d9e-4f1a-8b2c-3e4f5a6b7c8d';