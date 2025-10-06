-- Seed Module 1 lessons for New Miner Training
-- Module ID from modules query: 84ea6e55-bfdb-43d4-a761-8283da7a36ba

DELETE FROM public.lessons WHERE module_id = '84ea6e55-bfdb-43d4-a761-8283da7a36ba';

INSERT INTO public.lessons (
  module_id,
  type,
  title,
  description,
  content_data,
  order_index,
  duration_minutes,
  is_required
) VALUES
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'Overview: Work Environment & Line of Authority',
  'Introduction to the mine environment and the chain of command under Part 46.',
  jsonb_build_object('text', 'Welcome to Module 1. In this lesson you will learn how surface mine sites are organized, typical work areas, and who is responsible for what. Understanding the line of authority helps you know who to report to and how safety decisions are made.'),
  1,
  30,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'Work Areas, Site Layout, and Travel Routes',
  'Common surface areas, traffic patterns, and safe travel practices.',
  jsonb_build_object('text', 'Surface mines include pits, stockpiles, loading areas, maintenance shops, and offices. Pay attention to posted signs, berms, highwalls, and haul truck routes. Always maintain visibility and follow site-specific traffic rules.'),
  2,
  45,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'document',
  'Roles, Responsibilities, and Reporting',
  'Who does what: mine operator, competent person, foreman, and miners.',
  jsonb_build_object('text', 'Your foreman or competent person assigns tasks, conducts workplace exams, and addresses hazards. You must report hazards, injuries, and near-misses promptly. Know how to contact supervision and how to escalate urgent issues.'),
  3,
  45,
  true
),
(
  '84ea6e55-bfdb-43d4-a761-8283da7a36ba',
  'quiz',
  'Module 1 Knowledge Check',
  'Quick assessment to reinforce key concepts from Module 1.',
  jsonb_build_object('text', 'Answer a short set of questions to confirm your understanding of the work environment and line of authority.'),
  4,
  15,
  true
);
