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

type SavingsResult = { futureValue: number; totalInvested: number; totalInterest: number };

function computeSavings(initialStr: string, monthlyStr: string, yearsStr: string, rateStr: string): SavingsResult | null {
  const principal = parseFloat(initialStr);
  const monthly = parseFloat(monthlyStr);
  const numYears = parseInt(yearsStr);
  const annual = parseFloat(rateStr);
  if (!(principal >= 0 && principal <= 1e12) || !(monthly >= 0 && monthly <= 1e9) || !(numYears >= 1 && numYears <= 50) || isNaN(annual) || annual < -50 || annual > 100) {
    return null;
  }
  const rate = annual / 100 / 12;
  const n = numYears * 12;
  let futureValue: number;
  if (rate === 0) {
    futureValue = principal + monthly * n;
  } else {
    futureValue = principal * Math.pow(1 + rate, n) + monthly * ((Math.pow(1 + rate, n) - 1) / rate);
  }
  const totalInvested = principal + monthly * n;
  const totalInterest = futureValue - totalInvested;
  return { futureValue, totalInvested, totalInterest };
}

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [years, setYears] = useState("10");
  const [interestRate, setInterestRate] = useState("5");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<SavingsResult | null>(() => computeSavings("1000", "200", "10", "5"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeSavings(initialDeposit, monthlyContribution, years, interestRate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter deposit (0+), monthly (0+), years (1-50), rate (-50 to 100%).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Calculation Complete",
        description: `Your savings will grow to ${currencySymbol}${fmt(computed.futureValue)}.`,
    });
  };

  const reset = () => { setInitialDeposit(""); setMonthlyContribution(""); setYears(""); setInterestRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Savings: future value ${currencySymbol}${fmt(result.futureValue)} (invested ${currencySymbol}${fmt(result.totalInvested)}, interest ${currencySymbol}${fmt(result.totalInterest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="See how your savings can grow over time with compound interest."
      canonicalUrl="/financial-calculators/savings-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <CurrencySelector value={currency} onChange={setCurrency} />
             <div>
                <Label>Initial Deposit ({currencySymbol})</Label>
                <Input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} placeholder="e.g., 1000" />
            </div>
             <div>
                <Label>Monthly Contribution ({currencySymbol})</Label>
                <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 200" />
            </div>
             <div>
                <Label>Investment Period (Years)</Label>
                <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 10" />
            </div>
             <div className="col-span-1 md:col-span-2">
                <Label>Expected Annual Interest Rate (%)</Label>
                <Input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 5" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Savings</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Future Value of Savings</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{fmt(result.futureValue)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Invested</p>
                  <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalInvested)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Interest Earned</p>
                  <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalInterest)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Savings Calculator helps you project the future value of your savings based on an initial deposit, regular monthly contributions, and an expected annual interest rate. It's a powerful tool to visualize the impact of compound interest and consistent saving habits."
        useCases={[
            { title: "Setting Savings Goals", description: "Determine how much you need to save monthly to reach a specific financial goal, like a down payment on a house or a new car." },
            { title: "Retirement Planning", description: "Get a rough estimate of how your retirement savings will grow over time." },
            { title: "Comparing Accounts", description: "See how different interest rates on savings accounts or investment vehicles can affect your future savings." },
        ]}
        tips={[
            { title: "Start Early", description: "The earlier you start saving, the more time compound interest has to work its magic. Even small amounts can grow significantly over a long period." },
            { title: "Be Consistent", description: "Making regular, automatic contributions is a powerful way to build your savings without having to think about it." },
            { title: "Realistic Interest Rates", description: "Use a realistic interest rate for your projections. High-yield savings accounts might offer 4-5%, while a diversified investment portfolio might average 7-10% over the long term." },
        ]}
        faqs={[
            { question: "What is compound interest?", answer: "Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods. It's often called 'interest on your interest'." },
            { question: "How does this differ from a simple interest calculator?", answer: "This calculator assumes interest is compounded, which is how most savings and investment accounts work. A simple interest calculator only calculates interest on the initial principal amount." },
            { question: "Does this calculator account for taxes or inflation?", answer: "No, this is a simplified savings calculator. The real return on your savings will be lower after accounting for taxes on the interest earned and the effects of inflation." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SavingsCalculator;

    