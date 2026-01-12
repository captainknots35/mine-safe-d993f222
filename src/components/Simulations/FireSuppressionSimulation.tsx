import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Flame, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Truck,
  Wind
} from 'lucide-react';

type SimulationStep = 'intro' | 'scenario' | 'actuation' | 'hood_decision' | 'extinguisher' | 'complete';

interface Choice {
  text: string;
  correct: boolean;
  feedback: string;
}

export const FireSuppressionSimulation = () => {
  const [currentStep, setCurrentStep] = useState<SimulationStep>('intro');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const steps: Record<SimulationStep, { title: string; progress: number }> = {
    intro: { title: 'The Hydraulic Torch', progress: 0 },
    scenario: { title: 'Fire Detected', progress: 20 },
    actuation: { title: 'Ground Level Actuator', progress: 40 },
    hood_decision: { title: 'Critical Decision', progress: 60 },
    extinguisher: { title: 'Extinguisher Technique', progress: 80 },
    complete: { title: 'Complete', progress: 100 },
  };

  const handleChoice = (choice: Choice) => {
    setTotalQuestions(prev => prev + 1);
    if (choice.correct) {
      setScore(prev => prev + 1);
    }
    setFeedback({
      type: choice.correct ? 'success' : 'error',
      message: choice.feedback
    });
    
    setTimeout(() => {
      setFeedback(null);
      advanceStep();
    }, 3000);
  };

  const advanceStep = () => {
    const stepOrder: SimulationStep[] = ['intro', 'scenario', 'actuation', 'hood_decision', 'extinguisher', 'complete'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const resetSimulation = () => {
    setCurrentStep('intro');
    setScore(0);
    setTotalQuestions(0);
    setFeedback(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return (
          <div className="space-y-6">
            <Card className="bg-destructive/10 border-destructive/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Flame className="h-10 w-10 text-destructive flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Scenario: The Hydraulic Torch</h3>
                    <p className="text-lg mb-4">
                      You are driving a 100-ton haul truck. You smell something sweet and pungent—hot hydraulic fluid. 
                      Suddenly, a warning light flashes: <strong>LOW HYDRAULIC PRESSURE</strong>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-warning/5 border-warning/20">
              <CardHeader>
                <CardTitle className="text-warning">The Physics of the Fire</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>A hydraulic hose has burst, spraying fluid at <strong>3,000 PSI</strong> onto your turbocharger.</p>
                <p>This isn't a liquid leak—it's an <strong>atomized mist</strong>.</p>
                <p>When that mist hits the <strong>1,000°F exhaust manifold</strong>, it doesn't just burn...</p>
                <p className="text-lg font-bold text-destructive">
                  It ignites with the ferocity of a blowtorch.
                </p>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" onClick={() => setCurrentStep('scenario')}>
                Continue to Emergency Response
              </Button>
            </div>
          </div>
        );

      case 'scenario':
        const scenarioChoices: Choice[] = [
          { text: "Wait for the fire suppression system to trigger automatically", correct: false, feedback: "WRONG. Sensors can be blocked by mud or grease. You cannot wait for the machine to save you. You have seconds to act." },
          { text: "Jump from the cab and run", correct: false, feedback: "Partially correct instinct, but incomplete. You should evacuate, but first—you need to know about the ground level actuator." },
          { text: "Activate the fire suppression system manually", correct: true, feedback: "CORRECT. You have seconds. The fire suppression system (FSS) should trigger automatically, but sensors can fail. You cannot wait." },
        ];
        
        return (
          <div className="space-y-6">
            <Card className="bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  You Have Seconds to Act
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  The fire suppression system (FSS) should trigger automatically, but sensors can be blocked 
                  by mud or grease. What do you do?
                </p>
                <div className="grid gap-3">
                  {scenarioChoices.map((choice, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      className="justify-start h-auto py-4 px-6 text-left"
                      onClick={() => handleChoice(choice)}
                      disabled={feedback !== null}
                    >
                      {choice.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {feedback && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                feedback.type === 'success' ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'
              }`}>
                {feedback.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                <p>{feedback.message}</p>
              </div>
            )}
          </div>
        );

      case 'actuation':
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  The Ground Level Actuator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  Every mining machine has a manual actuation button accessible from the ground 
                  (usually near the ladder or bumper).
                </p>
                
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Interactive Drill:</h4>
                  <p>Imagine you are a bystander seeing this truck smoke. You run to the bumper. 
                  You see the red plunger.</p>
                </div>

                <div className="bg-success/10 border border-success/30 rounded-lg p-4 space-y-2">
                  <h4 className="font-bold text-success">Your Action:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><strong>Pull the Pin</strong></li>
                    <li><strong>Strike the Button</strong></li>
                  </ol>
                  <p className="text-sm mt-2">
                    This punctures a nitrogen cartridge, flooding the engine bay with dry chemical powder. 
                    <strong> You don't need to be in the cab to save the driver.</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" onClick={() => setCurrentStep('hood_decision')}>
                Continue: Critical Decision Point
              </Button>
            </div>
          </div>
        );

      case 'hood_decision':
        const hoodChoices: Choice[] = [
          { text: "Pop the hood to get a clear shot at the flames", correct: false, feedback: "DEADLY WRONG. Opening the hood introduces a massive rush of fresh oxygen. The superheated gases will EXPLODE outward in a backdraft. You will be engulfed in a fireball." },
          { text: "Keep the hood closed and shoot through the grille or wheel wells", correct: true, feedback: "CORRECT! Keep the steel barrier between you and the beast. The fire inside is ventilation-limited—hot, hungry, and waiting for oxygen." },
          { text: "Wait for the fire department", correct: false, feedback: "WRONG. Every second counts. The fire will spread to the fuel tank, tires, and cab. You must act now with proper technique." },
        ];
        
        return (
          <div className="space-y-6">
            <Card className="bg-destructive/10 border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertTriangle className="h-5 w-5" />
                  CRITICAL DECISION POINT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg">
                  The fire is smoldering under the hood. You grab a hand-held extinguisher. 
                  Your instinct is to pop the hood to get a clear shot at the flames.
                </p>
                <div className="bg-destructive text-destructive-foreground p-4 rounded-lg text-center text-2xl font-bold">
                  STOP.
                </div>
                <p><strong>The Science of Flashover:</strong></p>
                <p>
                  The fire inside the engine compartment has consumed most of the oxygen. 
                  It is "ventilation-limited." It is hot, hungry, and <em>waiting</em>.
                </p>
                <p className="font-semibold">What do you do?</p>
                <div className="grid gap-3">
                  {hoodChoices.map((choice, i) => (
                    <Button 
                      key={i}
                      variant="outline" 
                      className="justify-start h-auto py-4 px-6 text-left"
                      onClick={() => handleChoice(choice)}
                      disabled={feedback !== null}
                    >
                      {choice.text}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {feedback && (
              <div className={`p-4 rounded-lg flex items-start gap-3 ${
                feedback.type === 'success' ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'
              }`}>
                {feedback.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                ) : (
                  <Wind className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                )}
                <p>{feedback.message}</p>
              </div>
            )}
          </div>
        );

      case 'extinguisher':
        return (
          <div className="space-y-6">
            <Card className="bg-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Correct Extinguisher Technique
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background border-2 border-success rounded-lg p-6">
                  <h4 className="font-bold mb-3 text-lg">The "Don't Open the Hood" Rule</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Shoot the extinguisher chemical <strong>through the radiator grille</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Or through the <strong>wheel wells</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Keep the <strong>steel barrier between you and the beast</strong></span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <p className="font-semibold">Remember:</p>
                  <p>If you open the hood, you introduce a massive rush of fresh oxygen. 
                  The result is a <strong>backdraft</strong>—superheated gases exploding outward. 
                  You will be engulfed in a fireball.</p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" onClick={() => setCurrentStep('complete')}>
                Complete Training
              </Button>
            </div>
          </div>
        );

      case 'complete':
        const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 100;
        
        return (
          <div className="space-y-6 text-center">
            <div className="py-8">
              <Flame className="h-20 w-20 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">Fire Suppression Training Complete!</h3>
              <p className="text-4xl font-bold text-primary mb-4">
                Score: {percentage}%
              </p>
            </div>

            <Card className="bg-primary/5 border-primary/20 text-left">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-3">Key Survival Points:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Know the location of the ground level actuator on every machine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Pull the pin, strike the button—you don't need to be in the cab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span><strong>NEVER open the hood</strong>—shoot through grille or wheel wells</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span>Backdraft kills—keep the steel barrier between you and the fire</span>
                  </li>
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
        <Badge variant="secondary" className="bg-destructive/10 text-destructive">
          Fire Suppression Simulation
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
