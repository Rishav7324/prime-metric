'use client';
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type GradeResult = {
  percentage: number;
  grade: string;
  gradeColor: string;
};

function computeGrade(scoredStr: string, totalStr: string): GradeResult | null {
  const score = parseFloat(scoredStr);
  const max = parseFloat(totalStr);
  if (isNaN(score) || isNaN(max) || max <= 0 || score < 0 || score > max) return null;
  const percentage = (score / max) * 100;
  let grade = "F";
  let gradeColor = "text-red-600";
  if (percentage >= 90) {
    grade = "A";
    gradeColor = "text-green-600";
  }
  else if (percentage >= 80) {
    grade = "B";
    gradeColor = "text-blue-600";
  }
  else if (percentage >= 70) {
    grade = "C";
    gradeColor = "text-yellow-600";
  }
  else if (percentage >= 60) {
    grade = "D";
    gradeColor = "text-orange-400";
  }
  return { percentage, grade, gradeColor };
}

const GradeCalculatorClient = () => {
  const [scored, setScored] = useState("85");
  const [total, setTotal] = useState("100");
  // Auto-calculates on mount with default marks so result renders instantly
  const [result, setResult] = useState<GradeResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const computed = computeGrade("85", "100");
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const score = parseFloat(scored);
    const max = parseFloat(total);
    if (scored.trim() === "" || isNaN(score)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter your scored marks as a number zero or greater.",
      });
      return;
    }
    if (total.trim() === "" || isNaN(max) || max <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Total marks must be a number greater than zero.",
      });
      return;
    }
    if (score < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Scored marks can't be negative.",
      });
      return;
    }
    if (score > max) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Scored marks can't exceed total marks.",
      });
      return;
    }
    const computed = computeGrade(scored, total);
    if (!computed) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a valid score and a positive total.",
        });
        return;
    }
    setResult(computed);
    toast({
      title: "Grade Calculated",
      description: `Your grade is ${computed.grade} with ${computed.percentage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%.`
    });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `I scored grade ${result.grade} (${result.percentage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%) — ${scored.toLocaleString()} out of ${total.toLocaleString()}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate grade percentage and letter grade from scored marks"
      keywords="grade calculator, percentage calculator, test score calculator, final grade"
      canonicalUrl="/other-calculators/grade-calculator"
      formula="Percentage = (Scored Marks ÷ Total Marks) × 100"
      explanation="This calculator converts your scored marks into a percentage and assigns a letter grade based on standard grading scales."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label>Marks Scored</Label>
              <Input
                type="number"
                value={scored}
                onChange={(e) => setScored(e.target.value)}
                placeholder="e.g., 85"
                className="h-12 text-lg"
              />
            </div>
            <div>
              <Label>Total Marks</Label>
              <Input
                type="number"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                placeholder="e.g., 100"
                className="h-12 text-lg"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 gradient-button h-10">
                Calculate Grade
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Result</h3>
              {result && (
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              )}
            </div>
            {result ? (
                <div className="text-center">
                    <div className={`text-7xl font-bold ${result.gradeColor}`}>{result.grade}</div>
                    <div className="text-2xl mt-2 font-semibold">{result.percentage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-40 text-neutral-600">
                    <p>Enter score to see grade.</p>
                </div>
            )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The grade calculator is an essential educational tool that converts numerical scores into letter grades and percentages. It helps students, teachers, and parents quickly understand academic performance relative to total possible points. Grade calculators use standardized grading scales to provide consistent evaluation across different assignments, tests, and courses. This tool is particularly useful for tracking progress throughout a semester, calculating what scores are needed on future assignments to achieve desired final grades, and understanding how individual assignments impact overall course performance."
        useCases={[
          {
            title: "Student Performance Tracking",
            description: "Monitor your academic progress by calculating grades for individual assignments, tests, and projects to understand how they contribute to your overall course grade."
          },
          {
            title: "Required Score Planning",
            description: "Calculate what score you need on your final exam to achieve a desired course grade, helping you prioritize study efforts and set realistic goals."
          },
          {
            title: "Teacher Grading Assistance",
            description: "Quickly convert raw scores to letter grades when grading multiple assignments or tests, ensuring consistent and fair evaluation across all students."
          },
          {
            title: "Parent-Student Communication",
            description: "Help parents understand their children's academic performance by translating numerical scores into easily interpretable letter grades and percentages."
          }
        ]}
        tips={[
          {
            title: "Understand Grading Scales",
            description: "Different institutions use different grading scales. Some use a 10-point scale (90-100 = A), while others use a 7-point scale (93-100 = A). Always confirm which scale your school uses."
          },
          {
            title: "Track Cumulative Performance",
            description: "Don't focus solely on individual assignment grades. Calculate your cumulative grade regularly to understand your overall standing and identify areas needing improvement."
          },
          {
            title: "Consider Weighted Grades",
            description: "Remember that many courses weight different assignment types differently. A test might be worth more than homework. Check your syllabus for weight distributions."
          },
          {
            title: "Set Realistic Goals",
            description: "Use the calculator to set achievable grade goals based on remaining assignments. If you need a 98% on the final to get an A, you might want to reassess your target."
          }
        ]}
        faqs={[
          {
            question: "What do different letter grades mean?",
            answer: "In the standard U.S. grading system: A (90-100%) represents excellent performance, B (80-89%) is above average, C (70-79%) is average, D (60-69%) is below average but passing, and F (below 60%) is failing. Some schools use plus/minus variations for more granular assessment."
          },
          {
            question: "How do I calculate my overall course grade?",
            answer: "To calculate overall course grade, multiply each assignment grade by its weight (percentage of total grade), sum all weighted scores, and divide by the total weight. For example, if tests are 50% and homework is 50%, and you scored 85% on tests and 95% on homework: (85×0.5 + 95×0.5) = 90%."
          },
          {
            question: "Can I bring up a failing grade?",
            answer: "It depends on how much of the course remains and the weight of remaining assignments. Use the calculator to determine what scores you need on remaining work. The earlier in the term, the more opportunity you have to improve your grade through strong performance on future assignments."
          },
          {
            question: "What is grade point average (GPA)?",
            answer: "GPA converts letter grades to a numerical scale (typically 4.0 for A, 3.0 for B, 2.0 for C, 1.0 for D, 0.0 for F) and averages them across all courses, sometimes weighted by credit hours. It provides a standardized measure of overall academic performance."
          },
          {
            question: "Do colleges care more about grades or GPA?",
            answer: "Colleges consider both individual course grades and cumulative GPA. They look at grade trends (improving vs. declining), difficulty of courses taken (honors, AP, etc.), and performance in courses related to your intended major. Consistent high performance is generally more impressive than sporadic excellence."
          }
        ]}
      />
    </CalculatorLayout>
  );
};

export default GradeCalculatorClient;
