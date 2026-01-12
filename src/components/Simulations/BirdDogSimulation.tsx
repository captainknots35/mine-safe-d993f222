import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Truck, 
  Radio, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ArrowRight,
  Siren
} from 'lucide-react';

type SimulationStep = 'intro' | 'intercept' | 'meet' | 'brief' | 'tether' | 'complete';

export const BirdDogSimulation = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('intro');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const steps: Record<SimulationStep, { title: string; progress: number }> = {
    intro: { title: 'Scenario Introduction', progress: 0 },
    intercept: { title: 'Step 1: The Intercept', progress: 20 },
    meet: { title: 'Step 2: Meet and Greet', progress: 40 },
    brief: { title: 'Step 3: The Briefing', progress: 60 },
    tether: { title: 'Step 4: The Tether', progress: 80 },
    complete: { title: 'Protocol Complete', progress: 100 },
  };

  const handleChoice = (correct: boolean, feedbackMsg: string) => {
    setFeedback(feedbackMsg);
    if (correct) {
      setScore(prev => prev + 25);
      setTimeout(() => {
        setFeedback(null);
        advanceStep();
      }, 2000);
    }
  };

  const advanceStep = () => {
    const stepOrder: SimulationStep[] = ['intro', 'intercept', 'meet', 'brief', 'tether', 'complete'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const resetSimulation = () => {
    setCurrentStep('intro');
    setScore(0);
    setFeedback(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="space-y-6">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-destructive mb-2">EMERGENCY SCENARIO</h3>
                  <p className="text-lg">
                    It is 2:15 PM on a blistering Tuesday. You are operating a dozer on the South Bench. 
                    Suddenly, over the radio, you hear a frantic voice:
                  </p>
                  <blockquote className="mt-4 border-l-4 border-destructive pl-4 italic text-lg">
                    "Jimmy's hurt bad! He's at the primary! Get help!"
                  </blockquote>
                </div>
              </div>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-warning" />
                  The Problem
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• The "Primary" is 3 miles from the main gate</li>
                  <li>• Down a maze of unmapped haul roads</li>
                  <li>• The county ambulance driver has never been on your site</li>
                  <li>• Their GPS shows your pit as a blank grey void</li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-lg font-semibold mb-4">You are designated as the "Bird Dog"</p>
              <p className="text-muted-foreground mb-6">
                The term comes from aviation—a small, agile plane that guides heavy bombers to a target. 
                In mining, you intercept the ambulance at the gate and physically lead them to the victim.
              </p>
              <Button size="lg" onClick={() => setCurrentStep('intercept')}>
                Begin Protocol <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        );

      case 'intercept':
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-6 w-6" />
                  Step 1: The Intercept
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  The ambulance has been dispatched and is en route. What is your first action?
                </p>
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(true, "Correct! Drive to the main gate immediately. Turn on flashers and strobes. You are the beacon.")}
                  >
                    <CheckCircle className="h-5 w-5 mr-3 text-success opacity-0" />
                    Drive your pickup to the main gate immediately. Turn on flashers and strobes.
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. Staying at the scene wastes the 'Golden Hour'. Someone must guide the ambulance through the site.")}
                  >
                    Stay at the accident scene to help the victim directly
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. GPS doesn't work in the pit—you need to physically lead them.")}
                  >
                    Radio the ambulance with GPS coordinates
                  </Button>
                </div>
              </CardContent>
            </Card>
            {feedback && (
              <div className={`p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'}`}>
                <p className="font-medium">{feedback}</p>
              </div>
            )}
          </div>
        );

      case 'meet':
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Siren className="h-6 w-6" />
                  Step 2: Meet and Greet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  The ambulance arrives at the main gate. What do you do?
                </p>
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. Never just wave them through—they'll get lost.")}
                  >
                    Wave them through the gate and let them follow your dust
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(true, "Correct! Stop them. Pull up alongside window-to-window for direct communication.")}
                  >
                    Stop them completely. Pull up alongside window-to-window.
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. Radio communication isn't reliable—you need face-to-face contact.")}
                  >
                    Radio them instructions while driving ahead
                  </Button>
                </div>
              </CardContent>
            </Card>
            {feedback && (
              <div className={`p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'}`}>
                <p className="font-medium">{feedback}</p>
              </div>
            )}
          </div>
        );

      case 'brief':
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-6 w-6" />
                  Step 3: The Briefing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  You're now window-to-window with the ambulance crew. What do you tell them?
                </p>
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. Too vague. They need specific instructions about following and terrain.")}
                  >
                    "Just follow me, it's not far"
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(true, "Correct! Clear, specific instructions: Follow, stay in tracks, terrain warning, don't deviate.")}
                  >
                    "Follow me. Stay in my tracks. The ramp is steep and slippery. Do not deviate."
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. This wastes critical time and they can't study while responding.")}
                  >
                    Provide a detailed map of the entire mine site
                  </Button>
                </div>
              </CardContent>
            </Card>
            {feedback && (
              <div className={`p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'}`}>
                <p className="font-medium">{feedback}</p>
              </div>
            )}
          </div>
        );

      case 'tether':
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Step 4: The Tether
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6">
                  You're now leading the ambulance through the mine. How do you drive?
                </p>
                <div className="grid gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. Going too fast means they can't keep up or might crash on unfamiliar terrain.")}
                  >
                    Drive as fast as possible—time is critical
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(false, "Incorrect. Stops waste precious time from the 'Golden Hour'.")}
                  >
                    Stop at each intersection to make sure they're following
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-4 px-6 text-left"
                    onClick={() => handleChoice(true, "Correct! You are their eyes. Drive at a speed they can handle—you're tethered together.")}
                  >
                    Drive at a speed the ambulance can handle. You are their eyes.
                  </Button>
                </div>
              </CardContent>
            </Card>
            {feedback && (
              <div className={`p-4 rounded-lg ${feedback.includes('Correct') ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'}`}>
                <p className="font-medium">{feedback}</p>
              </div>
            )}
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-6 text-center">
            <div className="py-8">
              <CheckCircle className="h-20 w-20 mx-auto text-success mb-4" />
              <h3 className="text-2xl font-bold mb-2">Bird Dog Protocol Complete!</h3>
              <p className="text-lg text-muted-foreground mb-4">
                You successfully guided the ambulance to the victim.
              </p>
              <div className="text-4xl font-bold text-primary mb-6">
                Score: {score}%
              </div>
            </div>

            <Card className="bg-warning/10 border-warning/30 text-left">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Key Takeaways:</h4>
                <ul className="space-y-2">
                  <li>✓ The Bird Dog physically leads emergency vehicles through the site</li>
                  <li>✓ Window-to-window contact ensures clear communication</li>
                  <li>✓ Specific instructions: "Follow me, stay in my tracks, do not deviate"</li>
                  <li>✓ Drive at a pace they can handle—you are their eyes</li>
                  <li>✓ Without you, the "Golden Hour" runs out</li>
                </ul>
              </CardContent>
            </Card>

            <Button variant="outline" onClick={resetSimulation}>
              Restart Simulation
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Bird Dog Protocol Simulation
        </Badge>
        <Badge variant="outline">
          {steps[currentStep].title}
        </Badge>
      </div>

      <Progress value={steps[currentStep].progress} className="h-2" />

      {renderStep()}
    </div>
  );
};
