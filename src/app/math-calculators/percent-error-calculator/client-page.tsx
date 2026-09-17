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

type PercentErrorResult = {
  percentError: number;
  difference: number;
};

function computePercentError(observedStr: string, trueStr: string): PercentErrorResult | null {
  const observed = parseFloat(observedStr);
  const trueVal = parseFloat(trueStr);
  if (!Number.isFinite(observed) || !Number.isFinite(trueVal)) return null;
  if (trueVal === 0) return null;
  return {
    percentError: (Math.abs(observed - trueVal) / Math.abs(trueVal)) * 100,
    difference: observed - trueVal,
  };
}

function formatPct(v: number): string {
  return v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEFAULT_OBSERVED = "9.8";
const DEFAULT_TRUE = "10";

const PercentErrorCalculator = () => {
  const [observedValue, setObservedValue] = useState(DEFAULT_OBSERVED);
  const [trueValue, setTrueValue] = useState(DEFAULT_TRUE);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PercentErrorResult | null>(() => computePercentError(DEFAULT_OBSERVED, DEFAULT_TRUE));
  const { toast } = useToast();

  const calculate = () => {
    if (observedValue.trim() === "" || trueValue.trim() === "") {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter both the observed and true values.",
      });
      return;
    }
    const observed = parseFloat(observedValue);
    const trueVal = parseFloat(trueValue);

    if (!Number.isFinite(observed) || !Number.isFinite(trueVal)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for observed and true values.",
      });
      return;
    }
    if (trueVal === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "The true value cannot be zero (division by zero).",
      });
      return;
    }

    const computed = computePercentError(observedValue, trueValue);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers. The true value cannot be zero.",
      });
      return;
    }
    setResult(computed);

    toast({
        title: "Calculation Complete",
        description: `The percent error is ${formatPct(computed.percentError)}%.`,
    });
  };

  const reset = () => {
    setObservedValue("");
    setTrueValue("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Percent error (observed ${observedValue}, true ${trueValue}) = ${formatPct(result.percentError)}% — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Percent Error Calculator"
      description="Calculate the percent error between an observed and true value."
      canonicalUrl="/math-calculators/percent-error-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Observed (Measured) Value</Label>
            <Input type="number" value={observedValue} onChange={(e) => setObservedValue(e.target.value)} placeholder="e.g., 9.8" />
          </div>
          <div>
            <Label>True (Accepted) Value</Label>
            <Input type="number" value={trueValue} onChange={(e) => setTrueValue(e.target.value)} placeholder="e.g., 10" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Percent Error</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Percent Error</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary text-center">{formatPct(result.percentError)}%</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Percent Error Calculator measures the difference between an experimental or observed value and a true or accepted value, expressed as a percentage. It is a common way to evaluate the accuracy of a measurement in science and engineering."
        useCases={[
            { title: "Scientific Experiments", description: "Determine the accuracy of your measurements in a chemistry or physics lab compared to theoretical values." },
            { title: "Engineering", description: "Assess the precision of a manufactured part against its design specifications." },
            { title: "Statistics", description: "Evaluate the error of a statistical estimate compared to a known population parameter." },
        ]}
        tips={[
            { title: "Absolute Value", description: "Percent error is always a positive value because it measures the magnitude of the error, not its direction." },
            { title: "Context is Key", description: "A 'good' percent error is relative. In some fields, a 5% error is acceptable, while in high-precision engineering, it might need to be less than 0.1%." },
            { title: "Identify Error Sources", description: "A high percent error can indicate issues with your measurement technique, equipment, or experimental setup." },
        ]}
        faqs={[
            { question: "What is percent error?", answer: "Percent error is a measure of how close a measured value is to a true or accepted value. It's calculated as the absolute difference between the two values, divided by the true value, multiplied by 100." },
            { question: "What's the difference between percent error and percent difference?", answer: "Percent error compares a measured value to a known true value. Percent difference is used when you are comparing two experimental measurements to each other, and there is no known true value." },
            { question: "Can percent error be negative?", answer: "No, because the formula uses the absolute value of the difference. It only measures the size of the error, not whether you were over or under the true value." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentErrorCalculator;

    