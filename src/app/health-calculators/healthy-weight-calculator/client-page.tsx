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

const HealthyWeightCalculatorClient = () => {
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("cm");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    let heightInCm = parseFloat(height);

    if (isNaN(heightInCm) || heightInCm <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid, positive height.",
      });
      return;
    }

    if (unit === "inches") {
      heightInCm = heightInCm * 2.54;
    }
    
    const heightInM = heightInCm / 100;
    const minHealthyWeight = 18.5 * heightInM * heightInM;
    const maxHealthyWeight = 24.9 * heightInM * heightInM;
    const idealWeight = 22 * heightInM * heightInM;

    setResult({
      min: minHealthyWeight.toFixed(1),
      max: maxHealthyWeight.toFixed(1),
      ideal: idealWeight.toFixed(1)
    });
    
    toast({
      title: "Calculation Complete",
      description: `Your ideal weight is around ${idealWeight.toFixed(1)} kg.`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Range
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Ideal Weight (approx.)</p>
                <p className="text-4xl font-bold text-primary">{result.ideal} kg</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Healthy Weight Range</p>
                <p className="text-2xl font-bold">{result.min} kg - {result.max} kg</p>
              </div>
              <div className="text-sm text-muted-foreground text-center">
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
