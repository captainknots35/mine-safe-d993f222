import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Course {
  id: string;
  title: string;
  description: string;
  type: 'Part 46' | 'Part 48';
  duration_hours: number;
  regulation_reference: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  enrolled_at: string;
  started_at?: string;
  completed_at?: string;
  instructor_id?: string;
  course?: Course;
}

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as Course[];
    }
  });
}

export function useCourse(courseId?: string) {
  return useQuery({
    queryKey: ['course', courseId],
    queryFn: async () => {
      if (!courseId) return null;
      
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (error) throw error;
      return data as Course;
    },
    enabled: !!courseId
  });
}

export function useUserEnrollments(userId?: string) {
  return useQuery({
    queryKey: ['enrollments', userId],
    queryFn: async () => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('enrollments')
        .select(`
          *,
          course:courses(*)
        `)
        .eq('user_id', userId)
        .order('enrolled_at', { ascending: false });
      
      if (error) throw error;
      return data as Enrollment[];
    },
    enabled: !!userId
  });
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  duration_minutes: number;
  regulation_reference: string;
  created_at: string;
  updated_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'quiz' | 'interactive';
  content_url: string;
  content_data: any;
  order_index: number;
  duration_minutes: number;
  is_required: boolean;
  created_at: string;
  updated_at: string;
}

export function useCourseModules(courseId?: string) {
  return useQuery({
    queryKey: ['modules', courseId],
    queryFn: async () => {
      if (!courseId) return [];
      
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as Module[];
    },
    enabled: !!courseId
  });
}

export function useModuleLessons(moduleId?: string) {
  return useQuery({
    queryKey: ['lessons', moduleId],
    queryFn: async () => {
      if (!moduleId) return [];
      
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('module_id', moduleId)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data as Lesson[];
    },
    enabled: !!moduleId
  });
}

export function useEnrollInCourse() {
  return async (courseId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('enrollments')
      .insert({
        user_id: user.id,
        course_id: courseId,
        status: 'not_started'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  };
}