-- Complete reseeding with Lessons 4 and 5

-- Lesson 4: Hazard Recognition, Avoidance, and Control
UPDATE public.lessons
SET content_data = jsonb_build_object(
  'content', '# Part 3: Hazard Recognition, Avoidance, and Control

## Introduction to Hazard Recognition (30 CFR § 46.5(b)(2))

We now shift from understanding the work environment to the most critical skill you will develop as a miner: the ability to recognize, avoid, and control hazards. A hazard is any condition, practice, or behavior that has the potential to cause harm. True safety is not just about reacting to accidents; it is about proactively identifying and eliminating the hazards that cause them.

A formal part of this process is the Workplace Examination. Federal regulations require that a competent person examine each working area for hazardous conditions at the beginning of every shift and after any blast. As a miner, you also have a personal responsibility to examine your own work area before you start work and to remain vigilant for changing conditions throughout your shift. This is not a passive glance around. It is an active, systematic search for hazards. The goal of this section is to train your brain to perform this function constantly, turning you from a passive observer into an active risk assessor.

---

## Focus Area 1: Powered Haulage & Mobile Equipment

Powered haulage—the movement of materials by mobile equipment—is consistently a leading cause of fatal accidents in surface mining. The sheer size and power of the equipment demand constant respect and situational awareness.

### Immersive Scenario

You are in a pickup truck approaching an intersection on a main haul road. A 180-ton haul truck is approaching from your left. The driver is high up in the cab, and the tires alone are twice as tall as you are. What do you see? More importantly, what do you not see?

You cannot see the driver''s eyes, and due to massive blind spots, there is a very good chance they cannot see you. You must never assume a heavy equipment operator sees you. The immense weight and momentum of that truck mean it cannot stop quickly.

### Controls & Safe Practices

- **Traffic Control:** Always follow the mine''s established traffic patterns, speed limits, and signage. As a rule, smaller vehicles always yield the right-of-way to larger equipment.
- **Communication:** Before entering an active haulage area or navigating a blind corner, establish positive communication. This may be via two-way radio or by using designated horn signals.
- **Pre-Operational Checks:** Before you operate any piece of mobile equipment, you must conduct a pre-operational check. This includes a walk-around inspection of tires, lights, alarms, and a check of brakes and steering. Any defect that affects safety must be reported to your supervisor and corrected before the equipment is used.
- **Seatbelts:** Seatbelts must be worn at all times when operating mobile equipment. They are your single most important piece of safety equipment in the event of an overturn.
- **Berms and Dump Points:** Berms are required at the outer edge of elevated roadways to help prevent overtravel. When dumping a load, always stay back from the edge, especially if the ground appears unstable. Never position your equipment too close to the crest. A 2016 MSHA alert described a serious accident where a haul truck drove through a berm and rolled down the face of a dam, highlighting the critical importance of this barrier.

---

## Focus Area 2: Machinery, Conveyors, and Lockout/Tagout (LOTO)

The processing plant is a high-energy environment filled with powerful machinery. Crushers, screens, and conveyor systems have many moving parts that can cause severe entanglement, amputation, and crush injuries.

### Immersive Scenario

You are walking through the screen house. The noise is deafening. You see a rock has become wedged in a conveyor chute, causing material to back up. Your first instinct might be to reach in and pull it out. Why is this potentially the last mistake you will ever make?

Even if the belt is stopped, the stored energy in the system could be released, or someone could restart it from a remote location. Reaching into moving machinery is a leading cause of fatal accidents.

### Controls & Safe Practices

- **Guarding:** All moving machine parts, such as gears, belts, and rotating shafts, must be protected by physical guards to prevent contact. Never remove a guard, and if you see one that is missing or damaged, report it immediately. Do not operate the equipment until it is fixed.
- **Lockout/Tagout (LOTO):** Before performing any maintenance, repair, or clearing a jam, the equipment''s energy source must be isolated and controlled. This means the electrical circuit is de-energized, and a personal lock and tag are placed on the disconnect switch by the person performing the work. This ensures the machine cannot be accidentally re-energized. In 2023, a miner was fatally injured while performing maintenance inside a jaw crusher when the moving jaw rotated and pinned him. Proper LOTO would have prevented this tragedy.
- **Conveyor Safety:** Never climb on, cross over, or travel under a moving conveyor belt except at designated crossovers. Be aware of the dangers of cleaning pulleys and rollers while the belt is in motion, as this is a common cause of entanglement.

---

## Focus Area 3: Ground Control (Highwalls & Stockpiles)

The ground itself can be one of the biggest hazards on a mine site. Falls of highwalls or collapses of stockpiles can happen suddenly and with immense force.

### Immersive Scenario

You are working at the toe of a highwall. It rained heavily all night. As you start your work, you look up and see a new, fine crack running parallel to the crest. A few small pebbles begin to fall. What is the ground telling you? What is your immediate action?

These are classic warning signs of impending ground failure. The water from the rain has lubricated a plane of weakness in the rock and increased the pressure. Your immediate action is to move away from the area and report your observations to your supervisor immediately.

### Controls & Safe Practices

- **Visual Inspection:** Constantly be aware of ground conditions. Look for signs of instability such as tension cracks, bulging or sloughing of the face, seeping water, or loose rock on the benches above you. Report any changes immediately.
- **Safe Positioning:** Never park vehicles, equipment, or work in a location where you could be struck by falling material. When working near a highwall, always be aware of your escape route and ensure it is not blocked by equipment.
- **Scaling:** Loose, hazardous rock must be removed from the highwall through a process called scaling. This must always be done from a safe location, typically from above the hazard, with the miner securely tied off with fall protection.
- **Stockpile Safety:** Never excavate material from the base of a stockpile. This undercuts the pile, making it unstable and creating a severe engulfment hazard. Material should always be reclaimed from the top of the pile.

---

## Focus Area 4: Electrical Hazards

High-voltage electricity is the unseen force that powers most of a mine''s processing equipment. It is an invisible but lethal hazard.

### Immersive Scenario

A haul truck driver is raising the truck bed to dump a load of material near a set of overhead power lines. You notice the top of the bed is getting dangerously close to the wires. What is the hazard, and what should you do?

The hazard is electrocution. If the truck bed contacts the energized line, the entire truck can become electrified, and anyone touching it could be killed. Your immediate action is to get the driver''s attention by any means necessary (radio, horn) to stop them before contact is made.

### Controls & Safe Practices

- **Safe Approach Distance:** All equipment must maintain a minimum distance of 10 feet from overhead power lines.
- **Inspect Cables and Equipment:** Always be on the lookout for damaged electrical cables, frayed cords, or equipment with damaged housings. Report any defects immediately.
- **Qualified Personnel Only:** Only electricians who are qualified and authorized may work on electrical equipment. Never attempt electrical repairs yourself.

---

## Pervasive Site-Wide Hazards

- **Water Safety (especially for Dredging):** Drowning is a leading cause of death in dredging operations. Anyone working over or near water where there is a danger of falling in must wear a U.S. Coast Guard-approved Personal Flotation Device (PFD). Good housekeeping on dredge decks and walkways is critical to prevent slips and falls that could end up in the water.
- **Health Hazards (The Invisible Dangers):**
  - **Respirable Dust (Silica):** The dust created by drilling, blasting, crushing, and transporting stone, sand, and gravel often contains respirable crystalline silica. Inhaling this fine dust over time can cause silicosis, a progressive and incurable lung disease. Dust is controlled using water sprays and ventilation systems, and you may be required to wear a respirator.
  - **Noise:** The constant, high-decibel noise from processing plants and heavy equipment can cause permanent hearing loss. Hearing protection is required in designated high-noise areas.
  - **Chemicals (HazCom):** Your employer must have a Hazard Communication (HazCom) program. You have a right to be trained on the hazardous chemicals used in your work area, to know their specific risks by reading Safety Data Sheets (SDS), and to be provided with the proper PPE to handle them safely.
- **Slips, Trips, and Falls:** These are among the most common causes of injury. Good housekeeping is the best prevention. Keep walkways clear of tools, debris, and spilled materials.

---

## Your Most Important Job: Hazard Reporting (30 CFR § 46.5(b)(7))

We have now covered the major hazards you will encounter. But recognizing a hazard is only the first step. The critical final step is reporting it so it can be corrected. This is a mandatory topic of your training and a cornerstone of the mine''s safety program.

Every mine has a specific procedure for reporting hazards. The first person you must always report a hazard to is your immediate supervisor. If the hazard is not corrected in a timely manner, you should report it up the chain of command, to your miners'' representative, or, if necessary, directly to MSHA. Remember your rights: reporting a hazard is not "causing trouble." It is your legal right, your professional responsibility, and the single most effective action you can take to prevent an accident and protect yourself and your coworkers.'
)
WHERE id = '5b661df6-0187-4611-8831-e8101c27eff2';

