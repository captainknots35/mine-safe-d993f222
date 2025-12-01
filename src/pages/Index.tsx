import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  HardHat,
  BookOpen,
  Award
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link, Navigate } from "react-router-dom";
import heroImage from "@/assets/mining-hero.jpg";

const Index = () => {
  const { user } = useAuth();

  // Redirect authenticated users to courses
  if (user) {
    return <Navigate to="/my-courses" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">MineSafe Learn</span>
              <span className="text-xs text-muted-foreground">MSHA Training Platform</span>
            </div>
          </div>
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 z-10"></div>
        <img 
          src={heroImage} 
          alt="Mining safety training" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 container mx-auto px-4 py-24 text-center text-white">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/20 mb-6">
            MSHA Certified Training Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Mining<br />Safety Training
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            Complete your MSHA Part 46 and Part 48 training requirements with our 
            comprehensive, compliant digital platform featuring live instruction and verified certification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="safety" className="text-lg" asChild>
              <Link to="/auth">Start Training <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="xl" variant="secondary" className="text-lg bg-white/20 hover:bg-white/30 text-white border-white/20" asChild>
              <Link to="/courses">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete MSHA Compliance Made Simple
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform meets all MSHA requirements while providing a modern, 
              engaging learning experience for miners and instructors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <HardHat className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>MSHA Certified Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Comprehensive Part 46 and Part 48 training programs designed by safety experts 
                  and approved by MSHA standards.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Live Virtual Classrooms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interactive live sessions with certified instructors, featuring real-time 
                  proctoring and identity verification for complete compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-success" />
                </div>
                <CardTitle>Verified Certification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Digital certificates with instructor signatures and complete audit trails 
                  for MSHA compliance and mine site requirements.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-primary-foreground/80">Miners Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">Platform Access</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80">MSHA Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of miners who have completed their MSHA training 
            requirements through our platform.
          </p>
          <Button size="xl" variant="safety" className="text-lg" asChild>
            <Link to="/auth">Access Training Platform <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-semibold">MineSafe Learn</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MineSafe Learn. MSHA compliant training platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
