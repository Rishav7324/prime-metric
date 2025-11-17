'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const MileageCalculator = () => {
  const [distance, setDistance] = useState("");
  const [fuel, setFuel] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const dist = parseFloat(distance);
    const fuelUsed = parseFloat(fuel);
    if (isNaN(dist) || dist <= 0 || isNaN(fuelUsed) || fuelUsed <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid, positive numbers for distance and fuel used.",
      });
      return;
    }
    const mileage = dist / fuelUsed;
    setResult({ mileage: mileage.toFixed(2) });
    toast({
        title: "Mileage Calculated",
        description: `Your vehicle's mileage is ${mileage.toFixed(2)} km/L (or miles/gallon).`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">Calculate Mileage</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Your Vehicle's Mileage</p>
              <p className="text-3xl font-bold text-primary">{result.mileage} per unit of fuel</p>
               <p className="text-sm text-muted-foreground">(e.g., km/L or miles/gallon)</p>
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

    