import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, XCircle, Droplets } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

export function ChemicalSpillSimulation() {
  const { addDecision, addSafetyStrike, completeScenario } = useSimulation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      id: 'discovery',
      title: 'Spill Discovery',
      description: 'You are walking past the fueling station when you notice a strong diesel fuel odor. You see approximately 10 gallons of diesel fuel pooling on the ground near a parked haul truck. The fuel is flowing toward a storm drain 20 feet away. A front-end loader is idling nearby, and you can see sparks from a cutting torch being used in the maintenance shop about 50 feet away.',
      image: '⚠️',
      choices: [
        {
          id: 'immediate_cleanup',
          text: 'Immediately start cleaning up the spill with absorbent pads',
          correct: false,
          feedback: '❌ DANGEROUS: You skipped critical first steps. Diesel fuel is flammable (flash point below 200°F). The idling loader and nearby cutting torch are ignition sources that could cause a fire or explosion. You must eliminate ignition sources FIRST.',
          consequence: 'As you approach with absorbent pads, diesel vapors ignite from a spark. A flash fire erupts, causing severe burns to your hands and face. The fire spreads to the loader, causing a major incident.'
        },
        {
          id: 'call_fire',
          text: 'Pull the fire alarm and evacuate the entire mine site',
          correct: false,
          feedback: '❌ OVERREACTION: A 10-gallon diesel spill does not require full site evacuation. This causes unnecessary disruption and panic. The correct response is RESCUE-CONFINE-REPORT-SECURE-CLEANUP for this size spill.',
          consequence: 'You pull the fire alarm. 50+ workers evacuate unnecessarily, causing production loss and confusion. Your supervisor is upset about the overreaction to a manageable incident.'
        },
        {
          id: 'rescue_confine',
          text: 'RESCUE: Check for injured persons. CONFINE: Immediately eliminate ignition sources - shut down the nearby loader and notify the cutting torch operator to stop work',
          correct: true,
          feedback: '✅ CORRECT: This follows the first two steps of spill response. You\'ve checked for injuries (RESCUE) and are taking action to prevent the spill from becoming a fire (CONFINE by eliminating ignition sources).',
          consequence: 'You quickly check that no one is injured. You run to the loader operator and tell them to shut down immediately. You alert the maintenance worker to extinguish the cutting torch. The immediate fire hazard is now controlled.'
        }
      ]
    },
    {
      id: 'report',
      title: 'Reporting the Incident',
      description: 'You have secured the ignition sources. The diesel is still flowing toward the storm drain. What is your next critical step?',
      image: '📞',
      choices: [
        {
          id: 'start_cleanup_alone',
          text: 'Start cleanup immediately by yourself to stop the environmental damage',
          correct: false,
          feedback: '❌ INADEQUATE: You skipped REPORT. You need help, proper PPE, and spill control equipment. One person cannot effectively handle a 10-gallon spill spreading toward a drain. Also, this spill must be documented per environmental regulations.',
          consequence: 'You try to contain the spill alone but lack proper equipment. The diesel reaches the storm drain and enters the waterway, causing an environmental violation. The EPA fines the mine $15,000 for the unreported discharge.'
        },
        {
          id: 'report_supervisor',
          text: 'REPORT: Immediately notify your supervisor and emergency response personnel. Provide location, chemical (diesel fuel), quantity (~10 gallons), and that it\'s approaching a storm drain. Request spill kit and assistance.',
          correct: true,
          feedback: '✅ CORRECT: REPORT is the third step. You must notify qualified responders who have proper equipment and training. Diesel spills approaching waterways require immediate, coordinated response and documentation.',
          consequence: 'Your supervisor dispatches the spill response team. They arrive with absorbent booms, pads, a portable pump, and proper PPE. The incident is documented per environmental regulations. Help is on the way.'
        },
        {
          id: 'cover_drain',
          text: 'Try to cover the storm drain with whatever materials you can find',
          correct: false,
          feedback: '❌ INCOMPLETE: While protecting the drain is important (part of CONFINE), you skipped REPORT. You need trained responders and proper materials. Improvising with random materials is ineffective and delays proper response.',
          consequence: 'You grab cardboard and try to block the drain. The cardboard becomes saturated with diesel and is ineffective. Meanwhile, no one else knows about the spill, valuable time is wasted, and diesel enters the waterway.'
        }
      ]
    },
    {
      id: 'secure',
      title: 'Securing the Area',
      description: 'The spill response team is en route (ETA 5 minutes). People are walking near the spill area, and vehicles are still moving through the fueling station. What should you do while waiting for the response team?',
      image: '🚧',
      choices: [
        {
          id: 'nothing',
          text: 'Wait and do nothing - the response team will handle it',
          correct: false,
          feedback: '❌ INADEQUATE: You skipped SECURE. Untrained personnel could walk through the diesel, slip and fall, or track contamination into buildings. Vehicles could spread the spill or create ignition sources.',
          consequence: 'A worker walks through the diesel puddle, slips, and falls, suffering a back injury. Another vehicle drives through the spill, spreading diesel across the yard and creating a much larger contamination area.'
        },
        {
          id: 'secure_area',
          text: 'SECURE: Use cones, caution tape, or position yourself to prevent unauthorized entry. Warn approaching personnel and vehicles to stay away from the spill area until the response team arrives.',
          correct: true,
          feedback: '✅ CORRECT: SECURE is the fourth step. You\'re preventing the situation from worsening by keeping untrained personnel away and preventing the spill from spreading until qualified responders arrive with proper equipment.',
          consequence: 'You set up cones and caution tape around the spill. You stop approaching workers and redirect vehicle traffic. The spill area is now secured. The response team arrives and commends you for following proper procedures.'
        },
        {
          id: 'direct_traffic',
          text: 'Direct vehicles to drive around the spill on the other side',
          correct: false,
          feedback: '❌ INADEQUATE: While you\'re trying to control the area, vehicles still pose an ignition risk. Also, "driving around" could track diesel to other areas. Complete SECURE requires stopping all traffic near the spill.',
          consequence: 'A vehicle drives around the spill as you directed, but drives through a smaller puddle you didn\'t see. Diesel tracks across the site. Additionally, hot exhaust from passing vehicles creates fire risk.'
        }
      ]
    },
    {
      id: 'cleanup',
      title: 'Cleanup Procedures',
      description: 'The spill response team arrives with PPE and equipment. The team leader asks if you want to assist with cleanup. You have safety glasses and work gloves, but no other PPE. What should you do?',
      image: '🧹',
      choices: [
        {
          id: 'help_no_ppe',
          text: 'Help immediately - time is critical and you have basic PPE',
          correct: false,
          feedback: '❌ DANGEROUS: Diesel fuel requires chemical-resistant gloves (nitrile or neoprene), not regular work gloves. The SDS specifies chemical splash goggles, not just safety glasses. You also need chemical-resistant boots and clothing for a spill of this size.',
          consequence: 'You help without proper PPE. Diesel soaks through your work gloves and work boots, causing severe skin irritation and chemical dermatitis. You require medical treatment and weeks off work for the chemical burns.'
        },
        {
          id: 'refuse_all',
          text: 'Refuse - you\'ve done enough by following RESCUE-CONFINE-REPORT-SECURE',
          correct: true,
          feedback: '✅ CORRECT: CLEANUP should only be performed by trained, qualified personnel wearing correct PPE. Your work gloves and safety glasses are inadequate for chemical spill cleanup. You followed the first four steps correctly - that is your role as a non-specialist.',
          consequence: 'You explain you don\'t have proper PPE. The team leader agrees and thanks you for your excellent initial response. The properly equipped team handles cleanup safely. Your actions prevented injuries and environmental damage.'
        },
        {
          id: 'borrow_ppe',
          text: 'Borrow PPE from the response team and help',
          correct: false,
          feedback: '❌ INADEQUATE: Even with borrowed PPE, you lack the specific training for chemical spill cleanup. Spill response requires knowledge of containment techniques, proper use of absorbents, waste handling, and decontamination procedures.',
          consequence: 'You borrow PPE but don\'t know proper cleanup techniques. You use absorbent pads incorrectly, spreading the contamination. You also don\'t know proper disposal procedures, creating a hazardous waste violation.'
        }
      ]
    },
    {
      id: 'followup',
      title: 'Post-Incident Actions',
      description: 'The spill is now cleaned up. All contaminated materials are in proper hazardous waste drums. Your clothing has some diesel stains from the initial response. What should you do?',
      image: '👕',
      choices: [
        {
          id: 'go_home_dirty',
          text: 'Your clothing is just stained, not soaked - go back to work',
          correct: false,
          feedback: '❌ DANGEROUS: Diesel-contaminated clothing poses health risks. Diesel can be absorbed through your skin over time. The vapors can cause headaches and respiratory irritation. Contaminated clothing is a fire hazard.',
          consequence: 'You continue working in contaminated clothing. Over your shift, diesel absorbs through your skin, causing chemical burns and systemic toxicity. You develop severe headaches and nausea from vapor exposure.'
        },
        {
          id: 'change_report',
          text: 'Change into clean clothing immediately. Report to the safety manager for medical evaluation. Properly dispose of contaminated clothing per hazardous waste procedures.',
          correct: true,
          feedback: '✅ CORRECT: Diesel-contaminated clothing must be removed immediately to prevent skin absorption. Even minor exposures should be evaluated. Contaminated clothing is hazardous waste and must be disposed of properly.',
          consequence: 'You shower and change into clean clothes. The safety manager evaluates you and documents the minor exposure. Your contaminated clothing is placed in a hazardous waste drum. You prevented a chronic exposure issue.'
        },
        {
          id: 'wash_clothing',
          text: 'Take your work clothes home and wash them in your washing machine',
          correct: false,
          feedback: '❌ DANGEROUS: You would bring hazardous waste to your home and contaminate your washing machine and home wastewater with diesel fuel. This creates environmental violations and exposes your family to diesel vapors.',
          consequence: 'You wash the clothes at home. Diesel vapors fill your house, making your family ill. Diesel residue contaminates your washing machine. Your home smells like fuel for weeks, and you face potential EPA violations for improper disposal.'
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
      completeScenario('chemical_spill');
    }
  };

  const currentStepData = steps[currentStep];
  const selectedChoiceData = currentStepData.choices.find(c => c.id === selectedChoice);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Chemical Spill Response</h1>
        <p className="text-muted-foreground">Execute proper spill response: RESCUE-CONFINE-REPORT-SECURE-CLEANUP</p>
        <div className="mt-4">
          <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950 border-2 border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Droplets className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium mb-1">Spill Response Protocol: RESCUE-CONFINE-REPORT-SECURE-CLEANUP</p>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              <li><strong>RESCUE</strong>: Check for injuries, evacuate contaminated persons</li>
              <li><strong>CONFINE</strong>: Eliminate ignition sources, prevent spread</li>
              <li><strong>REPORT</strong>: Notify supervisor and emergency responders</li>
              <li><strong>SECURE</strong>: Control access to prevent unauthorized entry</li>
              <li><strong>CLEANUP</strong>: Trained personnel only, with proper PPE</li>
            </ol>
          </div>
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
