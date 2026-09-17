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
import { Copy, RotateCcw, Scale } from "lucide-react";

type IdealWeightResult = {
  ideal: number;
  minHealthy: number;
  maxHealthy: number;
};

function computeIdealWeight(heightStr: string, genderStr: string): IdealWeightResult | null {
  const h = parseFloat(heightStr);
  if (!(h > 0) || !(h >= 50 && h <= 300)) return null;

  let ideal: number;
  if (genderStr === "male") {
    ideal = 50 + 0.91 * (h - 152.4);
  } else {
    ideal = 45.5 + 0.91 * (h - 152.4);
  }

  const hM = h / 100;
  const minHealthy = 18.5 * hM * hM;
  const maxHealthy = 24.9 * hM * hM;

  return {
    ideal: parseFloat(ideal.toFixed(1)),
    minHealthy: parseFloat(minHealthy.toFixed(1)),
    maxHealthy: parseFloat(maxHealthy.toFixed(1)),
  };
}

const IdealWeightCalculatorClient = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("175");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<IdealWeightResult | null>(() => computeIdealWeight("175", "male"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeIdealWeight(height, gender);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter height (50-300 cm).",
      });
      return;
    }

    setResult(computed);
    toast({
        title: "Calculation Complete",
        description: `Your ideal weight is estimated to be ${computed.ideal.toLocaleString()} kg.`
    });
  };

  const reset = () => {
    setHeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My ideal weight: ${result.ideal.toLocaleString()} kg. Healthy range: ${result.minHealthy.toLocaleString()} - ${result.maxHealthy.toLocaleString()} kg — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight range using the Devine formula and BMI guidelines."
      keywords="ideal weight calculator, healthy weight, Devine formula, weight range, health calculator"
      canonicalUrl="/health-calculators/ideal-weight-calculator"
      formula="Devine Formula: Male = 50 + 0.91(H-152.4) | Female = 45.5 + 0.91(H-152.4)"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 font-headline">Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-10 bg-white border border-neutral-200"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" min={50} max={300} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button" disabled={!height}>Calculate</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-headline">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">Ideal Weight (Devine Formula)</div>
                <div className="text-6xl font-bold gradient-text">{result.ideal.toLocaleString()}</div>
                <div className="text-lg text-neutral-600 mt-2">kg</div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-green-500/20">
                <div className="text-sm text-neutral-600 mb-1">Healthy BMI Weight Range</div>
                <div className="text-2xl font-bold text-green-600">{result.minHealthy.toLocaleString()} - {result.maxHealthy.toLocaleString()} kg</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center">
                <Scale className="text-6xl mb-4 mx-auto w-16 h-16" />
                <p>Enter details to see your results</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Ideal Weight Calculator uses the Devine formula to estimate your optimal body weight based on your height and gender. This calculator also provides a healthy weight range based on standard BMI guidelines (18.5-24.9)."
        useCases={[
          { title: "Health Assessment", description: "Determine if your current weight falls within a healthy range for your height." },
          { title: "Goal Setting", description: "Set realistic weight loss or weight gain targets based on scientific formulas." },
          { title: "Fitness Planning", description: "Use as a reference point when creating personalized fitness and nutrition plans." },
          { title: "Medical Reference", description: "Healthcare providers often use these calculations for medical assessments." }
        ]}
        tips={[
          { title: "Consider Body Composition", description: "Ideal weight formulas don't account for muscle mass. Athletes may weigh more than the 'ideal' due to muscle." },
          { title: "Use as a Guide", description: "These are estimates, not absolute targets. Your ideal weight depends on many factors including frame size and fitness level." },
          { title: "Focus on Health", description: "Rather than fixating on a number, focus on overall health markers like energy levels, strength, and endurance." },
          { title: "Consult Professionals", description: "For personalized advice, consult with healthcare providers or registered dietitians." }
        ]}
        faqs={[
          { question: "What is the Devine formula?", answer: "The Devine formula is a method developed by Dr. B.J. Devine in 1974 to calculate ideal body weight. It's widely used in medical settings and adjusts for gender differences." },
          { question: "Is the ideal weight the same for everyone of the same height?", answer: "No, the ideal weight can vary based on factors like body frame, muscle mass, age, and genetics. These calculators provide a general guideline." },
          { question: "What if my weight is outside the healthy range?", answer: "If your weight falls outside the healthy range, consider consulting a healthcare provider. They can assess your individual situation and provide personalized recommendations." },
          { question: "How accurate is this calculator?", answer: "The calculator provides scientifically-based estimates but doesn't account for individual variations in body composition, frame size, or muscle mass." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default IdealWeightCalculatorClient;
