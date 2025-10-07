-- Replace placeholder summaries with full, verbatim content for Module 2 lessons

-- Unit 1: The Foundation of Mine Site Safety
UPDATE lessons SET content_data = jsonb_build_object(
  'sections', jsonb_build_array(
    jsonb_build_object(
      'title','Learning Objectives',
      'content', $$Upon completion of this unit, you will be able to:
- Articulate your statutory rights and responsibilities for hazard reporting and safety under the Federal Mine Safety and Health Act of 1977.
- Analyze Mine Safety and Health Administration (MSHA) fatality data to identify the highest-risk activities and hazard categories in surface mining.
- Adopt MSHA's "Rules to Live By" as a mental framework for proactive hazard recognition.
- Apply the "See, Think, Act" cycle to any task performed on a mine site.$$
    ),
    jsonb_build_object(
      'title','Introduction: Your Right and Responsibility to Be Safe (0:00 - 0:15)',
      'content', $$Welcome to Module 2: Hazard Recognition, Avoidance, and Control. The information presented over the next six hours is the most critical component of your safety training. This is not simply a regulatory requirement; it is the fundamental knowledge that empowers you to go home safely at the end of every single shift. The Federal Mine Safety and Health Act of 1977, or the Mine Act, provides you with more than just a job; it grants you specific, legally protected rights. These include the right to comprehensive safety and health training, the right to report any hazardous condition without fear of retaliation, and, most importantly, the right to refuse to perform work you believe is unsafe or unhealthy.
Your employer has developed and implemented a written training plan that meets or exceeds the requirements of 30 CFR Part 46, and this module is a core part of that plan. This plan is available for you to review at any time. Your responsibility is to actively engage with this material, to ask questions until you are confident in your understanding, and to apply this knowledge diligently to protect not only yourself but every person working alongside you. This unit will also clarify the line of authority at this mine, outlining the responsibilities of supervisors and miners' representatives, and detail the specific procedures for reporting hazards within our organization, as mandated by federal regulation.$$ 
    ),
    jsonb_build_object(
      'title','Learning from Tragedy: A Data-Driven Look at Mine Fatalities (0:15 - 0:40)',
      'content', $$To effectively recognize and control hazards, you must first understand where the greatest risks lie. The most direct way to do this is to learn from the hardest data available: the MSHA final investigation reports on mining fatalities. These documents are more than statistics; they are detailed accounts of incidents where miners did not make it home. You will study them not to instill fear, but to honor the fallen by learning the lessons their tragic experiences have taught us. An analysis of these reports reveals an undeniable pattern. A small number of hazard categories are responsible for the vast majority of deaths in surface mining operations. As the data clearly shows, incidents involving powered haulage, machinery, electrical systems, and ground control are consistently the leading causes of fatal accidents. These are the areas where your vigilance must be at its absolute highest.
The very structure of MSHA's training regulations is a direct response to these recurring patterns. Federal law under 30 CFR § 46.6(b)(2) explicitly mandates that training must include instruction on the "recognition and avoidance of electrical hazards and other hazards present at the mine, such as...mobile equipment (e.g., haul trucks and front-end loaders), and loose or unstable ground conditions". This is not an arbitrary list. It is a curriculum written from the lessons of past tragedies, directly targeting the most frequent causes of death and serious injury in our industry. Therefore, this course provides an exhaustive focus on these specific topics, treating them not as separate compliance items, but as an integrated system of knowledge designed to break the chain of events that leads to the most common and devastating types of accidents.
Table 1: Analysis of Recent MSHA-Reported Surface Mining Fatalities

Accident Classification | Number of Fatalities (Recent 3-Year Period) | Common Scenario Example (Based on MSHA Reports)
Powered Haulage | High | An operator loses control of a haul truck on a grade, or a ground worker is struck in a vehicle's blind spot.
Machinery | Significant | A miner becomes entangled in a moving machine part, such as a conveyor belt, during maintenance or cleaning.
Fall of Face, Rib, Side or Highwall | Significant | Unstable ground on a highwall or pit face collapses, engulfing equipment or personnel working below.
Electrical | Moderate | A miner makes contact with an energized component due to failure to de-energize and lock out, or equipment contacts overhead power lines.
Slip or Fall of Person | Moderate | A miner falls from equipment or a structure, often due to slippery conditions or lack of proper fall protection.
Drowning | Moderate | Equipment is driven into a body of water, or a miner falls into water without a personal flotation device, often during dredging operations.
(Note: Data is illustrative, based on analysis of MSHA fatality reports. Actual numbers vary by year.)$$
    ),
    jsonb_build_object(
      'title','MSHA''s "Rules to Live By" & The Hazard Recognition Cycle (0:40 - 1:00)',
      'content', $$After analyzing thousands of fatal accident investigations, MSHA identified the safety standards that were most frequently violated when a miner was killed. From this analysis, they developed a fatality prevention initiative called "Rules to Live By". These are not new regulations; they are existing, mandatory standards that have been proven, time and again, to be critical to survival. This training is anchored to these core principles. Think of them as your personal, non-negotiable safety checklist. For surface metal and nonmetal mines, these priority standards include crucial rules like §56.12017 for work on power circuits, §56.14105 for blocking equipment against motion during maintenance, and §56.14131(a) for wearing seat belts in haul trucks. These specific rules will be revisited in detail in the upcoming units.
This proactive mindset is captured in a simple but powerful three-step cycle that you must apply to every task you perform, no matter how routine it seems. This is the See, Think, Act cycle:
SEE the Hazard: Actively scan your work area. What has the potential to harm you or your coworkers? Look for moving equipment, unstable ground, energized lines, and pinch points.
THINK about the Consequences: How could this hazard cause an injury or fatality? What is the worst-case scenario? Consider the energy involved—be it electrical, mechanical, or gravitational.
ACT to Control the Hazard: What steps must you take to eliminate or control the risk before you begin work? This could involve performing a LOTO procedure, barricading an unsafe area, establishing communication with an equipment operator, or stopping the job entirely to consult a supervisor.
This cycle is the practical application of everything you will learn today. It is the mental tool that translates knowledge into safe action.$$ 
    )
  )
) WHERE id = 'ede59cf6-f358-4555-9d2c-152c3e0ff669';

