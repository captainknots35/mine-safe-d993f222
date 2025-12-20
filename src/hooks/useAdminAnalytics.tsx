import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, format, eachDayOfInterval, subDays } from "date-fns";

export interface DailySignup {
  date: string;
  count: number;
}

export interface DailyEnrollment {
  date: string;
  count: number;
  completions: number;
}

export interface CourseStats {
  course_id: string;
  title: string;
  enrollments: number;
  completions: number;
  completion_rate: number;
}

export interface RoleDistribution {
  role: string;
  count: number;
}

export const useSignupTrend = (days: number = 30) => {
  return useQuery({
    queryKey: ["admin-signup-trend", days],
    queryFn: async () => {
      const startDate = subDays(new Date(), days);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("created_at")
        .gte("created_at", startDate.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Create date buckets
      const dateRange = eachDayOfInterval({
        start: startDate,
        end: new Date(),
      });

      const signupsByDate: Record<string, number> = {};
      dateRange.forEach((date) => {
        signupsByDate[format(date, "yyyy-MM-dd")] = 0;
      });

      // Count signups per day
      data?.forEach((profile) => {
        const date = format(new Date(profile.created_at!), "yyyy-MM-dd");
        if (signupsByDate[date] !== undefined) {
          signupsByDate[date]++;
        }
      });

      return Object.entries(signupsByDate).map(([date, count]) => ({
        date: format(new Date(date), "MMM d"),
        count,
      })) as DailySignup[];
    },
  });
};

export const useEnrollmentTrend = (days: number = 30) => {
  return useQuery({
    queryKey: ["admin-enrollment-trend", days],
    queryFn: async () => {
      const startDate = subDays(new Date(), days);

      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("enrolled_at, completed_at, status")
        .gte("enrolled_at", startDate.toISOString())
        .order("enrolled_at", { ascending: true });

      if (enrollError) throw enrollError;

      const dateRange = eachDayOfInterval({
        start: startDate,
        end: new Date(),
      });

      const enrollmentsByDate: Record<string, { count: number; completions: number }> = {};
      dateRange.forEach((date) => {
        enrollmentsByDate[format(date, "yyyy-MM-dd")] = { count: 0, completions: 0 };
      });

      enrollments?.forEach((enrollment) => {
        const enrollDate = format(new Date(enrollment.enrolled_at!), "yyyy-MM-dd");
        if (enrollmentsByDate[enrollDate]) {
          enrollmentsByDate[enrollDate].count++;
        }
        
        if (enrollment.completed_at) {
          const completeDate = format(new Date(enrollment.completed_at), "yyyy-MM-dd");
          if (enrollmentsByDate[completeDate]) {
            enrollmentsByDate[completeDate].completions++;
          }
        }
      });

      return Object.entries(enrollmentsByDate).map(([date, data]) => ({
        date: format(new Date(date), "MMM d"),
        count: data.count,
        completions: data.completions,
      })) as DailyEnrollment[];
    },
  });
};

export const useCourseStats = () => {
  return useQuery({
    queryKey: ["admin-course-stats"],
    queryFn: async () => {
      const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("id, title")
        .eq("is_active", true);

      if (coursesError) throw coursesError;

      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("course_id, status");

      if (enrollError) throw enrollError;

      const stats: CourseStats[] = courses?.map((course) => {
        const courseEnrollments = enrollments?.filter((e) => e.course_id === course.id) || [];
        const completions = courseEnrollments.filter((e) => e.status === "completed").length;
        const total = courseEnrollments.length;

        return {
          course_id: course.id,
          title: course.title.length > 30 ? course.title.substring(0, 30) + "..." : course.title,
          enrollments: total,
          completions,
          completion_rate: total > 0 ? Math.round((completions / total) * 100) : 0,
        };
      }) || [];

      return stats.sort((a, b) => b.enrollments - a.enrollments);
    },
  });
};

export const useRoleDistribution = () => {
  return useQuery({
    queryKey: ["admin-role-distribution"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role");

      if (error) throw error;

      const distribution: Record<string, number> = {};
      data?.forEach((item) => {
        distribution[item.role] = (distribution[item.role] || 0) + 1;
      });

      return Object.entries(distribution).map(([role, count]) => ({
        role: role.charAt(0).toUpperCase() + role.slice(1),
        count,
      })) as RoleDistribution[];
    },
  });
};

export const useOverviewStats = () => {
  return useQuery({
    queryKey: ["admin-overview-stats"],
    queryFn: async () => {
      const now = new Date();
      const thirtyDaysAgo = subDays(now, 30);
      const sixtyDaysAgo = subDays(now, 60);

      // Total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // New users this month
      const { count: newUsersThisMonth } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", thirtyDaysAgo.toISOString());

      // New users last month (for comparison)
      const { count: newUsersLastMonth } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sixtyDaysAgo.toISOString())
        .lt("created_at", thirtyDaysAgo.toISOString());

      // Total enrollments
      const { count: totalEnrollments } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true });

      // Completions this month
      const { count: completionsThisMonth } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("completed_at", thirtyDaysAgo.toISOString());

      // Active courses
      const { count: activeCourses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Calculate growth percentage
      const userGrowth = newUsersLastMonth && newUsersLastMonth > 0
        ? Math.round(((newUsersThisMonth || 0) - newUsersLastMonth) / newUsersLastMonth * 100)
        : newUsersThisMonth ? 100 : 0;

      return {
        totalUsers: totalUsers || 0,
        newUsersThisMonth: newUsersThisMonth || 0,
        userGrowth,
        totalEnrollments: totalEnrollments || 0,
        completionsThisMonth: completionsThisMonth || 0,
        activeCourses: activeCourses || 0,
      };
    },
  });
};
