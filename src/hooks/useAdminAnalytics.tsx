import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, eachDayOfInterval, subDays, differenceInDays } from "date-fns";

export interface DateRangeParams {
  startDate: Date;
  endDate: Date;
}

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

export const useSignupTrend = (dateRange: DateRangeParams) => {
  return useQuery({
    queryKey: ["admin-signup-trend", dateRange.startDate.toISOString(), dateRange.endDate.toISOString()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("created_at")
        .gte("created_at", dateRange.startDate.toISOString())
        .lte("created_at", dateRange.endDate.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Create date buckets
      const dateRangeInterval = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      });

      const signupsByDate: Record<string, number> = {};
      dateRangeInterval.forEach((date) => {
        signupsByDate[format(date, "yyyy-MM-dd")] = 0;
      });

      // Count signups per day
      data?.forEach((profile) => {
        const date = format(new Date(profile.created_at!), "yyyy-MM-dd");
        if (signupsByDate[date] !== undefined) {
          signupsByDate[date]++;
        }
      });

      // Use shorter date format for longer ranges
      const days = differenceInDays(dateRange.endDate, dateRange.startDate);
      const dateFormat = days > 30 ? "MMM d" : "MMM d";

      return Object.entries(signupsByDate).map(([date, count]) => ({
        date: format(new Date(date), dateFormat),
        count,
      })) as DailySignup[];
    },
  });
};

export const useEnrollmentTrend = (dateRange: DateRangeParams) => {
  return useQuery({
    queryKey: ["admin-enrollment-trend", dateRange.startDate.toISOString(), dateRange.endDate.toISOString()],
    queryFn: async () => {
      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("enrolled_at, completed_at, status")
        .gte("enrolled_at", dateRange.startDate.toISOString())
        .lte("enrolled_at", dateRange.endDate.toISOString())
        .order("enrolled_at", { ascending: true });

      if (enrollError) throw enrollError;

      const dateRangeInterval = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      });

      const enrollmentsByDate: Record<string, { count: number; completions: number }> = {};
      dateRangeInterval.forEach((date) => {
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

      const days = differenceInDays(dateRange.endDate, dateRange.startDate);
      const dateFormat = days > 30 ? "MMM d" : "MMM d";

      return Object.entries(enrollmentsByDate).map(([date, data]) => ({
        date: format(new Date(date), dateFormat),
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

export const useOverviewStats = (dateRange: DateRangeParams) => {
  return useQuery({
    queryKey: ["admin-overview-stats", dateRange.startDate.toISOString(), dateRange.endDate.toISOString()],
    queryFn: async () => {
      const days = differenceInDays(dateRange.endDate, dateRange.startDate);
      const previousStart = subDays(dateRange.startDate, days);
      const previousEnd = subDays(dateRange.endDate, days);

      // Total users
      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // New users in selected period
      const { count: newUsersInPeriod } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", dateRange.startDate.toISOString())
        .lte("created_at", dateRange.endDate.toISOString());

      // New users in previous period (for comparison)
      const { count: newUsersPreviousPeriod } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .gte("created_at", previousStart.toISOString())
        .lt("created_at", previousEnd.toISOString());

      // Total enrollments
      const { count: totalEnrollments } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true });

      // Completions in selected period
      const { count: completionsInPeriod } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")
        .gte("completed_at", dateRange.startDate.toISOString())
        .lte("completed_at", dateRange.endDate.toISOString());

      // Active courses
      const { count: activeCourses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Calculate growth percentage
      const userGrowth = newUsersPreviousPeriod && newUsersPreviousPeriod > 0
        ? Math.round(((newUsersInPeriod || 0) - newUsersPreviousPeriod) / newUsersPreviousPeriod * 100)
        : newUsersInPeriod ? 100 : 0;

      return {
        totalUsers: totalUsers || 0,
        newUsersInPeriod: newUsersInPeriod || 0,
        userGrowth,
        totalEnrollments: totalEnrollments || 0,
        completionsInPeriod: completionsInPeriod || 0,
        activeCourses: activeCourses || 0,
        days,
      };
    },
  });
};
