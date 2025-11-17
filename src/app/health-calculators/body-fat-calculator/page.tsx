
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

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const wa = parseFloat(waist);
    const hi = parseFloat(hip);

    let bodyFat = 0;
    if (gender === "male") {
        if(!(h > 0 && wa > 0 && n > 0)) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter valid height, waist, and neck measurements." });
            return;
        }
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
    } else { // female
        if(!(h > 0 && wa > 0 && n > 0 && hi > 0)) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter valid height, waist, neck and hip measurements." });
            return;
        }
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }

    if (bodyFat && bodyFat > 0) {
        const category = getCategory(bodyFat, gender);
        setResult({ bodyFat: bodyFat.toFixed(1), category: category });
        toast({ title: "Success", description: `Your estimated body fat is ${bodyFat.toFixed(1)}% (${category.name}).` });
    } else {
        toast({ variant: "destructive", title: "Calculation Error", description: "Could not calculate body fat. Please check your measurements." });
        setResult(null);
    }
  };

  const getCategory = (bf: number, g: string) => {
    if (g === "male") {
      if (bf < 6) return { name: "Essential Fat", color: "text-blue-400" };
      if (bf < 14) return { name: "Athletes", color: "text-green-400" };
      if (bf < 18) return { name: "Fitness", color: "text-emerald-400" };
      if (bf < 25) return { name: "Average", color: "text-yellow-400" };
      return { name: "Obese", color: "text-red-400" };
    } else { // female
      if (bf < 14) return { name: "Essential Fat", color: "text-blue-400" };
      if (bf < 21) return { name: "Athletes", color: "text-green-400" };
      if (bf < 25) return { name: "Fitness", color: "text-emerald-400" };
      if (bf < 32) return { name: "Average", color: "text-yellow-400" };
      return { name: "Obese", color: "text-red-400" };
    }
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Estimate body fat percentage using the U.S. Navy method"
      keywords="body fat calculator, us navy body fat, body composition, fitness calculator"
      canonicalUrl="/health-calculators/body-fat-calculator"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Your Measurements</h2>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={(val) => { setGender(val); setResult(null); }}>
                <SelectTrigger className="mt-1 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-1 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Neck (cm)</Label>
              <Input type="number" value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="e.g., 38" className="mt-1 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Waist (cm)</Label>
              <Input type="number" value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="e.g., 85" className="mt-1 h-12 glass-card border-primary/30" />
            </div>
            {gender === "female" && (
              <div>
                <Label>Hip (cm)</Label>
                <Input type="number" value={hip} onChange={(e) => setHip(e.target.value)} placeholder="e.g., 95" className="mt-1 h-12 glass-card border-primary/30" />
              </div>
            )}
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate Body Fat</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-6xl font-bold gradient-text">{result.bodyFat}%</div>
                <div className={`text-2xl font-semibold mt-4 ${result.category.color}`}>{result.category.name}</div>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                  Body Fat Percentage (BFP) estimated with the U.S. Navy method.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💪</div><p>Enter measurements to calculate body fat</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Body Fat Calculator uses the U.S. Navy method to estimate body fat percentage based on circumference measurements. Unlike BMI, which only considers height and weight, this method accounts for body composition by measuring specific body parts. It's a practical way to assess fitness and health without expensive equipment."
        useCases={[
          { title: "Fitness Progress Tracking", description: "Monitor body composition changes during weight loss or muscle building programs more accurately than scale weight alone." },
          { title: "Health Assessment", description: "Evaluate health risks associated with body fat levels, as high body fat is linked to various health conditions." },
          { title: "Athletic Performance", description: "Athletes can optimize performance by maintaining body fat within their sport's ideal range." },
          { title: "Goal Setting", description: "Set realistic body composition goals and track progress toward them over time." }
        ]}
        tips={[
          { title: "Measure Consistently", description: "Take measurements at the same time of day, ideally in the morning before eating, for consistent tracking." },
          { title: "Measure Accurately", description: "Use a flexible measuring tape, keep it snug but not tight, and measure at the correct body locations (narrowest waist, fullest hip)." },
          { title: "Track Trends", description: "Single measurements can vary. Track weekly or monthly trends rather than day-to-day fluctuations." },
          { title: "Combine with Other Metrics", description: "Use alongside photos, measurements, and how clothes fit for a complete picture of progress." }
        ]}
        faqs={[
          { question: "How accurate is the Navy body fat method?", answer: "The Navy method is reasonably accurate (within 3-4%) for most people and much better than BMI alone. However, it's less accurate than DEXA scans or hydrostatic weighing." },
          { question: "What's a healthy body fat percentage?", answer: "For men: 10-20% is athletic/fit, 21-25% is average. For women: 18-25% is athletic/fit, 26-31% is average. Essential fat is ~3% for men and ~12% for women." },
          { question: "Can I spot reduce body fat?", answer: "No, you can't target fat loss from specific areas. Fat loss occurs throughout the body based on genetics. Focus on overall fat loss through diet and exercise." },
          { question: "How long does it take to lose body fat?", answer: "Safe fat loss is 0.5-1% of body weight per week. For someone at 25% body fat wanting to reach 20%, this might take 2-4 months depending on starting weight." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BodyFatCalculator;
