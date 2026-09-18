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

type BmiResult = {
  bmi: number;
  category: string;
  color: string;
  bg: string;
  border: string;
  healthyMin: number;
  healthyMax: number;
  bmr: number | null;
  gaugePct: number;
};

function computeBmi(weightStr: string, heightStr: string, ageStr: string, genderStr: string): BmiResult | null {
  const w = parseFloat(weightStr);
  const hCm = parseFloat(heightStr);
  const h = hCm / 100;

  if (!(w > 0 && w < 500) || !(hCm > 50 && hCm < 300)) return null;

  const bmi = w / (h * h);
  let category = "", color = "", bg = "", border = "";

  if (bmi < 18.5) {
    category = "Underweight"; color = "text-blue-600"; bg = "bg-blue-50"; border = "border-blue-200";
  } else if (bmi < 25) {
    category = "Normal Weight"; color = "text-green-600"; bg = "bg-green-50"; border = "border-green-200";
  } else if (bmi < 30) {
    category = "Overweight"; color = "text-yellow-600"; bg = "bg-yellow-50"; border = "border-yellow-200";
  } else {
    category = "Obese"; color = "text-red-600"; bg = "bg-red-50"; border = "border-red-200";
  }

  const healthyMin = 18.5 * h * h;
  const healthyMax = 24.9 * h * h;

  const ageNum = parseInt(ageStr);
  let bmr: number | null = null;
  if (ageNum >= 10 && ageNum <= 120) {
    bmr = genderStr === "male"
      ? 10 * w + 6.25 * hCm - 5 * ageNum + 5
      : 10 * w + 6.25 * hCm - 5 * ageNum - 161;
  }

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category, color, bg, border,
    healthyMin: parseFloat(healthyMin.toFixed(1)),
    healthyMax: parseFloat(healthyMax.toFixed(1)),
    bmr: bmr ? Math.round(bmr) : null,
    gaugePct: Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)),
  };
}

