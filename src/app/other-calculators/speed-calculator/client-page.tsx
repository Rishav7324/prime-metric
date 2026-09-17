'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type SpeedResult = {
  distance: number;
  time: number;
  speed: number;
  computed: "speed" | "time" | "distance";
};

function computeSpeed(distanceStr: string, timeStr: string, speedStr: string): SpeedResult | null {
  const d = distanceStr.trim() === "" ? NaN : parseFloat(distanceStr);
  const t = timeStr.trim() === "" ? NaN : parseFloat(timeStr);
  const s = speedStr.trim() === "" ? NaN : parseFloat(speedStr);
  const dValid = isFinite(d) && d >= 0 && d <= 1000000000;
  const tValid = isFinite(t) && t > 0 && t <= 1000000000;
  const sValid = isFinite(s) && s > 0 && s <= 1000000000;
  // Prefer computing speed when distance + time are present
  if (dValid && tValid) {
    const speed = d / t;
    if (!isFinite(speed)) return null;
    return { distance: d, time: t, speed, computed: "speed" };
  }
  if (dValid && sValid) {
    const time = d / s;
    if (!isFinite(time)) return null;
    return { distance: d, time, speed: s, computed: "time" };
  }
  // For distance we allow time/speed >= 0 (distance can be 0)
  const tForDist = timeStr.trim() === "" ? NaN : parseFloat(timeStr);
  const sForDist = speedStr.trim() === "" ? NaN : parseFloat(speedStr);
  if (isFinite(tForDist) && isFinite(sForDist) && tForDist >= 0 && sForDist >= 0 && tForDist <= 1000000000 && sForDist <= 1000000000) {
    const distance = sForDist * tForDist;
    if (!isFinite(distance)) return null;
    return { distance, time: tForDist, speed: sForDist, computed: "distance" };
  }
  return null;
}

