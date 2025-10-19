-- Update Module 3 lessons with comprehensive content from PDF Part 2
-- This updates lessons 2-4 with full detailed content including case studies

-- Update Lesson 2: Emergency Action Plan content
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{content}',
  to_jsonb('# Section 1: The Mine Emergency Action Plan and Incident Command

Every mine site is required to have a detailed, site-specific **Emergency Action Plan (EAP)**. This plan is the authoritative guide for all personnel during any emergency. It is not a document to be filed away; it is a **blueprint for coordinated, effective action**. A miner''s ability to survive and assist others in an emergency is directly proportional to their familiarity with this plan. This section provides the foundational knowledge required to read, understand, and, most importantly, use the site''s EAP. An effective response begins with understanding the pre-planned systems and procedures established for the specific environment of this mine.

---

## 1.1 Decoding Your Site''s Emergency Plan: Maps, Routes, and Safe Havens

The cornerstone of any EAP is the **mine map**, which serves as a visual guide for evacuation and response. The training for all new miners and newly hired experienced miners must include a thorough review of the site''s specific escape and emergency evacuation plans. This is not a cursory overview; it is a detailed study of the operational layout from a survival perspective.

Miners must be able to locate their position on a mine map at any given time and identify the following critical features:

### Primary and Secondary Escape Routes

These are pre-determined paths designed to lead personnel away from a hazard to a place of safety. **Primary routes** are the most direct and commonly used paths. **Secondary routes** provide an alternative if the primary route is blocked by fire, ground failure, or another hazard. Miners must physically walk these routes as part of their site introduction to build muscle memory. For example, a miner working in the north pit must know that the primary escape route is Haul Road #1 leading east, but if that road is blocked by a rockslide, the secondary route is the access ramp leading south to the lower bench.

### Designated Rally Points (Muster Points or Safe Havens)

These are specific, pre-designated locations where all personnel are required to assemble after an evacuation is ordered. These locations are chosen because they are a safe distance from operational hazards, allow for an accurate headcount of all personnel, and serve as a staging area for emergency services.

### Location of Emergency Equipment

The map will indicate the precise locations of all critical emergency response equipment. This includes first aid stations, automated external defibrillators (AEDs), emergency eyewash stations, fire extinguishers, spill kits, and emergency communication systems (e.g., landline phones, emergency radios). Knowing these locations prevents wasting critical time searching for supplies during an incident.

### Areas of Known or Potential Hazards

The map must also clearly delineate areas that pose a specific risk, such as electrical substations, fuel storage areas, explosives magazines, bodies of water, and areas with a history of unstable ground conditions. Knowing where these hazards are is essential for both avoiding them during an evacuation and for understanding the potential nature of an emergency in a given area.

The mine''s approved training plan, which this curriculum is designed to fulfill, serves as the overarching guide for how these subjects are taught. The EAP and its associated maps are dynamic tools that must be updated whenever site conditions change. A new haul road, a change in a pit''s layout, or the relocation of a stockpile requires a corresponding update to the plan and a briefing for all affected miners.

---

## 1.2 Signals, Alarms, and Warnings: Recognizing and Reacting to Warnings

An emergency response cannot begin until personnel are alerted to the danger. Mine sites use a system of audible and visual alarms to communicate specific emergency conditions across a wide, noisy area. A miner''s immediate and correct reaction to a signal can be the difference between a safe evacuation and a tragedy. Instruction on the site''s specific fire warning signals and other evacuation alarms is a mandatory component of this training module.

Miners must learn to distinguish between different types of signals used at the site. Common alarm systems include:

- **Evacuation Alarm:** Typically a continuous, high-intensity siren or horn, often accompanied by flashing strobe lights. The required action is to immediately cease all non-essential work, shut down equipment in a safe manner (if possible without delaying evacuation), and proceed via the nearest safe escape route to the designated rally point.

- **Fire Alarm:** May be a distinct pattern of horn blasts or a different siren tone. The initial action is similar to an evacuation, but with heightened awareness of the location of the fire to ensure the escape route does not lead toward the hazard.

- **Blasting Alarm:** A series of short horn blasts or a specific verbal announcement over the radio system signals that a blast is imminent. The required action is to evacuate the designated blast zone and take cover in an engineered, approved blast shelter. Remaining in a vehicle or behind a stockpile is not a substitute for a proper shelter.

- **"All Clear" Signal:** A different, distinct signal indicating that the emergency is over and it is safe to return to work, as directed by supervisors.

The proper response protocol follows a simple, three-step mental model: **Alert, Confirm, Act**

1. **Alert:** Recognize the signal. Is it the evacuation siren or the blasting horn?
2. **Confirm:** If possible and safe, quickly confirm the nature of the emergency via radio or by observing the actions of others. Do not delay evacuation to investigate. If you hear the evacuation alarm and see other miners moving towards the rally point, your confirmation is complete.
3. **Act:** Execute the pre-planned procedure associated with that specific alarm without hesitation.

---

## 1.3 Communication Protocols: The L.I.P. Lifeline

Clear, concise, and rapid communication is the nervous system of an effective emergency response. Every miner must know precisely how to report an incident. This training must include an introduction to the mine''s rules and procedures for reporting hazards and emergencies.

The primary tool for communication at most surface mines is a two-way radio. Miners must be proficient in its use, including selecting the correct channel for emergency traffic. All emergency communications should be made on a designated emergency channel to keep it clear of routine traffic. If a dedicated channel does not exist, the person reporting the emergency must state **"Emergency, Emergency, Emergency"** to clear the channel for their critical transmission.

To ensure all necessary information is conveyed quickly and accurately, miners must use a standardized reporting format. The **L.I.P. protocol** is a simple and effective method:

- **L - Location:** State your exact location as precisely as possible. (e.g., "Highwall of the north pit," "At the primary crusher," "Haul road #3 near the west stockpile.")
- **I - Identification:** State your name and, if necessary, your vehicle number. (e.g., "This is John Doe in Haul Truck 12.")
- **P - Problem:** State the nature of the emergency clearly and concisely. (e.g., "We have a haul truck rollover with one person trapped," "There is a fire on the main conveyor belt," "I''ve just witnessed a highwall collapse.")

An effective emergency radio call sounds like this: **"Emergency, Emergency, Emergency. This is Jane Smith in Loader 5. My location is the base of the main aggregate stockpile. We have a front-end loader that has rolled over. The operator is pinned inside the cab."** This is in stark contrast to an ineffective call, such as: "Hey, uh, somebody get over here! We got a problem with a loader by the big pile." The first provides actionable intelligence; the second creates confusion and delays response.

After the initial report, remain on the channel to provide additional information as requested by the supervisor or emergency coordinator, but do not clutter the channel with unnecessary conversation.'::text)
)
WHERE order_index = 2
AND module_id IN (SELECT id FROM modules WHERE title ILIKE '%emergency%');