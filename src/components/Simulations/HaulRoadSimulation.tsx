import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, CheckCircle, XCircle, AlertCircle, ArrowLeft, ArrowRight, ArrowUp, Hand } from "lucide-react";

type SimulationState = 'intro' | 'part1-driving' | 'part1-decision' | 'part1-success' | 'part1-failure' | 'part2-backing' | 'part2-signal' | 'success' | 'failure-lost-visual' | 'failure-wrong-signal';

type SpotterSignal = 'back_up' | 'turn_left' | 'stop';

export const HaulRoadSimulation = () => {
  const [state, setState] = useState<SimulationState>('intro');
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [timer, setTimer] = useState(10);

  const signalSequence: SpotterSignal[] = ['back_up', 'turn_left', 'back_up', 'stop'];

  const signalDescriptions = {
    back_up: { icon: ArrowLeft, text: 'Back Up', description: 'Both arms at sides, palms facing forward' },
    turn_left: { icon: ArrowLeft, text: 'Turn Left', description: 'Arm extended horizontally pointing left' },
    stop: { icon: Hand, text: 'Stop', description: 'Arm extended, palm down, held rigidly' }
  };

  useEffect(() => {
    if (state === 'part2-signal' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state, timer]);

  const handleStart = () => {
    setState('part1-driving');
  };

  const handlePart1HoldPosition = () => {
    setState('part1-success');
  };

  const handlePart1TurnRight = () => {
    setState('part1-failure');
  };

  const handleContinuePart2 = () => {
    setState('part2-backing');
    setCurrentSignalIndex(0);
  };

  const handleBeginSpotting = () => {
    setState('part2-signal');
    setTimer(10);
  };

  const handleCorrectResponse = () => {
    if (currentSignalIndex < signalSequence.length - 1) {
      setCurrentSignalIndex(prev => prev + 1);
      setState('part2-backing');
      setTimer(10);
    } else {
      setState('success');
    }
  };

  const handleWrongResponse = () => {
    setState('failure-wrong-signal');
  };

  const handleLostVisual = () => {
    setState('failure-lost-visual');
  };

  const handleReset = () => {
    setState('intro');
    setCurrentSignalIndex(0);
    setTimer(10);
  };

  const getCurrentSignal = () => signalSequence[currentSignalIndex];
  const SignalIcon = signalDescriptions[getCurrentSignal()]?.icon;

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Interactive Simulation 3: Navigating the Haul Road
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === 'intro' && (
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Objective</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Safely operate a large haul truck, recognize blind spot hazards, and correctly interpret spotter hand signals during backing maneuvers.
              </p>
              <h3 className="font-semibold mb-3">Scenario - Part 1: Blind Spot Hazard</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You're driving a 100-ton haul truck along the haul road. A smaller pickup truck will enter your blind spot.
              </p>
              <h3 className="font-semibold mb-3">Scenario - Part 2: Spotter Communication</h3>
              <p className="text-sm text-muted-foreground">
                At the dump point, you must back the truck to a berm using only the hand signals from a spotter visible in your mirrors.
              </p>
            </div>
            <Button onClick={handleStart} className="w-full">
              Begin Simulation
            </Button>
          </div>
        )}

        {state === 'part1-driving' && (
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg">
              <Badge variant="secondary" className="mb-3">Part 1: Blind Spot Awareness</Badge>
              <h3 className="font-semibold mb-3">🚛 Driving on Haul Road</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  You are driving forward. A pickup truck approaches from behind and begins to overtake on your right (passenger) side...
                </p>
                <div className="bg-warning/10 border border-warning/20 p-3 rounded">
                  <p className="font-medium">⚠️ The pickup truck has disappeared from your right-side mirror!</p>
                  <p className="text-xs text-muted-foreground mt-1">It's now in your largest blind spot</p>
                </div>
                <div className="bg-muted p-3 rounded">
                  <p className="font-mono text-xs">📻 Radio: "Driver, pull over to the right shoulder when you have a moment."</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">What do you do?</p>
              <Button onClick={handlePart1TurnRight} variant="outline" className="w-full justify-start h-auto py-3">
                <ArrowRight className="mr-2 h-4 w-4" />
                <span className="text-left">Turn right toward the shoulder as instructed</span>
              </Button>
              <Button onClick={handlePart1HoldPosition} variant="outline" className="w-full justify-start h-auto py-3">
                <Hand className="mr-2 h-4 w-4" />
                <span className="text-left">Hold position and radio back about the blind spot hazard</span>
              </Button>
            </div>
          </div>
        )}

        {state === 'part1-success' && (
          <div className="space-y-4">
            <div className="bg-success/10 border-2 border-success p-6 rounded-lg">
              <CheckCircle className="h-12 w-12 mx-auto mb-3 text-success" />
              <h3 className="text-center font-bold text-success mb-2">Correct Decision!</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-background p-3 rounded">
                  <p className="font-mono text-xs">📻 You: "Negative, holding position. Vehicle in my right-side blind spot."</p>
                </div>
                <p className="text-center text-muted-foreground">
                  After 10 seconds, the pickup truck reappears in front of you.
                </p>
                <div className="bg-background p-3 rounded">
                  <p className="font-mono text-xs">📻 Radio: "Good hold, driver. That pickup is clear now."</p>
                </div>
                <div className="bg-muted p-3 rounded mt-3">
                  <p className="text-xs text-muted-foreground">
                    <strong>Key Learning:</strong> Never maneuver without confirming your path is clear. You recognized the blind spot hazard and held position until it was safe.
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={handleContinuePart2} className="w-full">
              Continue to Part 2: Spotter Communication
            </Button>
          </div>
        )}

        {state === 'part1-failure' && (
          <div className="space-y-4">
            <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg text-center">
              <XCircle className="h-16 w-16 mx-auto mb-4 text-destructive animate-pulse" />
              <h3 className="text-lg font-bold text-destructive mb-2">CRITICAL ERROR</h3>
              <h4 className="font-semibold mb-3">FAILED TO ACCOUNT FOR BLIND SPOT</h4>
              <div className="bg-destructive/20 p-3 rounded border border-destructive mb-4">
                <p className="text-sm font-mono">💥 COLLISION WITH PICKUP TRUCK</p>
              </div>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Critical Lesson:</strong> You turned into the pickup truck that was in your blind spot. Never maneuver without confirming your path is clear. The correct action was to hold position and radio back about the hazard.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}

        {state === 'part2-backing' && (
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg">
              <Badge variant="secondary" className="mb-3">Part 2: Spotter Communication</Badge>
              <h3 className="font-semibold mb-3">🚛 At the Dump Point</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You've arrived at the stockpile. A spotter is positioned to guide you. They are visible in your driver's-side mirror.
              </p>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded">
                <p className="text-sm font-medium text-center">
                  Signal {currentSignalIndex + 1} of {signalSequence.length}
                </p>
              </div>
            </div>
            <Button onClick={handleBeginSpotting} className="w-full">
              Spotter Begins Signaling
            </Button>
          </div>
        )}

        {state === 'part2-signal' && (
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <Badge variant="secondary">Signal {currentSignalIndex + 1}/{signalSequence.length}</Badge>
                <Badge variant="outline">Time: {timer}s</Badge>
              </div>
              
              <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg text-center mb-4">
                {SignalIcon && <SignalIcon className="h-16 w-16 mx-auto mb-3 text-primary" />}
                <h3 className="text-xl font-bold mb-2">{signalDescriptions[getCurrentSignal()].text}</h3>
                <p className="text-sm text-muted-foreground">{signalDescriptions[getCurrentSignal()].description}</p>
              </div>

              <p className="text-sm font-medium mb-3">How do you respond?</p>
              <div className="space-y-2">
                <Button onClick={handleCorrectResponse} variant="outline" className="w-full justify-start">
                  {getCurrentSignal() === 'back_up' && '⬅️ Move in Reverse'}
                  {getCurrentSignal() === 'turn_left' && '↰ Turn Left while Backing'}
                  {getCurrentSignal() === 'stop' && '🛑 Stop Immediately'}
                </Button>
                <Button onClick={handleWrongResponse} variant="outline" className="w-full justify-start">
                  {getCurrentSignal() !== 'turn_left' && '↱ Turn Right'}
                  {getCurrentSignal() !== 'stop' && '➡️ Continue Forward'}
                  {getCurrentSignal() === 'turn_left' && '↱ Turn Right instead'}
                </Button>
                <Button onClick={handleLostVisual} variant="outline" className="w-full justify-start text-destructive">
                  🔄 Turn so spotter is no longer visible
                </Button>
              </div>
            </div>
          </div>
        )}

        {state === 'success' && (
          <div className="space-y-4">
            <div className="bg-success/10 border-2 border-success p-6 rounded-lg text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
              <h3 className="text-lg font-bold text-success mb-2">Maneuver Complete!</h3>
              <p className="text-sm mb-4">
                You successfully backed the haul truck to the berm using proper spotter communication.
              </p>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>Key Learning:</strong> You correctly interpreted all hand signals and maintained visual contact with your spotter throughout the maneuver.
                </p>
                <p className="text-xs text-muted-foreground">
                  Clear communication and mutual understanding of signals is essential for safe equipment operation.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}

        {state === 'failure-lost-visual' && (
          <div className="space-y-4">
            <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-destructive animate-pulse" />
              <h3 className="text-lg font-bold text-destructive mb-2">STOP IMMEDIATELY</h3>
              <h4 className="font-semibold mb-3">VISUAL CONTACT WITH SPOTTER LOST</h4>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Critical Lesson:</strong> The operator must stop the equipment immediately if they lose sight of the spotter for any reason. Never proceed without visual confirmation.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}

        {state === 'failure-wrong-signal' && (
          <div className="space-y-4">
            <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg text-center">
              <XCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-bold text-destructive mb-2">Incorrect Response to Signal</h3>
              <p className="text-sm mb-4">
                Maneuver failed. You did not respond correctly to the spotter's "{signalDescriptions[getCurrentSignal()].text}" signal.
              </p>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Key Learning:</strong> All personnel must use the exact same standardized hand signals. Misinterpretation can lead to deadly accidents.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
