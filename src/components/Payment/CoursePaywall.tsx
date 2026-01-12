import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateCheckout, useHasPurchasedCourse } from '@/hooks/useCoursePurchase';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Lock, CheckCircle, Shield, Clock, Award, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CoursePaywallProps {
  courseId: string;
  courseTitle: string;
  courseDescription?: string;
  priceCents: number;
  children: React.ReactNode;
}

export const CoursePaywall = ({ courseId, courseTitle, courseDescription, priceCents, children }: CoursePaywallProps) => {
  const { user, loading: authLoading } = useAuth();
  const { hasPurchased, isLoading: purchaseLoading } = useHasPurchasedCourse(courseId);
  const createCheckout = useCreateCheckout();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  // Format price from cents to dollars
  const priceFormatted = (priceCents / 100).toFixed(0);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createCheckout.mutateAsync({
        courseId,
        successUrl: `${window.location.origin}/dashboard?payment=success`,
        cancelUrl: `${window.location.origin}/courses?payment=cancelled`,
      });

      if (result.url) {
        // Open in new tab for better compatibility with embedded previews
        const newWindow = window.open(result.url, '_blank');
        if (!newWindow) {
          // Fallback if popup blocked
          window.location.href = result.url;
        }
        setIsProcessing(false);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: 'Payment Error',
        description: error.message || 'Failed to start checkout process',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  if (authLoading || purchaseLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (hasPurchased) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl md:text-3xl">
              {courseTitle}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {courseDescription || 'MSHA compliant training course'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">${priceFormatted}</div>
              <p className="text-muted-foreground">One-time payment</p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Full Course Access</p>
                  <p className="text-sm text-muted-foreground">Complete all 4 modules at your own pace</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">MSHA Compliant</p>
                  <p className="text-sm text-muted-foreground">Meets 30 CFR Part 46 requirements</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Track Your Progress</p>
                  <p className="text-sm text-muted-foreground">Time tracking ensures compliance</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-yellow-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Certificate of Completion</p>
                  <p className="text-sm text-muted-foreground">Receive your MSHA training certificate</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={handlePurchase} 
              className="w-full h-12 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {user ? `Purchase Course - $${priceFormatted}` : 'Sign In to Purchase'}
                </>
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              Secure payment powered by Stripe. 
              Your payment information is encrypted and secure.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
