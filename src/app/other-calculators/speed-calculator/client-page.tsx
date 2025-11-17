'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const SpeedCalculator = () => {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [speed, setSpeed] = useState("");
  const { toast } = useToast();

  const calculate = () => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    const s = parseFloat(speed);

    if (!isNaN(d) && !isNaN(t) && t > 0) {
      setSpeed((d / t).toFixed(2));
      toast({title: "Success", description: "Speed calculated."});
    } else if (!isNaN(d) && !isNaN(s) && s > 0) {
      setTime((d / s).toFixed(2));
      toast({title: "Success", description: "Time calculated."});
    } else if (!isNaN(t) && !isNaN(s)) {
      setDistance((s * t).toFixed(2));
      toast({title: "Success", description: "Distance calculated."});
    } else {
      toast({title: "Error", description: "Please provide any two of the three values.", variant: "destructive"});
    }
  };
  
  const clear = () => {
    setDistance("");
    setTime("");
    setSpeed("");
  }

  return (
    <CalculatorLayout
      title="Speed, Distance, Time Calculator"
      description="Calculate one value when you know the other two."
      canonicalUrl="/other-calculators/speed-calculator"
      formula="Speed = Distance / Time"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter any two values to calculate the third.</p>
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
            <Button onClick={clear} variant="outline" className="flex-1">Clear</Button>
          </div>
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

    