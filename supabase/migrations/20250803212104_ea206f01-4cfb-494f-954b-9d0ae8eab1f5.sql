-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'instructor', 'miner');

-- Create course type enum
CREATE TYPE public.course_type AS ENUM ('Part 46', 'Part 48');

-- Create training status enum
CREATE TYPE public.training_status AS ENUM ('not_started', 'in_progress', 'completed');

-- Create lesson type enum
CREATE TYPE public.lesson_type AS ENUM ('video', 'document', 'quiz', 'interactive');

-- Create user profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    miin TEXT UNIQUE, -- Miner Identification Number
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    job_title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- Create courses table
CREATE TABLE public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    type course_type NOT NULL,
    duration_hours INTEGER NOT NULL,
    regulation_reference TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create modules table
CREATE TABLE public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER NOT NULL,
    regulation_reference TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    type lesson_type NOT NULL,
    content_url TEXT,
    content_data JSONB,
    order_index INTEGER NOT NULL,
    duration_minutes INTEGER,
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    status training_status DEFAULT 'not_started',
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    instructor_id UUID REFERENCES auth.users(id),
    UNIQUE(user_id, course_id)
);

-- Create progress tracking table
CREATE TABLE public.progress_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE NOT NULL,
    enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    time_spent_minutes INTEGER DEFAULT 0,
    quiz_score INTEGER,
    attempts INTEGER DEFAULT 0,
    is_completed BOOLEAN DEFAULT false,
    UNIQUE(user_id, lesson_id, enrollment_id)
);

-- Create live sessions table
CREATE TABLE public.live_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    actual_start TIMESTAMP WITH TIME ZONE,
    actual_end TIMESTAMP WITH TIME ZONE,
    session_url TEXT,
    recording_url TEXT,
    max_participants INTEGER DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create live session attendance table
CREATE TABLE public.live_session_attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.live_sessions(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE,
    left_at TIMESTAMP WITH TIME ZONE,
    duration_attended_minutes INTEGER DEFAULT 0,
    id_verified BOOLEAN DEFAULT false,
    id_verified_at TIMESTAMP WITH TIME ZONE,
    proctoring_flags JSONB DEFAULT '[]'::jsonb,
    attendance_verified BOOLEAN DEFAULT false,
    UNIQUE(session_id, user_id)
);

-- Create training certificates table
CREATE TABLE public.training_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    enrollment_id UUID REFERENCES public.enrollments(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
    instructor_id UUID REFERENCES auth.users(id) NOT NULL,
    certificate_number TEXT UNIQUE NOT NULL,
    issued_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    certificate_url TEXT,
    msha_form_data JSONB,
    is_valid BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_session_attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_certificates ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS app_role
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
    SELECT role FROM public.user_roles WHERE user_roles.user_id = $1 LIMIT 1;
$$;

-- Create security definer function to check if user has role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    );
$$;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User roles policies
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can view all roles" ON public.user_roles FOR SELECT USING (true);

-- Courses policies
CREATE POLICY "Everyone can view active courses" ON public.courses FOR SELECT USING (is_active = true);
CREATE POLICY "Admins and instructors can manage courses" ON public.courses FOR ALL USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
);

-- Modules policies
CREATE POLICY "Everyone can view modules" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Admins and instructors can manage modules" ON public.modules FOR ALL USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
);

-- Lessons policies
CREATE POLICY "Everyone can view lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Admins and instructors can manage lessons" ON public.lessons FOR ALL USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
);

-- Enrollments policies
CREATE POLICY "Users can view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Instructors can view assigned enrollments" ON public.enrollments FOR SELECT USING (
    public.has_role(auth.uid(), 'instructor') AND auth.uid() = instructor_id
);
CREATE POLICY "Admins can view all enrollments" ON public.enrollments FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Instructors and admins can update enrollments" ON public.enrollments FOR UPDATE USING (
    public.has_role(auth.uid(), 'admin') OR 
    (public.has_role(auth.uid(), 'instructor') AND auth.uid() = instructor_id)
);

-- Progress tracking policies
CREATE POLICY "Users can view own progress" ON public.progress_tracking FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own progress" ON public.progress_tracking FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.progress_tracking FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Instructors can view student progress" ON public.progress_tracking FOR SELECT USING (
    public.has_role(auth.uid(), 'instructor') OR public.has_role(auth.uid(), 'admin')
);

-- Live sessions policies
CREATE POLICY "Everyone can view live sessions" ON public.live_sessions FOR SELECT USING (true);
CREATE POLICY "Instructors can create sessions" ON public.live_sessions FOR INSERT WITH CHECK (
    public.has_role(auth.uid(), 'instructor') AND auth.uid() = instructor_id
);
CREATE POLICY "Instructors can manage own sessions" ON public.live_sessions FOR ALL USING (
    public.has_role(auth.uid(), 'admin') OR 
    (public.has_role(auth.uid(), 'instructor') AND auth.uid() = instructor_id)
);

-- Live session attendance policies
CREATE POLICY "Users can view own attendance" ON public.live_session_attendance FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own attendance" ON public.live_session_attendance FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Instructors can view session attendance" ON public.live_session_attendance FOR SELECT USING (
    public.has_role(auth.uid(), 'instructor') OR public.has_role(auth.uid(), 'admin')
);
CREATE POLICY "Instructors can update attendance" ON public.live_session_attendance FOR UPDATE USING (
    public.has_role(auth.uid(), 'instructor') OR public.has_role(auth.uid(), 'admin')
);

