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

type StatMode = "sample" | "population";

type StatsResult = {
  count: number;
  mean: number;
  median: number;
  modes: number[];
  min: number;
  max: number;
  range: number;
  variance: number;
  stdDev: number;
  se: number;
  ciLow: number;
  ciHigh: number;
  margin: number;
  needForHalf: number;
  needForOne: number;
  mode: StatMode;
  sorted: number[];
};

function parseNumberList(input: string): { tokens: string[]; values: number[] } {
  const tokens = input.split(/[,;\s]+/).map((t) => t.trim()).filter((t) => t !== "");
  const values = tokens.map((t) => Number(t)).filter((n) => Number.isFinite(n));
  return { tokens, values };
}

function computeStats(input: string, mode: StatMode): StatsResult | null {
  const { values } = parseNumberList(input);
  if (values.length < 2) return null;
  const n = values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((a, b) => a + b, 0) / n;
  const mid = Math.floor(n / 2);
  const median = n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  const freq = new Map<number, number>();
  for (const v of values) freq.set(v, (freq.get(v) ?? 0) + 1);
  const maxFreq = Math.max(...freq.values());
  const modes = maxFreq > 1 ? [...freq.entries()].filter(([, c]) => c === maxFreq).map(([v]) => v).sort((a, b) => a - b) : [];

  const min = sorted[0];
  const max = sorted[n - 1];
  const sqDiff = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0);
  const variance = mode === "sample" ? sqDiff / (n - 1) : sqDiff / n;
  const stdDev = Math.sqrt(variance);
  const se = stdDev / Math.sqrt(n);
  const margin = 1.96 * se;

  return {
    count: n,
    mean,
    median,
    modes,
    min,
    max,
    range: max - min,
    variance,
    stdDev,
    se,
    ciLow: mean - margin,
    ciHigh: mean + margin,
    margin,
    needForHalf: Math.ceil(Math.pow((1.96 * stdDev) / 0.5, 2)),
    needForOne: Math.ceil(Math.pow((1.96 * stdDev) / 1, 2)),
    mode,
    sorted,
  };
}

function formatStat(v: number): string {
  return v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEFAULT_NUMBERS = "2, 4, 4, 4, 5, 5, 7, 9";
const DEFAULT_MODE: StatMode = "sample";

const StatisticsCalculator = () => {
  const [numbers, setNumbers] = useState(DEFAULT_NUMBERS);
  const [mode, setMode] = useState<StatMode>(DEFAULT_MODE);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<StatsResult | null>(() => computeStats(DEFAULT_NUMBERS, DEFAULT_MODE));
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

    const computed = computeStats(numbers, mode);
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
      description: `Mean ${formatStat(computed.mean)}, 95% CI ${formatStat(computed.ciLow)}–${formatStat(computed.ciHigh)}.`,
    });
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const label = result.mode === "sample" ? "Sample" : "Population";
    const modeText = result.modes.length > 0 ? result.modes.map((m) => formatStat(m)).join(", ") : "none";
    const text = `Stats (${label}, n=${result.count}): mean ${formatStat(result.mean)}, median ${formatStat(result.median)}, mode ${modeText}, range ${formatStat(result.range)}, SD ${formatStat(result.stdDev)}, 95% CI ${formatStat(result.ciLow)}–${formatStat(result.ciHigh)} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Statistics Calculator"
      description="Compute mean, median, mode, range, variance and standard deviation, plus the 95% confidence interval."
      keywords="statistics calculator, mean median mode, confidence interval calculator, variance, sample size"
      canonicalUrl="/math-calculators/statistics-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Enter numbers (comma-separated)</Label>
            <Input value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g., 2, 4, 4, 4, 5, 5, 7, 9" />
          </div>
          <div>
            <Label>Type</Label>
            <Select value={mode} onValueChange={(v) => { const m = v as StatMode; setMode(m); const c = computeStats(numbers, m); if (c) setResult(c); }}>
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
                  <p className="text-sm text-neutral-600">Mean (n={result.count.toLocaleString()})</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-3xl font-bold text-primary text-center">{formatStat(result.mean)}</p>
                <p className="text-xs text-neutral-500 text-center mt-1">
                  95% CI {formatStat(result.ciLow)} – {formatStat(result.ciHigh)} (±{formatStat(result.margin)})
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Median</p>
                  <p className="text-lg font-bold">{formatStat(result.median)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Mode</p>
                  <p className="text-lg font-bold">{result.modes.length > 0 ? result.modes.map((m) => formatStat(m)).join(", ") : "—"}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Range</p>
                  <p className="text-lg font-bold">{formatStat(result.range)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Variance</p>
                  <p className="text-lg font-bold">{formatStat(result.variance)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Std Dev</p>
                  <p className="text-lg font-bold">{formatStat(result.stdDev)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Min – Max</p>
                  <p className="text-lg font-bold">{formatStat(result.min)} – {formatStat(result.max)}</p>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                <p className="text-xs font-semibold text-black mb-1">Sample-size hint</p>
                <p className="text-[13px] text-neutral-600">
                  Current 95% margin is ±{formatStat(result.margin)}. For a ±1.0 margin you would need n≈{result.needForOne.toLocaleString()};
                  for ±0.5, n≈{result.needForHalf.toLocaleString()}. Halving the margin takes roughly 4× the data.
                </p>
              </div>
              <p className="font-mono text-[11px] text-neutral-500 break-words">
                Sorted: {result.sorted.map((v) => v.toLocaleString()).join(", ")}
              </p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="Descriptive statistics summarize any batch of numbers — its center, spread and shape — in a handful of figures. This tool computes mean, median, mode, range, variance and standard deviation from a pasted list, then goes one step further with the 95% confidence interval of the mean. A sample-size hint shows how much data you would need for a tighter margin of error."
        useCases={[
          { title: "Grade Exam Scores", description: "Summarize a class set of marks with the average, middle score and spread in one pass." },
          { title: "Read Survey Ratings", description: "Turn 1–10 ratings into a mean with a confidence band instead of a bare average." },
          { title: "Check Experiment Data", description: "Spot noisy measurements fast — a wide range or SD flags readings worth re-taking." },
          { title: "Summarize Any Figures", description: "Sports stats, sales numbers or timings all compress neatly into center plus spread." },
        ]}
        tips={[
          { title: "Sample vs Population", description: "Keep Sample (n-1) when your numbers are a slice of something bigger; use Population only for the complete set." },
          { title: "Skewed? Trust the Median", description: "A few huge outliers drag the mean up, while the median stays anchored to the typical value." },
          { title: "Mind the n", description: "Confidence intervals assume roughly 10+ values. With tiny samples the band is wide — collect more data." },
        ]}
        faqs={[
          { question: "Mean vs median — which should I use?", answer: "Use the mean for symmetric data and the median when outliers or skew distort the average, such as incomes or house prices." },
          { question: "What does the 95% confidence interval mean?", answer: "It is the range that would contain the true average in about 95 of 100 repeat samples. Narrower bands mean a more precise estimate." },
          { question: "Why divide by n-1 for a sample?", answer: "Samples slightly understate real-world spread, so dividing by n-1 (Bessel's correction) removes that bias and estimates the full population better." },
          { question: "How many values do I need?", answer: "It depends on your spread and goal — the sample-size hint above converts your current SD into the n needed for ±1.0 or ±0.5 margins." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default StatisticsCalculator;
