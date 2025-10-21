begin;
-- Update Lesson 3 videos array only
update lessons
set content_data = jsonb_set(
  coalesce(content_data, '{}'::jsonb),
  '{videos}',
  jsonb_build_array(
    jsonb_build_object('url','https://www.youtube.com/watch?v=pFXkja3W-KE','title','Super Sand & Gravel Plant','description','Large-scale sand & gravel operation.'),
    jsonb_build_object('url','https://www.youtube.com/watch?v=sWgaLikMPfc','title','How a Quarry Works','description','Drilling and blasting process.'),
    jsonb_build_object('url','https://www.youtube.com/watch?v=_sfCTODhdlk','title','Clay Mining','description','From quarry to construction site.'),
    jsonb_build_object('url','https://www.youtube.com/watch?v=MhysyOJHY8A','title','Dredging: How it works','description','Trailing suction hopper dredgers explained.'),
    jsonb_build_object('url','https://www.youtube.com/watch?v=PSFQJiNiCXg','title','Phosphate Mining','description','Overview of phosphate mining and processing.')
  )
)
where id = 'b2c3d4e5-f6a7-8901-bcde-112233445566';
commit;