-- Training certificates policies
CREATE POLICY "Users can view own certificates" ON public.training_certificates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Instructors can create certificates" ON public.training_certificates FOR INSERT WITH CHECK (
    public.has_role(auth.uid(), 'instructor') AND auth.uid() = instructor_id
);
CREATE POLICY "Admins and instructors can view certificates" ON public.training_certificates FOR SELECT USING (
    public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'instructor')
);

-- Create function to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, last_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NEW.email
    );
    
    -- Assign default miner role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'miner');
    
    RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON public.modules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.courses (title, description, type, duration_hours, regulation_reference) VALUES
('MSHA Part 46 New Miner Training', 'Comprehensive safety training for new miners working at surface mines and facilities', 'Part 46', 24, '30 CFR 46.5'),
('MSHA Part 46 Annual Refresher Training', 'Annual refresher training for experienced miners', 'Part 46', 8, '30 CFR 46.8'),
('MSHA Part 48 New Miner Training (Underground)', 'Complete safety training for new underground miners', 'Part 48', 40, '30 CFR 48.25'),
('MSHA Part 48 Annual Refresher Training', 'Annual refresher training for underground miners', 'Part 48', 8, '30 CFR 48.28');

-- Get course IDs for modules
DO $$
DECLARE
    part46_new_id UUID;
    part46_refresher_id UUID;
    part48_new_id UUID;
    part48_refresher_id UUID;
BEGIN
    SELECT id INTO part46_new_id FROM public.courses WHERE title = 'MSHA Part 46 New Miner Training';
    SELECT id INTO part46_refresher_id FROM public.courses WHERE title = 'MSHA Part 46 Annual Refresher Training';
    SELECT id INTO part48_new_id FROM public.courses WHERE title = 'MSHA Part 48 New Miner Training (Underground)';
    SELECT id INTO part48_refresher_id FROM public.courses WHERE title = 'MSHA Part 48 Annual Refresher Training';

    -- Part 46 New Miner modules
    INSERT INTO public.modules (course_id, title, description, order_index, duration_minutes, regulation_reference) VALUES
    (part46_new_id, 'Introduction to Work Environment & Line of Authority', 'Understanding the mine environment and chain of command', 1, 240, '30 CFR 46.5(b)(1), (6), (7)'),
    (part46_new_id, 'Hazard Recognition', 'Identifying electrical, ground control, and mobile equipment hazards', 2, 360, '30 CFR 46.5(b)(2)'),
    (part46_new_id, 'Emergency Procedures', 'Evacuation procedures, fire response, and first aid', 3, 240, '30 CFR 46.5(b)(3), 46.5(c)(2)'),
    (part46_new_id, 'Health & Chemical Safety', 'HazCom, PPE, and task safety procedures', 4, 360, '30 CFR 46.5(b)(4), (5)'),
    (part46_new_id, 'Self-Rescue Devices & Final Review', 'Proper use of self-rescue devices and course review', 5, 240, '30 CFR 46.5(c)(1)'),

    -- Part 46 Refresher modules
    (part46_refresher_id, 'Changes at the Mine & Accident Prevention', 'Recent changes and accident prevention strategies', 1, 180, '30 CFR 46.8(b)'),
    (part46_refresher_id, 'Emergency Procedures & First Aid Review', 'Review of emergency procedures and first aid', 2, 90, '30 CFR 46.8(c)'),
    (part46_refresher_id, 'Health & Safety Standards Review', 'Review of HazCom, electrical, and other safety standards', 3, 150, '30 CFR 46.8(c)'),
    (part46_refresher_id, 'Miners Rights & Responsibilities Review', 'Review of miner rights and responsibilities', 4, 60, '30 CFR 46.8(c)'),

    -- Part 48 New Miner modules
    (part48_new_id, 'Statutory Rights & Self-Rescue Devices', 'Miner rights and self-rescue equipment', 1, 360, '30 CFR 48.25(b)(1), (2)'),
    (part48_new_id, 'Transportation, Communication & Work Environment', 'Underground transportation and communication systems', 2, 420, '30 CFR 48.25(b)(3), (4)'),
    (part48_new_id, 'Escape, Evacuation, Firefighting & Barricading', 'Emergency response procedures underground', 3, 360, '30 CFR 48.25(b)(5)'),
    (part48_new_id, 'Ground Control & Ventilation', 'Underground ground control and ventilation systems', 4, 360, '30 CFR 48.25(b)(6)'),
    (part48_new_id, 'Health, Hazard Recognition & Electrical Hazards', 'Health hazards and electrical safety underground', 5, 540, '30 CFR 48.25(b)(7), (8), (9)'),
    (part48_new_id, 'First Aid, Mine Gases & Explosives', 'First aid, gas detection, and explosive safety', 6, 360, '30 CFR 48.25(b)'),

    -- Part 48 Refresher modules
    (part48_refresher_id, 'Mandatory Standards & Transportation/Communication', 'Standards review and transportation safety', 1, 150, '30 CFR 48.28(b)(1), (2)'),
    (part48_refresher_id, 'Emergency Procedures, First Aid & Ground Control', 'Emergency response and ground control review', 2, 180, '30 CFR 48.28(b)(3), (4), (5)'),
    (part48_refresher_id, 'Electrical Hazards & Accident Prevention', 'Electrical safety and accident prevention', 3, 120, '30 CFR 48.28(b)(6), (7)'),
    (part48_refresher_id, 'Self-Rescue & Health Review', 'Self-rescue equipment and health hazard review', 4, 30, '30 CFR 48.28(b)(8), (11)');
END $$;