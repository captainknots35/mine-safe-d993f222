-- Create Module 5 Lessons: Self-Rescue Devices & Final Review

-- Lesson 1: Miners' Rights & Procedures (Parts 1 & 2)
INSERT INTO lessons (
  id,
  module_id,
  title,
  description,
  type,
  order_index,
  duration_minutes,
  is_required,
  content_data
) VALUES (
  'a1b2c3d4-e5f6-1111-2222-333344445555',
  '45b22bbb-77c0-439e-8d9b-e2ed1f824329',
  'Miners'' Rights & Procedures',
  'The Foundation of Your Rights: The Mine Act of 1977 and Putting Your Rights into Action',
  'document',
  1,
  105,
  true,
  jsonb_build_object(
    'content', '# Part 1: The Foundation of Your Rights: The Mine Act of 1977

(Estimated Time: 45 Minutes)

## Section 1.1: Introduction to the Miner''s Bill of Rights

This module is the capstone of your foundational safety and health training. While previous modules have focused on the physical and environmental hazards of the mine site, this section addresses the legal framework that empowers you to control your own destiny in the workplace. The content herein is not merely a list of rules but a charter of your legally protected rights as a professional miner.

The cornerstone of all safety and health regulations in the mining industry is the Federal Mine Safety and Health Act of 1977, commonly known as "the Mine Act". This legislation was not created in a vacuum; it was forged from the tragic legacy of mining disasters where the lives of miners were lost due to unsafe conditions. Congress passed this law with a clear and unambiguous mission: to prevent death, disease, and injury in the nation''s mines by establishing and enforcing mandatory safety and health standards. To achieve this, the Act created the Mine Safety and Health Administration (MSHA), the federal agency with the authority and responsibility to ensure that every miner returns home safely at the end of every shift.

It is critical to understand the Mine Act not as a rulebook for your employer, but as a Bill of Rights for you, the individual miner. The Act was a deliberate legislative effort to correct a historical power imbalance where the pressures of production could often overshadow the fundamental need for worker safety. By codifying specific, inalienable rights—such as the right to training, the right to report hazards without fear, and the right to refuse unsafe work—the Act fundamentally shifted the workplace dynamic. It legally empowers you with a voice and agency in your own safety that cannot be lawfully overridden by a supervisor''s production demands. These rights are not suggestions or company perks; they are legal tools designed to ensure that safety has an equal, if not greater, seat at the table with production. Your active engagement with and understanding of these rights are essential components of your professional responsibilities.

## Section 1.2: Your Core Statutory Rights—A Detailed Examination

The Mine Act grants you a powerful and specific set of statutory rights designed to protect you and enable you to be an active participant in creating and maintaining a safe mine site. Understanding these rights is a mandatory part of your training and is essential for your protection.

- **Right to Training**: You have the absolute right to receive all required health and safety training, including New Miner, Newly Hired Experienced Miner, New Task, and Annual Refresher training. This training must be provided during your normal working hours, and you must be paid for this time at your regular rate of pay. If you have not received the required training for a specific task or for the mine site in general, you have the legally protected right to withdraw yourself from the mine until that training is provided, and you cannot be fired or discriminated against for doing so.

- **Right to a Safe and Healthful Workplace**: Your employer, the mine operator, has the primary legal responsibility to provide a work environment that is free from recognized hazards that are causing or are likely to cause death or serious physical harm. This is the foundational promise of the Mine Act.

- **Right to Information**: You have the right to be informed about the hazards you may be exposed to. This includes the right to access the mine''s written Hazard Communication (HazCom) program, the Safety Data Sheets (SDS) for all hazardous chemicals on site, and the mine''s approved Part 46 training plan. This information empowers you to understand the risks and take appropriate protective measures.

- **Right to Participate in the MSHA Process**: Your rights extend to direct participation in the MSHA enforcement process. You have the right to designate a representative to accompany an MSHA inspector during an inspection of the mine, a practice known as "walk-around rights," without any loss of pay. You also have the right to speak privately and confidentially with an MSHA inspector during an inspection and to participate in any legal proceedings that may result from that inspection.

- **Right to Compensation for Withdrawal Orders**: If an MSHA inspector identifies a condition or practice that is so hazardous it requires the issuance of an order to withdraw miners from an area of the mine, and you are idled as a result, you are legally entitled to be paid for a specified period of time until you are able to return to work.

- **Right to Health Protection**: You have the right to protection from harmful physical agents and toxic substances. This includes the right to medical evaluations, at the operator''s expense, if you are exposed to substances like respirable crystalline silica at levels that could harm your health. In some cases, this may also include the right to be transferred to a less hazardous job without a loss of pay.

## Section 1.3: The System of Safety—Roles, Responsibilities, and Accountability

The Mine Act establishes an interdependent safety system built on a clear structure of roles, responsibilities, and legal accountability. This system is designed as a series of checks and balances where your rights are directly linked to the legal duties of others.

- **The Miner''s Responsibilities**: Your rights are balanced by a set of crucial responsibilities. Your primary duty is to comply with all federal and state laws, regulations, and your company''s specific safety and health policies. You are responsible for actively participating in your own safety, which includes reporting accidents and unsafe conditions, properly using all required personal protective equipment (PPE), and providing truthful statements during any accident investigation or MSHA inspection. There are also actions you must never take. It is illegal to provide advance notice of an MSHA inspection or to knowingly make a false statement or falsify any document required by MSHA, such as a workplace examination record or a training certificate.

- **The Supervisor''s Role and Liability**: Your immediate supervisor is your first point of contact for all work-related matters, especially those concerning safety. Supervisors are legally defined as "Agents of the Company". This is a critical legal distinction. It means their actions—or their failure to act—can be legally attributed to the mine operator. Furthermore, a supervisor who "knowingly" or "willfully" allows a violation of a mandatory safety standard to occur can be held personally accountable and may face significant personal fines or even criminal prosecution, including jail time.

- **The Miners'' Representative**: A Miners'' Representative is any person or organization designated by two or more miners to represent their interests in health and safety matters. This representative plays a vital role as an advocate for miners, has the right to accompany MSHA inspectors during walk-around inspections, and serves as an additional, formal channel for raising safety concerns and reviewing any citations issued.

This structure creates a clear and legally enforceable chain of accountability. Your legally protected right to report a hazard directly triggers your supervisor''s legal duty to investigate and correct it. The supervisor''s status as a company "agent" with the potential for personal liability provides a powerful motivation to take your report seriously and not dismiss it due to production pressures. If that initial link in the chain breaks and the supervisor fails to act, the Miners'' Representative provides an alternative, more formal path for communication and resolution. If the entire internal system fails, your right to report the hazard directly to MSHA serves as the ultimate backstop. This is not simply a communication flowchart; it is a dynamic legal mechanism where each party''s rights and responsibilities are explicitly linked, ensuring that a reported hazard cannot be ignored without significant legal consequence.

### The Three Pillars of Mine Site Safety

| Role | The Miner | The Supervisor | The Miners'' Representative |
|------|-----------|----------------|----------------------------|
| **Primary Role** | To perform work safely and act as the first line of defense in hazard recognition. | To oversee operations safely, enforce safety policies, and act as the first point of contact for hazard reporting. | To act as a designated advocate for miners'' health and safety interests. |
| **Key Rights** | Right to training, to a safe workplace, to report hazards, to refuse unsafe work, to participate in inspections. | Possesses all the same rights as a miner. | Right to accompany MSHA inspectors ("walk-around rights"), to review citations, and to receive a copy of the training plan. |
| **Key Responsibilities** | Comply with all rules, report hazards immediately, use PPE correctly, never falsify records. | Conduct workplace examinations, promptly correct reported hazards, ensure miners are safe and trained. | Represent the safety interests of miners to both the operator and MSHA. |
| **Accountability** | Responsible for personal safety and the safety of coworkers. | Legally responsible for the safety of their crew. Can be held personally liable for "knowing" or "willful" violations. | Accountable to the miners who designated them. |

# Part 2: Putting Your Rights into Action: Procedures for Protection

(Estimated Time: 60 Minutes)

Understanding your rights is the first step; knowing how to exercise them effectively is what translates legal theory into life-saving action. This part of the module provides clear, step-by-step instructions on how you can and should use your most critical safety rights in a professional and procedurally correct manner.

## Section 2.1: The Right to Report Hazards—Your Most Proactive Tool

Recognizing a hazard is only the first step. The critical final action is reporting it so it can be corrected. This is a mandatory topic of your training and the cornerstone of a proactive safety culture.

### Internal Reporting Procedure:

Every mine is required to have a specific procedure for reporting hazards. The first person you must always report a hazard to is your immediate supervisor. This provides the operator with the first opportunity to correct the condition. Your report should be clear, specific, and professional. State the location of the hazard, describe the condition, and explain why you believe it is unsafe.

### Reporting Directly to MSHA:

If a hazard is not corrected in a timely manner, or if you are not comfortable reporting it internally, you have the absolute right to make a confidential "hazardous condition complaint" directly to MSHA. You can do this anonymously if you choose.

- **MSHA 24/7 Hotline**: You can call 1-800-746-1553 at any time to report a hazard.
- **MSHA Online Complaint System**: You can file a complaint online through MSHA''s official website.

When you contact MSHA, be prepared to provide the name and location of the mine and a clear description of the hazardous condition. MSHA is required by law to investigate these complaints. It is important to distinguish between an anonymous hazardous condition complaint and a formal "Section 103(g) Request for Inspection" filed by a miner or a Miners'' Representative, which triggers additional rights and follow-up procedures. Regardless of the method, reporting a hazard is not "causing trouble"; it is your legal right and your professional responsibility.

## Section 2.2: The Right to Refuse Unsafe Work—A Step-by-Step Protocol

One of the most powerful but often misunderstood rights you possess is the right to refuse to perform work under conditions you believe are unsafe or unhealthy. This right is protected under the Mine Act, but it must be exercised correctly.

The legal standard for a work refusal is a "good faith, reasonable belief" that a hazard exists. This is a critical point. You do not need to be a safety expert or cite a specific MSHA regulation. You are not required to be 100% certain that a violation of the law exists. You only need to have a genuine (good faith) belief that the task or condition poses a real danger, and that a reasonable person would agree with your assessment.

Because a work refusal is a significant event, it is essential to follow a clear, professional protocol. This ensures your actions are protected by law and provides the operator with a clear opportunity to resolve the safety issue.

### The Work Refusal Protocol

**Step 1: Identify the Hazard**
Clearly articulate in your own mind what the specific hazard or unsafe condition is.

**Step 2: Cease Work in a Safe Manner**
Stop the task in a controlled and safe manner. Do not create a new hazard by abruptly shutting down equipment or leaving it in an unsafe state.

**Step 3: Immediate Notification of Supervisor**
Immediately notify your immediate supervisor of your refusal to perform the work and explain the specific hazard you have identified. This is a mandatory step. Your supervisor must be given the first opportunity to investigate and resolve the issue.

**Step 4: Remain in a Safe Place**
Move to a safe location away from the hazard and remain there. Do not leave the mine site unless instructed to do so by your supervisor or unless you are in immediate danger.

**Step 5: Await Investigation and Resolution**
Your supervisor is now legally obligated to investigate your concern. They may choose to correct the hazard, or they may determine that the condition is safe and provide you with an explanation.

**Step 6: Resolution or Escalation**
If your supervisor corrects the hazard, work can resume safely. If your supervisor determines the condition is safe but you still have a good faith belief it is unsafe, you have the right to continue to refuse the work and to request that MSHA be contacted to make a determination. You cannot be disciplined for exercising this right in good faith.

## Section 2.3: Case Study—Fatalgram Analysis: The Power of a Work Refusal

To understand the life-or-death importance of this right, consider the MSHA final investigation report for a fatality that occurred on March 28, 2025, at a surface sand and gravel mine.

### The Incident:

A 51-year-old front-end loader operator with 28 years of experience was engulfed by sand and killed when a 55 to 60-foot highwall collapsed onto his machine. The MSHA investigation determined that the highwall was severely undercut by the loader digging into the base of the face.

### The Critical Finding:

MSHA''s report states that this dangerous practice of undercutting was considered a "normal mining method at the mine". This is a classic example of a phenomenon known as the "normalization of deviance," where an unsafe practice or shortcut is repeated so many times without a negative consequence that it becomes the accepted, "normal" way of doing work. Over time, the perception of risk erodes, even though the hazard remains just as deadly.

### The Moment for a Work Refusal:

The operator in this incident was an experienced miner. He likely knew, or at least suspected, that undercutting a highwall was inherently dangerous. The warning signs of instability—the steep, unsupported face of sand directly above his cab—were present. This was the moment a work refusal could have been initiated. By following the protocol—stopping work, notifying his supervisor that the task of undercutting the highwall was unsafe, and refusing to continue—he would have triggered a mandatory re-evaluation of that "normal" but deadly procedure.

A work refusal acts as a powerful "circuit breaker" for the normalization of deviance. It forces an immediate halt to a routine task and compels management to re-examine it through the specific lens of safety, rather than through the lens of habit and production. In this real-world case, a single miner exercising his right to refuse unsafe work would not only have saved his own life but would have also challenged a systemic and fatal flaw in the mine''s safety culture. This demonstrates that your individual actions, backed by your legal rights, are one of the most powerful tools for preventing tragedy.'
  )
);

