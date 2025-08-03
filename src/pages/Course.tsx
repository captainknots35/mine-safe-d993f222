import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserEnrollments } from "@/hooks/useCourses";
import { 
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  FileText,
  Video,
  Loader2
} from "lucide-react";

const Course = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, userRole, profile, loading: authLoading } = useAuth();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments(user?.id);

  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || enrollmentsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const enrollment = enrollments?.find(e => e.course_id === courseId);
  
  if (!enrollment) {
    return <Navigate to="/dashboard" replace />;
  }

  const course = enrollment.course;
  const userName = profile ? `${profile.first_name} ${profile.last_name}` : user?.email || 'User';
  const validUserRole = (userRole as 'admin' | 'instructor' | 'miner') || 'miner';

  // Sample course modules - in a real app, these would come from the database
  const modules = [
    {
      id: '1',
      title: 'Introduction to Mine Safety',
      description: 'Overview of MSHA regulations and basic safety principles',
      duration: 2,
      lessons: 5,
      completed: false
    },
    {
      id: '2', 
      title: 'Hazard Recognition',
      description: 'Identifying and assessing workplace hazards in mining operations',
      duration: 4,
      lessons: 8,
      completed: false
    },
    {
      id: '3',
      title: 'Personal Protective Equipment',
      description: 'Proper use and maintenance of safety equipment',
      duration: 3,
      lessons: 6,
      completed: false
    },
    {
      id: '4',
      title: 'Emergency Procedures',
      description: 'Response protocols for mining emergencies',
      duration: 4,
      lessons: 7,
      completed: false
    },
    {
      id: '5',
      title: 'Health and Safety Regulations',
      description: 'Understanding MSHA Part 46 requirements',
      duration: 6,
      lessons: 10,
      completed: false
    },
    {
      id: '6',
      title: 'Workplace Responsibilities',
      description: 'Employee and employer safety obligations',
      duration: 3,
      lessons: 5,
      completed: false
    },
    {
      id: '7',
      title: 'Final Assessment',
      description: 'Comprehensive test covering all course material',
      duration: 2,
      lessons: 1,
      completed: false
    }
  ];

  const completedModules = modules.filter(m => m.completed).length;
  const progress = Math.round((completedModules / modules.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={validUserRole} userName={userName} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  MSHA {course?.type}
                </Badge>
                <Badge variant="secondary" className="bg-warning/10 text-warning">
                  In Progress
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{course?.title}</h1>
              <p className="text-muted-foreground mt-1">{course?.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course?.duration_hours} hours total
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {modules.length} modules
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="text-2xl font-bold">{progress}%</div>
              <div className="text-sm text-muted-foreground mb-2">Complete</div>
              <Progress value={progress} className="w-48" />
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold">Course Modules</h2>
          
          {modules.map((module, index) => (
            <Card key={module.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                        Module {index + 1}
                      </span>
                      {module.completed && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">{module.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {module.duration} hours
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {module.lessons} lessons
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {module.completed ? (
                      <Button variant="success" disabled>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Completed
                      </Button>
                    ) : index === 0 || modules[index - 1]?.completed ? (
                      <Button 
                        variant="default"
                        onClick={() => navigate(`/course/${courseId}/module/${module.id}`)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        {index === 0 ? 'Start Module' : 'Continue Module'}
                      </Button>
                    ) : (
                      <Button variant="outline" disabled>
                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground mr-2" />
                        Locked
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Course Completion Actions */}
        {progress === 100 && (
          <Card className="mt-8 bg-success/5 border-success/20">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Congratulations!</h3>
              <p className="text-muted-foreground mb-4">
                You have successfully completed the {course?.title} course.
              </p>
              <Button variant="success">
                <FileText className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Course;