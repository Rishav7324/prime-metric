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

type ProteinResult = {
  dailyProtein: number;
  proteinPerKg: number;
};

function computeProtein(weightStr: string, activityLevelStr: string): ProteinResult | null {
  const w = parseFloat(weightStr);
  if (!(w >= 1 && w <= 500)) return null;

  let proteinPerKg = 0.8; // Sedentary
  if (activityLevelStr === "light") proteinPerKg = 1.2;
  if (activityLevelStr === "active") proteinPerKg = 1.6;
  if (activityLevelStr === "very-active") proteinPerKg = 2.0;

  const dailyProtein = w * proteinPerKg;
  if (!isFinite(dailyProtein) || dailyProtein <= 0) return null;

  return { dailyProtein: Math.round(dailyProtein), proteinPerKg };
}

const ProteinCalculator = () => {
  const [weight, setWeight] = useState("70");
  const [activityLevel, setActivityLevel] = useState("active");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<ProteinResult | null>(() => computeProtein("70", "active"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeProtein(weight, activityLevel);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight (1-500 kg).",
      });
      return;
    }

    setResult(computed);
    
    toast({
        title: "Protein Needs Calculated",
        description: `Your daily protein target is ${computed.dailyProtein.toLocaleString()}g.`,
    });
  };

  const reset = () => {
    setWeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My daily protein: ${result.dailyProtein.toLocaleString()}g (${result.proteinPerKg}g per kg) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Daily Protein Intake Calculator"
      description="Estimate your daily protein needs based on activity level."
      canonicalUrl="/health-calculators/protein-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Weight (kg)</Label>
            <Input type="number" min={1} max={500} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" />
          </div>
          <div>
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Lightly Active (light exercise/sports 1-3 days/week)</SelectItem>
                <SelectItem value="active">Active (moderate exercise/sports 3-5 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (hard exercise/sports 6-7 days a week)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button" disabled={!weight}>Calculate Protein Needs</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Recommended Daily Protein Intake</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{result.dailyProtein.toLocaleString()} grams</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Protein Calculator estimates your daily protein requirement based on your body weight and activity level. Protein is a crucial macronutrient for building and repairing tissues, making enzymes and hormones, and supporting muscle mass. Your protein needs vary depending on how active you are."
        useCases={[
            { title: "Muscle Building", description: "Ensure you're consuming enough protein to support muscle growth and repair after workouts." },
            { title: "Weight Management", description: "A higher protein intake can increase satiety, helping you feel fuller for longer and potentially reducing overall calorie intake." },
            { title: "General Health", description: "Meet your body's basic needs for tissue repair and other vital functions." },
        ]}
        tips={[
            { title: "Distribute Throughout the Day", description: "Spread your protein intake across several meals throughout the day for better absorption and muscle protein synthesis." },
            { title: "Choose Lean Sources", description: "Good sources of protein include chicken breast, fish, lean beef, eggs, dairy, legumes, and tofu." },
            { title: "Needs May Vary", description: "Your protein needs may be higher if you are pregnant, breastfeeding, or recovering from an injury." },
        ]}
        faqs={[
            { question: "What happens if I eat too much protein?", answer: "For most healthy people, a high protein intake is not harmful. However, extremely high intakes over a long period can put stress on the kidneys. It's always best to consume a balanced diet." },
            { question: "Can I get enough protein from a vegetarian or vegan diet?", answer: "Absolutely. Excellent plant-based protein sources include lentils, beans, chickpeas, tofu, tempeh, seitan, quinoa, and nuts. You may need to be more mindful to combine sources to get all essential amino acids." },
            { question: "When is the best time to consume protein?", answer: "While the 'anabolic window' after a workout is a popular concept, research shows that the most important factor is meeting your total daily protein goal. Spreading it out evenly throughout the day is a great strategy." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default ProteinCalculator;

    