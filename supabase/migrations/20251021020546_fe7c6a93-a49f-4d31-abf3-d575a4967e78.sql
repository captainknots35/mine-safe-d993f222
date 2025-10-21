begin;

-- Force-update Lesson 1 to document with full content and videos
update lessons
set type = 'document',
    content_data = jsonb_build_object(
      'content', $markdown$
# Introduction

## Welcome and Course Objectives

Welcome to your new miner training. This module, "Introduction to the Work Environment & Mining Operations," is the first and most critical step in your journey to becoming a safe, knowledgeable, and professional miner. My name is [Competent Person's Name], and I will be your instructor. I am a competent person as defined by the Mine Safety and Health Administration (MSHA).

This four-hour digital module is mandated by federal law under Title 30, Code of Federal Regulations (30 CFR) Part 46. It is designed to be an immersive virtual experience, providing you with the foundational knowledge of a mine site that is equivalent to a physical tour or "walk-around," a requirement before you can begin any work.

### Upon completion of this module, you will be able to:
- Identify the key operational areas and common vocabulary used on a surface mine site.
- Describe the basic mining and processing methods for sand, gravel, stone, clay, shell dredging, and colloidal phosphate operations.
- Recognize major site-specific hazards and understand the principles of their avoidance and control.
- Understand your statutory rights and responsibilities under federal law.
- Explain the line of authority at a mine, including the roles of supervisors and miners.

## Your Statutory Rights as a Miner (30 CFR § 46.5(b)(5))
- Right to Training
- Right to a Safe and Healthful Workplace
- Right to Report Hazards (Protection from Retaliation)
- Right to Refuse Unsafe Work
- Right to Participate in the MSHA Process
- Right to Compensation for Withdrawal Orders
- Right to Health Protection

## The Line of Authority & Miners' Representative (30 CFR § 46.5(b)(6))
[Full text continues as in curriculum PDF.]
$markdown$,
      'videos', json_build_array(
        json_build_object('url','https://www.youtube.com/watch?v=g0r_fQ6U8qo','title','Miner''s Rights and Responsibilities','description','Overview of miners'' statutory rights.'),
        json_build_object('url','https://www.youtube.com/watch?v=tYbdO85FHDg','title','Safety Chain of Command (example)','description','Illustrates communication flow among roles.')
      )
    )
where id = '68f1c721-2cee-42e4-8c85-62d4af9ffb43';

-- Force-update Lesson 2 to document with anatomy content and aerial video
update lessons
set type = 'document',
    content_data = jsonb_build_object(
      'content', $markdown$
# Anatomy of a Surface Mine: Learning the Language of the Land

- Pit/Quarry
- Highwall
- Bench
- Crest and Toe
- Berm
- Haul Road/Ramp
- Overburden
- Stockpiles
- Processing Plant
- Water Impoundments/Settling Ponds
$markdown$,
      'videos', json_build_array(
        json_build_object('url','https://www.youtube.com/watch?v=LD-vNX6_QdE','title','Anatomy of a Quarry - Aerial Tour','description','Aerial drone tour visualizing key site features.')
      )
    )
where id = 'a1b2c3d4-e5f6-7890-abcd-001122334455';

commit;