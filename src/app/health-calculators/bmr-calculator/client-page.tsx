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

type BmrResult = {
  bmr: number;
};

function computeBmr(genderStr: string, weightStr: string, heightStr: string, ageStr: string): BmrResult | null {
  const w = parseFloat(weightStr);
  const h = parseFloat(heightStr);
  const a = parseFloat(ageStr);

  if (!(w >= 1 && w <= 500) || !(h >= 50 && h <= 300) || !(a >= 10 && a <= 120)) return null;

  const bmr = genderStr === "male"
    ? 10 * w + 6.25 * h - 5 * a + 5
    : 10 * w + 6.25 * h - 5 * a - 161;

  if (!isFinite(bmr) || bmr <= 0) return null;

  return { bmr: Math.round(bmr) };
}

const BMRCalculatorClient = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BmrResult | null>(() => computeBmr("male", "70", "175", "30"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeBmr(gender, weight, height, age);
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
      title: "BMR Calculated",
      description: `Your Basal Metabolic Rate is ${computed.bmr.toLocaleString()} calories/day.`,
    });
  };

  const reset = () => {
    setWeight(""); setHeight(""); setAge(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My BMR: ${result.bmr.toLocaleString()} kcal/day — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate"
      canonicalUrl="/health-calculators/bmr-calculator"
      formula="Male: BMR = 10W + 6.25H - 5A + 5 | Female: BMR = 10W + 6.25H - 5A - 161"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4">Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-10 bg-white border border-neutral-200"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" min={1} max={500} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" min={50} max={300} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Age (years)</Label>
              <Input type="number" min={10} max={120} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button" disabled={!weight || !height || !age}>Calculate BMR</Button>
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
                <div className="text-sm text-neutral-600 mb-2">Your BMR</div>
                <div className="text-6xl font-bold gradient-text">{result.bmr.toLocaleString()}</div>
                <div className="text-lg text-neutral-600 mt-2">calories/day</div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                <p className="text-sm text-neutral-600">This is the number of calories your body burns at rest to maintain vital functions.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center"><div className="text-4xl mb-2">🔥</div><p>Enter details to see your BMR</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Basal Metabolic Rate (BMR) is the number of calories your body burns at rest to maintain vital functions like breathing, circulation, and cell production. This calculator uses the Mifflin-St Jeor equation, which is considered one of the most accurate BMR formulas."
        useCases={[
          { title: "Weight Management", description: "Understanding your BMR helps create effective calorie deficits or surpluses for weight loss or gain." },
          { title: "Nutrition Planning", description: "Calculate your daily caloric needs by multiplying BMR by your activity level factor." },
          { title: "Fitness Goals", description: "Use BMR as a baseline to design personalized meal and workout plans." },
          { title: "Metabolic Health", description: "Track changes in BMR over time to monitor metabolic health and fitness progress." }
        ]}
        tips={[
          { title: "Multiply by Activity Factor", description: "To get Total Daily Energy Expenditure (TDEE), multiply your BMR by an activity factor: sedentary (1.2), lightly active (1.375), moderately active (1.55), very active (1.725), or extra active (1.9)." },
          { title: "BMR Changes with Age", description: "BMR typically decreases with age due to loss of muscle mass. Strength training can help maintain higher BMR." },
          { title: "Muscle Burns More", description: "Muscle tissue burns more calories at rest than fat tissue, so building muscle can increase your BMR." },
          { title: "Don't Eat Below BMR", description: "Consistently eating below your BMR can slow metabolism and is generally not recommended without medical supervision." }
        ]}
        examples={[
          { title: "40-year-old man, 85 kg, 180 cm", description: "A 40-year-old man weighing 85 kg at 180 cm has a BMR of 1,780 kcal/day.", steps: ["Male formula: 10 × 85 + 6.25 × 180 − 5 × 40 + 5.", "Compute: 850 + 1,125 − 200 + 5 = 1,780 kcal/day.", "TDEE if moderately active: 1,780 × 1.55 = 2,759 kcal/day."] },
          { title: "35-year-old woman, 65 kg, 168 cm", description: "A 35-year-old woman weighing 65 kg at 168 cm has a BMR of 1,364 kcal/day.", steps: ["Female formula: 10 × 65 + 6.25 × 168 − 5 × 35 − 161.", "Compute: 650 + 1,050 − 175 − 161 = 1,364 kcal/day.", "TDEE if lightly active: 1,364 × 1.375 = 1,876 kcal/day (1,364 × 1.375 = 1,875.5)."] },
        ]}
        faqs={[
          { question: "What's the difference between BMR and TDEE?", answer: "BMR is calories burned at complete rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise." },
          { question: "How can I increase my BMR?", answer: "Build muscle through strength training, stay active, eat enough protein, get adequate sleep, and avoid crash diets that can slow metabolism." },
          { question: "Why is my BMR lower than expected?", answer: "Factors like genetics, body composition, hormonal conditions, and dieting history can affect BMR. Consult a healthcare provider if concerned." },
          { question: "Is BMR the same as metabolism?", answer: "BMR is a measurement of your basal metabolism - the minimum energy required for basic bodily functions at rest." },
          { question: "What is the BMR of a 40-year-old man who is 85 kg and 180 cm?", answer: "Using the male Mifflin-St Jeor formula: 10 × 85 + 6.25 × 180 − 5 × 40 + 5 = 850 + 1,125 − 200 + 5 = 1,780 kcal/day at rest." },
          { question: "What is the BMR of a 35-year-old woman who is 65 kg and 168 cm?", answer: "Using the female Mifflin-St Jeor formula: 10 × 65 + 6.25 × 168 − 5 × 35 − 161 = 650 + 1,050 − 175 − 161 = 1,364 kcal/day at rest." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BMRCalculatorClient;
