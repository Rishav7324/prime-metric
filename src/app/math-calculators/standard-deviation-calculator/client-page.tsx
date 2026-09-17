'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw } from "lucide-react";

type StdDevMode = "sample" | "population";

type StdDevResult = {
  mean: number;
  count: number;
  mode: StdDevMode;
  variance: number;
  stdDev: number;
  sampleVariance: number;
  sampleStdDev: number;
  popVariance: number;
  popStdDev: number;
};

function parseNumberList(input: string): { tokens: string[]; values: number[] } {
  const tokens = input.split(/[,;\s]+/).map((t) => t.trim()).filter((t) => t !== "");
  const values = tokens.map((t) => Number(t)).filter((n) => Number.isFinite(n));
  return { tokens, values };
}

function computeStdDev(input: string, mode: StdDevMode): StdDevResult | null {
  const { values } = parseNumberList(input);
  if (values.length < 2) return null;
  const n = values.length;
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const sqDiff = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const sampleVariance = sqDiff / (n - 1);
  const popVariance = sqDiff / n;
  const sampleStdDev = Math.sqrt(sampleVariance);
  const popStdDev = Math.sqrt(popVariance);
  const variance = mode === "sample" ? sampleVariance : popVariance;
  const stdDev = mode === "sample" ? sampleStdDev : popStdDev;
  return { mean, count: n, mode, variance, stdDev, sampleVariance, sampleStdDev, popVariance, popStdDev };
}

function formatStat(v: number): string {
  return v.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

const DEFAULT_NUMBERS = "2, 4, 4, 4, 5, 5, 7, 9";
const DEFAULT_MODE: StdDevMode = "sample";

const StandardDeviationCalculator = () => {
  const [numbers, setNumbers] = useState(DEFAULT_NUMBERS);
  const [mode, setMode] = useState<StdDevMode>(DEFAULT_MODE);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<StdDevResult | null>(() => computeStdDev(DEFAULT_NUMBERS, DEFAULT_MODE));
  const { toast } = useToast();

  const calculate = () => {
    if (numbers.trim() === "") {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter at least two numbers separated by commas.",
      });
      return;
    }
    const { tokens, values } = parseNumberList(numbers);
    if (values.length < 2) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter at least two valid numbers.",
      });
      return;
    }
    if (values.length !== tokens.length) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: `${tokens.length - values.length} of ${tokens.length} entries are not valid numbers. Use comma-separated numbers only.`,
      });
      return;
    }

    const computed = computeStdDev(numbers, mode);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter at least two valid numbers.",
      });
      return;
    }
    setResult(computed);
    
    toast({
        title: "Calculation Complete",
        description: `The ${mode} standard deviation is ${formatStat(computed.stdDev)}.`,
    });
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const label = result.mode === "sample" ? "Sample" : "Population";
    const text = `Std-dev (${label}, n=${result.count}): ${formatStat(result.stdDev)}, variance ${formatStat(result.variance)}, mean ${formatStat(result.mean)}. Sample SD ${formatStat(result.sampleStdDev)}, population SD ${formatStat(result.popStdDev)} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate standard deviation, variance, and mean for a data set."
      canonicalUrl="/math-calculators/standard-deviation-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Enter numbers (comma-separated)</Label>
            <Input value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g., 2, 4, 4, 4, 5, 5, 7, 9" />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={mode} onValueChange={(v) => { const m = v as StdDevMode; setMode(m); const c = computeStdDev(numbers, m); if (c) setResult(c); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sample">Sample (n-1)</SelectItem>
                <SelectItem value="population">Population (N)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">Standard Deviation ({result.mode === "sample" ? "Sample" : "Population"})</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-3xl font-bold text-primary text-center">{formatStat(result.stdDev)}</p>
                <p className="text-xs text-neutral-500 text-center mt-1">
                  Sample {formatStat(result.sampleStdDev)} · Population {formatStat(result.popStdDev)}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Mean</p>
                  <p className="text-lg font-bold">{formatStat(result.mean)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Variance</p>
                  <p className="text-lg font-bold">{formatStat(result.variance)}</p>
                </div>
                 <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Count</p>
                  <p className="text-lg font-bold">{result.count.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Standard Deviation Calculator computes the standard deviation, variance, and mean of a set of numbers. Standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out over a wider range."
        useCases={[
            { title: "Statistical Analysis", description: "Measure the volatility of a stock's returns or the dispersion of data in a scientific experiment." },
            { title: "Quality Control", description: "Monitor the consistency of a manufacturing process by measuring the variation in product specifications." },
            { title: "Academic Research", description: "Analyze the spread of data in research studies to determine the reliability of results." },
        ]}
        tips={[
            { title: "Sample vs. Population", description: "This calculator computes the 'sample' standard deviation (dividing by n-1), which is the most common type and is used when your data is a sample of a larger population. " },
            { title: "Interpreting the Result", description: "A smaller standard deviation means your data points are clustered closely around the average. A larger value means they are more spread out." },
            { title: "Relationship to Variance", description: "The standard deviation is simply the square root of the variance. Variance is another measure of spread, but it's in squared units, making standard deviation often easier to interpret." },
        ]}
        faqs={[
            { question: "What is standard deviation?", answer: "It's a statistical measure of how spread out numbers are from the average (mean). A low standard deviation indicates that the numbers are close to the mean, while a high standard deviation indicates that the numbers are spread out." },
            { question: "What is the difference between sample and population standard deviation?", answer: "You use sample standard deviation when your data is a sample of a larger group. You use population standard deviation when you have data for the entire group. The formulas are slightly different (dividing by n-1 for sample, and by N for population)." },
            { question: "Why is standard deviation important?", answer: "It provides a standardized way to understand the variability of a data set. It's widely used in finance to measure risk, in science to measure the precision of experiments, and in many other fields." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;

    