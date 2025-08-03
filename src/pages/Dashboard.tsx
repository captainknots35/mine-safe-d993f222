import { Header } from "@/components/Layout/Header";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { CourseCard } from "@/components/Courses/CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Bell,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

// Mock data - in real app this would come from database
const mockCourses = [
  {
    id: '1',
    title: 'MSHA Part 46 New Miner Training',
    description: 'Comprehensive 24-hour training program for new miners working at surface operations. Covers safety fundamentals, hazard recognition, and emergency procedures.',
    type: 'Part 46' as const,
    duration: 24,
    status: 'in-progress' as const,
    progress: 65
  },
  {
    id: '2',
    title: 'MSHA Part 48 Annual Refresher',
    description: '8-hour annual refresher training to maintain compliance and reinforce safety principles for underground and surface operations.',
    type: 'Part 48' as const,
    duration: 8,
    status: 'available' as const
  },
  {
    id: '3',
    title: 'Electrical Safety & Lockout/Tagout',
    description: 'Specialized training focusing on electrical hazards in mining operations and proper lockout/tagout procedures.',
    type: 'Part 46' as const,
    duration: 4,
    status: 'completed' as const,
    progress: 100
  }
];

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
  const userRole = 'miner'; // This would come from authentication context

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName="John Doe" />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
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
        <DashboardStats userRole={userRole} />

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
              {mockCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  {...course}
                  userRole={userRole}
                  onEnroll={() => console.log('Enroll in course:', course.id)}
                  onContinue={() => console.log('Continue course:', course.id)}
                />
              ))}
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