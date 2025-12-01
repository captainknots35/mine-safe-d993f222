import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface MinerStats {
  completedCourses: number;
  completedBreakdown: string;
  inProgressCount: number;
  inProgressCourse: string;
  trainingHours: number;
  complianceStatus: 'Current' | 'Due Soon' | 'Overdue';
  complianceDescription: string;
}

export interface InstructorStats {
  activeStudents: number;
  activeStudentsDescription: string;
  coursesTaught: number;
  certificationsIssued: number;
  pendingReviews: number;
}

export interface AdminStats {
  totalUsers: number;
  usersBreakdown: string;
  activeCourses: number;
  complianceRate: number;
  monthlyCompletions: number;
}

export const useMinerStats = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['miner-stats', userId],
    queryFn: async (): Promise<MinerStats> => {
      if (!userId) throw new Error('No user ID');

      // Get enrollments with course data
      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select(`
          id,
          status,
          course:courses (
            id,
            title,
            type,
            duration_hours
          )
        `)
        .eq('user_id', userId);

      if (enrollError) throw enrollError;

      // Calculate stats
      const completed = enrollments?.filter(e => e.status === 'completed') || [];
      const inProgress = enrollments?.filter(e => e.status === 'in_progress') || [];

      // Count by type
      const part46Completed = completed.filter(e => e.course?.type === 'Part 46').length;
      const part48Completed = completed.filter(e => e.course?.type === 'Part 48').length;

      // Calculate total training hours from completed courses
      const trainingHours = completed.reduce((sum, e) => sum + (e.course?.duration_hours || 0), 0);

      // Get the first in-progress course name
      const inProgressCourse = inProgress.length > 0 
        ? inProgress[0].course?.title || 'Training in progress'
        : 'None';

      // Build breakdown string
      let breakdownParts: string[] = [];
      if (part46Completed > 0) breakdownParts.push(`${part46Completed} Part 46`);
      if (part48Completed > 0) breakdownParts.push(`${part48Completed} Part 48`);
      const completedBreakdown = breakdownParts.length > 0 
        ? breakdownParts.join(', ') 
        : 'No completed courses';

      // Determine compliance status (simplified logic)
      let complianceStatus: 'Current' | 'Due Soon' | 'Overdue' = 'Current';
      let complianceDescription = 'All requirements met';
      
      if (inProgress.length > 0 && completed.length === 0) {
        complianceStatus = 'Due Soon';
        complianceDescription = 'Training in progress';
      }

      return {
        completedCourses: completed.length,
        completedBreakdown,
        inProgressCount: inProgress.length,
        inProgressCourse,
        trainingHours,
        complianceStatus,
        complianceDescription
      };
    },
    enabled: !!userId
  });
};

export const useInstructorStats = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['instructor-stats', userId],
    queryFn: async (): Promise<InstructorStats> => {
      if (!userId) throw new Error('No user ID');

      // Get students assigned to this instructor
      const { data: enrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('id, course_id, status')
        .eq('instructor_id', userId);

      if (enrollError) throw enrollError;

      // Get unique course count
      const uniqueCourses = new Set(enrollments?.map(e => e.course_id) || []);

      // Get certificates issued by this instructor
      const { data: certificates, error: certError } = await supabase
        .from('training_certificates')
        .select('id')
        .eq('instructor_id', userId);

      if (certError) throw certError;

      // Get pending reviews (enrollments that are completed but no certificate yet)
      const completedEnrollments = enrollments?.filter(e => e.status === 'completed') || [];
      const { data: issuedCerts } = await supabase
        .from('training_certificates')
        .select('enrollment_id')
        .eq('instructor_id', userId);

      const issuedEnrollmentIds = new Set(issuedCerts?.map(c => c.enrollment_id) || []);
      const pendingReviews = completedEnrollments.filter(e => !issuedEnrollmentIds.has(e.id)).length;

      return {
        activeStudents: enrollments?.length || 0,
        activeStudentsDescription: `Across ${uniqueCourses.size} courses`,
        coursesTaught: uniqueCourses.size,
        certificationsIssued: certificates?.length || 0,
        pendingReviews
      };
    },
    enabled: !!userId
  });
};

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      // Get user counts by role
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('role');

      if (rolesError) throw rolesError;

      const miners = roles?.filter(r => r.role === 'miner').length || 0;
      const instructors = roles?.filter(r => r.role === 'instructor').length || 0;
      const totalUsers = roles?.length || 0;

      // Get active courses
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id')
        .eq('is_active', true);

      if (coursesError) throw coursesError;

      // Get completed enrollments for compliance rate
      const { data: allEnrollments, error: enrollError } = await supabase
        .from('enrollments')
        .select('status');

      if (enrollError) throw enrollError;

      const completedCount = allEnrollments?.filter(e => e.status === 'completed').length || 0;
      const complianceRate = allEnrollments?.length 
        ? Math.round((completedCount / allEnrollments.length) * 100 * 10) / 10
        : 0;

      // Get monthly completions (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: recentCerts, error: certsError } = await supabase
        .from('training_certificates')
        .select('id')
        .gte('issued_date', thirtyDaysAgo.toISOString());

      if (certsError) throw certsError;

      return {
        totalUsers,
        usersBreakdown: `${miners} miners, ${instructors} instructors`,
        activeCourses: courses?.length || 0,
        complianceRate,
        monthlyCompletions: recentCerts?.length || 0
      };
    }
  });
};
