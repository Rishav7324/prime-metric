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

const BMRCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (w > 0 && h > 0 && a > 0) {
      let bmr;
      if (gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      setResult(bmr.toFixed(0));
      toast({
        title: "BMR Calculated",
        description: `Your Basal Metabolic Rate is ${bmr.toFixed(0)} calories/day.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid, positive numbers for all fields.",
      });
    }
  };

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate"
      formula="Male: BMR = 10W + 6.25H - 5A + 5 | Female: BMR = 10W + 6.25H - 5A - 161"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Your Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
              </Select>
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g., 70" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Age (years)</Label>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate BMR</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Your BMR</div>
                <div className="text-6xl font-bold gradient-text">{result}</div>
                <div className="text-lg text-muted-foreground mt-2">calories/day</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <p className="text-sm text-muted-foreground">This is the number of calories your body burns at rest to maintain vital functions.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🔥</div><p>Enter details to see your BMR</p></div>
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
        faqs={[
          { question: "What's the difference between BMR and TDEE?", answer: "BMR is calories burned at complete rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise." },
          { question: "How can I increase my BMR?", answer: "Build muscle through strength training, stay active, eat enough protein, get adequate sleep, and avoid crash diets that can slow metabolism." },
          { question: "Why is my BMR lower than expected?", answer: "Factors like genetics, body composition, hormonal conditions, and dieting history can affect BMR. Consult a healthcare provider if concerned." },
          { question: "Is BMR the same as metabolism?", answer: "BMR is a measurement of your basal metabolism - the minimum energy required for basic bodily functions at rest." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BMRCalculator;
