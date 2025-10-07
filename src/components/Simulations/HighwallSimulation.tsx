import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Mountain, XCircle } from "lucide-react";

type Hazard = {
  id: string;
  name: string;
  found: boolean;
  correctId: string;
  correctAction: string;
};

type SimulationState = 'intro' | 'inspection' | 'identifying' | 'success' | 'failure';

export const HighwallSimulation = () => {
  const [state, setState] = useState<SimulationState>('intro');
  const [currentHazardIndex, setCurrentHazardIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [hazards, setHazards] = useState<Hazard[]>([
    {
      id: 'tensionCrack',
      name: 'New tension crack at crest',
      found: false,
      correctId: 'Tension Crack',
      correctAction: 'Barricade and post the area immediately'
    },
    {
      id: 'widenedCrack',
      name: 'Existing crack that is wider',
      found: false,
      correctId: 'Widened Existing Crack',
      correctAction: 'Report to supervisor immediately'
    },
    {
      id: 'waterSeepage',
      name: 'Water seeping from rock seam',
      found: false,
      correctId: 'Water Seepage',
      correctAction: 'Monitor closely and report for scaling'
    },
    {
      id: 'rockfall',
      name: 'Fresh rockfall at toe',
      found: false,
      correctId: 'Fresh Rockfall',
      correctAction: 'Scale loose material from safe position'
    },
    {
      id: 'undercut',
      name: 'Undercut section from erosion',
      found: false,
      correctId: 'Undercut Base',
      correctAction: 'Barricade and schedule immediate remediation'
    }
  ]);

  const identificationOptions = [
    'Tension Crack',
    'Widened Existing Crack',
    'Water Seepage',
    'Fresh Rockfall',
    'Undercut Base',
    'Overhang',
    'Sloughing Material'
  ];

  const actionOptions = [
    'Barricade and post the area immediately',
    'Report to supervisor immediately',
    'Monitor closely and report for scaling',
    'Scale loose material from safe position',
    'Barricade and schedule immediate remediation',
    'Continue inspection - no action needed',
    'Begin scaling from below'
  ];

  const [selectedIdentification, setSelectedIdentification] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [showIdentificationResult, setShowIdentificationResult] = useState(false);

  const handleStart = () => {
    setState('inspection');
  };

  const handleHazardClick = (index: number) => {
    setCurrentHazardIndex(index);
    setState('identifying');
    setSelectedIdentification('');
    setSelectedAction('');
    setShowIdentificationResult(false);
  };

  const handleIdentificationSubmit = () => {
    if (!selectedIdentification || currentHazardIndex === null) return;
    
    const currentHazard = hazards[currentHazardIndex];
    if (selectedIdentification === currentHazard.correctId) {
      setShowIdentificationResult(true);
    } else {
      setShowIdentificationResult(true);
    }
  };

  const handleActionSubmit = () => {
    if (!selectedAction || currentHazardIndex === null) return;
    
    const currentHazard = hazards[currentHazardIndex];
    const isCorrect = selectedIdentification === currentHazard.correctId && 
                     selectedAction === currentHazard.correctAction;
    
    if (isCorrect) {
      setScore(prev => prev + 20);
      const updatedHazards = [...hazards];
      updatedHazards[currentHazardIndex].found = true;
      setHazards(updatedHazards);
    }
    
    setState('inspection');
    setCurrentHazardIndex(null);
  };

  const handleCompleteExam = () => {
    const tensionCrackFound = hazards.find(h => h.id === 'tensionCrack')?.found;
    
    if (!tensionCrackFound) {
      setState('failure');
    } else {
      setState('success');
    }
  };

  const handleReset = () => {
    setState('intro');
    setScore(0);
    setHazards(hazards.map(h => ({ ...h, found: false })));
    setCurrentHazardIndex(null);
  };

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mountain className="h-5 w-5" />
          Interactive Simulation 2: Highwall Hazard Identification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {state === 'intro' && (
          <div className="space-y-4">
            <div className="bg-background p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Objective</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Conduct a thorough workplace examination of a highwall following a heavy rainstorm and correctly identify all new or worsening ground control hazards.
              </p>
              <h3 className="font-semibold mb-3">Scenario</h3>
              <p className="text-sm text-muted-foreground">
                You must perform the morning ground conditions exam. The environment is damp with puddles, indicating recent rainfall. You must inspect from multiple vantage points and identify hazards.
              </p>
            </div>
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Critical:</strong> Missing the tension crack at the crest will result in catastrophic failure.
              </p>
            </div>
            <Button onClick={handleStart} className="w-full">
              Begin Inspection
            </Button>
          </div>
        )}

        {state === 'inspection' && (
          <div className="space-y-4">
            <div className="bg-background p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">Highwall Inspection</h3>
                <Badge variant="secondary">Score: {score}/100</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Click on each hazard area to identify and tag the hazard. You must find all {hazards.length} hazards.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {hazards.map((hazard, index) => (
                <Button
                  key={hazard.id}
                  variant={hazard.found ? "default" : "outline"}
                  onClick={() => handleHazardClick(index)}
                  disabled={hazard.found}
                  className="h-auto py-4 justify-start"
                >
                  <div className="flex items-center gap-3 w-full">
                    {hazard.found ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-warning" />
                    )}
                    <div className="text-left flex-1">
                      <div className="font-medium">Hazard Area {index + 1}</div>
                      <div className="text-xs text-muted-foreground">{hazard.name}</div>
                    </div>
                    {hazard.found && (
                      <Badge variant="secondary" className="text-xs">Identified</Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>

            <Button 
              onClick={handleCompleteExam} 
              className="w-full"
              variant="secondary"
            >
              Complete Examination ({hazards.filter(h => h.found).length}/{hazards.length} Found)
            </Button>
          </div>
        )}

        {state === 'identifying' && currentHazardIndex !== null && (
          <div className="space-y-4">
            <div className="bg-background p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Identifying Hazard {currentHazardIndex + 1}</h3>
              <p className="text-sm text-muted-foreground">
                {hazards[currentHazardIndex].name}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium mb-2 block">What type of hazard is this?</label>
                <div className="grid grid-cols-1 gap-2">
                  {identificationOptions.map((option) => (
                    <Button
                      key={option}
                      variant={selectedIdentification === option ? "default" : "outline"}
                      onClick={() => setSelectedIdentification(option)}
                      className="justify-start h-auto py-2 text-sm"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {!showIdentificationResult && (
                <Button 
                  onClick={handleIdentificationSubmit}
                  disabled={!selectedIdentification}
                  className="w-full"
                >
                  Submit Identification
                </Button>
              )}

              {showIdentificationResult && (
                <>
                  {selectedIdentification === hazards[currentHazardIndex].correctId ? (
                    <div className="bg-success/10 border border-success/20 p-3 rounded-lg">
                      <p className="text-sm text-success font-medium">✓ Correct identification</p>
                    </div>
                  ) : (
                    <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
                      <p className="text-sm text-destructive font-medium">✗ Incorrect</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Correct answer: {hazards[currentHazardIndex].correctId}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-2 block">What is the correct immediate action?</label>
                    <div className="grid grid-cols-1 gap-2">
                      {actionOptions.map((option) => (
                        <Button
                          key={option}
                          variant={selectedAction === option ? "default" : "outline"}
                          onClick={() => setSelectedAction(option)}
                          className="justify-start h-auto py-2 text-sm text-left"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={handleActionSubmit}
                    disabled={!selectedAction}
                    className="w-full"
                  >
                    Submit Action
                  </Button>
                </>
              )}
            </div>

            <Button 
              onClick={() => setState('inspection')} 
              variant="ghost"
              className="w-full"
            >
              Back to Inspection
            </Button>
          </div>
        )}

        {state === 'success' && (
          <div className="space-y-4">
            <div className="bg-success/10 border-2 border-success p-6 rounded-lg text-center">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
              <h3 className="text-lg font-bold text-success mb-2">Examination Complete</h3>
              <p className="text-sm mb-4">
                You correctly identified all critical hazards. Final Score: {score}/100
              </p>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Key Learning:</strong> Thorough, systematic examinations from multiple vantage points are essential after weather events. The tension crack was the most critical indicator of imminent failure.
                </p>
              </div>
            </div>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Restart Simulation
            </Button>
          </div>
        )}

        {state === 'failure' && (
          <div className="space-y-4">
            <div className="bg-destructive/10 border-2 border-destructive p-6 rounded-lg">
              <div className="text-center mb-4">
                <XCircle className="h-16 w-16 mx-auto mb-4 text-destructive animate-pulse" />
                <h3 className="text-lg font-bold text-destructive mb-2">EXAMINATION INCOMPLETE</h3>
              </div>
              <div className="bg-background p-4 rounded mb-4">
                <p className="text-sm mb-3">
                  Later that day, the section of highwall with the tension crack fails catastrophically...
                </p>
                <div className="bg-destructive/20 p-3 rounded border border-destructive">
                  <p className="text-xs font-mono text-destructive">
                    ⚠️ HIGHWALL COLLAPSE EVENT ⚠️
                  </p>
                </div>
              </div>
              <div className="bg-background p-4 rounded text-left">
                <p className="text-xs text-muted-foreground mb-2">
                  <strong>What went wrong?</strong> The tension crack at the crest was the most critical indicator of imminent failure.
                </p>
                <p className="text-xs text-muted-foreground">
                  <strong>Critical Lesson:</strong> More frequent and thorough examinations are required after rainfall. Tension cracks parallel to the highwall crest indicate that a large section is beginning to separate.
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
