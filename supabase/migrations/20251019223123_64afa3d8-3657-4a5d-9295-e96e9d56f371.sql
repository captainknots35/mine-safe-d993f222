-- Remove "Final Knowledge Check" section from Module 4 Lesson 4 content
UPDATE lessons
SET content_data = jsonb_set(
  content_data,
  '{content}',
  to_jsonb(regexp_replace(
    content_data->>'content',
    '### Final Knowledge Check\s+Test your practical application of the concepts covered in this module by answering the following questions\. The correct answers and explanations are provided below for you to check your understanding\.\s+- \*\*Scenario 1 \(Chemical Hazard Communication\)\*\*:.*?- \*\*Scenario 3 Answer\*\*:.*?cannot be delayed\.\s+',
    '',
    'gs'
  ))
)
WHERE module_id = 'e8a3c5b2-7d9e-4f1a-8b2c-3e4f5a6b7c8d'
  AND order_index = 4
  AND title = 'Health and Chemical Safety';