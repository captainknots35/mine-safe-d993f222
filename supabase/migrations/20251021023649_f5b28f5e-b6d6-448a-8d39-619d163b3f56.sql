begin;
-- Update Lesson 4 content + videos
update lessons
set content_data = jsonb_build_object(
  'content', $markdown$
# Part 3: Hazard Recognition, Avoidance, and Control

## Introduction to Hazard Recognition (30 CFR § 46.5(b)(2))
We now shift from understanding the work environment to the most critical skill you will develop as a miner: the ability to recognize, avoid, and control hazards. A hazard is any condition, practice, or behavior that has the potential to cause harm. Workplace Examinations by a competent person are required at the start of each shift and after any blast; your own constant, systematic search for hazards is essential.

## Focus Area 1: Powered Haulage & Mobile Equipment
Powered haulage is a leading cause of fatal accidents in surface mining. The sheer size and power of equipment demand constant respect and awareness.

Immersive Scenario: You are in a pickup truck approaching an intersection on a main haul road. A 180-ton haul truck is approaching from your left. Due to massive blind spots, there is a very good chance the operator cannot see you.

Controls & Safe Practices:
- Traffic Control: Follow established traffic patterns, speed limits, and signage. Smaller vehicles yield to larger equipment.
- Communication: Establish positive radio or horn communication before entering active haulage areas or blind corners.
- Pre-Operational Checks: Walk-around inspection of tires, lights, alarms, brakes, and steering. Correct defects before use.
- Seatbelts: Mandatory whenever operating mobile equipment.

## Focus Area 2: Machinery, Conveyors, and Lockout/Tagout (LOTO)
Scenario: A rock wedges in a conveyor chute. Never reach in—stored energy or remote restarts kill.

Controls & Safe Practices:
- Guarding: All moving parts must be physically guarded; do not operate without proper guards.
- Lockout/Tagout (LOTO): De‑energize and apply a personal lock/tag before maintenance or clearing jams.
- Conveyor Safety: Never cross or work under moving belts; cleaning rollers while moving is a common entanglement cause.

## Focus Area 3: Ground Control (Highwalls & Stockpiles)
Scenario: After heavy rain, a new tension crack appears parallel to the crest and small pebbles fall—classic signs of impending ground failure. Move away immediately and report.

Controls & Safe Practices:
- Visual Inspection: Watch for tension cracks, bulging/sloughing, seeping water, or loose rock.
- Safe Positioning: Never park or work where falling material could strike you; keep escape routes clear.
- Scaling: Remove loose rock from a safe position, typically from above, using fall protection.
- Stockpile Safety: Never excavate material from the base of a pile; reclaim from the top.

## Focus Area 4: Electrical Hazards
Scenario: Truck bed rising near overhead power lines. Electrocution hazard.

Controls & Safe Practices:
- Maintain 10‑ft minimum approach distance.
- Inspect cables/boxes; report damage immediately.
- Only qualified electricians perform electrical work with strict LOTO; never assume a circuit is off.
- Use extra caution around water and wet conditions.

## Pervasive Site‑Wide Hazards
- Water Safety (dredging): Wear USCG‑approved PFD; maintain good housekeeping on wet decks.
- Health Hazards: Respirable silica dust (control with water sprays/ventilation; respirators as required), noise (hearing protection), and chemicals (HazCom program, SDS, PPE).

## Your Most Important Job: Hazard Reporting (30 CFR § 46.5(b)(7))
Report hazards first to your supervisor; escalate to the chain of command, miners' representative, or MSHA as needed. Reporting is your legal right and obligation.
$markdown$,
  'videos', json_build_array(
    json_build_object('url','https://www.youtube.com/watch?v=_d1Y__h5BSQ','title','Truck Blind Spots','description','Visualization of equipment blind spots.'),
    json_build_object('url','https://www.youtube.com/watch?v=-DIod50ZEu4','title','Lockout/Tagout Procedure','description','Step-by-step LOTO demo.'),
    json_build_object('url','https://www.youtube.com/watch?v=G5HnPX6cBeQ','title','Inspecting Highwalls','description','MSHA highwall examination guidance.'),
    json_build_object('url','https://www.youtube.com/watch?v=hw7ruTSZwXM','title','Stockpile Hazards','description','MSHA: hazards of stockpiling operations.')
  )
)
where id = '5b661df6-0187-4611-8831-e8101c27eff2';

-- Update Lesson 5 content + videos
update lessons
set content_data = jsonb_build_object(
  'content', $markdown$
# Part 4: Emergency Preparedness

## When Seconds Count: Emergency Plans (30 CFR § 46.5(b)(3))
- Emergency Medical Procedures: Know first‑aid/eyewash locations and the radio/call procedure; notify your supervisor immediately.
- Escape and Evacuation Plan: Posted plan shows primary and alternate escape routes. Know the designated assembly point for head count after an evacuation.

## Understanding the Alarms: Signals & Firefighting
Every mine uses audible alarms (horns/sirens) for different emergencies. Learn your site’s specific signals and required actions.

### Firefighting Procedures (P.A.S.S.)
- Pull the pin.
- Aim the nozzle at the base of the fire.
- Squeeze the handle.
- Sweep from side to side.
$markdown$,
  'videos', json_build_array(
    json_build_object('url','https://www.youtube.com/watch?v=3X_3iJ1FsV8','title','Mine Emergency Escape','description','Concepts for mine emergency evacuation.'),
    json_build_object('url','https://www.youtube.com/watch?v=7EMJMPfQy9Q','title','Fire Extinguisher: P.A.S.S.','description','Hands‑on demonstration of P.A.S.S. method.')
  )
)
where id = '2131fb79-d2c0-4e83-aabb-78eebfd4be30';

commit;