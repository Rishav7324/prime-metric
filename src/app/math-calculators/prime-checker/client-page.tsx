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

const MAX_N = 1000000000;

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function getFactors(n: number): number[] {
  if (n < 1) return [];
  const factors: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) factors.push(n / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

function nextPrime(n: number): number {
  let candidate = Math.max(n + 1, 2);
  while (!isPrime(candidate)) candidate++;
  return candidate;
}

function prevPrime(n: number): number | null {
  let candidate = n - 1;
  while (candidate >= 2) {
    if (isPrime(candidate)) return candidate;
    candidate--;
  }
  return null;
}

type PrimeResult = {
  n: number;
  prime: boolean;
  factors: number[];
  prev: number | null;
  next: number;
};

function analyzePrime(n: number): PrimeResult {
  return { n, prime: isPrime(n), factors: getFactors(n), prev: prevPrime(n), next: nextPrime(n) };
}

const fmt = (n: number) => n.toLocaleString();

const PrimeChecker = () => {
  // Pre-filled with 97 so the verdict, factors and neighbours render instantly
  const [input, setInput] = useState("97");
  const [result, setResult] = useState<PrimeResult | null>(() => analyzePrime(97));
  const { toast } = useToast();

  const check = () => {
    if (!input.trim()) {
      toast({ title: "Empty Input", description: "Enter a number to check.", variant: "destructive" });
      return;
    }
    const n = Number(input.trim());
    if (!Number.isInteger(n)) {
      toast({ title: "Invalid Input", description: "Enter a whole number (no decimals).", variant: "destructive" });
      return;
    }
    if (n < 0) {
      toast({ title: "Invalid Input", description: "Enter a number greater than or equal to 0.", variant: "destructive" });
      return;
    }
    if (n > MAX_N) {
      toast({ title: "Number Too Large", description: `Enter a number up to ${fmt(MAX_N)} for instant checking.`, variant: "destructive" });
      return;
    }
    const computed = analyzePrime(n);
    setResult(computed);
    toast({
      title: "Check Complete",
      description: computed.prime ? `${fmt(n)} is a prime number.` : `${fmt(n)} is not prime.`,
    });
  };

  const reset = () => {
    setInput("97");
    setResult(analyzePrime(97));
    toast({ title: "Reset", description: "Restored demo value 97." });
  };

  const copyValue = async (text: string) => {
    if (!text) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Check a number first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Prime Number Checker"
      description="Check if any whole number is prime with instant results."
      canonicalUrl="/math-calculators/prime-checker"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="p-6">
          <Label htmlFor="number">Enter a whole number (0 – {fmt(MAX_N)})</Label>
          <div className="flex items-end gap-2 mt-2">
            <Input
              id="number"
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 97"
              onKeyDown={(e) => { if (e.key === "Enter") check(); }}
            />
            <Button onClick={check} className="gradient-button shrink-0">Check</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result !== null && (
            <div className="mt-4 p-4 bg-muted rounded-lg text-center space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className={`text-lg font-bold ${result.prime ? "text-emerald-600" : "text-red-600"}`}>
                  {fmt(result.n)} is {result.prime ? "Prime" : "Not Prime"}
                </span>
                <Button
                  onClick={() => copyValue(`${fmt(result.n)} is ${result.prime ? "prime" : "not prime"}. Factors: ${result.factors.join(", ")}`)}
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                >
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-xs text-neutral-500">
                {result.prime
                  ? "It has exactly two factors: 1 and itself."
                  : "It has more than two factors, so it is a composite number."}
              </p>
            </div>
          )}
        </Card>

        {result !== null && (
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="result-label mb-2">Factors of {fmt(result.n)}</div>
              <div className="flex flex-wrap gap-1.5">
                {result.factors.length > 0 ? (
                  result.factors.map((f) => (
                    <span key={f} className="px-2.5 py-1 text-xs font-mono font-semibold bg-muted rounded-md">
                      {fmt(f)}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-neutral-500">No factors (enter 1 or more).</span>
                )}
              </div>
            </Card>
            <Card className="p-6">
              <div className="result-label mb-2">Nearest Primes</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2.5 bg-muted/50 rounded-lg">
                  <span className="text-neutral-500">Previous prime</span>
                  <span className="font-mono font-semibold">{result.prev !== null ? fmt(result.prev) : "—"}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-muted/50 rounded-lg">
                  <span className="text-neutral-500">Next prime</span>
                  <span className="font-mono font-semibold">{fmt(result.next)}</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
      <CalculatorContentSection
        aboutContent="The Prime Number Checker tests whether any whole number up to one billion is prime, lists all of its factors, and shows the nearest primes above and below. Primality is tested instantly in your browser with an optimized trial-division check. It is a handy companion for math homework, coding challenges, and cryptography experiments."
        useCases={[
          { title: "Math Homework", description: "Verify whether numbers like 97 or 143 are prime and list their factors to show full working for divisibility exercises." },
          { title: "Coding Challenges", description: "Cross-check outputs of your own isPrime function or sieve implementation against instant ground-truth results while practicing algorithms." },
          { title: "Cryptography Learning", description: "Explore how primes sit among composites and how far apart neighbouring primes are when studying RSA key concepts." },
          { title: "Puzzle & Game Design", description: "Pick prime numbers for puzzle answers, game seeds, or hash-table sizes where prime moduli reduce clustering." },
        ]}
        tips={[
          { title: "Check Small Divisors First", description: "A number ending in an even digit or 5 (beyond 2 and 5 themselves) is never prime. Quick checks for 2, 3, and 5 rule out most composites instantly." },
          { title: "Only Test Up to the Square Root", description: "If no divisor is found up to √n, none exists above it either. That is why even numbers near a billion check in milliseconds." },
          { title: "1 Is Not Prime", description: "By definition a prime has exactly two distinct factors. The number 1 has only one factor, so it is neither prime nor composite." },
        ]}
        faqs={[
          { question: "What is a prime number?", answer: "A prime number is a whole number greater than 1 with exactly two factors: 1 and itself. Examples include 2, 3, 5, 7, and 97. Numbers with more factors, like 4 or 100, are called composite." },
          { question: "How does this checker test for primes?", answer: "It uses optimized trial division: after ruling out multiples of 2 and 3, it tests divisors of the form 6k±1 up to the square root of the number. This is exact for every supported input, not a probabilistic guess." },
          { question: "What is the largest number I can check?", answer: "Whole numbers from 0 up to 1,000,000,000 are supported. The cap keeps checks instant in the browser, since trial division work grows with the square root of the input." },
          { question: "Why are primes important in computing?", answer: "Large primes underpin public-key cryptography such as RSA, where security relies on how hard it is to factor a product of two big primes. Smaller primes also size hash tables and generate pseudo-random sequences." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PrimeChecker;
