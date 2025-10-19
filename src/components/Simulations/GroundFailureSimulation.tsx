import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';
import { useEffect } from 'react';

export function GroundFailureSimulation() {
  const { state, goToDecisionPoint, updateCustomState, endScenario, incrementSafetyStrikes } = useSimulation();

  const handleChoice = (choice: 'A' | 'B' | 'C', decisionPoint: string) => {
    if (decisionPoint === 'S2-DP01') {
      if (choice === 'B') {
        // Correct: Stop and report
        updateCustomState('reportedHazard', true);
        goToDecisionPoint('S2-DP02');
      } else {
        // Critical failure
        incrementSafetyStrikes();
        goToDecisionPoint('S2-END-FAIL1');
      }
    } else if (decisionPoint === 'S2-DP02') {
      if (choice === 'B') {
        // Correct: Refuse unsafe task
        goToDecisionPoint('S2-DP03');
      } else {
        // Critical failure
        incrementSafetyStrikes();
        goToDecisionPoint('S2-END-FAIL2');
      }
    } else if (decisionPoint === 'S2-DP03') {
      // Success
      endScenario('passed');
      goToDecisionPoint('S2-END-PASS');
    }
  };

  useEffect(() => {
    if (state.currentDecisionPointId.includes('END')) {
      // Scenario ended
      if (state.currentDecisionPointId.includes('PASS')) {
        endScenario('passed');
      } else {
        endScenario('failed');
      }
    }
  }, [state.currentDecisionPointId]);

  if (state.currentDecisionPointId === 'S2-DP01') {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h2 className="text-2xl font-bold">Decision Point 1: Recognizing Ground Instability</h2>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-lg">
              You are operating a front-end loader at the base of a 55-foot highwall after a heavy rainstorm. 
              You notice <strong className="text-destructive">new tension cracks</strong> on the bench above and 
              a small trickle of water seeping from the face that wasn't there before.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold">Learning Objective:</p>
            <p>Recognize and correctly respond to warning signs of imminent ground failure</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold">What do you do?</p>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('A', 'S2-DP01')}
            >
              <span className="font-bold mr-2">A)</span>
              It's probably just settling from the rain. Continue loading—you have a quota to meet.
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('B', 'S2-DP01')}
            >
              <span className="font-bold mr-2">B)</span>
              Stop work immediately, move the loader to a safe distance, and use the radio to report the hazardous conditions.
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('C', 'S2-DP01')}
            >
              <span className="font-bold mr-2">C)</span>
              Quickly finish loading the current truck to meet your quota, then report it at the end of the shift.
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S2-DP02') {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-2xl font-bold">Decision Point 2: Refusing Unsafe Work</h2>
          </div>
          
          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
            <p className="text-success font-semibold">✓ Correct Decision</p>
            <p>You reported the hazard and moved to a safe location. Excellent situational awareness.</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-lg">
              Later, you are assigned to load from a stockpile that has a very steep face. 
              Your supervisor tells you to dig into the base (toe) of the stockpile to get material out faster.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold">Learning Objective:</p>
            <p>Identify and refuse to perform work involving unsafe stockpile procedures</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold">What do you do?</p>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('A', 'S2-DP02')}
            >
              <span className="font-bold mr-2">A)</span>
              Follow the supervisor's instructions and dig into the base (toe) of the stockpile.
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('B', 'S2-DP02')}
            >
              <span className="font-bold mr-2">B)</span>
              Refuse the unsafe task and explain that digging into the toe over-steepens the pile and creates a collapse hazard.
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S2-DP03') {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-2xl font-bold">Final Step: Safe Completion</h2>
          </div>
          
          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
            <p className="text-success font-semibold">✓ Excellent Work</p>
            <p>You refused the unsafe work assignment. Your supervisor reassigns the task with proper ground control measures.</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-lg">
              You have successfully navigated both hazard scenarios. Now proceed to park your equipment safely.
            </p>
          </div>

          <Button 
            className="w-full"
            onClick={() => handleChoice('A', 'S2-DP03')}
          >
            Proceed to Park Equipment
          </Button>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S2-END-PASS') {
    return (
      <Card className="p-8 max-w-4xl mx-auto bg-success/10 border-success">
        <div className="space-y-6 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto" />
          <h1 className="text-3xl font-bold text-success">SCENARIO PASSED</h1>
          
          <div className="bg-background p-6 rounded-lg space-y-4">
            <p className="text-xl font-semibold">Congratulations!</p>
            <p className="text-lg">
              You successfully identified ground instability warning signs, reported them immediately, 
              and refused unsafe work practices. Your adherence to safety protocols prevented a potential fatality.
            </p>
            
            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <p className="font-semibold">Key Learning Points:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Tension cracks and water seepage are critical warning signs of ground failure</li>
                <li>Production quotas never justify working in unsafe conditions</li>
                <li>Digging into the toe of stockpiles over-steepens the face and causes collapses</li>
                <li>Every miner has the right and responsibility to refuse unsafe work</li>
              </ul>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Safety Strikes: {state.safetyStrikes} of 0 allowed</p>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S2-END-FAIL1') {
    return (
      <Card className="p-8 max-w-4xl mx-auto bg-destructive/10 border-destructive">
        <div className="space-y-6 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-3xl font-bold text-destructive">FATALITY</h1>
          
          <div className="bg-background p-6 rounded-lg space-y-4">
            <p className="text-xl font-semibold text-destructive">Critical Failure</p>
            <p className="text-lg">
              You ignored clear warning signs of an unstable highwall. The saturated ground gave way, 
              and the 55-foot highwall collapsed, engulfing your loader. You did not survive.
            </p>
            
            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <p className="font-semibold">What Went Wrong:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-destructive">Tension cracks indicated imminent ground failure</li>
                <li className="text-destructive">Water seepage after rain severely weakens slope stability</li>
                <li className="text-destructive">Production pressure led to dangerous normalization of risk</li>
                <li className="text-destructive">Delaying hazard reporting kept you in the danger zone</li>
              </ul>
              
              <p className="font-semibold mt-4">MSHA Investigation Finding:</p>
              <p className="text-sm italic">
                "The accident was caused by the miner's failure to recognize and respond to obvious signs 
                of ground instability following adverse weather conditions."
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Safety Strikes: {state.safetyStrikes} (Maximum Exceeded)</p>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S2-END-FAIL2') {
    return (
      <Card className="p-8 max-w-4xl mx-auto bg-destructive/10 border-destructive">
        <div className="space-y-6 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-3xl font-bold text-destructive">FATALITY</h1>
          
          <div className="bg-background p-6 rounded-lg space-y-4">
            <p className="text-xl font-semibold text-destructive">Critical Failure</p>
            <p className="text-lg">
              As you dug into the base of the over-steepened stockpile, the pile collapsed. 
              Tons of material buried the front of your loader and crushed the cab. You did not survive.
            </p>
            
            <div className="bg-muted p-4 rounded-lg text-left space-y-2">
              <p className="font-semibold">What Went Wrong:</p>
              <ul className="list-disc list-inside space-y-1">
                <li className="text-destructive">Digging into the toe removes critical support material</li>
                <li className="text-destructive">Over-steepened piles are inherently unstable</li>
                <li className="text-destructive">This was described as "normal mining method" - dangerous normalization</li>
                <li className="text-destructive">You failed to exercise your right to refuse unsafe work</li>
              </ul>
              
              <p className="font-semibold mt-4">MSHA Best Practice:</p>
              <p className="text-sm">
                "Material shall be drawn from stockpiles and surge piles in a manner that minimizes the 
                hazard of material falling or sliding from the top."
              </p>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Safety Strikes: {state.safetyStrikes} (Maximum Exceeded)</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p>Loading simulation...</p>
      </div>
    </Card>
  );
}