-- Lesson 5: Emergency Preparedness and Response
UPDATE public.lessons
SET content_data = jsonb_build_object(
  'content', '# Part 4: Emergency Preparedness

## When Seconds Count: Emergency Plans (30 CFR § 46.5(b)(3))

Despite our best efforts to control hazards, emergencies can still happen. A well-rehearsed emergency plan is essential to ensure an orderly and safe response. This is another mandatory component of your training.

- **Emergency Medical Procedures:** Your supervisor will show you the location of first-aid kits, emergency eyewash stations, and any on-site first-aid facilities. You must know the procedure for reporting an injury, which typically involves immediately notifying your supervisor and using the radio to call for help.
- **Escape and Evacuation Plan:** Every mine is required to have a detailed escape and emergency evacuation plan. This plan will be posted on the mine''s bulletin board and in other conspicuous places. It will show the primary and alternate escape routes from all main work areas. A critical part of the plan is the designated assembly point or meeting area where all personnel must report for a head count after an evacuation.

---

## Understanding the Alarms: Signals and Firefighting

In an emergency, clear and rapid communication is vital. Every mine uses a system of audible alarms, such as horns or sirens, to signal different types of emergencies. You must learn what these signals mean and what action is required for each.

### Table 3: Common Hazard Warning Signals and Required Actions

| Signal (Example) | Meaning | Required Action |
|------------------|---------|-----------------|
| Series of short horn blasts | Warning/Caution | Stop and assess situation |
| Continuous, steady siren | Emergency evacuation | Evacuate to assembly point |
| Intermittent, rising/falling siren | Fire alarm | Follow fire evacuation plan |
| Single long horn blast | All clear | Resume normal operations |

**Note:** This is an example. You will be trained on the specific signals used at your mine site.

---

## Firefighting Procedures

You will be shown the locations of fire extinguishers around your work area. You should be familiar with the P.A.S.S. method for using an extinguisher:

- **P**ull the pin.
- **A**im the nozzle at the base of the fire.
- **S**queeze the handle.
- **S**weep from side to side.

However, your first priority is your safety. You should only attempt to fight a fire if it is very small (e.g., wastebasket-sized), you have a clear escape route behind you, and you have been trained to use the extinguisher. Otherwise, your primary duties are to sound the alarm and evacuate the area immediately.

---

## Your Role in an Emergency

If an emergency occurs, remember these key steps:

1. **Stay calm.**
2. **Alert your coworkers and your supervisor immediately.**
3. **Follow the evacuation plan and proceed along the designated escape routes.**
4. **Report to your designated assembly point and wait for instructions from your supervisor.**
5. **Do not re-enter an evacuated area until an authorized person has declared it safe to do so.**

---

# Conclusion & Competency Check

## Summary of Key Learnings

Over the last four hours, we have covered the foundational knowledge you need to begin your career as a professional miner. We have discussed the safety partnership established by the Mine Act, which is built upon your statutory rights and responsibilities, the duties of your supervisor, and the role of your miners'' representative. We have taken a virtual tour of various surface mining operations to understand how different commodities are extracted and processed, and how those processes create unique hazard profiles. Most importantly, we have focused on the critical skill of active hazard recognition and reviewed the procedures for controlling those hazards and responding to emergencies.

The ultimate goal of this training, and of every safety rule and procedure at this mine, is simple: to ensure that you and every one of your coworkers go home safe and healthy at the end of every single shift.

---

## Evaluation/Competency Check

To verify your understanding of this critical information, you will now complete a short competency check. The questions will be based on the learning objectives we discussed at the beginning of the module and will include scenario-based questions to test your hazard recognition skills.

---

## Next Steps in Your Training

This four-hour module is only the beginning of your training journey. Under federal law, you must complete the full 24 hours of new miner training within your first 90 days of employment. Until you have completed that training, you are required to work under the close observation of an experienced miner who can ensure you are performing your work safely.

Throughout your career, you will receive additional training. Task Training will be provided any time you are assigned to a new task in which you have no previous experience. And every year, you will participate in an 8-hour Annual Refresher Training to review key safety and health principles and learn about any changes at the mine. Safety is a continuous learning process. Welcome to the mining industry. Let''s get to work safely.'
)
WHERE id = '2131fb79-d2c0-4e83-aabb-78eebfd4be30';