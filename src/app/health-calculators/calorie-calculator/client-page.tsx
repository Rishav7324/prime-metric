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
import { Copy, RotateCcw } from "lucide-react";

type CalorieResult = {
  maintain: number;
  target: number;
  goal: string;
};

function computeCalories(genderStr: string, ageStr: string, weightStr: string, heightStr: string, activityStr: string, goalStr: string): CalorieResult | null {
  const w = parseFloat(weightStr);
  const h = parseFloat(heightStr);
  const a = parseFloat(ageStr);
  const activityMultiplier = parseFloat(activityStr);

  if (!(w >= 1 && w <= 500) || !(h >= 50 && h <= 300) || !(a >= 10 && a <= 120)) return null;
  if (!isFinite(activityMultiplier) || activityMultiplier <= 0) return null;

  const bmr = genderStr === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
  if (!isFinite(bmr) || bmr <= 0) return null;
  const tdee = bmr * activityMultiplier;

  let targetCalories = tdee;
  if (goalStr === "lose") targetCalories = tdee - 500;
  else if (goalStr === "gain") targetCalories = tdee + 500;

  if (!isFinite(targetCalories) || targetCalories <= 0) return null;

  return { maintain: Math.round(tdee), target: Math.round(targetCalories), goal: goalStr };
}

const CalorieCalculatorClient = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<CalorieResult | null>(() => computeCalories("male", "30", "70", "175", "1.55", "maintain"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeCalories(gender, age, weight, height, activity, goal);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight (1-500 kg), height (50-300 cm), and age (10-120 years).",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Calories Calculated",
      description: `Your daily target is ${computed.target.toLocaleString()} calories.`
    });
  };

  const reset = () => {
    setAge(""); setWeight(""); setHeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My daily calories: ${result.target.toLocaleString()} kcal/day (maintenance ${result.maintain.toLocaleString()} kcal/day) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate daily calorie needs for your goals"
      keywords="calorie calculator, tdee calculator, calorie intake, weight loss calculator, weight gain calculator"
      canonicalUrl="/health-calculators/calorie-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4">Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1 h-10 bg-white border border-neutral-200"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
             <div>
              <Label>Age (years)</Label>
              <Input type="number" min={10} max={120} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="mt-1 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" min={1} max={500} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="mt-1 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" min={50} max={300} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-1 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Activity Level</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="mt-1 h-10 bg-white border border-neutral-200"><SelectValue /></SelectTrigger>
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
                <SelectTrigger className="mt-1 h-10 bg-white border border-neutral-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Lose Weight</SelectItem>
                  <SelectItem value="maintain">Maintain Weight</SelectItem>
                  <SelectItem value="gain">Gain Weight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button" disabled={!age || !weight || !height}>Calculate Calories</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">Target Calories for {result.goal === 'lose' ? 'Weight Loss' : result.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}</div>
                <div className="text-6xl font-bold gradient-text">{result.target.toLocaleString()}</div>
                <div className="text-lg text-neutral-600 mt-2">calories/day</div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                <div className="text-sm text-neutral-600">Maintenance Calories</div>
                <div className="text-2xl font-bold">{result.maintain.toLocaleString()} cal/day</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center"><div className="text-4xl mb-2">🍎</div><p>Enter details to see results</p></div>
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
        examples={[
          { title: "Active man maintaining weight", description: "A 30-year-old man, 70 kg and 175 cm, moderately active (1.55) needs about 2,556 kcal/day to maintain.", steps: ["BMR: 10 × 70 + 6.25 × 175 − 5 × 30 + 5 = 1,648.75.", "TDEE: 1,648.75 × 1.55 = 2,555.6, rounded to 2,556 kcal/day.", "Maintain goal: target = 2,556 kcal/day (lose would be 2,056)."] },
          { title: "Sedentary woman gaining weight", description: "A 25-year-old woman, 60 kg and 165 cm, sedentary (1.2) needs about 2,114 kcal/day to gain.", steps: ["BMR: 10 × 60 + 6.25 × 165 − 5 × 25 − 161 = 1,345.25.", "TDEE: 1,345.25 × 1.2 = 1,614.3, rounded to 1,614 kcal/day.", "Gain goal: 1,614 + 500 = 2,114 kcal/day."] },
        ]}
        faqs={[
          { question: "How accurate are calorie calculators?", answer: "Calculators provide estimates based on averages. Individual metabolism varies, so use the result as a starting point and adjust based on your actual results over time." },
          { question: "Should I eat less on rest days?", answer: "You can slightly reduce calories on rest days, but your body still burns calories for recovery. Many people maintain consistent daily calories for simplicity." },
          { question: "How quickly should I lose weight?", answer: "A safe, sustainable rate is 0.5-1% of body weight per week. Faster weight loss often leads to muscle loss and metabolic slowdown." },
          { question: "Do I need to count calories forever?", answer: "Calorie tracking is a tool to learn portion sizes and food content. Many people develop intuitive eating skills after tracking consistently." },
          { question: "I am a 30-year-old man, 70 kg and 175 cm, moderately active — what are my calories to lose weight?", answer: "Your BMR is 10 × 70 + 6.25 × 175 − 5 × 30 + 5 = 1,648.75. At activity 1.55 your maintenance is 1,648.75 × 1.55 = 2,556 kcal/day, so a 500-calorie deficit gives a weight-loss target of 2,556 − 500 = 2,056 kcal/day." },
          { question: "I am a 25-year-old woman, 60 kg and 165 cm, sedentary — what are my calories to gain weight?", answer: "Your BMR is 10 × 60 + 6.25 × 165 − 5 × 25 − 161 = 1,345.25. At activity 1.2 your maintenance is 1,345.25 × 1.2 = 1,614 kcal/day, so a 500-calorie surplus gives a weight-gain target of 1,614 + 500 = 2,114 kcal/day." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CalorieCalculatorClient;
