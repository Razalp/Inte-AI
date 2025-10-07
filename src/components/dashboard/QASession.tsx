import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MessageSquare, Code, Briefcase, Users, Database, CheckCircle2, XCircle, Award } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Domain = "Frontend" | "Backend" | "HR" | "Product";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: Record<Domain, Question[]> = {
  Frontend: [
    {
      id: "fe1",
      question: "What is the Virtual DOM in React?",
      options: [
        "A real DOM element that React uses",
        "A lightweight copy of the real DOM kept in memory",
        "A database for storing component state",
        "A CSS framework for styling components"
      ],
      correctAnswer: 1,
      explanation: "The Virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to optimize rendering by minimizing direct DOM manipulation."
    }
  ],
  Backend: [
    {
      id: "be1",
      question: "What is the main difference between SQL and NoSQL databases?",
      options: [
        "SQL is faster than NoSQL",
        "NoSQL is only for small applications",
        "SQL uses structured schema, NoSQL is schema-less or flexible",
        "NoSQL cannot handle relationships"
      ],
      correctAnswer: 2,
      explanation: "SQL databases use structured, predefined schemas and are table-based, while NoSQL databases are more flexible and can handle unstructured data with various data models."
    }
  ],
  HR: [
    {
      id: "hr1",
      question: "When describing a conflict resolution scenario, which framework is most effective?",
      options: [
        "Talk only about the positive outcomes",
        "STAR method (Situation, Task, Action, Result)",
        "Blame the other party involved",
        "Keep it vague to avoid details"
      ],
      correctAnswer: 1,
      explanation: "The STAR method provides a structured way to describe your experience, making it clear and comprehensive while showing your problem-solving approach."
    }
  ],
  Product: [
    {
      id: "pm1",
      question: "What framework helps prioritize features with limited resources?",
      options: [
        "Build everything at once",
        "RICE scoring (Reach, Impact, Confidence, Effort)",
        "Choose features randomly",
        "Only focus on what competitors are doing"
      ],
      correctAnswer: 1,
      explanation: "RICE scoring helps objectively prioritize features by evaluating their Reach, Impact, Confidence level, and required Effort, ensuring optimal resource allocation."
    }
  ],
};

export const QASession = () => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const domains = [
    { name: "Frontend" as Domain, icon: Code, gradient: "bg-gradient-purple" },
    { name: "Backend" as Domain, icon: Database, gradient: "bg-gradient-blue" },
    { name: "HR" as Domain, icon: Users, gradient: "bg-gradient-green" },
    { name: "Product" as Domain, icon: Briefcase, gradient: "bg-gradient-orange" },
  ];

  const currentQuestion = selectedDomain ? questions[selectedDomain][0] : null;

  const handleDomainSelect = (domain: Domain) => {
    setSelectedDomain(domain);
    setSelectedAnswer(null);
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    setHasSubmitted(true);
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      toast.success("Correct! Well done! 🎉", {
        description: currentQuestion.explanation
      });
    } else {
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
      toast.error("Incorrect. Keep learning! 📚", {
        description: currentQuestion.explanation
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    toast.info("This is a demo - in the full version, you'd get more questions!");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card shadow-medium border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Q&A Practice Session
              </CardTitle>
              <CardDescription>
                Test your knowledge with multiple-choice questions
              </CardDescription>
            </div>
            {score.total > 0 && (
              <div className="flex items-center gap-2 bg-gradient-purple text-white px-4 py-2 rounded-lg shadow-colored">
                <Award className="h-4 w-4" />
                <span className="font-bold">
                  {score.correct}/{score.total}
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {domains.map((domain) => {
              const DomainIcon = domain.icon;
              return (
                <Button
                  key={domain.name}
                  variant={selectedDomain === domain.name ? "default" : "outline"}
                  onClick={() => handleDomainSelect(domain.name)}
                  className={`flex flex-col items-center gap-2 h-auto py-4 transition-all duration-300 hover:scale-105 ${
                    selectedDomain === domain.name 
                      ? `${domain.gradient} text-white shadow-colored` 
                      : 'hover:shadow-medium'
                  }`}
                >
                  <DomainIcon className="h-6 w-6" />
                  <span className="font-medium">{domain.name}</span>
                </Button>
              );
            })}
          </div>

          {!selectedDomain && (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg font-medium mb-2">Select a Domain to Start</p>
              <p className="text-sm text-muted-foreground">
                Choose your area of focus and test your knowledge
              </p>
            </div>
          )}

          {selectedDomain && currentQuestion && (
            <Card className="border-2 border-border shadow-soft hover:shadow-medium transition-all">
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                  <Badge variant="outline" className="mb-2">
                    {selectedDomain}
                  </Badge>
                  <h3 className="text-lg font-semibold leading-relaxed">
                    {currentQuestion.question}
                  </h3>
                </div>

                <RadioGroup
                  value={selectedAnswer?.toString()}
                  onValueChange={(value) => !hasSubmitted && setSelectedAnswer(parseInt(value))}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctAnswer;
                    const showResult = hasSubmitted;
                    
                    let cardClasses = "flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-medium";
                    
                    if (!showResult) {
                      cardClasses += isSelected 
                        ? " border-primary bg-primary/5 shadow-soft" 
                        : " border-border hover:border-primary/50";
                    } else {
                      if (isCorrect) {
                        cardClasses += " border-success bg-success/10";
                      } else if (isSelected && !isCorrect) {
                        cardClasses += " border-destructive bg-destructive/10";
                      } else {
                        cardClasses += " border-border opacity-60";
                      }
                    }

                    return (
                      <div key={index} className={cardClasses}>
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                          disabled={hasSubmitted}
                          className="mt-0"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer font-medium"
                        >
                          {option}
                        </Label>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>

                {hasSubmitted && (
                  <div className={`p-4 rounded-lg border-2 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "border-success bg-success/10"
                      : "border-info bg-info/10"
                  }`}>
                    <p className="text-sm font-medium mb-2">
                      {selectedAnswer === currentQuestion.correctAnswer ? "✅ Correct!" : "💡 Explanation:"}
                    </p>
                    <p className="text-sm">{currentQuestion.explanation}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  {!hasSubmitted ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={selectedAnswer === null}
                      className="flex-1 bg-gradient-purple shadow-colored hover:scale-105 transition-transform"
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className="flex-1 bg-gradient-blue shadow-colored hover:scale-105 transition-transform"
                    >
                      Next Question
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
