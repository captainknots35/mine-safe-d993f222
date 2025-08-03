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