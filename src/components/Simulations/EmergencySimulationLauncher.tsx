import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Heart, Truck, ArrowLeft } from 'lucide-react';
import { useSimulation, ScenarioId } from '@/contexts/SimulationContext';
import { GroundFailureSimulation } from './GroundFailureSimulation';
import { CrushSyndromeSimulation } from './CrushSyndromeSimulation';
import { HazComSimulation } from './HazComSimulation';
import { PPESelectionSimulation } from './PPESelectionSimulation';
import { ChemicalSpillSimulation } from './ChemicalSpillSimulation';
import { ThermalStressSimulation } from './ThermalStressSimulation';
import { useNavigate } from 'react-router-dom';

export function EmergencySimulationLauncher() {
  const { state, startScenario, resetSimulation } = useSimulation();
  const navigate = useNavigate();

  const handleStartScenario = (id: ScenarioId) => {
    startScenario(id);
  };

  const handleReturn = () => {
    resetSimulation();
    navigate(-1);
  };

  // If a scenario is active, render the appropriate simulation
  const renderActiveSimulation = () => {
    const simulationMap: Record<string, JSX.Element> = {
      'S2': <GroundFailureSimulation />,
      'S3': <CrushSyndromeSimulation />,
      'hazcom_assessment': <HazComSimulation />,
      'ppe_selection': <PPESelectionSimulation />,
      'chemical_spill': <ChemicalSpillSimulation />,
      'thermal_stress': <ThermalStressSimulation />
    };

    if (state.scenarioId && simulationMap[state.scenarioId]) {
      if (state.scenarioEnded) {
        return (
          <div className="space-y-6">
            {simulationMap[state.scenarioId]}
            <div className="flex justify-center">
              <Button onClick={handleReturn} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Simulations
              </Button>
            </div>
          </div>
        );
      }
      return simulationMap[state.scenarioId];
    }
    return null;
  };

  const activeSimulation = renderActiveSimulation();
  if (activeSimulation) {
    return activeSimulation;
  }

  // Scenario selection screen
  return (
    <div className="space-y-8 max-w-6xl mx-auto p-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">MSHA Emergency Response Simulations</h1>
        <div className="bg-amber-50 dark:bg-amber-950/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
          <h2 className="text-xl font-semibold mb-2">Transforming Compliance into Competence</h2>
          <p className="text-muted-foreground">
            These interactive simulations use consequential narrative design to test your emergency response 
            decision-making under pressure. Each scenario presents realistic situations where incorrect choices 
            lead to immediate, realistic consequences. Learn from mistakes in a safe environment to build 
            genuine, life-saving competence.
          </p>
        </div>
      </div>

      <div className="bg-destructive/10 p-4 rounded-lg border border-destructive/20">
        <p className="font-semibold text-destructive">⚠️ Passing Requirement</p>
        <p>Emergency response requires perfect execution. You must complete each scenario with zero safety 
        strikes to pass. Any critical error results in scenario failure.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h3 className="text-xl font-bold">Ground Failure</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Highwall Collapse Scenario</p>
              <p className="text-muted-foreground">
                Learn to recognize warning signs of ground instability and refuse unsafe work practices. 
                Based on actual MSHA fatality investigations.
              </p>
              
              <div className="pt-2 space-y-1">
                <p className="text-xs font-semibold">Duration: ~10 minutes</p>
                <p className="text-xs font-semibold">Decision Points: 3</p>
                <p className="text-xs font-semibold">Difficulty: High</p>
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={() => handleStartScenario('S2')}
            >
              Start Simulation
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-destructive" />
              <h3 className="text-xl font-bold">Crush Syndrome</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Medical Emergency Response</p>
              <p className="text-muted-foreground">
                Master the counter-intuitive 15-minute protocol for crush injuries. Override your instinct 
                to save a life through disciplined medical knowledge.
              </p>
              
              <div className="pt-2 space-y-1">
                <p className="text-xs font-semibold">Duration: ~12 minutes</p>
                <p className="text-xs font-semibold">Decision Points: 3</p>
                <p className="text-xs font-semibold">Difficulty: Critical</p>
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={() => handleStartScenario('S3')}
            >
              Start Simulation
            </Button>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow opacity-50">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-muted-foreground" />
              <h3 className="text-xl font-bold">Accident Scene</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="font-semibold">Powered Haulage Safety</p>
              <p className="text-muted-foreground">
                Learn the 5-step protocol to prevent becoming the second victim at an equipment accident scene.
              </p>
              
              <div className="pt-2 space-y-1">
                <p className="text-xs font-semibold">Duration: ~10 minutes</p>
                <p className="text-xs font-semibold">Decision Points: 3</p>
                <p className="text-xs font-semibold">Status: Coming Soon</p>
              </div>
            </div>

            <Button 
              className="w-full"
              disabled
            >
              Coming Soon
            </Button>
          </div>
        </Card>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={handleReturn} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Course
        </Button>
      </div>
    </div>
  );
}
