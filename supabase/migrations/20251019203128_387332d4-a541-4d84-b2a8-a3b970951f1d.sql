-- Update Hazmat and Weather Emergency lesson with complete protocols
-- Including the Three C's and 30-30 Rule

UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{content}',
  to_jsonb('# Section 4: Hazardous Material Spill Response

While large-scale chemical disasters are rare in surface non-metal mining, small- to medium-sized spills of fuels, hydraulic oils, and other industrial chemicals are a common operational hazard. An improper response can endanger workers, damage equipment, and harm the environment. A prompt, correct response can mitigate these risks effectively.

---

## 4.1 The "Three C''s" of Spill Response

This simple, memorable framework guides the initial actions for any spill:

### 1. CONTROL
**Stop the source of the spill** (but only if safe to do so)

- Turn a valve
- Rotate a punctured drum so the hole faces up
- Plug a small leak

⚠️ If the spill is large or the material is highly toxic or flammable, your first step is to **evacuate and alert others**.

### 2. CONTAIN
**Prevent the spill from spreading**

- Use absorbent materials from a spill kit (socks or booms) to create a dike around the spill
- If a spill kit is not immediately available, use soil or sand to create a berm

**Primary Goals:**
- Keep the spill in as small an area as possible
- Protect drains, culverts, and waterways

### 3. CLEAN UP
**Begin the cleanup process after containment**

- Apply absorbent materials (pads, pillows, or granular absorbents like cat litter)
- Work from the **outer edges toward the center** to prevent spreading the contamination

---

## 4.2 Responding to Fuel and Hydraulic Fluid Spills

Diesel fuel and hydraulic fluid are the **most common hazardous materials** on mine sites.

### Equipment and Preparation

**Spill Kit Locations:**
- All mobile equipment should be equipped with a spill kit
- Larger kits should be located at fuel depots and maintenance shops

**Typical Kit Contents:**
- Absorbent pads, socks, and pillows
- Personal protective equipment (PPE): gloves and goggles

### Response Protocol

Follow the **"Three C''s" framework** with special attention to **fire prevention**:

**Fire Prevention Measures:**
- Remove all ignition sources from the area
- A fuel spill is a Class B fire hazard
- Bring appropriate fire extinguishers to the scene as a precaution (ABC Dry Chemical or CO₂)

### Regulatory Context

**EPA''s Spill Prevention, Control, and Countermeasure (SPCC) Rule:**
- Facilities storing over 1,320 gallons of oil products require secondary containment
- Fuel storage tanks are often located inside concrete dikes or basins
- Designed to hold the entire tank volume plus rainfall
- These engineering controls are the first line of defense in a major leak

---

## 4.3 Hazard Communication (HazCom) in an Emergency: Using the Safety Data Sheet (SDS)

In the event of a spill involving a chemical you are unfamiliar with, your most powerful tool is the **Safety Data Sheet (SDS)**. MSHA''s Hazard Communication (HazCom) standard (30 CFR Part 47) requires that mine operators maintain an SDS for every hazardous chemical on site and that these are readily accessible to miners.

The SDS is a standardized, **16-section document** that provides comprehensive information on a chemical. For emergency response, you must know how to quickly locate **four critical sections**:

### Section 2: Hazards Identification
- Quick overview of the chemical''s dangers
- Signal words ("Danger" or "Warning")
- Hazard pictograms (e.g., flame, skull and crossbones, corrosion)

### Section 4: First-Aid Measures
- Details what to do if the chemical gets on your skin, in your eyes, is inhaled, or is ingested

### Section 5: Fire-Fighting Measures
- Describes suitable extinguishing media and specific hazards associated with a fire involving the chemical

### Section 6: Accidental Release Measures
- Provides specific instructions for spill response, including required PPE, containment methods, and cleanup procedures

> **Knowing how to access and quickly interpret these sections of the SDS can provide you with authoritative, life-saving information in the middle of a crisis.**

---

## 4.4 Reporting and Documentation

**All spills, no matter how small, must be reported to a supervisor.** The supervisor is responsible for determining if the spill constitutes a "reportable quantity" that requires notification to outside agencies, such as the National Response Center (NRC) or state environmental agencies. Proper documentation of the spill and the response actions taken is essential for regulatory compliance and for improving future response efforts.

---

# Section 5: Severe Weather Emergencies

Surface mining operations are, by their nature, completely exposed to the elements. Severe weather events such as thunderstorms, flash floods, and high winds are not just inconveniences; they are **serious safety hazards** that require specific emergency procedures.

---

## 5.1 Lightning: The Underrated Killer

Lightning is an extremely dangerous and often underestimated occupational hazard. It is **unpredictable** and can strike far from the main area of a thunderstorm.

### Risk Recognition and The 30-30 Rule

> **"When thunder roars, go indoors."**

This is the most important rule of lightning safety. **If you can hear thunder, you are close enough to the storm to be struck by lightning.** Lightning can strike more than 10 miles away from any rainfall. **Do not wait for the rain to start before seeking shelter.**

### The 30-30 Rule: A Simple, Practical Tool for Assessing the Threat

**Part 1: Threat Assessment**
1. When you see a flash of lightning, begin counting
2. If you hear thunder **before you count to 30**, the storm is within six miles and is **close enough to be a danger**
3. **Seek shelter immediately**

**Part 2: Return to Work**
1. After the storm passes, wait **30 minutes after the last clap of thunder** before leaving shelter and resuming work

---

### Safe and Unsafe Shelters

Knowing where to go is critical. **Not all structures provide protection from lightning.**

#### ✅ SAFE SHELTERS:

**Substantial, Fully Enclosed Buildings:**
- Buildings with electrical wiring and plumbing, which help to ground the structure

**Hard-Topped Metal Vehicles:**
- Haul trucks, loaders, and personal vehicles
- Roll up the windows and **do NOT touch the metal frame** of the vehicle
- It is the metal "cage" of the vehicle that protects you by directing the current around the occupants to the ground, **not the rubber tires**

---

#### ❌ UNSAFE LOCATIONS:

**Open Structures:**
- Do NOT take shelter in picnic pavilions, sheds, tents, or other partially open structures. **These do not provide protection.**

**Near Tall Objects:**
- Avoid isolated tall trees, utility poles, light towers, or cranes

**Open Areas:**
- Do NOT be the tallest object in an open field or on a stockpile
- If caught in the open with no shelter:
  - Crouch down in a ball-like position
  - Head tucked, hands over ears
  - **Do NOT lie flat on the ground**

**Near Conductors:**
- Stay away from water, metal fences, and large equipment that you are not inside of

---

## 5.2 Flash Floods: The Power of Water

Flash floods are a **primary hazard** on mine sites, capable of turning haul roads into raging rivers and rapidly inundating pits and low-lying work areas. MSHA has issued specific alerts regarding the dangers of inundation from flash floods.

### "Turn Around, Don''t Drown!"

This national safety slogan is the **absolute rule** for encountering flooded roadways. The depth and speed of moving water are deceptive and incredibly powerful.

**Water Power Facts:**
- **Six inches** of fast-moving water can knock an adult off their feet
- **One to two feet** of moving water can sweep away most vehicles, including pickup trucks and even larger equipment

**Never attempt to walk, swim, or drive through floodwaters.** If your vehicle becomes trapped in rising water, stay in the vehicle and call for help. If the water begins to rise inside the vehicle, get out and seek refuge on the roof.

---

### Procedural Response

**Flood Watch:**
- **Meaning:** Conditions are favorable for flooding to occur
- **Actions:** Supervisors should monitor weather reports, check drainage systems, and prepare to move equipment and personnel from low-lying areas

**Flood Warning:**
- **Meaning:** Flooding is **imminent or already occurring**
- **Immediate Actions:**
  - Cease work in pits, trenches, and other low-lying areas
  - Move all mobile equipment to designated high ground
  - **Do NOT attempt to cross any roadway that is covered with water**
  - Proceed to a designated safe assembly area and wait for the "all clear"

---

## 5.3 High Winds, Tornadoes, and Other Events

### High Winds

**Hazards:**
- Blowing dust can severely limit visibility on haul roads, increasing the risk of collisions
- Makes walking and working on elevated structures or near edges extremely dangerous

**Response:**
- Operations may need to be suspended
- Equipment should be parked in a secure location, preferably with the front wheels turned into a berm

---

### Tornadoes

Every mine site must have a **designated shelter for tornadoes**. This is typically an interior room on the lowest floor of a substantial building, away from windows.

**Tornado Watch:**
- **Meaning:** Conditions are favorable for tornadoes to develop
- **Actions:** Be prepared to take shelter at a moment''s notice

**Tornado Warning:**
- **Meaning:** A tornado has been **sighted or indicated by weather radar**
- **Immediate Actions:**
  - **Stop all work immediately**
  - Proceed to the designated tornado shelter
  - **Do NOT remain in vehicles or mobile equipment**'::text)
)
WHERE title ILIKE '%hazmat%' OR title ILIKE '%weather%' OR title ILIKE '%spill%'
AND module_id IN (SELECT id FROM modules WHERE title ILIKE '%emergency%');