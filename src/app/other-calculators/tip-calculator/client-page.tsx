'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type TipResult = {
  tipAmount: number;
  totalAmount: number;
  perPerson: number;
};

function computeTip(billStr: string, tipPercentStr: string, peopleStr: string): TipResult | null {
  const billAmount = parseFloat(billStr);
  const tipRate = parseFloat(tipPercentStr) / 100;
  const numPeople = Number(peopleStr);
  if (isNaN(billAmount) || billAmount <= 0) return null;
  if (isNaN(tipRate) || tipRate < 0) return null;
  if (!Number.isFinite(numPeople) || !Number.isInteger(numPeople) || numPeople <= 0) return null;
  const tipAmount = billAmount * tipRate;
  const totalAmount = billAmount + tipAmount;
  const perPerson = totalAmount / numPeople;
  return { tipAmount, totalAmount, perPerson };
}

const formatMoney = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TipCalculator = () => {
  const [bill, setBill] = useState("55.25");
  const [tipPercent, setTipPercent] = useState("18");
  const [people, setPeople] = useState("2");
  const [currency, setCurrency] = useState("USD");
  // Auto-calculates on mount with default bill so result renders instantly
  const [result, setResult] = useState<TipResult | null>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  useEffect(() => {
    const computed = computeTip("55.25", "18", "2");
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent) / 100;
    const numPeople = Number(people);

    if (isNaN(billAmount) || billAmount <= 0) {
      toast({ title: "Invalid Input", description: "Please enter a bill amount greater than zero.", variant: "destructive" });
      return;
    }
    if (isNaN(tip) || tip < 0) {
      toast({ title: "Invalid Input", description: "Tip percentage must be zero or greater.", variant: "destructive" });
      return;
    }
    if (!Number.isFinite(numPeople) || !Number.isInteger(numPeople) || numPeople <= 0) {
      toast({ title: "Invalid Input", description: "Number of people must be a whole number of at least 1.", variant: "destructive" });
      return;
    }

    const computed = computeTip(bill, tipPercent, people);
    if (!computed) {
      toast({ title: "Invalid Input", description: "Please enter a valid bill amount, tip percentage, and number of people.", variant: "destructive" });
      return;
    }

    setResult(computed);
    
    toast({title: "Tip Calculated!", description: `The total per person is ${currencySymbol}${formatMoney(computed.perPerson)}.`});
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `Bill split: ${currencySymbol}${formatMoney(result.perPerson)} per person (${currencySymbol}${formatMoney(result.totalAmount)} total including ${currencySymbol}${formatMoney(result.tipAmount)} tip). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tips and split the bill with ease."
      canonicalUrl="/other-calculators/tip-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CurrencySelector value={currency} onChange={setCurrency} />
                 <div>
                    <Label>Bill Amount ({currencySymbol})</Label>
                    <Input type="number" value={bill} onChange={(e) => setBill(e.target.value)} placeholder="e.g., 55.25" />
                </div>
                 <div>
                    <Label>Tip Percentage (%)</Label>
                    <Input type="number" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} placeholder="e.g., 18" />
                </div>
                 <div>
                    <Label>Number of People</Label>
                    <Input type="number" value={people} onChange={(e) => setPeople(e.target.value)} placeholder="e.g., 2" />
                </div>
            </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Tip</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">Total Per Person</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{formatMoney(result.perPerson)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Tip</p>
                  <p className="text-lg font-bold">{currencySymbol}{formatMoney(result.tipAmount)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Bill</p>
                  <p className="text-lg font-bold">{currencySymbol}{formatMoney(result.totalAmount)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Tip Calculator helps you quickly calculate the gratuity for a service and split the total bill among a number of people. It's a handy tool for dining out, getting a haircut, or any situation where a tip is customary."
        useCases={[
            { title: "Dining Out", description: "Quickly calculate the tip for your server and split the bill when you're out with friends." },
            { title: "Services", description: "Figure out the appropriate tip for services like hairdressers, taxi drivers, or delivery people." },
            { title: "Group Expenses", description: "Easily divide any shared cost, not just restaurant bills, among a group of people." },
        ]}
        tips={[
            { title: "Standard Tipping", description: "In the U.S., a standard tip for good service at a restaurant is 15-20% of the pre-tax bill." },
            { title: "Tipping on a Budget", description: "If you're on a tight budget, it's still customary to tip at least 15% for good service. Consider this when choosing where to dine." },
            { title: "Check for Included Gratuity", description: "For large parties (usually 6 or more), many restaurants automatically add an 18-20% gratuity to the bill. Check your receipt before adding an extra tip." },
        ]}
        faqs={[
            { question: "Should I tip on the pre-tax or post-tax amount?", answer: "It is customary to calculate the tip based on the pre-tax total of the bill." },
            { question: "What is a standard tip percentage?", answer: "In the United States, 15% is considered a standard tip for average service, 18% for good service, and 20% or more for excellent service." },
            { question: "How do I tip for poor service?", answer: "If you received poor service, it's better to speak with a manager rather than leaving a very small or no tip. Servers often rely on tips for their income." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TipCalculator;
