import { Navigate, Link } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserEnrollments, useEnrollInCourse } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { 
  Calendar,
  Bell,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Loader2
} from "lucide-react";

const upcomingEvents = [
  {
    id: '1',
    title: 'Live Safety Session',
    time: '2:00 PM Today',
    type: 'Virtual Classroom',
    instructor: 'Sarah Martinez'
  },
  {
    id: '2',
    title: 'Part 48 Refresher Due',
    time: 'Due in 14 days',
    type: 'Training Deadline',
    priority: 'high'
  }
];

const Dashboard = () => {
  const { user, userRole, profile, loading } = useAuth();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments(user?.id);
  const enrollInCourse = useEnrollInCourse();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading || enrollmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse(courseId);
      toast({
        title: "Enrolled successfully",
        description: "You have been enrolled in the course."
      });
    } catch (error: any) {
      toast({
        title: "Enrollment failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleStartCourse = async (enrollmentId: string) => {
    try {
      // Find the enrollment to get the course_id
      const enrollment = enrollments?.find(e => e.id === enrollmentId);
      if (!enrollment) {
        throw new Error('Enrollment not found');
      }

      const { error } = await supabase
        .from('enrollments')
        .update({ 
          status: 'in_progress',
          started_at: new Date().toISOString()
        })
        .eq('id', enrollmentId);

      if (error) throw error;

      // Refresh enrollments data
      queryClient.invalidateQueries({ queryKey: ['enrollments', user?.id] });

      toast({
        title: "Course started",
        description: "You can now begin your training."
      });

      // Navigate to the course page
      navigate(`/course/${enrollment.course_id}`);
    } catch (error: any) {
      toast({
        title: "Failed to start course",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const userName = profile ? `${profile.first_name} ${profile.last_name}` : user?.email || 'User';
  const validUserRole = (userRole as 'admin' | 'instructor' | 'miner') || 'miner';

  // Helper function to convert enrollment status to CourseCard status
  const mapEnrollmentStatus = (enrollmentStatus: 'not_started' | 'in_progress' | 'completed') => {
    switch (enrollmentStatus) {
      case 'not_started':
        return 'available' as const;
      case 'in_progress':
        return 'in-progress' as const;
      case 'completed':
        return 'completed' as const;
      default:
        return 'available' as const;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={validUserRole} userName={userName} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {profile?.first_name || 'there'}!</h1>
            <p className="text-muted-foreground mt-1">
              Stay compliant with your MSHA training requirements
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success/10 text-success">
              <CheckCircle className="w-3 h-3 mr-1" />
              Compliance Current
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats userRole={validUserRole} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Courses - Takes up 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Training</h2>
              <Button variant="outline" size="sm">
                View All Courses
              </Button>
            </div>
            
            <div className="grid gap-6">
              {enrollments?.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No courses enrolled yet.</p>
                  <Button variant="outline" asChild>
                    <Link to="/courses">Browse Available Courses</Link>
                  </Button>
                </Card>
              ) : (
                enrollments?.map((enrollment) => (
                  <CourseCard
                    key={enrollment.id}
                    id={enrollment.course_id}
                    title={enrollment.course?.title || 'Course'}
                    description={enrollment.course?.description || ''}
                    type={enrollment.course?.type || 'Part 46'}
                    duration={enrollment.course?.duration_hours || 0}
                    status={mapEnrollmentStatus(enrollment.status)}
                    isEnrolled={true}
                    userRole={validUserRole}
                    onContinue={() => {
                      if (enrollment.status === 'not_started') {
                        handleStartCourse(enrollment.id);
                      } else {
                        navigate(`/course/${enrollment.course_id}`);
                      }
                    }}
                    onEnroll={() => handleEnroll(enrollment.course_id)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Sidebar - Upcoming & Notifications */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex-shrink-0 mt-1">
                      {event.type === 'Virtual Classroom' ? (
                        <Users className="h-4 w-4 text-primary" />
                      ) : (
                        <Clock className="h-4 w-4 text-warning" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                      {event.instructor && (
                        <p className="text-xs text-muted-foreground">with {event.instructor}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Download Certificates
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Live Session
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Report Safety Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;