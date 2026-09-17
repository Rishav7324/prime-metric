'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type HrZone = {
  zone: string;
  name: string;
  label: string;
  low: number;
  high: number;
};

type HeartRateResult = {
  maxHr: number;
  resting: number;
  zones: HrZone[];
};

const ZONE_DEFS = [
  { zone: "Zone 1", name: "Recovery", label: "Very light / warm-up", lo: 0.5, hi: 0.6 },
  { zone: "Zone 2", name: "Fat Burn", label: "Light / fat-burn", lo: 0.6, hi: 0.7 },
  { zone: "Zone 3", name: "Cardio", label: "Moderate / aerobic", lo: 0.7, hi: 0.8 },
  { zone: "Zone 4", name: "Threshold", label: "Hard / anaerobic", lo: 0.8, hi: 0.9 },
  { zone: "Zone 5", name: "Peak", label: "Maximum effort", lo: 0.9, hi: 1.0 },
];

function computeHeartRate(ageStr: string, restingStr: string): HeartRateResult | null {
  const age = parseInt(ageStr);
  const resting = parseInt(restingStr);
  if (!(age >= 5 && age <= 120) || !(resting >= 30 && resting <= 120)) return null;
  const maxHr = 220 - age;
  if (maxHr <= resting) return null;
  const zones: HrZone[] = ZONE_DEFS.map((z) => ({
    zone: z.zone,
    name: z.name,
    label: z.label,
    low: Math.round(maxHr * z.lo),
    high: Math.round(maxHr * z.hi),
  }));
  return { maxHr, resting, zones };
}

const HeartRateCalculatorClient = () => {
  const [age, setAge] = useState("30");
  const [resting, setResting] = useState("70");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<HeartRateResult | null>(() => computeHeartRate("30", "70"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeHeartRate(age, resting);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter age (5-120) and resting HR (30-120 bpm). Max HR must exceed resting HR.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Zones Calculated", description: `Your max heart rate is ${computed.maxHr} bpm.` });
  };

  const reset = () => {
    setAge("30");
    setResting("70");
    setResult(computeHeartRate("30", "70"));
  };

  const copyResult = async () => {
    if (!result) return;
    const zonesText = result.zones.map((z) => `${z.zone} ${z.name}: ${z.low}-${z.high} bpm`).join("; ");
    const text = `Max HR: ${result.maxHr} bpm (resting ${result.resting} bpm). Target zones — ${zonesText}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Heart Rate Calculator"
      description="Find your max heart rate and personalized training zones for fat burn and cardio"
      keywords="heart rate calculator, target heart rate zones, max heart rate, fat burn zone, cardio zone"
      canonicalUrl="/health-calculators/heart-rate-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="age" className="text-sm font-medium">Age (years)</Label>
              <Input id="age" type="number" min={5} max={120} placeholder="e.g., 30" value={age}
                onChange={(e) => setAge(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="resting" className="text-sm font-medium">Resting heart rate (bpm)</Label>
              <Input id="resting" type="number" min={30} max={120} placeholder="e.g., 70" value={resting}
                onChange={(e) => setResting(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-xs text-neutral-500 mt-1">Measure first thing in the morning, before coffee.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!age || !resting}>
                Calculate Zones
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
              <div className="text-center py-4 rounded-xl border bg-red-50 border-red-200">
                <p className="text-xs text-neutral-500">Max heart rate (220 − age)</p>
                <div className="text-4xl font-bold text-red-600">{result.maxHr.toLocaleString()} <span className="text-base font-semibold">bpm</span></div>
                <p className="text-xs text-neutral-500 mt-1">Resting: {result.resting.toLocaleString()} bpm</p>
              </div>

              <div className="space-y-2">
                {result.zones.map((z) => (
                  <div key={z.zone} className="flex justify-between items-center px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-[13px]">
                    <span className="font-medium text-black">{z.zone} · {z.name} <span className="text-neutral-500 font-normal">({z.label})</span></span>
                    <span className="font-semibold text-black">{z.low.toLocaleString()}–{z.high.toLocaleString()} bpm</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">❤️</div>
                <p className="text-sm">Enter your details to see your HR zones</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Your maximum heart rate is estimated as 220 minus your age, and each training zone is a percentage band of that maximum. This calculator splits your max into 5 standard zones — from easy recovery up to all-out peak effort — so every workout can target the right intensity."
        useCases={[
          { title: "Fat-Burn Workouts", description: "Stay in Zone 2 (60–70%) for long, steady sessions that prioritize fat as fuel." },
          { title: "Cardio Fitness", description: "Train in Zone 3 (70–80%) to build aerobic endurance and heart efficiency." },
          { title: "Interval Training", description: "Push into Zones 4–5 for short bursts that raise speed and VO2 max." },
          { title: "Safe Exercise", description: "Older adults and beginners use zones to avoid overexertion during workouts." },
        ]}
        tips={[
          { title: "220 − Age Is An Estimate", description: "Individual max HR varies ±10–15 bpm — a lab or field test is more precise." },
          { title: "Measure Resting Right", description: "Check your pulse for 60 seconds right after waking, lying still, for 3 mornings and average them." },
          { title: "Use A Monitor", description: "Wrist or chest-strap monitors keep you honestly inside the target zone during training." },
        ]}
        faqs={[
          { question: "What is a good fat-burn heart rate?", answer: "Zone 2, roughly 60–70% of max HR. For a 30-year-old with a 190 max, that's about 114–133 bpm — a brisk walk or easy jog pace." },
          { question: "What is the cardio zone?", answer: "Zone 3, about 70–80% of max HR. Breathing is heavy but sustainable, ideal for improving aerobic endurance." },
          { question: "How accurate is 220 minus age?", answer: "It's a population average, usually within 10–15 bpm. Formulas like Tanaka (208 − 0.7 × age) can be slightly better for older adults." },
          { question: "When should I see a doctor?", answer: "If your resting HR is persistently above 100, below 40 with symptoms, or you feel chest pain, dizziness or faintness during exercise, seek medical advice." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default HeartRateCalculatorClient;
