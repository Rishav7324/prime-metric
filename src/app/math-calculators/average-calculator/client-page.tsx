
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

type AverageResult = {
  mean: number;
  median: number;
  mode: number[];
  range: number;
  count: number;
  sum: number;
};

function computeAverage(input: string): AverageResult | null {
  const tokens = input.split(",").map((t) => t.trim()).filter((t) => t !== "");
  if (tokens.length === 0) return null;
  const numArray: number[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (!Number.isFinite(n)) return null;
    numArray.push(n);
  }
  if (numArray.length === 0) return null;

  const sum = numArray.reduce((a, b) => a + b, 0);
  const mean = sum / numArray.length;

  const sorted = [...numArray].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];

  const frequency = new Map<number, number>();
  numArray.forEach((n) => frequency.set(n, (frequency.get(n) ?? 0) + 1));
  const maxFreq = Math.max(...frequency.values());
  const mode = [...frequency.entries()].filter(([, f]) => f === maxFreq).map(([k]) => k);

  const range = Math.max(...numArray) - Math.min(...numArray);

  return { mean, median, mode, range, count: numArray.length, sum };
}

function formatStat(n: number): string {
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const DEFAULT_NUMBERS = "12, 15, 18, 22, 22, 30";

const AverageCalculator = () => {
  const [numbers, setNumbers] = useState(DEFAULT_NUMBERS);
  const [result, setResult] = useState<AverageResult | null>(() => computeAverage(DEFAULT_NUMBERS));
  const { toast } = useToast();

  const calculate = () => {
    if (numbers.trim() === "") {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter at least one number (e.g., 1, 2, 3, 4, 5).",
        });
        return;
    }
    const computed = computeAverage(numbers);
    if (!computed) {
        const tokens = numbers.split(",").map((t) => t.trim()).filter((t) => t !== "");
        const invalid = tokens.filter((t) => !Number.isFinite(Number(t)));
        if (tokens.length === 0) {
          toast({
              variant: "destructive",
              title: "Invalid Input",
              description: "Please enter at least one valid number.",
          });
        } else {
          toast({
              variant: "destructive",
              title: "Invalid Input",
              description: invalid.length > 0
                ? `These are not valid numbers: ${invalid.slice(0, 5).join(", ")}. Use comma-separated numbers only.`
                : "Please enter at least one valid number.",
          });
        }
        return;
    }

    setResult(computed);
    toast({
        title: "Calculation Complete",
        description: "Statistical measures have been calculated.",
    });
  };

  const reset = () => {
    setNumbers("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Mean: ${formatStat(result.mean)}, Median: ${formatStat(result.median)}, Mode: ${result.mode.map(formatStat).join(", ")}, Range: ${formatStat(result.range)}, Count: ${result.count.toLocaleString()}, Sum: ${formatStat(result.sum)} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Average Calculator"
      description="Calculate mean, median, mode, and range of numbers"
      keywords="average calculator, mean calculator, median calculator, mode calculator, range calculator, statistics calculator"
      canonicalUrl="/math-calculators/average-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium" htmlFor="numbers-input">Enter Numbers (comma-separated)</Label>
            <Input
              id="numbers-input"
              value={numbers}
              onChange={(e) => setNumbers(e.target.value)}
              placeholder="e.g., 1, 2, 3, 4, 5"
              className="mt-2"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button" disabled={!numbers.trim()}>
              Calculate Statistics
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">Your Result</h2>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Mean (Average)</p>
                <p className="text-3xl font-bold text-primary">{formatStat(result.mean)}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-neutral-600">Median</p>
                  <p className="text-xl font-bold">{formatStat(result.median)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-neutral-600">Mode</p>
                  <p className="text-xl font-bold">{result.mode.map(formatStat).join(", ")}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-neutral-600">Range</p>
                  <p className="text-xl font-bold">{formatStat(result.range)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-neutral-600">Count</p>
                  <p className="text-xl font-bold">{result.count.toLocaleString()}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center col-span-2 md:col-span-2">
                  <p className="text-sm text-neutral-600">Sum</p>
                  <p className="text-xl font-bold">{formatStat(result.sum)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Average Calculator computes various statistical measures from a set of numbers. It calculates mean (arithmetic average), median (middle value), mode (most frequent value), and range (difference between maximum and minimum values). These statistics help you understand data distribution and central tendencies."
        useCases={[
          { title: "Academic Performance", description: "Calculate average grades across multiple subjects or assignments to track student progress and identify areas needing improvement." },
          { title: "Financial Analysis", description: "Analyze average expenses, income, or sales figures over time to make informed budgeting and business decisions." },
          { title: "Data Analysis", description: "Find central tendencies in research data, survey responses, or experiment results for statistical reporting." },
          { title: "Sports Statistics", description: "Calculate average scores, times, or performance metrics for athletes and teams to track improvement." }
        ]}
        tips={[
          { title: "Input Format", description: "Enter numbers separated by commas. Spaces are automatically handled, so \"1, 2, 3\" and \"1,2,3\" both work." },
          { title: "Understanding Mode", description: "Mode shows the most frequently occurring values. If all numbers appear once, all numbers are modes. Multiple modes indicate multimodal distribution." },
          { title: "Median vs Mean", description: "Median is less affected by outliers than mean. Use median for skewed distributions with extreme values." },
          { title: "Range Interpretation", description: "A larger range indicates more spread in your data, while a smaller range suggests values are closer together." }
        ]}
        faqs={[
          { question: "What's the difference between mean and median?", answer: "Mean is the arithmetic average (sum divided by count), while median is the middle value when numbers are sorted. Median is better for data with outliers." },
          { question: "Can there be multiple modes?", answer: "Yes! If two or more numbers appear with the same highest frequency, they're all modes. Data with one mode is unimodal, two modes is bimodal, and more is multimodal." },
          { question: "What does range tell me?", answer: "Range shows the spread of your data by measuring the difference between the largest and smallest values. It gives a quick sense of variability." },
          { question: "How do I handle decimal numbers?", answer: "Decimal numbers work perfectly. Just enter them with periods (e.g., 1.5, 2.3, 4.8) separated by commas." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AverageCalculator;
