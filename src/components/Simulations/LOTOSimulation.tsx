import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Lock, XCircle } from "lucide-react";

type SimulationState = 'intro' | 'mcc' | 'action-choice' | 'verification' | 'success' | 'failure-wrong-disconnect' | 'failure-skipped-try';

export const LOTOSimulation = () => {
  const [state, setState] = useState<SimulationState>('intro');
  const [selectedDisconnect, setSelectedDisconnect] = useState<string | null>(null);
  const [lockApplied, setLockApplied] = useState(false);

  const disconnects = [
    'Pump 1A',
    'Conveyor #4',
    'Crusher Feed Belt',
    'Conveyor #3', // Correct one
    'Ventilation Fan',
    'Screening Plant',
    'Secondary Crusher',
    'Wash Plant',
    'Conveyor #2',
    'Dust Suppression'
  ];

  const handleStart = () => {
    setState('mcc');
  };

  const handleSelectDisconnect = (disconnect: string) => {
    setSelectedDisconnect(disconnect);
  };

  const handleApplyLock = () => {
    if (!selectedDisconnect) return;
    setLockApplied(true);
    setState('action-choice');
  };

  const handleVerificationChoice = () => {
    setState('verification');
  };

  const handleSkipVerification = () => {
    setState('failure-skipped-try');
  };

  const handleTryStart = () => {
    if (selectedDisconnect === 'Conveyor #3') {
      setState('success');
    } else {
      setState('failure-wrong-disconnect');
    }
  };

  const handleReset = () => {
    setState('intro');
    setSelectedDisconnect(null);
    setLockApplied(false);
  };

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Interactive Simulation 1: The Virtual LOTO Procedure
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === 'intro' && (
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Objective</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You must correctly perform a complete LOTO procedure on a virtual conveyor belt drive motor to prepare for a coupling replacement.
              </p>
              <h3 className="font-semibold mb-3">Scenario</h3>
              <p className="text-sm text-muted-foreground">
                You are standing in front of Conveyor #3. A work order on your tablet instructs you to lock out the system for maintenance. You must navigate to the Motor Control Center (MCC) and identify the correct disconnect from a panel of similar switches.
              </p>
            </div>
            <Button onClick={handleStart} className="w-full">
              Begin Simulation
            </Button>
          </div>
        )}

        {state === 'mcc' && (
          <div className="space-y-4">
            <div className="bg-background p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Motor Control Center</h3>
              <p className="text-sm text-muted-foreground">
                You are at the MCC wall. Identify and select the correct disconnect for <strong>Conveyor #3</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {disconnects.map((disconnect) => (
                <Button
                  key={disconnect}
                  variant={selectedDisconnect === disconnect ? "default" : "outline"}
                  onClick={() => handleSelectDisconnect(disconnect)}
                  className="h-auto py-4 text-sm"
                >
                  <div className="text-center">
                    <div className="font-mono text-xs mb-1">{disconnect}</div>
                    {selectedDisconnect === disconnect && (
                      <Badge variant="secondary" className="text-xs mt-1">Selected</Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleApplyLock} 
              disabled={!selectedDisconnect}
              className="w-full"
            >
              Apply Lock & Tag to {selectedDisconnect || 'Selected Disconnect'}
            </Button>
          </div>
        )}

        {state === 'action-choice' && (
          <div className="space-y-4">
            <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
              <p className="text-sm font-medium">
                Lock and Tag applied to <strong>{selectedDisconnect}</strong>
              </p>
            </div>
            
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p className="text-sm font-medium">What is your next action?</p>
              </div>
            </div>

            <div className="grid gap-3">
              <Button onClick={handleVerificationChoice} variant="outline" className="h-auto py-4">
                <div className="text-left">
                  <div className="font-semibold mb-1">Return to conveyor and attempt to start it</div>
                  <div className="text-xs text-muted-foreground">Verify the energy isolation (The "Try" Step)</div>
                </div>
              </Button>
              
              <Button onClick={handleSkipVerification} variant="outline" className="h-auto py-4">
                <div className="text-left">
                  <div className="font-semibold mb-1">Return to conveyor and begin work</div>
                  <div className="text-xs text-muted-foreground">Skip verification and start maintenance</div>
                </div>
              </Button>
            </div>
          </div>
        )}

        {state === 'verification' && (
          <div className="space-y-4">
            <div className="bg-background p-4 rounded-lg">
              <p className="text-sm mb-4">
                You have returned to the conveyor control panel. Press the START button to verify the isolation.
              </p>
            </div>
            
            <Button onClick={handleTryStart} className="w-full" size="lg">
              Press START Button
            </Button>
          </div>
        )}

        {state === 'success' && (
          <div className="space-y-4">
            <div className="bg-success/10 border-2 border-success p-6 rounded-lg text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
              <h3 className="text-lg font-bold text-success mb-2">VERIFIED ZERO ENERGY STATE</h3>
              <p className="text-sm mb-4">
                The conveyor did not move. The system is safely locked out. You may proceed with maintenance.
              </p>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Key Learning:</strong> The "Try" step confirmed you locked out the correct energy source. This verification is critical and must never be skipped.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}

        {state === 'failure-wrong-disconnect' && (
          <div className="space-y-4">
            <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg text-center">
              <XCircle className="h-16 w-16 mx-auto mb-4 text-destructive" />
              <h3 className="text-lg font-bold text-destructive mb-2">NEAR MISS!</h3>
              <h4 className="font-semibold mb-2">INCORRECT ENERGY SOURCE ISOLATED</h4>
              <p className="text-sm mb-4">
                The conveyor started because you locked out <strong>{selectedDisconnect}</strong> instead of <strong>Conveyor #3</strong>.
              </p>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Key Learning:</strong> The "Try" step just saved your life. Without it, you would have begun work on energized equipment. Always verify before starting work.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}

        {state === 'failure-skipped-try' && (
          <div className="space-y-4">
            <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg">
              <div className="text-center mb-4">
                <AlertCircle className="h-16 w-16 mx-auto mb-4 text-destructive animate-pulse" />
                <h3 className="text-lg font-bold text-destructive mb-2">FATAL ERROR</h3>
                <h4 className="font-semibold mb-2">VERIFICATION STEP SKIPPED</h4>
              </div>
              <div className="bg-background p-4 rounded mb-4">
                <p className="text-sm mb-3">
                  You are preparing to work on the motor coupling. Suddenly, a simulated arc flash erupts from the junction box...
                </p>
                <div className="bg-destructive/20 p-3 rounded border border-destructive">
                  <p className="text-xs font-mono text-destructive">
                    ⚡ ARC FLASH EVENT ⚡
                  </p>
                </div>
              </div>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>What happened?</strong> An unidentified secondary energy source was present. A coworker in another area reset a main breaker that back-fed the circuit.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Critical Lesson:</strong> The "Try" step would have revealed this hazard. NEVER skip verification. It's not locked out until you've tried it out!
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
