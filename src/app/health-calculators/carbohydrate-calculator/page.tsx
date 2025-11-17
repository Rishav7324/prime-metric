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

const CarbohydrateCalculator = () => {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w || w <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid weight.",
      });
      return;
    }

    let carbsPerKg = 5;

    if (activityLevel === "sedentary") carbsPerKg = 3;
    else if (activityLevel === "light") carbsPerKg = 4;
    else if (activityLevel === "moderate") carbsPerKg = 5;
    else if (activityLevel === "active") carbsPerKg = 6;
    else if (activityLevel === "very-active") carbsPerKg = 7;

    if (goal === "lose") carbsPerKg *= 0.7;
    else if (goal === "gain") carbsPerKg *= 1.2;

    const dailyCarbs = w * carbsPerKg;
    const calories = dailyCarbs * 4;

    setResult({
      dailyCarbs: dailyCarbs.toFixed(1),
      calories: calories.toFixed(0),
      perMeal: (dailyCarbs / 3).toFixed(1)
    });

    toast({
        title: "Calculation Complete",
        description: `Your daily carbohydrate target is ${dailyCarbs.toFixed(1)}g.`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Carbs
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Daily Carbohydrates</p>
                <p className="text-4xl font-bold text-primary">{result.dailyCarbs}g</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Calories from Carbs</p>
                  <p className="text-xl font-bold">{result.calories} cal</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Per Meal (3 meals)</p>
                  <p className="text-xl font-bold">{result.perMeal}g</p>
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

export default CarbohydrateCalculator;
