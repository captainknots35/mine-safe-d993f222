import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserEnrollments, useCourseModules, useModuleLessons } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Loader2,
  BookOpen
} from "lucide-react";

const Lesson = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { user, userRole, profile, loading: authLoading } = useAuth();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments(user?.id);
  const { data: modules, isLoading: modulesLoading } = useCourseModules(courseId);
  const { data: lessons, isLoading: lessonsLoading } = useModuleLessons(moduleId);
  const { toast } = useToast();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  // Auth check disabled for testing
  // if (!authLoading && !user) {
  //   return <Navigate to="/auth" replace />;
  // }

  if (authLoading || enrollmentsLoading || modulesLoading || lessonsLoading) {
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

  const currentModule = modules?.find(m => m.id === moduleId);
  const moduleLessons = lessons || [];
  
  console.log('Lesson Page Debug:', {
    moduleId,
    currentModule,
    modulesCount: modules?.length,
    lessonsCount: moduleLessons.length,
    allModules: modules?.map(m => ({ id: m.id, title: m.title }))
  });
  
  if (!currentModule) {
    console.log('Module not found, redirecting...');
    return <Navigate to={`/course/${courseId}`} replace />;
  }
  
  if (moduleLessons.length === 0) {
    console.log('No lessons found for module, showing placeholder...');
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={validUserRole} userName={userName} />
        <main className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(`/course/${courseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
          <Card className="bg-warning/5 border-warning/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Module content not available</h2>
              <p className="text-muted-foreground">This module doesn’t have lessons yet. Please try again shortly.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const currentLesson = moduleLessons[currentLessonIndex];
  const totalLessons = moduleLessons.length;
  const progress = Math.round(((currentLessonIndex + 1) / totalLessons) * 100);
  const moduleOrderIndex = modules?.findIndex(m => m.id === moduleId) ?? 0;

  const handleNextLesson = () => {
    if (currentLessonIndex < totalLessons - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else {
      // Module completed
      toast({
        title: "Module completed!",
        description: "Great job! You've finished this module.",
      });
      navigate(`/course/${courseId}`);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'quiz':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getLessonContent = () => {
    const contentText = currentLesson.content_data?.text || currentLesson.description || '';
    const sections = currentLesson.content_data?.sections || [];
    
    switch (currentLesson.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Video Player</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Duration: {currentLesson.duration_minutes} minutes
                </p>
              </div>
            </div>
            <div className="prose max-w-none">
              <p>{contentText}</p>
            </div>
          </div>
        );
      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-warning" />
              <h3 className="text-xl font-semibold mb-2">Assessment Time</h3>
              <p className="text-muted-foreground">{contentText}</p>
              <Button className="mt-4" variant="default">
                Start Assessment
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="prose max-w-none">
            <div className="bg-muted/50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="font-medium">Reading Material</span>
                <Badge variant="outline">{currentLesson.duration_minutes} min read</Badge>
              </div>
            </div>
            
            {/* Render sections if available, otherwise fall back to text */}
            {sections.length > 0 ? (
              <div className="space-y-8">
                {sections.map((section: any, index: number) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground border-b pb-2">
                      {section.heading}
                    </h3>
                    <div className="text-base leading-relaxed whitespace-pre-wrap">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-lg leading-relaxed whitespace-pre-wrap">
                {contentText}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={validUserRole} userName={userName} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(`/course/${courseId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Module {moduleOrderIndex + 1}
                </Badge>
                <Badge variant="outline">
                  Lesson {currentLessonIndex + 1} of {totalLessons}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold">{currentModule.title}</h1>
              <h2 className="text-xl text-muted-foreground mt-1">{currentLesson.title}</h2>
            </div>
            
            <div className="lg:text-right">
              <div className="text-lg font-semibold">{progress}%</div>
              <div className="text-sm text-muted-foreground mb-2">Module Progress</div>
              <Progress value={progress} className="w-48" />
            </div>
          </div>

          {/* Lesson Navigation */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              {getLessonIcon(currentLesson.type)}
              <span className="font-medium">{currentLesson.title}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {currentLesson.duration_minutes} minutes
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            {getLessonContent()}
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={handlePreviousLesson}
            disabled={currentLessonIndex === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Lesson
          </Button>
          
          <div className="text-sm text-muted-foreground">
            Lesson {currentLessonIndex + 1} of {totalLessons}
          </div>
          
          <Button onClick={handleNextLesson}>
            {currentLessonIndex === totalLessons - 1 ? 'Complete Module' : 'Next Lesson'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Lesson;