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

function getValidatedRange(minStr: string, maxStr: string): { min: number; max: number } | null {
  if (minStr.trim() === "" || maxStr.trim() === "") return null;
  const minVal = Number(minStr);
  const maxVal = Number(maxStr);
  if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) return null;
  if (!Number.isInteger(minVal) || !Number.isInteger(maxVal)) return null;
  if (minVal >= maxVal) return null;
  return { min: minVal, max: maxVal };
}

function generateRandomInt(min: number, max: number): number {
  // This logic is safe inside an event handler / client initializer,
  // we ensure all random generation is client-side.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const DEFAULT_MIN = "1";
const DEFAULT_MAX = "100";

const RandomNumberGenerator = () => {
  const [min, setMin] = useState(DEFAULT_MIN);
  const [max, setMax] = useState(DEFAULT_MAX);
  // Pre-generate one value on mount so the result renders instantly (no toast on init)
  const [result, setResult] = useState<number | null>(() => {
    const range = getValidatedRange(DEFAULT_MIN, DEFAULT_MAX);
    return range ? generateRandomInt(range.min, range.max) : null;
  });
  const { toast } = useToast();

  const generate = () => {
    if (min.trim() === "" || max.trim() === "") {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both a minimum and a maximum value.",
      });
      return;
    }
    const minVal = Number(min);
    const maxVal = Number(max);
    if (!Number.isFinite(minVal) || !Number.isFinite(maxVal)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Min and max must be valid numbers.",
      });
      return;
    }
    if (!Number.isInteger(minVal) || !Number.isInteger(maxVal)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Min and max must be whole numbers (integers).",
      });
      return;
    }
    if (minVal >= maxVal) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Min must be less than max (e.g., min 1, max 100).",
      });
      return;
    }
    const randomNumber = generateRandomInt(minVal, maxVal);
    setResult(randomNumber);
    toast({
        title: "Number Generated!",
        description: `Your random number is ${randomNumber.toLocaleString()}.`,
    });
  };

  const reset = () => {
    setMin("");
    setMax("");
    setResult(null);
  };

  const copyResult = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(result.toLocaleString());
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Random Number Generator"
      description="Generate a random integer within a specified range."
      canonicalUrl="/math-calculators/random-number-generator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Minimum Value</Label>
              <Input type="number" value={min} onChange={(e) => setMin(e.target.value)} placeholder="e.g., 1" />
            </div>
            <div>
              <Label>Maximum Value</Label>
              <Input type="number" value={max} onChange={(e) => setMax(e.target.value)} placeholder="e.g., 100" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={generate} className="flex-1 gradient-button">Generate Number</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result !== null && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Your Random Number</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-5xl font-bold text-primary">{result.toLocaleString()}</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Random Number Generator creates a random integer within a specified range (inclusive). This tool is useful for a wide variety of applications, from games and contests to statistical sampling and cryptography."
        useCases={[
            { title: "Games and Contests", description: "Use it to pick a random winner from a numbered list of participants, or for any game that requires a random number." },
            { title: "Decision Making", description: "Can't decide? Assign numbers to your options and let the generator choose for you." },
            { title: "Statistical Sampling", description: "Randomly select samples from a dataset for statistical analysis." },
        ]}
        tips={[
            { title: "Inclusive Range", description: "The generator includes both the minimum and maximum values in the possible outcomes." },
            { title: "Integer Output", description: "This tool generates whole numbers (integers). It does not produce decimal numbers." },
            { title: "Pseudo-Random", description: "Like all computer-based random number generators, the numbers are 'pseudo-random.' They are generated by an algorithm and are not truly random in a physical sense, but they are random enough for most everyday purposes." },
        ]}
        faqs={[
            { question: "How does the random number generator work?", answer: "It uses JavaScript's Math.random() function, which generates a floating-point, pseudo-random number in the range [0, 1). The calculator then scales this number to fit your specified min/max range and rounds it to the nearest integer." },
            { question: "Are the numbers truly random?", answer: "Computer-generated numbers are technically pseudo-random, meaning they are produced by a deterministic algorithm. However, for all practical purposes like games, contests, and decision-making, they are sufficiently random." },
            { question: "Can I generate more than one number at a time?", answer: "This basic version generates one number per click. To generate a list of random numbers, you would click the 'Generate' button multiple times." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RandomNumberGenerator;
