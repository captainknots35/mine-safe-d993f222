-- Update Emergency Medical Response lessons with complete crush syndrome protocol
-- and other critical medical information from the PDF

UPDATE lessons
SET content_data = jsonb_set(
  COALESCE(content_data, '{}'::jsonb),
  '{content}',
  to_jsonb('# Section 3: Emergency Medical Response - Actions that Save Lives

In the remote and rugged environment of a mine, professional medical help can be minutes or even hours away. The actions taken in the first few moments after a medical emergency can determine the outcome. This section provides miners with the essential knowledge to perform critical, life-saving interventions. This training is a core component of the "emergency medical procedures" mandated by 30 CFR Part 46. The focus is on simple, effective actions that can be performed under pressure to stabilize a victim and bridge the gap until advanced medical personnel arrive.

---

## 3.1 Initial Scene Assessment and Activating Emergency Medical Services (EMS)

Before providing any aid, the first and most important consideration is the **safety of the rescuer**. A rescuer who becomes a victim cannot help anyone. Therefore, the first step in any medical emergency is to conduct a rapid scene assessment.

### The "Stop, Look, Assess, Act" Model:

1. **Stop:** Pause at a safe distance from the incident. Resist the urge to rush in.
2. **Look:** Scan the area for any ongoing hazards. Is there unstable ground? Is the equipment still running? Are there downed electrical lines? Is there smoke or fire? Is there a chemical spill?
3. **Assess:** Determine if it is safe to approach. If there are ongoing hazards that cannot be controlled, **do not enter the scene**. Your role is to secure the area and call for help.
4. **Act:** If the scene is safe, proceed to the victim. If it is not safe, your action is to call for help and keep others away.

Once the scene is determined to be safe, the next immediate action is to **activate the emergency medical system**. This involves both internal and external notifications.

**Alert Mine Personnel:** Use the radio to call for the mine''s designated first responders and notify your supervisor, using the L.I.P. protocol (Location, Identification, Problem).

**Call 911:** Designate a specific person (or do it yourself if alone) to call 911 or the local emergency number. Provide the dispatcher with the following critical information:
- The mine''s physical address and the best entrance for an ambulance to use.
- Your specific location on the mine site (e.g., "North Pit, second bench").
- The nature of the injury (e.g., "a fall from height," "a crush injury").
- The number of victims.
- The victim''s condition (e.g., "conscious and breathing," "unconscious," "severe bleeding").
- Any hazards the responding ambulance crew should be aware of.

**Early activation of EMS is one of the most important factors in a positive outcome. Do not delay this call.**

---

## 3.2 First Aid Priorities: Controlling Severe Bleeding and Managing Shock

In cases of severe trauma, the most immediate threat to life is **massive blood loss**. Controlling severe bleeding is the top priority after ensuring the victim has an open airway and is breathing.

### Controlling Severe Bleeding

1. **Apply Direct Pressure:** Using a sterile dressing, trauma pad from a first aid kit, or the cleanest cloth available, apply firm, direct pressure directly to the wound. If a dressing becomes soaked with blood, **do not remove it**. Add another dressing on top of the first and continue to apply pressure.

2. **Elevate the Limb:** If the wound is on an arm or leg and there are no suspected broken bones, elevate the limb above the level of the heart while continuing to apply direct pressure.

3. **Tourniquet Application (For Life-Threatening Bleeding Only):** A tourniquet is a tool for stopping severe, life-threatening bleeding from a limb that cannot be controlled with direct pressure. Improper application can cause permanent damage, so it should **only be used when the victim will otherwise bleed to death**. All mine first aid kits should contain a commercially made tourniquet, such as a C-A-T® (Combat Application Tourniquet®), and miners should be trained in its use.
   - Apply the tourniquet "high and tight" on the injured limb, above the wound (between the wound and the torso).
   - Tighten the windlass until the bleeding stops.
   - Secure the windlass in its clip.
   - Write down the time the tourniquet was applied (e.g., "T=14:30") on the tourniquet strap or on the victim''s forehead. This information is **critical** for the hospital staff.
   - Once applied, a tourniquet should **not be removed** by anyone other than medical professionals.

### Managing Shock

**Shock** is a life-threatening condition where the circulatory system fails to provide enough oxygenated blood to the body''s vital organs. Anyone who has suffered a serious injury is at risk for shock.

**Signs of Shock:**
- Pale, cold, clammy skin
- Rapid, weak pulse
- Rapid, shallow breathing
- Nausea
- Confusion or unresponsiveness

**Treatment for Shock:**
1. Have the person lie down flat on their back.
2. Keep them warm. Cover them with a blanket, coat, or anything available to prevent heat loss. An emergency space blanket is a standard item in a well-stocked first aid kit.
3. Elevate their feet about 12 inches, **unless you suspect a head, neck, back, or leg injury**.
4. **Do not give the person anything to eat or drink.**
5. Offer reassurance and try to keep them calm.

---

## 3.3 Specialized Protocol: The Dangers of Crush Injury and Crush Syndrome

Crush injuries are a significant and unique hazard in the mining industry, resulting from ground falls, equipment rollovers, or machinery entanglement. While the immediate physical damage is obvious, a more insidious and deadly threat is **Crush Syndrome**. This is a systemic medical condition that can occur after a victim has been trapped for a prolonged period. Understanding this syndrome is critical because **the intuitive action—freeing the person as quickly as possible—can be fatal**.

### The Pathophysiology of Crush Syndrome

When a large muscle mass (like a leg or arm) is compressed, blood flow to the area is cut off. The muscle cells, deprived of oxygen, begin to die and break down in a process called **rhabdomyolysis**. During this process, they release large amounts of toxic substances into the trapped limb, primarily **potassium** and **myoglobin**.

- **Potassium:** A sudden release of high levels of potassium into the bloodstream can cause immediate, **fatal cardiac arrhythmias** (irregular heartbeats) and cardiac arrest.
- **Myoglobin:** This large protein is released from damaged muscle cells and travels to the kidneys. It clogs the delicate filtering tubes in the kidneys, leading to **acute kidney failure**, which can be fatal in the hours or days following the injury.

As long as the crushing force remains, these toxins are contained within the limb. However, **when the force is suddenly released, the toxins surge into the body''s central circulation, overwhelming the heart and kidneys**. This can happen **within minutes of release** and is often irreversible. Medical studies show muscles can withstand about 4 hours without blood flow before cell death becomes widespread, but the process of toxin buildup begins much sooner.

### The Critical Protocol: Duration of Entrapment Determines Action

The **single most critical factor** in responding to a crush injury is the **duration of entrapment**. This determines the entire course of action. The following protocol **must be committed to memory**.

| Entrapment Duration | Action Protocol | Medical Rationale |
|---------------------|----------------|-------------------|
| **LESS Than 15 Minutes** | **PRIORITY:** Release the crushing force IMMEDIATELY (if it can be done safely).<br><br>**Actions:**<br>1. Remove the object.<br>2. Control any severe bleeding with direct pressure.<br>3. Treat for shock.<br>4. Call 911 and prepare for transport. | The risk of significant toxin buildup (Crush Syndrome) is **LOW**. The primary threats are direct physical trauma (broken bones, torn tissues) and blood loss. Immediate extrication is necessary to restore blood flow and treat these injuries. |
| **MORE Than 15 Minutes** (or if duration is unknown) | **PRIORITY:** **DO NOT RELEASE THE CRUSHING FORCE**.<br><br>**Actions:**<br>1. **DO NOT REMOVE THE OBJECT.**<br>2. Call 911 **immediately**. Inform the dispatcher that you have a **"prolonged crush injury victim"** so they dispatch paramedics with the correct equipment.<br>3. Keep the victim warm and as comfortable as possible.<br>4. Offer reassurance. This is a terrifying experience for the victim.<br>5. Control any bleeding that is accessible **without moving the crushing object**. | The risk of life-threatening Crush Syndrome is **HIGH**. Releasing the force will cause a **fatal surge of toxins** into the bloodstream. The victim requires **advanced medical intervention BEFORE extrication**. Paramedics will start one or more IV lines and begin administering fluids (sodium bicarbonate and other medications) to counteract the toxins and protect the heart and kidneys. **Only after this treatment is in place** will they lift the object. **This is the only way** to prevent or mitigate the effects of Crush Syndrome. |

This **counter-intuitive knowledge** is one of the most important life-saving lessons a miner can learn. **The instinct to free a trapped colleague must be overridden by the disciplined knowledge of this deadly medical phenomenon.**'::text)
)
WHERE title ILIKE '%medical%' AND order_index = 4
AND module_id IN (SELECT id FROM modules WHERE title ILIKE '%emergency%');