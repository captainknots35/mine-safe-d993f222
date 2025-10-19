import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

export function HazComSimulation() {
  const { addDecision, addSafetyStrike, completeScenario } = useSimulation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      id: 'discovery',
      title: 'Chemical Discovery',
      description: 'You arrive at the maintenance shop and notice a 5-gallon plastic container on the workbench. The label is completely torn off, and you can see a clear liquid inside. Your supervisor asks you to use this chemical to clean some equipment parts.',
      image: '🧪',
      choices: [
        {
          id: 'use_it',
          text: 'Use the chemical since it looks like water or cleaning solvent',
          correct: false,
          feedback: '❌ CRITICAL SAFETY VIOLATION: Never use an unlabeled chemical! This violates 30 CFR Part 47 HazCom requirements. The chemical could be a corrosive acid, flammable solvent, or toxic substance. You could suffer chemical burns, inhalation injury, or start a fire.',
          consequence: 'You pour the liquid on the parts. Within seconds, your hands start burning intensely. The "cleaning solvent" was actually a concentrated acid. You suffer second-degree chemical burns requiring immediate medical attention and weeks of recovery.'
        },
        {
          id: 'smell_it',
          text: 'Try to identify it by smelling the container opening',
          correct: false,
          feedback: '❌ DANGEROUS: Never smell unknown chemicals! Many toxic substances have no odor or pleasant smells. Inhaling concentrated vapors can cause immediate respiratory damage, chemical pneumonia, or unconsciousness.',
          consequence: 'You open the container and take a deep breath. The chemical releases concentrated solvent vapors that immediately overwhelm your respiratory system. You collapse from acute solvent intoxication and require emergency medical treatment.'
        },
        {
          id: 'refuse_properly',
          text: 'Refuse to use it and report the unlabeled container to your supervisor',
          correct: true,
          feedback: '✅ CORRECT: This is the only safe response. 30 CFR § 47.32 requires all hazardous chemicals to be properly labeled. Your mine\'s HazCom program requires that you do not handle unlabeled chemicals.',
          consequence: 'Your supervisor thanks you for following proper procedures. The container is secured, and an SDS is obtained. The chemical turns out to be a highly toxic, flammable solvent that requires special PPE and ventilation.'
        }
      ]
    },
    {
      id: 'documentation',
      title: 'Proper Documentation',
      description: 'Your supervisor agrees the container should not be used without proper identification. What is the correct next step according to HazCom requirements?',
      image: '📋',
      choices: [
        {
          id: 'wait_label',
          text: 'Just wait for someone to label it eventually',
          correct: false,
          feedback: '❌ INADEQUATE: Passive waiting does not meet HazCom requirements. The container must be immediately secured and properly identified.',
          consequence: 'Three days later, another worker uses the unlabeled chemical without proper PPE and suffers a serious chemical exposure.'
        },
        {
          id: 'isolate_report',
          text: 'Isolate the container in a secure area and ensure the chemical is identified and properly labeled before any use',
          correct: true,
          feedback: '✅ CORRECT: This follows HazCom requirements. The container must be secured to prevent use, the chemical must be identified (possibly by contacting the original supplier), and a proper GHS label and SDS must be obtained.',
          consequence: 'You help place the container in a locked cabinet with a "DO NOT USE - UNLABELED" sign. The safety manager contacts the supplier, obtains the SDS, and creates a proper GHS label. The chemical is now safely documented in the mine\'s hazardous chemical inventory.'
        },
        {
          id: 'pour_out',
          text: 'Pour it down the drain to eliminate the hazard',
          correct: false,
          feedback: '❌ ENVIRONMENTAL VIOLATION: Disposing of unknown chemicals down drains is illegal and can cause environmental damage, explosions in sewer lines, or harm to wastewater treatment systems.',
          consequence: 'You pour the chemical down the drain. It reacts with residues in the pipes, creating toxic fumes that fill the building. The mine is evacuated, and you face disciplinary action and potential EPA violations.'
        }
      ]
    },
    {
      id: 'sds_reading',
      title: 'Reading the SDS',
      description: 'The chemical is identified as "Industrial Degreaser - Petroleum Distillate Blend." You now have the SDS. For your immediate task of cleaning equipment parts in an open maintenance area, which SDS sections are MOST critical to review first?',
      image: '📄',
      choices: [
        {
          id: 'random_sections',
          text: 'Sections 1 (Identification) and 16 (Other Information)',
          correct: false,
          feedback: '❌ INADEQUATE: While Section 1 is useful for confirming the product identity, these sections do not contain the critical safety information you need to work safely.',
          consequence: 'You skip the important safety sections. You don\'t realize the degreaser requires ventilation and specialized gloves. You develop a severe skin rash and experience dizziness from vapor exposure.'
        },
        {
          id: 'critical_sections',
          text: 'Sections 2 (Hazards), 7 (Handling), and 8 (Exposure Controls/PPE)',
          correct: true,
          feedback: '✅ CORRECT: Section 2 tells you the hazards (flammable, skin irritant, inhalation hazard). Section 7 tells you handling precautions (keep away from ignition sources, use in ventilated areas). Section 8 specifies required PPE (nitrile gloves, safety glasses, respirator if ventilation is inadequate).',
          consequence: 'You review these sections carefully. You learn the degreaser is flammable and requires chemical-resistant gloves and ventilation. You eliminate ignition sources, set up a fan for ventilation, don nitrile gloves and safety glasses, and complete the task safely.'
        },
        {
          id: 'skip_reading',
          text: 'Don\'t bother reading the SDS since you\'ve used degreasers before',
          correct: false,
          feedback: '❌ DANGEROUS ASSUMPTION: Every chemical formulation is different. Assuming you know the hazards without reading the SDS can lead to serious injuries.',
          consequence: 'You assume all degreasers are the same. This particular formulation is highly flammable. You work near a cutting torch, and the vapors ignite, causing a flash fire that burns your arms and face.'
        }
      ]
    }
  ];

  const handleChoice = (choiceId: string) => {
    setSelectedChoice(choiceId);
    setShowFeedback(true);

    const currentStepData = steps[currentStep];
    const choice = currentStepData.choices.find(c => c.id === choiceId);

    if (choice) {
      addDecision({
        step: currentStepData.title,
        choice: choice.text,
        correct: choice.correct,
        feedback: choice.feedback
      });

      if (!choice.correct) {
        addSafetyStrike({
          reason: `Incorrect decision in ${currentStepData.title}`,
          severity: 'major'
        });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedChoice(null);
      setShowFeedback(false);
    } else {
      completeScenario('hazcom_assessment');
    }
  };

  const currentStepData = steps[currentStep];
  const selectedChoiceData = currentStepData.choices.find(c => c.id === selectedChoice);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Chemical Hazard Assessment</h1>
        <p className="text-muted-foreground">Apply HazCom principles to safely assess an unlabeled chemical</p>
        <div className="mt-4">
          <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <span className="text-6xl">{currentStepData.image}</span>
            <div>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showFeedback ? (
            <>
              <p className="font-medium text-lg mb-4">What do you do?</p>
              <div className="space-y-3">
                {currentStepData.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    variant="outline"
                    className="w-full text-left h-auto py-4 px-6 justify-start"
                    onClick={() => handleChoice(choice.id)}
                  >
                    {choice.text}
                  </Button>
                ))}
              </div>
            </>
          ) : selectedChoiceData && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${
                selectedChoiceData.correct 
                  ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                  : 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
              }`}>
                <div className="flex items-start gap-3">
                  {selectedChoiceData.correct ? (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <p className="font-medium mb-2">Your Choice:</p>
                    <p className="mb-3">{selectedChoiceData.text}</p>
                    <div className="bg-background/50 p-3 rounded">
                      <p className="whitespace-pre-line">{selectedChoiceData.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium mb-2">Consequence:</p>
                    <p>{selectedChoiceData.consequence}</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full" size="lg">
                {currentStep < steps.length - 1 ? 'Continue' : 'Complete Simulation'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