const BMICalculatorClient = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BmiResult | null>(() => computeBmi("70", "175", "30", "male"));
  const { toast } = useToast();

  const calculateBMI = () => {
    const computed = computeBmi(weight, height, age, gender);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight (1-500 kg) and height (50-300 cm).",
      });
      return;
    }
    setResult(computed);
    toast({ title: "BMI Calculated", description: `Your BMI is ${computed.bmi} (${computed.category}).` });
  };

  const reset = () => {
    setWeight(""); setHeight(""); setAge(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My BMI: ${result.bmi} (${result.category}). Healthy weight range: ${result.healthyMin}-${result.healthyMax} kg.${result.bmr ? ` BMR: ${result.bmr} kcal/day.` : ""} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const ranges = [
    { label: "Underweight", range: "< 18.5", cls: "bg-blue-50 border-blue-200 text-blue-600" },
    { label: "Normal", range: "18.5 - 24.9", cls: "bg-green-50 border-green-200 text-green-600" },
    { label: "Overweight", range: "25 - 29.9", cls: "bg-yellow-50 border-yellow-200 text-yellow-600" },
    { label: "Obese", range: "≥ 30", cls: "bg-red-50 border-red-200 text-red-600" },
  ];

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index, healthy weight range and daily calorie burn (BMR)"
      keywords="bmi calculator, body mass index, healthy weight range, bmr calculator, ideal weight"
      canonicalUrl="/health-calculators/bmi-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium">Weight (kg)</Label>
              <Input id="weight" type="number" min={1} max={500} placeholder="e.g., 70" value={weight}
                onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-medium">Height (cm)</Label>
              <Input id="height" type="number" min={50} max={300} placeholder="e.g., 175" value={height}
                onChange={(e) => setHeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age" className="text-sm font-medium">Age <span className="text-neutral-400 font-normal">(for BMR)</span></Label>
                <Input id="age" type="number" min={10} max={120} placeholder="e.g., 30" value={age}
                  onChange={(e) => setAge(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="mt-1.5 h-10 text-sm bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculateBMI} className="flex-1 h-10 text-sm gradient-button" disabled={!weight || !height}>
                Calculate BMI
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Result */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Your Result</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className={`text-center py-4 rounded-xl border ${result.bg} ${result.border}`}>
                <div className={`text-4xl font-bold ${result.color}`}>{result.bmi}</div>
                <div className={`text-base font-semibold mt-1 ${result.color}`}>{result.category}</div>
              </div>

              {/* Gauge */}
              <div>
                <div className="relative h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-blue-400" style={{ width: "23%" }} />
                  <div className="bg-green-500" style={{ width: "23%" }} />
                  <div className="bg-yellow-400" style={{ width: "18%" }} />
                  <div className="bg-red-500" style={{ width: "36%" }} />
                  <div className="absolute top-[-3px] w-1 h-4 bg-black rounded" style={{ left: `calc(${result.gaugePct}% - 2px)` }} />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>12</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Healthy weight</p>
                  <p className="text-sm font-bold text-black">{result.healthyMin} - {result.healthyMax} kg</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Daily burn (BMR)</p>
                  <p className="text-sm font-bold text-black">{result.bmr ? `${result.bmr.toLocaleString()} kcal` : "Add age"}</p>
                </div>
              </div>

              <div className="space-y-2">
                {ranges.map((r) => (
                  <div key={r.label} className={`flex justify-between items-center px-3 py-1.5 rounded-lg border text-[13px] ${r.cls}`}>
                    <span className="font-medium text-black">{r.label}</span>
                    <span className="font-semibold">{r.range}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🏃</div>
                <p className="text-sm">Enter your details to see BMI + healthy range</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Body Mass Index (BMI) is a widely-used screening tool that estimates whether you have a healthy body weight for your height. This calculator also shows your healthy weight range and estimated Basal Metabolic Rate (BMR) — the calories your body burns at rest — using the Mifflin-St Jeor equation."
        useCases={[
          { title: "Health Screening", description: "A quick first check used by professionals to flag potential weight-related risks." },
          { title: "Weight Goals", description: "See exactly how many kilos to gain or lose to reach the healthy range." },
          { title: "Calorie Planning", description: "Use your BMR as the baseline for diet and fitness calorie targets." },
          { title: "Track Progress", description: "Re-check monthly to follow trends rather than single readings." },
        ]}
        tips={[
          { title: "Muscle vs Fat", description: "Athletes may show high BMI despite low body fat — BMI can't tell muscle from fat." },
          { title: "Measure Right", description: "Weigh yourself in the morning, measure height barefoot against a wall." },
          { title: "BMR Is a Baseline", description: "Total daily burn = BMR × activity level (1.2 sedentary up to 1.9 very active)." },
        ]}
        examples={[
          { title: "70 kg at 175 cm", description: "A typical healthy-weight check: 70 kg and 175 cm gives a Normal BMI of 22.9.", steps: ["Convert height: 175 cm = 1.75 m, squared = 3.0625.", "Divide: 70 / 3.0625 = 22.9 BMI (Normal).", "Healthy range: 18.5 × 3.0625 = 56.7 kg to 24.9 × 3.0625 = 76.3 kg."] },
          { title: "90 kg at 165 cm", description: "A higher-weight check: 90 kg and 165 cm gives an Obese BMI of 33.1.", steps: ["Convert height: 165 cm = 1.65 m, squared = 2.7225.", "Divide: 90 / 2.7225 = 33.1 BMI (Obese).", "Healthy range: 18.5 × 2.7225 = 50.4 kg to 24.9 × 2.7225 = 67.8 kg."] },
        ]}
        faqs={[
          { question: "What is a healthy BMI?", answer: "For most adults, 18.5 to 24.9 is considered healthy. Below 18.5 is underweight, 25-29.9 overweight, and 30+ obese." },
          { question: "How is BMR calculated?", answer: "We use the Mifflin-St Jeor equation, which factors in weight, height, age and gender. It estimates calories burned at complete rest." },
          { question: "Is BMI accurate for athletes?", answer: "Not always — dense muscle raises BMI without extra fat. Athletes should also track body-fat percentage and waist size." },
          { question: "How often should I check BMI?", answer: "Monthly is plenty. Daily fluctuations in water and food make frequent checks misleading." },
          { question: "I am 180 cm and 95 kg — what is my BMI and how much should I lose?", answer: "Your BMI is 95 / (1.80 × 1.80) = 95 / 3.24 = 29.3, which is Overweight. Your healthy maximum is 24.9 × 3.24 = 80.7 kg, so reaching the top of the healthy range means losing about 95 − 80.7 = 14.3 kg." },
          { question: "Why did gaining 6 kg move my BMI from 22 to 24 at 170 cm?", answer: "At 170 cm your height squared is 1.70 × 1.70 = 2.89, so each kilo adds 1 / 2.89 = 0.35 BMI points. Gaining 6 kg adds 6 / 2.89 = 2.1 points — exactly the jump from 22.0 to about 24.1." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default BMICalculatorClient;
