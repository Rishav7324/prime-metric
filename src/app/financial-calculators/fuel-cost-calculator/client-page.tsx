
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type FuelResult = {
  fuelNeeded: number;
  totalCost: number;
  costPerMile: number;
};

function computeFuel(distanceStr: string, mpgStr: string, priceStr: string): FuelResult | null {
  const dist = parseFloat(distanceStr);
  const milesPerGallon = parseFloat(mpgStr);
  const price = parseFloat(priceStr);

  if (!(dist > 0 && dist <= 1e7) || !(milesPerGallon > 0 && milesPerGallon <= 500) || !(price > 0 && price <= 1000)) {
    return null;
  }

  const fuelNeeded = dist / milesPerGallon;
  const totalCost = fuelNeeded * price;
  const costPerMile = totalCost / dist;
  return { fuelNeeded, totalCost, costPerMile };
}

const FuelCostCalculator = () => {
  const [distance, setDistance] = useState("300");
  const [mpg, setMpg] = useState("30");
  const [fuelPrice, setFuelPrice] = useState("3.50");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<FuelResult | null>(() => computeFuel("300", "30", "3.50"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeFuel(distance, mpg, fuelPrice);

    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter distance (1+ mi), efficiency (0-500 MPG), price (1+).",
      });
      return;
    }

    setResult(computed);

    toast({
      title: "Calculation Complete",
      description: `The total fuel cost for your trip is ${currencySymbol}${fmt(computed.totalCost)}.`,
    });
  };

  const reset = () => { setDistance(""); setMpg(""); setFuelPrice(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Fuel cost: ${distance} mi at ${mpg} MPG, ${currencySymbol}${fmt(parseFloat(fuelPrice))}/gal → Total ${currencySymbol}${fmt(result.totalCost)} (${fmt(result.fuelNeeded)} gal, ${currencySymbol}${fmt(result.costPerMile)}/mi). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Fuel Cost Calculator"
      description="Calculate total fuel costs for your trip"
      canonicalUrl="/financial-calculators/fuel-cost-calculator"
      formula="Cost = (Distance / MPG) × Fuel Price"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
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
            <Label>Fuel Price ({currencySymbol} per gallon)</Label>
            <Input
              type="number"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              placeholder="e.g., 3.50"
              step="0.01"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate Cost
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">Total Fuel Cost</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary">{currencySymbol}{fmt(result.totalCost)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Fuel Needed</p>
                  <p className="text-xl font-bold">{fmt(result.fuelNeeded)} gal</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Cost Per Mile</p>
                  <p className="text-xl font-bold">{currencySymbol}{fmt(result.costPerMile)}</p>
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