const SpeedCalculator = () => {
  const [distance, setDistance] = useState("100");
  const [time, setTime] = useState("2");
  const [speed, setSpeed] = useState("");
  const [result, setResult] = useState<SpeedResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Realistic pre-filled defaults + instant result on mount (no toast on init)
    const computed = computeSpeed("100", "2", "");
    if (computed) {
      setResult(computed);
      setSpeed(computed.speed.toFixed(2));
    }
  }, []);

  const calculate = () => {
    const dProvided = distance.trim() !== "";
    const tProvided = time.trim() !== "";
    const sProvided = speed.trim() !== "";
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const s = parseFloat(speed);
    const providedCount = [dProvided && isFinite(d), tProvided && isFinite(t), sProvided && isFinite(s)].filter(Boolean).length;
    if (providedCount < 2) {
      toast({ title: "Invalid Input", description: "Please provide any two of the three values.", variant: "destructive" });
      return;
    }
    if (dProvided) {
      if (isNaN(d) || !isFinite(d) || d < 0 || d > 1000000000) {
        toast({ title: "Invalid Input", description: "Distance must be between 0 and 1,000,000,000.", variant: "destructive" });
        return;
      }
    }
    if (tProvided) {
      if (isNaN(t) || !isFinite(t)) {
        toast({ title: "Invalid Input", description: "Please enter a valid time.", variant: "destructive" });
        return;
      }
      // Time must be positive when used as divisor or result; allow 0 only when computing distance
      const computingDistance = !dProvided && tProvided && sProvided;
      if (!computingDistance && t <= 0) {
        toast({ title: "Invalid Input", description: "Time must be greater than zero.", variant: "destructive" });
        return;
      }
      if (t < 0 || t > 1000000000) {
        toast({ title: "Invalid Input", description: "Time must be between 0 and 1,000,000,000.", variant: "destructive" });
        return;
      }
    }
    if (sProvided) {
      if (isNaN(s) || !isFinite(s)) {
        toast({ title: "Invalid Input", description: "Please enter a valid speed.", variant: "destructive" });
        return;
      }
      const computingDistance = !dProvided && tProvided && sProvided;
      if (!computingDistance && s <= 0) {
        toast({ title: "Invalid Input", description: "Speed must be greater than zero.", variant: "destructive" });
        return;
      }
      if (s < 0 || s > 1000000000) {
        toast({ title: "Invalid Input", description: "Speed must be between 0 and 1,000,000,000.", variant: "destructive" });
        return;
      }
    }
    const computed = computeSpeed(distance, time, speed);
    if (!computed) {
      toast({ title: "Invalid Input", description: "Please provide any two valid positive values.", variant: "destructive" });
      return;
    }
    setResult(computed);
    if (computed.computed === "speed") {
      setSpeed(computed.speed.toFixed(2));
      toast({ title: "Success", description: `Speed calculated: ${computed.speed.toLocaleString(undefined, { maximumFractionDigits: 2 })}.` });
    } else if (computed.computed === "time") {
      setTime(computed.time.toFixed(2));
      toast({ title: "Success", description: `Time calculated: ${computed.time.toLocaleString(undefined, { maximumFractionDigits: 2 })}.` });
    } else {
      setDistance(computed.distance.toFixed(2));
      toast({ title: "Success", description: `Distance calculated: ${computed.distance.toLocaleString(undefined, { maximumFractionDigits: 2 })}.` });
    }
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `Distance: ${result.distance.toLocaleString()}, Time: ${result.time.toLocaleString()}, Speed: ${result.speed.toLocaleString(undefined, { maximumFractionDigits: 2 })} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Speed, Distance, Time Calculator"
      description="Calculate one value when you know the other two."
      canonicalUrl="/other-calculators/speed-calculator"
      formula="Speed = Distance / Time"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">Enter any two values to calculate the third.</p>
          <div>
            <Label>Distance (e.g., km, miles)</Label>
            <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="Enter distance" />
          </div>
          <div>
            <Label>Time (e.g., hours, minutes)</Label>
            <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Enter time" />
          </div>
          <div>
            <Label>Speed (e.g., km/h, mph)</Label>
            <Input type="number" value={speed} onChange={(e) => setSpeed(e.target.value)} placeholder="Enter speed" />
          </div>
           <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">
                  {result.computed === "speed" ? "Calculated Speed" : result.computed === "time" ? "Calculated Time" : "Calculated Distance"}
                </p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">
                {result.computed === "speed"
                  ? result.speed.toLocaleString(undefined, { maximumFractionDigits: 2 })
                  : result.computed === "time"
                    ? result.time.toLocaleString(undefined, { maximumFractionDigits: 2 })
                    : result.distance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Speed, Distance, Time Calculator is a fundamental tool based on the formula Speed = Distance / Time. It allows you to solve for any one of these three variables, as long as you know the other two. It's widely used in physics, travel planning, and athletics."
        useCases={[
            { title: "Travel Planning", description: "Estimate your travel time for a road trip based on your average speed and the distance to your destination." },
            { title: "Running and Cycling", description: "Calculate your average speed on a run or bike ride, or determine how long it will take you to cover a certain distance at your target pace." },
            { title: "Physics Problems", description: "Solve for speed, distance, or time in introductory physics homework and experiments." },
        ]}
        tips={[
            { title: "Keep Units Consistent", description: "Make sure your units match. If your distance is in kilometers and your time is in hours, your speed will be in kilometers per hour (km/h)." },
            { title: "Average Speed", description: "In most real-world scenarios, you are calculating 'average speed,' as your instantaneous speed will vary." },
            { title: "Converting Units", description: "Remember common conversions: 1 mile is approximately 1.609 kilometers. 1 hour is 60 minutes." },
        ]}
        faqs={[
            { question: "What is the formula for speed?", answer: "Speed = Distance ÷ Time." },
            { question: "How do I calculate time if I know speed and distance?", answer: "Time = Distance ÷ Speed." },
            { question: "How do I calculate distance if I know speed and time?", answer: "Distance = Speed × Time." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SpeedCalculator;
