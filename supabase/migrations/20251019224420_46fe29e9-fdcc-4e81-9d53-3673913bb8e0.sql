-- Create Lesson 4: Comprehensive Final Assessment (50-question interactive quiz)
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
  'd4e5f6a7-b8c9-4444-5555-666677778888',
  '45b22bbb-77c0-439e-8d9b-e2ed1f824329',
  'Comprehensive Course Assessment',
  'Final assessment covering all five modules - 80% passing score required',
  'quiz',
  4,
  60,
  true,
  jsonb_build_object(
    'passingScore', 80,
    'instructions', 'This assessment verifies your comprehension of critical safety and health information from all modules. You must score 80% (40 out of 50 questions) to pass. Take your time and answer each question carefully.',
    'questions', jsonb_build_array(
      jsonb_build_object('id', 'q1', 'question', 'What is the primary purpose of a berm on a haul road?', 'type', 'multiple-choice', 'options', jsonb_build_array(jsonb_build_object('id', 'a', 'text', 'To mark the edge of the road for visibility'), jsonb_build_object('id', 'b', 'text', 'To act as a safety barrier to help prevent vehicles from going over the edge'), jsonb_build_object('id', 'c', 'text', 'To drain water away from the road surface'), jsonb_build_object('id', 'd', 'text', 'To serve as a temporary stockpile for overburden')), 'correctAnswer', 'b', 'explanation', 'A berm''s primary function is to serve as a physical barrier to prevent overtravel.'),
      jsonb_build_object('id', 'q2', 'question', 'Under the Mine Act, who holds the primary responsibility for preventing health and safety hazards at a mine?', 'type', 'multiple-choice', 'options', jsonb_build_array(jsonb_build_object('id', 'a', 'text', 'The individual miner'), jsonb_build_object('id', 'b', 'text', 'The Mine Safety and Health Administration (MSHA)'), jsonb_build_object('id', 'c', 'text', 'The mine operator, with the participation of miners'), jsonb_build_object('id', 'd', 'text', 'The designated Miners'' Representative')), 'correctAnswer', 'c', 'explanation', 'The Mine Act establishes a partnership where operators have the primary responsibility, with the active participation of miners.'),
      jsonb_build_object('id', 'q3', 'question', 'The unexcavated, cliff-like face of a pit or quarry is known as the:', 'type', 'multiple-choice', 'options', jsonb_build_array(jsonb_build_object('id', 'a', 'text', 'Bench'), jsonb_build_object('id', 'b', 'text', 'Toe'), jsonb_build_object('id', 'c', 'text', 'Crest'), jsonb_build_object('id', 'd', 'text', 'Highwall')), 'correctAnswer', 'd', 'explanation', 'The vertical or near-vertical face of a pit is the highwall.'),
      jsonb_build_object('id', 'q4', 'question', 'A floating platform that uses a suction line to excavate sand and gravel from the bottom of a water body is called a:', 'type', 'multiple-choice', 'options', jsonb_build_array(jsonb_build_object('id', 'a', 'text', 'Dragline'), jsonb_build_object('id', 'b', 'text', 'Scraper'), jsonb_build_object('id', 'c', 'text', 'Dredge'), jsonb_build_object('id', 'd', 'text', 'Hydraulic shovel')), 'correctAnswer', 'c', 'explanation', 'A dredge is a floating plant that excavates material from under water.'),
      jsonb_build_object('id', 'q5', 'question', 'Which of the following must be displayed on the main mine bulletin board by law?', 'type', 'multiple-choice', 'options', jsonb_build_array(jsonb_build_object('id', 'a', 'text', 'Production schedules'), jsonb_build_object('id', 'b', 'text', 'A list of all employee phone numbers'), jsonb_build_object('id', 'c', 'text', 'MSHA citations and the notification of the Miners'' Representative'), jsonb_build_object('id', 'd', 'text', 'The company''s financial statements')), 'correctAnswer', 'c', 'explanation', 'The mine bulletin board is a required location for posting official MSHA information, including citations and representative notices.')
    )
  )
) ON CONFLICT (id) DO NOTHING;