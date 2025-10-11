-- Ensure lessons for Module 3 exist with correct enum type
DO $$
DECLARE
  v_module_id uuid := 'c024a928-306b-4e68-9d07-14d3bd759a0a';
  v_count int;
BEGIN
  SELECT count(*) INTO v_count FROM lessons WHERE module_id = v_module_id;
  IF v_count = 0 THEN
    -- Insert 7 lessons with type 'document'
    INSERT INTO lessons (module_id, title, description, type, order_index, duration_minutes, is_required, content_data)
    VALUES
    (v_module_id, 'Introduction: Why Emergency Procedures Matter', 'Understanding the foundation of emergency response and your site''s Emergency Action Plan', 'document', 1, 40, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','The Unforgiving Environment & The Professional''s Mindset','content','This training module is the most critical component of a miner''s safety education...'),
      jsonb_build_object('heading','The Foundation of Law: From Tragedy to Regulation','content','The federal safety regulations that govern the mining industry are not arbitrary rules...'),
      jsonb_build_object('heading','Your Role and Responsibilities under 30 CFR Part 46','content','The content herein is mandated by the Federal Mine Safety and Health Act of 1977...')
    ))),
    (v_module_id, 'Critical Incidents: Ground Failure & Water Emergencies', 'Responding to highwall collapses, stockpile failures, and water inundation incidents', 'document', 2, 45, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','Section 2.1: Ground Failure Emergencies','content','Ground failure—the uncontrolled collapse of highwalls, stockpiles, and trench walls...'),
      jsonb_build_object('heading','Case Study: Fatal Stockpile Collapse','content','Date: May 22, 2023 ... Emergency Protocol: Never dump material over the edge...'),
      jsonb_build_object('heading','Section 2.2: Water Inundation and Submersion','content','Drowning is a leading cause of fatalities... Self-egress steps...')
    ))),
    (v_module_id, 'Fire, Explosion & Equipment Emergencies', 'Responding to fires, blasting incidents, and powered haulage accidents', 'document', 3, 35, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','2.3 Fire Response and Extinguisher Use','content','P.A.S.S. method and fire classes...'),
      jsonb_build_object('heading','Vehicle Fire Protocol','content','Stop vehicle, shut down engine, activate suppression system...'),
      jsonb_build_object('heading','Blasting and Explosion Response','content','Fly-rock fatality case study, misfire protocol...'),
      jsonb_build_object('heading','2.4 Scene Safety and Energy Control Protocol','content','Stop, Assess, Stabilize, Control, Report...')
    ))),
    (v_module_id, 'Emergency Medical Response: Part 1', 'Scene assessment, bleeding control, shock management, and crush syndrome', 'document', 4, 45, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','3.1 Initial Scene Assessment','content','Stop, Look, Assess, Act...'),
      jsonb_build_object('heading','Activating EMS','content','Use L.I.P. protocol, call 911...'),
      jsonb_build_object('heading','3.2 Controlling Severe Bleeding','content','Direct pressure, elevation, tourniquet application...'),
      jsonb_build_object('heading','Managing Shock','content','Signs and treatment...'),
      jsonb_build_object('heading','3.3 Crush Injury & Crush Syndrome','content','Pathophysiology and critical protocols by entrapment time...')
    ))),
    (v_module_id, 'Emergency Medical Response: Part 2', 'AED use, burns, musculoskeletal injuries, environmental emergencies', 'document', 5, 40, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','3.4 Using an AED','content','Universal steps: call 911, turn on AED, apply pads, analyze, shock, resume CPR...'),
      jsonb_build_object('heading','3.5 Responding to Burns','content','Thermal, chemical, and electrical burn protocols...'),
      jsonb_build_object('heading','3.6 Musculoskeletal Injuries','content','Assessment, splinting principles, improvised splints...'),
      jsonb_build_object('heading','3.7 Environmental Emergencies','content','Heat illnesses, hypothermia, eyewash/shower use...')
    ))),
    (v_module_id, 'Hazmat Spills & Severe Weather Response', 'Handling hazardous material spills and severe weather emergencies', 'document', 6, 30, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','Section 4: Spill Response','content','Control, Contain, Clean Up...'),
      jsonb_build_object('heading','SDS in Emergencies','content','Critical sections: 2,4,5,6...'),
      jsonb_build_object('heading','Section 5: Severe Weather','content','Lightning 30-30 rule, flash floods, high winds, tornadoes...')
    ))),
    (v_module_id, 'The Human Element & Professional Commitment', 'Managing stress, PFA, crisis communication, and commitment to safety', 'document', 7, 30, true, jsonb_build_object('sections', jsonb_build_array(
      jsonb_build_object('heading','Section 6: Human Element','content','Tactical breathing and task focus...'),
      jsonb_build_object('heading','Psychological First Aid (PFA)','content','Look, Listen, Link...'),
      jsonb_build_object('heading','Crisis Communication','content','Be calm and clear, follow chain of command, direct inquiries to PIO...'),
      jsonb_build_object('heading','Conclusion: Professional Commitment','content','Plan, Prepare, Act, Support...')
    )));
  END IF;
END $$;

-- Verify insert
SELECT count(*) as lesson_count FROM lessons WHERE module_id = 'c024a928-306b-4e68-9d07-14d3bd759a0a';