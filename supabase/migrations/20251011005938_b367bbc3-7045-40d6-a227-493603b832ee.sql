-- Update Lessons 6 and 7 with complete content

DO $$
DECLARE
  v_module_id UUID := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
BEGIN

  -- Update Lesson 6: Hazmat Spills & Severe Weather Response (30 min)
  UPDATE lessons
  SET content_data = jsonb_build_object(
    'content', '# Hazmat Spills & Severe Weather Response

## Section 4: Hazardous Material Spill Response

While large-scale chemical disasters are rare in surface non-metal mining, small- to medium-sized spills of fuels, hydraulic oils, and other industrial chemicals are a common operational hazard. An improper response can endanger workers, damage equipment, and harm the environment. A prompt, correct response can mitigate these risks effectively.

---

## 4.1 The "Three C''s" of Spill Response

This simple, memorable framework guides initial actions for any spill:

### 1. CONTROL
**Stop the source of the spill** (but only if safe to do so)

**Actions:**
- Turn a valve
- Rotate punctured drum so hole faces up
- Plug a small leak

⚠️ **If spill is large or material is highly toxic/flammable:**
- First step is to **evacuate and alert others**

### 2. CONTAIN
**Prevent the spill from spreading**

**Actions:**
- Use absorbent materials from spill kit:
  - Socks or booms to create dike around spill
- If spill kit not immediately available:
  - Use soil or sand to create berm

**Primary Goals:**
- Keep spill in as small area as possible
- Protect drains, culverts, and waterways

### 3. CLEAN UP
**Begin cleanup process after containment**

**Actions:**
- Apply absorbent materials:
  - Pads
  - Pillows
  - Granular absorbents (cat litter)
- Work from **outer edges toward center**
- Prevents spreading contamination

---

## 4.2 Responding to Fuel and Hydraulic Fluid Spills

Diesel fuel and hydraulic fluid are the **most common hazardous materials** on mine sites.

### Equipment and Preparation

**Spill Kit Locations:**
- All mobile equipment should be equipped
- Larger kits at fuel depots and maintenance shops

**Typical Kit Contents:**
- Absorbent pads
- Socks
- Pillows
- Personal protective equipment (PPE):
  - Gloves
  - Goggles

### Response Protocol

Follow **"Three C''s" framework** with special attention to **fire prevention**:

**Fire Prevention Measures:**
- Remove all ignition sources from area
- Fuel spill is Class B fire hazard
- Bring appropriate fire extinguishers to scene as precaution:
  - ABC Dry Chemical
  - CO₂

### Regulatory Context

**EPA''s SPCC Rule:**
- Facilities storing over 1,320 gallons of oil products require secondary containment
- Fuel storage tanks often located inside concrete dikes or basins
- Designed to hold entire tank volume plus rainfall
- These engineering controls are first line of defense in major leak

---

### Common Hazardous Materials Response Table

| Material | Primary Hazards | Required PPE (Minimum) | Spill Response Action |
|----------|----------------|------------------------|----------------------|
| **Diesel Fuel** | - Flammable (Class B)<br>- Skin/Eye Irritant<br>- Environmental Hazard | - Nitrile Gloves<br>- Safety Glasses/Goggles | 1. Eliminate ignition sources<br>2. Contain spill with absorbent socks/booms<br>3. Clean up with absorbent pads<br>4. Place used absorbents in designated disposal bags/drums |
| **Hydraulic Oil** | - Combustible<br>- Slip Hazard<br>- Skin/Eye Irritant<br>- Environmental Hazard | - Nitrile Gloves<br>- Safety Glasses/Goggles | 1. Contain spill to prevent spreading<br>2. Clean up with absorbent pads or granular absorbent<br>3. Place used absorbents in designated disposal bags/drums |
| **Battery Acid (Sulfuric Acid)** | - Corrosive (severe skin/eye burns)<br>- Reactive with water | - Acid-Resistant Gloves<br>- Chemical Splash Goggles<br>- Face Shield | 1. **Neutralize spill** with soda ash or sodium bicarbonate before cleanup<br>2. Contain neutralized liquid<br>3. Clean up with absorbent pads<br>4. Flush area with water (after neutralization) |
| **Antifreeze (Ethylene Glycol)** | - Toxic if ingested<br>- Skin/Eye Irritant | - Nitrile Gloves<br>- Safety Glasses/Goggles | 1. Contain spill to prevent entry into waterways<br>2. Clean up with absorbent pads<br>3. Place used absorbents in designated disposal bags/drums |

---

## 4.3 Hazard Communication (HazCom) in an Emergency

In event of spill involving unfamiliar chemical, your most powerful tool is the **Safety Data Sheet (SDS)**.

### MSHA HazCom Standard (30 CFR Part 47)

**Requirements:**
- Mine operators must maintain SDS for every hazardous chemical on site
- SDSs must be readily accessible to miners

### The SDS: Your Emergency Reference

SDS is a standardized, **16-section document** providing comprehensive information on a chemical.

**For emergency response, quickly locate these FOUR CRITICAL SECTIONS:**

#### Section 2: Hazards Identification
- Quick overview of chemical''s dangers
- Signal words: "Danger" or "Warning"
- Hazard pictograms:
  - Flame
  - Skull and crossbones
  - Corrosion

#### Section 4: First-Aid Measures
- What to do if chemical gets:
  - On skin
  - In eyes
  - Is inhaled
  - Is ingested

#### Section 5: Fire-Fighting Measures
- Suitable extinguishing media
- Specific hazards associated with fire involving chemical

#### Section 6: Accidental Release Measures
- Specific instructions for spill response
- Required PPE
- Containment methods
- Cleanup procedures

> **Critical Skill:** Knowing how to access and quickly interpret these sections can provide authoritative, life-saving information in middle of crisis.

---

## 4.4 Reporting and Documentation

**All spills must be reported to supervisor** - no matter how small.

**Supervisor Responsibilities:**
- Determine if spill constitutes "reportable quantity"
- Notify outside agencies if required:
  - National Response Center (NRC)
  - State environmental agencies
- Document spill and response actions for:
  - Regulatory compliance
  - Improving future response efforts

---

## Section 5: Severe Weather Emergencies

Surface mining operations are completely exposed to elements. Severe weather events such as thunderstorms, flash floods, and high winds are serious safety hazards requiring specific emergency procedures.

---

## 5.1 Lightning: The Underrated Killer

Lightning is **extremely dangerous** and often **underestimated** occupational hazard. It is unpredictable and can strike far from main storm area.

### The 30-30 Rule

> **"When thunder roars, go indoors."**

This is the most important rule of lightning safety.

**The Rule:**
- ⚡ If you can **hear thunder**, you are close enough to be struck by lightning
- Lightning can strike **more than 10 miles** away from any rainfall
- ❌ **Do NOT wait** for rain to start before seeking shelter

### How to Apply the 30-30 Rule

**Part 1: Threat Assessment**
1. When you see flash of lightning, begin counting
2. If you hear thunder **before you count to 30**, storm is within 6 miles
3. Storm is **close enough to be a danger**
4. **Seek shelter immediately**

**Part 2: Return to Work**
1. After storm passes, wait **30 minutes after last clap of thunder**
2. Only then leave shelter and resume work

---

### Safe and Unsafe Shelters

Knowing where to go is critical. **Not all structures provide protection** from lightning.

#### ✅ SAFE SHELTERS:

**Substantial, Fully Enclosed Buildings:**
- Buildings with electrical wiring and plumbing
- These help to ground the structure

**Hard-Topped Metal Vehicles:**
- Haul trucks
- Loaders
- Personal vehicles
- **Actions in vehicle:**
  - Roll up windows
  - Do NOT touch metal frame
- **Protection mechanism:** Metal "cage" directs current around occupants to ground
  - NOT the rubber tires

---

#### ❌ UNSAFE LOCATIONS:

**Open Structures:**
- Picnic pavilions
- Sheds
- Tents
- Other partially open structures
- **These do NOT provide protection**

**Near Tall Objects:**
- Isolated tall trees
- Utility poles
- Light towers
- Cranes
- Lightning likely to strike tallest object in area

**Open Areas:**
- Do NOT be tallest object in open field or on stockpile
- If caught in open with no shelter:
  - Crouch down in ball-like position
  - Head tucked
  - Hands over ears
  - ❌ **Do NOT lie flat** on ground

**Near Conductors:**
- Stay away from:
  - Water
  - Metal fences
  - Large equipment (that you are not inside of)

---

## 5.2 Flash Floods: The Power of Water

Flash floods are a **primary hazard** on mine sites, capable of:
- Turning haul roads into raging rivers
- Rapidly inundating pits and low-lying work areas

**MSHA has issued specific alerts** regarding dangers of inundation from flash floods.

### "Turn Around, Don''t Drown!"

This national safety slogan is the **absolute rule** for encountering flooded roadways.

**Water Power Facts:**
- **6 inches** of fast-moving water can knock adult off feet
- **1-2 feet** of moving water can sweep away most vehicles
  - Including pickup trucks and larger equipment

#### Emergency Protocol

**Never attempt to:**
- Walk through floodwaters
- Swim through floodwaters
- Drive through floodwaters

**If vehicle trapped in rising water:**
- Stay in vehicle and call for help
- If water begins rising inside vehicle:
  - Get out
  - Seek refuge on roof

---

### Flood Watch vs. Flood Warning

#### Flood Watch
**Meaning:** Conditions are favorable for flooding to occur

**Actions:**
- Supervisors should:
  - Monitor weather reports
  - Check drainage systems
  - Prepare to move equipment and personnel from low-lying areas

#### Flood Warning
**Meaning:** Flooding is **imminent or already occurring**

**Immediate Actions:**
- ✅ **Cease work** in pits, trenches, and low-lying areas
- ✅ **Move all mobile equipment** to designated high ground
- ❌ **Do NOT attempt** to cross any roadway covered with water
- ✅ Proceed to designated safe assembly area
- ✅ Wait for "all clear" from supervisors

---

## 5.3 High Winds, Tornadoes, and Other Events

### High Winds

**Hazards:**
- Blowing dust severely limits visibility on haul roads
  - Increases collision risk
- Makes walking and working on elevated structures dangerous
- Working near edges extremely hazardous

**Response:**
- Operations may need to be suspended
- Equipment should be parked in secure location
  - Preferably with front wheels turned into berm

---

### Tornadoes

Every mine site must have **designated shelter for tornadoes**:
- Typically interior room on lowest floor of substantial building
- Away from windows

#### Tornado Watch
**Meaning:** Conditions favorable for tornadoes to develop

**Actions:**
- Be prepared to take shelter at moment''s notice

#### Tornado Warning
**Meaning:** Tornado has been **sighted or indicated by weather radar**

**Immediate Actions:**
- 🚨 **Stop all work immediately**
- 🏃 Proceed to designated tornado shelter
- ❌ **Do NOT remain** in vehicles or mobile equipment

---

## Key Takeaways: Hazmat & Weather

**Hazmat Spills:**
- Three C''s: Control, Contain, Clean Up
- Know your spill kit locations
- Remove ignition sources for fuel spills
- Use SDS Sections 2, 4, 5, 6 for emergency info
- Report all spills to supervisor

**Lightning Safety:**
- 30-30 Rule: Thunder in 30 seconds = seek shelter, wait 30 minutes after last thunder
- Safe: Enclosed buildings, hard-topped vehicles
- Unsafe: Open structures, tall objects, open areas

**Flood Safety:**
- Turn Around, Don''t Drown
- 6 inches can knock you down
- 1-2 feet can sweep vehicle away
- Never drive through flooded roads

**Tornadoes:**
- Watch = Be Ready
- Warning = Take Shelter NOW
- Interior room, lowest floor, away from windows

> **Remember:** Weather emergencies require immediate action. Don''t wait. When alarms sound or warnings issued, move to safety without delay. Your life depends on it.'
  )
  WHERE module_id = v_module_id AND order_index = 6;

  -- Update Lesson 7: The Human Element & Professional Commitment (30 min)
  UPDATE lessons
  SET content_data = jsonb_build_object(
    'content', '# The Human Element & Professional Commitment

## Section 6: Managing Stress and Providing Support

Emergency procedures are not just technical skills; they are **actions performed by human beings under extreme stress**. An emergency is chaotic, frightening, and often traumatic. The ability to manage one''s own psychological response and to provide basic, humane support to others is a critical and often overlooked component of emergency preparedness.

> **Training in these "human element" skills is not a soft-skill add-on; it is a core component of operational safety.**

**Why This Matters:**
- A miner who can control their panic is more likely to remember training and act effectively
- A crew that knows how to support each other after traumatic event is more resilient
- Resilient crews are less prone to distraction and lack of focus that lead to future accidents

---

## 6.1 Managing Panic and Stress in an Emergency

When faced with sudden, life-threatening event, the human body''s natural alarm system kicks in. This **"fight-flight-or-freeze" response** floods body with adrenaline, causing:
- Rapid heart rate
- Shallow breathing
- Tunnel vision

While useful for immediate survival, this response can also lead to:
- Panic
- Confusion
- Inability to think clearly

**All of which are dangerous in an emergency.**

Learning to manage this response is a **crucial skill**.

---

### Tactical Breathing

One of the most effective and simple techniques for calming the body''s stress response is **controlled breathing**. It can be done anywhere, at any time, to slow heart rate and regain mental focus.

#### Box Breathing Method

**The Four-Count Cycle:**

1. **Inhale** slowly through nose for count of **four**

2. **Hold** your breath for count of **four**

3. **Exhale** slowly through mouth for count of **four**

4. **Hold** your breath for count of **four**

5. **Repeat** this cycle until you feel:
   - Heart rate slow
   - Mind begin to clear

> **Practice During Non-Stressful Times:** This makes it an automatic, calming response during real emergency.

---

### Focus on the Immediate Task

Panic and feeling of being overwhelmed can lead to **"freezing"** - inaction.

A powerful way to break this paralysis is to **focus on a single, small, immediate, and actionable task**.

#### Example: Conveyor Fire

**Overwhelming thought:**
- "The conveyor is on fire!" → Leads to panic and freezing

**Break it down into series of tasks:**
1. My first task is to **grab the radio**
2. My next task is to **key the mic and say "Emergency"**
3. My next task is to **state my location**
4. My next task is to **describe the problem**

**Result:**
- By focusing on one small step at a time
- You regain sense of control
- You move through correct emergency procedure logically
- Even while under extreme stress

---

## 6.2 Introduction to Psychological First Aid (PFA)

**Psychological First Aid (PFA)** is **NOT** therapy or professional counseling. It is a humane, supportive, and practical way to help a person who is in immediate distress after crisis.

**What PFA Is:**
- A skill anyone can learn
- Designed to reduce initial distress
- Fosters short- and long-term adaptive functioning

**What PFA Is NOT:**
- Not forcing someone to talk about experience
- Not "debriefing" or analyzing what happened
- Simply providing compassionate human presence
- Ensuring basic needs are met
- Creating sense of safety, calm, and hope

**Developed by:**
- National Center for PTSD
- Substance Abuse and Mental Health Services Administration (SAMHSA)

---

### The Core Principles of PFA: Look, Listen, Link

#### 1. LOOK

**Check for Safety:**
- Scan area for any ongoing dangers

**Check for People with Obvious Urgent Basic Needs:**
- Is someone injured needing medical first aid?
- Is someone shivering from cold needing blanket?

**Check for People with Serious Distress Reactions:**
- Look for individuals who are:
  - Panicking
  - Confused
  - Disoriented
  - Exhibiting other signs of severe shock

---

#### 2. LISTEN

**Approach People Who May Need Support:**
- Calmly and quietly introduce yourself

**Ask About Needs and Concerns:**
- Ask simple, non-intrusive questions:
  - "Are you okay?"
  - "Is there anything I can get for you right now?"

**Listen to People and Help Them Feel Calm:**
- Pay attention to what they say
- Acknowledge their feelings without judgment
- **Simply being present and listening** can be incredibly helpful

---

#### 3. LINK

**Help People Address Basic Needs:**
- Help them get:
  - Water
  - Blanket
  - Quiet place to sit

**Help People Connect with Loved Ones and Social Support:**
- In aftermath of incident, one of most urgent needs is to contact family
- Help them make phone call
- Or find their supervisor to get information

**Give Information:**
- Provide simple, accurate facts about:
  - What is happening
  - What the next steps are
- ❌ **Do NOT speculate**
- ❌ **Do NOT give false reassurance**

---

## 6.3 Crisis Communication: For Responders and Survivors

Clear communication is vital during and after emergency. Misinformation and rumors can spread quickly, causing unnecessary panic and hindering official response.

---

### Communicating with Victims and Survivors

When interacting with someone injured or in distress, your communication style can have profound impact.

#### Be Calm and Clear
- Speak in calm, reassuring tone
- Use short, simple sentences

#### Be Honest but Positive
- Provide accurate information
- ❌ **Do NOT make promises you cannot keep**
  - Example: "Everything is going to be fine"
- ✅ **Use positive, action-oriented language**
  - Example: "Help is on the way. We are going to stay with you until they get here."

#### Give Simple Tasks
- If appropriate, giving person simple task can help them regain sense of control
- Example: "Can you hold this dressing in place for me?"

---

### Communication Discipline

During emergency response, all communication must be carefully managed to ensure accuracy and prevent confusion.

#### Follow the Chain of Command
- ✅ Report all information to your **direct supervisor**
- ❌ **Do NOT self-deploy** or act on information you hear secondhand
- **Only the Incident Commander** has complete picture of incident

#### Avoid Spreading Rumors
- ❌ **Do NOT speculate** about:
  - Cause of incident
  - Condition of personnel
- Inaccurate information can cause:
  - Extreme distress to families
  - Compromise integrity of official investigation

#### Direct Inquiries to the PIO
- All external inquiries must be directed to:
  - Public Information Officer (PIO)
  - Or individual designated by Incident Commander
- **Especially from:**
  - News media
  - Family members arriving at mine gate

**Purpose:**
- Ensures only verified, accurate information is released
- Ensures families receive information in compassionate and organized manner

---

## Conclusion: The Professional Miner''s Commitment to Safety

This module has provided a **comprehensive and definitive guide** to emergency procedures in the surface mining environment. The knowledge contained herein is not academic; it is a **compilation of life-saving actions, protocols, and mindsets** derived from decades of real-world experience and hard lessons learned from tragic accidents.

---

### The Professional Miner''s Understanding

The professional miner understands that **safety is not a passive state** but an **active, ongoing commitment**.

This commitment is demonstrated through mastery of core principles of emergency response:

---

### 1. PLAN

**Know Your Site''s Emergency Action Plan**
- ✅ Understand the maps
- ✅ Recognize the alarms
- ✅ Be fluent in communication protocols
- ✅ Know your role within Incident Command System

---

### 2. PREPARE

**Be Active Participant in Safety**
- ✅ Be active in workplace examinations
- ✅ Learn to recognize subtle precursors to danger:
  - Tension crack on highwall
  - List in a dredge
  - Smell of overheated bearing
- ✅ Maintain your equipment
- ✅ Know where to find emergency supplies

---

### 3. ACT

**When Emergency Occurs, Act with Discipline**
- ✅ Act without hesitation
- ✅ Follow established protocols for specific hazard
- ✅ Perform first aid with confidence and competence
- ✅ Your calm, decisive actions can save a life

---

### 4. SUPPORT

**Remember the Human Element**
- ✅ In midst of chaos, remember humanity
- ✅ Manage your own stress so you can function effectively
- ✅ Provide compassionate, practical support to colleagues
- ✅ In aftermath of traumatic event, be there for your crew

---

## Your Professional Commitment

By internalizing the knowledge in this module, you are **not simply fulfilling a regulatory requirement**.

**You are:**

✅ **Honoring the memory** of every miner who came before you

✅ **Upholding the highest standards** of the mining profession

✅ **Making a commitment** to:
- Yourself
- Your family
- Your crew

**That you will do everything in your power to ensure that everyone goes home safe at the end of every shift.**

---

## Final Reflection

The regulations, the training plans, the Emergency Action Plans—all of these exist because of lessons learned at a terrible cost. They represent the collective wisdom of an industry that has evolved from its most dangerous days to become safer with each passing year.

**The 88% reduction in mining fatalities** since the Federal Mine Safety and Health Act of 1977 is not just a statistic. It represents:
- Thousands of miners who went home to their families
- Thousands of families who were spared grief
- Thousands of lives saved by knowledge, discipline, and commitment

**You are now part of that tradition.**

---

### The Ultimate Goal

> **Every miner home safe. Every shift. Every day.**

**This is not just a slogan. This is your professional mission.**

**This is the commitment that defines a professional miner.**

**This is the standard you are called to uphold.**

---

## You Are Ready

You now have the knowledge, the protocols, and the mindset to:
- Recognize dangers before they become emergencies
- Respond effectively when emergencies occur
- Support your crew in the most difficult moments
- Uphold the highest standards of the profession

**Go forward with confidence.**

**Stay vigilant.**

**Stay safe.**

**And bring your crew home safe with you.**

---

### Course Complete

**Congratulations on completing Module 3: Emergency Procedures.**

You have mastered critical knowledge that makes you a safer, more capable, and more professional miner.

**Your commitment to safety honors all who came before you and protects all who work beside you.**

**Stay safe. Stay vigilant. And remember:**

> **When seconds count, your training and preparation are what save lives.**'
  )
  WHERE module_id = v_module_id AND order_index = 7;

  RAISE NOTICE 'All 7 lessons for Module 3 now have complete verbatim content';
  RAISE NOTICE 'Total module duration: 265 minutes (4 hours 25 minutes)';

END $$;