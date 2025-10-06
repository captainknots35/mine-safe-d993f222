import { useParams, Navigate, useNavigate } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserEnrollments, useCourseModules } from "@/hooks/useCourses";
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
  // ⚠️ TEMPORARY: Set to true to unlock all modules for editing
  // TODO: Change back to false to re-enable sequential locking
  const TEMP_UNLOCK_ALL_MODULES = true;
  
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, userRole, profile, loading: authLoading } = useAuth();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments(user?.id);
  const { data: modules, isLoading: modulesLoading } = useCourseModules(courseId);

  // Auth check disabled for testing
  // if (!authLoading && !user) {
  //   return <Navigate to="/auth" replace />;
  // }

  if (authLoading || enrollmentsLoading || modulesLoading) {
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

  // Use real modules from Supabase
  const courseModules = modules || [];
  
  // TODO: Track actual completion status from progress_tracking table
  const completedModules = 0;
  const progress = courseModules.length > 0 ? Math.round((completedModules / courseModules.length) * 100) : 0;

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
                  {courseModules.length} modules
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
          
          {courseModules.map((module, index) => {
            const isCompleted = false; // TODO: Track from progress_tracking
            const durationHours = Math.round(module.duration_minutes / 60 * 10) / 10;
            
            return (
              <Card key={module.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                          Module {index + 1}
                        </span>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <p className="text-muted-foreground mt-1">{module.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {durationHours} hours
                        </div>
                        {module.regulation_reference && (
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {module.regulation_reference}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {isCompleted ? (
                        <Button variant="success" disabled>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Completed
                        </Button>
                      ) : (TEMP_UNLOCK_ALL_MODULES || index === 0) ? (
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
            );
          })}
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