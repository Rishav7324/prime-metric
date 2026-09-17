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

type SwpResult = { years: number | "Infinity"; months: number | "Infinity"; perpetual: boolean };

function computeSwp(initialStr: string, withdrawalStr: string, returnStr: string): SwpResult | null {
  const p = parseFloat(initialStr);
  const w = parseFloat(withdrawalStr);
  const annual = parseFloat(returnStr);
  if (!(p > 0 && p <= 1e12) || !(w > 0 && w <= 1e9) || isNaN(annual) || annual < -50 || annual > 100) {
    return null;
  }
  const r = annual / 100 / 12;
  if (r === 0) {
    const n = p / w;
    if (!isFinite(n) || n < 0) return null;
    return { years: Math.floor(n / 12), months: Math.floor(n % 12), perpetual: false };
  }
  if (r > 0 && p * r >= w) {
    return { years: "Infinity", months: "Infinity", perpetual: true };
  }
  if (w - p * r <= 0) return null;
  const n = Math.log(w / (w - p * r)) / Math.log(1 + r);
  if (!isFinite(n) || isNaN(n) || n < 0) return null;
  return { years: Math.floor(n / 12), months: Math.floor(n % 12), perpetual: false };
}

const SwpCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("500");
  const [returnRate, setReturnRate] = useState("7");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<SwpResult | null>(() => computeSwp("100000", "500", "7"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeSwp(initialInvestment, monthlyWithdrawal, returnRate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter investment (1+), withdrawal (1+), return (-50 to 100%).",
      });
      return;
    }

    setResult(computed);

    if (computed.perpetual) {
        toast({
            title: "Investment will not deplete",
            description: "Your withdrawals are less than or equal to your investment returns.",
        });
        return;
    }

    toast({
        title: "Calculation Complete",
        description: `Your investment will last for ${computed.years} years and ${computed.months} months.`,
    });
  };

  const reset = () => { setInitialInvestment(""); setMonthlyWithdrawal(""); setReturnRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const pNum = parseFloat(initialInvestment);
    const wNum = parseFloat(monthlyWithdrawal);
    const text = result.perpetual
      ? `SWP: ${currencySymbol}${fmt(isNaN(pNum) ? 0 : pNum)} with ${currencySymbol}${fmt(isNaN(wNum) ? 0 : wNum)}/month at ${returnRate}% lasts forever (withdrawals covered by returns). — via PrimeMetric`
      : `SWP: ${currencySymbol}${fmt(isNaN(pNum) ? 0 : pNum)} with ${currencySymbol}${fmt(isNaN(wNum) ? 0 : wNum)}/month at ${returnRate}% lasts ${result.years} years and ${result.months} months. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate SWP</Button>
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
                <p className="text-sm text-neutral-600">Your investment will last for</p>
                <p className="text-3xl font-bold text-primary">
                  {result.years === "Infinity" ? "an infinite time" : `${result.years} years and ${result.months} months`}
                </p>
              </div>
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
