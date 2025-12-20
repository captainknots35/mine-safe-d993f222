import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, eachDayOfInterval, subDays, differenceInDays } from "date-fns";
import { isTestAccount } from "@/utils/testAccountFilter";

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
        .select("created_at, email")
        .gte("created_at", dateRange.startDate.toISOString())
        .lte("created_at", dateRange.endDate.toISOString())
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Filter out test accounts
      const filteredData = data?.filter(profile => !isTestAccount(profile.email)) || [];

      // Create date buckets
      const dateRangeInterval = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      });

      const signupsByDate: Record<string, number> = {};
      dateRangeInterval.forEach((date) => {
        signupsByDate[format(date, "yyyy-MM-dd")] = 0;
      });

      // Count signups per day (excluding test accounts)
      filteredData.forEach((profile) => {
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
      // First get test account user IDs to exclude
      const { data: testProfiles } = await supabase
        .from("profiles")
        .select("id, email");
      
      const testUserIds = testProfiles
        ?.filter(p => isTestAccount(p.email))
        .map(p => p.id) || [];

      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("enrolled_at, completed_at, status, user_id")
        .gte("enrolled_at", dateRange.startDate.toISOString())
        .lte("enrolled_at", dateRange.endDate.toISOString())
        .order("enrolled_at", { ascending: true });

      if (enrollError) throw enrollError;

      // Filter out test account enrollments
      const filteredEnrollments = enrollments?.filter(e => !testUserIds.includes(e.user_id)) || [];

      const dateRangeInterval = eachDayOfInterval({
        start: dateRange.startDate,
        end: dateRange.endDate,
      });

      const enrollmentsByDate: Record<string, { count: number; completions: number }> = {};
      dateRangeInterval.forEach((date) => {
        enrollmentsByDate[format(date, "yyyy-MM-dd")] = { count: 0, completions: 0 };
      });

      filteredEnrollments.forEach((enrollment) => {
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
      // First get test account user IDs to exclude
      const { data: testProfiles } = await supabase
        .from("profiles")
        .select("id, email");
      
      const testUserIds = testProfiles
        ?.filter(p => isTestAccount(p.email))
        .map(p => p.id) || [];

      const { data: courses, error: coursesError } = await supabase
        .from("courses")
        .select("id, title")
        .eq("is_active", true);

      if (coursesError) throw coursesError;

      const { data: enrollments, error: enrollError } = await supabase
        .from("enrollments")
        .select("course_id, status, user_id");

      if (enrollError) throw enrollError;

      // Filter out test account enrollments
      const filteredEnrollments = enrollments?.filter(e => !testUserIds.includes(e.user_id)) || [];

      const stats: CourseStats[] = courses?.map((course) => {
        const courseEnrollments = filteredEnrollments.filter((e) => e.course_id === course.id);
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
      // First get test account user IDs to exclude
      const { data: testProfiles } = await supabase
        .from("profiles")
        .select("id, email");
      
      const testUserIds = testProfiles
        ?.filter(p => isTestAccount(p.email))
        .map(p => p.id) || [];

      const { data, error } = await supabase
        .from("user_roles")
        .select("role, user_id");

      if (error) throw error;

      // Filter out test account roles
      const filteredData = data?.filter(r => !testUserIds.includes(r.user_id)) || [];

      const distribution: Record<string, number> = {};
      filteredData.forEach((item) => {
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

      // First get test account user IDs to exclude
      const { data: testProfiles } = await supabase
        .from("profiles")
        .select("id, email");
      
      const testUserIds = testProfiles
        ?.filter(p => isTestAccount(p.email))
        .map(p => p.id) || [];

      // Get all profiles and filter out test accounts
      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("id, email, created_at");
      
      const realProfiles = allProfiles?.filter(p => !isTestAccount(p.email)) || [];
      const totalUsers = realProfiles.length;

      // New users in selected period
      const newUsersInPeriod = realProfiles.filter(p => {
        const createdAt = new Date(p.created_at!);
        return createdAt >= dateRange.startDate && createdAt <= dateRange.endDate;
      }).length;

      // New users in previous period (for comparison)
      const newUsersPreviousPeriod = realProfiles.filter(p => {
        const createdAt = new Date(p.created_at!);
        return createdAt >= previousStart && createdAt < previousEnd;
      }).length;

      // Get all enrollments and filter out test accounts
      const { data: allEnrollments } = await supabase
        .from("enrollments")
        .select("user_id, status, completed_at");
      
      const realEnrollments = allEnrollments?.filter(e => !testUserIds.includes(e.user_id)) || [];
      const totalEnrollments = realEnrollments.length;

      // Completions in selected period
      const completionsInPeriod = realEnrollments.filter(e => {
        if (e.status !== "completed" || !e.completed_at) return false;
        const completedAt = new Date(e.completed_at);
        return completedAt >= dateRange.startDate && completedAt <= dateRange.endDate;
      }).length;

      // Active courses
      const { count: activeCourses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Calculate growth percentage
      const userGrowth = newUsersPreviousPeriod > 0
        ? Math.round((newUsersInPeriod - newUsersPreviousPeriod) / newUsersPreviousPeriod * 100)
        : newUsersInPeriod ? 100 : 0;

      return {
        totalUsers,
        newUsersInPeriod,
        userGrowth,
        totalEnrollments,
        completionsInPeriod,
        activeCourses: activeCourses || 0,
        days,
      };
    },
  });
};
