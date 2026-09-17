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

type BodyFatResult = {
  bodyFat: number;
  name: string;
  color: string;
};

function getBodyFatCategory(bf: number, g: string): { name: string; color: string } {
  if (g === "male") {
    if (bf < 6) return { name: "Essential Fat", color: "text-blue-600" };
    if (bf < 14) return { name: "Athletes", color: "text-green-600" };
    if (bf < 18) return { name: "Fitness", color: "text-emerald-400" };
    if (bf < 25) return { name: "Average", color: "text-yellow-600" };
    return { name: "Obese", color: "text-red-600" };
  } else {
    if (bf < 14) return { name: "Essential Fat", color: "text-blue-600" };
    if (bf < 21) return { name: "Athletes", color: "text-green-600" };
    if (bf < 25) return { name: "Fitness", color: "text-emerald-400" };
    if (bf < 32) return { name: "Average", color: "text-yellow-600" };
    return { name: "Obese", color: "text-red-600" };
  }
}

function computeBodyFat(genderStr: string, heightStr: string, neckStr: string, waistStr: string, hipStr: string): BodyFatResult | null {
  const h = parseFloat(heightStr);
  const n = parseFloat(neckStr);
  const wa = parseFloat(waistStr);
  const hi = parseFloat(hipStr);

  if (!(h >= 50 && h <= 300) || !(n >= 20 && n <= 80) || !(wa >= 40 && wa <= 200)) return null;

  let bodyFat = 0;
  if (genderStr === "male") {
    if (!(wa - n > 0)) return null;
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
  } else {
    if (!(hi >= 40 && hi <= 200)) return null;
    if (!(wa + hi - n > 0)) return null;
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
  }

  if (!isFinite(bodyFat) || !(bodyFat >= 1 && bodyFat <= 70)) return null;

  const category = getBodyFatCategory(bodyFat, genderStr);
  return { bodyFat: parseFloat(bodyFat.toFixed(1)), name: category.name, color: category.color };
}

const BodyFatCalculatorClient = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("175");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BodyFatResult | null>(() => computeBodyFat("male", "175", "38", "85", "95"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeBodyFat(gender, height, neck, waist, hip);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: gender === "male"
          ? "Enter height (50-300 cm), neck (20-80 cm), and waist (40-200 cm). Waist must exceed neck."
          : "Enter height (50-300 cm), neck (20-80 cm), waist (40-200 cm), and hip (40-200 cm).",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Success", description: `Your estimated body fat is ${computed.bodyFat.toFixed(1)}% (${computed.name}).` });
  };

  const reset = () => {
    setHeight(""); setNeck(""); setWaist(""); setHip(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My body fat: ${result.bodyFat.toFixed(1)}% (${result.name}) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const getCategory = (bf: number, g: string) => {
    return getBodyFatCategory(bf, g);
  };

  return (
    <CalculatorLayout
      title="Body Fat Calculator"
      description="Estimate body fat percentage using the U.S. Navy method"
      keywords="body fat calculator, us navy body fat, body composition, fitness calculator"
      canonicalUrl="/health-calculators/body-fat-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4">Your Measurements</h2>
          <div className="space-y-4">
            <div>
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1 h-10 bg-white border border-neutral-200">
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
              <Input type="number" min={50} max={300} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 175" className="mt-1 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Neck (cm)</Label>
              <Input type="number" min={20} max={80} value={neck} onChange={(e) => setNeck(e.target.value)} placeholder="e.g., 38" className="mt-1 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Waist (cm)</Label>
              <Input type="number" min={40} max={200} value={waist} onChange={(e) => setWaist(e.target.value)} placeholder="e.g., 85" className="mt-1 h-10 bg-white border border-neutral-200" />
            </div>
            {gender === "female" && (
              <div>
                <Label>Hip (cm)</Label>
                <Input type="number" min={40} max={200} value={hip} onChange={(e) => setHip(e.target.value)} placeholder="e.g., 95" className="mt-1 h-10 bg-white border border-neutral-200" />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button" disabled={!height || !neck || !waist}>Calculate Body Fat</Button>
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
                <div className="text-6xl font-bold gradient-text">{result.bodyFat.toFixed(1)}%</div>
                <div className={`text-xl font-semibold mt-4 ${result.color}`}>{result.name}</div>
              </div>
              <div className="text-sm text-neutral-600 text-center">
                  Body Fat Percentage (BFP) estimated with the U.S. Navy method.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center"><div className="text-4xl mb-2">💪</div><p>Enter measurements to calculate body fat</p></div>
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

export default BodyFatCalculatorClient;
