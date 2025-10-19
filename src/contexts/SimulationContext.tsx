import { createContext, useContext, useState, ReactNode } from 'react';

export type ScenarioId = 'S2' | 'S3' | 'S4';
export type ScenarioOutcome = 'in-progress' | 'passed' | 'failed';

interface SimulationState {
  scenarioId: ScenarioId | null;
  currentDecisionPointId: string;
  safetyStrikes: number;
  scenarioEnded: boolean;
  scenarioOutcome: ScenarioOutcome;
  customState: Record<string, any>;
}

interface SimulationContextType {
  state: SimulationState;
  startScenario: (scenarioId: ScenarioId) => void;
  goToDecisionPoint: (id: string) => void;
  incrementSafetyStrikes: () => void;
  updateCustomState: (key: string, value: any) => void;
  endScenario: (outcome: 'passed' | 'failed') => void;
  resetSimulation: () => void;
}

const initialState: SimulationState = {
  scenarioId: null,
  currentDecisionPointId: '',
  safetyStrikes: 0,
  scenarioEnded: false,
  scenarioOutcome: 'in-progress',
  customState: {}
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SimulationState>(initialState);

  const startScenario = (scenarioId: ScenarioId) => {
    const initialDecisionPoints: Record<ScenarioId, string> = {
      'S2': 'S2-DP01',
      'S3': 'S3-DP01',
      'S4': 'S4-DP01'
    };

    const initialCustomStates: Record<ScenarioId, Record<string, any>> = {
      'S2': { reportedHazard: false },
      'S3': { knowsDuration: false, entrapmentDuration: 0 },
      'S4': { sceneAssessed: false, sceneStabilized: false }
    };

    setState({
      scenarioId,
      currentDecisionPointId: initialDecisionPoints[scenarioId],
      safetyStrikes: 0,
      scenarioEnded: false,
      scenarioOutcome: 'in-progress',
      customState: initialCustomStates[scenarioId]
    });
  };

  const goToDecisionPoint = (id: string) => {
    setState(prev => ({ ...prev, currentDecisionPointId: id }));
  };

  const incrementSafetyStrikes = () => {
    setState(prev => ({ ...prev, safetyStrikes: prev.safetyStrikes + 1 }));
  };

  const updateCustomState = (key: string, value: any) => {
    setState(prev => ({
      ...prev,
      customState: { ...prev.customState, [key]: value }
    }));
  };

  const endScenario = (outcome: 'passed' | 'failed') => {
    setState(prev => ({
      ...prev,
      scenarioEnded: true,
      scenarioOutcome: outcome
    }));
  };

  const resetSimulation = () => {
    setState(initialState);
  };

  return (
    <SimulationContext.Provider
      value={{
        state,
        startScenario,
        goToDecisionPoint,
        incrementSafetyStrikes,
        updateCustomState,
        endScenario,
        resetSimulation
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
