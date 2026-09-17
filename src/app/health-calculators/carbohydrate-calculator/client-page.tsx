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

type CarbResult = {
  dailyCarbs: number;
  calories: number;
  perMeal: number;
};

function computeCarbs(weightStr: string, activityLevelStr: string, goalStr: string): CarbResult | null {
  const w = parseFloat(weightStr);
  if (!(w > 0) || !(w >= 20 && w <= 500)) return null;

  let carbsPerKg = 5;

  if (activityLevelStr === "sedentary") carbsPerKg = 3;
  else if (activityLevelStr === "light") carbsPerKg = 4;
  else if (activityLevelStr === "moderate") carbsPerKg = 5;
  else if (activityLevelStr === "active") carbsPerKg = 6;
  else if (activityLevelStr === "very-active") carbsPerKg = 7;
  else return null;

  if (goalStr === "lose") carbsPerKg *= 0.7;
  else if (goalStr === "gain") carbsPerKg *= 1.2;
  else if (goalStr !== "maintain") return null;

  const dailyCarbs = w * carbsPerKg;
  const calories = dailyCarbs * 4;

  return {
    dailyCarbs: parseFloat(dailyCarbs.toFixed(1)),
    calories: Math.round(calories),
    perMeal: parseFloat((dailyCarbs / 3).toFixed(1)),
  };
}

const CarbohydrateCalculatorClient = () => {
  const [weight, setWeight] = useState("70");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<CarbResult | null>(() => computeCarbs("70", "moderate", "maintain"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeCarbs(weight, activityLevel, goal);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight (20-500 kg).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Calculation Complete",
        description: `Your daily carbohydrate target is ${computed.dailyCarbs.toLocaleString()}g.`,
    });
  };

  const reset = () => {
    setWeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Daily carbs: ${result.dailyCarbs.toLocaleString()}g (${result.calories.toLocaleString()} cal), per meal: ${result.perMeal.toLocaleString()}g — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Carbohydrate Calculator"
      description="Calculate daily carb intake needs for your activity level and goals"
      keywords="carbohydrate calculator, carb intake, daily carbs, nutrition calculator, macro calculator"
      canonicalUrl="/health-calculators/carbohydrate-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              min={20}
              max={500}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 70"
            />
          </div>
          <div>
            <Label>Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                <SelectItem value="light">Lightly Active (light exercise/sports 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately Active (moderate exercise/sports 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (hard exercise/sports 6-7 days a week)</SelectItem>
                <SelectItem value="very-active">Very Active (very hard exercise & physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Weight</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button" disabled={!weight}>
              Calculate Carbs
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Daily Carbohydrates</p>
                <p className="text-2xl font-bold text-primary">{result.dailyCarbs.toLocaleString()}g</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Calories from Carbs</p>
                  <p className="text-xl font-bold">{result.calories.toLocaleString()} cal</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Per Meal (3 meals)</p>
                  <p className="text-xl font-bold">{result.perMeal.toLocaleString()}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Carbohydrate Calculator determines your daily carbohydrate intake needs based on your body weight, activity level, and fitness goals. Carbohydrates are your body's primary energy source, and calculating the right amount helps optimize performance, support weight goals, and maintain energy levels throughout the day."
        useCases={[
          { title: "Weight Management", description: "Adjust carb intake based on whether you want to lose, maintain, or gain weight. Lower carbs for fat loss, higher for muscle gain." },
          { title: "Athletic Performance", description: "Ensure adequate carb intake for training and competition. Endurance athletes need higher carbs to fuel long workouts and races." },
          { title: "Meal Planning", description: "Use per-meal carb targets to plan balanced meals throughout the day and maintain steady energy levels." },
          { title: "Diabetes Management", description: "Monitor and control carbohydrate intake to help manage blood sugar levels when working with healthcare providers." }
        ]}
        tips={[
          { title: "Activity Level Accuracy", description: "Be honest about your activity level. Overestimating can lead to excess calories. Consider your weekly average, not just your most active days." },
          { title: "Adjust Over Time", description: "Your carb needs change with weight, activity, and goals. Recalculate every 4-6 weeks or when making significant training changes." },
          { title: "Quality Matters", description: "Focus on complex carbohydrates from whole grains, fruits, and vegetables rather than simple sugars for sustained energy and better nutrition." },
          { title: "Timing Considerations", description: "Distribute carbs strategically: more before/after workouts for energy and recovery, moderate amounts at other meals." }
        ]}
        faqs={[
          { question: "What counts as a carbohydrate?", answer: "Carbohydrates include starches (bread, rice, pasta), sugars (fruit, sweets), and fiber (vegetables, whole grains). Focus on complex carbs and fiber-rich foods for better nutrition." },
          { question: "Should I count fiber in my carb total?", answer: "Net carbs (total carbs minus fiber) are what affect blood sugar. However, for general nutrition, counting total carbs is standard unless following a specific low-carb diet." },
          { question: "How do carbs affect weight loss?", answer: "Reducing carbs can help with weight loss by lowering overall calories and reducing water retention. However, total calorie balance is most important for weight management." },
          { question: "Is low-carb better than high-carb?", answer: "Neither is universally better. Optimal carb intake depends on your activity level, goals, and personal preferences. Active people typically need more carbs for performance." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CarbohydrateCalculatorClient;
