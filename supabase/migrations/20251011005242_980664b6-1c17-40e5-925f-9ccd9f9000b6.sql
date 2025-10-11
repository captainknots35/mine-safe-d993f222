-- Module 3: Emergency Procedures - Lessons 3-7 (Fire, Medical, Hazmat, Human Element)

DO $$
DECLARE
  v_module_id UUID := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
BEGIN

  -- Lesson 3: Fire, Explosion & Equipment Emergencies (35 min)
  INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
  VALUES (
    v_module_id,
    'Fire, Explosion & Equipment Emergencies',
    'Fire response protocols, extinguisher use, blasting safety, and powered haulage accident scene management.',
    'document',
    3,
    35,
    true,
    jsonb_build_object(
      'content', '# Fire, Explosion & Equipment Emergencies

## Section 2.3: Fire and Explosion Response

Fires on mobile equipment or at processing plants are a constant threat due to presence of fuel, hydraulic oil, electrical systems, and hot surfaces. Explosions, primarily related to blasting, are less frequent but have catastrophic potential.

---

### Fire Response and Extinguisher Use

All miners must be trained in the **P.A.S.S. method** for using a portable fire extinguisher:

**P** - **Pull** the pin
**A** - **Aim** the nozzle at the base of the fire
**S** - **Squeeze** the handle
**S** - **Sweep** from side to side

---

### Fire Classification and Extinguisher Selection

**CRITICAL:** Using the wrong extinguisher type can be ineffective or make the situation worse.

| Fire Class | Symbol | Fuel Source | Extinguisher Types | Use On | DO NOT USE ON |
|------------|--------|-------------|-------------------|--------|---------------|
| **Class A** | Green Triangle | Ordinary Combustibles (Wood, Paper, Trash, Plastics) | Water, ABC Dry Chemical | Trash fires, wood pallets, vegetation | Electrical fires, flammable liquid fires |
| **Class B** | Red Square | Flammable Liquids & Gases (Diesel, Gasoline, Oil, Grease) | ABC Dry Chemical, CO₂, BC Dry Chemical | Fuel spills, vehicle engine fires | N/A |
| **Class C** | Blue Circle | Energized Electrical Equipment (Motors, Panels, Switches) | ABC Dry Chemical, CO₂ | Electrical panels, motors | N/A (De-energize first if safe) |

---

### Vehicle Fire Protocol

Follow these steps in order:

1. **Stop** the vehicle in a safe location, away from other equipment, buildings, or fuel sources

2. **Shut down** the engine to stop flow of fuel and hydraulic fluid

3. **Activate** vehicle fire suppression system, if equipped
   - Systems can be manually activated
   - Discharge agent directly into engine compartment and high-risk areas

4. **Exit** the vehicle and grab portable fire extinguisher

5. **Fight the fire** from safe distance, staying **upwind** to avoid smoke and fumes

6. ⚠️ **Never position yourself between fire and your only escape route**
   - Always maintain clear path to safety

7. 🚨 **If fire is too large** or involves tires:
   - Evacuate to safe distance (at least 100 feet)
   - Wait for fire department
   - Tire fires can result in explosive ruptures

---

### Blasting and Explosion Response

Blasting is routine in many surface stone operations but carries inherent risks, primarily from fly-rock.

#### Case Study: Fly-Rock Fatality

**Incident:** Mine owner struck by fly-rock from blast

**Root Causes - Cascade of Failures:**
- Victim not in designated blast shelter
- Blasting circuit not tested prior to detonation
- Blasting lines in poor repair
- Led to misfire and improvisation
- Resulted in uncontrolled detonation

#### Misfire Protocol

A misfire is **one of the most dangerous situations in blasting**.

**Required Actions:**
- ❌ **NO PERSONNEL** to approach blast area
- ⏰ Observe designated waiting period (per regulations and explosives manufacturer)
- 🏠 All personnel must remain in secure blast shelter
- ⚠️ Only certified blaster may troubleshoot, following strict established procedures

#### Fly-Rock Sheltering Requirements

**Mandatory Protection:**
- ✅ All personnel must be in **engineered blast shelter** or safe distance away
- ✅ Distance determined by blaster-in-charge
- ❌ Taking cover behind mobile equipment or natural features is **NOT adequate protection**
- ⚠️ Force of fly-rock can easily penetrate vehicle cab

#### Explosives Handling

**Critical Safety Requirements:**
- Must be kept in approved magazines
- Protected from impact, fire, and unauthorized access
- Follow all handling procedures exactly

---

## Section 2.4: Powered Haulage and Equipment Emergencies

Powered haulage accidents are consistently a leading cause of mining fatalities. While prevention is covered in other modules, knowing how to respond to an equipment accident scene is a critical emergency procedure.

### The First Priority: Responder Safety

**CRITICAL PRINCIPLE:** The first priority of any responder is to ensure their own safety before attempting to render aid.

> An incident scene is, by its nature, unstable and hazardous. A single incident can easily create multiple victims if responders act impulsively instead of methodically.

**Examples of Secondary Hazards:**
- Highwall failure creates unstable zone that could collapse second time on rescuers
- Haul truck rollover involves spilled fuel (fire hazard) and unstable ground
- Equipment may have stored energy ready to release

---

### Scene Safety and Energy Control Protocol

Follow this **deliberate, five-step protocol**:

#### 1. STOP and ASSESS

Before approaching, **stop at safe distance** and perform **360-degree assessment**:

**Check For:**
- **Ground Stability:** Could ground shift or collapse further? (Factor in stockpile collapses and highwall engulfments)
- **Equipment Stability:** Could machine shift, roll, or fall further?
- **Energy Sources:** 
  - Is engine still running?
  - Is hydraulic pressure stored in lines?
  - Are electrical systems still live?
- **Environmental Hazards:**
  - Downed power lines?
  - Fuel or hydraulic fluid leaking (fire or slip hazard)?

#### 2. STABILIZE the Scene

Your first action is **NOT to rush to victim**, but to **make area safe**.

**Actions:**
- **Establish Perimeter:** Use your vehicle, cones, or barrier tape to cordon off area
- **Prevent Entry:** Keep other personnel and vehicles out of hazardous zone

#### 3. CONTROL Energy Sources (If Safe and Trained)

⚠️ **DO NOT attempt** to control energy sources unless certain you can do so without risk.

**Key Principle:** Equipment must be **de-energized and locked out** before rescue can safely begin.

**Limited Safe Actions:**
- If you can safely access master shut-off or emergency stop from stable position
- Without approaching immediate hazard
- Then do so

#### 4. REPORT

Use radio to report incident using **L.I.P. protocol**:
- **Location:** Exact position
- **Identification:** Your name/vehicle
- **Problem:** Nature of emergency

**Provide IC with:**
- Your assessment of scene
- All identified hazards
- This information critical for response team to bring right equipment and take right precautions

#### 5. WAIT for Trained Responders

**Unless** there is **immediate, life-threatening hazard** you can safely mitigate (like small, accessible fire):

✅ **Best and safest action:** Secure scene and wait for coordinated response from trained first responders and supervisors

---

### Real-World Application Examples

This protocol applies to incidents like:

**Haul Truck Rollover:**
- Truck went through inadequate berm
- Lost control on haul road
- Check: Ground stability, equipment stability, fuel leaks, fire risk

**Loader-Pedestrian Accident:**
- Loader operator lowered 4,700-lb pallet onto miner
- Position obscured by load
- Check: Equipment stability, potential for further movement, pinch points

**Equipment at Highwall:**
- Any incident near highwall
- Ground stability is primary concern
- Potential for secondary collapse

---

### The Golden Rule

> **A would-be rescuer must NEVER become a second victim.**

**Your response priorities:**
1. Ensure your own safety
2. Stabilize and secure the scene
3. Provide accurate information to command
4. Wait for coordinated response

The stability of the machine, surrounding ground, and potential for further movement are primary concerns for any responding miner.

---

## Key Takeaways

**Fire Response:**
- Know P.A.S.S. method for extinguishers
- Use correct extinguisher class for fuel type
- Stay upwind, maintain escape route
- Never fight tire fires - evacuate and wait

**Blasting Safety:**
- All personnel in engineered shelters during blasts
- Never approach misfire area
- Only certified blasters handle explosives

**Equipment Accident Response:**
- Stop and assess from safe distance (360° view)
- Stabilize scene before approaching victim
- Identify all energy sources and hazards
- Report using L.I.P. protocol
- Wait for trained responders unless immediate life-threat you can safely mitigate

> **Remember:** Your safety comes first. You cannot help anyone if you become a victim yourself. Scene assessment and stabilization save lives - both victims'' and responders''.'
    )
  );

  RAISE NOTICE 'Lesson 3 created successfully';

END $$;