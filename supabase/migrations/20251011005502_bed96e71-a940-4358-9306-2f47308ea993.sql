-- Update Lessons 4-7 with complete verbatim content from Module 3

DO $$
DECLARE
  v_module_id UUID := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
BEGIN

  -- Update Lesson 4: Emergency Medical Response Part 1 (45 min)
  UPDATE lessons
  SET content_data = jsonb_build_object(
    'content', '# Emergency Medical Response: Part 1

## Section 3: Emergency Medical Response - Actions that Save Lives

In the remote and rugged environment of a mine, professional medical help can be minutes or even hours away. The actions taken in the first few moments after a medical emergency can determine the outcome. This section provides miners with the essential knowledge to perform critical, life-saving interventions.

---

## 3.1 Initial Scene Assessment and Activating EMS

Before providing any aid, the first and most important consideration is the **safety of the rescuer**. A rescuer who becomes a victim cannot help anyone.

### The "Stop, Look, Assess, Act" Model

**1. STOP**
- Pause at a safe distance from the incident
- Resist the urge to rush in

**2. LOOK**
- Scan the area for any ongoing hazards
- Is there unstable ground?
- Is equipment still running?
- Are there downed electrical lines?
- Is there smoke or fire?
- Is there a chemical spill?

**3. ASSESS**
- Determine if it is safe to approach
- If ongoing hazards cannot be controlled, **DO NOT enter the scene**
- Your role is to secure the area and call for help

**4. ACT**
- If scene is safe: Proceed to victim
- If scene is NOT safe: Call for help and keep others away

---

### Activating the Emergency Medical System

Once the scene is determined safe, **immediately activate the emergency medical system**. This involves both internal and external notifications.

#### Alert Mine Personnel
Use radio to call for mine''s designated first responders and notify supervisor using **L.I.P. protocol**:
- **Location:** Your exact position
- **Identification:** Your name/vehicle
- **Problem:** Nature of injury

#### Call 911
Designate a specific person (or do it yourself if alone) to call 911. Provide dispatcher with:

**Critical Information to Provide:**
1. Mine''s physical address and best entrance for ambulance
2. Specific location on mine site (e.g., "North Pit, second bench")
3. Nature of injury (e.g., "fall from height," "crush injury")
4. Number of victims
5. Victim''s condition (e.g., "conscious and breathing," "unconscious," "severe bleeding")
6. Any hazards responding crew should be aware of

> **Critical:** Early activation of EMS is one of the most important factors in a positive outcome. Do not delay this call.

---

## 3.2 First Aid Priorities: Controlling Severe Bleeding and Managing Shock

In cases of severe trauma, the most immediate threat to life is **massive blood loss**. Controlling severe bleeding is the top priority after ensuring the victim has an open airway and is breathing.

### Controlling Severe Bleeding

#### Step 1: Apply Direct Pressure
- Use sterile dressing, trauma pad from first aid kit, or cleanest cloth available
- Apply **firm, direct pressure** directly to wound
- If dressing becomes soaked with blood: **DO NOT remove it**
- Add another dressing on top and continue pressure

#### Step 2: Elevate the Limb
- If wound is on arm or leg
- AND there are no suspected broken bones
- Elevate limb above level of heart
- Continue applying direct pressure

#### Step 3: Tourniquet Application (Life-Threatening Bleeding Only)

⚠️ **CRITICAL:** A tourniquet is for stopping **severe, life-threatening bleeding** from a limb that cannot be controlled with direct pressure. Improper application can cause permanent damage - only use when victim will otherwise bleed to death.

**Tourniquet Application Protocol:**

All mine first aid kits should contain commercially made tourniquet (e.g., C-A-T® - Combat Application Tourniquet®).

**Steps:**
1. Apply tourniquet **"high and tight"** on injured limb
   - Above the wound (between wound and torso)

2. **Tighten the windlass** until bleeding stops

3. **Secure the windlass** in its clip

4. **Write down the time** tourniquet was applied
   - Example: "T=14:30"
   - Write on tourniquet strap or victim''s forehead
   - This information is **critical for hospital staff**

5. ⚠️ **Once applied, tourniquet should NOT be removed** by anyone other than medical professionals

---

### Managing Shock

**Shock** is a life-threatening condition where the circulatory system fails to provide enough oxygenated blood to vital organs. Anyone who has suffered serious injury is at risk for shock.

#### Signs of Shock
- Pale, cold, clammy skin
- Rapid, weak pulse
- Rapid, shallow breathing
- Nausea
- Confusion or unresponsiveness

#### Treatment for Shock

**Protocol:**

1. **Have person lie down flat** on their back

2. **Keep them warm**
   - Cover with blanket, coat, or anything available
   - Prevent heat loss
   - Emergency space blanket is standard in well-stocked first aid kit

3. **Elevate their feet** about 12 inches
   - UNLESS you suspect head, neck, back, or leg injury

4. **Do NOT give anything to eat or drink**

5. **Offer reassurance** and try to keep them calm

---

## 3.3 Specialized Protocol: The Dangers of Crush Injury and Crush Syndrome

Crush injuries are a significant and unique hazard in mining, resulting from ground falls, equipment rollovers, or machinery entanglement. While immediate physical damage is obvious, a more insidious and deadly threat is **Crush Syndrome**.

> **CRITICAL KNOWLEDGE:** Understanding this syndrome is critical because the intuitive action—freeing the person as quickly as possible—can be fatal.

---

### The Pathophysiology of Crush Syndrome

When a large muscle mass (like leg or arm) is compressed, blood flow to the area is cut off. Muscle cells, deprived of oxygen, begin to die and break down in a process called **rhabdomyolysis**.

**Toxic Substances Released:**

#### Potassium
- Sudden release of high levels into bloodstream
- Can cause immediate, **fatal cardiac arrhythmias**
- Can cause **cardiac arrest**

#### Myoglobin
- Large protein released from damaged muscle cells
- Travels to kidneys
- Clogs delicate filtering tubes
- Leads to **acute kidney failure**
- Can be fatal in hours or days following injury

---

### The Critical Paradox

**As long as crushing force remains:** Toxins are contained within the limb

**When force is suddenly released:** Toxins surge into body''s central circulation, overwhelming heart and kidneys

**Timing:** This can happen within minutes of release and is often irreversible

**Medical Fact:** Muscles can withstand about 4 hours without blood flow before cell death becomes widespread, but toxin buildup begins much sooner.

---

### The Life-or-Death Protocol

⚠️ **CRITICAL:** The **single most critical factor** is **duration of entrapment**. This determines entire course of action.

**This protocol must be committed to memory.**

---

#### ENTRAPMENT LESS THAN 15 MINUTES

**PRIORITY:** Release the crushing force **IMMEDIATELY** (if it can be done safely)

**Actions:**
1. ✅ Remove the object
2. ✅ Control any severe bleeding with direct pressure
3. ✅ Treat for shock
4. ✅ Call 911 and prepare for transport

**Medical Rationale:**
- Risk of significant toxin buildup (Crush Syndrome) is **LOW**
- Primary threats are direct physical trauma and blood loss
- Immediate extrication is necessary to restore blood flow and treat injuries

---

#### ENTRAPMENT MORE THAN 15 MINUTES (or if duration unknown)

**PRIORITY:** ❌ **DO NOT RELEASE THE CRUSHING FORCE**

**Actions:**

1. ❌ **DO NOT REMOVE THE OBJECT**

2. 🚨 **Call 911 IMMEDIATELY**
   - Inform dispatcher you have a **"prolonged crush injury victim"**
   - Ensures they dispatch paramedics with correct equipment

3. 🌡️ **Keep victim warm** and as comfortable as possible

4. 💬 **Offer reassurance**
   - This is terrifying experience for victim

5. 🩹 **Control any bleeding** that is accessible
   - WITHOUT moving the crushing object

**Medical Rationale:**
- Risk of life-threatening Crush Syndrome is **HIGH**
- Releasing force will cause **fatal surge of toxins**
- Victim requires **advanced medical intervention BEFORE extrication**
- Paramedics will:
  - Start one or more IV lines
  - Begin administering fluids (sodium bicarbonate and other medications)
  - Counteract toxins and protect heart and kidneys
  - ONLY THEN lift the object
- **This is the ONLY way** to prevent or mitigate effects of Crush Syndrome

---

### Summary Table: Crush Injury Response Protocol

| Entrapment Duration | Action | Rationale |
|---------------------|--------|-----------|
| **LESS than 15 minutes** | ✅ RELEASE IMMEDIATELY (if safe)<br>✅ Control bleeding<br>✅ Treat shock<br>✅ Call 911 | Low risk of Crush Syndrome<br>Primary threats: trauma & blood loss<br>Need to restore blood flow |
| **MORE than 15 minutes** (or unknown) | ❌ DO NOT RELEASE<br>🚨 Call 911 - state "prolonged crush"<br>🌡️ Keep warm<br>💬 Reassure<br>🩹 Control accessible bleeding | HIGH risk of Crush Syndrome<br>Fatal toxin surge if released<br>Requires advanced medical intervention BEFORE extrication<br>Paramedics administer protective medications first |

---

## The Counter-Intuitive Truth

> **This counter-intuitive knowledge is one of the most important life-saving lessons a miner can learn. The instinct to free a trapped colleague must be overridden by the disciplined knowledge of this deadly medical phenomenon.**

**Remember:**
- Your natural instinct will be to free the person immediately
- For prolonged entrapments, this instinct will kill them
- Trust the 15-minute rule
- Wait for paramedics to administer protective treatment
- This knowledge saves lives

---

## Key Takeaways: Emergency Medical Response Part 1

**Scene Assessment:**
1. Stop, Look, Assess, Act - rescuer safety first
2. Never become a second victim
3. Secure scene before approaching

**EMS Activation:**
1. Call 911 immediately
2. Provide detailed location and injury information
3. Inform of any scene hazards

**Bleeding Control:**
1. Direct pressure is first action
2. Elevate if no fracture suspected
3. Tourniquet only for life-threatening bleeding
4. Document time of tourniquet application

**Shock Management:**
1. Recognize signs early
2. Keep warm, elevate feet
3. Provide reassurance
4. Nothing by mouth

**Crush Syndrome:**
1. Duration of entrapment is critical factor
2. Less than 15 minutes: Release immediately
3. More than 15 minutes: DO NOT RELEASE
4. Call 911, state "prolonged crush injury"
5. Wait for paramedic intervention before release

> **Your knowledge of these protocols can mean the difference between life and death. Study them. Practice them. Remember them.**'
  )
  WHERE module_id = v_module_id AND order_index = 4;

  RAISE NOTICE 'Lesson 4 updated with complete content';

END $$;