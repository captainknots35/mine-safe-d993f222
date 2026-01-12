import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Layout/Header';
import { CourseCard } from '@/components/Courses/CourseCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useCourses, useEnrollInCourse } from '@/hooks/useCourses';
import { useToast } from '@/hooks/use-toast';
import { Search, Filter, Clock, Users, Award, Loader2 } from 'lucide-react';

export default function Courses() {
  const { t } = useTranslation();
  const { user, userRole, profile } = useAuth();
  const { data: courses, isLoading } = useCourses();
  const enrollInCourse = useEnrollInCourse();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'Part 46' | 'Part 48'>('all');

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse(courseId);
      toast({
        title: t('courses.enrolled'),
        description: t('courses.enrolled')
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Enrollment failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || course.type === selectedType;
    return matchesSearch && matchesType;
  }) || [];

  const userName = profile ? `${profile.first_name} ${profile.last_name}` : user?.email || 'User';
  const validUserRole = (userRole as 'admin' | 'instructor' | 'miner') || 'miner';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header userRole={validUserRole} userName={userName} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={validUserRole} userName={userName} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{t('courses.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('courses.description')}
          </p>
        </div>

        {/* Phase 1 Focus Banner */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">{t('courses.phase1Banner')}</h3>
                <p className="text-muted-foreground">
                  {t('courses.phase1Description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('courses.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as any)} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">{t('courses.allCourses')}</TabsTrigger>
              <TabsTrigger value="Part 46">{t('courses.part46')}</TabsTrigger>
              <TabsTrigger value="Part 48">{t('courses.part48')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Course Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-2xl">{courses?.reduce((acc, course) => acc + course.duration_hours, 0) || 0}</CardTitle>
              <p className="text-sm text-muted-foreground">{t('courses.totalTrainingHours')}</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Users className="h-8 w-8 mx-auto text-accent mb-2" />
              <CardTitle className="text-2xl">{filteredCourses.length}</CardTitle>
              <p className="text-sm text-muted-foreground">{t('courses.availableCourses')}</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <Award className="h-8 w-8 mx-auto text-success mb-2" />
              <CardTitle className="text-2xl">100%</CardTitle>
              <p className="text-sm text-muted-foreground">{t('courses.mshaCompliant')}</p>
            </CardHeader>
          </Card>
        </div>

        {/* Course Grid */}
        <div className="grid gap-6">
          {filteredCourses.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">{t('courses.noCoursesFound')}</p>
              <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedType('all'); }}>
                {t('common.clearFilters')}
              </Button>
            </Card>
          ) : (
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description || ''}
                type={course.type}
                duration={course.duration_hours}
                status="available"
                userRole={validUserRole}
                isComingSoon={course.type !== 'Part 46'}
                onEnroll={() => handleEnroll(course.id)}
                onContinue={() => console.log('Continue course:', course.id)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}