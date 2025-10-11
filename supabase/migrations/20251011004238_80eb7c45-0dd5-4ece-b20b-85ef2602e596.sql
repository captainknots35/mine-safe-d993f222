-- Replace placeholder summaries with full verbatim content for Module 3 lessons
DO $$
DECLARE
  l1 uuid := '85a3e442-d027-4abe-b6e8-292470bb727d';
  l2 uuid := 'c82b8730-2633-4181-b6a6-a2f01a8ec8b5';
  l3 uuid := '5be96845-afda-4ea8-8a6b-47dac6efe007';
  l4 uuid := '917daa0e-a1d4-4450-8523-b984931deed4';
  l5 uuid := '85c6a7b9-a70b-4b13-8d7a-8e45549e278c';
  l6 uuid := 'f5d3a5f0-cfa9-4433-b4a6-094e1e15c6e1';
  l7 uuid := 'c0dd01e5-3eb1-4738-89c6-66f2b8cfef21';
BEGIN
  -- Lesson 1: full text
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','The Unforgiving Environment & The Professional''s Mindset','content',
    'This training module is the most critical component of a miner''s safety education. It is not about memorizing regulations for compliance; it is about internalizing procedures for survival. The actions and protocols detailed in this curriculum are not theoretical. They are the direct result of hard-learned lessons from real incidents, investigations, and the collective experience of the mining industry.

In the dynamic and powerful environment of a surface mine, where conditions can change in an instant, emergencies are not a matter of if, but when. Mastering this material is a core professional responsibility. The objective is to move beyond simply knowing what to do in an emergency and to understand why it is done. This deeper comprehension ensures that when an incident occurs and seconds count, training and instinct take over, leading to calm, decisive, and life-saving actions. The defining characteristic of a professional miner is an unwavering commitment to their own safety and the safety of their crew, a commitment that is forged through the mastery of the knowledge contained within this module.'),
    jsonb_build_object('heading','The Foundation of Law: From Tragedy to Regulation','content',
    'The federal safety regulations that govern the mining industry are not arbitrary rules created in an office. They are a living history of the industry''s most painful lessons, often written in response to catastrophic events that claimed the lives of miners.

The modern era of mine safety began with the Federal Mine Safety and Health Act of 1977. Before this landmark legislation, the mining industry was plagued by an appalling number of fatalities (1907 saw an estimated 3,242 deaths). The 1977 Act consolidated coal, metal, and non‑metal mining under one legal structure and created MSHA. In the decade before the Act (1967–1976) there was an average of 356 mine fatalities per year; in the decade after (1978–1987) this dropped by 53% to 189. In 1978, 242 miners died; by 2023, 41. The law continues to evolve (e.g., the 2006 MINER Act), modernizing emergency preparedness with mine‑specific response plans, communication/tracking, breathable air/refuge alternatives, and stronger rescue capability.'),
    jsonb_build_object('heading','Your Role and Responsibilities under 30 CFR Part 46','content',
    '30 CFR Part 46 requires that all miners be trained and retrained to perform their jobs safely. Mine operators must provide a comprehensive training plan delivered by a competent person. Your responsibility is to actively engage, ask questions, and internalize procedures until they become second nature—because your life, and the lives of your coworkers, depend on it.'),
    jsonb_build_object('heading','Section 1: The Mine Emergency Action Plan and Incident Command','content',
    'Every site must have a detailed, site‑specific Emergency Action Plan (EAP). It is the authoritative guide for coordinated action during any emergency. Familiarity with the EAP—and practicing it—directly increases survivability and effectiveness when seconds matter.')
  )) WHERE id = l1;

  -- Lesson 2: detailed text
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','Section 2.1: Ground Failure Emergencies','content',
    'Ground failure—the uncontrolled collapse of highwalls, stockpiles, and trench walls—is among the deadliest hazards in surface mining. Prevention requires vigilance for warning signs: tension cracks parallel to an edge; bulging/slumping at the toe; new seepage increasing pore pressure; popping/cracking sounds; and escalating sloughing of rock or sand.

