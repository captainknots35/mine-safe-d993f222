-- Update Lesson 4: Hazard Recognition, Avoidance, and Control with correct structure
UPDATE lessons 
SET 
  title = 'Part 3: Hazard Recognition, Avoidance, and Control',
  description = 'Learn to identify, avoid, and control the major hazards present in surface mining operations.',
  duration_minutes = 40,
  content_data = jsonb_build_object(
    'sections', jsonb_build_array(
      jsonb_build_object(
        'heading', 'Introduction to Hazard Recognition (30 CFR § 46.5(b)(2))',
        'content', 'We now shift from understanding the work environment to the most critical skill you will develop as a miner: the ability to recognize, avoid, and control hazards. A hazard is any condition, practice, or behavior that has the potential to cause harm. True safety is not just about reacting to accidents; it is about proactively identifying and eliminating the hazards that cause them.

A formal part of this process is the Workplace Examination. Federal regulations require that a competent person examine each working area for hazardous conditions at the beginning of every shift and after any blast. As a miner, you also have a personal responsibility to examine your own work area before you start work and to remain vigilant for changing conditions throughout your shift. This is not a passive glance around. It is an active, systematic search for hazards. The goal of this section is to train your brain to perform this function constantly, turning you from a passive observer into an active risk assessor.'
      ),
      jsonb_build_object(
        'heading', 'Focus Area 1: Powered Haulage & Mobile Equipment',
        'content', 'Powered haulage—the movement of materials by mobile equipment—is consistently a leading cause of fatal accidents in surface mining. The sheer size and power of the equipment demand constant respect and situational awareness.

Immersive Scenario: You are in a pickup truck approaching an intersection on a main haul road. A 180-ton haul truck is approaching from your left. The driver is high up in the cab, and the tires alone are twice as tall as you are. What do you see? More importantly, what do you not see?

You cannot see the driver''s eyes, and due to massive blind spots, there is a very good chance they cannot see you. You must never assume a heavy equipment operator sees you. The immense weight and momentum of that truck mean it cannot stop quickly.

Controls & Safe Practices:
• Traffic Control: Always follow the mine''s established traffic patterns, speed limits, and signage. As a rule, smaller vehicles always yield the right-of-way to larger equipment.
• Communication: Before entering an active haulage area or navigating a blind corner, establish positive communication. This may be via two-way radio or by using designated horn signals.
• Pre-Operational Checks: Before you operate any piece of mobile equipment, you must conduct a pre-operational check. This includes a walk-around inspection of tires, lights, alarms, and a check of brakes and steering. Any defect that affects safety must be reported to your supervisor and corrected before the equipment is used.
• Seatbelts: Seatbelts must be worn at all times when operating mobile equipment. They are your single most important piece of safety equipment in the event of an overturn.
• Berms and Dump Points: Berms are required at the outer edge of elevated roadways to help prevent overtravel. When dumping a load, always stay back from the edge, especially if the ground appears unstable. Never position your equipment too close to the crest. A 2016 MSHA alert described a serious accident where a haul truck drove through a berm and rolled down the face of a dam, highlighting the critical importance of this barrier.'
      ),
      jsonb_build_object(
        'heading', 'Focus Area 2: Machinery, Conveyors, and Lockout/Tagout (LOTO)',
        'content', 'The processing plant is a high-energy environment filled with powerful machinery. Crushers, screens, and conveyor systems have many moving parts that can cause severe entanglement, amputation, and crush injuries.

Immersive Scenario: You are walking through the screen house. The noise is deafening. You see a rock has become wedged in a conveyor chute, causing material to back up. Your first instinct might be to reach in and pull it out. Why is this potentially the last mistake you will ever make?

Even if the belt is stopped, the stored energy in the system could be released, or someone could restart it from a remote location. Reaching into moving machinery is a leading cause of fatal accidents.

Controls & Safe Practices:
• Guarding: All moving machine parts, such as gears, belts, and rotating shafts, must be protected by physical guards to prevent contact. Never remove a guard, and if you see one that is missing or damaged, report it immediately. Do not operate the equipment until it is fixed.
• Lockout/Tagout (LOTO): Before performing any maintenance, repair, or clearing a jam, the equipment''s energy source must be isolated and controlled. This means the electrical circuit is de-energized, and a personal lock and tag are placed on the disconnect switch by the person performing the work. This ensures the machine cannot be accidentally re-energized. In 2023, a miner was fatally injured while performing maintenance inside a jaw crusher when the moving jaw rotated and pinned him. Proper LOTO would have prevented this tragedy.
• Conveyor Safety: Never climb on, cross over, or travel under a moving conveyor belt except at designated crossovers. Be aware of the dangers of cleaning pulleys and rollers while the belt is in motion, as this is a common cause of entanglement.'
      ),
      jsonb_build_object(
        'heading', 'Focus Area 3: Ground Control (Highwalls & Stockpiles)',
        'content', 'The ground itself can be one of the biggest hazards on a mine site. Falls of highwalls or collapses of stockpiles can happen suddenly and with immense force.

Immersive Scenario: You are working at the toe of a highwall. It rained heavily all night. As you start your work, you look up and see a new, fine crack running parallel to the crest. A few small pebbles begin to fall. What is the ground telling you? What is your immediate action?

These are classic warning signs of impending ground failure. The water from the rain has lubricated a plane of weakness in the rock and increased the pressure. Your immediate action is to move away from the area and report your observations to your supervisor immediately.

Controls & Safe Practices:
• Visual Inspection: Constantly be aware of ground conditions. Look for signs of instability such as tension cracks, bulging or sloughing of the face, seeping water, or loose rock on the benches above you. Report any changes immediately.
• Safe Positioning: Never park vehicles, equipment, or work in a location where you could be struck by falling material. When working near a highwall, always be aware of your escape route and ensure it is not blocked by equipment.
• Scaling: Loose, hazardous rock must be removed from the highwall through a process called scaling. This must always be done from a safe location, typically from above the hazard, with the miner securely tied off with fall protection.
• Stockpile Safety: Never excavate material from the base of a stockpile. This undercuts the pile, making it unstable and creating a severe engulfment hazard. Material should always be reclaimed from the top of the pile.'
      ),
      jsonb_build_object(
        'heading', 'Focus Area 4: Electrical Hazards',
        'content', 'High-voltage electricity is the unseen force that powers most of a mine''s processing equipment. It is an invisible but lethal hazard.

Immersive Scenario: A haul truck driver is raising the truck bed to dump a load of material near a set of overhead power lines. You notice the top of the bed is getting dangerously close to the wires. What is the hazard, and what should you do?

The hazard is electrocution. If the truck bed contacts the energized line, the entire truck can become electrified, and anyone touching it could be killed. Your immediate action is to get the driver''s attention by any means necessary (radio, horn) to stop them before contact is made.

Controls & Safe Practices:
• Safe Approach Distance: All equipment must maintain a minimum distance of 10 feet from overhead power lines.
• Inspect Cables and Equipment: Always be on the lookout for damaged electrical cables, uncovered junction boxes, or any signs of electrical malfunction. Report them immediately.
• LOTO for Electrical Work: Only qualified and authorized electricians are permitted to perform electrical work. They must follow strict LOTO procedures to de-energize and verify that a circuit is dead before beginning work. Never assume an electrical circuit is off.
• Water and Electricity: Exercise extreme caution when working with or around electrical equipment in wet conditions, as water greatly increases the risk of electrocution.'
      ),
      jsonb_build_object(
        'heading', 'Pervasive Site-Wide Hazards',
        'content', 'Some hazards are present across all types of surface mining operations.

Water Safety (especially for Dredging): Drowning is a leading cause of death in dredging operations. Anyone working over or near water where there is a danger of falling in must wear a U.S. Coast Guard-approved Personal Flotation Device (PFD). Good housekeeping on dredge decks and walkways is critical to prevent slips and falls that could end up in the water.

Health Hazards (The Invisible Dangers):
• Respirable Dust (Silica): The dust created by drilling, blasting, crushing, and transporting stone, sand, and gravel often contains respirable crystalline silica. Inhaling this fine dust over time can cause silicosis, a progressive and incurable lung disease. Dust is controlled using water sprays and ventilation systems, and you may be required to wear a respirator.
• Noise: The constant, high-decibel noise from processing plants and heavy equipment can cause permanent hearing loss. Hearing protection is required in designated high-noise areas.
• Chemicals (HazCom): Your employer must have a Hazard Communication (HazCom) program. You have a right to be trained on the hazardous chemicals used in your work area, to know their specific risks by reading Safety Data Sheets (SDS), and to be provided with the proper PPE to handle them safely.

Slips, Trips, and Falls: These are among the most common causes of injury. Good housekeeping is the best prevention. Keep walkways clear of tools, debris, and spilled materials.'
      ),
      jsonb_build_object(
        'heading', 'Your Most Important Job: Hazard Reporting (30 CFR § 46.5(b)(7))',
        'content', 'We have now covered the major hazards you will encounter. But recognizing a hazard is only the first step. The critical final step is reporting it so it can be corrected. This is a mandatory topic of your training and a cornerstone of the mine''s safety program.

Every mine has a specific procedure for reporting hazards. The first person you must always report a hazard to is your immediate supervisor. If the hazard is not corrected in a timely manner, you should report it up the chain of command, to your miners'' representative, or, if necessary, directly to MSHA. Remember your rights: reporting a hazard is not "causing trouble." It is your legal right, your professional responsibility, and the single most effective action you can take to prevent an accident and protect yourself and your coworkers.'
      )
    )
  )
WHERE id = '5b661df6-0187-4611-8831-e8101c27eff2';