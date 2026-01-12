import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
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
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import heroImage from "@/assets/mining-hero.jpg";

const Index = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Redirect authenticated users to courses
  if (user) {
    return <Navigate to="/my-courses" replace />;
  }

  return (
    <>
      <Helmet>
        <title>MineSafe - MSHA Training Platform | Part 46 & Part 48 Certification</title>
        <meta name="description" content="Professional MSHA Part 46 and Part 48 mining safety training with live virtual classrooms, verified certification, and 100% compliance. Start your training today." />
        <meta name="keywords" content="MSHA training, Part 46 training, Part 48 training, mining safety, mine safety certification, MSHA compliance" />
        <link rel="canonical" href="https://minesafetraining.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="MineSafe - Professional MSHA Training Platform" />
        <meta property="og:description" content="Complete MSHA Part 46 and Part 48 mining safety training with live instruction and verified certification." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://minesafetraining.com/" />
        <meta property="og:site_name" content="MineSafe Training" />
        <meta property="og:image" content="https://minesafetraining.com/og-default.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MineSafe - MSHA Training Platform" />
        <meta name="twitter:description" content="Professional MSHA Part 46 and Part 48 mining safety training." />
        <meta name="twitter:image" content="https://minesafetraining.com/og-default.jpg" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MineSafe",
            "url": "https://minesafetraining.com",
            "logo": "https://minesafetraining.com/og-default.jpg",
            "description": "Professional MSHA Part 46 and Part 48 mining safety training platform",
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-primary">{t('header.brand')}</span>
              <span className="text-xs text-muted-foreground">{t('header.tagline')}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher variant="minimal" />
            <Button variant="ghost" asChild>
              <Link to="/blog">{t('nav.blog')}</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/auth">{t('nav.signIn')}</Link>
            </Button>
            <Button variant="safety" asChild>
              <Link to="/auth">{t('common.getStarted')}</Link>
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
            {t('index.mshaCertified')}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
            {t('index.heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            {t('index.heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="safety" className="text-lg" asChild>
              <Link to="/auth">{t('index.startTraining')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="xl" variant="secondary" className="text-lg bg-white/20 hover:bg-white/30 text-white border-white/20" asChild>
              <Link to="/courses">{t('common.learnMore')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('index.complianceTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('index.complianceDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <HardHat className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{t('index.certifiedCurriculum')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('index.certifiedCurriculumDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>{t('index.liveClassrooms')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('index.liveClassroomsDesc')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-success" />
                </div>
                <CardTitle>{t('index.verifiedCertification')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t('index.verifiedCertificationDesc')}
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
              <div className="text-primary-foreground/80">{t('index.minersTrained')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80">{t('index.passRate')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">{t('index.platformAccess')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80">{t('index.mshaCompliant')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('index.readyToStart')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('index.joinThousands')}
          </p>
          <Button size="xl" variant="safety" className="text-lg" asChild>
            <Link to="/auth">{t('index.accessTrainingPlatform')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-semibold">{t('header.brand')}</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
};

export default Index;