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

type PythagResult = {
  missing: "a" | "b" | "c";
  value: number;
  label: string;
};

function computePythagorean(aStr: string, bStr: string, cStr: string): PythagResult | null {
  const hasA = aStr.trim() !== "";
  const hasB = bStr.trim() !== "";
  const hasC = cStr.trim() !== "";
  const count = [hasA, hasB, hasC].filter(Boolean).length;
  if (count !== 2) return null;
  const a = parseFloat(aStr);
  const b = parseFloat(bStr);
  const c = parseFloat(cStr);
  if (hasA && !(a > 0 && Number.isFinite(a))) return null;
  if (hasB && !(b > 0 && Number.isFinite(b))) return null;
  if (hasC && !(c > 0 && Number.isFinite(c))) return null;
  if (hasA && hasB && !hasC) {
    return { missing: "c", value: Math.sqrt(a * a + b * b), label: "Side C (Hypotenuse)" };
  }
  if (hasA && hasC && !hasB) {
    if (!(c > a)) return null;
    return { missing: "b", value: Math.sqrt(c * c - a * a), label: "Side B" };
  }
  if (hasB && hasC && !hasA) {
    if (!(c > b)) return null;
    return { missing: "a", value: Math.sqrt(c * c - b * b), label: "Side A" };
  }
  return null;
}

const DEFAULT_A = "3";
const DEFAULT_B = "4";
const DEFAULT_C = "";

const PythagoreanCalculator = () => {
  const [sideA, setSideA] = useState(DEFAULT_A);
  const [sideB, setSideB] = useState(DEFAULT_B);
  const [sideC, setSideC] = useState(DEFAULT_C);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PythagResult | null>(() => computePythagorean(DEFAULT_A, DEFAULT_B, DEFAULT_C));
  const { toast } = useToast();

  const formatVal = (v: number) =>
    v.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });

  const calculate = () => {
    const hasA = sideA.trim() !== "";
    const hasB = sideB.trim() !== "";
    const hasC = sideC.trim() !== "";
    const count = [hasA, hasB, hasC].filter(Boolean).length;
    if (count !== 2) {
      toast({ title: "Invalid Input", description: "Please provide exactly two sides to calculate the third.", variant: "destructive" });
      return;
    }
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    if (hasA && !(a > 0 && Number.isFinite(a))) {
      toast({ title: "Invalid Input", description: "Side A must be a positive number.", variant: "destructive" });
      return;
    }
    if (hasB && !(b > 0 && Number.isFinite(b))) {
      toast({ title: "Invalid Input", description: "Side B must be a positive number.", variant: "destructive" });
      return;
    }
    if (hasC && !(c > 0 && Number.isFinite(c))) {
      toast({ title: "Invalid Input", description: "Side C (hypotenuse) must be a positive number.", variant: "destructive" });
      return;
    }
    if (hasA && hasC && !(c > a)) {
      toast({ title: "Invalid Input", description: "Side A must be positive and smaller than Side C.", variant: "destructive" });
      return;
    }
    if (hasB && hasC && !(c > b)) {
      toast({ title: "Invalid Input", description: "Side B must be positive and smaller than Side C.", variant: "destructive" });
      return;
    }
    const computed = computePythagorean(sideA, sideB, sideC);
    if (!computed) {
      toast({ title: "Invalid Input", description: "Please provide exactly two valid sides to calculate the third.", variant: "destructive" });
      return;
    }
    if (computed.missing === "c") setSideC(computed.value.toFixed(4));
    if (computed.missing === "b") setSideB(computed.value.toFixed(4));
    if (computed.missing === "a") setSideA(computed.value.toFixed(4));
    setResult(computed);
    toast({ title: "Success", description: `Calculated ${computed.label}: ${formatVal(computed.value)}.` });
  };

  const reset = () => {
    setSideA("");
    setSideB("");
    setSideC("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `${result.label} = ${formatVal(result.value)} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Pythagorean Theorem Calculator"
      description="Calculate the missing side of a right-angled triangle."
      canonicalUrl="/math-calculators/pythagorean-theorem-calculator"
      formula="a² + b² = c²"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">Enter values for any two sides to calculate the third.</p>
          <div>
            <Label>Side a</Label>
            <Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="Enter length of side a" />
          </div>
          <div>
            <Label>Side b</Label>
            <Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="Enter length of side b" />
          </div>
          <div>
            <Label>Side c (Hypotenuse)</Label>
            <Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} placeholder="Enter length of side c" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate</Button>
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
              <p className="text-2xl font-bold text-primary text-center">{result.label} = {formatVal(result.value)}</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Pythagorean Theorem Calculator finds the missing side of a right-angled triangle based on the lengths of the other two sides. The theorem, a² + b² = c², is a fundamental principle in geometry where 'a' and 'b' are the lengths of the two legs, and 'c' is the length of the hypotenuse (the side opposite the right angle)."
        useCases={[
            { title: "Construction and Carpentry", description: "Ensure corners are perfectly square (90 degrees) by measuring the sides and diagonal of a frame." },
            { title: "Navigation", description: "Calculate the straight-line distance between two points on a grid by treating the horizontal and vertical distances as the triangle's legs." },
            { title: "Geometry Homework", description: "Quickly solve for the missing side of a right triangle in academic problems." },
        ]}
        tips={[
            { title: "Identify the Hypotenuse", description: "The hypotenuse (side 'c') is always the longest side and is opposite the right angle. When solving for a leg ('a' or 'b'), make sure 'c' is the largest value." },
            { title: "Units", description: "Ensure all measurements are in the same unit (e.g., inches, centimeters). The result will be in that same unit." },
            { title: "Real-World Application", description: "When measuring a TV screen, the advertised size (e.g., 55 inches) is the diagonal (hypotenuse). You can use the theorem to find its actual height and width if you know the aspect ratio." },
        ]}
        faqs={[
            { question: "What is the Pythagorean theorem?", answer: "It's a formula relating the three sides of a right-angled triangle: a² + b² = c², where 'a' and 'b' are the legs and 'c' is the hypotenuse." },
            { question: "Can this be used for any triangle?", answer: "No, the Pythagorean theorem only applies to right-angled triangles (triangles with one 90-degree angle)." },
            { question: "What is a 'Pythagorean Triple'?", answer: "A Pythagorean triple is a set of three positive integers (a, b, c) that perfectly satisfy the theorem, such as (3, 4, 5) or (5, 12, 13)." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PythagoreanCalculator;

    