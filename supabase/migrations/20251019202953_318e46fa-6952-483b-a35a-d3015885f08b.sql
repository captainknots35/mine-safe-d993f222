-- Continue with AED procedures and advanced medical response
-- Update lesson 5 with complete AED protocol and burns treatment

UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{content}',
  to_jsonb('# Emergency Medical Response: Part 2

## 3.4 Using an Automated External Defibrillator (AED): A Step-by-Step Guide

Sudden cardiac arrest can happen to anyone, at any time. An **Automated External Defibrillator (AED)** is a safe, portable electronic device that analyzes the heart''s rhythm and can deliver an electrical shock to help the heart re-establish an effective rhythm. AEDs are designed to be used by anyone, even without formal training, as they provide clear, calm voice prompts to guide the user through the process.

### When to Use an AED

Use an AED on a person who has suddenly collapsed, is **unresponsive**, and is **not breathing normally** (e.g., they are gasping or not breathing at all).

### Universal Steps for AED Use

**1. CALL 911 and START CPR:** If you find someone unresponsive, immediately call 911 and start chest compressions. Ask another person to get the AED. **Do not delay CPR while waiting for the AED.**

**2. Turn On the AED:** As soon as the AED arrives, place it next to the victim and **turn it on**. It will immediately begin giving you voice prompts. **Follow them exactly.**

**3. Expose the Chest:** Remove all clothing from the person''s chest, including bras. The chest must be bare. If the chest is wet, wipe it dry. If there is excessive chest hair, use the razor in the AED kit to quickly shave the areas where the pads will be placed.

**4. Apply the Pads:** Peel the backing off the electrode pads. The pads themselves have diagrams showing where to place them. Attach one pad to the **upper right side** of the person''s chest, just below the collarbone. Attach the other pad to the **lower left side** of the chest, below the armpit.

**5. Plug in the Connector:** Plug the pad connector cable into the AED, usually next to a flashing light.

**6. Analyze the Rhythm:** The AED will say, **"Analyzing heart rhythm. Do not touch the patient."** At this point, **stop CPR** and ensure **no one is touching the person**.

**7. Deliver the Shock (If Advised):** If a shock is needed, the AED will announce, **"Shock advised. Charging."** It will tell you to stay clear. Once charged, a shock button will flash (usually orange). Before pressing it, loudly state **"CLEAR!"** and visually check to ensure no one is touching the victim. Then, **press the shock button**. The person''s body will jolt from the shock.

**8. Resume CPR:** **Immediately after the shock** is delivered, the AED will prompt you to **"Begin CPR."** Start chest compressions again **immediately**. **Do not check for a pulse.** The AED will provide a metronome beat to guide your compression rate. Continue CPR for 2 minutes, at which point the AED will automatically repeat the analysis cycle.

**Continue following the AED''s prompts until emergency medical personnel arrive and take over.**

---

## 3.5 Responding to Burns: Thermal, Chemical, and Electrical

Burns are a common industrial injury. The correct first aid depends on the source of the burn. The one universal rule is to **ensure the scene is safe and the burning process has stopped** before approaching the victim.

### Thermal Burns (from Heat)

Thermal burns are caused by contact with fire, hot surfaces, steam, or hot liquids.

**First Aid Protocol:**

1. **Stop the Burning Process:** Extinguish any flames by having the person "stop, drop, and roll," or smother the flames with a blanket. Remove the person from the source of heat.

2. **Cool the Burn:** **Immediately** place the burned area under cool (not cold) running water for **at least 20 minutes**. This is the **single most important step** to reduce the severity of the burn. **Do not use ice, iced water, or freezing compresses**, as this can cause further tissue damage.

3. **Remove Clothing and Jewelry:** Gently remove any clothing or jewelry near the burned area. If anything is stuck to the skin, **do not try to remove it**; cut around it.

4. **Cover the Burn:** Cover the burn loosely with a sterile, non-stick dressing. Plastic cling film is an excellent option as it is sterile, does not stick, and allows medical staff to see the burn without removing the dressing. **Do not use fluffy materials like cotton balls.**

5. **Keep the Victim Warm:** While cooling the burn, be careful to prevent hypothermia, especially if a large area of the body is burned. Cover the unburned parts of the person with a blanket.

**Do NOT Apply:** ointments, creams, butter, or any greasy substances. These trap heat and increase the risk of infection.

---

### Chemical Burns

Chemical burns are caused by contact with acids, bases (alkalis), or other corrosive substances.

**First Aid Protocol:**

1. **Ensure Rescuer Safety:** Wear appropriate PPE (chemical-resistant gloves) to avoid contaminating yourself.

2. **Remove the Chemical:** If the chemical is a dry powder (like lime), **carefully brush it off** the skin before adding water. Adding water to some dry chemicals creates a heat reaction.

3. **Flush with Water:** Flush the affected area with **copious amounts** of cool, running water for **at least 20 minutes**. If an emergency shower is available, use it.

4. **Remove Contaminated Clothing:** While flushing, carefully remove any clothing that has the chemical on it.

5. **Consult the SDS:** Have another person locate the Safety Data Sheet (SDS) for the chemical, as it may contain specific first aid instructions.

6. **Seek Medical Attention:** **All chemical burns require professional medical evaluation.**

---

### Electrical Burns

Electrical burns occur when electrical current passes through the body.

**First Aid Protocol:**

1. **DO NOT TOUCH THE VICTIM** until you are **100% certain** the power source has been turned off. The victim may still be in contact with the current, and you could be electrocuted.

2. **De-energize the Source:** Shut off power at the breaker box, switch, or by unplugging the equipment.

3. **Check for Response:** Once the scene is safe, check if the person is responsive and breathing. Electrical shock can cause cardiac arrest. **Be prepared to start CPR and use an AED.**

4. **Treat for Shock:** Assume the person is in shock. Have them lie down. Keep them warm.

5. **Assess for Other Injuries:** Electrical current can cause violent muscle contractions, potentially leading to falls, fractures, or spinal injuries.

6. **Cover Burns:** Cover any visible entry or exit burns with a dry, sterile dressing.

7. **Seek Immediate Medical Attention:** **All victims of electrical shock must be evaluated by a doctor.** External burns may appear minor, but the current can cause severe internal damage to organs and tissues.

---

## 3.6 Musculoskeletal Injuries: Fractures and Splinting

Fractures (broken bones) and severe sprains are common in the physically demanding mine environment. In a remote setting, the primary goal of first aid is to **immobilize the injury** to prevent further damage, reduce pain, and allow for safe transport.

### Assessment

**Signs and Symptoms:**
- Obvious deformity
- Swelling and bruising
- Severe pain
- Inability to move or bear weight on the limb
- If an open wound is present near the suspected fracture, treat it as an open fracture

**Check Circulation (After injury AND after splinting):**
- Check for a pulse (on top of the foot or at the wrist)
- Check capillary refill: Press on a toenail or fingernail; color should return within 2 seconds
- Check for sensation and movement
- If circulation is absent or diminished, this is a **critical emergency**

### Immobilization and Splinting

**Core Principle:** Immobilize the joints **above and below** the suspected fracture.

**Key Guidelines:**

1. **Splint in Position Found:** **Do NOT try to straighten** a severely angulated or deformed limb. Splint it in the position you find it to avoid causing more damage to nerves and blood vessels.

2. **Cover Open Wounds:** If the bone has broken through the skin, cover the wound with a dry, sterile dressing **before** applying the splint. **Do NOT try to push the bone back in.**

3. **Pad the Splint:** Use soft materials (jackets, clothing, rolled blankets) to pad the splint, especially over bony areas. This increases comfort and prevents pressure sores.

### Improvised Splints

In a mine environment, many items can create an effective splint:

**Rigid Splints:**
- Straight tree branches, pieces of wood, shovel handles, or rolled-up magazines
- Place on either side of the limb

**Anatomical Splints (Using the Body as a Splint):**
- Injured leg secured to the uninjured leg
- Injured arm secured to the chest
- Injured finger "buddy-taped" to the finger next to it

**Securing the Splint:**
- Use belts, bandanas, duct tape, or strips of cloth
- Tie knots on the splint itself, **not over the injured area**
- Splint should be snug enough to prevent movement but **not so tight** it cuts off circulation
- **Re-check circulation after the splint is applied**

---

## 3.7 Environmental Emergencies: Heat Stress and Hypothermia

Miners work in extreme temperatures, making them susceptible to both heat and cold-related emergencies. Recognizing symptoms and initiating correct first aid is crucial.

### Heat-Related Illnesses

Heat-related illnesses occur on a spectrum from mild to life-threatening. The ability to distinguish between **heat exhaustion** and **heat stroke** is a critical life-saving skill.

| Illness | Key Symptoms | Immediate First Aid Actions |
|---------|--------------|---------------------------|
| **Heat Cramps** | Painful muscle spasms, usually in legs and abdomen | 1. Move to cool place and rest<br>2. Drink water or sports drink<br>3. Gently stretch cramping muscle |
| **Heat Exhaustion** | Heavy sweating, cool/pale/clammy skin, fast weak pulse, nausea, dizziness, headache, weakness | 1. Move to cooler area<br>2. Loosen clothing<br>3. Apply cool wet cloths<br>4. Sip cool water<br>5. If symptoms worsen, call 911 |
| **Heat Stroke**<br>🚨 MEDICAL EMERGENCY | High body temp (above 103°F), hot/red/dry or damp skin, fast strong pulse, confusion, slurred speech, loss of consciousness | 1. CALL 911 IMMEDIATELY<br>2. Move to cooler place<br>3. Cool person rapidly (immerse in cool water, spray with hose, or place cold wet cloths/ice all over body)<br>4. DO NOT give anything to drink if unconscious |

### Hypothermia

Hypothermia occurs when the body loses heat faster than it can produce it, causing dangerously low core body temperature (below 95°F).

**Symptoms:** Shivering (may stop in severe cases), confusion, slurred speech, drowsiness, clumsiness, weak pulse, slow shallow breathing

**First Aid Protocol:**

1. **Call 911** - Hypothermia is a medical emergency

2. **Move to Warm, Dry Location** - Gently move person out of cold and wind. **Handle carefully** - jarring movements can trigger dangerous heart rhythms.

3. **Remove Wet Clothing** - Replace with warm, dry layers. Cover their head.

4. **Warm Center of Body First** - Use blankets, electric blanket, or skin-to-skin contact. Warm chest, neck, head, and groin.

5. **DO NOT Warm Arms and Legs First** - Applying heat to extremities forces cold blood back toward the heart, lungs, and brain, causing core body temperature to drop further. This "afterdrop" phenomenon can be **fatal**.

6. **Offer Warm Beverages** - Only if person is conscious and able to swallow. Give warm, sweet, non-alcoholic, non-caffeinated drinks.

7. **DO NOT Use Direct Heat** - No hot water, heating pads, or heating lamps. Can damage skin or cause irregular heartbeats.'::text)
)
WHERE title ILIKE '%medical%' AND order_index = 5
AND module_id IN (SELECT id FROM modules WHERE title ILIKE '%emergency%');