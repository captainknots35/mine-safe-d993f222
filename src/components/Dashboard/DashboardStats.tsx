import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  BookOpen
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  variant?: 'default' | 'success' | 'warning' | 'primary';
}

const StatsCard = ({ title, value, icon, description, variant = 'default' }: StatsCardProps) => {
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
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  userRole: 'admin' | 'instructor' | 'miner';
}

export const DashboardStats = ({ userRole }: DashboardStatsProps) => {
  const getMinerStats = () => [
    {
      title: "Completed Courses",
      value: "3",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "2 Part 46, 1 Part 48",
      variant: 'success' as const
    },
    {
      title: "In Progress",
      value: "1",
      icon: <Clock className="h-4 w-4" />,
      description: "Part 48 Annual Refresher",
      variant: 'primary' as const
    },
    {
      title: "Training Hours",
      value: "56",
      icon: <GraduationCap className="h-4 w-4" />,
      description: "Total completed hours"
    },
    {
      title: "Compliance Status",
      value: "Current",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "All requirements met",
      variant: 'success' as const
    }
  ];

  const getInstructorStats = () => [
    {
      title: "Active Students",
      value: "47",
      icon: <Users className="h-4 w-4" />,
      description: "Across 6 courses",
      variant: 'primary' as const
    },
    {
      title: "Courses Taught",
      value: "12",
      icon: <BookOpen className="h-4 w-4" />,
      description: "This quarter"
    },
    {
      title: "Certifications Issued",
      value: "89",
      icon: <GraduationCap className="h-4 w-4" />,
      description: "This month",
      variant: 'success' as const
    },
    {
      title: "Pending Reviews",
      value: "5",
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Awaiting certification",
      variant: 'warning' as const
    }
  ];

  const getAdminStats = () => [
    {
      title: "Total Users",
      value: "1,247",
      icon: <Users className="h-4 w-4" />,
      description: "892 miners, 23 instructors",
      variant: 'primary' as const
    },
    {
      title: "Active Courses",
      value: "28",
      icon: <BookOpen className="h-4 w-4" />,
      description: "Part 46 & Part 48 programs"
    },
    {
      title: "Compliance Rate",
      value: "96.2%",
      icon: <CheckCircle className="h-4 w-4" />,
      description: "Current training status",
      variant: 'success' as const
    },
    {
      title: "Monthly Completions",
      value: "234",
      icon: <GraduationCap className="h-4 w-4" />,
      description: "Certificates issued",
      variant: 'success' as const
    }
  ];

  const getStats = () => {
    switch (userRole) {
      case 'admin':
        return getAdminStats();
      case 'instructor':
        return getInstructorStats();
      default:
        return getMinerStats();
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