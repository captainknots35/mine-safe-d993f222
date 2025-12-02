import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  Award,
  ArrowRight,
  CheckCircle,
  HardHat
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCourses } from "@/hooks/useCourses";
import { Loader2 } from "lucide-react";

const CoursesOverview = () => {
  const { data: courses, isLoading } = useCourses();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">MineSafe</span>
              <span className="text-xs text-muted-foreground">MSHA Training Platform</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="safety" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            MSHA Certified Programs
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Training Courses
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Comprehensive MSHA Part 46 and Part 48 training programs designed to keep miners safe and compliant.
          </p>
        </div>
      </section>

      {/* Course Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Part 46 */}
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <HardHat className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="default">Available Now</Badge>
                </div>
                <CardTitle className="text-2xl">Part 46 Training</CardTitle>
                <CardDescription className="text-base">
                  Surface Mining & Surface Areas of Underground Mines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Comprehensive training for miners working at surface mines and the surface areas of underground mines. Covers all MSHA 30 CFR Part 46 requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    New Miner Training (24 hours)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Annual Refresher Training (8 hours)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Site-Specific Hazard Training
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Task Training
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Part 48 */}
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <CardTitle className="text-2xl">Part 48 Training</CardTitle>
                <CardDescription className="text-base">
                  Underground Mining Operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Advanced training for miners working in underground coal and metal/non-metal mines. Meets all MSHA 30 CFR Part 48 requirements.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    New Miner Training (40 hours)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Experienced Miner Training (8 hours)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Annual Refresher Training (8 hours)
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    Hazard Training
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Available Courses */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-8">Available Courses</h2>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant={course.type === 'Part 46' ? 'default' : 'secondary'}>
                          {course.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {course.duration_hours}h
                        </div>
                      </div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MineSafe?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">MSHA Compliant</h3>
              <p className="text-muted-foreground">
                All courses meet or exceed MSHA requirements for mining safety training.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Learning</h3>
              <p className="text-muted-foreground">
                Complete your training at your own pace with 24/7 platform access.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Certificates</h3>
              <p className="text-muted-foreground">
                Receive official certificates upon completion with instructor verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Training?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Create an account to enroll in courses and begin your MSHA certification journey.
          </p>
          <Button size="xl" variant="safety" className="text-lg" asChild>
            <Link to="/auth">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-semibold">MineSafe</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © 2024 MineSafe. MSHA compliant training platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CoursesOverview;
