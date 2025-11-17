'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);
  const { toast } = useToast();

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to m

    if (w > 0 && h > 0) {
      const bmi = w / (h * h);
      let category = "";
      let color = "";

      if (bmi < 18.5) {
        category = "Underweight";
        color = "text-blue-400";
      } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal Weight";
        color = "text-green-400";
      } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
        color = "text-yellow-400";
      } else {
        category = "Obese";
        color = "text-red-400";
      }

      setResult({ bmi: parseFloat(bmi.toFixed(1)), category, color });
      toast({
        title: "BMI Calculated",
        description: `Your BMI is ${bmi.toFixed(1)} which is considered ${category}.`
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid weight and height."
      });
    }
  };

  const explanation = (
    <div className="space-y-4 text-left">
      <p>
        <strong>Body Mass Index (BMI)</strong> is a measure of body fat based on height and weight 
        that applies to adult men and women.
      </p>
      <div className="space-y-2">
        <p className="font-semibold">BMI Categories:</p>
        <ul className="space-y-1 ml-4" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><span className="text-blue-400">Underweight:</span> BMI less than 18.5</li>
          <li><span className="text-green-400">Normal weight:</span> BMI 18.5 to 24.9</li>
          <li><span className="text-yellow-400">Overweight:</span> BMI 25 to 29.9</li>
          <li><span className="text-red-400">Obese:</span> BMI 30 or greater</li>
        </ul>
      </div>
      <p className="text-sm">
        <strong>Note:</strong> BMI is a screening tool and does not diagnose body fatness or health. 
        Consult with a healthcare provider for health assessments.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and understand your health category"
      keywords="bmi calculator, body mass index, health calculator, weight calculator"
      canonicalUrl="/health-calculators/bmi-calculator"
      explanation={explanation}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="weight" className="text-lg">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="e.g., 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="height" className="text-lg">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="e.g., 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <Button 
              onClick={calculateBMI}
              className="w-full h-12 text-lg gradient-button"
              disabled={!weight || !height}
            >
              Calculate BMI
            </Button>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Your Result</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className={`text-6xl font-bold mb-4 ${result.color}`}>
                  {result.bmi}
                </div>
                <div className={`text-2xl font-semibold ${result.color}`}>
                  {result.category}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <span>Underweight</span>
                  <span className="text-blue-400">&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <span>Normal</span>
                  <span className="text-green-400">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <span>Overweight</span>
                  <span className="text-yellow-400">25 - 29.9</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <span>Obese</span>
                  <span className="text-red-400">≥ 30</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">🏃</div>
                <p>Enter your details to calculate BMI</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Body Mass Index (BMI) is a widely-used screening tool that helps assess whether a person has a healthy body weight relative to their height. While BMI doesn't directly measure body fat, it provides a quick and easy way to identify potential weight-related health risks. Healthcare professionals use BMI as one of several factors when evaluating overall health status. It's important to note that BMI is most accurate for adults aged 20 and older, and may not be appropriate for athletes, pregnant women, or individuals with certain medical conditions."
        useCases={[
          {
            title: "Health Screening",
            description: "Healthcare providers use BMI as an initial screening tool to identify patients who may benefit from further health assessments and lifestyle counseling."
          },
          {
            title: "Weight Management Goals",
            description: "Track your progress when working toward weight loss or gain goals by monitoring BMI changes over time alongside other health metrics."
          },
          {
            title: "Insurance Assessments",
            description: "Many insurance companies use BMI as one factor in determining health insurance premiums and coverage eligibility."
          },
          {
            title: "Fitness Planning",
            description: "Establish baseline measurements before starting a new fitness or nutrition program to track effectiveness over time."
          }
        ]}
        tips={[
          {
            title: "Measure Accurately",
            description: "For the most accurate BMI calculation, measure your weight first thing in the morning after using the bathroom, and measure height without shoes against a flat wall."
          },
          {
            title: "Consider Body Composition",
            description: "BMI doesn't distinguish between muscle and fat. Athletes with high muscle mass may have elevated BMI despite low body fat percentage."
          },
          {
            title: "Track Trends Over Time",
            description: "Rather than focusing on a single BMI measurement, track changes over several months to identify meaningful patterns and trends."
          },
          {
            title: "Consult Healthcare Professionals",
            description: "Always discuss BMI results with your doctor, especially if you have concerns about your weight or overall health. BMI is just one tool among many."
          }
        ]}
        faqs={[
          {
            question: "Is BMI accurate for everyone?",
            answer: "BMI is a useful screening tool for most adults, but it has limitations. It may not be accurate for athletes, bodybuilders, pregnant women, elderly individuals, or those with certain medical conditions. BMI doesn't account for muscle mass, bone density, or fat distribution, so it should be used alongside other health assessments."
          },
          {
            question: "What BMI is considered healthy?",
            answer: "For adults, a BMI between 18.5 and 24.9 is generally considered healthy. BMI under 18.5 is underweight, 25-29.9 is overweight, and 30 or above is obese. However, these ranges may vary slightly based on age, ethnicity, and individual health factors."
          },
          {
            question: "How often should I calculate my BMI?",
            answer: "For general health monitoring, calculating BMI once every few months is sufficient. If you're actively working on weight management goals, monthly calculations can help track progress. Avoid daily measurements as normal weight fluctuations can be misleading."
          },
          {
            question: "Can BMI predict health problems?",
            answer: "BMI can indicate increased risk for certain health conditions like heart disease, diabetes, and high blood pressure, but it's not a diagnostic tool. Many factors contribute to health risks, including diet, exercise, genetics, and lifestyle habits."
          },
          {
            question: "Why is my BMI different from what I expected?",
            answer: "BMI is based solely on height and weight ratios and doesn't consider individual variations in body composition, frame size, or muscle mass. If your BMI seems inconsistent with your fitness level or appearance, consult a healthcare provider for a comprehensive health assessment."
          }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BMICalculator;
