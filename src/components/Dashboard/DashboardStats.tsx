import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  BookOpen
} from "lucide-react";
import { useMinerStats, useInstructorStats, useAdminStats } from "@/hooks/useDashboardStats";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'primary';
  isLoading?: boolean;
}

const StatsCard = ({ title, value, icon, description, variant = 'default', isLoading }: StatsCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'primary':
        return 'border-primary/20 bg-primary/5';
      default:
        return 'border-border';
    }
  };

  return (
    <Card className={`${getVariantStyles()} transition-all hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-16 mb-1" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  userRole: 'admin' | 'instructor' | 'miner';
  userId?: string;
}

export const DashboardStats = ({ userRole, userId }: DashboardStatsProps) => {
  const minerStats = useMinerStats(userRole === 'miner' ? userId : undefined);
  const instructorStats = useInstructorStats(userRole === 'instructor' ? userId : undefined);
  const adminStats = useAdminStats();

  const getMinerStatsCards = () => {
    const data = minerStats.data;
    const isLoading = minerStats.isLoading;

    return [
      {
        title: "Completed Courses",
        value: data?.completedCourses.toString() || "0",
        icon: <CheckCircle className="h-4 w-4" />,
        description: data?.completedBreakdown || "No completed courses",
        variant: 'success' as const,
        isLoading
      },
      {
        title: "In Progress",
        value: data?.inProgressCount.toString() || "0",
        icon: <Clock className="h-4 w-4" />,
        description: data?.inProgressCourse || "None",
        variant: 'primary' as const,
        isLoading
      },
      {
        title: "Training Hours",
        value: data?.trainingHours.toString() || "0",
        icon: <GraduationCap className="h-4 w-4" />,
        description: "Total completed hours",
        isLoading
      },
      {
        title: "Compliance Status",
        value: data?.complianceStatus || "Current",
        icon: <CheckCircle className="h-4 w-4" />,
        description: data?.complianceDescription || "All requirements met",
        variant: data?.complianceStatus === 'Current' ? 'success' as const : 'warning' as const,
        isLoading
      }
    ];
  };

  const getInstructorStatsCards = () => {
    const data = instructorStats.data;
    const isLoading = instructorStats.isLoading;

    return [
      {
        title: "Active Students",
        value: data?.activeStudents.toString() || "0",
        icon: <Users className="h-4 w-4" />,
        description: data?.activeStudentsDescription || "Across 0 courses",
        variant: 'primary' as const,
        isLoading
      },
      {
        title: "Courses Taught",
        value: data?.coursesTaught.toString() || "0",
        icon: <BookOpen className="h-4 w-4" />,
        description: "Unique courses",
        isLoading
      },
      {
        title: "Certifications Issued",
        value: data?.certificationsIssued.toString() || "0",
        icon: <GraduationCap className="h-4 w-4" />,
        description: "Total issued",
        variant: 'success' as const,
        isLoading
      },
      {
        title: "Pending Reviews",
        value: data?.pendingReviews.toString() || "0",
        icon: <AlertTriangle className="h-4 w-4" />,
        description: "Awaiting certification",
        variant: 'warning' as const,
        isLoading
      }
    ];
  };

  const getAdminStatsCards = () => {
    const data = adminStats.data;
    const isLoading = adminStats.isLoading;

    return [
      {
        title: "Total Users",
        value: data?.totalUsers.toLocaleString() || "0",
        icon: <Users className="h-4 w-4" />,
        description: data?.usersBreakdown || "0 miners, 0 instructors",
        variant: 'primary' as const,
        isLoading
      },
      {
        title: "Active Courses",
        value: data?.activeCourses.toString() || "0",
        icon: <BookOpen className="h-4 w-4" />,
        description: "Part 46 & Part 48 programs",
        isLoading
      },
      {
        title: "Compliance Rate",
        value: data ? `${data.complianceRate}%` : "0%",
        icon: <CheckCircle className="h-4 w-4" />,
        description: "Current training status",
        variant: 'success' as const,
        isLoading
      },
      {
        title: "Monthly Completions",
        value: data?.monthlyCompletions.toString() || "0",
        icon: <GraduationCap className="h-4 w-4" />,
        description: "Certificates issued",
        variant: 'success' as const,
        isLoading
      }
    ];
  };

  const getStats = () => {
    switch (userRole) {
      case 'admin':
        return getAdminStatsCards();
      case 'instructor':
        return getInstructorStatsCards();
      default:
        return getMinerStatsCards();
    }
  };

  const stats = getStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};
