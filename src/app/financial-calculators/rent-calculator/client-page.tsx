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
import { Copy, RotateCcw } from "lucide-react";

type RentResult = {
  affordableRent: number; monthlyIncome: number;
};

function computeRent(
  incomeStr: string,
  period: string,
  pctStr: string
): RentResult | null {
  const inc = parseFloat(incomeStr);
  const pct = parseFloat(pctStr);

  if (!(inc > 0 && inc <= 1e12)) return null;
  if (isNaN(pct) || pct <= 0 || pct > 100) return null;

  const monthlyIncome = period === "annually" ? inc / 12 : inc;
  return { affordableRent: monthlyIncome * (pct / 100), monthlyIncome };
}

const RentCalculator = () => {
  const [income, setIncome] = useState("5000");
  const [incomePeriod, setIncomePeriod] = useState("monthly");
  const [percentage, setPercentage] = useState("30");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<RentResult | null>(() => computeRent("5000", "monthly", "30"));
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeRent(income, incomePeriod, percentage);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter income (1+), percentage (1-100%).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Calculation Complete",
        description: `Your affordable monthly rent is ${currencySymbol}${fmt(computed.affordableRent)}.`,
    });
  };

  const reset = () => { setIncome(""); setPercentage(""); setIncomePeriod("monthly"); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Affordable rent: ${currencySymbol}${fmt(result.affordableRent)}/month (income ${currencySymbol}${fmt(result.monthlyIncome)}/month at ${percentage}%). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Affordable Rent</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Affordable Monthly Rent</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{fmt(result.affordableRent)}</p>
              </div>
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

    