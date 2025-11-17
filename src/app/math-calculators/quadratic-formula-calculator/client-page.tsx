'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const QuadraticFormulaCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const calculate = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);

    if (isNaN(valA) || isNaN(valB) || isNaN(valC)) {
      toast({ title: "Error", description: "Please enter valid numbers for a, b, and c.", variant: "destructive" });
      return;
    }
    if (valA === 0) {
        toast({ title: "Error", description: "The value of 'a' cannot be zero for a quadratic equation.", variant: "destructive" });
        return;
    }

    const discriminant = valB * valB - 4 * valA * valC;

    if (discriminant > 0) {
      const x1 = (-valB + Math.sqrt(discriminant)) / (2 * valA);
      const x2 = (-valB - Math.sqrt(discriminant)) / (2 * valA);
      setResult(`Two real roots: x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const x = -valB / (2 * valA);
      setResult(`One real root: x = ${x.toFixed(4)}`);
    } else {
      const realPart = (-valB / (2 * valA)).toFixed(4);
      const imaginaryPart = (Math.sqrt(-discriminant) / (2 * valA)).toFixed(4);
      setResult(`Two complex roots: x = ${realPart} ± ${imaginaryPart}i`);
    }
    toast({ title: "Success", description: "Quadratic equation solved."});
  };

  return (
    <CalculatorLayout
      title="Quadratic Formula Calculator"
      description="Solve quadratic equations of the form ax² + bx + c = 0."
      canonicalUrl="/math-calculators/quadratic-formula-calculator"
      formula="x = [-b ± √(b²-4ac)] / 2a"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Coefficient a</Label>
              <Input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="e.g., 1" />
            </div>
            <div>
              <Label>Coefficient b</Label>
              <Input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="e.g., -3" />
            </div>
            <div>
              <Label>Coefficient c</Label>
              <Input type="number" value={c} onChange={(e) => setC(e.target.value)} placeholder="e.g., 2" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Solve for x</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Quadratic Formula Calculator solves quadratic equations of the form ax² + bx + c = 0. This is a staple of algebra, and the calculator provides the roots of the equation, whether they are real or complex."
        useCases={[
            { title: "Algebra Homework", description: "Quickly find the solutions to quadratic equations for math assignments." },
            { title: "Physics Problems", description: "Solve for variables in physics problems that involve projectile motion or other phenomena modeled by quadratic equations." },
            { title: "Engineering", description: "Find points of interest in engineering problems that can be modeled with quadratic functions, such as the shape of a parabolic antenna." },
        ]}
        tips={[
            { title: "The Discriminant", description: "The value inside the square root (b² - 4ac) is called the discriminant. It tells you the nature of the roots: if it's positive, there are two real roots; if it's zero, there is one real root; if it's negative, there are two complex roots." },
            { title: "Standard Form", description: "Make sure your equation is in the standard form ax² + bx + c = 0 before you identify the coefficients a, b, and c." },
            { title: "Coefficient 'a'", description: "The coefficient 'a' cannot be zero. If a=0, the equation is linear, not quadratic." },
        ]}
        faqs={[
            { question: "What is a quadratic equation?", answer: "A quadratic equation is a second-degree polynomial equation in a single variable x with a non-zero 'a' coefficient. The standard form is ax² + bx + c = 0." },
            { question: "What are the 'roots' of an equation?", answer: "The roots (or solutions) are the values of x that make the equation true. For a quadratic equation, these are the points where the parabola crosses the x-axis." },
            { question: "What are complex roots?", answer: "When the discriminant is negative, the equation has no real solutions (the parabola does not cross the x-axis). The solutions involve the imaginary unit 'i' (the square root of -1) and are called complex or imaginary roots." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default QuadraticFormulaCalculator;

    