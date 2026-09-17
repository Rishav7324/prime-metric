'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type QuadraticResult = {
  discriminant: number;
  kind: "two-real" | "one-real" | "complex";
  x1: number | null;
  x2: number | null;
  realPart: number | null;
  imagPart: number | null;
  display: string;
};

function formatRoot(v: number): string {
  return v.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function computeQuadratic(aStr: string, bStr: string, cStr: string): QuadraticResult | null {
  const a = parseFloat(aStr);
  const b = parseFloat(bStr);
  const c = parseFloat(cStr);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) return null;
  if (a === 0) return null;
  const discriminant = b * b - 4 * a * c;
  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return {
      discriminant,
      kind: "two-real",
      x1,
      x2,
      realPart: null,
      imagPart: null,
      display: `Two real roots: x₁ = ${formatRoot(x1)}, x₂ = ${formatRoot(x2)}`,
    };
  }
  if (discriminant === 0) {
    const x = -b / (2 * a);
    return {
      discriminant,
      kind: "one-real",
      x1: x,
      x2: null,
      realPart: null,
      imagPart: null,
      display: `One real root: x = ${formatRoot(x)}`,
    };
  }
  const realPart = -b / (2 * a);
  const imagPart = Math.sqrt(-discriminant) / (2 * a);
  return {
    discriminant,
    kind: "complex",
    x1: null,
    x2: null,
    realPart,
    imagPart,
    display: `Two complex roots: x = ${formatRoot(realPart)} ± ${formatRoot(Math.abs(imagPart))}i`,
  };
}

const DEFAULT_A = "1";
const DEFAULT_B = "-3";
const DEFAULT_C = "2";

const QuadraticFormulaCalculator = () => {
  const [a, setA] = useState(DEFAULT_A);
  const [b, setB] = useState(DEFAULT_B);
  const [c, setC] = useState(DEFAULT_C);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<QuadraticResult | null>(() => computeQuadratic(DEFAULT_A, DEFAULT_B, DEFAULT_C));
  const { toast } = useToast();

  const calculate = () => {
    if (a.trim() === "" || b.trim() === "" || c.trim() === "") {
      toast({ title: "Invalid Input", description: "Please enter values for a, b, and c.", variant: "destructive" });
      return;
    }
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);

    if (!Number.isFinite(valA) || !Number.isFinite(valB) || !Number.isFinite(valC)) {
      toast({ title: "Invalid Input", description: "Please enter valid numbers for a, b, and c.", variant: "destructive" });
      return;
    }
    if (valA === 0) {
        toast({ title: "Invalid Input", description: "The coefficient 'a' cannot be zero for a quadratic equation.", variant: "destructive" });
        return;
    }

    const computed = computeQuadratic(a, b, c);
    if (!computed) {
      toast({ title: "Invalid Input", description: "Could not solve with the given coefficients.", variant: "destructive" });
      return;
    }
    setResult(computed);
    toast({ title: "Success", description: computed.display });
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const disc = result.discriminant.toLocaleString(undefined, { maximumFractionDigits: 4 });
    const text = `${result.display} (a=${a}, b=${b}, c=${c}, discriminant=${disc}) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Solve for x</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Result</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-xl font-bold text-primary text-center">{result.display}</p>
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

    