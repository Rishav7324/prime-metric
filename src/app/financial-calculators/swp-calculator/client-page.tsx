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

const SwpCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("500");
  const [returnRate, setReturnRate] = useState("7");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const p = parseFloat(initialInvestment);
    const w = parseFloat(monthlyWithdrawal);
    const r = parseFloat(returnRate) / 100 / 12;

    if (isNaN(p) || p <= 0 || isNaN(w) || w <= 0 || isNaN(r)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid, positive numbers for all fields.",
      });
      return;
    }

    if (p * r >= w) {
        setResult({
          years: "Infinity",
          months: "Infinity",
          finalValue: "Grows forever"
        });
        toast({
            title: "Investment will not deplete",
            description: "Your withdrawals are less than or equal to your investment returns.",
        });
        return;
    }

    const n = Math.log(w / (w - p * r)) / Math.log(1 + r);
    const years = Math.floor(n / 12);
    const months = Math.floor(n % 12);

    setResult({
      years: years,
      months: months,
      finalValue: `Your investment will last for ${years} years and ${months} months.`
    });

    toast({
        title: "Calculation Complete",
        description: `Your investment will last for ${years} years and ${months} months.`,
    });
  };

  return (
    <CalculatorLayout
      title="SWP (Systematic Withdrawal Plan) Calculator"
      description="Estimate how long your investments will last with regular withdrawals."
      canonicalUrl="/financial-calculators/swp-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Total Investment ({currencySymbol})</Label>
              <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} placeholder="e.g., 100000" />
            </div>
            <div>
              <Label>Monthly Withdrawal ({currencySymbol})</Label>
              <Input type="number" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(e.target.value)} placeholder="e.g., 500" />
            </div>
            <div>
              <Label>Expected Annual Return Rate (%)</Label>
              <Input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 7" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate SWP</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Your investment will last for</p>
              <p className="text-3xl font-bold text-primary">
                {result.years === "Infinity" ? "an infinite time" : `${result.years} years and ${result.months} months`}
              </p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount from your investments at regular intervals. This calculator helps you estimate how long your investment corpus will last based on your withdrawal amount and expected returns."
        useCases={[
            { title: "Retirement Income Planning", description: "Determine a sustainable monthly withdrawal amount from your retirement fund." },
            { title: "Financial Independence", description: "See how long your investments can support you if you decide to stop working." },
            { title: "Comparing Scenarios", description: "Analyze how different withdrawal amounts or investment returns affect the longevity of your funds." },
        ]}
        tips={[
            { title: "The 4% Rule", description: "A common retirement guideline is to withdraw 4% of your initial portfolio value each year, adjusted for inflation. This calculator can help you test that rule." },
            { title: "Be Conservative", description: "It's often wise to use a conservative expected rate of return to ensure your funds last, even in down markets." },
            { title: "Impact of Inflation", description: "This calculator does not account for inflation. In reality, you may need to increase your withdrawals over time to maintain your purchasing power." },
        ]}
        faqs={[
            { question: "What is an SWP?", answer: "A Systematic Withdrawal Plan (SWP) is a facility that allows an investor to withdraw a fixed amount of money from a mutual fund scheme at regular intervals." },
            { question: "What is a safe withdrawal rate?", answer: "A safe withdrawal rate is the percentage of your portfolio that you can withdraw each year without running out of money. Historically, a rate of 4% has been considered safe for a 30-year retirement, but this can vary." },
            { question: "What happens if my withdrawals are less than my returns?", answer: "If your monthly withdrawal amount is less than the monthly interest or returns your investment generates, your corpus will never deplete. In fact, it will continue to grow over time." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SwpCalculator;
