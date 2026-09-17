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

type MileageResult = {
  mileage: number;
  display: string;
};

function computeMileage(distanceStr: string, fuelStr: string): MileageResult | null {
  const dist = parseFloat(distanceStr);
  const fuelUsed = parseFloat(fuelStr);
  if (!distanceStr || isNaN(dist) || !isFinite(dist) || dist <= 0 || dist > 1000000) return null;
  if (!fuelStr || isNaN(fuelUsed) || !isFinite(fuelUsed) || fuelUsed <= 0 || fuelUsed > 100000) return null;
  const mileage = dist / fuelUsed;
  if (!isFinite(mileage)) return null;
  return {
    mileage,
    display: `${mileage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per unit of fuel`,
  };
}

const MileageCalculator = () => {
  const [distance, setDistance] = useState("450");
  const [fuel, setFuel] = useState("30");
  const [result, setResult] = useState<MileageResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Realistic pre-filled defaults + instant result on mount (no toast on init)
    const computed = computeMileage("450", "30");
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const dist = parseFloat(distance);
    const fuelUsed = parseFloat(fuel);
    if (distance.trim() === "" || isNaN(dist) || !isFinite(dist)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid distance.",
      });
      return;
    }
    if (dist <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Distance must be greater than zero.",
      });
      return;
    }
    if (dist > 1000000) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Distance must be between 0 and 1,000,000.",
      });
      return;
    }
    if (fuel.trim() === "" || isNaN(fuelUsed) || !isFinite(fuelUsed)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid fuel consumed.",
      });
      return;
    }
    if (fuelUsed <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Fuel consumed must be greater than zero.",
      });
      return;
    }
    if (fuelUsed > 100000) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Fuel consumed must be between 0 and 100,000.",
      });
      return;
    }
    const computed = computeMileage(distance, fuel);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid, positive numbers for distance and fuel used.",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Mileage Calculated",
      description: `Your vehicle's mileage is ${computed.mileage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} km/L (or miles/gallon).`,
    });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `Mileage: ${result.mileage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per unit of fuel — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Fuel Mileage Calculator"
      description="Calculate your vehicle's fuel efficiency (e.g., MPG or km/L)."
      canonicalUrl="/other-calculators/mileage-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Distance Traveled (e.g., in km or miles)</Label>
            <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="e.g., 450" />
          </div>
          <div>
            <Label>Fuel Consumed (e.g., in liters or gallons)</Label>
            <Input type="number" value={fuel} onChange={(e) => setFuel(e.target.value)} placeholder="e.g., 30" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Mileage</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Your Vehicle's Mileage</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{result.display}</p>
               <p className="text-sm text-neutral-600">(e.g., km/L or miles/gallon)</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Mileage Calculator helps you determine your vehicle's fuel efficiency, commonly expressed as miles per gallon (MPG) or kilometers per liter (km/L). By tracking your mileage, you can monitor your vehicle's performance, estimate fuel costs, and identify potential maintenance issues."
        useCases={[
            { title: "Tracking Fuel Economy", description: "Monitor your car's performance over time to see if its fuel efficiency is changing." },
            { title: "Estimating Trip Costs", description: "Use your mileage to get a more accurate estimate of how much fuel you'll need for a road trip." },
            { title: "Identifying Maintenance Issues", description: "A sudden drop in mileage can be an early indicator of a problem with your vehicle, such as low tire pressure or an engine issue." },
        ]}
        tips={[
            { title: "Be Consistent", description: "For the most accurate calculation, fill your tank completely, reset your trip odometer, and then drive until the tank is nearly empty before filling it up again. Use the distance from your trip odometer and the amount of fuel you just added." },
            { title: "Units Matter", description: "Make sure your distance and fuel units match. If you measure distance in miles, use gallons for fuel to get MPG. If you use kilometers, use liters to get km/L." },
            { title: "Driving Habits", description: "Your driving style significantly impacts mileage. Aggressive driving (fast acceleration and hard braking) can lower your fuel efficiency by up to 30%." },
        ]}
        faqs={[
            { question: "What is a good mileage?", answer: "It depends heavily on the type of vehicle. For a modern gasoline car, anything over 30 MPG (about 12.75 km/L) is generally considered good. Hybrids and electric vehicles have much higher efficiency." },
            { question: "How can I improve my car's mileage?", answer: "Maintain proper tire pressure, remove unnecessary weight from your vehicle, avoid excessive idling, and practice smooth driving habits." },
            { question: "Does city driving or highway driving give better mileage?", answer: "Highway driving at a steady speed typically yields better fuel efficiency than city driving, which involves a lot of starting and stopping." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default MileageCalculator;
