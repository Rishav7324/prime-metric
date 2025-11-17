'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const PaceCalculator = () => {
  const [timeH, setTimeH] = useState("");
  const [timeM, setTimeM] = useState("");
  const [timeS, setTimeS] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const totalSeconds = (parseInt(timeH) || 0) * 3600 + (parseInt(timeM) || 0) * 60 + (parseInt(timeS) || 0);
    const dist = parseFloat(distance);

    if (totalSeconds <= 0 || isNaN(dist) || dist <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid time and distance.",
      });
      return;
    }

    const paceSecondsPerKm = totalSeconds / dist;
    const paceMinutes = Math.floor(paceSecondsPerKm / 60);
    const paceSeconds = Math.round(paceSecondsPerKm % 60);

    setResult({
      pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`,
    });

    toast({
        title: "Pace Calculated",
        description: `Your pace is ${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} per kilometer.`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">Calculate Pace</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Your Pace</p>
              <p className="text-3xl font-bold text-primary">{result.pace} / km</p>
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

    