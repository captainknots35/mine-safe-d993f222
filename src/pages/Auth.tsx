import { useState, useEffect } from 'react';
import { Navigate, Link, useSearchParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Loader2, HardHat, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const { t } = useTranslation();
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const getRecoveryParams = () => {
    const searchType = searchParams.get('type');
    const searchAccessToken = searchParams.get('access_token');

    const hashParams = new URLSearchParams((location.hash || '').replace(/^#/, ''));
    const hashType = hashParams.get('type');
    const hashAccessToken = hashParams.get('access_token');

    return {
      type: searchType ?? hashType,
      accessToken: searchAccessToken ?? hashAccessToken,
    };
  };

  // Check for password recovery mode from URL or auth event
  useEffect(() => {
    const { type, accessToken } = getRecoveryParams();

    // Supabase recovery links typically use the URL hash (#access_token=...)
    if (type === 'recovery' || !!accessToken) {
      setIsRecoveryMode(true);
    }

    // Also listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecoveryMode(true);
      }
    });

    return () => subscription.unsubscribe();
    // location.hash changes when Supabase redirects back with tokens
  }, [searchParams, location.hash]);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: t('auth.passwordMismatch'),
        description: t('auth.passwordMismatch'),
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: t('auth.passwordTooShort'),
        description: t('auth.passwordMinLength'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast({
        title: t('auth.passwordUpdateFailed'),
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: t('auth.passwordUpdated'),
        description: t('auth.passwordUpdatedDesc')
      });
      setIsRecoveryMode(false);
      setNewPassword('');
      setConfirmPassword('');
    }

    setIsSubmitting(false);
  };

  // Redirect if already authenticated (but not in recovery mode)
  if (user && !loading && !isRecoveryMode) {
    return <Navigate to="/my-courses" replace />;
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const { error } = await signIn(email, password);
    if (!error) {
      // Redirect handled by auth state change
    }
    
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const companyName = formData.get('companyName') as string;
    const jobTitle = formData.get('jobTitle') as string;
    
    const userData = {
      first_name: firstName,
      last_name: lastName,
      company_name: companyName,
      job_title: jobTitle
    };
    
    await signUp(email, password, userData);
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Password Recovery Mode UI
  if (isRecoveryMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <HardHat className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{t('auth.platformTitle')}</h1>
            <p className="text-gray-600 mt-2">{t('auth.setNewPassword')}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('auth.resetYourPassword')}</CardTitle>
              <CardDescription>
                {t('auth.enterNewPassword')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t('auth.newPassword')}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t('auth.newPassword')}
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('auth.confirmPassword')}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('auth.confirmPassword')}
                    required
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('auth.updatingPassword')}
                    </>
                  ) : (
                    t('auth.updatePassword')
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsRecoveryMode(false)}
                >
                  {t('auth.backToSignIn')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-between items-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.backToHome')}
            </Link>
          </Button>
          <LanguageSwitcher variant="minimal" />
        </div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HardHat className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('auth.platformTitle')}</h1>
          <p className="text-gray-600 mt-2">{t('auth.platformDescription')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('auth.accessTraining')}</CardTitle>
            <CardDescription>
              {t('auth.accessDescription')}<br/>
              <span className="text-sm text-muted-foreground mt-2 block">
                {t('auth.noAccountHint')}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
                <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">{t('auth.email')}</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">{t('auth.password')}</Label>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('auth.signingIn')}
                      </>
                    ) : (
                      t('auth.signIn')
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    {t('auth.forgotPassword')}
                  </Button>
                </form>

                {showForgotPassword && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">{t('auth.resetPassword')}</h4>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder={t('auth.email')}
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={async () => {
                            if (resetEmail) {
                              setIsSubmitting(true);
                              await resetPassword(resetEmail);
                              setIsSubmitting(false);
                              setShowForgotPassword(false);
                              setResetEmail('');
                            }
                          }}
                          disabled={isSubmitting || !resetEmail}
                        >
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t('auth.sendResetLink')}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowForgotPassword(false);
                            setResetEmail('');
                          }}
                        >
                          {t('common.cancel')}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t('auth.firstName')}</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t('auth.lastName')}</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t('auth.email')}</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t('auth.companyName')}</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Mining Company Inc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">{t('auth.jobTitle')}</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Miner, Supervisor, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t('auth.password')}</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Min. 6 characters"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-muted-foreground">
                      {t('auth.passwordMinLength')}
                    </p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('auth.creatingAccount')}
                      </>
                    ) : (
                      t('auth.signUp')
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}