
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

type HouseResult = {
  maxPrice: number;
  maxLoan: number;
  monthlyPayment: number;
};

function computeHouse(incomeStr: string, debtStr: string, downStr: string, rateStr: string): HouseResult | null {
  const monthlyIncome = parseFloat(incomeStr);
  const monthlyDebt = parseFloat(debtStr || "0");
  const down = parseFloat(downStr);
  const ratePct = parseFloat(rateStr);

  if (!(monthlyIncome > 0 && monthlyIncome <= 1e9) || isNaN(monthlyDebt) || monthlyDebt < 0 || monthlyDebt > 1e9 || isNaN(down) || down < 0 || down > 1e12 || isNaN(ratePct) || ratePct <= 0 || ratePct > 25) {
    return null;
  }

  const interestRate = ratePct / 100 / 12;
  // Using the 28/36 rule. Housing costs should not exceed 28% of gross monthly income.
  const maxPayment = monthlyIncome * 0.28 - monthlyDebt;
  if (maxPayment <= 0) {
    return null;
  }

  const loanTerm = 30 * 12; // 30-year mortgage
  const maxLoan = maxPayment * ((Math.pow(1 + interestRate, loanTerm) - 1) / (interestRate * Math.pow(1 + interestRate, loanTerm)));
  const maxPrice = maxLoan + down;
  return { maxPrice, maxLoan, monthlyPayment: maxPayment };
}

const HouseAffordabilityCalculator = () => {
  const [income, setIncome] = useState("8000");
  const [debt, setDebt] = useState("500");
  const [downPayment, setDownPayment] = useState("50000");
  const [rate, setRate] = useState("6.5");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<HouseResult | null>(() => computeHouse("8000", "500", "50000", "6.5"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmtInt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeHouse(income, debt, downPayment, rate);

    if (!computed) {
      const monthlyIncome = parseFloat(income);
      const monthlyDebt = parseFloat(debt || "0");
      if (!isNaN(monthlyIncome) && !isNaN(monthlyDebt) && monthlyIncome > 0 && monthlyIncome * 0.28 - monthlyDebt <= 0) {
        toast({
            variant: "destructive",
            title: "High Debt",
            description: "Your monthly debt is too high to afford a mortgage payment based on the 28% rule.",
        });
        setResult(null);
        return;
      }
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter income (1+), debt (0+), down payment (0+), rate (0-25%).",
      });
      return;
    }

    setResult(computed);

    toast({
      title: "Calculation Complete",
      description: `You can afford a home up to ${currencySymbol}${fmtInt(computed.maxPrice)}.`,
    });
  };

  const reset = () => { setIncome(""); setDebt(""); setDownPayment(""); setRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `House affordability: up to ${currencySymbol}${fmtInt(result.maxPrice)} (loan ${currencySymbol}${fmtInt(result.maxLoan)}, ${currencySymbol}${fmt(result.monthlyPayment)}/mo). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="House Affordability Calculator"
      description="Estimate the home price you can afford based on your income and debts"
      canonicalUrl="/financial-calculators/house-affordability-calculator"
      formula="Based on the 28/36 rule for debt-to-income ratios"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Gross Monthly Income ({currencySymbol})</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g., 6000"
            />
          </div>
          <div>
            <Label>Total Monthly Debt Payments ({currencySymbol})</Label>
            <Input
              type="number"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              placeholder="e.g., 500 (car, student loan)"
            />
          </div>
          <div>
            <Label>Down Payment ({currencySymbol})</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 50000"
            />
          </div>
          <div>
            <Label>Estimated Mortgage Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 6.5"
              step="0.01"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate Affordability
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">You Can Afford a Home Up To</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary">{currencySymbol}{fmtInt(result.maxPrice)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Max Loan Amount</p>
                  <p className="text-xl font-bold">{currencySymbol}{fmtInt(result.maxLoan)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Est. Monthly Payment</p>
                  <p className="text-xl font-bold">{currencySymbol}{fmt(result.monthlyPayment)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The House Affordability Calculator helps you estimate the maximum home price you can likely afford based on your income, monthly debts, down payment, and expected interest rate. It uses the common 28/36 rule to determine a reasonable mortgage payment, giving you a strong starting point for your home search."
        useCases={[
            { title: "First-Time Home Buyers", description: "Get a realistic idea of your budget before you start looking at properties." },
            { title: "Budget Planning", description: "Understand how your income, debts, and down payment affect your home-buying power." },
            { title: "Mortgage Pre-Qualification", description: "Prepare for discussions with lenders by knowing what you can realistically borrow." },
        ]}
        tips={[
            { title: "Improve Your DTI Ratio", description: "Paying down other debts (like car loans or credit cards) can increase the amount you can afford for a mortgage payment." },
            { title: "Factor in Other Costs", description: "Remember that your monthly housing cost will also include property taxes, homeowners insurance, and potentially PMI, which are not included in this basic calculation." },
            { title: "Save for a Larger Down Payment", description: "A larger down payment reduces your loan amount, lowers your monthly payment, and can help you avoid Private Mortgage Insurance (PMI)." },
        ]}
        faqs={[
            { question: "What is the 28/36 rule?", answer: "It's a guideline used by lenders. It suggests that your monthly housing costs (mortgage, taxes, insurance) shouldn't exceed 28% of your gross monthly income, and your total debt payments shouldn't exceed 36%." },
            { question: "Does this calculator include taxes and insurance?", answer: "No, this is a simplified calculator. Your actual monthly payment will be higher once you add property taxes and homeowners insurance (often called PITI - Principal, Interest, Taxes, and Insurance)." },
            { question: "How does my credit score affect affordability?", answer: "A higher credit score will help you qualify for a lower interest rate, which in turn increases the total loan amount you can afford for the same monthly payment." },
            { question: "What is a down payment?", answer: "A down payment is the initial, upfront portion of the total cost of the home that you pay in cash. It is not part of the mortgage loan." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default HouseAffordabilityCalculator;
