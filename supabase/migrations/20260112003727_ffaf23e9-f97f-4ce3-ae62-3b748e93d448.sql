-- Add Spanish translation columns to lessons table
ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS description_es TEXT,
ADD COLUMN IF NOT EXISTS content_data_es JSONB;

-- Add Spanish translation columns to modules table
ALTER TABLE public.modules
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS description_es TEXT;

-- Add Spanish translation columns to courses table  
ALTER TABLE public.courses
ADD COLUMN IF NOT EXISTS title_es TEXT,
ADD COLUMN IF NOT EXISTS description_es TEXT;

-- Add language preference to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en';

COMMENT ON COLUMN public.lessons.title_es IS 'Spanish translation of lesson title';
COMMENT ON COLUMN public.lessons.description_es IS 'Spanish translation of lesson description';
COMMENT ON COLUMN public.lessons.content_data_es IS 'Spanish translation of lesson content (for text/quiz content)';
COMMENT ON COLUMN public.modules.title_es IS 'Spanish translation of module title';
COMMENT ON COLUMN public.modules.description_es IS 'Spanish translation of module description';
COMMENT ON COLUMN public.courses.title_es IS 'Spanish translation of course title';
COMMENT ON COLUMN public.courses.description_es IS 'Spanish translation of course description';
COMMENT ON COLUMN public.profiles.preferred_language IS 'User preferred language (en/es)';