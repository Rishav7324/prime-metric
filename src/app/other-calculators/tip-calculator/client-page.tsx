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

const TipCalculator = () => {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("18");
  const [people, setPeople] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent) / 100;
    const numPeople = parseInt(people);

    if (isNaN(billAmount) || billAmount <= 0 || isNaN(tip) || tip < 0 || isNaN(numPeople) || numPeople <= 0) {
      toast({ title: "Error", description: "Please enter a valid bill amount, tip percentage, and number of people.", variant: "destructive" });
      return;
    }

    const tipAmount = billAmount * tip;
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numPeople;

    setResult({
      tipAmount: tipAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      perPerson: perPerson.toFixed(2),
    });
    
    toast({title: "Tip Calculated!", description: `The total per person is ${currencySymbol}${perPerson.toFixed(2)}.`});
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
          <Button onClick={calculate} className="w-full gradient-button">Calculate Tip</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Per Person</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{result.perPerson}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Tip</p>
                  <p className="text-lg font-bold">{currencySymbol}{result.tipAmount}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Bill</p>
                  <p className="text-lg font-bold">{currencySymbol}{result.totalAmount}</p>
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
