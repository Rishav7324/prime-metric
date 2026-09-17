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

type ProportionResult = {
  x: number;
  formattedX: string;
  label: string;
};

type SimplifiedResult = {
  simplifiedA: number;
  simplifiedB: number;
  divisor: number;
  label: string;
};

function gcd(x: number, y: number): number {
  const ax = Math.abs(Math.trunc(x));
  const ay = Math.abs(Math.trunc(y));
  return ay === 0 ? ax : gcd(ay, ax % ay);
}

function formatDecimal(n: number, fractionDigits = 4): string {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function computeProportion(aStr: string, bStr: string, cStr: string): ProportionResult | null {
  if (aStr.trim() === "" || bStr.trim() === "" || cStr.trim() === "") return null;
  const valA = parseFloat(aStr);
  const valB = parseFloat(bStr);
  const valC = parseFloat(cStr);
  if (!Number.isFinite(valA) || !Number.isFinite(valB) || !Number.isFinite(valC)) return null;
  if (valA === 0) return null;
  const x = (valB * valC) / valA;
  if (!Number.isFinite(x)) return null;
  const formattedX = formatDecimal(x);
  return { x, formattedX, label: `${aStr.trim()}:${bStr.trim()} = ${cStr.trim()}:${formattedX}` };
}

function computeSimplifiedRatio(aStr: string, bStr: string): SimplifiedResult | null {
  if (aStr.trim() === "" || bStr.trim() === "") return null;
  const valA = Number(aStr);
  const valB = Number(bStr);
  if (!Number.isFinite(valA) || !Number.isFinite(valB)) return null;
  if (!Number.isInteger(valA) || !Number.isInteger(valB)) return null;
  if (valA <= 0 || valB <= 0) return null;
  const divisor = gcd(valA, valB);
  if (!Number.isFinite(divisor) || divisor <= 0) return null;
  const simplifiedA = valA / divisor;
  const simplifiedB = valB / divisor;
  return {
    simplifiedA,
    simplifiedB,
    divisor,
    label: `Simplified ratio is ${simplifiedA.toLocaleString()}:${simplifiedB.toLocaleString()}`,
  };
}

const DEFAULT_A = "10";
const DEFAULT_B = "15";
const DEFAULT_C = "20";
const DEFAULT_PROPORTION = computeProportion(DEFAULT_A, DEFAULT_B, DEFAULT_C);

const RatioCalculator = () => {
  const [a, setA] = useState(DEFAULT_A);
  const [b, setB] = useState(DEFAULT_B);
  const [c, setC] = useState(DEFAULT_C);
  // Pre-filled so the result renders instantly (no empty state, no toast on init)
  const [d, setD] = useState(DEFAULT_PROPORTION ? DEFAULT_PROPORTION.formattedX : "");
  const [result, setResult] = useState<string | null>(() => (DEFAULT_PROPORTION ? DEFAULT_PROPORTION.label : null));
  const { toast } = useToast();
  
  const solveForX = () => {
    if (a.trim() === "" || b.trim() === "" || c.trim() === "") {
      toast({title: "Invalid Input", description: "Please enter numbers for A, B, and C.", variant: "destructive"});
      return;
    }
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);
    if (!Number.isFinite(valA) || !Number.isFinite(valB) || !Number.isFinite(valC)) {
      toast({title: "Invalid Input", description: "A, B, and C must be valid numbers.", variant: "destructive"});
      return;
    }
    if (valA === 0) {
      toast({title: "Cannot Divide by Zero", description: "Value A cannot be zero in a proportion (x = B × C / A).", variant: "destructive"});
      return;
    }
    const computed = computeProportion(a, b, c);
    if (!computed || !Number.isFinite(computed.x)) {
      toast({title: "Invalid Input", description: "Could not solve the proportion with these values.", variant: "destructive"});
      return;
    }
    setD(computed.formattedX);
    setResult(computed.label);
    toast({title: "Proportion Solved", description: `Calculated missing value: ${computed.formattedX}`});
  }
  
  const simplifyRatio = () => {
      if (a.trim() === "" || b.trim() === "") {
        toast({title: "Invalid Input", description: "Please enter positive integers for A and B to simplify.", variant: "destructive"});
        return;
      }
      const valA = Number(a);
      const valB = Number(b);
      if (!Number.isFinite(valA) || !Number.isFinite(valB) || isNaN(valA) || isNaN(valB)) {
        toast({title: "Invalid Input", description: "A and B must be valid numbers.", variant: "destructive"});
        return;
      }
      if (!Number.isInteger(valA) || !Number.isInteger(valB) || valA <= 0 || valB <= 0) {
        toast({title: "Invalid Input", description: "Please enter positive integers for A and B to simplify.", variant: "destructive"});
        return;
      }
      const computed = computeSimplifiedRatio(a, b);
      if (!computed) {
        toast({title: "Invalid Input", description: "Please enter positive integers for A and B to simplify.", variant: "destructive"});
        return;
      }
      setResult(computed.label);
      toast({title: "Ratio Simplified", description: computed.label});
  }

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setD("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Ratio Calculator"
      description="Simplify ratios and solve for missing values in proportions."
      canonicalUrl="/math-calculators/ratio-calculator"
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Solve for X in a Proportion (A:B = C:X)</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1"><Label>A</Label><Input value={a} onChange={e=>setA(e.target.value)} placeholder="A" /></div>
            <div className="flex-1"><Label>B</Label><Input value={b} onChange={e=>setB(e.target.value)} placeholder="B" /></div>
            <div className="flex-1"><Label>C</Label><Input value={c} onChange={e=>setC(e.target.value)} placeholder="C" /></div>
            <div className="flex-1"><Label>X (Result)</Label><Input value={d} readOnly placeholder="X" /></div>
            <Button onClick={solveForX}>Solve</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Simplify a Ratio (A:B)</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1"><Label>A</Label><Input value={a} onChange={e=>setA(e.target.value)} placeholder="e.g., 10" /></div>
            <div className="flex-1"><Label>B</Label><Input value={b} onChange={e=>setB(e.target.value)} placeholder="e.g., 20" /></div>
            <Button onClick={simplifyRatio}>Simplify</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
        
        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-600">Your Result</span>
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
            <div className="text-center font-bold text-xl">{result}</div>
          </div>
        )}
      </div>
      
       <CalculatorContentSection
        aboutContent="The Ratio Calculator is a versatile tool for working with ratios and proportions. It can simplify a ratio to its lowest terms or solve for a missing value in a proportion (e.g., A:B = C:X). Ratios are used to compare the relative sizes of two or more values."
        useCases={[
            { title: "Scaling Recipes", description: "If a recipe for 4 people requires 2 cups of flour, use the ratio calculator to find out how much you need for 6 people." },
            { title: "Map Scaling", description: "Convert distances on a map to real-world distances using the map's scale (e.g., 1 inch = 10 miles)." },
            { title: "Image Resizing", description: "Maintain the aspect ratio of an image when resizing. If you have a 1920x1080 (16:9) image and want the new width to be 800px, you can calculate the new height." },
        ]}
        tips={[
            { title: "Proportions", description: "A proportion is an equation stating that two ratios are equal. The calculator solves for 'X' using cross-multiplication." },
            { title: "Simplifying Ratios", description: "To simplify a ratio, the calculator finds the greatest common divisor (GCD) of the two numbers and divides both by it." },
            { title: "Units", description: "When using ratios, make sure the units are consistent. For example, when scaling a recipe, don't mix cups and liters unless you convert them first." },
        ]}
        faqs={[
            { question: "What is a ratio?", answer: "A ratio is a comparison of two quantities. It can be written with a colon (e.g., 3:4), as a fraction (3/4), or with the word 'to' (3 to 4)." },
            { question: "What is a proportion?", answer: "A proportion is an equation that states that two ratios are equal. For example, 1:2 = 2:4 is a proportion." },
            { question: "How do you solve a proportion for a missing value?", answer: "You use cross-multiplication. For a proportion a/b = c/x, you multiply a by x and b by c, so ax = bc. Then you solve for x: x = (bc)/a." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RatioCalculator;

    