-- Lesson 2: Protection from Retaliation (Part 3)
INSERT INTO lessons (
  id,
  module_id,
  title,
  description,
  type,
  order_index,
  duration_minutes,
  is_required,
  content_data
) VALUES (
  'b2c3d4e5-f6a7-2222-3333-444455556666',
  '45b22bbb-77c0-439e-8d9b-e2ed1f824329',
  'Protection from Retaliation',
  'Understanding Section 105(c) of the Mine Act',
  'document',
  2,
  60,
  true,
  jsonb_build_object(
    'content', '# Part 3: Protection from Retaliation: Understanding Section 105(c)

(Estimated Time: 60 Minutes)

The rights to report hazards and refuse unsafe work would be meaningless if a mine operator could simply fire a miner for exercising them. To prevent this, the Mine Act contains a powerful legal shield: Section 105(c). This section makes it illegal for any person to discriminate or retaliate against a miner for engaging in safety-related activities protected by the Act. Understanding this protection is what gives you the confidence to stand up for safety.

## Section 3.1: Defining Discrimination and Retaliation

Section 105(c) of the Mine Act prohibits any person from discharging or in any manner discriminating against a miner for exercising their statutory rights. This protection is broad and covers a wide range of actions.

### Adverse Action:

Illegal discrimination, often called "adverse action," includes both obvious and subtle forms of retaliation.

- **Overt Actions**: These are clear, tangible actions like being fired, laid off, demoted, or having your pay cut.
- **Subtle Actions**: Retaliation can also take less obvious forms, such as being transferred to a less desirable job or shift, being consistently assigned the hardest or dirtiest tasks, being denied overtime opportunities, or being subjected to harassment by supervisors or coworkers. Any action that negatively affects your employment status can be considered an adverse action.

### Protected Activity:

For an adverse action to be illegal under Section 105(c), it must be linked to your participation in a "protected activity." These are the specific safety and health rights granted to you by the Mine Act. It is critical to know with certainty which of your actions are protected.

### Protected Activities Under the Mine Act

- Filing or making a complaint about a safety or health hazard to MSHA, a state agency, your supervisor, or your Miners'' Representative.
- Refusing to work in conditions you have a good faith, reasonable belief are unsafe or unhealthy.
- Reporting hazardous conditions found during a workplace examination.
- Participating in an MSHA inspection, including talking with the inspector.
- Withdrawing from the mine for not having the required health and safety training.
- Testifying, assisting, or participating in any proceeding under the Mine Act, such as a hearing or investigation.
- Seeking a medical evaluation due to exposure to toxic substances.
- Exercising any statutory right afforded by the Mine Act.

## Section 3.2: The Section 105(c) Complaint Process—A Miner''s Guide

If you believe you have been discriminated against for engaging in a protected activity, you can file a Section 105(c) discrimination complaint with MSHA. The process is designed to be accessible to miners, but you must follow specific procedures and timelines.

### The 60-Day Time Limit:

This is the most critical deadline. You must file your complaint with MSHA within 60 days of the date the discriminatory action occurred. If you miss this deadline, you may lose your right to file the complaint.

### Filing the Complaint:

To initiate an investigation, you must file a complaint with MSHA. This can be done by contacting any MSHA office or by using the official MSHA Discrimination Complaint Packet, which includes MSHA Form 2000-124. The complaint must be signed and should include:

- Your name and contact information.
- The name and location of the mine operator.
- The names of the individuals responsible for the discriminatory action.
- A brief but clear summary of the events:
  1. What protected activity you engaged in (e.g., "I reported an unsafe haul road to my foreman").
  2. The date the protected activity occurred.
  3. What adverse action was taken against you (e.g., "I was fired the next day").
  4. The date the adverse action occurred.

### The MSHA Investigation:

Once your complaint is filed, MSHA will launch a special investigation, which proceeds in two distinct phases.

## Section 3.3: Temporary Reinstatement and Other Remedies

The structure of the 105(c) investigation process is intentionally designed to protect the miner from the immediate financial harm of job loss, which could otherwise have a chilling effect on safety reporting. Congress recognized that a miner who fears being unable to pay their bills is less likely to raise a safety concern. Therefore, the law creates a rapid path back to work while the full merits of the case are being investigated. This legal structure is a deliberate policy choice to prioritize the free flow of critical safety information over an operator''s immediate managerial discretion.

### Phase 1: Temporary Reinstatement

MSHA''s first priority is to determine if your complaint was "not frivolously brought". This is an extraordinarily low legal bar to meet. It does not mean you have to prove your case. It simply means there is a plausible connection between your protected activity and the adverse action. If this standard is met, MSHA''s attorneys will immediately petition the Federal Mine Safety and Health Review Commission (FMSHRC)—an independent judicial body—for an order of temporary reinstatement. If the judge agrees, the operator will be ordered to immediately put you back to work at your former pay and position while the full investigation continues. This powerful tool prevents an operator from using termination as a weapon to silence safety complaints.

### Phase 2: The "Merits" Investigation

After the issue of temporary reinstatement is settled, MSHA conducts a full investigation into the merits of the complaint. During this phase, the operator has the right to present a full defense. The most common defense is an "affirmative defense," where the operator argues that they would have taken the same adverse action against you for a legitimate, unprotected reason, even if you hadn''t engaged in the protected activity. For example, they might present evidence that you were disciplined for absenteeism or poor work performance that was unrelated to your safety complaint.

### Remedies for Discrimination:

If, at the end of the process, MSHA or an FMSHRC judge determines that discrimination did occur, the law requires that you be made whole. The remedies are comprehensive and intended to restore you to the position you would have been in if the discrimination had never happened. Potential remedies include:

- Permanent reinstatement to your job.
- Back pay with interest for the time you were out of work.
- Restoration of seniority and any other lost benefits.
- A broad order for the operator to cease and desist from discriminatory actions.
- Critically, the operator can be ordered to pay all of your costs and expenses incurred in pursuing the case, including any attorney''s fees.

### Key Takeaway:

Section 105(c) is not just a piece of paper; it is a legally enforceable shield that gives you the freedom to speak up for safety without fear of losing your job. Understanding this protection is essential to being an effective advocate for your own safety and the safety of your coworkers. The existence of this legal protection is what allows the entire system of miner rights to function in practice, not just in theory.'
  )
);

-- Update module 5 duration to reflect actual lesson times (105 + 60 + 60 + 15 = 240 minutes = 4 hours)
UPDATE modules
SET duration_minutes = 240,
    updated_at = now()
WHERE id = '45b22bbb-77c0-439e-8d9b-e2ed1f824329';