-- Unit 2: Electrical Hazards – The Invisible Threat
UPDATE lessons SET content_data = jsonb_build_object(
  'sections', jsonb_build_array(
    jsonb_build_object(
      'title','Learning Objectives',
      'content', $$Upon completion of this unit, you will be able to:
- Describe the mechanisms of electric shock, arc flash, and arc blast and the potentially fatal injuries they can cause.
- Recite and demonstrate a comprehensive understanding of the Lockout/Tagout/Tryout (LOTO) procedure as the primary means of controlling hazardous energy.
- Explain the principle of safety grounding as a low-impedance path designed to operate protective devices, not merely as a connection to the earth.
- Identify safe approach distances and necessary precautions when operating equipment or performing work near overhead power lines.$$ 
    ),
    jsonb_build_object(
      'title','Case Study: An Avoidable Tragedy (1:00 - 1:15)',
      'content', $$On May 8, 2024, at a surface limestone operation, a 44-year-old miner died from electric shock when the crane he was operating contacted high-voltage power lines. On August 9, 2024, a 64-year-old electrician was severely burned by an arc flash from 4,160-volt components while troubleshooting; he died from his injuries thirteen days later. These events, documented in MSHA's fatality reports, are stark reminders that electricity is an ever-present, silent, and unforgiving hazard on every mine site. Since 2015, the mining industry has seen an average of three electrical fatalities every two years, along with hundreds of non-fatal shock and arc flash accidents.
Analysis of these MSHA investigation reports consistently reveals that these incidents are not typically caused by a lack of awareness of electricity's danger, but rather by a failure to meticulously follow established, step-by-step safety procedures. Complacency, perceived time pressure, or a misunderstanding of a system's complexity can lead to shortcuts that bypass layers of protection. In this unit, you will learn about the science of this invisible threat and master the procedures that would have saved these miners' lives.$$ 
    ),
    jsonb_build_object(
      'title','The Physics of Fear: Shock, Arc Flash, and Grounding (1:15 - 1:40)',
      'content', $$To control electricity, you must understand its fundamental behavior. Electricity's one goal is to return to its source, and it will always follow the path of least resistance to get there. Your primary job is to ensure that your body never becomes part of that path. The danger comes from three primary phenomena:
Electric Shock: This occurs when current passes through the body. It can cause muscle contractions, nerve damage, burns, and ventricular fibrillation—a fatal disruption of the heart's rhythm. Voltages as low as 48 volts can be fatal under certain conditions.
Arc Flash: This is a type of electrical explosion that occurs when current travels through the air between two conductors or from a conductor to ground. It creates a blinding flash of light and a wave of intense radiant heat that can exceed 35,000°F, instantly vaporizing metal, igniting clothing, and causing severe, often fatal, burns.
Arc Blast: The rapid heating of air during an arc flash creates a massive pressure wave, equivalent to an explosion. This blast can throw workers across rooms, rupture eardrums, and propel molten metal and shrapnel at high velocities.
Our primary defense against these hazards is a properly designed and maintained safety grounding system. It is crucial to understand what this system does. Its purpose is not simply to connect equipment to the earth. Its primary function is to provide a dedicated, continuous, low-impedance path for fault current to travel back to the power source. Impedance is essentially the total opposition to current flow. By creating an easy, low-impedance "superhighway" for the fault current, we ensure that a massive amount of current flows instantly, which is designed to trip the circuit breaker or blow the fuse, de-energizing the circuit in a fraction of a second.
If this low-impedance path is broken or compromised—for example, by a damaged trailing cable or an improper connection—the fault current will seek other, higher-impedance paths. This could be through the metal frame of the machine, and ultimately, through the body of anyone who touches it. This is why practices like "peg grounding"—using separate, isolated ground rods for each piece of equipment—are extremely dangerous and prohibited. The earth itself is a poor, high-impedance conductor and cannot be relied upon to carry enough current to trip a protective device quickly. A proper safety ground is a physical conductor that provides a reliable, low-impedance path back to the circuit breaker.$$ 
    ),
    jsonb_build_object(
      'title','Master Procedure: Lockout/Tagout/Tryout (LOTO) (1:40 - 2:10)',
      'content', $$The single most important safety procedure for preventing death or injury from the unplanned release of energy is Lockout/Tagout/Tryout, or LOTO. This procedure is not just for electrical work; it is required any time you must remove a guard, bypass a safety device, or place any part of your body where it could be harmed by moving machinery or the release of stored energy—be it electrical, mechanical, hydraulic, or pneumatic. MSHA standards §56.12017 ("Work on power circuits") and §56.14105 ("Procedures during repairs or maintenance") are both "Rules to Live By" that mandate these principles.
You will now walk through the six essential steps of a proper LOTO procedure. There are no shortcuts. Every step must be performed, in order, every time.
1. Preparation for Shutdown: Before you begin, you must understand all energy sources associated with the equipment. This includes identifying the main electrical disconnect, but also any stored energy like compressed air, hydraulic pressure, or tension in a spring or conveyor belt.
2. Notification & Shutdown: Notify all affected employees that the equipment will be shut down and locked out. Then, perform a normal shutdown of the equipment using its standard operating controls.
3. Isolate the Energy Source: Go to the main energy isolating device—the circuit breaker, disconnect switch, or valve—and operate it to isolate the equipment from its energy source. Never use start/stop buttons or selector switches for isolation; these do not de-energize the power conductors.
4. Apply Lock and Tag: Affix your personal, uniquely keyed lock to the isolating device, securing it in the "off" or "safe" position. Your tag must be attached, clearly identifying you as the person who performed the lockout. No one but you is ever permitted to remove your lock. If multiple people are working on the equipment, each person must apply their own personal lock.
5. Control Stored Energy: After isolating the primary energy source, you must neutralize any residual energy. This may involve bleeding hydraulic lines, venting pneumatic systems, or blocking mechanical parts that could move due to gravity. For electrical work, qualified electricians must ground de-energized conductors to protect against induced voltage or feedback.
6. VERIFY Isolation (The "Try" Step): This is the most critical and most often neglected step. After ensuring all personnel are clear, you must return to the machine's normal operating controls and attempt to start it. This is your only absolute proof that you have isolated the correct energy source and that the system is at a zero-energy state. For electrical circuits, a qualified person must also use a properly rated voltmeter to test for the absence of voltage. Remember this phrase: "It's not locked out until you've tried it out!" Skipping this final verification step has been a direct cause of numerous fatalities.$$ 
    ),
    jsonb_build_object(
      'title','Interactive Simulation 1: The Virtual LOTO Procedure (2:10 - 2:30)',
      'content', $$lovable.dev Simulation Concept:
In this next interactive, first-person simulation, you will build your procedural memory and see the life-or-death importance of the "Try" step in the LOTO process.
Objective: You must correctly perform a complete LOTO procedure on a virtual conveyor belt drive motor to prepare for a coupling replacement.
Scenario: You are standing in front of the conveyor drive. A work order appears on your virtual tablet instructing you to lock out the system. You must then navigate to a nearby Motor Control Center (MCC) room. The MCC contains a wall of disconnects, some of which are poorly labeled or correspond to other nearby equipment.
Gameplay and Feedback:
Identification: You must examine the labels and electrical diagrams available in the MCC to identify the correct disconnect for "Conveyor #3." Clicking on the wrong disconnect and locking it will be allowed by the simulation.
Application: You will select your virtual personal lock and tag from an inventory and apply it to the handle of the chosen disconnect.
Verification (The "Try" Step): You must then walk back to the local start/stop station next to the conveyor motor. You will be prompted with the question: "What is your next action?" The correct choice is "Attempt to start the conveyor."
Correct Procedure Path: If you locked out the correct disconnect and then press the "Start" button, the conveyor will not move. A green checkmark and the message "VERIFIED ZERO ENERGY STATE. SAFE TO PROCEED." will appear. You will successfully complete the simulation.
Incorrect Disconnect Path: If you locked out the wrong disconnect (e.g., for Conveyor #4) and press the "Start" button, the conveyor will immediately start up. The screen will flash red with a "NEAR MISS! INCORRECT ENERGY SOURCE ISOLATED." message, and the simulation will reset, forcing you to repeat the procedure correctly.
Skipped "Try" Step Path: If you lock out the correct disconnect but choose to "Begin work" without performing the "Try" step, the simulation proceeds. A few moments later, a cinematic event is triggered: an animated coworker in another part of the plant, seeing an unrelated fault, resets a main breaker that inadvertently back-feeds the "locked-out" circuit through a secondary source. A simulated arc flash erupts from the motor junction box where you were about to work. The screen whites out, followed by the message: "FATAL ERROR: VERIFICATION STEP SKIPPED. Unidentified secondary energy source was present. The 'Try' step would have revealed the hazard."
Debrief and Self-Reflection:
Following the simulation, consider these questions:
- Why did the conveyor start up when the wrong disconnect was locked?
- In the final scenario, how could the "Try" step have prevented the arc flash?
- Think about real-world site complexities, such as multiple energy sources, mislabeled equipment, and the importance of never assuming a circuit is dead until it is proven to be.$$ 
    )
  )
) WHERE id = '3e000d41-213a-488a-ac2c-f215374517c1';

-- Unit 3: Ground Control – Reading the Earth
UPDATE lessons SET content_data = jsonb_build_object(
  'sections', jsonb_build_array(
    jsonb_build_object(
      'title','Learning Objectives',
      'content', $$Upon completion of this unit, you will be able to:
- Identify visual indicators of highwall and pit wall instability, including tension cracks, sloughing, overhangs, and adverse effects of weather.
- Describe the steps of a systematic ground conditions examination as required by MSHA standards.
- Define "angle of repose" and explain how undercutting a stockpile's toe creates an unstable condition that can lead to engulfment.
- Recognize hazards specific to dredging operations and the critical safety measures for working on or near water.$$ 
    ),
    jsonb_build_object(
      'title','Case Study: When the Highwall Fails (2:30 - 2:45)',
      'content', $$On August 22, 2024, a miner was killed in a "Fall of Face, Rib, Side or Highwall" accident at a construction sand and gravel pit in Massachusetts. This incident is a powerful reminder that the ground you work on and around is not always as stable as it appears. Ground that seems solid can fail suddenly and catastrophically if you don't know what to look for. The earth communicates its instability through a language of cracks, bulges, seeps, and falling material. In this unit, you will learn to read that language to protect your life. Under 30 CFR § 77.1000, every mine operator must establish and follow a ground control plan that is consistent with prudent engineering design to ensure safe working conditions. Your role is to be the eyes and ears of that plan through daily, diligent examination.$$ 
    ),
    jsonb_build_object(
      'title','Highwall & Pit Stability: A Geotechnical Perspective (2:45 - 3:15)',
      'content', $$A highwall or pit wall is never static; it is a dynamic geological feature. Forces of nature—rain, snow, and especially freeze-thaw cycles—are constantly working to weaken the rock mass. Vibrations from blasting and mobile equipment also contribute to instability. Your daily workplace examination, as mandated by standards like 30 CFR § 56.3401, is your first and most important line of defense against ground failure.
A proper examination is a systematic process. It's not a quick glance. You must examine highwalls and banks from as many perspectives as possible—from the bottom, from the sides, and from the top crest—while ensuring your own safety during the examination. Here are the key indicators of instability you must look for:
- Tension Cracks: Look for cracks in the ground running parallel to the edge of the highwall crest. These are a primary sign that a large section of the wall is beginning to separate and is at risk of failure.
- Sloughing and Fallen Material: Note any new accumulation of fallen rock or soil at the base, or "toe," of the highwall. This indicates that the face is actively eroding and unstable.
- Overhangs and Bulges: Identify any sections of the wall that are jutting out or appear to be bulging. These are under immense stress and can collapse without warning.
- Effects of Water: Look for water seeping from the face of the highwall. Water increases the weight of the material, lubricates planes of weakness, and can build up hydrostatic pressure within the rock mass, all of which dramatically decrease stability. Examinations must be performed more frequently during and after periods of rain or thaw.
- Vegetation and Debris: Trees, boulders, and other unconsolidated material near the crest must be removed a safe distance back, as they can fall or contribute to a larger slide.
When any of these hazardous conditions are found, they must be corrected immediately. This is typically done by scaling, which is the process of removing loose material from the highwall face. Scaling must always be performed from a safe location, typically from the top of the crest, with the miner secured by fall protection if necessary. If a hazard cannot be corrected promptly, the area must be barricaded and posted with warning signs to prevent entry. Under no circumstances should you ever work or park equipment in the fall zone of a known or suspected unstable highwall.$$ 
    ),
    jsonb_build_object(
      'title','Stockpiles & Spoil Banks: The Science of the Angle of Repose (3:15 - 3:45)',
      'content', $$The principles of ground control also apply to the man-made structures on your site: stockpiles and spoil piles. Every type of granular material, from fine sand to coarse crushed stone, has a natural property called the angle of repose. This is the steepest angle at which a pile of that material can be stacked before it becomes unstable and collapses under its own weight. For most dry, unconsolidated materials at a mine site, this angle is typically between 30 and 45 degrees. Think of this as a fundamental law of physics for your workplace.
This principle becomes a life-or-death issue when you consider how stockpiles are used. A common and extremely dangerous practice is for a front-end loader to dig material from the bottom, or "toe," of a stockpile. This action steepens the face of the pile to an angle greater than its natural angle of repose. This undercutting removes the support for the thousands of tons of material above. The pile is now unstable. If a haul truck then drives to the top of that same pile to dump more material, its weight and vibrations can trigger a sudden, massive collapse. This can engulf the loader at the bottom or cause the truck at the top to be pulled over the edge.
To prevent this, you must follow strict best practices based on this principle:
- Never load material from the toe of a stockpile if it would create instability at an active dumping location above. Loading and dumping activities must be separated.
- When dumping material from a truck, always maintain a safe distance from the edge, typically at least one full truck length, and use a dozer to push the material over the edge.
- Always examine the dump point for cracks or signs of settling before backing up to the edge. An adequate berm must be maintained at all times.
- All loose or unconsolidated material on banks and piles must be sloped to its natural angle of repose to ensure stability.$$ 
    ),
    jsonb_build_object(
      'title','Interactive Simulation 2: Highwall Hazard Identification (3:45 - 4:00)',
      'content', $$lovable.dev Simulation Concept:
This simulation will train you in the critical skill of active change detection during a workplace examination, focusing on the subtle signs of ground instability.
Objective: You must conduct a thorough, systematic workplace examination of a highwall following a simulated heavy rainstorm and correctly identify all new or worsening ground control hazards.
Scenario: You will start your virtual shift equipped with a tablet and binoculars. The task is to perform the morning ground conditions exam of the main pit highwall. The environment is damp, with puddles on the pit floor, indicating recent rainfall. The highwall contains a mix of pre-existing, stable geological features and new, hazardous conditions created by the storm.
Gameplay and Feedback:
- Systematic Inspection: You must view the highwall from multiple vantage points: from the pit floor looking up, and from the crest (at a safe setback distance) looking down.
- Hazard Tagging: Using the tablet's camera view, you must find and "tag" the hazards. For each tag, you must select the correct hazard identification from a dropdown list (e.g., "Tension Crack," "Overhang," "Water Seepage," "New Rockfall").
- Action Selection: After identifying the hazard, you must choose the correct immediate action from a multiple-choice list (e.g., "Barricade and post the area," "Report to supervisor immediately," "Begin scaling from below").
Hazards to Identify: A new, fine tension crack a few feet back from the crest; an existing crack that is visibly wider than in the pre-storm reference photo on the tablet; water seeping from a horizontal seam in the rock face; a small, fresh pile of rockfall at the toe; and an undercut section where the storm runoff has eroded the base.
Successful Identification: You will receive a "Hazard Correctly Identified and Mitigated" notification for each correct tag and action. Successful completion of the full exam earns a high score.
Missed Hazard: If you complete the inspection but miss the new tension crack at the crest, the simulation will pause. A short cinematic will then play, showing that section of the highwall failing later in the day, engulfing a parked piece of equipment. The screen will display the message: "EXAMINATION INCOMPLETE. The tension crack at the crest was a critical indicator of imminent failure. More frequent and thorough examinations are required after rainfall."$$ 
    ),
    jsonb_build_object(
      'title','Water Hazards: Dredging and Drowning Prevention (4:00 - 4:15)',
      'content', $$The presence of water on a mine site, whether in pits, ponds, or dredging operations, introduces a unique and deadly set of hazards. These include not only drowning but also entrapment from sloughing ground on undercut banks, entanglement in submerged equipment, and electrocution from wet conditions. MSHA fatality data includes numerous cases of drowning, often when equipment is driven into a body of water or when a miner falls in while working.
When working on, over, or near any body of water where there is a danger of falling in, the following precautions are mandatory:
- Personal Flotation Devices (PFDs): All personnel must wear a U.S. Coast Guard-approved Type I or Type V PFD. This is your most critical piece of personal protective equipment and is non-negotiable.
- Workplace Examination: Before starting work, know the water depth, subsurface conditions, and the stability of the ground at the water's edge. Banks can be severely undercut and unstable.
- Berms and Setbacks: Roadways near water hazards must be protected by substantial berms. Equipment should be kept a safe distance back from the water's edge.
- Rescue Equipment: Water rescue equipment, such as life rings with lines, must be readily accessible in the work area.
- Dredging Operations: Dredges present additional hazards, including slips and falls on wet decks, pinch points from moving machinery, high-pressure pipes, and moving cables. Railings must be maintained around all decks and walkways.$$ 
    )
  )
) WHERE id = '51f53ca2-bb20-4fee-8f3f-dddbf77dbffc';

-- Unit 4: Mobile & Stationary Equipment – The Dangers in Motion
UPDATE lessons SET content_data = jsonb_build_object(
  'sections', jsonb_build_array(
    jsonb_build_object(
      'title','Learning Objectives',
      'content', $$Upon completion of this unit, you will be able to:
- Map the primary blind spots on common surface mining equipment, such as haul trucks and front-end loaders, and articulate the concept of "No-Go" zones.
- Demonstrate the proper use of standardized hand signals for directing mobile equipment.
- Explain the critical roles, responsibilities, and communication protocols of an equipment spotter.
- Identify the primary entanglement and stored energy hazards of belt conveyors and explain the principles of guarding and blocking against motion.$$ 
    ),
    jsonb_build_object(
      'title','Case Study: The Invisibility Cloak (4:15 - 4:30)',
      'content', $$This unit returns to the hazard that is consistently the number one cause of fatalities in U.S. mining: powered haulage. On September 18, 2024, a powered haulage accident at a surface quarry in Pennsylvania resulted in a miner's death. A review of MSHA investigation reports for these types of accidents reveals a recurring and tragic theme: the operator of the large piece of mobile equipment often had no idea the victim was there. From the elevated cab of a large haul truck, a full-size pickup truck can be completely obscured from view. You must operate under the assumption that whenever you are on foot in an area with mobile equipment, you are wearing an invisibility cloak. Your safety depends on a system of communication designed to overcome the equipment's inherent physical limitations.$$ 
    ),
    jsonb_build_object(
      'title','Mapping the "No-Go" Zones: Equipment Blind Spots (4:30 - 4:55)',
      'content', $$A blind spot, or blind area, is any area around a piece of equipment that is not visible to the operator, either through their direct line of sight or by using mirrors. Due to the massive size of mining equipment, these blind spots are extensive. You will now review a series of blind area diagrams developed by the National Institute for Occupational Safety and Health (NIOSH).
(Diagrams for a large haul truck, a front-end loader, and a dozer would be displayed here for self-study.)
As you can see from these diagrams, the blind area directly in front of a large haul truck can extend more than 30 feet, and the blind spot to the rear can be hundreds of feet long. The entire passenger side of the vehicle is also a significant blind area. These are the "No-Go" zones. This is why mine sites must develop and enforce strict internal traffic control plans, which include established travel patterns, speed limits, and designated worker-free zones in areas of high equipment traffic. The cardinal rule is this: Never approach a piece of mobile equipment until you have made positive, direct eye contact with the operator and have received a clear hand signal acknowledging your presence. Assume you are invisible until you have been explicitly seen and acknowledged.$$ 
    ),
    jsonb_build_object(
      'title','Communication is Life: Spotters and Hand Signals (4:55 - 5:20)',
      'content', $$To safely navigate these massive blind spots, especially when backing or maneuvering in congested areas, you must rely on a formal communication system built around spotters and standardized hand signals. A spotter acts as the operator's eyes and ears on the ground. The spotter's only responsibility is to ensure the safe movement of the equipment. They must remain fully focused on the task, with no distractions like cell phones or other duties.
The communication between the spotter and operator must be clear, concise, and unambiguous. While two-way radios can be used, the primary method is a set of standardized hand signals. It is essential that everyone on site—all operators and all ground personnel—uses the exact same signals to prevent deadly misinterpretations.
The core principles of this system are:
- The operator and spotter must agree on the signals and the plan of movement before the equipment moves.
- The spotter must always remain in a safe position, visible to the operator in their mirrors, and never place themselves in the equipment's path of travel.
- The operator must stop the equipment immediately if they lose sight of the spotter for any reason.
Table 2: Standardized Hand Signals for Mobile Equipment Communication
Signal Name | Graphic Illustration / Description
Stop | Arm extended, palm down, hold position rigidly.
Emergency Stop | Both arms extended, palms down, move arms back and forth horizontally.
Move Forward (Come to Me) | Both arms raised, palms facing inward, swing arms toward the chest.
Back Up | Both arms at sides, palms facing forward, push arms straight back.
Turn | Arm extended horizontally, pointing in the direction of the turn. The other arm makes a "move forward" or "back up" signal to indicate direction of travel.
Raise Load / Boom Up | Arm extended, fingers closed, thumb pointing upward.
Lower Load / Boom Down | Arm extended, fingers closed, thumb pointing downward.
(Note: This table presents a simplified set of the most common signals. A comprehensive site-specific list should be used.)$$ 
    ),
    jsonb_build_object(
      'title','Interactive Simulation 3: Navigating the Haul Road (5:20 - 5:40)',
      'content', $$lovable.dev Simulation Concept:
This simulation places you in the operator's seat to test your understanding of the complete mobile equipment safety system, including blind spot awareness, traffic patterns, and reliance on a spotter.
Objective: You must safely operate a large haul truck through a congested work area, correctly identify and react to a blind spot hazard, and then back up to a stockpile to dump a load by correctly interpreting a spotter's hand signals.
Scenario: You will begin in a first-person view from the cab of a 100-ton haul truck. The initial task is to drive from the pit loading area to a designated dump point on a stockpile. The haul road is shared with smaller service trucks and ground personnel.
Gameplay and Feedback:
Blind Spot Hazard: As you drive along the haul road, a smaller pickup truck will approach from behind and attempt to pass on the right (passenger) side, entering the haul truck's largest blind spot. Your right-side mirror will show the truck approaching, but then it will disappear from view. At this moment, your virtual supervisor will radio in with an instruction to "pull over to the right."
Correct Reaction: You recognize the blind spot hazard and radio back, "Negative, holding position, vehicle in my right-side blind spot." You wait until the pickup truck reappears in front of you before moving to the right. This action is rewarded with positive feedback.
Incorrect Reaction: If you follow the instruction and turn right while the pickup is in the blind spot, a simulated collision occurs. The screen freezes with the message: "CRITICAL ERROR: FAILED TO ACCOUNT FOR BLIND SPOT. Never maneuver without confirming your path is clear." The simulation resets.
Spotter Communication: Upon reaching the dump point, a virtual spotter appears. The spotter will use hand signals to guide you backward toward the berm. The spotter will signal: "Back Up," then "Turn Left," then "Back Up," and finally "Stop."
Correct Interpretation: You correctly follow each command, stopping the truck just before the rear tires touch the berm.
Misinterpreting Signals: If you misinterpret a signal (e.g., turn right instead of left) or fail to stop on the "Stop" signal, the simulation shows the truck breaking through the berm and becoming unstable.
Losing Sight of Spotter: If you turn the truck in such a way that the spotter is no longer visible in either mirror, the simulation freezes with a large red warning: "STOP IMMEDIATELY: VISUAL CONTACT WITH SPOTTER LOST."$$ 
    ),
    jsonb_build_object(
      'title','Stationary Killers: Conveyors & Cranes (5:40 - 5:45)',
      'content', $$The dangers of powerful equipment are not limited to vehicles that move around the site. Stationary equipment like belt conveyors and cranes are also major sources of fatal accidents. Conveyors are a leading cause of entanglement, where a miner's clothing, tool, or body part is caught by a moving component. The primary hazards are ingoing nip points at the head, tail, and take-up pulleys, as well as return rollers. All of these moving parts must be protected by physical guards. Never attempt to clean, service, or retrieve material from a conveyor while it is in motion. Before any maintenance work, you must perform a full LOTO procedure and, critically, block the belt against motion to release any stored energy from tension in the take-up system.
Cranes and other lifting equipment require diligent pre-lift planning. Always know the weight of your load and verify that it is within the crane's rated capacity by consulting the load chart. Inspect all rigging before use. The most severe crane accidents often involve contact with overhead power lines; maintain safe distances at all times. Never work or stand under a suspended load.$$ 
    )
  )
) WHERE id = '9707a80c-7f00-448e-af40-11fbc42bc4fa';

-- Unit 5: Other Critical Surface Hazards + Module Conclusion
UPDATE lessons SET content_data = jsonb_build_object(
  'sections', jsonb_build_array(
    jsonb_build_object(
      'title','Learning Objectives',
      'content', $$Upon completion of this unit, you will be able to:
- Identify common causes of slips, trips, and falls and state preventative measures, including the importance of good housekeeping and proper illumination.
- List key safety rules for non-blasters when working in or near a blasting area.$$ 
    ),
    jsonb_build_object(
      'title','Slips, Trips, Falls, and Illumination (5:45 - 5:55)',
      'content', $$While this course has focused on the high-energy hazards that lead to the most severe fatalities, you must not overlook the most frequent cause of injuries on a mine site: slips, trips, and falls. Combined with material handling incidents, these account for approximately 60 percent of all lost-time accidents. These injuries can range from minor sprains to permanently disabling fractures. The primary causes are often simple and preventable: poor housekeeping. Spills, debris, tools left in walkways, and uneven surfaces are all major contributors. Maintaining clean and orderly work areas is a fundamental safety responsibility for everyone. Proper footwear with non-slip soles is also essential, especially in wet or icy conditions.
Working at night or in low-light conditions introduces another layer of risk. Under 30 CFR § 56.17001, the mine operator must provide illumination sufficient to provide safe working conditions in all work areas, including paths, walkways, loading and dumping sites, and on surface structures. If you cannot see a hazard, you cannot avoid it. Ensure that mobile equipment lights are functional and report any areas with inadequate lighting immediately. Portable lights must be equipped with guards to prevent shock or burn hazards.$$ 
    ),
    jsonb_build_object(
      'title','Blasting and Explosives Safety (5:55 - 6:00)',
      'content', $$Finally, a brief address on blasting safety. The handling and use of explosives are restricted to trained and authorized personnel only. For everyone else, your responsibility is hazard avoidance. Every mine has a system of audible warning signals that are sounded before a blast. You must know what these signals are. Obey all posted signs and physical barricades that restrict access to a blast area. Never enter a blast area after a shot until the certified blaster in charge has inspected the area for misfires and has given the official "all clear" signal.$$ 
    ),
    jsonb_build_object(
      'title','Module Conclusion & Final Assessment (6:00 - 6:15)',
      'content', $$Synthesizing Knowledge: A Final Review (6:00 - 6:05)
Over the past six hours, you have completed an in-depth review of the most significant hazards you will face at a surface mine. You have analyzed the tragic lessons from MSHA fatality reports and learned the critical safety procedures designed to prevent those accidents from recurring. You have covered the invisible threat of electricity and the master control of LOTO. You have learned to read the language of the earth to anticipate ground failures. You have mapped the blind spots of massive equipment and established a communication system to work safely around them.
The common thread connecting all these topics is the See, Think, Act cycle. Hazard recognition is not a passive activity; it is an active, continuous process. You have the knowledge, the tools, and the legal right to work safely. It is your responsibility to use them every minute of every shift to protect yourself and your coworkers.
Final Knowledge Assessment (6:05 - 6:15)
A 20-question digital quiz will now be administered to assess your comprehension of the material presented. The quiz will consist of a mix of multiple-choice and scenario-based questions designed to test the application of knowledge, not just rote memorization. A passing score of 80% is required to successfully complete this module. Upon successful completion, your training will be certified and recorded by a competent person on MSHA Form 5000-23 or an equivalent record that contains all information required under 30 CFR § 46.9.$$ 
    )
  )
) WHERE id = '17b24e54-5997-4591-9d60-c9aace8506b8';

-- Enhance quiz instructions to reflect conclusion verbiage
UPDATE lessons SET content_data = jsonb_set(
  content_data,
  '{instructions}',
  to_jsonb('This assessment consists of 20 questions covering all units of Module 2. A passing score of 80% (16 out of 20 correct) is required to successfully complete this module. Upon successful completion, your training will be certified and recorded on MSHA Form 5000-23.\n\nBefore you begin: Over the past six hours, you reviewed electrical hazards and LOTO, ground control, mobile equipment communication, and other critical surface hazards. Apply the See–Think–Act cycle as you answer.'::text)
) WHERE id = '2dd5a4a8-f3d6-488a-9fb8-25dddf323874';