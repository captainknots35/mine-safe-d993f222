import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, XCircle, Thermometer } from 'lucide-react';
import { useSimulation } from '@/contexts/SimulationContext';

export function ThermalStressSimulation() {
  const { addDecision, addSafetyStrike, completeScenario } = useSimulation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      id: 'recognition',
      title: 'Recognizing Heat Exhaustion',
      description: 'It\'s a hot summer afternoon (95°F, 70% humidity). You\'re working near the crusher when your coworker, Mike, who has been shoveling material for the past hour, walks over looking pale. He\'s sweating heavily, his skin is clammy, and he says he feels weak and dizzy. He mentions he has a headache and feels nauseous.',
      image: '🥵',
      choices: [
        {
          id: 'ignore',
          text: 'Tell him to "tough it out" - it\'s hot for everyone and you have work to finish',
          correct: false,
          feedback: '❌ LIFE-THREATENING MISTAKE: These are classic symptoms of heat exhaustion. Ignoring them can allow progression to heat stroke, which is fatal if untreated. Heat exhaustion is a medical emergency that requires immediate action.',
          consequence: 'Mike continues working but collapses 15 minutes later. His condition has progressed to heat stroke - his body temperature is 105°F, he\'s confused and combative. 911 is called, but he suffers permanent brain damage from delayed treatment.'
        },
        {
          id: 'water_continue',
          text: 'Give him water and tell him to keep working - staying active will help',
          correct: false,
          feedback: '❌ DANGEROUS: While hydration is important, heat exhaustion requires immediate rest and cooling. Continued physical exertion will worsen his condition and can rapidly progress to life-threatening heat stroke.',
          consequence: 'Mike drinks water and tries to continue. His condition rapidly deteriorates. He becomes confused, stops sweating (a sign of heat stroke), and collapses unconscious. Emergency services arrive but he requires hospital ICU admission.'
        },
        {
          id: 'recognize_respond',
          text: 'Recognize these as symptoms of heat exhaustion - a medical emergency. Stop work immediately and move him to a cool, shaded area.',
          correct: true,
          feedback: '✅ CORRECT: You recognized the classic signs: heavy sweating, weakness, dizziness, nausea, headache, clammy skin. Heat exhaustion is serious and requires immediate action. Moving to shade is the critical first step.',
          consequence: 'You recognize the emergency. You help Mike to a shaded rest area with a fan. You notify your supervisor of the heat illness. Mike is grateful you acted quickly and didn\'t dismiss his symptoms.'
        }
      ]
    },
    {
      id: 'initial_treatment',
      title: 'Initial First Aid',
      description: 'Mike is now in the shaded break area. He\'s sitting down but still appears weak, dizzy, and is sweating profusely. His skin is pale and clammy. What is the correct immediate first aid?',
      image: '🩹',
      choices: [
        {
          id: 'hot_coffee',
          text: 'Give him hot coffee to warm up his core and provide energy',
          correct: false,
          feedback: '❌ DANGEROUS: Caffeinated beverages like coffee cause dehydration and increase heart rate, worsening heat illness. Hot beverages further raise core temperature. This could trigger heat stroke.',
          consequence: 'Mike drinks the hot coffee. His heart rate increases dangerously. The caffeine causes more dehydration. His condition worsens rapidly and he loses consciousness. You\'ve made a critical error in first aid.'
        },
        {
          id: 'cold_water_immersion',
          text: 'Put him in a tub of ice water immediately',
          correct: false,
          feedback: '❌ INCORRECT FOR HEAT EXHAUSTION: Ice water immersion is for heat stroke (when body temperature is dangerously high). For heat exhaustion, this is too aggressive and can cause dangerous shivering, which generates more heat.',
          consequence: 'Mike is placed in ice water. He immediately begins shivering violently. The shivering generates more metabolic heat, worsening his condition. He goes into shock from the extreme temperature change.'
        },
        {
          id: 'proper_cooling',
          text: 'Loosen his clothing, apply cool wet cloths to his skin, fan him to increase evaporative cooling, and give him sips of cool water if he\'s alert and can swallow',
          correct: true,
          feedback: '✅ CORRECT: This is proper first aid for heat exhaustion. Loosening clothing improves heat loss. Cool cloths and fanning promote evaporative cooling. Small sips of water help rehydration if the victim is conscious and not vomiting.',
          consequence: 'You loosen Mike\'s shirt, apply cool wet cloths to his forehead and neck, and set up a fan. You offer him small sips of water. His color starts to improve slightly and he says the cool cloths feel good.'
        }
      ]
    },
    {
      id: 'monitoring',
      title: 'Monitoring and Medical Decision',
      description: 'After 10 minutes of cooling treatment, Mike is still weak and dizzy. He\'s no longer sweating as much, and his skin feels warmer and drier than before. He seems slightly confused and can\'t remember what day it is. What should you do?',
      image: '📞',
      choices: [
        {
          id: 'continue_treatment',
          text: 'Continue the same cooling treatment - he just needs more time',
          correct: false,
          feedback: '❌ LIFE-THREATENING MISTAKE: WORSENING symptoms (decreased sweating, warmer/drier skin, confusion, disorientation) indicate progression from heat exhaustion to HEAT STROKE. Heat stroke is immediately fatal if untreated. CALL 911 NOW.',
          consequence: 'You continue cooling efforts, but Mike\'s condition rapidly deteriorates. He has heat stroke. Within minutes he loses consciousness, has a seizure, and his body temperature reaches 106°F. Without immediate advanced medical care, heat stroke is fatal.'
        },
        {
          id: 'aspirin',
          text: 'Give him aspirin to reduce his fever and continue cooling',
          correct: false,
          feedback: '❌ DANGEROUS: Heat stroke is NOT a fever. Aspirin does not help and can cause dangerous internal bleeding. The confusion and decreased sweating are signs of heat stroke - this requires 911, not medication.',
          consequence: 'You give Mike aspirin. It has no effect on heat stroke. His condition continues to worsen. He becomes combative due to brain dysfunction from hyperthermia. Valuable time for emergency treatment is wasted.'
        },
        {
          id: 'call_911',
          text: 'CALL 911 IMMEDIATELY. These are signs his condition is progressing to heat stroke - a life-threatening emergency. Continue aggressive cooling while waiting for EMS.',
          correct: true,
          feedback: '✅ CORRECT - LIFE-SAVING: Decreased sweating, warmer/drier skin, and confusion are red flags that heat exhaustion has progressed to heat stroke. Heat stroke has a mortality rate of 10-50% even with treatment. Every minute counts.',
          consequence: 'You immediately call 911 and report suspected heat stroke. You continue cooling efforts and monitor Mike closely. EMS arrives within 8 minutes, provides advanced cooling, and transports him to the hospital. The physician says your quick recognition and 911 call saved Mike\'s life.'
        }
      ]
    },
    {
      id: 'prevention',
      title: 'Prevention Discussion',
      description: 'Mike recovers fully after hospital treatment. The safety manager asks you to help identify what led to this incident. Upon investigation, you learn: Mike is a new miner (2nd week), it was his first hot day on the job, he skipped breakfast, drank only one bottle of water during his shift, and was not given a heat acclimatization schedule. What was the PRIMARY preventable cause?',
      image: '🛡️',
      choices: [
        {
          id: 'mike_fault',
          text: 'Mike\'s personal choices - he should have eaten breakfast and drunk more water',
          correct: false,
          feedback: '❌ INCOMPLETE ANALYSIS: While personal factors matter, the PRIMARY failure was systemic: lack of acclimatization. MSHA guidance requires 5-6 days of gradual heat acclimatization for new miners or those returning from time off.',
          consequence: 'The investigation concludes "employee error." The same unsafe system remains. Three weeks later, another new miner suffers heat stroke. The mine receives MSHA citations for failure to implement proper heat illness prevention.'
        },
        {
          id: 'weather',
          text: 'The unusually hot weather - nothing could have prevented this',
          correct: false,
          feedback: '❌ INCORRECT: Heat illness is preventable through acclimatization, hydration programs, work/rest cycles, and monitoring. MSHA requires operators to take specific preventive measures during hot weather.',
          consequence: 'The investigation blames the weather and takes no corrective action. Heat illnesses continue at the mine. MSHA conducts an inspection and issues multiple citations for failure to implement required heat stress prevention measures.'
        },
        {
          id: 'no_acclimatization',
          text: 'Failure to provide proper heat acclimatization. New miners must have 5-6 days of progressively increasing heat exposure, with 20% increase per day, starting at 20% of full shift duration on day 1.',
          correct: true,
          feedback: '✅ CORRECT: This is the PRIMARY systemic failure. NIOSH and MSHA guidance require acclimatization for new workers and those returning from >7 days off. Mike should have worked only 20% of a full shift on his first hot day, increasing 20% daily.',
          consequence: 'The mine implements a formal heat acclimatization program. New miners and those returning from time off start with shortened shifts in the heat, gradually increasing over 5-6 days. Supervisors track each worker\'s acclimatization status. No further heat illnesses occur that summer.'
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
        const severity = currentStepData.id === 'monitoring' ? 'critical' : 'major';
        addSafetyStrike({
          reason: `Incorrect decision in ${currentStepData.title}`,
          severity
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
      completeScenario('thermal_stress');
    }
  };

  const currentStepData = steps[currentStep];
  const selectedChoiceData = currentStepData.choices.find(c => c.id === selectedChoice);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Thermal Stress Emergency</h1>
        <p className="text-muted-foreground">Recognize and respond to heat exhaustion and heat stroke</p>
        <div className="mt-4">
          <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-950 border-2 border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Thermometer className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
          <div>
            <p className="font-medium mb-2">Warning Signs - Know the Difference:</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Heat Exhaustion:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Heavy sweating</li>
                  <li>Weakness, fatigue</li>
                  <li>Dizziness, nausea</li>
                  <li>Clammy, pale skin</li>
                  <li>Normal mental state</li>
                </ul>
              </div>
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded">
                <p className="font-medium mb-1 text-red-800 dark:text-red-200">Heat Stroke (CALL 911):</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>High temp (103°F+)</li>
                  <li>Hot, dry skin</li>
                  <li>Stopped sweating</li>
                  <li>Confusion/altered mental state</li>
                  <li>Unconsciousness/seizures</li>
                </ul>
              </div>
            </div>
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
