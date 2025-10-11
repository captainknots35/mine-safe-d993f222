-- Module 3: Emergency Procedures - Complete 7 Lessons with Full Content

DO $$
DECLARE
  v_module_id UUID := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
  v_lesson_count INTEGER;
BEGIN
  -- Check if lessons already exist for this module
  SELECT COUNT(*) INTO v_lesson_count
  FROM lessons
  WHERE module_id = v_module_id;

  -- Delete existing lessons if any to start fresh
  IF v_lesson_count > 0 THEN
    DELETE FROM lessons WHERE module_id = v_module_id;
  END IF;

  -- Lesson 1: Introduction: Why Emergency Procedures Matter (40 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (
    v_module_id,
    'Introduction: Why Emergency Procedures Matter',
    'Understanding the critical importance of emergency procedures, the legal foundation of mine safety, and your professional responsibilities under 30 CFR Part 46.',
    'document',
    1,
    40,
    true,
    jsonb_build_object(
      'content', '# Introduction: Why Emergency Procedures Matter

## The Unforgiving Environment & The Professional''s Mindset

This training module is the **most critical component** of a miner''s safety education. It is not about memorizing regulations for compliance; it is about **internalizing procedures for survival**. The actions and protocols detailed in this curriculum are not theoretical. They are the direct result of hard-learned lessons from real incidents, investigations, and the collective experience of the mining industry.

In the dynamic and powerful environment of a surface mine, where conditions can change in an instant, emergencies are not a matter of **if**, but **when**. Mastering this material is a core professional responsibility.

The objective is to move beyond simply knowing *what* to do in an emergency and to understand *why* it is done. This deeper comprehension ensures that when an incident occurs and seconds count, training and instinct take over, leading to calm, decisive, and life-saving actions.

> **The defining characteristic of a professional miner is an unwavering commitment to their own safety and the safety of their crew, a commitment that is forged through the mastery of the knowledge contained within this module.**

---

## The Foundation of Law: From Tragedy to Regulation

The federal safety regulations that govern the mining industry are not arbitrary rules created in an office. They are a **living history** of the industry''s most painful lessons, often written in response to catastrophic events that claimed the lives of miners. Understanding this history is essential to appreciating the profound importance of every procedure in this module.

### The Evolution of Mine Safety Law

**Early 20th Century Crisis:**
- In 1907, an estimated **3,242 miners died** - the deadliest year in U.S. coal mining history
- The Monongah, West Virginia disaster killed **362 men and boys**, spurring Congress to create the U.S. Bureau of Mines

**The Federal Mine Safety and Health Act of 1977:**

This landmark legislation truly transformed the industry by:
- Consolidating all coal, metal, and non-metal mining operations under a single, comprehensive legal structure
- Creating the Mine Safety and Health Administration (MSHA)
- Mandating four annual inspections for underground mines and two for surface mines
- Establishing mandatory miner training programs
- Requiring mine rescue teams for all underground operations

### The Impact: Lives Saved

The statistics prove the effectiveness of these regulations:

| Period | Average Annual Fatalities | Change |
|--------|--------------------------|--------|
| **Before the Act** (1967-1976) | 356 fatalities/year | Baseline |
| **After the Act** (1978-1987) | 189 fatalities/year | **53% reduction** |
| **2023** | 41 fatalities | **88% reduction from baseline** |

### The MINER Act of 2006

Following the Sago, Aracoma, and Darby mine disasters that claimed 19 lives, Congress passed the **Mine Improvement and New Emergency Response (MINER) Act** - the most significant update to mine safety law in nearly 30 years.

**Key Requirements:**
- Detailed, mine-specific emergency response plans
- Improved post-accident communication and tracking technology
- Availability of breathable air and refuge alternatives for trapped miners
- Enhanced training and readiness of mine rescue teams

> Each provision of the MINER Act can be traced directly to the challenges faced by miners and rescuers during the 2006 tragedies, demonstrating that the law is a living document, continually updated to prevent the recurrence of past failures.

---

## Your Role and Responsibilities under 30 CFR Part 46

The content in this training is **mandated by federal law** under Title 30, Code of Federal Regulations (30 CFR), Part 46. This federal law requires that all miners be trained and retrained to perform their jobs in a safe and healthful manner, with the ultimate goal of reducing the frequency and severity of injuries and fatalities.

### Who Must Be Trained?

This training is **required for every person** defined as a "miner" working at:
- Shell dredging operations
- Sand and gravel operations
- Surface stone operations
- Surface clay operations
- Colloidal phosphate operations
- Surface limestone operations
- Other specified non-metal surface mining operations

### Operator and Miner Responsibilities

**The Mine Operator Must:**
- Develop and implement a comprehensive training plan
- Ensure training is provided to all miners, including employees of independent contractors
- Use a "competent person" to deliver training - someone designated by the operator who has the ability, training, knowledge, or experience to effectively communicate the subject matter

**Your Responsibility as a Miner:**
- Actively engage with this material
- Ask questions when unclear
- Internalize these procedures until they become second nature

> **Your life, and the lives of your coworkers, depend on it.**

---

## Looking Ahead

This module will cover:
1. **Emergency Action Plans and Incident Command** - The framework for coordinated response
2. **Critical Incidents** - Ground failure, water emergencies, fire, and equipment accidents
3. **Emergency Medical Response** - Life-saving first aid and medical interventions
4. **Hazardous Material Spill Response** - Containing and cleaning up dangerous spills
5. **Severe Weather Emergencies** - Responding to lightning, floods, and high winds
6. **The Human Element** - Managing stress and providing psychological support

Each section is built on the analysis of real fatality reports, focusing on the failure modes and root causes of actual tragic events to ensure the training addresses real-world dangers.

**Remember:** This is not just training. This is your professional foundation for survival and the protection of your crew.'
    )
  );

  -- Lesson 2: Critical Incidents: Ground Failure & Water Emergencies (45 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (
    v_module_id,
    'Critical Incidents: Ground Failure & Water Emergencies',
    'Comprehensive emergency action planning, incident command structure, ground failure recognition and response, and water inundation protocols.',
    'document',
    2,
    45,
    true,
    jsonb_build_object(
      'content', '# Critical Incidents: Ground Failure & Water Emergencies

## Section 1: The Mine Emergency Action Plan and Incident Command

Every mine site is required to have a detailed, site-specific **Emergency Action Plan (EAP)**. This plan is the authoritative guide for all personnel during any emergency. It is not a document to be filed away; it is a **blueprint for coordinated, effective action**.

---

### 1.1 Decoding Your Site''s Emergency Plan: Maps, Routes, and Safe Havens

The cornerstone of any EAP is the **mine map**, which serves as a visual guide for evacuation and response. Training for all miners must include a thorough review of the site''s specific escape and emergency evacuation plans.

**Critical Map Features You Must Know:**

#### Primary and Secondary Escape Routes
- **Primary routes:** Most direct and commonly used paths to safety
- **Secondary routes:** Alternative paths if primary is blocked
- **Action Required:** Physically walk these routes during site orientation to build muscle memory

*Example:* A miner in the north pit must know that the primary escape route is Haul Road #1 leading east, but if blocked by a rockslide, the secondary route is the access ramp leading south to the lower bench.

#### Designated Rally Points (Muster Points)
- Pre-designated locations for assembly after evacuation
- Chosen for safety distance from hazards
- Used for accurate headcount and staging for emergency services

#### Location of Emergency Equipment
The map indicates precise locations of:
- First aid stations
- Automated External Defibrillators (AEDs)
- Emergency eyewash stations
- Fire extinguishers
- Spill kits
- Emergency communication systems

#### Areas of Known or Potential Hazards
Clearly marked zones including:
- Electrical substations
- Fuel storage areas
- Explosives magazines
- Bodies of water
- Areas with history of unstable ground

> **Important:** The EAP is a dynamic tool that must be updated whenever site conditions change. A new haul road or relocated stockpile requires a corresponding update and briefing.

---

### 1.2 Signals, Alarms, and Warnings: Recognizing and Reacting

An emergency response cannot begin until personnel are alerted to danger. Mine sites use audible and visual alarms to communicate specific emergency conditions.

#### Common Alarm Systems

| Alarm Type | Signal | Required Action |
|------------|--------|-----------------|
| **Evacuation Alarm** | Continuous high-intensity siren + flashing strobes | Immediately cease non-essential work, shut down equipment safely, proceed via nearest safe escape route to rally point |
| **Fire Alarm** | Distinct pattern of horn blasts or different siren tone | Similar to evacuation, but with heightened awareness of fire location |
| **Blasting Alarm** | Series of short horn blasts or verbal announcement | Evacuate blast zone, take cover in engineered blast shelter |
| **All Clear Signal** | Different, distinct signal | Safe to return to work as directed by supervisors |

#### The Alert-Confirm-Act Protocol

1. **Alert:** Recognize the signal type
2. **Confirm:** Quickly verify the nature of emergency via radio or observing others (do not delay evacuation)
3. **Act:** Execute the pre-planned procedure without hesitation

---

### 1.3 Communication Protocols: The L.I.P. Lifeline

Clear, concise, and rapid communication is the nervous system of an effective emergency response. Every miner must know precisely how to report an incident.

#### The L.I.P. Protocol

**L - Location:** State your exact location as precisely as possible
- Example: "Highwall of the north pit" or "Haul road #3 near the west stockpile"

**I - Identification:** State your name and vehicle number if applicable
- Example: "This is John Doe in Haul Truck 12"

**P - Problem:** State the nature of the emergency clearly and concisely
- Example: "We have a haul truck rollover with one person trapped"

#### Effective vs. Ineffective Emergency Calls

✅ **EFFECTIVE:**
> "Emergency, Emergency, Emergency. This is Jane Smith in Loader 5. My location is the base of the main aggregate stockpile. We have a front-end loader that has rolled over. The operator is pinned inside the cab."

❌ **INEFFECTIVE:**
> "Hey, uh, somebody get over here! We got a problem with a loader by the big pile."

#### Emergency Contact Roster Template

| Emergency Type | Primary Internal Contact | Primary External Contact | Key Personnel |
|----------------|-------------------------|-------------------------|---------------|
| **Medical Emergency** | Radio Channel 1 (Emergency) or Supervisor Cell | 911 | Safety Manager: [Name, Number] |
| **Fire** | Radio Channel 1 (Emergency) or Supervisor Cell | 911 / Local Fire Dept | Mine Superintendent |
| **Ground Failure** | Radio Channel 1 (Emergency) or Supervisor Cell | 911 | Mine Superintendent |
| **Hazmat Spill** | Radio Channel 1 (Emergency) or Supervisor Cell | 911 / Hazmat Team | Safety Manager |
| **MSHA Reporting** | MSHA Hotline: 1-800-746-1553 | N/A | Safety Manager |

---

### 1.4 The Incident Command System (ICS): A Standardized Structure for Chaos

During an emergency, a clear and respected chain of command is essential. The **Incident Command System (ICS)** is a standardized, on-scene management system used by all public agencies in the United States.

#### Core Principles of ICS

1. **Common Terminology:** Everyone uses the same titles for roles and resources
2. **Unity of Command:** Each person reports to only one supervisor
3. **Manageable Span of Control:** Each supervisor manages 3-7 people
4. **Modular Organization:** Structure expands or contracts based on incident complexity

#### ICS Command Structure

| Role | Primary Responsibility |
|------|----------------------|
| **Incident Commander (IC)** | Ultimate authority for all strategic decisions, setting objectives, and managing entire emergency response |
| **Safety Officer** | Monitors scene for hazards, authority to stop any unsafe action, reports directly to IC |
| **Liaison Officer** | Primary contact for outside agencies (Fire, EMS, MSHA) |
| **Public Information Officer (PIO)** | Manages all communication with media, families, and external parties |
| **Operations Section Chief** | Manages all tactical, hands-on work (firefighting, rescue, medical aid) |

#### Your Role as a Miner in ICS

**Your responsibilities are clear and non-negotiable:**

1. ✅ Follow instructions of IC and supervisors without question or delay
2. ✅ Evacuate to designated rally point and await further instructions
3. ✅ Report information about incident or personnel location to your direct supervisor
4. ✅ **DO NOT re-enter emergency area** for any reason unless specifically directed by IC

> **Critical:** Uncoordinated rescue attempts are a common cause of additional fatalities. Understanding this structure is not about hierarchy; it is about operational integrity and ensuring everyone stays safe.

---

## Section 2.1: Ground Failure Emergencies - The Unstable Earth

Ground failure—the uncontrolled collapse of highwalls, stockpiles, and trench walls—is one of the most **significant and deadly hazards** in surface mining. The forces involved are immense, and incidents can occur with little warning.

### Recognizing Precursors to Ground Failure

Catastrophic failures are rarely instantaneous. They result from changing conditions that weaken geologic structure over time.

**Warning Signs to Recognize:**

#### 1. Tension Cracks
- Cracks parallel to edge of highwall or stockpile crest
- Indicate ground is pulling apart
- **Action:** Measure and monitor with stakes and tape measure

#### 2. Bulging or Slumping
- Noticeable bulge or slump at base (toe) of highwall or stockpile
- Signifies material under immense pressure
- Indicates failure from bottom up

#### 3. Seeping Water
- Water appearing on face where not previously seen
- Water increases pore pressure and reduces shear strength
- Acts as lubricant for failure planes
- **Critical:** MSHA requires more frequent examinations after rain or during freeze-thaw periods

#### 4. Unusual Sounds
- Popping or cracking sounds from highwall
- Indicates rock fracturing under stress

#### 5. Falling Material
- Increased frequency of rocks, pebbles, or sand sloughing off face
- Clear indicator of worsening instability

### Types of Slope Failure

Understanding failure mechanics helps recognize where and why it might occur:

1. **Rock Falls:** Detachment of individual rocks from steep face (weathering, water pressure, vibrations)
2. **Plane Shear (Translational):** Block/wedge slides along flat weak plane (bedding, fault, joint)
3. **Rotational Shear (Slump):** Large mass fails along curved surface (common in soil, clay, stockpiles)

---

### Case Study 1: Stockpile Instability - Fatal Undercutting

**Incident:** May 22, 2023
**Victim:** Haul truck operator, 49 years experience
**Fatality:** Ground collapsed under truck at crest of 42-foot sand stockpile, truck overturned backwards

**Root Cause:**
- Material dumped at top while loader simultaneously removed material from base
- "Undercutting the toe" practice steepened slope beyond angle of repose
- Removed supporting material at bottom

**Emergency Protocol:**
- ❌ **NEVER** dump material over edge where material is being removed from below
- ✅ **CORRECT PROCEDURE:** Dump safe distance back from crest, use dozer/loader to push material over edge
- 🚨 If you observe instability signs or this unsafe practice: **STOP WORK, MOVE EQUIPMENT TO SAFE LOCATION, REPORT TO SUPERVISOR**

---

### Case Study 2: Highwall Undercutting - Excavator Engulfment

**Incident:** August 22, 2024
**Victim:** Excavator operator, 3 years experience
**Fatality:** Excavator engulfed by large rocks from highwall failure

**Root Cause:**
- Excavator digging into base of highwall
- Previous similar fatal incident involved loader operator engulfed when 55-60 foot highwall collapsed
- Investigation found this was "normal mining method at the mine" - dangerous normalization of deviance

**Emergency Protocol:**
- ❌ **NEVER** dig into base of highwall or stockpile
- 🚨 If highwall collapse occurs: Priority is accurate headcount to determine if anyone missing
- ⚠️ **NO RESCUE ATTEMPT** until remaining ground assessed for stability by competent person
- ✅ Always operate equipment with cab positioned away from highwall when possible

---

### Case Study 3: Trench Collapse - Deep Excavation Death

**Incident:** January 3, 2025
**Victim:** Haul truck operator, 4 months experience
**Fatality:** Engulfed by material in 16-foot-deep trench

**Root Cause:**
- No ground condition examination before work began
- Excavated material piled directly on trench edge (surcharge load on unstable vertical walls)
- Victim entered unprotected trench

**Emergency Protocol:**
- ❌ **NEVER** enter trench deeper than 5 feet unless properly sloped, benched, or supported by engineered trench box
- 🚨 If collapse occurs: **DO NOT ENTER** trench to attempt rescue
- ✅ Call emergency services immediately
- ✅ Work from stable edge to clear material only after scene secured by IC

> **Common Thread:** Failure to conduct adequate workplace examinations and correct hazardous conditions before work begins. A miner''s responsibility is to constantly observe work area and refuse to perform work in conditions believed unsafe.

---

## Section 2.2: Water Inundation and Submersion Emergencies

Drowning is a leading cause of fatalities in surface mining, particularly in dredging and sand/gravel operations. From 2010-2023, **19 drowning accidents occurred, with 11 involving mobile equipment submersion**.

### Equipment Submersion

When mobile equipment enters water, the operator''s survival depends on a **calm and practiced response**.

#### Case Study: Ground Failure at Water''s Edge

**Fatal Incidents:**
- March 5, 2021: Mine manager killed when excavator ground sloughed off, excavator fell 13 feet into dredge pond
- Dozer operator drowned after saturated waste sand delta failed and slid into pond

**Critical Fact:** Ground nearest water is often the least stable.

**Emergency Protocol:**
- ✅ Maintain safe distance from water edge
- ✅ Position equipment on solid, stable ground
- ❌ **NEVER** operate on unconsolidated fill at water edge
- ✅ Examine ground conditions before starting and throughout shift, especially after rain
- ✅ If ground gives way: Attempt to swing machine/drive away if possible
- ✅ **ALWAYS WEAR SEATBELT** - helps keep you oriented if cab submerges

---

### Self-Egress from a Submerged Cab

This procedure is **counter-intuitive but critical for survival:**

#### Step-by-Step Survival Protocol

1. **Stay Calm and Keep Seatbelt On**
   - Seatbelt holds you in place and helps maintain orientation as cab fills

2. **Do NOT Try to Open Door Immediately**
   - Water pressure makes it impossible until cab almost completely filled
   - Wasting energy trying to force door is fatal mistake

3. **Break a Window**
   - Use window-breaking tool to strike side or rear window in corner
   - Front windshield is laminated safety glass - much harder to break

4. **Exit and Ascend**
   - Once window broken, unbuckle seatbelt
   - Take final breath if possible
   - Pull yourself out through opening
   - Push off equipment and swim toward surface, following the light

**Recommended Equipment:** Operators should have underwater emergency egress kit including:
- Glass breaking device
- Small underwater breathing device
- Nose clip

---

### Dredging and Watercraft Emergencies

Dredge operations present unique hazards leading to capsizing or falls overboard.

#### Case Study: Personal Flotation Devices (PFDs)

**Incident:** September 10, 1996
**Victim:** Laborer, 3 months experience
**Fatality:** Fell from dredge discharge pipeline into 20 feet of water, not wearing PFD

**Root Cause:**
- Boat used to access dredge was in disrepair
- Workers walking pipeline instead (unsafe practice)
- No PFD worn

**Emergency Protocol:**
- ✅ **U.S. Coast Guard-approved life jacket or PFD MUST be worn at all times** when working over or near water
- ⚠️ **NO EXCEPTIONS** - complacency is fatal

---

#### Case Study: Dredge Stability and Capsizing

**Incident 1:** December 29, 2018
**Victim:** 25-year-old plant operator
**Fatality:** Drowned after suction dredge sank

**Root Cause:**
- Insufficient procedures for maintaining pontoons and bilge pumps
- Inadequate on-shift examinations
- Water accumulating in pontoons made vessel unstable
- Operator found inside compartment wearing flotation device but unable to escape

**Incident 2:** Superintendent and miner capsizing
**Root Cause:**
- Flooded pontoons to gain leverage for stuck bucket (beyond design capacity)
- Overload sensors removed
- Pontoon hatches unfastened
- Dredge capsized, superintendent killed

**Emergency Protocol:**
- ✅ Conduct thorough pre-shift inspections of all pontoons and bilge systems
- 🚨 Any water ingress must be reported and corrected immediately
- ❌ **NEVER** operate dredge showing listing or instability
- ❌ **DO NOT** perform non-routine tasks exceeding manufacturer specifications without engineering review
- 🚨 If dredge begins capsizing: **EXIT operator cab immediately** and get clear - sinking vessel creates powerful suction

---

## Key Takeaways

**Ground Failure Response:**
1. Never undercut highwalls or stockpiles
2. Recognize warning signs: cracks, bulging, seeping water
3. Stop work and report hazards immediately
4. No rescue attempts in unstable areas

**Water Emergency Response:**
1. Stay away from water edges with equipment
2. Wear PFDs at all times near water
3. Know submersion egress procedure
4. Maintain dredge pontoons and inspect daily

> **Remember:** The common thread in fatal incidents is failure to conduct adequate examinations and correct hazards before work begins. Your vigilance saves lives.'
    )
  );

  -- Continue with remaining lessons...
  RAISE NOTICE 'First 2 lessons created successfully';
  
END $$;