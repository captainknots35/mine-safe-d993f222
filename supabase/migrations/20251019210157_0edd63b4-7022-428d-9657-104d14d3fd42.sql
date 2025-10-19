-- Update Lesson 8 with comprehensive simulation content from PDF
UPDATE lessons
SET content_data = jsonb_build_object(
  'introduction', E'# Transforming Compliance into Competence\n\nThese interactive simulations leverage consequential narrative design to bridge the gap between knowing emergency procedures and performing them correctly under pressure. You will face realistic, high-stress situations within a safe, virtual environment where you can experience the direct consequences of your choices—both positive and negative.\n\n## The Power of Consequential Simulation\n\nIn an emergency where seconds count, the ability to recall a regulation is secondary to the instinct to perform the correct action calmly and decisively. These simulations forge genuine competence by allowing you to learn from mistakes without suffering real-world harm.',
  'learning_objectives', jsonb_build_array(
    'Make critical safety decisions under time pressure',
    'Apply MSHA regulations in realistic emergency scenarios',
    'Recognize subtle warning signs of imminent hazards',
    'Override instinctive responses with protocol-based decision-making',
    'Experience consequences of both correct and incorrect actions'
  ),
  'scenarios', jsonb_build_array(
    jsonb_build_object(
      'id', 'S2',
      'title', 'Ground Failure: Highwall Collapse',
      'type', 'ground_failure',
      'duration_minutes', 10,
      'description', E'## Establishing the Stakes: Lessons from MSHA Fatality Reports\n\nGround failure incidents are often not unforeseeable "acts of nature," but the direct result of unsafe work practices that become normalized over time. MSHA investigations reveal a tragic pattern: a fatal incident involving a front-end loader operator engulfed by a 55 to 60-foot highwall collapse was attributed to the highwall being severely undercut by digging into its base—described as a "normal mining method at the mine," demonstrating dangerous normalization of deviance.\n\nOther fatalities occurred because miners failed to conduct adequate workplace examinations during periods of increased risk, such as after heavy rain or freeze-thaw cycles, which critically weaken slope stability.\n\n## Your Mission\n\nYou will face situations where the unsafe but common practice appears as a plausible choice. This simulation tests whether you default to risky routine or adhere to strict, life-saving safety protocol.',
      'objectives', jsonb_build_array(
        'Recognize signs of ground instability and tension cracks',
        'Implement immediate evacuation procedures',
        'Report hazardous conditions using proper protocol',
        'Refuse unsafe work assignments involving unstable ground',
        'Establish exclusion zones around ground failure hazards'
      )
    ),
    jsonb_build_object(
      'id', 'S3',
      'title', 'Medical Emergency: Crush Injury and Crush Syndrome',
      'type', 'medical_emergency',
      'duration_minutes', 12,
      'description', E'## The Hidden Danger of Rescue\n\nCrush Syndrome presents a unique and insidious medical danger. When a large muscle mass is compressed for a prolonged period, blood flow is cut off. Muscle cells, deprived of oxygen, die and release toxic substances—primarily potassium and myoglobin. As long as the crushing force remains, these toxins are contained within the limb.\n\nHowever, if the force is suddenly released, toxins surge into the central circulation. This sudden release can overwhelm the heart and kidneys, causing immediate fatal cardiac arrhythmias or acute kidney failure.\n\n## The Critical 15-Minute Rule\n\n**If entrapment < 15 minutes:** Release the victim immediately\n**If entrapment > 15 minutes OR duration unknown:** DO NOT RELEASE. Wait for paramedics who can administer IV fluids to counteract toxins before removing the crushing force.\n\n## Your Challenge\n\nThis simulation tests your ability to subordinate your natural human instinct—to free a trapped colleague immediately—to disciplined medical knowledge. The "wrong" instinctive choice leads to fatal consequences.',
      'objectives', jsonb_build_array(
        'Determine critical time-based information for crush injuries',
        'Apply the 15-minute protocol correctly',
        'Resist the instinct to immediately free trapped victims',
        'Coordinate with emergency medical services',
        'Prevent Crush Syndrome fatalities through proper protocol'
      )
    ),
    jsonb_build_object(
      'id', 'S4',
      'title', 'Powered Haulage: Accident Scene Management',
      'type', 'powered_haulage',
      'duration_minutes', 10,
      'description', E'## Don''t Become the Second Victim\n\nPowered haulage accidents are consistently a leading cause of mining fatalities. The first priority of any responder is to ensure their own safety before attempting to render aid. An accident scene is unstable and hazardous—involving spilled fuel (fire hazard), unstable ground that could collapse further, and potential for wrecked equipment to shift or roll again.\n\n## The Five-Step Protocol\n\nResponders must think beyond the primary event and anticipate interconnected secondary hazards:\n\n1. **STOP** - Do not rush to the victim\n2. **ASSESS** - Perform 360-degree scene evaluation\n3. **STABILIZE** - Establish perimeter and control access\n4. **CONTROL** - Manage hazards before victim contact\n5. **REPORT** - Use incident command protocol\n\n## Your Test\n\nThis simulation tests your discipline and adherence to procedure. Rushing directly to the victim—skipping crucial assessment and stabilization steps—leads to you becoming part of the incident.',
      'objectives', jsonb_build_array(
        'Prioritize scene safety over immediate rescue',
        'Perform systematic hazard assessment',
        'Establish exclusion perimeters',
        'Follow incident command reporting protocol',
        'Prevent secondary victim scenarios'
      )
    )
  ),
  'completion_requirements', jsonb_build_object(
    'minimum_passing_score', 100,
    'required_simulations', 3,
    'max_safety_strikes', 0,
    'note', 'Emergency response requires perfect execution. Each scenario must be completed with zero safety strikes to pass.'
  ),
  'technical_framework', jsonb_build_object(
    'state_management', 'React Context API tracks scenario progress, safety strikes, and custom state variables',
    'consequence_system', 'Each incorrect decision immediately shows realistic consequences, reinforcing the importance of protocol compliance',
    'narrative_structure', 'Decision trees map all possible paths through each emergency scenario with authentic outcomes'
  )
)
WHERE module_id = 'c024a928-306b-4e68-9d07-14d3bd759a0a' 
  AND order_index = 8;