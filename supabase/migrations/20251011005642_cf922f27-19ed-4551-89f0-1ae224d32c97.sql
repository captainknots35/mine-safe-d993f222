-- Update Lessons 5-7 with complete content

DO $$
DECLARE
  v_module_id UUID := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
BEGIN

  -- Update Lesson 5: Emergency Medical Response Part 2 (40 min)
  UPDATE lessons
  SET content_data = jsonb_build_object(
    'content', '# Emergency Medical Response: Part 2

## 3.4 Using an Automated External Defibrillator (AED): A Step-by-Step Guide

Sudden cardiac arrest can happen to anyone, at any time. An **Automated External Defibrillator (AED)** is a safe, portable electronic device that analyzes the heart''s rhythm and can deliver an electrical shock to help the heart re-establish an effective rhythm.

AEDs are designed to be used by anyone, even without formal training, as they provide clear, calm voice prompts to guide the user through every step.

---

### When to Use an AED

Use an AED on a person who has:
- ✅ Suddenly collapsed
- ✅ Is unresponsive
- ✅ Is not breathing normally (gasping or not breathing at all)

---

### Universal Steps for AED Use

#### Step 1: CALL 911 and START CPR
- If you find someone unresponsive, **immediately call 911** and start chest compressions
- Ask another person to get the AED
- ⚠️ **Do not delay CPR while waiting for AED**

#### Step 2: Turn On the AED
- As soon as AED arrives, place it next to victim
- **Turn it on**
- It will immediately begin giving voice prompts
- **Follow them exactly**

#### Step 3: Expose the Chest
- Remove all clothing from person''s chest, including bras
- Chest must be bare
- If chest is wet, wipe it dry
- If excessive chest hair, use razor in AED kit to quickly shave areas where pads will be placed

#### Step 4: Apply the Pads
- Peel backing off electrode pads
- Pads have diagrams showing where to place them
- **Attach one pad** to upper right side of chest, just below collarbone
- **Attach other pad** to lower left side of chest, below armpit

#### Step 5: Plug in the Connector
- Plug pad connector cable into AED
- Usually next to a flashing light

#### Step 6: Analyze the Rhythm
- AED will say: **"Analyzing heart rhythm. Do not touch the patient."**
- At this point: **STOP CPR**
- Ensure **no one is touching the person**

#### Step 7: Deliver the Shock (If Advised)
- If shock needed, AED will announce: **"Shock advised. Charging."**
- It will tell you to stay clear
- Once charged, shock button will flash (usually orange)
- Before pressing, loudly state **"CLEAR!"**
- Visually check to ensure no one touching victim
- Then, **press the shock button**
- Person''s body will jolt from shock

#### Step 8: Resume CPR
- **Immediately after shock**, AED will prompt: **"Begin CPR."**
- Start chest compressions again **immediately**
- **Do not check for pulse**
- AED will provide metronome beat to guide compression rate
- Continue CPR for 2 minutes
- AED will automatically repeat analysis cycle

**Continue following AED''s prompts until emergency medical personnel arrive and take over.**

⚠️ **Do NOT turn AED off or remove pads**

---

## 3.5 Responding to Burns: Thermal, Chemical, and Electrical

Burns are a common industrial injury. The correct first aid depends on the source of the burn.

> **Universal Rule:** Ensure scene is safe and burning process has stopped before approaching victim.

---

### Thermal Burns (from Heat)

Thermal burns are caused by contact with fire, hot surfaces, steam, or hot liquids.

#### First Aid Protocol:

**1. Stop the Burning Process**
- Extinguish flames by having person "stop, drop, and roll"
- Or smother flames with blanket
- Remove person from heat source

**2. Cool the Burn**
- **Immediately** place burned area under cool (not cold) running water
- Continue for **at least 20 minutes**
- **This is the single most important step** to reduce burn severity
- ❌ **Do NOT use** ice, iced water, or freezing compresses
  - Can cause further tissue damage

**3. Remove Clothing and Jewelry**
- Gently remove any clothing or jewelry near burned area
- If anything stuck to skin: **Do NOT try to remove it**
- Cut around it instead

**4. Cover the Burn**
- Cover burn loosely with sterile, non-stick dressing
- Plastic cling film is excellent option:
  - Sterile
  - Does not stick
  - Allows medical staff to see burn without removing dressing
- ❌ **Do NOT use** fluffy materials like cotton balls

**5. Keep Victim Warm**
- While cooling burn, prevent hypothermia
- Especially if large area burned
- Cover unburned parts with blanket

**❌ DO NOT Apply:**
- Ointments
- Creams
- Butter
- Greasy substances
- These trap heat and increase infection risk

---

### Chemical Burns

Chemical burns are caused by contact with acids, bases (alkalis), or other corrosive substances.

#### First Aid Protocol:

**1. Ensure Rescuer Safety**
- Wear appropriate PPE (chemical-resistant gloves)
- Avoid contaminating yourself

**2. Remove the Chemical**
- If dry powder (like lime): **Carefully brush off** skin before adding water
- Adding water to some dry chemicals creates heat reaction

**3. Flush with Water**
- Flush affected area with **copious amounts** of cool, running water
- Continue for **at least 20 minutes**
- If emergency shower available, use it

**4. Remove Contaminated Clothing**
- While flushing, carefully remove any clothing with chemical on it

**5. Consult the SDS**
- Have another person locate Safety Data Sheet (SDS) for chemical
- May contain specific first aid instructions

**6. Seek Medical Attention**
- **All chemical burns require professional medical evaluation**

---

### Electrical Burns

Electrical burns occur when electrical current passes through body.

#### First Aid Protocol:

**1. ⚠️ DO NOT TOUCH VICTIM**
- Not until **100% certain** power source has been turned off
- Victim may still be in contact with current
- You could be electrocuted

**2. De-energize the Source**
- Shut off power at breaker box, switch, or by unplugging equipment

**3. Check for Response**
- Once scene safe, check if person is responsive and breathing
- Electrical shock can cause cardiac arrest
- Be prepared to start CPR and use AED

**4. Treat for Shock**
- Assume person is in shock
- Have them lie down
- Keep them warm

**5. Assess for Other Injuries**
- Electrical current can cause violent muscle contractions
- Potentially leading to falls, fractures, or spinal injuries

**6. Cover Burns**
- Cover any visible entry or exit burns with dry, sterile dressing

**7. Seek Immediate Medical Attention**
- **All victims of electrical shock must be evaluated by doctor**
- External burns may appear minor
- Current can cause severe internal damage to organs and tissues

---

## 3.6 Musculoskeletal Injuries: Fractures and Splinting

Fractures (broken bones) and severe sprains are common in physically demanding mine environment. In remote setting, primary goal of first aid is to **immobilize the injury** to prevent further damage, reduce pain, and allow safe transport.

---

### Assessment

#### Signs and Symptoms:
- Obvious deformity
- Swelling
- Bruising
- Severe pain
- Inability to move or bear weight on limb
- If open wound present near suspected fracture: Treat as open fracture

#### Check Circulation:
**After injury AND after splinting:**
- Check for pulse (on top of foot or at wrist)
- Check capillary refill:
  - Press on toenail or fingernail
  - Color should return within 2 seconds
- Check for sensation and movement
- ⚠️ If circulation absent or diminished: **Critical emergency**

---

### Immobilization and Splinting

**Core Principle:** Immobilize the joints **above and below** the suspected fracture.

#### Key Guidelines:

**1. Splint in Position Found**
- ❌ **Do NOT try to straighten** severely angulated or deformed limb
- Splint it in position you find it
- Avoids causing more damage to nerves and blood vessels

**2. Cover Open Wounds**
- If bone has broken skin, cover wound with dry, sterile dressing **before** applying splint
- ❌ **Do NOT try to push bone back in**

**3. Pad the Splint**
- Use soft materials (jackets, clothing, rolled blankets)
- Pad splint, especially over bony areas
- Increases comfort and prevents pressure sores

---

### Improvised Splints

In mine environment, many items can create splint:

#### Rigid Splints:
- Straight tree branches
- Pieces of wood
- Shovel handles
- Rolled-up magazines
- Place on either side of limb

#### Anatomical Splints (Body as Splint):
- Injured leg secured to uninjured leg
- Injured arm secured to chest
- Injured finger "buddy-taped" to finger next to it

#### Securing the Splint:
- Use belts, bandanas, duct tape, or strips of cloth
- Tie knots on splint itself, **not over injured area**
- Splint should be snug enough to prevent movement
- But **not so tight** it cuts off circulation
- **Re-check circulation after splint applied**

---

## 3.7 Environmental Emergencies: Heat Stress and Hypothermia

Miners work in extreme temperatures, making them susceptible to both heat and cold-related emergencies. Recognizing symptoms and initiating correct first aid is crucial.

---

### Heat-Related Illnesses

Heat-related illnesses occur on a spectrum from mild to life-threatening. The ability to distinguish between **heat exhaustion** and **heat stroke** is a critical life-saving skill.

| Illness | Key Symptoms | Immediate First Aid Actions |
|---------|--------------|----------------------------|
| **Heat Cramps** | - Painful muscle spasms<br>- Usually in legs and abdomen | 1. Move to cool place and rest<br>2. Drink water or sports drink<br>3. Gently stretch cramping muscle |
| **Heat Exhaustion** | - Heavy sweating<br>- Cool, pale, clammy skin<br>- Fast, weak pulse<br>- Nausea, dizziness, headache<br>- Weakness | 1. Move to cooler, shaded, or air-conditioned area<br>2. Loosen clothing<br>3. Apply cool, wet cloths to head, neck, face<br>4. Have person sip cool water<br>5. If symptoms worsen or don''t improve, call 911 (can progress to heat stroke) |
| **Heat Stroke**<br>🚨 **MEDICAL EMERGENCY** | - High body temp (above 103°F)<br>- Hot, red, dry or damp skin<br>- Fast, strong pulse<br>- Confusion, slurred speech<br>- Loss of consciousness | 1. **CALL 911 IMMEDIATELY**<br>2. Move person to cooler place<br>3. Cool person rapidly using any means: immerse in cool water, spray with hose, or place cold wet cloths/ice all over body<br>4. **Do NOT give anything to drink** if unconscious or confused |

---

### Hypothermia

Hypothermia occurs when body loses heat faster than it can produce it, causing dangerously low core body temperature (below 95°F). It''s a risk in cold weather, but also for miners in wet conditions or trauma victims in shock.

#### Symptoms:
- Shivering (may stop in severe cases)
- Confusion
- Slurred speech
- Drowsiness
- Clumsiness
- Weak pulse
- Slow, shallow breathing

#### First Aid Protocol:

**1. Call 911**
- Hypothermia is medical emergency

**2. Move to Warm, Dry Location**
- Gently move person out of cold and wind
- ⚠️ **Handle carefully** - jarring movements can trigger dangerous heart rhythms

**3. Remove Wet Clothing**
- Replace with warm, dry layers
- Cover their head

**4. Warm Center of Body First**
- Use blankets, electric blanket, or skin-to-skin contact
- Warm chest, neck, head, and groin

**5. ❌ DO NOT Warm Arms and Legs First**
- Applying heat to extremities forces cold blood back toward heart, lungs, and brain
- Causes core body temperature to drop further
- This "afterdrop" phenomenon can be **fatal**

**6. Offer Warm Beverages**
- Only if person is conscious and able to swallow
- Give warm, sweet, non-alcoholic, non-caffeinated drinks

**7. ❌ DO NOT Use Direct Heat**
- No hot water, heating pads, or heating lamps
- Can damage skin or cause irregular heartbeats

---

## 3.8 Emergency Eyewash and Shower Use

In areas where miners may be exposed to injurious corrosive materials, **OSHA requires suitable facilities** for quick drenching or flushing of eyes and body.

---

### Location and Access Requirements

**ANSI Standard Z358.1 Requirements:**
- Must be located in accessible area
- **No more than 10 seconds to reach** (approximately 55 feet)
- Path must be on same level as hazard
- Free of any obstructions
- Well-lit area
- Identified with highly visible sign

---

### Proper Use of Emergency Eyewash Station

**The first few seconds after chemical splash are critical.** Delaying treatment can result in permanent damage or blindness.

#### Step-by-Step Procedure:

**1. Activate the Unit**
- Immediately proceed to eyewash station
- Push activation lever or handle
- Unit designed to activate in single motion
- Stays on without requiring use of hands

**2. Position Your Eyes**
- Lower your head
- Position eyes directly in streams of flushing fluid

**3. Hold Eyelids Open**
- Use thumb and forefinger of each hand
- Hold eyelids open
- ⚠️ Natural reflex is to close eyes
- Must overcome this reflex to ensure fluid flushes entire eye surface

**4. Roll Your Eyeballs**
- While flushing, roll eyes up, down, left, and right
- Ensures fluid reaches all eye surfaces
- Including under eyelids

**5. Flush for 15 Minutes**
- Continue flushing for **minimum 15 minutes**
- This duration is **critical** to ensure chemical completely washed away

**6. Remove Contact Lenses**
- If wearing contacts, remove while flushing
- ❌ **Do NOT delay start of flushing** to remove them
- Lenses can trap chemicals against cornea
- Must be removed, but flushing is first priority

**7. Seek Immediate Medical Attention**
- After 15-minute flush complete
- **All individuals who have used eyewash for chemical exposure must seek professional medical evaluation**

---

### Maintenance

- Plumbed eyewash and shower units must be **activated weekly**
- Weekly flushing (typically at least 3 minutes):
  - Verifies proper operation
  - Clears sediment or rust from lines
  - Helps prevent bacteria growth that could cause secondary eye infection

---

## Key Takeaways: Emergency Medical Response Part 2

**AED Use:**
- Use on unresponsive person not breathing normally
- Follow voice prompts exactly
- Never delay CPR waiting for AED
- Continue until EMS arrives

**Burns:**
- Thermal: Cool for 20 minutes minimum
- Chemical: Flush for 20 minutes, remove dry powder first
- Electrical: De-energize first, all victims need medical evaluation

**Fractures:**
- Immobilize joints above and below
- Splint in position found
- Check circulation before and after splinting

**Environmental:**
- Heat exhaustion vs heat stroke - know the difference
- Heat stroke requires immediate 911 call
- Hypothermia: Warm core first, not extremities
- Eyewash: 15 minutes minimum flush time

> **These skills bridge the gap between injury and advanced medical care. In a remote mine environment, you ARE the first responder. Your knowledge and actions save lives.**'
  )
  WHERE module_id = v_module_id AND order_index = 5;

  RAISE NOTICE 'Lesson 5 updated with complete content';

END $$;