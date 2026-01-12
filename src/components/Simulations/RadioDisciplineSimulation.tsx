import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Radio, 
  AlertTriangle, 
  CheckCircle, 
  Volume2,
  XCircle
} from 'lucide-react';

type SimulationPhase = 'intro' | 'practice' | 'scenario' | 'complete';

export const RadioDisciplineSimulation = () => {
  const [phase, setPhase] = useState<SimulationPhase>('intro');
  const [userInput, setUserInput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<boolean[]>([]);

  const correctPhrase = 'Break, Break, Break';

  const checkPhrase = () => {
    const normalized = userInput.trim().toLowerCase().replace(/[.,!]/g, '');
    const expected = correctPhrase.toLowerCase().replace(/,/g, '');
    
    if (normalized.includes('break break break') || normalized.includes('break, break, break')) {
      setFeedback({
        type: 'success',
        message: 'Correct! "Break, Break, Break" seizes control of the radio channel during an emergency.'
      });
      setTimeout(() => {
        setFeedback(null);
        setPhase('scenario');
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      setFeedback({
        type: 'error',
        message: `Incorrect. The phrase is "Break, Break, Break" - said three times to cut through chatter.`
      });
    }
  };

  const handleScenarioAnswer = (correct: boolean) => {
    setScenarioAnswers(prev => [...prev, correct]);
    if (scenarioAnswers.length >= 1) {
      setTimeout(() => setPhase('complete'), 1500);
    }
  };

  const resetSimulation = () => {
    setPhase('intro');
    setUserInput('');
    setAttempts(0);
    setFeedback(null);
    setScenarioAnswers([]);
  };

  const score = Math.round((scenarioAnswers.filter(Boolean).length / Math.max(scenarioAnswers.length, 1)) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Radio Discipline Training
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Radio className="h-3 w-3" />
          "Break, Break, Break" Protocol
        </Badge>
      </div>

      {phase === 'intro' && (
        <div className="space-y-6">
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">The Problem with Panic</h3>
                  <p className="mb-4">
                    In the Bird Dog scenario, the frantic call <em>"Jimmy's hurt!"</em> was dangerous. 
                    It was unstructured panic that doesn't convey critical information.
                  </p>
                  <blockquote className="border-l-4 border-destructive pl-4 italic">
                    "Jimmy's hurt bad! He's at the primary! Get help!"
                  </blockquote>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                The Protocol: Seize the Channel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                To seize control of a radio channel during a crisis, use the universal interrupt phrase:
              </p>
              <div className="bg-background border-2 border-primary rounded-lg p-6 text-center">
                <p className="text-3xl font-bold text-primary">"Break, Break, Break"</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">Why three times?</p>
                    <p className="text-muted-foreground text-sm">
                      It's a cognitive "breaker." It cuts through the chatter of haul trucks and plant noise. 
                      When people hear it, they know to stop talking immediately.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium">The Complete Script:</p>
                    <p className="text-muted-foreground text-sm">
                      "Break, Break, Break. Emergency at [Location]. [Nature of Incident]. Silence this frequency."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" onClick={() => setPhase('practice')}>
              Practice the Protocol
            </Button>
          </div>
        </div>
      )}

      {phase === 'practice' && (
        <div className="space-y-6">
          <Card className="bg-warning/5 border-warning/20">
            <CardHeader>
              <CardTitle>Practice: Type the Interrupt Phrase</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                An emergency has occurred. Type the phrase you would use to seize control of the radio channel:
              </p>
              <div className="flex gap-3">
                <Input 
                  placeholder="Type the emergency interrupt phrase..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkPhrase()}
                  className="text-lg"
                />
                <Button onClick={checkPhrase}>Submit</Button>
              </div>
              {feedback && (
                <div className={`p-4 rounded-lg flex items-start gap-3 ${
                  feedback.type === 'success' ? 'bg-success/10 border border-success/30' : 'bg-destructive/10 border border-destructive/30'
                }`}>
                  {feedback.type === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  )}
                  <p>{feedback.message}</p>
                </div>
              )}
              {attempts > 2 && (
                <p className="text-sm text-muted-foreground">
                  Hint: The phrase uses the word "Break" three times...
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {phase === 'scenario' && (
        <div className="space-y-6">
          <Card className="bg-destructive/10 border-destructive/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Scenario: Fire at the Crusher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                You witness a fire break out at the primary crusher. The radio is filled with normal haul truck chatter. 
                Which is the correct emergency call?
              </p>
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-6 text-left"
                  onClick={() => handleScenarioAnswer(false)}
                >
                  "Hey! There's a fire! Someone help!"
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-6 text-left"
                  onClick={() => handleScenarioAnswer(true)}
                >
                  "Break, Break, Break. Emergency at the primary crusher. Structure fire in progress. Silence this frequency."
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-6 text-left"
                  onClick={() => handleScenarioAnswer(false)}
                >
                  "Dispatch, this is Unit 7, we have a situation..."
                </Button>
              </div>
              {scenarioAnswers.length > 0 && (
                <div className={`p-4 rounded-lg ${
                  scenarioAnswers[scenarioAnswers.length - 1] 
                    ? 'bg-success/10 border border-success/30' 
                    : 'bg-destructive/10 border border-destructive/30'
                }`}>
                  <p>
                    {scenarioAnswers[scenarioAnswers.length - 1] 
                      ? '✓ Correct! This follows the proper protocol: Interrupt phrase + Location + Nature + Silence command.' 
                      : '✗ Incorrect. The call should start with "Break, Break, Break" and include location, nature, and silence command.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {phase === 'complete' && (
        <div className="space-y-6 text-center">
          <div className="py-8">
            <CheckCircle className="h-20 w-20 mx-auto text-success mb-4" />
            <h3 className="text-2xl font-bold mb-2">Radio Discipline Training Complete!</h3>
            <p className="text-lg text-muted-foreground mb-6">
              You've learned to seize control of the radio during emergencies.
            </p>
          </div>

          <Card className="bg-primary/5 border-primary/20 text-left">
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">The Complete Emergency Radio Script:</h4>
              <div className="bg-background border-2 border-primary rounded-lg p-4">
                <ol className="space-y-2 text-lg">
                  <li><strong>1.</strong> "Break, Break, Break"</li>
                  <li><strong>2.</strong> "Emergency at [LOCATION]"</li>
                  <li><strong>3.</strong> "[NATURE OF INCIDENT]"</li>
                  <li><strong>4.</strong> "Silence this frequency"</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" onClick={resetSimulation}>
            Restart Training
          </Button>
        </div>
      )}
    </div>
  );
};