Types of failure include Rock Falls, Plane Shear (sliding along weak bedding/fault planes), and Rotational Shear (slump along a curved surface).'),
    jsonb_build_object('heading','Case Study: Fatal Stockpile Collapse','content',
    'May 22, 2023: A haul‑truck operator (49 years experience) died when ground collapsed at the crest of a 42‑ft sand stockpile. Root cause: material was dumped at the top while a loader simultaneously removed material from the base—“undercutting the toe.” This steepened the slope beyond its angle of repose and removed support, guaranteeing failure.

Emergency Protocol: Never dump over an actively undercut edge. Dump back from the crest and push over with a dozer/loader. If instability or unsafe practice is observed: stop work, move to safety, and report immediately.'),
    jsonb_build_object('heading','Case Study: Highwall Undercutting','content',
    'Aug 22, 2024: An excavator operator died after a highwall failure. Investigations show normalized deviance—digging into the base was “normal.” Protocol: never dig into the base; after a collapse, headcount first; no rescue until ground stability is verified by a competent person; keep cabs oriented away from the highwall.'),
    jsonb_build_object('heading','Case Study: Trench Collapse','content',
    'Jan 3, 2025: A haul‑truck operator was engulfed in a 16‑ft trench. No ground exam was performed; spoil piled on the edge added surcharge load. Protocol: never enter >5‑ft trenches unless sloped/benched/shored. After collapse: do not enter; call 911; work from a stable edge only after the IC declares the scene safe.'),
    jsonb_build_object('heading','Section 2.2: Water Inundation and Submersion','content',
    'From 2010–2023 there were 19 drowning accidents; 11 involved equipment submersion. Operating near water demands extra margin: maintain distance from edges; never work on unconsolidated fill; examine ground frequently (especially after rain); wear seatbelts. If submersion occurs: keep seatbelt on; do not force the door; break a side/rear window in the corner; unbuckle, exit, and swim toward light. Dredging requires PFDs at all times; ensure pontoon/bilge integrity; never exceed design capacity; if capsizing, exit and clear the vessel immediately.')
  )) WHERE id = l2;

  -- Lesson 3: Fire / Explosion / Equipment
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','2.3 Fire Response and Extinguisher Use','content',
    'Use the P.A.S.S. method: Pull, Aim at the base, Squeeze, Sweep. Match extinguisher to class: A (ordinary combustibles), B (flammable liquids/gases), C (energized electrical).'),
    jsonb_build_object('heading','Vehicle Fire Protocol','content',
    'Stop in a safe area; shut down engine; activate suppression; exit with extinguisher; attack from upwind; never block your egress; if fire is large or involves tires, evacuate 100+ ft and wait for fire department.'),
    jsonb_build_object('heading','Blasting and Explosion Response','content',
    'Fly‑rock fatality case study underscores strict controls. Misfire protocol: no approach; observe waiting period; remain sheltered; only a certified blaster troubleshoots. Always use engineered blast shelters; equipment cabs or “natural cover” are not adequate. Store explosives in approved magazines and control access.'),
    jsonb_build_object('heading','2.4 Scene Safety and Energy Control Protocol','content',
    'Stop, Assess (360° for ground/equipment stability, energy, environmental hazards), Stabilize (perimeter; de‑energize only if safe and trained), Report (L.I.P.), and Wait for trained responders unless a life‑threatening hazard can be safely mitigated. Never become a second victim.')
  )) WHERE id = l3;

  -- Lesson 4: Medical Part 1
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','3.1 Initial Scene Assessment','content',
    'Stop, Look, Assess, Act. Do not enter unsafe scenes. Your first duty is scene safety and activating help.'),
    jsonb_build_object('heading','Activating EMS','content',
    'Alert mine responders via radio using the L.I.P. protocol, then call 911: provide address, best entrance, exact site location, nature of injury, victim count/condition, and hazards.'),
    jsonb_build_object('heading','3.2 Controlling Severe Bleeding','content',
    'Apply firm direct pressure; do not remove soaked dressings—add more. Elevate limbs without suspected fracture. Apply a C‑A‑T® tourniquet high and tight when bleeding is life‑threatening and uncontrolled; tighten until bleeding stops; record application time; do not remove until at hospital.'),
    jsonb_build_object('heading','Managing Shock','content',
    'Lay flat, keep warm, elevate feet ~12" unless contraindicated, nothing by mouth, reassure and monitor.'),
    jsonb_build_object('heading','3.3 Crush Injury & Crush Syndrome','content',
    'Prolonged compression leads to rhabdomyolysis with dangerous potassium/myoglobin surge on release. <15 min entrapment: release immediately if safe. >15 min (or unknown): do NOT release; call 911 for IV fluids/meds before extrication.')
  )) WHERE id = l4;

  -- Lesson 5: Medical Part 2
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','3.4 Using an AED','content',
    'Use on an unresponsive person not breathing normally. 1) Call 911 and start CPR; 2) Turn on AED and follow prompts; 3) Expose/dry chest, shave if needed; 4) Apply pads (upper right chest, lower left side); 5) Plug in connector; 6) “Analyzing—do not touch”; 7) If advised, loudly say CLEAR, ensure no contact, press shock; 8) Resume CPR immediately for 2 minutes; repeat analysis cycles. Do not turn off AED or remove pads until EMS takes over.'),
    jsonb_build_object('heading','3.5 Responding to Burns','content',
    'Thermal: stop burning; cool with cool running water ≥20 minutes; remove jewelry/clothing not stuck; cover with sterile non‑stick dressing or cling film; prevent hypothermia; no ointments/grease. Chemical: PPE; brush off dry powders; flush copiously ≥20 minutes; remove contaminated clothing; consult SDS; seek medical care. Electrical: de‑energize first; be ready for CPR/AED; treat for shock; assess for fall/spinal injuries; cover entry/exit wounds; immediate medical evaluation.'),
    jsonb_build_object('heading','3.6 Musculoskeletal Injuries','content',
    'Assess for deformity, swelling, pain, inability to bear weight. Check pulse/capillary refill/sensation before and after splinting. Splint the joint above and below; splint in position found; pad bony areas; use rigid (wood/handles) or anatomical (buddy taping/leg‑to‑leg) splints; secure with belts/bandanas/tape.'),
    jsonb_build_object('heading','3.7 Environmental Emergencies','content',
    'Heat cramps/exhaustion/stroke: move to cool area, cool aggressively, hydrate if appropriate; heat stroke is a 911 emergency with rapid cooling. Hypothermia: gentle handling, warm core first (chest/neck/head/groin), remove wet clothes, warm beverages if alert; avoid direct heat and extremity‑first warming; weekly activation of plumbed eyewash/showers to ensure readiness.')
  )) WHERE id = l5;

  -- Lesson 6: Hazmat & Weather
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','Section 4: Spill Response','content',
    'Three C’s—Control (stop source if safe), Contain (booms/berms; protect drains/waterways), Clean Up (pads/pillows/granular from edges inward). Fuel spills: remove ignition sources; have ABC/CO2 extinguishers ready; SPCC containment applies to >1,320 gallons.'),
    jsonb_build_object('heading','SDS in Emergencies','content',
    'Know Section 2 (hazards), 4 (first aid), 5 (fire‑fighting), 6 (accidental release). Use required PPE and follow containment/cleanup directions. Report and document every spill.'),
    jsonb_build_object('heading','Section 5: Severe Weather','content',
    'Lightning: 30‑30 rule—seek shelter if thunder within 30 seconds of lightning; wait 30 minutes after last thunder. Safe: enclosed buildings/metal vehicles. Avoid open structures, isolated tall objects, water/metal. Flash floods: “Turn Around, Don’t Drown.” Move equipment to high ground on warnings. High winds reduce visibility and increase fall risk; suspend operations as needed. Tornado: know shelter; during warnings stop work and shelter immediately; do not stay in vehicles.')
  )) WHERE id = l6;

  -- Lesson 7: Human Element
  UPDATE lessons SET content_data = jsonb_build_object('sections', jsonb_build_array(
    jsonb_build_object('heading','Section 6: The Human Element','content',
    'Emergencies are performed by people under stress. Train to control panic. Box breathing (inhale 4, hold 4, exhale 4, hold 4) restores focus. Break paralysis by executing one immediate task at a time.'),
    jsonb_build_object('heading','Psychological First Aid (PFA)','content',
    'LOOK for safety/urgent needs/distress; LISTEN by approaching calmly, asking needs, and acknowledging feelings; LINK to basics (water, blanket, quiet), social support, and accurate information. Do not force debriefs or speculation.'),
    jsonb_build_object('heading','Crisis Communication & Conclusion','content',
    'Follow chain of command; avoid rumors; route media/family inquiries to the PIO. Professional commitment: PLAN (EAP, alarms, ICS), PREPARE (exams, precursors, equipment), ACT (disciplined protocols, confident first aid), SUPPORT (manage stress, aid colleagues). The goal: everyone goes home safe every shift.')
  )) WHERE id = l7;
END $$;

-- Verify
SELECT id, title, jsonb_array_length(content_data->'sections') as sections FROM lessons WHERE module_id = 'c024a928-306b-4e68-9d07-14d3bd759a0a' ORDER BY order_index;