import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, HardHat, ArrowLeft } from 'lucide-react';

export default function Auth() {
  const { user, loading, signIn, signUp, resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Redirect if already authenticated
  if (user && !loading) {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HardHat className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MSHA Training Platform</h1>
          <p className="text-gray-600 mt-2">Professional mining safety training and certification</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Access Your Training</CardTitle>
            <CardDescription>
              Sign in to continue your training or create a new account.<br/>
              <span className="text-sm text-muted-foreground mt-2 block">
                Don't have an account? Click "Sign Up" to create one first.
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
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
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full text-sm"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Forgot your password?
                  </Button>
                </form>

                {showForgotPassword && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Reset Password</h4>
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
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
                          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send Reset Link'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowForgotPassword(false);
                            setResetEmail('');
                          }}
                        >
                          Cancel
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
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="your.email@company.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Mining Company Inc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Miner, Supervisor, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Choose a strong password"
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
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
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