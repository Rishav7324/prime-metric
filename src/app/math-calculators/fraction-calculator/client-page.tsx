
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type FractionOp = "add" | "subtract" | "multiply" | "divide";

type FractionResult = {
  numerator: number;
  denominator: number;
  display: string;
  decimal: number;
};

const gcd = (a: number, b: number): number => {
  a = Math.abs(a); b = Math.abs(b);
  while (b !== 0) { const t = b; b = a % b; a = t; }
  return a || 1;
};

const simplify = (numerator: number, denominator: number) => {
  if (denominator === 0) return { num: numerator, den: denominator };
  const divisor = gcd(numerator, denominator);
  const num = numerator / divisor;
  const den = denominator / divisor;
  return den < 0 ? { num: -num, den: -den } : { num, den };
};

function computeFraction(n1Str: string, d1Str: string, n2Str: string, d2Str: string, op: string): FractionResult | null {
  const n1 = parseInt(n1Str, 10);
  const d1 = parseInt(d1Str, 10);
  const n2 = parseInt(n2Str, 10);
  const d2 = parseInt(d2Str, 10);
  if ([n1, d1, n2, d2].some((v) => !Number.isFinite(v))) return null;
  if (d1 === 0 || d2 === 0) return null;
  if ([n1, d1, n2, d2].some((v) => Math.abs(v) > 1_000_000)) return null;

  let numerator = 0;
  let denominator = 1;

  switch (op) {
    case "add":
      numerator = n1 * d2 + n2 * d1;
      denominator = d1 * d2;
      break;
    case "subtract":
      numerator = n1 * d2 - n2 * d1;
      denominator = d1 * d2;
      break;
    case "multiply":
      numerator = n1 * n2;
      denominator = d1 * d2;
      break;
    case "divide":
      if (n2 === 0) return null;
      numerator = n1 * d2;
      denominator = d1 * n2;
      break;
    default:
      return null;
  }

  const simplified = simplify(numerator, denominator);
  if (simplified.den === 0 || !Number.isFinite(simplified.num) || !Number.isFinite(simplified.den)) return null;

  let display = "";
  if (simplified.num === 0) {
    display = "0";
  } else if (simplified.den === 1) {
    display = simplified.num.toLocaleString();
  } else {
    display = `${simplified.num.toLocaleString()} / ${simplified.den.toLocaleString()}`;
  }
  const decimal = simplified.num / simplified.den;
  if (!Number.isFinite(decimal)) return null;
  return { numerator: simplified.num, denominator: simplified.den, display, decimal };
}

const FractionCalculator = () => {
  const [num1, setNum1] = useState("1");
  const [den1, setDen1] = useState("2");
  const [num2, setNum2] = useState("3");
  const [den2, setDen2] = useState("4");
  const [operation, setOperation] = useState<FractionOp>("add");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<FractionResult | null>(() => computeFraction("1", "2", "3", "4", "add"));
  const { toast } = useToast();

  const calculate = () => {
    const n1 = parseInt(num1, 10);
    const d1 = parseInt(den1, 10);
    const n2 = parseInt(num2, 10);
    const d2 = parseInt(den2, 10);

    if ([n1, d1, n2, d2].some((v) => !Number.isFinite(v))) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid whole numbers for all numerators and denominators.",
      });
      return;
    }
    if (d1 === 0 || d2 === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Denominators cannot be zero (division by zero).",
      });
      return;
    }
    if ([n1, d1, n2, d2].some((v) => Math.abs(v) > 1_000_000)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Values must be within ±1,000,000.",
      });
      return;
    }
    if (operation === "divide" && n2 === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Cannot divide by a zero fraction (second numerator is zero).",
      });
      return;
    }

    const computed = computeFraction(num1, den1, num2, den2, operation);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Could not compute the fraction. Check for division by zero.",
      });
      return;
    }

    setResult(computed);
    toast({
      title: "Calculation Complete",
      description: `The result is ${computed.display} (≈ ${computed.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}).`,
    });
  };

  const reset = () => {
    setNum1(""); setDen1(""); setNum2(""); setDen2(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Fraction result: ${result.display} (≈ ${result.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions"
      keywords="fraction calculator, add fractions, subtract fractions, multiply fractions, divide fractions, simplify fractions"
      canonicalUrl="/math-calculators/fraction-calculator"
      explanation="This calculator performs arithmetic operations on fractions and automatically simplifies the results."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="num1">Fraction 1 - Numerator</Label>
              <Input
                id="num1"
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="e.g., 1"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="den1">Fraction 1 - Denominator</Label>
              <Input
                id="den1"
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Operation</Label>
            <Select value={operation} onValueChange={(v) => setOperation(v as FractionOp)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
                <SelectItem value="multiply">Multiply (×)</SelectItem>
                <SelectItem value="divide">Divide (÷)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="num2">Fraction 2 - Numerator</Label>
              <Input
                id="num2"
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="e.g., 3"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium" htmlFor="den2">Fraction 2 - Denominator</Label>
              <Input
                id="den2"
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                placeholder="e.g., 4"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-neutral-600">Result</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary text-center">{result.display}</p>
              <p className="text-sm text-neutral-500 text-center mt-1">≈ {result.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Fraction Calculator is a versatile tool designed to perform basic arithmetic operations—addition, subtraction, multiplication, and division—on two fractions. It simplifies the result to its lowest terms, making it an essential resource for students, teachers, and professionals who need to work with fractions accurately and efficiently."
        useCases={[
          { title: "Homework and Tutoring", description: "Students can use it to check their homework, understand fraction arithmetic, and practice simplifying fractions." },
          { title: "Cooking and Baking", description: "Adjust recipe ingredients by multiplying or dividing fractional quantities, ensuring perfect results every time." },
          { title: "Crafts and Woodworking", description: "Calculate measurements for projects that require precise fractional dimensions, such as carpentry or sewing." },
          { title: "General Math", description: "Quickly perform fraction calculations for everyday tasks without manual computation." }
        ]}
        tips={[
          { title: "Check for Zero", description: "The denominator of a fraction can never be zero. Ensure your denominators are non-zero numbers to avoid errors." },
          { title: "Simplifying is Key", description: "The calculator automatically simplifies the result, showing you the fraction in its most reduced form, which is standard practice." },
          { title: "Improper Fractions", description: "The calculator handles improper fractions (where the numerator is larger than the denominator) correctly." },
          { title: "Whole Numbers", description: "To use a whole number in a calculation, enter it as the numerator with a denominator of 1 (e.g., 5 becomes 5/1)." }
        ]}
        faqs={[
          { question: "How does the calculator simplify fractions?", answer: "It finds the Greatest Common Divisor (GCD) of the numerator and denominator and divides both by it to get the simplest form." },
          { question: "What happens if I divide by a zero fraction?", answer: "Division by a fraction with a zero numerator (which is zero) is not allowed and will result in an error, as division by zero is undefined." },
          { question: "Can I use negative fractions?", answer: "Yes, you can enter negative numbers in the numerator fields to perform calculations with negative fractions." },
          { question: "How are the operations performed?", answer: "The calculator follows standard arithmetic rules for fractions, such as finding a common denominator for addition/subtraction and cross-multiplying for division." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default FractionCalculator;
