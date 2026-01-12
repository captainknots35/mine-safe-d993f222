import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserEnrollments, useCourseModules, useCourse } from "@/hooks/useCourses";
import { useHasPurchasedCourse } from "@/hooks/useCoursePurchase";
import { CoursePaywall } from "@/components/Payment/CoursePaywall";
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useTranslation();
  const { getLocalizedField } = useLanguage();
  
  // ⚠️ TEMPORARY: Set to true to unlock all modules for editing
  // TODO: Change back to false to re-enable sequential locking
  const TEMP_UNLOCK_ALL_MODULES = true;
  
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user, userRole, profile, loading: authLoading } = useAuth();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments(user?.id);
  const { data: modules, isLoading: modulesLoading } = useCourseModules(courseId);
  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);
  const { hasPurchased, isLoading: purchaseLoading } = useHasPurchasedCourse(courseId || '');

  // Redirect to auth if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (authLoading || enrollmentsLoading || modulesLoading || courseLoading || purchaseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // ⚠️ TEMPORARY: Admins bypass paywall for course development
  // TODO: Remove this bypass when course content is complete
  const isAdminBypass = userRole === 'admin' || userRole === 'instructor';

  // Show paywall if not purchased (unless admin/instructor)
  if (!hasPurchased && !isAdminBypass && courseData) {
    return (
      <CoursePaywall 
        courseId={courseId || ''} 
        courseTitle={getLocalizedField(courseData, 'title')}
        courseDescription={getLocalizedField(courseData, 'description')}
        priceCents={courseData.price_cents || 10800}
      >
        <div />
      </CoursePaywall>
    );
  }

  const enrollment = enrollments?.find(e => e.course_id === courseId);
  
  // If no enrollment but purchased, allow access (enrollment will be created)
  const course = enrollment?.course || courseData;
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
            {t('common.backToDashboard')}
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  MSHA {course?.type}
                </Badge>
                <Badge variant="secondary" className="bg-warning/10 text-warning">
                  {t('courses.inProgress')}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold">{course ? getLocalizedField(course, 'title') : ''}</h1>
              <p className="text-muted-foreground mt-1">{course ? getLocalizedField(course, 'description') : ''}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {t('courses.hoursTotal', { hours: course?.duration_hours })}
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  {courseModules.length} {t('courses.modules').toLowerCase()}
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="text-2xl font-bold">{progress}%</div>
              <div className="text-sm text-muted-foreground mb-2">{t('common.complete')}</div>
              <Progress value={progress} className="w-48" />
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="grid gap-6">
          <h2 className="text-2xl font-semibold">{t('courses.courseModules')}</h2>
          
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
                          {t('courses.module', { number: index + 1 })}
                        </span>
                        {isCompleted && (
                          <CheckCircle className="h-5 w-5 text-success" />
                        )}
                      </div>
                      <CardTitle className="text-xl">{getLocalizedField(module, 'title')}</CardTitle>
                      <p className="text-muted-foreground mt-1">{getLocalizedField(module, 'description')}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {durationHours} {t('common.hours')}
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
                          {t('courses.completed')}
                        </Button>
                      ) : (TEMP_UNLOCK_ALL_MODULES || index === 0) ? (
                        <Button 
                          variant="default"
                          onClick={() => navigate(`/course/${courseId}/module/${module.id}`)}
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {index === 0 ? t('courses.startModule') : t('courses.continueModule')}
                        </Button>
                      ) : (
                        <Button variant="outline" disabled>
                          <div className="w-4 h-4 rounded-full border-2 border-muted-foreground mr-2" />
                          {t('courses.locked')}
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
              <h3 className="text-xl font-semibold mb-2">{t('courses.congratulations')}</h3>
              <p className="text-muted-foreground mb-4">
                {t('courses.courseCompleted', { title: course ? getLocalizedField(course, 'title') : '' })}
              </p>
              <Button variant="success">
                <FileText className="mr-2 h-4 w-4" />
                {t('courses.downloadCertificate')}
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Course;