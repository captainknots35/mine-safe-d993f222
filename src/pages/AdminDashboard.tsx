import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  BookOpen,
  Award,
  UserPlus
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  useSignupTrend,
  useEnrollmentTrend,
  useCourseStats,
  useRoleDistribution,
  useOverviewStats,
} from "@/hooks/useAdminAnalytics";

const CHART_COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: number;
  isLoading?: boolean;
}

const StatCard = ({ title, value, description, icon, trend, isLoading }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">{description}</p>
            {trend !== undefined && (
              <span className={`text-xs font-medium ${trend >= 0 ? "text-green-600" : "text-red-600"}`}>
                {trend >= 0 ? "+" : ""}{trend}%
              </span>
            )}
          </div>
        </>
      )}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  const { data: overviewStats, isLoading: overviewLoading } = useOverviewStats();
  const { data: signupTrend, isLoading: signupLoading } = useSignupTrend(30);
  const { data: enrollmentTrend, isLoading: enrollmentLoading } = useEnrollmentTrend(30);
  const { data: courseStats, isLoading: courseLoading } = useCourseStats();
  const { data: roleDistribution, isLoading: roleLoading } = useRoleDistribution();

  useEffect(() => {
    if (!loading && (!user || userRole !== "admin")) {
      navigate("/dashboard");
    }
  }, [user, userRole, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const profileName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`.trim()
    : user?.email?.split("@")[0] || "Admin";

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | MSHA Training Platform</title>
        <meta name="description" content="Admin analytics dashboard for MSHA Training Platform" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header userRole="admin" userName={profileName} />

        <main className="container px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor user activity, enrollments, and platform metrics
            </p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Users"
              value={overviewStats?.totalUsers || 0}
              description="Registered accounts"
              icon={<Users className="h-4 w-4" />}
              isLoading={overviewLoading}
            />
            <StatCard
              title="New Users (30d)"
              value={overviewStats?.newUsersThisMonth || 0}
              description="vs previous period"
              icon={<UserPlus className="h-4 w-4" />}
              trend={overviewStats?.userGrowth}
              isLoading={overviewLoading}
            />
            <StatCard
              title="Total Enrollments"
              value={overviewStats?.totalEnrollments || 0}
              description="Across all courses"
              icon={<GraduationCap className="h-4 w-4" />}
              isLoading={overviewLoading}
            />
            <StatCard
              title="Completions (30d)"
              value={overviewStats?.completionsThisMonth || 0}
              description="Courses completed"
              icon={<Award className="h-4 w-4" />}
              isLoading={overviewLoading}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* User Signups Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  User Signups
                </CardTitle>
                <CardDescription>Daily new user registrations (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                {signupLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={signupTrend}>
                      <defs>
                        <linearGradient id="signupGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#signupGradient)"
                        name="Signups"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Enrollments & Completions Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Enrollments & Completions
                </CardTitle>
                <CardDescription>Daily activity (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                {enrollmentLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentTrend}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                        name="Enrollments"
                      />
                      <Line
                        type="monotone"
                        dataKey="completions"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        dot={false}
                        name="Completions"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Course Performance */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Course Performance
                </CardTitle>
                <CardDescription>Enrollments and completions by course</CardDescription>
              </CardHeader>
              <CardContent>
                {courseLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : courseStats && courseStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={courseStats} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis 
                        type="category" 
                        dataKey="title" 
                        tick={{ fontSize: 11 }}
                        width={150}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="enrollments" fill="hsl(var(--primary))" name="Enrollments" radius={[0, 4, 4, 0]} />
                      <Bar dataKey="completions" fill="hsl(var(--chart-2))" name="Completions" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No course data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Role Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  User Roles
                </CardTitle>
                <CardDescription>Distribution by role type</CardDescription>
              </CardHeader>
              <CardContent>
                {roleLoading ? (
                  <Skeleton className="h-[300px] w-full" />
                ) : roleDistribution && roleDistribution.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={roleDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="role"
                        label={({ role, count }) => `${role}: ${count}`}
                        labelLine={false}
                      >
                        {roleDistribution.map((_, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS[index % CHART_COLORS.length]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--popover))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No role data available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
