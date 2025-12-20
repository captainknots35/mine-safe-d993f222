import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HardHat, CheckCircle, ArrowRight } from 'lucide-react';

export default function EmailConfirmed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-orange-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <HardHat className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MSHA Training Platform</h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Email Verified!</CardTitle>
            <CardDescription className="text-base">
              Thank you for signing up for MineSafe Training
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-muted-foreground">
              <p>Your email has been successfully verified. You're now ready to access professional MSHA-compliant mining safety training.</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-sm">What's next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Browse available training courses</li>
                <li>• Enroll in Part 46 or Part 48 training</li>
                <li>• Complete courses at your own pace</li>
                <li>• Earn MSHA-compliant certificates</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link to="/auth">
                  Sign In to Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/courses">
                  View Available Courses
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help? Contact us at support@minesafetraining.com
        </p>
      </div>
    </div>
  );
}
