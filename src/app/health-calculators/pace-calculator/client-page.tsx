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

type PaceResult = {
  pace: string;
  paceSecondsPerKm: number;
};

function computePace(timeHStr: string, timeMStr: string, timeSStr: string, distanceStr: string): PaceResult | null {
  const h = timeHStr === "" ? 0 : parseInt(timeHStr);
  const m = timeMStr === "" ? 0 : parseInt(timeMStr);
  const s = timeSStr === "" ? 0 : parseInt(timeSStr);
  const dist = parseFloat(distanceStr);

  if (isNaN(h) || isNaN(m) || isNaN(s) || isNaN(dist)) return null;
  if (h < 0 || h > 24 || m < 0 || m >= 60 || s < 0 || s >= 60) return null;
  if (!(dist > 0 && dist <= 1000)) return null;

  const totalSeconds = h * 3600 + m * 60 + s;
  if (!(totalSeconds > 0 && totalSeconds <= 24 * 3600)) return null;

  const paceSecondsPerKm = totalSeconds / dist;
  const paceMinutes = Math.floor(paceSecondsPerKm / 60);
  const paceSeconds = Math.round(paceSecondsPerKm % 60);
  // Handle rounding edge case where seconds round to 60
  const finalMinutes = paceSeconds === 60 ? paceMinutes + 1 : paceMinutes;
  const finalSeconds = paceSeconds === 60 ? 0 : paceSeconds;

  return {
    pace: `${finalMinutes}:${finalSeconds.toString().padStart(2, '0')}`,
    paceSecondsPerKm,
  };
}

const PaceCalculator = () => {
  const [timeH, setTimeH] = useState("0");
  const [timeM, setTimeM] = useState("30");
  const [timeS, setTimeS] = useState("0");
  const [distance, setDistance] = useState("5");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PaceResult | null>(() => computePace("0", "30", "0", "5"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computePace(timeH, timeM, timeS, distance);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter time (0-24h, 0-59m, 0-59s, total > 0) and distance (0.1-1000 km).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Pace Calculated",
        description: `Your pace is ${computed.pace} per kilometer.`,
    });
  };

  const reset = () => {
    setTimeH(""); setTimeM(""); setTimeS(""); setDistance(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My running pace: ${result.pace} / km — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Running Pace Calculator"
      description="Calculate your running pace, time, or distance."
      canonicalUrl="/health-calculators/pace-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Time (hours, minutes, seconds)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Input type="number" value={timeH} onChange={(e) => setTimeH(e.target.value)} placeholder="hr" />
              <Input type="number" value={timeM} onChange={(e) => setTimeM(e.target.value)} placeholder="min" />
              <Input type="number" value={timeS} onChange={(e) => setTimeS(e.target.value)} placeholder="sec" />
            </div>
          </div>
          <div>
            <Label>Distance (kilometers)</Label>
            <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 10" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button" disabled={!distance}>Calculate Pace</Button>
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
                <p className="text-sm text-neutral-600">Your Pace</p>
                <p className="text-3xl font-bold text-primary">{result.pace} / km</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Pace Calculator is an essential tool for runners to calculate their pace, time, or distance. Whether you're training for a race, trying to improve your speed, or just planning your runs, this calculator helps you understand your performance and set achievable goals."
        useCases={[
            { title: "Race Planning", description: "Determine the pace you need to maintain to finish a race (like a 5k, 10k, or marathon) in a target time." },
            { title: "Training", description: "Analyze your workout data to see your pace on different runs and track your improvement over time." },
            { title: "Predicting Race Times", description: "Use your pace from a recent race to predict your potential finish time for a different distance." },
        ]}
        tips={[
            { title: "Be Consistent", description: "Pace can vary based on terrain, weather, and how you're feeling. Use your average pace over several runs for the most accurate predictions." },
            { title: "Warm-Up and Cool-Down", description: "Don't forget to include a warm-up before your run and a cool-down afterward to prevent injury." },
            { title: "Negative Splits", description: "For longer races, many runners aim for 'negative splits,' which means running the second half of the race slightly faster than the first half." },
        ]}
        faqs={[
            { question: "What is pace in running?", answer: "Pace is a measure of how fast you are running, usually expressed in minutes per mile or minutes per kilometer." },
            { question: "How can I improve my running pace?", answer: "You can improve your pace through consistent training that includes a mix of long slow runs, tempo runs (at a comfortably hard pace), and interval training (short bursts of high-intensity running)." },
            { question: "Is it better to run for time or distance?", answer: "Both are valuable. Running for time can be great for beginners or for recovery runs, while running for distance is essential when training for a specific race distance." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PaceCalculator;

    