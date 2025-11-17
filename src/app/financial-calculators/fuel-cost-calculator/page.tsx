'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const FuelCostCalculator = () => {
  const [distance, setDistance] = useState("");
  const [mpg, setMpg] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const dist = parseFloat(distance);
    const milesPerGallon = parseFloat(mpg);
    const price = parseFloat(fuelPrice);

    if (isNaN(dist) || isNaN(milesPerGallon) || isNaN(price) || dist <= 0 || milesPerGallon <= 0 || price <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid positive numbers for all fields.",
      });
      return;
    }
    
    const fuelNeeded = dist / milesPerGallon;
    const totalCost = fuelNeeded * price;
    const costPerMile = totalCost / dist;

    setResult({
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerMile: costPerMile.toFixed(3)
    });

    toast({
      title: "Calculation Complete",
      description: `The total fuel cost for your trip is $${totalCost.toFixed(2)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Fuel Cost Calculator"
      description="Calculate total fuel costs for your trip"
      keywords="fuel cost calculator, trip cost, gas calculator, mileage cost, fuel budget"
      canonicalUrl="/financial-calculators/fuel-cost-calculator"
      formula="Cost = (Distance / MPG) × Fuel Price"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Trip Distance (miles)</Label>
            <Input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="e.g., 300"
            />
          </div>
          <div>
            <Label>Vehicle Fuel Efficiency (MPG)</Label>
            <Input
              type="number"
              value={mpg}
              onChange={(e) => setMpg(e.target.value)}
              placeholder="e.g., 30"
              step="0.1"
            />
          </div>
          <div>
            <Label>Fuel Price ($ per gallon)</Label>
            <Input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="e.g., 3.50"
              step="0.01"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Cost
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Fuel Cost</p>
                <p className="text-4xl font-bold text-primary">${result.totalCost}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Fuel Needed</p>
                  <p className="text-xl font-bold">{result.fuelNeeded} gal</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Cost Per Mile</p>
                  <p className="text-xl font-bold">${result.costPerMile}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The fuel cost calculator helps you estimate the total cost of fuel for a trip based on distance, your vehicle's fuel efficiency (MPG), and current fuel prices. This essential planning tool allows you to budget accurately for road trips, compare vehicle operating costs, or evaluate whether a long drive is cost-effective compared to other transportation options. By calculating cost per mile, you can also assess the true operating cost of your vehicle and make informed decisions about commuting, travel, or vehicle purchases."
        useCases={[
          { title: "Road Trip Planning", description: "Budget accurately for vacations and long-distance travel. Estimate total fuel costs before departure to plan expenses and compare routes." },
          { title: "Commute Cost Analysis", description: "Calculate monthly or annual commuting costs to understand transportation expenses, evaluate job offers in different locations, or assess remote work savings." },
          { title: "Vehicle Comparison", description: "Compare operating costs between different vehicles when purchasing. Calculate long-term fuel savings of more efficient vehicles versus higher purchase prices." },
          { title: "Business Expense Tracking", description: "Estimate mileage reimbursement, track business travel costs, or calculate delivery expenses for accurate invoicing and tax deductions." }
        ]}
        tips={[
          { title: "Check Current Gas Prices", description: "Gas prices vary by location and change frequently. Use apps like GasBuddy to find current prices along your route for accurate estimates." },
          { title: "Know Your Actual MPG", description: "Your real-world MPG is often lower than EPA estimates, especially in city driving. Track actual fuel consumption over several fill-ups for accurate calculations." },
          { title: "Factor in Route Conditions", description: "Highway driving typically achieves better MPG than city driving. Mountain terrain, traffic, and weather conditions can significantly affect fuel efficiency and costs." },
          { title: "Compare Transportation Options", description: "Calculate whether driving is more economical than flying, trains, or buses for long trips by comparing total fuel costs plus wear-and-tear to alternative fares." }
        ]}
        faqs={[
          { question: "How do I find my vehicle's MPG?", answer: "Check your vehicle's dashboard display, owner's manual, or the EPA's fueleconomy.gov website. For accurate results, manually calculate by dividing miles driven by gallons used over several tanks." },
          { question: "Does driving speed affect fuel costs?", answer: "Yes, significantly. Fuel efficiency typically peaks around 50-60 mph and decreases at higher speeds due to increased air resistance. Driving 75 mph vs 65 mph can reduce fuel efficiency by 15-20%." },
          { question: "Should I include return trip costs?", answer: "Yes, double the distance if calculating round-trip costs. Don't forget to account for any significant elevation changes - climbing mountains uses more fuel than descending." },
          { question: "What about electric or hybrid vehicles?", answer: "For electric vehicles, use cost per kilowatt-hour and vehicle efficiency (miles per kWh) instead. Hybrid vehicles require calculating gas and electric portions separately for mixed driving." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default FuelCostCalculator;
