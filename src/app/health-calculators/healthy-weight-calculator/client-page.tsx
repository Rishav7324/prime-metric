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

type HealthyWeightResult = {
  min: number;
  max: number;
  ideal: number;
};

function computeHealthyWeight(heightStr: string, unitStr: string): HealthyWeightResult | null {
  const raw = parseFloat(heightStr);
  if (isNaN(raw) || !(raw > 0)) return null;

  let heightInCm = raw;
  if (unitStr === "inches") {
    if (!(raw >= 20 && raw <= 120)) return null;
    heightInCm = raw * 2.54;
  } else if (unitStr === "cm") {
    if (!(raw >= 50 && raw <= 300)) return null;
  } else {
    return null;
  }

  const heightInM = heightInCm / 100;
  const minHealthyWeight = 18.5 * heightInM * heightInM;
  const maxHealthyWeight = 24.9 * heightInM * heightInM;
  const idealWeight = 22 * heightInM * heightInM;

  return {
    min: parseFloat(minHealthyWeight.toFixed(1)),
    max: parseFloat(maxHealthyWeight.toFixed(1)),
    ideal: parseFloat(idealWeight.toFixed(1)),
  };
}

const HealthyWeightCalculatorClient = () => {
  const [height, setHeight] = useState("175");
  const [unit, setUnit] = useState("cm");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<HealthyWeightResult | null>(() => computeHealthyWeight("175", "cm"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeHealthyWeight(height, unit);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: unit === "inches"
          ? "Enter height (20-120 inches)."
          : "Enter height (50-300 cm).",
      });
      return;
    }

    setResult(computed);
    
    toast({
      title: "Calculation Complete",
      description: `Your ideal weight is around ${computed.ideal.toLocaleString()} kg.`,
    });
  };

  const reset = () => {
    setHeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Ideal weight: ~${result.ideal.toLocaleString()} kg. Healthy range: ${result.min.toLocaleString()} - ${result.max.toLocaleString()} kg — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Healthy Weight Calculator"
      description="Find your healthy weight range based on BMI standards"
      keywords="healthy weight calculator, ideal weight calculator, weight range, BMI range"
      canonicalUrl="/health-calculators/healthy-weight-calculator"
      formula="Based on a healthy BMI range of 18.5 - 24.9"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Your Height</Label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 175"
                className="flex-1"
              />
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cm">cm</SelectItem>
                  <SelectItem value="inches">inches</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button" disabled={!height}>
              Calculate Range
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
                <p className="text-sm text-neutral-600">Ideal Weight (approx.)</p>
                <p className="text-2xl font-bold text-primary">{result.ideal.toLocaleString()} kg</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-neutral-600 mb-2">Healthy Weight Range</p>
                <p className="text-2xl font-bold">{result.min.toLocaleString()} kg - {result.max.toLocaleString()} kg</p>
              </div>
              <div className="text-sm text-neutral-600 text-center">
                Based on a healthy BMI range of 18.5 - 24.9 for your height.
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The healthy weight calculator determines your ideal weight range based on your height and Body Mass Index (BMI) standards. Using the medically accepted healthy BMI range of 18.5 to 24.9, this calculator provides a weight range that's associated with optimal health outcomes. While BMI has limitations and doesn't account for muscle mass, bone density, or body composition, it remains a widely used screening tool. Your ideal weight helps you set realistic health goals and understand whether your current weight falls within a healthy range for your height."
        useCases={[
          { title: "Weight Loss Goals", description: "Set realistic and healthy weight loss targets based on your height. Avoid extreme diets by understanding your natural healthy weight range." },
          { title: "Fitness Planning", description: "Establish baseline health metrics for fitness programs, bodybuilding goals, or athletic training while maintaining healthy body composition." },
          { title: "Medical Assessment", description: "Prepare for medical consultations, understand health risk factors, or discuss weight management strategies with healthcare providers." },
          { title: "Health Monitoring", description: "Track whether your current weight falls within a healthy range and monitor progress toward health goals over time." }
        ]}
        tips={[
          { title: "BMI Range Context", description: "The healthy BMI range (18.5-24.9) is associated with lowest health risks. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese." },
          { title: "Individual Variations", description: "Athletes with high muscle mass may have higher BMI but be perfectly healthy. The calculator provides general guidance, not absolute rules." },
          { title: "Realistic Goal Setting", description: "Aim for the middle of your healthy weight range initially. Gradual weight changes (1-2 lbs per week) are healthier and more sustainable than rapid changes." },
          { title: "Beyond Weight", description: "Healthy weight is just one factor. Consider body composition, fitness level, nutrition quality, and overall wellness for complete health assessment." }
        ]}
        faqs={[
          { question: "Is BMI an accurate measure of health?", answer: "BMI is a useful screening tool but has limitations. It doesn't distinguish between muscle and fat, doesn't account for age or sex differences in body composition, and may not accurately assess health for athletes, bodybuilders, pregnant women, or elderly individuals. Use it as one of several health indicators." },
          { question: "Why is there a range instead of a single ideal weight?", answer: "Bodies vary naturally in bone density, muscle mass, and frame size. A range accounts for these individual differences while staying within healthy BMI parameters. Where you fall in this range depends on your body composition and frame." },
          { question: "What if I'm outside my healthy weight range?", answer: "Being slightly outside the range doesn't automatically mean poor health, but it may increase certain health risks. Consult with a healthcare provider to assess your individual situation and create a personalized plan for reaching a healthy weight if needed." },
          { question: "How quickly should I try to reach my healthy weight?", answer: "Aim for gradual weight changes of 1-2 pounds per week through balanced nutrition and regular exercise. Rapid weight loss or gain can be unhealthy and is difficult to sustain. Slow, steady changes lead to lasting results." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default HealthyWeightCalculatorClient;
