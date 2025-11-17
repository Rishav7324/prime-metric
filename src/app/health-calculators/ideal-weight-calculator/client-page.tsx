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
import { Scale } from "lucide-react";

const IdealWeightCalculatorClient = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const h = parseFloat(height);
    if (!h || h <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid height.",
      });
      return;
    }
    
    let ideal;
    if (gender === "male") {
      ideal = 50 + 0.91 * (h - 152.4);
    } else {
      ideal = 45.5 + 0.91 * (h - 152.4);
    }
    
    const minHealthy = 18.5 * Math.pow(h / 100, 2);
    const maxHealthy = 24.9 * Math.pow(h / 100, 2);
    
    const newResult = {
      ideal: ideal.toFixed(1),
      range: `${minHealthy.toFixed(1)} - ${maxHealthy.toFixed(1)}`
    };

    setResult(newResult);
    toast({
        title: "Calculation Complete",
        description: `Your ideal weight is estimated to be ${newResult.ideal} kg.`
    });
  };

  return (
    <CalculatorLayout
      title="Ideal Weight Calculator"
      description="Calculate your ideal body weight range using the Devine formula and BMI guidelines."
      keywords="ideal weight calculator, healthy weight, Devine formula, weight range, health calculator"
      canonicalUrl="/health-calculators/ideal-weight-calculator"
      formula="Devine Formula: Male = 50 + 0.91(H-152.4) | Female = 45.5 + 0.91(H-152.4)"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Ideal Weight (Devine Formula)</div>
                <div className="text-6xl font-bold gradient-text">{result.ideal}</div>
                <div className="text-lg text-muted-foreground mt-2">kg</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-green-500/20">
                <div className="text-sm text-muted-foreground mb-1">Healthy BMI Weight Range</div>
                <div className="text-2xl font-bold text-green-400">{result.range} kg</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
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
