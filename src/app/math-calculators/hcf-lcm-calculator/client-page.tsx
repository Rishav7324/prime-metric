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

type HcfLcmResult = {
  numbers: number[];
  hcf: number;
  lcm: number;
  steps: string[];
};

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
}

function gcdSteps(a: number, b: number): string[] {
  const lines: string[] = [];
  let x = Math.abs(a);
  let y = Math.abs(b);
  lines.push(`gcd(${a}, ${b}):`);
  while (y !== 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    lines.push(`${x} ÷ ${y} = ${q} remainder ${r}`);
    x = y;
    y = r;
  }
  lines.push(`→ GCD = ${x.toLocaleString()}`);
  return lines;
}

function lcmPair(a: number, b: number): number {
  return Math.abs((a * b) / gcd(a, b));
}

function computeHcfLcm(input: string): HcfLcmResult | null {
  const parts = input.split(/[,\s;]+/).map((p) => p.trim()).filter(Boolean);
  if (parts.length < 2 || parts.length > 3) return null;
  const numbers: number[] = [];
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const n = parseInt(p, 10);
    if (!(n >= 1 && n <= 1000000)) return null;
    numbers.push(n);
  }
  let hcf = numbers[0];
  const steps: string[] = [];
  for (let i = 1; i < numbers.length; i++) {
    steps.push(...gcdSteps(hcf, numbers[i]));
    hcf = gcd(hcf, numbers[i]);
  }
  let lcm = numbers[0];
  for (let i = 1; i < numbers.length; i++) lcm = lcmPair(lcm, numbers[i]);
  steps.push(`LCM(${numbers.map((n) => n.toLocaleString()).join(", ")}) = ${lcm.toLocaleString()}`);
  return { numbers, hcf, lcm, steps };
}

const HcfLcmCalculatorClient = () => {
  const [input, setInput] = useState("12, 18, 24");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<HcfLcmResult | null>(() => computeHcfLcm("12, 18, 24"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeHcfLcm(input);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter 2-3 whole numbers (1-1,000,000), separated by commas. e.g. 12, 18, 24.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Calculated", description: `HCF: ${computed.hcf.toLocaleString()}, LCM: ${computed.lcm.toLocaleString()}.` });
  };

  const reset = () => {
    setInput("12, 18, 24");
    setResult(computeHcfLcm("12, 18, 24"));
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `HCF of ${result.numbers.join(", ")} = ${result.hcf.toLocaleString()}; LCM = ${result.lcm.toLocaleString()}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="HCF LCM Calculator"
      description="Find the HCF/GCD and LCM of two or three numbers with steps"
      keywords="hcf lcm calculator, gcd calculator, greatest common divisor, least common multiple, euclidean algorithm"
      canonicalUrl="/math-calculators/hcf-lcm-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Numbers</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="numbers" className="text-sm font-medium">Numbers (2–3, comma separated)</Label>
              <Input id="numbers" type="text" inputMode="numeric" placeholder="e.g., 12, 18, 24" value={input}
                onChange={(e) => setInput(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-xs text-neutral-500 mt-1">Whole numbers from 1 to 1,000,000.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!input.trim()}>
                Calculate HCF & LCM
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
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 rounded-lg border bg-green-50 border-green-200">
                  <p className="text-xs text-neutral-500">HCF / GCD</p>
                  <p className="text-2xl font-bold text-green-600">{result.hcf.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg border bg-blue-50 border-blue-200">
                  <p className="text-xs text-neutral-500">LCM</p>
                  <p className="text-2xl font-bold text-blue-600">{result.lcm.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 text-center">of {result.numbers.map((n) => n.toLocaleString()).join(", ")}</p>

              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2">Steps (Euclidean algorithm)</p>
                <div className="font-mono text-xs bg-neutral-50 border border-neutral-200 rounded-lg p-3 space-y-1 text-black">
                  {result.steps.map((s, i) => (
                    <p key={i}>{s}</p>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🔢</div>
                <p className="text-sm">Enter numbers to see HCF, LCM and steps</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The HCF (Highest Common Factor, also called GCD) is the largest number dividing all inputs, found here with the Euclidean algorithm of repeated division. The LCM (Least Common Multiple) is the smallest number all inputs divide into evenly, computed as (a × b) ÷ GCD. This tool handles two or three whole numbers and shows every step."
        useCases={[
          { title: "Homework & Exams", description: "Show full Euclidean-algorithm working for HCF and LCM problems step by step." },
          { title: "Simplifying Fractions", description: "Divide numerator and denominator by their HCF to reduce fractions fully." },
          { title: "Syncing Schedules", description: "Use the LCM to find when repeating cycles — buses, shifts, orbits — next coincide." },
          { title: "Recipe & Batch Scaling", description: "Find common batch sizes and evenly divisible portions with HCF and LCM." },
        ]}
        tips={[
          { title: "Euclidean Shortcut", description: "gcd(a, b) = gcd(b, a mod b) — repeat until the remainder is 0; the last divisor is the answer." },
          { title: "LCM From HCF", description: "LCM(a, b) = (a × b) ÷ HCF(a, b) — always faster than listing multiples." },
          { title: "Check Coprimes", description: "If the HCF is 1, the numbers share no factors (coprime) and the LCM is just their product." },
        ]}
        faqs={[
          { question: "What is the difference between HCF and GCD?", answer: "None — HCF (Highest Common Factor) and GCD (Greatest Common Divisor) are two names for the same value: the largest number dividing all inputs." },
          { question: "How does the Euclidean algorithm work?", answer: "Divide the larger number by the smaller, replace the pair with (divisor, remainder), and repeat until the remainder is 0. The last non-zero divisor is the GCD." },
          { question: "Can I enter more than 3 numbers?", answer: "This tool supports 2–3 numbers, which covers school and everyday use. For more, apply the same pairwise method repeatedly." },
          { question: "What inputs are allowed?", answer: "Two or three whole numbers from 1 to 1,000,000, separated by commas — e.g. 12, 18, 24." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default HcfLcmCalculatorClient;
