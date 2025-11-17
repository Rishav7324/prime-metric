'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";

const RentCalculator = () => {
  const [income, setIncome] = useState("5000");
  const [incomePeriod, setIncomePeriod] = useState("monthly");
  const [percentage, setPercentage] = useState("30");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const inc = parseFloat(income);
    const pct = parseFloat(percentage) / 100;

    if (isNaN(inc) || inc <= 0 || isNaN(pct)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid income and percentage.",
      });
      return;
    }

    let monthlyIncome = inc;
    if (incomePeriod === 'annually') {
      monthlyIncome = inc / 12;
    }

    const affordableRent = monthlyIncome * pct;

    setResult({
      affordableRent: affordableRent.toFixed(2),
    });

    toast({
        title: "Calculation Complete",
        description: `Your affordable monthly rent is ${currencySymbol}${affordableRent.toFixed(2)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Rent Affordability Calculator"
      description="Determine how much rent you can afford based on your income."
      canonicalUrl="/financial-calculators/rent-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
             <div>
              <Label>Your Income ({currencySymbol})</Label>
              <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="e.g., 5000" />
            </div>
            <div>
              <Label>Income Period</Label>
              <Select value={incomePeriod} onValueChange={setIncomePeriod}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Percentage for Rent (%)</Label>
              <Input type="number" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="e.g., 30" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Affordable Rent</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Affordable Monthly Rent</p>
              <p className="text-3xl font-bold text-primary">{currencySymbol}{result.affordableRent}</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Rent Affordability Calculator helps you determine a reasonable monthly rent based on your income. It uses the common financial guideline that you should spend no more than a certain percentage of your income on housing costs, typically 30%."
        useCases={[
            { title: "Apartment Hunting", description: "Establish a realistic budget before you start looking for apartments to narrow your search." },
            { title: "Financial Planning", description: "Understand how much of your income will be allocated to housing, allowing you to budget for other expenses and savings." },
            { title: "Relocation", description: "Estimate affordable rent in a new city based on your expected salary." },
        ]}
        tips={[
            { title: "The 30% Rule", description: "The 30% rule is a popular guideline, but you can adjust the percentage based on your financial situation and priorities. In high-cost-of-living areas, you may need to allocate more." },
            { title: "Consider Other Costs", description: "Your total housing cost includes more than just rent. Factor in utilities, renter's insurance, parking, and potential HOA fees." },
            { title: "Gross vs. Net Income", description: "This calculator typically works best with your gross (pre-tax) income, as that's what many landlords use for qualification (often called the 40x rule, meaning your annual income should be 40 times the monthly rent)." },
        ]}
        faqs={[
            { question: "What is the 30% rule?", answer: "It's a financial guideline suggesting that you should spend no more than 30% of your gross monthly income on rent." },
            { question: "Do landlords have income requirements?", answer: "Yes, many landlords require that your annual gross income is at least 40 times the monthly rent. This is equivalent to spending 30% of your income on rent." },
            { question: "Should I use my gross or net income for this calculation?", answer: "You can use either, but be consistent. Using gross (pre-tax) income is more common for qualification purposes. Using net (after-tax) income gives you a more conservative and realistic picture of what you can comfortably afford." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RentCalculator;

    