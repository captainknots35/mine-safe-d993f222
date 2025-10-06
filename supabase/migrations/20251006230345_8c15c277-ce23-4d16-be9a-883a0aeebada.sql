-- Fix lesson order for Module 1
-- Set correct order_index for each lesson

-- Lesson 3: Immersive Journey Through Mining Operations
UPDATE lessons 
SET order_index = 3
WHERE id = 'b2c3d4e5-f6a7-8901-bcde-112233445566';

-- Lesson 4: Hazard Recognition, Avoidance, and Control
UPDATE lessons 
SET order_index = 4
WHERE id = '5b661df6-0187-4611-8831-e8101c27eff2';

-- Lesson 5: Emergency Preparedness and Response
UPDATE lessons 
SET order_index = 5
WHERE id = '2131fb79-d2c0-4e83-aabb-78eebfd4be30';

-- Lesson 6: Module 1 Competency Check (Assessment)
UPDATE lessons 
SET order_index = 6
WHERE id = '837699c1-afe6-41d7-84a5-d1fac0fb7539';