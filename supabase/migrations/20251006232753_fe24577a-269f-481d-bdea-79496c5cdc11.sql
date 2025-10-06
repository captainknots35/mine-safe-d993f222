-- Update Module 1 Competency Check with full assessment
UPDATE lessons
SET 
  content_data = jsonb_build_object(
    'questions', jsonb_build_array(
      jsonb_build_object(
        'id', 1,
        'question', 'What is the primary federal law that governs all health and safety in the mining industry?',
        'options', jsonb_build_array(
          'The Occupational Safety and Health Act (OSHA)',
          'The Federal Mine Safety and Health Act of 1977',
          'The Surface Mining Control and Reclamation Act',
          'The National Mining and Minerals Policy Act'
        ),
        'correctAnswer', 1
      ),
      jsonb_build_object(
        'id', 2,
        'question', 'If you believe an assigned task is unsafe, what is the correct first step to take under your "Right to Refuse Unsafe Work"?',
        'options', jsonb_build_array(
          'Immediately leave the mine site and report it to MSHA',
          'Discuss the issue with your coworkers to see if they agree',
          'Immediately notify your supervisor of the condition and your refusal to work',
          'Complete the task slowly and carefully, documenting the hazards'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 3,
        'question', 'According to the line of authority, who is the first person you should report a hazard to?',
        'options', jsonb_build_array(
          'The Miners'' Representative',
          'The MSHA inspector',
          'The mine operator''s main office',
          'Your immediate supervisor'
        ),
        'correctAnswer', 3
      ),
      jsonb_build_object(
        'id', 4,
        'question', 'What is the term for a raised mound of material built along the outer edge of a haul road to prevent vehicles from going over the edge?',
        'options', jsonb_build_array(
          'A highwall',
          'A bench',
          'A berm',
          'A stockpile'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 5,
        'question', 'In a surface stone quarry, the extraction process involves drilling holes and using explosives to fracture the rock. This creates a primary hazard related to:',
        'options', jsonb_build_array(
          'Drowning and water safety',
          'Flyrock and ground control',
          'Chemical exposure from processing',
          'Engulfment in fine, powdery material'
        ),
        'correctAnswer', 1
      ),
      jsonb_build_object(
        'id', 6,
        'question', 'What is the most significant and immediate hazard specific to shell dredging operations?',
        'options', jsonb_build_array(
          'Respiratory dust from crushing',
          'Electrical hazards from the processing plant',
          'Risks related to water, such as drowning and vessel stability',
          'Highwall collapse'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 7,
        'question', 'What is the primary purpose of the Lockout/Tagout (LOTO) procedure?',
        'options', jsonb_build_array(
          'To track equipment maintenance schedules',
          'To ensure a machine''s energy source is isolated and cannot be accidentally restarted during maintenance',
          'To signal that a machine is operating at full capacity',
          'To clean equipment while it is still running to save time'
        ),
        'correctAnswer', 1
      ),
      jsonb_build_object(
        'id', 8,
        'question', 'Powered haulage is a leading cause of fatal accidents. When driving a small vehicle on a haul road, you should always:',
        'options', jsonb_build_array(
          'Assume the haul truck driver can see you',
          'Drive as fast as possible to get out of the way',
          'Yield the right-of-way to larger equipment',
          'Flash your headlights to signal you are passing'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 9,
        'question', 'What is the main health hazard associated with inhaling fine dust from drilling, crushing, and blasting stone, sand, and gravel?',
        'options', jsonb_build_array(
          'Hearing loss',
          'Skin irritation',
          'Silicosis, an incurable lung disease',
          'Heat stress'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 10,
        'question', 'A workplace examination must be conducted by a competent person at the beginning of each shift. What is the purpose of this examination?',
        'options', jsonb_build_array(
          'To measure the amount of material mined',
          'To check for hazardous conditions before work begins',
          'To assign daily tasks to the miners',
          'To complete production paperwork'
        ),
        'correctAnswer', 1
      ),
      jsonb_build_object(
        'id', 11,
        'question', 'A supervisor who knowingly allows a violation of a safety standard to occur can be held personally accountable because they are considered a(n):',
        'options', jsonb_build_array(
          'Miners'' Representative',
          'Competent Person',
          'Agent of the Company',
          'MSHA Inspector'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 12,
        'question', 'If you see that a physical guard is missing from a piece of moving machinery, what should you do?',
        'options', jsonb_build_array(
          'Try to fix it yourself',
          'Operate the machine carefully, avoiding the moving parts',
          'Report it immediately and do not operate the equipment until the guard is replaced',
          'Make a note to report it at the end of your shift'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 13,
        'question', 'In the event of a site-wide evacuation, what is the first thing you should do after ceasing work?',
        'options', jsonb_build_array(
          'Go to the parking lot to get in your car',
          'Find your supervisor to ask what happened',
          'Proceed via a designated escape route to the assembly point for a head count',
          'Attempt to fight the fire or correct the emergency'
        ),
        'correctAnswer', 2
      ),
      jsonb_build_object(
        'id', 14,
        'question', 'Until a new miner has completed the full 24 hours of required training, they must:',
        'options', jsonb_build_array(
          'Only work in the mine office',
          'Work under the close observation of an experienced miner',
          'Read the MSHA regulations manual',
          'Only perform cleaning and housekeeping duties'
        ),
        'correctAnswer', 1
      ),
      jsonb_build_object(
        'id', 15,
        'question', 'What is the term for the unexcavated, cliff-like face of a pit or quarry?',
        'options', jsonb_build_array(
          'The toe',
          'The ramp',
          'The sump',
          'The highwall'
        ),
        'correctAnswer', 3
      )
    ),
    'passingScore', 80,
    'instructions', 'Please select the best answer for each of the following questions based on the information provided in the training module. You must score 80% or higher to pass.'
  ),
  description = 'A 15-question comprehensive assessment covering all topics from Module 1: Introduction to Work Environment, Line of Authority, Hazard Recognition, Avoidance, and Control.'
WHERE id = '837699c1-afe6-41d7-84a5-d1fac0fb7539';