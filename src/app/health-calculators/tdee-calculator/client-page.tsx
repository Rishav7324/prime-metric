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

const TdeeCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");
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
        description: "Please enter valid numbers for all fields.",
      });
      return;
    }

    const bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
    const tdee = bmr * activityMultiplier;

    setResult({
      tdee: tdee.toFixed(0),
    });
    
    toast({
        title: "TDEE Calculated",
        description: `Your maintenance calories are approximately ${tdee.toFixed(0)} kcal/day.`,
    });
  };

  return (
    <CalculatorLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure (TDEE)."
      canonicalUrl="/health-calculators/tdee-calculator"
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
            <div className="col-span-1 md:col-span-2">
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="1.375">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="1.55">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="1.725">Very Active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="1.9">Extra Active (very hard exercise & physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate TDEE</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Your TDEE (Maintenance Calories)</p>
              <p className="text-3xl font-bold text-primary">{result.tdee} kcal / day</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Total Daily Energy Expenditure (TDEE) calculator estimates the total number of calories your body burns in a 24-hour period, including all activities. It's the starting point for determining your calorie needs for weight loss, maintenance, or gain."
        useCases={[
            { title: "Weight Management", description: "TDEE is your 'maintenance calories.' To lose weight, eat less than your TDEE. To gain weight, eat more." },
            { title: "Nutrition Planning", description: "Create a precise meal plan by knowing exactly how many calories your body needs to function and perform." },
            { title: "Fitness Goal Setting", description: "Understand the energy demands of your activity level and adjust your diet accordingly to support your fitness goals." },
        ]}
        tips={[
            { title: "Be Honest About Activity", description: "The most common error is overestimating activity level. Be realistic for an accurate TDEE." },
            { title: "TDEE is an Estimate", description: "Use your TDEE as a starting point. Track your weight for 2-3 weeks and adjust your calorie intake up or down based on the results." },
            { title: "Recalculate Periodically", description: "As your weight, age, or activity level changes, your TDEE will also change. Recalculate every few months to stay on track." },
        ]}
        faqs={[
            { question: "What is TDEE?", answer: "TDEE stands for Total Daily Energy Expenditure. It's the total number of calories you burn in a day, including your basal metabolic rate (BMR) and all physical activity." },
            { question: "What is BMR?", answer: "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest to maintain vital functions like breathing and circulation. TDEE is your BMR plus the calories burned from activity." },
            { question: "How do I create a calorie deficit?", answer: "To lose weight, you need to consume fewer calories than your TDEE. A deficit of 500 calories per day will typically result in about 1 pound of weight loss per week." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TdeeCalculator;

    