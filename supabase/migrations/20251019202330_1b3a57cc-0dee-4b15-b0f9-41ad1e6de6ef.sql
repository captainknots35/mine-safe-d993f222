-- Continue with Water Emergencies and Fire Response lessons
-- Adding complete protocols and case studies from PDF

-- Update Water Emergencies lesson
UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{content}',
  to_jsonb('# Section 2.2: Water Inundation and Submersion Emergencies

Drowning is a leading cause of fatalities in surface mining, particularly in dredging and sand/gravel operations where work is conducted in or near water. Between 2010 and 2023, there were **19 drowning accidents** in surface mining, with **11 of these involving the submersion of mobile equipment** such as excavators, dredges, and haul trucks. The immediate actions taken by an equipment operator whose machine enters the water can mean the difference between escape and drowning.

## Equipment Submersion: The 90-Second Window

When mobile equipment enters water—whether due to ground failure at the water''s edge, a vehicle going through a berm, or a dredge capsizing—the operator''s survival depends on a **calm and practiced response**. Research and accident reconstruction have shown that most heavy equipment will float for a brief period before sinking completely. This window of buoyancy is typically **60 to 90 seconds**, but it can be much shorter depending on the weight and design of the machine and whether windows or doors are open.

### Case Study: Ground Failure at Water''s Edge

**Incident 1:** March 5, 2021 - A mine manager was killed when the ground his excavator was operating on sloughed off, causing the excavator to fall 13 feet into a dredge pond and become submerged.

**Incident 2:** June 30, 2023 - A dredge operator was killed when the ground supporting a floating dredge gave way, causing the dredge to capsize and become submerged.

Both incidents involved working too close to the unstable edge of a body of water. In the case of the excavator, the operator did not escape the cab in time. In the dredge capsizing, the operator was trapped inside as the structure inverted and sank.

## The Submersion Escape Protocol

If your equipment enters water or begins to capsize, follow this protocol without hesitation:

### 1. DO NOT CALL FOR HELP FIRST
- Your instinct will be to grab the radio and call for help. **Resist this instinct.** You have less than 90 seconds. Every second spent on the radio is a second you are not using to escape. You can call for help after you are safely out of the machine and in the water.

### 2. RELEASE YOUR SEATBELT IMMEDIATELY
- If the machine inverts or goes underwater, you will be unable to release the seatbelt due to the pressure of your body weight against it. Release it now while you still can.

### 3. OPEN THE DOOR OR WINDOW NOW
- Do not wait for the cab to fill with water to "equalize the pressure." That is a myth popularized by movies and it wastes precious seconds. The door will be openable for only a brief time. Once the machine begins to sink or invert, the pressure differential and the machine''s orientation will make it impossible to open.
- If the door will not open, break the window using the emergency window hammer that should be mounted in every cab. Aim for the corners of the window, where the glass is weakest.

### 4. EXIT THE CAB
- Swim out through the door or window. If the machine has already begun to sink, swim toward the surface (follow the direction of air bubbles).

### 5. SWIM AWAY FROM THE MACHINE
- Heavy equipment creates suction and turbulence as it sinks. Swim laterally away from the machine to avoid being pulled down with it.

### 6. ONCE SAFE, CALL FOR HELP
- Once you have reached a safe location (the shore, a floating object, or treading water at a safe distance), then you can call for help or signal for assistance.

## Preventive Measures

The best response to a submersion emergency is to prevent it from occurring:

- **Maintain Safe Distance:** MSHA regulations require that the travelway for mobile equipment be kept a safe distance from the edge of any body of water. This distance must account for the stability of the ground and the potential for the edge to fail.
- **Inspect Berms:** Ensure that berms or barriers along waterways and pond edges are of adequate height, strength, and design to prevent vehicles from going over.
- **Examine Ground Conditions:** Before operating near water, a competent person must examine the ground for signs of instability, such as tension cracks or slumping. This is particularly critical after periods of heavy rain.

---

# Section 2.3: Fire and Explosion Response

Fire is one of the most feared hazards in any industrial setting, and mining is no exception. While large-scale mine fires are relatively uncommon, fires involving mobile equipment, conveyors, fuel storage, and electrical systems occur with regularity. Additionally, surface stone operations use explosives, which carry inherent risks of fire and accidental detonation.

## Types of Fire and Fire Extinguisher Selection

Understanding the class of fire you are facing is critical to selecting the correct extinguisher. Using the wrong type of extinguisher can be ineffective or, in some cases, dangerous.

### Fire Classifications

| Class | Fuel Type | Examples | Correct Extinguisher |
|-------|-----------|----------|---------------------|
| **Class A** | Ordinary combustibles (wood, paper, cloth) | Office fires, trash fires | Water, Class ABC Dry Chemical, Class A Foam |
| **Class B** | Flammable liquids and gases | Diesel, gasoline, hydraulic fluid, grease | Class ABC Dry Chemical, Class BC, CO₂ |
| **Class C** | Electrical equipment | Electrical panels, wiring, energized equipment | Class ABC Dry Chemical, CO₂ (non-conductive) |
| **Class D** | Combustible metals | Magnesium, titanium (rare in surface mining) | Specialized Class D extinguisher |

**Most mine sites use Class ABC Dry Chemical extinguishers** as standard equipment on mobile equipment and at strategic locations because they are effective against the most common types of fires encountered.

## The P.A.S.S. Method for Fire Extinguisher Use

Every miner must be trained in the use of portable fire extinguishers. The P.A.S.S. method is a simple, memorable way to recall the correct procedure:

**P - Pull** the pin. This breaks the tamper seal and allows you to discharge the extinguisher.

**A - Aim** low, at the base of the fire. Aiming at the flames themselves is ineffective; you must aim at the fuel source.

**S - Squeeze** the lever slowly and evenly to discharge the extinguishing agent.

**S - Sweep** from side to side at the base of the fire, starting from the nearest edge and working toward the back of the fire, until it is completely extinguished.

### Critical Fire Safety Rules

1. **Always position yourself between the fire and your only exit route.** Never allow the fire to get between you and safety.
2. **Stay Low and Upwind.** Smoke and toxic fumes rise and drift downwind. Position yourself upwind of the fire and stay low to avoid inhalation.
3. **If the extinguisher empties and the fire is not out, EVACUATE IMMEDIATELY.** Do not stay to fight a fire you cannot extinguish.
4. **Never fight a tire fire.** Tire fires burn extremely hot, produce toxic smoke, and can result in explosive ruptures that send tire fragments flying at high velocity. If a tire is on fire, evacuate to a minimum safe distance of 100 feet and wait for the fire department.

## Mobile Equipment Fire Response

The majority of mine fires involve mobile equipment. Hydraulic line ruptures spraying fluid onto hot engine components, fuel leaks, and electrical shorts can all ignite quickly.

### Immediate Actions for an Equipment Fire:

1. **Stop** the vehicle immediately in a safe location (away from other equipment, fuel storage, or structures).
2. **Shut Off** the engine and all electrical systems using the master disconnect switch if accessible.
3. **Evacuate** the cab immediately. Do not delay to grab personal belongings.
4. **Radio for Help** using the L.I.P. protocol: "Emergency, Emergency, Emergency. This is [your name] in [vehicle number]. My location is [specific location]. I have an equipment fire."
5. **Exit** the vehicle and grab the portable fire extinguisher from its mount.
6. **Fight the Fire** from a safe distance, staying upwind and using the P.A.S.S. method.
7. **Never position yourself between the fire and your only escape route.**
8. If the fire is too large, or if it involves the tires, **evacuate to at least 100 feet** and wait for the fire department. Large equipment fires can cause fuel tanks to rupture and tires to explode.'::text)
)
WHERE title ILIKE '%water%' OR (title ILIKE '%ground%' AND title ILIKE '%water%')
AND module_id IN (SELECT id FROM modules WHERE title ILIKE '%emergency%');