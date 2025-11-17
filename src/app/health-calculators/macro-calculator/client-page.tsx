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

const MacroCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activityMultiplier = parseFloat(activity);

    if (isNaN(w) || w <= 0 || isNaN(h) || h <= 0 || isNaN(a) || a <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for age, weight, and height.",
      });
      return;
    }

    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    let tdee = bmr * activityMultiplier;

    if (goal === "lose") tdee -= 500;
    if (goal === "gain") tdee += 500;

    const protein = w * 1.6; // A common recommendation: 1.6g of protein per kg of body weight
    const fat = (tdee * 0.25) / 9;
    const carbs = (tdee - (protein * 4) - (fat * 9)) / 4;

    setResult({
      calories: tdee.toFixed(0),
      protein: protein.toFixed(0),
      carbs: carbs.toFixed(0),
      fat: fat.toFixed(0),
    });
    
    toast({
        title: "Macros Calculated",
        description: `Your daily macronutrient targets have been estimated.`,
    });
  };

  return (
    <CalculatorLayout
      title="Macronutrient Calculator"
      description="Calculate your optimal daily protein, carb, and fat intake."
      canonicalUrl="/health-calculators/macro-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" />
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary</SelectItem>
                  <SelectItem value="1.375">Lightly Active</SelectItem>
                  <SelectItem value="1.55">Moderately Active</SelectItem>
                  <SelectItem value="1.725">Very Active</SelectItem>
                  <SelectItem value="1.9">Extra Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Macros</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Daily Calorie Target</p>
                <p className="text-3xl font-bold text-primary">{result.calories} kcal</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Protein</p>
                  <p className="text-lg font-bold">{result.protein}g</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Carbs</p>
                  <p className="text-lg font-bold">{result.carbs}g</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Fat</p>
                  <p className="text-lg font-bold">{result.fat}g</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Macronutrient Calculator estimates your daily needs for protein, carbohydrates, and fats based on your age, gender, activity level, and fitness goals. Tracking macros, often called 'If It Fits Your Macros' (IIFYM), is a popular and flexible approach to nutrition that focuses on hitting specific macronutrient targets rather than just counting calories."
        useCases={[
            { title: "Body Composition", description: "Tailor your diet to build muscle and lose fat by ensuring you get enough protein while managing carbs and fats." },
            { title: "Athletic Performance", description: "Fuel your workouts and recovery by optimizing your carb and protein intake around your training schedule." },
            { title: "Flexible Dieting", description: "Enjoy a wide variety of foods as long as they fit within your daily macro targets, making your diet more sustainable." },
        ]}
        tips={[
            { title: "Protein is Key", description: "Prioritize hitting your protein goal, especially for muscle building and satiety. A common target is 1.6-2.2 grams of protein per kilogram of body weight." },
            { title: "Adjust Carbs and Fats", description: "Carbohydrates and fats can be adjusted based on your preference and how you feel. Some people perform better on higher carbs, others on higher fats." },
            { title: "Don't Forget Micronutrients", description: "While tracking macros is important, don't neglect micronutrients. Ensure you're eating a variety of whole foods to get essential vitamins and minerals." },
        ]}
        faqs={[
            { question: "What are macronutrients?", answer: "Macronutrients are the three main types of nutrients your body needs in large amounts: protein, carbohydrates, and fats. Protein has 4 calories per gram, carbs have 4, and fats have 9." },
            { question: "Is tracking macros better than counting calories?", answer: "Tracking macros is a more advanced form of calorie counting. It ensures you're not just hitting a calorie number, but also getting the right balance of nutrients to support your body composition and performance goals." },
            { question: "How do I track my macros?", answer: "You can use a food tracking app like MyFitnessPal or Cronometer. You weigh your food and log it in the app, which then calculates the macros for you." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default MacroCalculator;

    