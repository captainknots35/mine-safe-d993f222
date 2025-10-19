import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle, XCircle, HardHat } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

interface PPEItem {
  id: string;
  name: string;
  required: boolean;
}

export function PPESelectionSimulation() {
  const { addDecision, addSafetyStrike, completeScenario } = useSimulation();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedPPE, setSelectedPPE] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);

  const scenarios = [
    {
      id: 'drilling',
      title: 'Drilling Operation',
      description: 'You are assigned to drill blast holes in a limestone quarry. The drill is equipped with a dust collection system, but fine dust is still visible in the air. The noise level at the drill is 98 dBA. Select ALL required PPE:',
      image: '🔨',
      ppeOptions: [
        { id: 'hard_hat', name: 'Hard Hat', required: true },
        { id: 'safety_glasses', name: 'Safety Glasses or Goggles', required: true },
        { id: 'hearing_protection', name: 'Hearing Protection (Earplugs/Earmuffs)', required: true },
        { id: 'respirator', name: 'NIOSH-approved Respirator for Silica Dust', required: true },
        { id: 'impact_gloves', name: 'Impact-Resistant Work Gloves', required: true },
        { id: 'safety_boots', name: 'Safety-Toed Boots', required: true },
        { id: 'chemical_gloves', name: 'Chemical-Resistant Gloves', required: false },
        { id: 'welding_helmet', name: 'Welding Helmet', required: false }
      ] as PPEItem[],
      rationale: 'This task exposes you to multiple hazards:\n\n• Respirable crystalline silica dust (requires respirator)\n• Noise above 90 dBA PEL (requires hearing protection)\n• Overhead hazards and flying debris (requires hard hat)\n• Impact hazards to hands (requires impact-resistant gloves)\n• Eye hazards from dust and debris (requires eye protection)\n• Foot hazards from heavy equipment (requires safety-toed boots)\n\nChemical-resistant gloves and welding helmets are not needed for this task.'
    },
    {
      id: 'welding',
      title: 'Welding Repair',
      description: 'You need to weld a crack on a loader bucket. The welding will be performed in the maintenance shop. Metal grinding will be required first. Select ALL required PPE:',
      image: '⚡',
      ppeOptions: [
        { id: 'hard_hat', name: 'Hard Hat', required: true },
        { id: 'welding_helmet', name: 'Welding Helmet with Proper Shade Lens', required: true },
        { id: 'hearing_protection', name: 'Hearing Protection', required: true },
        { id: 'welding_respirator', name: 'Respirator for Welding Fumes', required: true },
        { id: 'leather_gloves', name: 'Leather, Flame-Resistant Welding Gloves', required: true },
        { id: 'leather_boots', name: 'Leather, Safety-Toed Boots', required: true },
        { id: 'fr_clothing', name: 'Flame-Resistant Clothing (Cuffless Pants)', required: true },
        { id: 'safety_glasses', name: 'Regular Safety Glasses (worn under welding helmet)', required: true },
        { id: 'shorts', name: 'Shorts for Comfort', required: false }
      ] as PPEItem[],
      rationale: 'Welding creates multiple serious hazards:\n\n• Intense UV radiation (requires auto-darkening or proper shade welding helmet)\n• Welding fumes containing toxic metal oxides (requires respirator)\n• Sparks and molten metal (requires flame-resistant clothing, leather gloves, leather boots)\n• Grinding noise (requires hearing protection)\n• Eye hazards even when not actively welding (safety glasses under helmet)\n• Overhead hazards (hard hat)\n\nShorts are dangerous - sparks can enter pockets and cause severe burns. Pants must be cuffless and worn over boots to prevent sparks from entering footwear.'
    },
    {
      id: 'chemical_handling',
      title: 'Chemical Transfer',
      description: 'You are tasked with transferring a flocculant (aluminum sulfate-based coagulant) from a 55-gallon drum into a day tank using a hand pump. The SDS specifies it is a severe eye irritant and skin irritant. Select ALL required PPE:',
      image: '🧪',
      ppeOptions: [
        { id: 'hard_hat', name: 'Hard Hat', required: true },
        { id: 'chemical_goggles', name: 'Chemical Splash Goggles or Face Shield', required: true },
        { id: 'nitrile_gloves', name: 'Chemical-Resistant Gloves (Nitrile or Neoprene per SDS)', required: true },
        { id: 'chemical_boots', name: 'Safety-Toed, Chemical-Resistant Boots', required: true },
        { id: 'chemical_apron', name: 'Chemical-Resistant Apron or Suit', required: true },
        { id: 'safety_glasses', name: 'Regular Safety Glasses Only', required: false },
        { id: 'cloth_gloves', name: 'Cotton Work Gloves', required: false },
        { id: 'respirator', name: 'Respirator', required: false }
      ] as PPEItem[],
      rationale: 'Chemical handling requires specific protection:\n\n• Severe eye irritant (requires chemical splash goggles or face shield - regular safety glasses provide inadequate protection)\n• Skin irritant (requires chemical-resistant gloves specified in SDS Section 8)\n• Spill protection (requires chemical-resistant apron or suit to protect clothing and skin)\n• Foot protection from spills (requires chemical-resistant boots)\n• Overhead hazards (hard hat)\n\nRegular safety glasses, cotton gloves, and respirators are not required unless misting occurs (per SDS). Cotton gloves would absorb the chemical and hold it against your skin.'
    },
    {
      id: 'haul_truck',
      title: 'Operating Haul Truck',
      description: 'You are operating a haul truck with an enclosed, climate-controlled cab equipped with a functioning HEPA filtration system. The cab door seals properly. Ambient noise inside the cab is 78 dBA. Select ALL required PPE:',
      image: '🚛',
      ppeOptions: [
        { id: 'hard_hat', name: 'Hard Hat (when outside the cab)', required: true },
        { id: 'safety_glasses', name: 'Safety Glasses', required: true },
        { id: 'work_gloves', name: 'Work Gloves', required: true },
        { id: 'safety_boots', name: 'Safety-Toed Boots', required: true },
        { id: 'work_clothing', name: 'Standard Work Clothing', required: true },
        { id: 'hearing_protection', name: 'Hearing Protection', required: false },
        { id: 'respirator', name: 'Respirator', required: false },
        { id: 'chemical_suit', name: 'Chemical Protective Suit', required: false }
      ] as PPEItem[],
      rationale: 'When operating equipment with a properly functioning enclosed, filtered cab:\n\n• Hard hat is required when you exit the cab\n• Safety glasses protect against unexpected hazards\n• Work gloves protect hands during equipment checks\n• Safety-toed boots protect feet from crush hazards\n• Standard work clothing is appropriate\n\nHearing protection is NOT required at 78 dBA (below 85 dBA action level). A respirator is NOT required when the cab filtration system is working properly and seals are intact - this is an effective engineering control. Chemical suits are not needed for routine truck operation.'
    }
  ];

  const handleTogglePPE = (ppeId: string) => {
    const newSelection = new Set(selectedPPE);
    if (newSelection.has(ppeId)) {
      newSelection.delete(ppeId);
    } else {
      newSelection.add(ppeId);
    }
    setSelectedPPE(newSelection);
  };

  const handleSubmit = () => {
    const scenario = scenarios[currentScenario];
    const requiredPPE = scenario.ppeOptions.filter(ppe => ppe.required).map(ppe => ppe.id);
    const selectedArray = Array.from(selectedPPE);
    
    const missingRequired = requiredPPE.filter(id => !selectedArray.includes(id));
    const incorrectSelections = selectedArray.filter(id => {
      const ppe = scenario.ppeOptions.find(p => p.id === id);
      return ppe && !ppe.required;
    });

    const isCorrect = missingRequired.length === 0 && incorrectSelections.length === 0;

    addDecision({
      step: scenario.title,
      choice: `Selected: ${selectedArray.map(id => scenario.ppeOptions.find(p => p.id === id)?.name).join(', ')}`,
      correct: isCorrect,
      feedback: isCorrect ? '✅ Correct PPE selection!' : `❌ Incorrect: Missing ${missingRequired.length} required items, ${incorrectSelections.length} unnecessary items selected.`
    });

    if (!isCorrect) {
      addSafetyStrike({
        reason: `Incorrect PPE selection for ${scenario.title}`,
        severity: missingRequired.length > 0 ? 'major' : 'minor'
      });
    }

    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedPPE(new Set());
      setShowFeedback(false);
    } else {
      completeScenario('ppe_selection');
    }
  };

  const scenario = scenarios[currentScenario];
  const requiredPPE = scenario.ppeOptions.filter(ppe => ppe.required).map(ppe => ppe.id);
  const selectedArray = Array.from(selectedPPE);
  const missingRequired = requiredPPE.filter(id => !selectedArray.includes(id));
  const incorrectSelections = selectedArray.filter(id => {
    const ppe = scenario.ppeOptions.find(p => p.id === id);
    return ppe && !ppe.required;
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">PPE Selection Challenge</h1>
        <p className="text-muted-foreground">Select appropriate PPE for various mining tasks</p>
        <div className="mt-4">
          <span className="text-sm font-medium">Scenario {currentScenario + 1} of {scenarios.length}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{scenario.image}</span>
            <div>
              <CardTitle>{scenario.title}</CardTitle>
              <CardDescription>{scenario.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showFeedback ? (
            <>
              <div className="space-y-3">
                {scenario.ppeOptions.map((ppe) => (
                  <div key={ppe.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={ppe.id}
                      checked={selectedPPE.has(ppe.id)}
                      onCheckedChange={() => handleTogglePPE(ppe.id)}
                    />
                    <label
                      htmlFor={ppe.id}
                      className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {ppe.name}
                    </label>
                  </div>
                ))}
              </div>
              <Button onClick={handleSubmit} className="w-full" size="lg">
                Submit PPE Selection
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                missingRequired.length === 0 && incorrectSelections.length === 0
                  ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                  : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-3">
                  {missingRequired.length === 0 && incorrectSelections.length === 0 ? (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1">
                    {missingRequired.length === 0 && incorrectSelections.length === 0 ? (
                      <p className="font-medium">✅ Excellent! You selected all required PPE correctly.</p>
                    ) : (
                      <div className="space-y-2">
                        <p className="font-medium">Review your selection:</p>
                        {missingRequired.length > 0 && (
                          <div className="bg-background/50 p-3 rounded">
                            <p className="font-medium text-red-600 dark:text-red-400 mb-1">Missing Required PPE:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {missingRequired.map(id => {
                                const ppe = scenario.ppeOptions.find(p => p.id === id);
                                return <li key={id}>{ppe?.name}</li>;
                              })}
                            </ul>
                          </div>
                        )}
                        {incorrectSelections.length > 0 && (
                          <div className="bg-background/50 p-3 rounded">
                            <p className="font-medium text-amber-600 dark:text-amber-400 mb-1">Unnecessary PPE Selected:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              {incorrectSelections.map(id => {
                                const ppe = scenario.ppeOptions.find(p => p.id === id);
                                return <li key={id}>{ppe?.name}</li>;
                              })}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <HardHat className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-2">Rationale:</p>
                    <p className="whitespace-pre-line text-sm">{scenario.rationale}</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'Complete Simulation'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
