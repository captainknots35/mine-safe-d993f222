import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useUserEnrollments, useCourseModules, useModuleLessons, useCourse } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  Video,
  Loader2,
  BookOpen,
  XCircle,
  AlertCircle
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BasicVideo } from "@/components/BasicVideo";
import { LOTOSimulation } from "@/components/Simulations/LOTOSimulation";
import { HighwallSimulation } from "@/components/Simulations/HighwallSimulation";
import { HaulRoadSimulation } from "@/components/Simulations/HaulRoadSimulation";
import { EmergencySimulationLauncher } from "@/components/Simulations/EmergencySimulationLauncher";
import { BirdDogSimulation } from "@/components/Simulations/BirdDogSimulation";
import { RadioDisciplineSimulation } from "@/components/Simulations/RadioDisciplineSimulation";
import { FireSuppressionSimulation } from "@/components/Simulations/FireSuppressionSimulation";
import { CrushSyndromeSimulation } from "@/components/Simulations/CrushSyndromeSimulation";

const Lesson = () => {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>();
  const navigate = useNavigate();
  const { user, userRole, profile, loading: authLoading } = useAuth();
  const { data: enrollments, isLoading: enrollmentsLoading } = useUserEnrollments(user?.id);
  const { data: courseData, isLoading: courseLoading } = useCourse(courseId);
  const { data: modules, isLoading: modulesLoading } = useCourseModules(courseId);
  const { data: lessons, isLoading: lessonsLoading } = useModuleLessons(moduleId);
  const { toast } = useToast();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Auth check disabled for testing
  // if (!authLoading && !user) {
  //   return <Navigate to="/auth" replace />;
  // }

  if (authLoading || enrollmentsLoading || modulesLoading || lessonsLoading || courseLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const enrollment = enrollments?.find(e => e.course_id === courseId);
  
  // ⚠️ TEMPORARY: Admins/instructors can view lessons without enrollment for course development
  const isAdminBypass = userRole === 'admin' || userRole === 'instructor';
  
  if (!enrollment && !isAdminBypass) {
    return <Navigate to="/dashboard" replace />;
  }

  const course = enrollment?.course || courseData;
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
      // Reset quiz state when moving to next lesson
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizScore(0);
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
      // Reset quiz state when moving to previous lesson
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizScore(0);
    }
  };

  const handleQuizAnswer = (questionId: string, answerId: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const handleQuizSubmit = () => {
    const questions = currentLesson.content_data?.questions || [];
    let correct = 0;
    
    questions.forEach((q: any) => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    
    const score = Math.round((correct / questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    const passingScore = currentLesson.content_data?.passingScore || 80;
    
    if (score >= passingScore) {
      toast({
        title: "Assessment Passed!",
        description: `Congratulations! You scored ${score}%. You may now continue.`,
      });
    } else {
      toast({
        title: "Assessment Not Passed",
        description: `You scored ${score}%. You need ${passingScore}% to pass. Please review the material and try again.`,
        variant: "destructive",
      });
    }
  };

  const handleQuizRetry = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
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
    // Check for full markdown content first (new format)
    const markdownContent = currentLesson.content_data?.content;
    // Fall back to old formats
    const contentText = currentLesson.content_data?.text || currentLesson.description || '';
    const sections = currentLesson.content_data?.sections || [];
    
    switch (currentLesson.type) {
      case 'interactive':
        // Check for specific simulation types in content_data
        const simulationType = currentLesson.content_data?.simulationType;
        
        return (
          <div className="space-y-6">
            {simulationType === 'loto' && <LOTOSimulation />}
            {simulationType === 'highwall' && <HighwallSimulation />}
            {simulationType === 'haulroad' && <HaulRoadSimulation />}
            {simulationType === 'birddog' && <BirdDogSimulation />}
            {simulationType === 'radio' && <RadioDisciplineSimulation />}
            {simulationType === 'firesuppression' && <FireSuppressionSimulation />}
            {simulationType === 'crush' && <CrushSyndromeSimulation />}
            {!simulationType && <EmergencySimulationLauncher />}
          </div>
        );
      case 'video':
        const videoUrl = currentLesson.content_data?.videoUrl || currentLesson.content_url;
        const videoTitle = currentLesson.content_data?.videoTitle || currentLesson.title;
        const videoDescription = currentLesson.content_data?.videoDescription || contentText;
        
        return (
          <div className="space-y-6">
            {videoUrl ? (
              <BasicVideo 
                src={videoUrl}
                title={videoTitle}
                description={videoDescription}
              />
            ) : (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No video available</p>
                </div>
              </div>
            )}
            {currentLesson.content_data?.additionalContent && (
              <div className="prose max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {currentLesson.content_data.additionalContent}
                </ReactMarkdown>
              </div>
            )}
          </div>
        );
      case 'quiz':
        const questions = currentLesson.content_data?.questions || [];
        const instructions = currentLesson.content_data?.instructions || '';
        const passingScore = currentLesson.content_data?.passingScore || 80;
        const allQuestionsAnswered = questions.length > 0 && questions.every((q: any) => quizAnswers[q.id] !== undefined);

        return (
          <div className="space-y-6">
            {/* Instructions */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Assessment Instructions</h3>
                  <p className="text-muted-foreground">{instructions}</p>
                </div>
              </div>
            </div>

            {/* Questions */}
            {!quizSubmitted ? (
              <div className="space-y-8">
                {questions.map((question: any, qIndex: number) => (
                  <Card key={question.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Question {qIndex + 1} of {questions.length}
                      </CardTitle>
                      <p className="text-base font-normal mt-2">{question.question}</p>
                    </CardHeader>
                    <CardContent>
                      <RadioGroup
                        value={quizAnswers[question.id]}
                        onValueChange={(value) => handleQuizAnswer(question.id, value)}
                      >
                        {question.options.map((option: any, optIndex: number) => {
                          const optionText = typeof option === 'string' ? option : option.text;
                          const optionId = typeof option === 'string' ? optIndex.toString() : option.id;
                          
                          return (
                            <div key={optionId} className="flex items-start space-x-3 space-y-0 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                              <RadioGroupItem value={optionId} id={`q${question.id}-opt${optionId}`} />
                              <Label 
                                htmlFor={`q${question.id}-opt${optionId}`}
                                className="font-normal cursor-pointer flex-1 leading-relaxed"
                              >
                                {optionText}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-center pt-4">
                  <Button 
                    size="lg"
                    onClick={handleQuizSubmit}
                    disabled={!allQuestionsAnswered}
                  >
                    Submit Assessment
                  </Button>
                </div>
              </div>
            ) : (
              /* Results */
              <div className="space-y-6">
                <Card className={`border-2 ${quizScore >= passingScore ? 'border-success bg-success/5' : 'border-destructive bg-destructive/5'}`}>
                  <CardContent className="p-8 text-center">
                    {quizScore >= passingScore ? (
                      <>
                        <CheckCircle className="h-20 w-20 mx-auto mb-4 text-success" />
                        <h3 className="text-2xl font-bold mb-2 text-success">Assessment Passed!</h3>
                        <p className="text-xl mb-4">Your Score: {quizScore}%</p>
                        <p className="text-muted-foreground">
                          Congratulations! You've successfully completed this assessment.
                        </p>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-20 w-20 mx-auto mb-4 text-destructive" />
                        <h3 className="text-2xl font-bold mb-2 text-destructive">Assessment Not Passed</h3>
                        <p className="text-xl mb-4">Your Score: {quizScore}%</p>
                        <p className="text-muted-foreground mb-4">
                          You need {passingScore}% to pass. Please review the material and try again.
                        </p>
                        <Button onClick={handleQuizRetry} variant="outline">
                          Retry Assessment
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Answer Review */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Answer Review</h3>
                  {questions.map((question: any, qIndex: number) => {
                    const userAnswer = quizAnswers[question.id];
                    const isCorrect = userAnswer === question.correctAnswer;
                    
                    return (
                      <Card key={question.id} className={`border-2 ${isCorrect ? 'border-success/30' : 'border-destructive/30'}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <CardTitle className="text-base font-semibold">
                              Question {qIndex + 1}: {question.question}
                            </CardTitle>
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div>
                            <span className="font-medium">Your answer: </span>
                            <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                              {question.options[userAnswer]}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div>
                              <span className="font-medium">Correct answer: </span>
                              <span className="text-success">
                                {question.options[question.correctAnswer]}
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return (
          <>
            <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-6 prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-h2:border-b-2 prose-h2:border-primary/20 prose-h2:pb-3 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-4 prose-li:text-lg prose-li:leading-relaxed prose-ul:my-4 prose-ol:my-4 prose-table:text-base prose-table:my-6 prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-primary/10 prose-th:p-3 prose-th:font-semibold prose-td:border prose-td:border-border prose-td:p-3 prose-strong:text-foreground prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-muted/50 prose-blockquote:py-3 prose-blockquote:px-4 prose-blockquote:my-4 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-base">
              
              {/* Render markdown content if available (new format) */}
              {markdownContent && (
                <div className="space-y-6">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Render sections (including videos) */}
              {sections.length > 0 && (
                <div className="space-y-10">
                  {sections.map((section: any, index: number) => {
                    // Handle video sections
                    if (section.type === 'video') {
                      return (
                        <div key={index} className="space-y-4 my-8">
                          <div className="not-prose">
                            <BasicVideo 
                              src={section.videoUrl || section.url} 
                              title={section.title} 
                              description={section.description} 
                            />
                          </div>
                        </div>
                      );
                    }

                    // Handle interactive simulation sections
                    if (section.type === 'interactive') {
                      const simType = section.simulationType;
                      return (
                        <div key={index} className="space-y-6">
                          {section.title && (
                            <h3 className="text-2xl font-bold text-foreground border-b-2 border-primary/20 pb-3 mb-4">
                              {section.title}
                            </h3>
                          )}
                          {section.content && (
                            <div className="text-lg leading-relaxed mb-6">
                              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {section.content}
                              </ReactMarkdown>
                            </div>
                          )}
                          <div className="not-prose">
                            {simType === 'loto' && <LOTOSimulation />}
                            {simType === 'highwall' && <HighwallSimulation />}
                            {simType === 'haulroad' && <HaulRoadSimulation />}
                            {!simType && <EmergencySimulationLauncher />}
                          </div>
                        </div>
                      );
                    }
                    
                    // Handle text sections with title and content
                    if (section.type === 'text' || section.title) {
                      return (
                        <div key={index} className="space-y-4">
                          {section.title && (
                            <h3 className="text-2xl font-bold text-foreground border-b-2 border-primary/20 pb-3 mb-4">
                              {section.title}
                            </h3>
                          )}
                          {section.content && (
                            <div className="text-lg leading-relaxed">
                              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                {section.content}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    // Handle table sections
                    if (section.type === 'table') {
                      return (
                        <div key={index} className="space-y-4 not-prose">
                          {section.title && (
                            <h3 className="text-2xl font-bold text-foreground border-b-2 border-primary/20 pb-3">
                              {section.title}
                            </h3>
                          )}
                          <div className="overflow-x-auto rounded-lg border border-border">
                            <table className="w-full text-base">
                              {section.headers && (
                                <thead className="bg-primary/10">
                                  <tr>
                                    {section.headers.map((header: string, hIndex: number) => (
                                      <th key={hIndex} className="p-3 text-left font-semibold border-b-2 border-border">
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                              )}
                              <tbody>
                                {section.rows?.map((row: string[], rIndex: number) => (
                                  <tr key={rIndex} className="hover:bg-muted/50 transition-colors">
                                    {row.map((cell: string, cIndex: number) => (
                                      <td key={cIndex} className="p-3 border-b border-border">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {section.note && (
                            <p className="text-sm text-muted-foreground italic">{section.note}</p>
                          )}
                        </div>
                      );
                    }
                    
                    // Handle video sections (alternative format)
                    if (section.type === 'video' || section.videoUrl) {
                      return (
                        <div key={index} className="not-prose">
                          <BasicVideo 
                            src={section.videoUrl || section.url}
                            title={section.title}
                            description={section.description}
                          />
                        </div>
                      );
                    }
                    
                    // Handle content sections with markdown
                    if (section.type === 'content') {
                      return (
                        <div key={index}>
                          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {section.content}
                          </ReactMarkdown>
                        </div>
                      );
                    }
                    
                    // Legacy section format
                    const h = (section.heading || '').toLowerCase();
                    const c = (section.content || '').toLowerCase();
                    const isSimConcept = c.includes('lovable.dev simulation concept');

                    const shouldShowLOTO = h.includes('interactive simulation 1') ||
                      (isSimConcept && (c.includes('loto') || c.includes('lockout/tagout')));

                    const shouldShowHighwall = h.includes('interactive simulation 2') ||
                      (isSimConcept && c.includes('highwall'));

                    const shouldShowHaulRoad = h.includes('interactive simulation 3') ||
                      (isSimConcept && (c.includes('haul road') || c.includes('spotter')));
                    
                    if (shouldShowLOTO || shouldShowHighwall || shouldShowHaulRoad) {
                      return (
                        <div key={index} className="space-y-4">
                          <h3 className="text-2xl font-bold text-foreground border-b-2 border-primary/20 pb-2">
                            {section.heading}
                          </h3>
                          {shouldShowLOTO && <LOTOSimulation />}
                          {shouldShowHighwall && <HighwallSimulation />}
                          {shouldShowHaulRoad && <HaulRoadSimulation />}
                        </div>
                      );
                    }
                    
                    return (
                      <div key={index} className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground border-b-2 border-primary/20 pb-2">
                          {section.heading}
                        </h3>
                        <div className="text-base leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {/* Fallback to plain text if no markdown or sections */}
              {!markdownContent && sections.length === 0 && contentText && (
                <div className="text-lg leading-relaxed whitespace-pre-line">
                  {contentText}
                </div>
              )}
            </div>

{currentLesson.type !== 'document' && Array.isArray(currentLesson.content_data?.videos) && currentLesson.content_data.videos.length > 0 && (
              <div className="space-y-6 mt-8">
                {currentLesson.content_data.videos.map((v: any, idx: number) => (
                  <div key={idx} className="not-prose">
                    <BasicVideo 
                      src={v.url}
                      title={v.title || currentLesson.title}
                      description={v.description || currentLesson.description}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
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
          
          <Button 
            onClick={handleNextLesson}
            disabled={currentLesson.type === 'quiz' && (!quizSubmitted || quizScore < (currentLesson.content_data?.passingScore || 80))}
          >
            {currentLessonIndex === totalLessons - 1 ? 'Complete Module' : 'Next Lesson'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Lesson;