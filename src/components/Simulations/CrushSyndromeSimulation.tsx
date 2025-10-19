import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, Loader2, Heart, Clock } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';
import { useEffect } from 'react';

export function CrushSyndromeSimulation() {
  const { state, goToDecisionPoint, updateCustomState, endScenario, incrementSafetyStrikes } = useSimulation();

  const handleChoice = (choice: 'A' | 'B' | 'C', decisionPoint: string) => {
    if (decisionPoint === 'S3-DP01') {
      if (choice === 'A') {
        // Correct: Ask about duration
        updateCustomState('knowsDuration', true);
        updateCustomState('entrapmentDuration', 22); // 20-25 minutes
        goToDecisionPoint('S3-DP02');
      } else {
        // Suboptimal but continue
        incrementSafetyStrikes();
        goToDecisionPoint('S3-DP02-ALT');
      }
    } else if (decisionPoint === 'S3-DP02') {
      if (choice === 'B') {
        // Correct: DO NOT LIFT (>15 minutes)
        goToDecisionPoint('S3-DP03');
      } else {
        // Critical failure
        incrementSafetyStrikes();
        goToDecisionPoint('S3-END-FAIL1');
      }
    } else if (decisionPoint === 'S3-DP03') {
      // Success
      endScenario('passed');
      goToDecisionPoint('S3-END-PASS');
    }
  };

  useEffect(() => {
    if (state.currentDecisionPointId.includes('END')) {
      if (state.currentDecisionPointId.includes('PASS')) {
        endScenario('passed');
      } else {
        endScenario('failed');
      }
    }
  }, [state.currentDecisionPointId]);

  if (state.currentDecisionPointId === 'S3-DP01') {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <h2 className="text-2xl font-bold">Decision Point 1: Critical Information Gathering</h2>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-lg">
              You are the first to arrive at a haul truck rollover. The operator is conscious but his leg is 
              <strong className="text-destructive"> pinned under the truck bed</strong>. He is in severe pain 
              and calling out for help.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Learning Objective:
            </p>
            <p>Gather critical information to determine the correct medical protocol for crush injuries</p>
          </div>

          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
            <p className="font-semibold text-destructive">Critical Warning:</p>
            <p>For crush injuries, <strong>TIME is the most critical factor</strong> in determining safe rescue protocol. 
            The 15-minute threshold determines life or death.</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold">What is your FIRST question to the trapped miner?</p>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('A', 'S3-DP01')}
            >
              <span className="font-bold mr-2">A)</span>
              "How long have you been trapped?"
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('B', 'S3-DP01')}
            >
              <span className="font-bold mr-2">B)</span>
              "Are you bleeding anywhere else?"
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('C', 'S3-DP01')}
            >
              <span className="font-bold mr-2">C)</span>
              "Don't worry, we'll have you out in no time."
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S3-DP02') {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-destructive" />
            <h2 className="text-2xl font-bold">Decision Point 2: The 15-Minute Protocol</h2>
          </div>
          
          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
            <p className="text-success font-semibold">✓ Correct Question</p>
            <p>You immediately identified the most critical information needed for a crush injury response.</p>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-3">
            <p className="text-lg">
              The trapped miner tells you: <strong>"I've been stuck here for at least 20-25 minutes."</strong>
            </p>
            <p className="text-lg">
              A front-end loader arrives on scene, capable of lifting the truck off him immediately. 
              He's in pain and desperately wants to be freed.
            </p>
          </div>

          <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20 space-y-2">
            <p className="font-semibold text-destructive flex items-center gap-2">
              <Clock className="h-5 w-5" />
              CRITICAL: Entrapment Duration &gt; 15 Minutes
            </p>
            <div className="text-sm space-y-1">
              <p><strong>What happens if you release now:</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Muscle cells have been dying for 20+ minutes</li>
                <li>Toxic potassium and myoglobin trapped in the leg</li>
                <li>Sudden release = toxin surge into bloodstream</li>
                <li>Result: Immediate cardiac arrest or kidney failure</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="font-semibold">Learning Objective:</p>
            <p>Apply the counter-intuitive time-based protocol that subordinates instinct to medical knowledge</p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold">What do you do?</p>
            
            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4"
              onClick={() => handleChoice('A', 'S3-DP02')}
            >
              <span className="font-bold mr-2">A)</span>
              Use the loader to lift the truck immediately. He's in pain and needs to be freed now.
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start text-left h-auto py-4 border-success/50 bg-success/5"
              onClick={() => handleChoice('B', 'S3-DP02')}
            >
              <span className="font-bold mr-2">B)</span>
              DO NOT LIFT THE TRUCK. Keep the victim warm, offer reassurance, and wait for paramedics to administer IV fluids before release.
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S3-DP03') {
    return (
      <Card className="p-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-success" />
            <h2 className="text-2xl font-bold">Medical Protocol: Awaiting Paramedics</h2>
          </div>
          
          <div className="bg-success/10 p-4 rounded-lg border border-success/20">
            <p className="text-success font-semibold">✓ Correct Decision - Life Saved</p>
            <p>You resisted the powerful instinct to immediately free the victim. This decision saved his life.</p>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-3">
            <p className="text-lg">
              Paramedics arrive within 8 minutes. They start an IV line and administer fluids to counteract 
              the toxins that have built up in the crushed tissue. After several minutes of preparation, 
              they give you the all-clear to lift the truck.
            </p>
            <p className="text-lg font-semibold">
              The victim is transported to the hospital and makes a full recovery.
            </p>
          </div>

          <Button 
            className="w-full"
            onClick={() => handleChoice('A', 'S3-DP03')}
          >
            Complete Scenario
          </Button>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S3-END-PASS') {
    return (
      <Card className="p-8 max-w-4xl mx-auto bg-success/10 border-success">
        <div className="space-y-6 text-center">
          <CheckCircle className="h-16 w-16 text-success mx-auto" />
          <h1 className="text-3xl font-bold text-success">SCENARIO PASSED - LIFE SAVED</h1>
          
          <div className="bg-background p-6 rounded-lg space-y-4">
            <p className="text-xl font-semibold">Outstanding Work!</p>
            <p className="text-lg">
              You successfully applied the counter-intuitive 15-minute protocol for crush injuries. 
              By subordinating your natural instinct to disciplined medical knowledge, you prevented 
              a fatal case of Crush Syndrome.
            </p>
            
            <div className="bg-muted p-4 rounded-lg text-left space-y-3">
              <p className="font-semibold">Key Learning Points:</p>
              <div className="space-y-2 text-sm">
                <div className="border-l-4 border-success pl-3">
                  <p className="font-semibold">If entrapment &lt; 15 minutes:</p>
                  <p>Release victim immediately - toxins haven't built up yet</p>
                </div>
                <div className="border-l-4 border-destructive pl-3">
                  <p className="font-semibold">If entrapment &gt; 15 minutes OR duration unknown:</p>
                  <p>DO NOT RELEASE - wait for paramedics to administer IV fluids first</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded">
                <p className="font-semibold">Why This Matters:</p>
                <p className="text-sm">When crushed muscle is compressed for prolonged periods, dead cells release 
                potassium and myoglobin. Sudden release floods these toxins into the bloodstream, causing 
                immediate cardiac arrest or kidney failure. IV fluids must be administered BEFORE release to 
                counteract the toxin surge.</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">Safety Strikes: {state.safetyStrikes} of 0 allowed</p>
          </div>
        </div>
      </Card>
    );
  }

  if (state.currentDecisionPointId === 'S3-END-FAIL1') {
    return (
      <Card className="p-8 max-w-4xl mx-auto bg-destructive/10 border-destructive">
        <div className="space-y-6 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto" />
          <h1 className="text-3xl font-bold text-destructive">FATALITY - CRUSH SYNDROME</h1>
          
          <div className="bg-background p-6 rounded-lg space-y-4">
            <p className="text-xl font-semibold text-destructive">Critical Failure</p>
            <p className="text-lg">
              You lifted the truck. The sudden release of pressure sent a surge of toxins from his crushed 
              leg into his bloodstream. Within seconds, his heart stopped beating. Your attempt to help was fatal.
            </p>
            
            <div className="bg-muted p-4 rounded-lg text-left space-y-3">
              <p className="font-semibold">What Went Wrong:</p>
              <ul className="list-disc list-inside space-y-1 text-destructive">
                <li>Entrapment duration was 20-25 minutes (&gt;15 minute threshold)</li>
                <li>Dead muscle cells had released toxic potassium and myoglobin</li>
                <li>Sudden release flooded toxins into central circulation</li>
                <li>Toxin surge caused immediate fatal cardiac arrhythmia</li>
                <li>Natural instinct to "help immediately" overrode medical protocol</li>
              </ul>
              
              <div className="mt-4 p-3 bg-destructive/10 rounded border border-destructive/20">
                <p className="font-semibold">Medical Fact:</p>
                <p className="text-sm">
                  "Crush Syndrome has a mortality rate of 40-50% if toxins are released without prior 
                  IV fluid administration. The first 15 minutes of entrapment are the critical decision 
                  point. After 15 minutes, DO NOT RELEASE until medical intervention."
                </p>
              </div>

              <div className="mt-4 p-3 bg-success/10 rounded border border-success/20">
                <p className="font-semibold text-success">The Correct Protocol:</p>
                <p className="text-sm">
                  Keep victim warm and immobile. Reassure them. Explain why you cannot lift yet. 
                  Wait for paramedics to start IV fluids to counteract toxins BEFORE releasing the crushing force.
                </p>
              </div>
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
