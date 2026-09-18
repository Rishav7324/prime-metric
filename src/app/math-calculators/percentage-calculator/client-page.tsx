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

function parseFinite(v: string): number | null {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function computePercentOf(xStr: string, yStr: string): number | null {
  const x = parseFinite(xStr);
  const y = parseFinite(yStr);
  if (x === null || y === null) return null;
  const out = (x / 100) * y;
  return Number.isFinite(out) ? out : null;
}

function computeWhatPercent(xStr: string, yStr: string): number | null {
  const x = parseFinite(xStr);
  const y = parseFinite(yStr);
  if (x === null || y === null || y === 0) return null;
  const out = (x / y) * 100;
  return Number.isFinite(out) ? out : null;
}

function computePercentChange(initialStr: string, finalStr: string): number | null {
  const initial = parseFinite(initialStr);
  const fin = parseFinite(finalStr);
  if (initial === null || fin === null || initial === 0) return null;
  const out = ((fin - initial) / Math.abs(initial)) * 100;
  return Number.isFinite(out) ? out : null;
}

const fmt = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 2 });

const PercentageCalculator = () => {
  const [val1, setVal1] = useState("20");
  const [val2, setVal2] = useState("500");
  // Pre-filled so results render instantly (no empty state)
  const [result1, setResult1] = useState<number | null>(() => computePercentOf("20", "500"));
  const [result2, setResult2] = useState<number | null>(() => computeWhatPercent("20", "500"));
  const [result3, setResult3] = useState<number | null>(() => computePercentChange("20", "500"));
  const { toast } = useToast();

  const calculate1 = () => {
    const computed = computePercentOf(val1, val2);
    if (computed === null) {
      toast({ title: "Invalid Input", description: "Enter valid numbers for X (%) and Y.", variant: "destructive" });
      return;
    }
    setResult1(computed);
    toast({ title: "Calculation Complete", description: `${val1}% of ${val2} is ${fmt(computed)}.` });
  };

  const calculate2 = () => {
    const y = parseFinite(val2);
    const computed = computeWhatPercent(val1, val2);
    if (computed === null) {
      if (parseFinite(val1) === null || y === null) {
        toast({ title: "Invalid Input", description: "Enter valid numbers for X and Y.", variant: "destructive" });
      } else {
        toast({ title: "Invalid Input", description: "Y cannot be zero (division by zero).", variant: "destructive" });
      }
      return;
    }
    setResult2(computed);
    toast({ title: "Calculation Complete", description: `${val1} is ${fmt(computed)}% of ${val2}.` });
  };
  
  const calculate3 = () => {
    const initial = parseFinite(val1);
    const computed = computePercentChange(val1, val2);
    if (computed === null) {
      if (initial === null || parseFinite(val2) === null) {
        toast({ title: "Invalid Input", description: "Enter valid numbers for initial and final values.", variant: "destructive" });
      } else {
        toast({ title: "Invalid Input", description: "Initial value cannot be zero (division by zero).", variant: "destructive" });
      }
      return;
    }
    setResult3(computed);
    toast({ title: "Calculation Complete", description: `Change is ${fmt(computed)}%.` });
  };

  const reset = () => {
    setVal1(""); setVal2("");
    setResult1(null); setResult2(null); setResult3(null);
  };

  const copyValue = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };


  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="A versatile tool to handle all your percentage calculations."
      canonicalUrl="/math-calculators/percentage-calculator"
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">1. What is X% of Y?</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>X (%)</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="e.g., 20" />
            </div>
             <div className="flex-1">
              <Label>Y</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="e.g., 500" />
            </div>
            <Button onClick={calculate1}>Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result1 !== null && (
            <div className="mt-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 px-1">Result</span>
                <Button onClick={() => copyValue(fmt(result1))} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="text-center font-bold">{fmt(result1)}</div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">2. X is what percent of Y?</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>X</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="e.g., 100" />
            </div>
             <div className="flex-1">
              <Label>Y</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="e.g., 500" />
            </div>
            <Button onClick={calculate2}>Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result2 !== null && (
            <div className="mt-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 px-1">Result</span>
                <Button onClick={() => copyValue(`${fmt(result2)}%`)} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="text-center font-bold">{fmt(result2)}%</div>
            </div>
          )}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">3. Percentage Increase/Decrease</h3>
           <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>Initial Value</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="e.g., 100" />
            </div>
             <div className="flex-1">
              <Label>Final Value</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="e.g., 120" />
            </div>
            <Button onClick={calculate3}>Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result3 !== null && (
            <div className="mt-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 px-1">Result</span>
                <Button onClick={() => copyValue(`${fmt(result3)}%`)} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="text-center font-bold">{fmt(result3)}%</div>
            </div>
          )}
        </Card>
      </div>
      <CalculatorContentSection
        aboutContent="The Percentage Calculator is a versatile tool for handling all types of percentage-based problems. Whether you need to find a percentage of a number, determine what percentage one number is of another, or calculate percentage increase or decrease, this tool has you covered."
        useCases={[
          { title: "Shopping Discounts", description: "Quickly calculate how much you'll save during a sale (e.g., 25% off a $80 item)." },
          { title: "Calculating Tips", description: "Easily figure out how much to tip at a restaurant (e.g., 18% of a $55 bill)." },
          { title: "Financial Analysis", description: "Calculate percentage changes in stock prices, revenue, or other financial metrics." },
          { title: "Academic Grades", description: "Determine your score on a test as a percentage (e.g., 45 correct answers out of 50 questions)." },
        ]}
        tips={[
          { title: "Understanding 'Of'", description: "In math, the word 'of' almost always means 'multiply'. So, '20% of 50' means '0.20 × 50'." },
          { title: "Decimal Conversion", description: "To convert a percentage to a decimal, divide by 100 (e.g., 25% becomes 0.25). To convert a decimal to a percentage, multiply by 100." },
          { title: "Percentage Change Formula", description: "The formula for percentage change is: ((Final Value - Initial Value) / |Initial Value|) × 100." },
        ]}
        examples={[
          { title: "20% of 500", description: "Finding a percentage of a number: 20% of 500 is 100.", steps: ["Convert 20% to a decimal: 20 / 100 = 0.20.", "Multiply: 0.20 × 500 = 100.", "Check with mode 2: (100 / 500) × 100 = 20%."] },
          { title: "80 increased to 100", description: "Percentage change from 80 to 100 is a 25% increase.", steps: ["Difference: 100 − 80 = 20.", "Divide by initial: 20 / 80 = 0.25.", "Multiply by 100: 0.25 × 100 = 25% increase."] },
        ]}
        faqs={[
          { question: "How do I calculate a percentage of a number?", answer: "Convert the percentage to a decimal and multiply it by the number. For example, to find 20% of 200, you would calculate 0.20 * 200 = 40." },
          { question: "How do I find what percentage one number is of another?", answer: "Divide the first number by the second number, then multiply the result by 100. For example, to find what percentage 50 is of 200, you calculate (50 / 200) * 100 = 25%." },
          { question: "How do I calculate percentage increase?", answer: "Subtract the initial value from the final value, divide by the initial value, and multiply by 100. For example, if a price goes from $10 to $12, the increase is (($12 - $10) / $10) * 100 = 20%." },
          { question: "What is 15% off $240 jeans plus 8% sales tax?", answer: "The discount is 0.15 × $240 = $36, so the sale price is $240 − $36 = $204. Tax is 0.08 × $204 = $16.32, making the total $204 + $16.32 = $220.32." },
          { question: "My salary rose from $52,000 to $57,200 — what percent raise is that?", answer: "Subtract: $57,200 − $52,000 = $5,200. Divide by the starting salary: $5,200 / $52,000 = 0.10. Multiply by 100 to get a 10% raise." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentageCalculator;

    