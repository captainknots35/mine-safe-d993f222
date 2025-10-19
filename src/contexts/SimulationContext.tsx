import { createContext, useContext, useState, ReactNode } from 'react';

export type ScenarioId = 'S2' | 'S3' | 'S4' | 'hazcom_assessment' | 'ppe_selection' | 'chemical_spill' | 'thermal_stress';
export type ScenarioOutcome = 'in-progress' | 'passed' | 'failed';

interface Decision {
  step: string;
  choice: string;
  correct: boolean;
  feedback: string;
}

interface SafetyStrike {
  reason: string;
  severity: 'minor' | 'major' | 'critical';
}

interface SimulationState {
  scenarioId: ScenarioId | null;
  currentDecisionPointId: string;
  safetyStrikes: number;
  scenarioEnded: boolean;
  scenarioOutcome: ScenarioOutcome;
  customState: Record<string, any>;
  decisions: Decision[];
  strikes: SafetyStrike[];
}

interface SimulationContextType {
  state: SimulationState;
  startScenario: (scenarioId: ScenarioId) => void;
  goToDecisionPoint: (id: string) => void;
  incrementSafetyStrikes: () => void;
  updateCustomState: (key: string, value: any) => void;
  endScenario: (outcome: 'passed' | 'failed') => void;
  resetSimulation: () => void;
  addDecision: (decision: Decision) => void;
  addSafetyStrike: (strike: SafetyStrike) => void;
  completeScenario: (scenarioId: string) => void;
}

const initialState: SimulationState = {
  scenarioId: null,
  currentDecisionPointId: '',
  safetyStrikes: 0,
  scenarioEnded: false,
  scenarioOutcome: 'in-progress',
  customState: {},
  decisions: [],
  strikes: []
};

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SimulationState>(initialState);

  const startScenario = (scenarioId: ScenarioId) => {
    const initialDecisionPoints: Partial<Record<ScenarioId, string>> = {
      'S2': 'S2-DP01',
      'S3': 'S3-DP01',
      'S4': 'S4-DP01',
      'hazcom_assessment': '',
      'ppe_selection': '',
      'chemical_spill': '',
      'thermal_stress': ''
    };

    const initialCustomStates: Partial<Record<ScenarioId, Record<string, any>>> = {
      'S2': { reportedHazard: false },
      'S3': { knowsDuration: false, entrapmentDuration: 0 },
      'S4': { sceneAssessed: false, sceneStabilized: false },
      'hazcom_assessment': {},
      'ppe_selection': {},
      'chemical_spill': {},
      'thermal_stress': {}
    };

    setState({
      scenarioId,
      currentDecisionPointId: initialDecisionPoints[scenarioId] || '',
      safetyStrikes: 0,
      scenarioEnded: false,
      scenarioOutcome: 'in-progress',
      customState: initialCustomStates[scenarioId] || {},
      decisions: [],
      strikes: []
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

  const addDecision = (decision: Decision) => {
    setState(prev => ({
      ...prev,
      decisions: [...prev.decisions, decision]
    }));
  };

  const addSafetyStrike = (strike: SafetyStrike) => {
    setState(prev => ({
      ...prev,
      strikes: [...prev.strikes, strike],
      safetyStrikes: prev.safetyStrikes + 1
    }));
  };

  const completeScenario = (scenarioId: string) => {
    setState(prev => {
      const criticalStrikes = prev.strikes.filter(s => s.severity === 'critical').length;
      const majorStrikes = prev.strikes.filter(s => s.severity === 'major').length;
      
      // Pass if no critical strikes and less than 2 major strikes
      const outcome = criticalStrikes === 0 && majorStrikes < 2 ? 'passed' : 'failed';
      
      return {
        ...prev,
        scenarioEnded: true,
        scenarioOutcome: outcome
      };
    });
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
        resetSimulation,
        addDecision,
        addSafetyStrike,
        completeScenario
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
