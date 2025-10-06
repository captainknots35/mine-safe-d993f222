-- Replace Module 1 with comprehensive MSHA Part 46 New Miner Training content
-- Module ID: 84ea6e55-bfdb-43d4-a761-8283da7a36ba

DELETE FROM public.lessons WHERE module_id = '84ea6e55-bfdb-43d4-a761-8283da7a36ba';

INSERT INTO public.lessons (
  module_id,
  type,
  title,
  description,
  content_data,
  order_index,
  duration_minutes,
  is_required
) VALUES
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'Welcome & Introduction to Mine Safety: Your Rights and Responsibilities',
  'Course objectives, the Mine Act, MSHA mission, and your statutory rights as a professional miner.',
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('heading', 'Welcome and Course Objectives', 'content', 'Welcome to your new miner training. This module is the first and most critical step in your journey to becoming a safe, knowledgeable, and professional miner. This four-hour digital module is mandated by federal law under Title 30, Code of Federal Regulations (30 CFR) Part 46. Upon completion, you will be able to: identify key operational areas and vocabulary; describe basic mining and processing methods; recognize major hazards and control principles; understand your statutory rights and responsibilities; explain the line of authority; and know proper reporting and emergency procedures.'),
      jsonb_build_object('heading', 'The Mine Act and MSHA Mission', 'content', 'The Federal Mine Safety and Health Act of 1977 (the Mine Act) is the cornerstone of mining safety. Congress created MSHA to reduce fatalities, injuries, and illnesses. MSHA conducts unannounced inspections at least twice per year, investigates accidents, and develops safety standards. The fundamental principle: mine operators, with miners'' active participation, hold primary responsibility for preventing hazards. This establishes a critical safety partnership where every person plays an indispensable role.'),
      jsonb_build_object('heading', 'Your Statutory Rights (30 CFR § 46.5)', 'content', 'You have powerful legal rights: RIGHT TO TRAINING - Receive all required training during working hours at regular pay. RIGHT TO SAFE WORKPLACE - Work environment free from recognized hazards. RIGHT TO REPORT HAZARDS - Report conditions to supervisors, representatives, or MSHA anonymously without retaliation (Section 105(c) protection). RIGHT TO REFUSE UNSAFE WORK - Refuse work you reasonably believe is unsafe after notifying your supervisor. RIGHT TO PARTICIPATE - Designate representatives for MSHA walk-arounds, speak privately with inspectors. RIGHT TO COMPENSATION - Be paid if withdrawn due to MSHA orders. RIGHT TO HEALTH PROTECTION - Medical evaluations for toxic exposures.'),
      jsonb_build_object('heading', 'Your Core Responsibilities', 'content', 'Your rights are balanced by responsibilities: comply with all federal/state laws and company policies; actively participate in safety; report accidents and unsafe conditions; properly use all required PPE; provide truthful statements during investigations. NEVER provide advance notice of MSHA inspections or knowingly make false statements or falsify documents - these carry severe penalties.'),
      jsonb_build_object('heading', 'Line of Authority: Supervisors and Representatives', 'content', 'SUPERVISORS: Your immediate supervisor is your first contact for safety matters. They oversee daily operations, conduct workplace examinations, and implement corrective actions. Supervisors are "Agents of the Company" who can be held personally liable for knowingly allowing violations - they may face personal fines or jail time. MINERS'' REPRESENTATIVE: Designated by two or more miners to represent health and safety interests. They advocate for miners, assist MSHA inspectors, and have the right to accompany inspectors on walk-arounds and review citations. This creates a dynamic system of checks and balances where your legally protected right to report triggers your supervisor''s legal duty to correct, with the representative as an additional advocate.')
    )
  ),
  1,
  60,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'The Mine Environment: Virtual Site Tour of Surface Mining Operations',
  'Arrival procedures, mine terminology, and detailed walkthroughs of sand/gravel, stone quarry, clay, shell dredging, and colloidal phosphate operations.',
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('heading', 'Arrival and Entry Procedures', 'content', 'From the moment you enter the mine property, you are in an active work environment. Obey all posted speed limits and traffic signs - haul trucks and heavy equipment may be crossing roads. Proceed to the mine office to sign in and meet your supervisor. The main Bulletin Board is critical - by law it must display MSHA citations, petitions for modifying standards, the mine rescue plan, and miners'' representative notification. Check this board regularly. Other key facilities: first-aid station, emergency contacts, change rooms. PARKING: Many mines require backing into spaces for faster emergency evacuation.'),
      jsonb_build_object('heading', 'Mine Terminology - Learning the Language', 'content', 'PIT/QUARRY: Large open excavation where mineral is extracted, sometimes hundreds of feet deep. HIGHWALL: Unexcavated cliff-like face - can be unstable. BENCH: Stepped terraces cut into highwall for safe mining. CREST: Top edge of bench/highwall. TOE: Bottom edge where wall meets floor. BERM: Raised pile along road edges as safety barrier to prevent vehicles going over edge. HAUL ROAD/RAMP: Primary arteries connecting pit to plant, built for massive haul truck weight. OVERBURDEN: Topsoil and non-valuable rock removed before mining. STOCKPILES: Large cone-shaped piles of raw or finished material. ANGLE OF REPOSE: Natural slope of stockpiles. PROCESSING PLANT: Facility where material is crushed, screened, washed, and sorted. WATER IMPOUNDMENTS: Dams and ponds for process water or tailings storage.'),
      jsonb_build_object('heading', 'Virtual Stop 1: Sand & Gravel Operation', 'content', 'DRY MINING: Front-end loaders dig directly into sand/gravel banks and load haul trucks. DREDGING: Floating platforms with powerful pumps and suction lines excavate from water bottoms. BAR SKIMMING: For active streams, machinery removes only exposed gravel bar material. PROCESSING: Material dumps into hopper feeding conveyor belts. Screen decks separate by size. Crushers break larger rocks. Washing removes clay/silt. Material sorted into finished product stockpiles. PRIMARY HAZARDS: Mobile equipment traffic, water impoundment stability, mechanical dangers in processing plant.'),
      jsonb_build_object('heading', 'Virtual Stop 2: Surface Stone Quarry', 'content', 'SCALE: Deep quarry with massive highwalls in distinct benches. OVERBURDEN REMOVAL: Dozers and scrapers expose solid rock deposit. EXTRACTION CYCLE: Large drill rigs create precise pattern of deep holes in rock. Holes loaded with explosives. After clearing and warnings, blast fractures thousands of tons. Hydraulic shovels or loaders place fragmented rock into haul trucks. DOMINANT HAZARDS: Highwall stability (ground control), explosives handling (flyrock), heavy equipment on steep haul roads.'),
      jsonb_build_object('heading', 'Virtual Stop 3: Surface Clay Mine', 'content', 'EXCAVATION: Soft, fine-grained material. After overburden removal, draglines, power shovels, or scrapers easily excavate clay into trucks. PROCESSING: Crushers and mills grind to fine powder. Mixed with water and washed to remove sand impurities. DRYING: Wet clay slurry fed through large rotating dryers. CLASSIFICATION: Screened by particle size for end use specifications (ceramics, construction). PRIMARY HAZARD: Respiratory - fine powdery material creates significant airborne dust concerns.'),
      jsonb_build_object('heading', 'Virtual Stop 4: Shell Dredging Operation', 'content', 'FLOATING VESSEL: Entire mining operation on water via hydraulic dredge. Long frame called "ladder" lowered to seabed. CUTTERHEAD: Rotating head at ladder end breaks up shells and sediment, mixing with water to create slurry. SUCTION & PUMPING: Powerful pump draws slurry through intake. Pumped through large flexible pipeline (often on floating pontoons) to shore processing facility. UNIQUE HAZARDS: Water-based environment - drowning risk, slips/falls on wet decks, vessel stability, rapid weather changes.'),
      jsonb_build_object('heading', 'Virtual Stop 5: Colloidal Phosphate Site', 'content', 'UNIQUE LOCATION: Old settling basin from previous mining operation, not newly excavated pit. MATERIAL: Soft rock phosphate (colloidal phosphate) - fine clay-like material, byproduct of historical hard rock phosphate mining. EXTRACTION: Simple - loaders and trucks mine the soft material and move to stockpile, similar to clay mining. PROCESSING: Minimal - typically just drying and grinding before packaging as slow-release organic fertilizer. PRIMARY HAZARD: Like clay, fine dusty material requires respiratory protection considerations.')
    )
  ),
  2,
  60,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'Hazard Recognition, Avoidance, and Control',
  'Critical skill development in identifying and controlling hazards: mobile equipment, machinery/LOTO, ground control, electrical, water, health hazards, and reporting procedures.',
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('heading', 'Introduction to Active Hazard Recognition', 'content', 'A HAZARD is any condition, practice, or behavior with potential to cause harm. True safety is proactive - identifying and eliminating hazards before accidents occur. WORKPLACE EXAMINATION: Federal law requires a competent person examine each working area for hazards at shift start and after blasts. YOU also have personal responsibility to examine your work area before starting and remain vigilant for changing conditions. This is not passive - it is active, systematic searching. Your goal: constantly assess risk, turning from passive observer to active risk assessor.'),
      jsonb_build_object('heading', 'Powered Haulage & Mobile Equipment', 'content', 'Leading cause of fatal accidents in surface mining. SCENARIO: You approach an intersection in a pickup. A 180-ton haul truck approaches from left. You cannot see the driver''s eyes. Massive blind spots mean they likely cannot see you. Immense weight/momentum prevents quick stops. NEVER ASSUME OPERATORS SEE YOU. CONTROLS: TRAFFIC - Follow established patterns, speed limits, signage. Smaller vehicles ALWAYS yield to larger equipment. COMMUNICATION - Establish positive communication (radio/horn signals) before entering haulage areas or blind corners. PRE-OPERATIONAL CHECKS - Walk-around inspection of tires, lights, alarms, brakes, steering before operating. Report any safety-affecting defects immediately. SEATBELTS - Must be worn at all times - single most important safety equipment for overturns. BERMS & DUMP POINTS - Required at elevated roadway edges. Stay back from edges when dumping. Never position too close to crest. 2016 MSHA alert: haul truck drove through berm and rolled down dam face.'),
      jsonb_build_object('heading', 'Machinery, Conveyors, and Lockout/Tagout', 'content', 'Processing plant: high-energy environment. Crushers, screens, conveyors have moving parts causing entanglement, amputation, crush injuries. SCENARIO: Rock wedged in conveyor chute. Impulse to reach in and pull it out? FATAL MISTAKE. Even if belt stopped, stored energy could release or someone could restart remotely. Reaching into moving machinery is leading fatal accident cause. CONTROLS: GUARDING - All moving parts (gears, belts, rotating shafts) must have physical guards. Never remove guards. Report missing/damaged guards immediately. Do not operate until fixed. LOCKOUT/TAGOUT (LOTO) - Before maintenance, repair, or clearing jams, isolate energy source. De-energize electrical circuit. Place personal lock and tag on disconnect switch. Ensures machine cannot be accidentally re-energized. 2023 FATAL: Miner killed in jaw crusher when moving jaw rotated and pinned him during maintenance. Proper LOTO would have prevented this. CONVEYOR SAFETY - Never climb on, cross, or travel under moving conveyor except at designated crossovers. Cleaning pulleys/rollers while belt moving causes entanglement.'),
      jsonb_build_object('heading', 'Ground Control: Highwalls & Stockpiles', 'content', 'Ground itself can be biggest hazard. Falls/collapses happen suddenly with immense force. SCENARIO: Working at toe of highwall after heavy rain. You see new fine crack parallel to crest. Small pebbles falling. What is ground telling you? CLASSIC WARNING SIGNS of impending failure. Water lubricated weakness plane and increased pressure. IMMEDIATE ACTION: Move away and report to supervisor immediately. CONTROLS: VISUAL INSPECTION - Constantly aware of ground conditions. Look for tension cracks, bulging/sloughing faces, seeping water, loose rock on benches above. Report changes immediately. SAFE POSITIONING - Never park or work where you could be struck by falling material. Always know your escape route and ensure it is not blocked. SCALING - Loose hazardous rock must be removed from highwall. Always done from safe location (typically from above) with miner secured by fall protection. STOCKPILE SAFETY - NEVER excavate from base of stockpile. This undercuts pile, creating severe engulfment hazard. Always reclaim from top.'),
      jsonb_build_object('heading', 'Electrical Hazards', 'content', 'High-voltage: invisible but lethal. SCENARIO: Haul truck raising bed to dump near overhead power lines. Bed getting dangerously close to wires. HAZARD: Electrocution. If bed contacts energized line, entire truck becomes electrified - anyone touching it could be killed. IMMEDIATE ACTION: Get driver''s attention (radio, horn) to STOP before contact. CONTROLS: SAFE APPROACH DISTANCE - All equipment must maintain minimum 10 feet from overhead power lines. INSPECT - Always look for damaged cables, uncovered junction boxes, signs of electrical malfunction. Report immediately. LOTO FOR ELECTRICAL - Only qualified, authorized electricians perform electrical work. Must follow strict LOTO to de-energize and verify circuit is dead before work. Never assume circuit is off. WATER & ELECTRICITY - Exercise extreme caution with electrical equipment in wet conditions - water greatly increases electrocution risk.'),
      jsonb_build_object('heading', 'Pervasive Site-Wide Hazards', 'content', 'WATER SAFETY (especially Dredging): Drowning is leading death cause in dredging. Anyone working over/near water with fall danger must wear U.S. Coast Guard-approved Personal Flotation Device (PFD). Good housekeeping on dredge decks/walkways critical to prevent slips/falls into water. HEALTH HAZARDS - THE INVISIBLE DANGERS: RESPIRABLE DUST (SILICA) - Dust from drilling, blasting, crushing, transporting stone/sand/gravel contains respirable crystalline silica. Inhaling over time causes silicosis - progressive, incurable lung disease. Controlled by water sprays, ventilation; may require respirator. NOISE - Constant high-decibel noise from plants/equipment causes permanent hearing loss. Hearing protection required in high-noise areas. CHEMICALS (HazCom) - Employer must have Hazard Communication program. You have right to training on hazardous chemicals, reading Safety Data Sheets (SDS), and proper PPE. SLIPS, TRIPS, FALLS - Most common injury cause. Good housekeeping best prevention. Keep walkways clear of tools, debris, spills.'),
      jsonb_build_object('heading', 'Critical: Hazard Reporting Procedures', 'content', 'Recognizing hazards is only first step. CRITICAL FINAL STEP: REPORTING so it can be corrected. This is MANDATORY training topic and cornerstone of safety program. PROCEDURE: First, ALWAYS report hazard to immediate supervisor. If not corrected timely, report up chain of command, to miners'' representative, or if necessary, directly to MSHA. REMEMBER YOUR RIGHTS: Reporting is not "causing trouble" - it is your LEGAL RIGHT, your PROFESSIONAL RESPONSIBILITY, and the SINGLE MOST EFFECTIVE ACTION to prevent accidents and protect yourself and coworkers.')
    )
  ),
  3,
  90,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'Emergency Preparedness and Response',
  'Emergency medical procedures, escape/evacuation plans, alarm signals, firefighting, and your role in emergencies.',
  jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object('heading', 'Emergency Plans - When Seconds Count', 'content', 'Despite best hazard control efforts, emergencies can happen. Well-rehearsed emergency plans ensure orderly, safe response. EMERGENCY MEDICAL: Know locations of first-aid kits, emergency eyewash stations, on-site first-aid facilities. PROCEDURE: Immediately notify supervisor and use radio to call for help when injury occurs. ESCAPE & EVACUATION: Every mine has detailed escape and emergency evacuation plan posted on bulletin board and conspicuous places. Shows primary and alternate escape routes from all work areas. CRITICAL: Designated assembly point/meeting area where ALL personnel report for head count after evacuation.'),
      jsonb_build_object('heading', 'Understanding Alarms and Signals', 'content', 'Clear, rapid communication vital in emergencies. Every mine uses audible alarms (horns, sirens) signaling different emergency types. MUST LEARN what signals mean and required actions. COMMON SIGNALS (examples - learn your site-specific signals): Series of short horn blasts = Blasting warning - clear area. Continuous steady siren = Evacuation - proceed to assembly point. Intermittent rising/falling siren = Fire alarm - evacuate if in danger. Single long horn blast = All clear - safe to return.'),
      jsonb_build_object('heading', 'Firefighting Procedures', 'content', 'Know fire extinguisher locations in your work area. P.A.S.S. METHOD: Pull the pin. Aim nozzle at base of fire. Squeeze handle. Sweep side to side. HOWEVER: Your safety is FIRST PRIORITY. Only fight fire if: very small (wastebasket-sized), clear escape route behind you, trained to use extinguisher. OTHERWISE: Sound alarm and evacuate immediately.'),
      jsonb_build_object('heading', 'Your Role in an Emergency', 'content', 'KEY STEPS: 1. STAY CALM. 2. Alert coworkers and supervisor immediately. 3. Follow evacuation plan along designated escape routes. 4. Report to designated assembly point. 5. Wait for instructions from supervisor. 6. Do NOT re-enter evacuated area until authorized person declares it safe.'),
      jsonb_build_object('heading', 'Summary and Next Steps', 'content', 'FOUR HOURS COVERED: Safety partnership from Mine Act built on your rights/responsibilities, supervisor duties, representatives'' role. Virtual tour of surface operations understanding how processes create unique hazards. Critical skill of active hazard recognition and control procedures. Emergency response. ULTIMATE GOAL: Ensure you and every coworker go home safe and healthy every shift. NEXT STEPS: This is BEGINNING of training journey. Federal law requires full 24 hours new miner training within first 90 days. Until completed, work under close observation of experienced miner. ONGOING: Task Training for new assignments. Annual 8-hour Refresher Training. Safety is continuous learning. Welcome to the mining industry - let''s get to work safely.')
    )
  ),
  4,
  20,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'quiz',
  'Module 1 Competency Check',
  'Comprehensive assessment verifying understanding of all Module 1 learning objectives and scenario-based hazard recognition.',
  jsonb_build_object(
    'text', 'Complete this competency check to verify your understanding of: statutory rights and responsibilities, line of authority, mining operations and terminology, hazard recognition and control, emergency procedures. Questions include scenario-based situations testing your ability to identify and respond to hazards in real-world mining conditions.'
  ),
  5,
  10,
  true
);