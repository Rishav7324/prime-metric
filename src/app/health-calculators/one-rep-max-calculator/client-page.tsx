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

type OneRepMaxResult = {
  epley: number;
  brzycki: number;
  average: number;
  table: { pct: number; weight: number }[];
};

const PCTS = [50, 60, 70, 75, 80, 85, 90, 95, 100];

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function computeOneRepMax(weightStr: string, repsStr: string): OneRepMaxResult | null {
  const w = parseFloat(weightStr);
  const reps = parseInt(repsStr);
  if (!(w > 0 && w <= 2000) || !(Number.isInteger(reps) && reps >= 1 && reps <= 12)) return null;
  const epley = w * (1 + reps / 30);
  const brzycki = (w * 36) / (37 - reps);
  const average = (epley + brzycki) / 2;
  const table = PCTS.map((pct) => ({ pct, weight: round1((average * pct) / 100) }));
  return { epley: round1(epley), brzycki: round1(brzycki), average: round1(average), table };
}

const OneRepMaxCalculatorClient = () => {
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("5");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<OneRepMaxResult | null>(() => computeOneRepMax("100", "5"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeOneRepMax(weight, reps);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight lifted (0-2000) and reps (whole number, 1-12).",
      });
      return;
    }
    setResult(computed);
    toast({ title: "1RM Estimated", description: `Your estimated 1RM is ${computed.average.toLocaleString()} kg.` });
  };

  const reset = () => {
    setWeight("100");
    setReps("5");
    setResult(computeOneRepMax("100", "5"));
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Estimated 1RM: ${result.average.toLocaleString()} kg (Epley ${result.epley.toLocaleString()}, Brzycki ${result.brzycki.toLocaleString()}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="One Rep Max Calculator"
      description="Estimate your 1RM strength and training percentages from any lift"
      keywords="one rep max calculator, 1rm calculator, max lift estimator, epley brzycki, strength calculator"
      canonicalUrl="/health-calculators/one-rep-max-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Lift</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium">Weight lifted (kg)</Label>
              <Input id="weight" type="number" min={1} max={2000} placeholder="e.g., 100" value={weight}
                onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="reps" className="text-sm font-medium">Reps performed (1–12)</Label>
              <Input id="reps" type="number" min={1} max={12} step={1} placeholder="e.g., 5" value={reps}
                onChange={(e) => setReps(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-xs text-neutral-500 mt-1">Use a recent set taken close to failure for best accuracy.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!weight || !reps}>
                Estimate 1RM
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Result */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Your Result</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4 rounded-xl border bg-orange-50 border-orange-200">
                <p className="text-xs text-neutral-500">Estimated 1RM (average)</p>
                <div className="text-4xl font-bold text-orange-600">{result.average.toLocaleString()} <span className="text-base font-semibold">kg</span></div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Epley</p>
                  <p className="text-sm font-bold text-black">{result.epley.toLocaleString()} kg</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Brzycki</p>
                  <p className="text-sm font-bold text-black">{result.brzycki.toLocaleString()} kg</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-neutral-500">Training weights (% of 1RM)</p>
                {result.table.map((row) => (
                  <div key={row.pct} className="flex justify-between items-center px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-[13px]">
                    <span className="font-medium text-black">{row.pct}%</span>
                    <span className="font-semibold text-black">{row.weight.toLocaleString()} kg</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🏋️</div>
                <p className="text-sm">Enter your lift to estimate your 1RM</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="A one-rep max (1RM) is the heaviest weight you can lift for a single repetition. This calculator estimates it from a lighter submaximal set using the proven Epley and Brzycki formulas, then converts the result into a percentage chart for programming your training weights."
        useCases={[
          { title: "Program Design", description: "Base 5/3/1, powerlifting or hypertrophy blocks on accurate percentages of your max." },
          { title: "Avoid Max Testing", description: "Estimate strength without the injury risk and fatigue of a true 1RM attempt." },
          { title: "Track Progress", description: "Re-test the same rep scheme monthly to see strength gains without re-maxing." },
          { title: "Compare Lifts", description: "Benchmark squat, bench, deadlift and overhead press on one consistent scale." },
        ]}
        tips={[
          { title: "Go Near Failure", description: "Estimates are most accurate from sets of 2–6 reps stopped 0–2 reps shy of failure." },
          { title: "High Reps Overestimate", description: "Sets above 10 reps inflate the estimate — that is why this tool caps input at 12 reps." },
          { title: "Train At 90%", description: "Many coaches program off 90% of your estimated max (a 'training max') for steadier progress." },
        ]}
        faqs={[
          { question: "What is the Epley formula?", answer: "1RM = weight × (1 + reps ÷ 30). For 100 kg × 5 reps: 100 × (1 + 5/30) ≈ 116.7 kg." },
          { question: "What is the Brzycki formula?", answer: "1RM = weight × 36 ÷ (37 − reps). For 100 kg × 5 reps: 100 × 36 ÷ 32 = 112.5 kg. We average both formulas for balance." },
          { question: "How accurate are 1RM estimates?", answer: "Within about 5% when based on low-rep sets near failure. They are less reliable for beginners, high reps, or highly technical lifts." },
          { question: "How do I use the percentage table?", answer: "Multiply your program's prescription by the chart: e.g. 5×5 at 80% means 5 sets of 5 at 80% of your estimated 1RM." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default OneRepMaxCalculatorClient;
