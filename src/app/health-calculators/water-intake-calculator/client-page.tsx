'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type WaterResult = {
  liters: number; ml: number; glasses: number;
};

const activityExtra: Record<string, number> = {
  sedentary: 0, light: 0.25, moderate: 0.5, active: 1.0,
};

const climateExtra: Record<string, number> = {
  cool: 0, normal: 0.25, hot: 0.5, veryHot: 0.75,
};

function computeWater(weightStr: string, activity: string, climate: string): WaterResult | null {
  const w = parseFloat(weightStr);
  if (!(w >= 1 && w <= 500)) return null;
  if (!(activity in activityExtra) || !(climate in climateExtra)) return null;

  const liters = w * 0.033 + activityExtra[activity] + climateExtra[climate];
  if (!isFinite(liters) || liters <= 0) return null;

  const ml = Math.round(liters * 1000);
  return { liters, ml, glasses: liters * 1000 / 250 };
}

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("moderate");
  const [climate, setClimate] = useState("normal");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<WaterResult | null>(() => computeWater("70", "moderate", "normal"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeWater(weight, activity, climate);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter weight (1-500 kg) and pick activity & climate." });
      return;
    }
    setResult(computed);
    toast({ title: "Hydration Goal Set", description: `Aim for ${computed.liters.toFixed(2)} L (${Math.round(computed.glasses)} glasses) daily.` });
  };

  const reset = () => { setWeight(""); setActivity("moderate"); setClimate("normal"); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `My daily water goal: ${result.liters.toFixed(2)} L (${result.ml.toLocaleString()} ml ≈ ${Math.round(result.glasses)} glasses) for ${weight} kg, ${activity} activity, ${climate} climate. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Daily Water Intake Calculator by Weight"
      description="Estimate daily water needs from weight, activity level and climate with liters and glasses"
      keywords="water intake calculator, daily water requirement, hydration calculator, how much water per day"
      canonicalUrl="/health-calculators/water-intake-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Body Weight (kg)</Label>
              <Input type="number" min={1} max={500} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="mt-1.5 h-10 text-sm bg-white">
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (desk job)</SelectItem>
                  <SelectItem value="light">Light (walks, chores)</SelectItem>
                  <SelectItem value="moderate">Moderate (exercise 3-5x/week)</SelectItem>
                  <SelectItem value="active">Active (daily intense training)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium">Climate</Label>
              <Select value={climate} onValueChange={setClimate}>
                <SelectTrigger className="mt-1.5 h-10 text-sm bg-white">
                  <SelectValue placeholder="Select climate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cool">Cool</SelectItem>
                  <SelectItem value="normal">Normal / temperate</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                  <SelectItem value="veryHot">Very hot / humid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate Intake</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Daily Goal</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Recommended Daily Intake</p>
                <p className="text-3xl font-bold text-[#F2765E]">{result.liters.toFixed(2)} L</p>
                <p className="text-xs text-neutral-500 mt-1">{result.ml.toLocaleString()} ml ≈ {Math.round(result.glasses)} glasses (250 ml)</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Milliliters</p>
                  <p className="text-base font-bold text-black">{result.ml.toLocaleString()} ml</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Glasses</p>
                  <p className="text-base font-bold text-black">{Math.round(result.glasses)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">💧</div><p className="text-sm">Enter details to get your water goal</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Water needs scale with body size, sweat loss and weather. This calculator starts from ~33 ml per kg of body weight, then adds extra for activity level and climate — giving your daily target in liters, milliliters and standard 250 ml glasses."
        useCases={[
          { title: "Fitness Training", description: "Raise intake on workout days to replace sweat and protect performance." },
          { title: "Hot Weather", description: "Adjust upward in summer or humid climates where fluid loss spikes." },
          { title: "Desk Workers", description: "Set a concrete daily target instead of guessing from thirst alone." },
          { title: "Weight Management", description: "Track water alongside diet — good hydration supports appetite control." },
        ]}
        tips={[
          { title: "Spread It Out", description: "Sip steadily through the day; chugging liters at once is less effective." },
          { title: "Check Urine Color", description: "Pale yellow means you're on track; dark yellow means drink more." },
          { title: "Eat Your Water", description: "Fruits, vegetables and soups count toward daily fluid intake." },
        ]}
        faqs={[
          { question: "How much water should I drink daily?", answer: "A common baseline is ~33 ml per kg of body weight, plus more for exercise and heat. This calculator personalizes that figure for you." },
          { question: "Is 8 glasses a day accurate?", answer: "It's a rough average (~2 L). Your true need varies with weight, activity and climate — heavier or very active people need more." },
          { question: "Can I drink too much water?", answer: "Yes — extreme overhydration can dilute blood sodium. Stick near your calculated target unless a doctor advises otherwise." },
          { question: "Do coffee and tea count?", answer: "Mostly yes — despite mild diuretic effects, they contribute net fluid. Plain water remains the best choice." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default WaterIntakeCalculator;
