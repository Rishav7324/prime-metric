'use client';

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const CalorieCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    const activityMultiplier = parseFloat(activity);

    if (w > 0 && h > 0 && a > 0) {
      let bmr = gender === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
      const tdee = bmr * activityMultiplier;
      
      let targetCalories = tdee;
      if (goal === "lose") targetCalories = tdee - 500;
      else if (goal === "gain") targetCalories = tdee + 500;
      
      setResult({ maintain: tdee.toFixed(0), target: targetCalories.toFixed(0), goal });
      toast({
        title: "Calories Calculated",
        description: `Your daily target is ${targetCalories.toFixed(0)} calories.`
      });
    } else {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid numbers for all fields."
        });
    }
  };

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate daily calorie needs for your goals"
      keywords="calorie calculator, tdee calculator, calorie intake, weight loss calculator, weight gain calculator"
      canonicalUrl="/health-calculators/calorie-calculator"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
             <div>
              <Label>Age (years)</Label>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="mt-1 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="mt-1 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-1 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="mt-1 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentary (office job)</SelectItem>
                  <SelectItem value="1.375">Lightly Active (1-3 days/week exercise)</SelectItem>
                  <SelectItem value="1.55">Moderately Active (3-5 days/week exercise)</SelectItem>
                  <SelectItem value="1.725">Very Active (6-7 days/week exercise)</SelectItem>
                  <SelectItem value="1.9">Extra Active (physical job & hard exercise)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="mt-1 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate Calories</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Target Calories for {result.goal === 'lose' ? 'Weight Loss' : result.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}</div>
                <div className="text-6xl font-bold gradient-text">{result.target}</div>
                <div className="text-lg text-muted-foreground mt-2">calories/day</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground">Maintenance Calories</div>
                <div className="text-2xl font-bold">{result.maintain} cal/day</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🍎</div><p>Enter details to see results</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Calorie Calculator determines your daily caloric needs based on your personal metrics and activity level. It calculates your Total Daily Energy Expenditure (TDEE) and adjusts for your goals - whether you want to lose weight, maintain, or gain weight."
        useCases={[
          { title: "Weight Loss Planning", description: "Calculate a calorie deficit (typically 500 calories below maintenance) for sustainable weight loss of about 1 pound per week." },
          { title: "Muscle Building", description: "Determine calorie surplus needed for muscle gain while minimizing fat gain." },
          { title: "Weight Maintenance", description: "Find your maintenance calories to keep your current weight stable." },
          { title: "Athletic Performance", description: "Ensure adequate calorie intake to support training and recovery." }
        ]}
        tips={[
          { title: "Start with Maintenance", description: "Track calories at maintenance level for 2-3 weeks before making adjustments to see how your body responds." },
          { title: "Adjust Based on Results", description: "If you're not seeing expected changes after 2-3 weeks, adjust calories by 100-200 in the appropriate direction." },
          { title: "Don't Cut Too Low", description: "Avoid eating below your BMR or cutting more than 500-750 calories from maintenance for sustainable results." },
          { title: "Quality Matters Too", description: "Focus on nutrient-dense whole foods, not just calorie numbers. Protein, fiber, and micronutrients are crucial." }
        ]}
        faqs={[
          { question: "How accurate are calorie calculators?", answer: "Calculators provide estimates based on averages. Individual metabolism varies, so use the result as a starting point and adjust based on your actual results over time." },
          { question: "Should I eat less on rest days?", answer: "You can slightly reduce calories on rest days, but your body still burns calories for recovery. Many people maintain consistent daily calories for simplicity." },
          { question: "How quickly should I lose weight?", answer: "A safe, sustainable rate is 0.5-1% of body weight per week. Faster weight loss often leads to muscle loss and metabolic slowdown." },
          { question: "Do I need to count calories forever?", answer: "Calorie tracking is a tool to learn portion sizes and food content. Many people develop intuitive eating skills after tracking consistently." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CalorieCalculator;
