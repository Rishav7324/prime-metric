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

type RetirementResult = {
  totalNestEgg: number;
};

function computeRetirement(
  ageStr: string,
  retAgeStr: string,
  savingsStr: string,
  monthlyStr: string,
  rateStr: string
): RetirementResult | null {
  const age = parseInt(ageStr);
  const retAge = parseInt(retAgeStr);
  const principal = parseFloat(savingsStr);
  const monthly = parseFloat(monthlyStr);
  const annual = parseFloat(rateStr);

  if (!(age >= 0 && age <= 100)) return null;
  if (!(retAge > age && retAge <= 100)) return null;
  if (isNaN(principal) || principal < 0 || principal > 1e12) return null;
  if (isNaN(monthly) || monthly < 0 || monthly > 1e9) return null;
  if (isNaN(annual) || annual < -50 || annual > 100) return null;
  if (principal === 0 && monthly === 0) return null;

  const years = retAge - age;
  if (!(years >= 1 && years <= 100)) return null;
  const rate = annual / 100 / 12;
  const n = years * 12;

  const principalFV = principal * Math.pow(1 + rate, n);
  const investmentFV = rate === 0 ? monthly * n : monthly * ((Math.pow(1 + rate, n) - 1) / rate);
  return { totalNestEgg: principalFV + investmentFV };
}

const RetirementCalculatorClient = () => {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [returnRate, setReturnRate] = useState("7");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<RetirementResult | null>(() => computeRetirement("30", "65", "50000", "500", "7"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeRetirement(currentAge, retirementAge, currentSavings, monthlyContribution, returnRate);
    if (!computed) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Enter ages (0-100, retirement > current), savings (0+), monthly (0+), return (-50 to 100%).",
        });
        return;
    }

    setResult(computed);

    toast({
        title: "Calculation Complete",
        description: `Your estimated retirement nest egg is ${currencySymbol}${fmt(computed.totalNestEgg)}`,
    });
  };

  const reset = () => { setCurrentAge(""); setRetirementAge(""); setCurrentSavings(""); setMonthlyContribution(""); setReturnRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Retirement nest egg: ${currencySymbol}${fmt(result.totalNestEgg)} (age ${currentAge} to ${retirementAge}, ${currencySymbol}${monthlyContribution}/month at ${returnRate}%). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan your retirement and see if you are on track to meet your goals"
      canonicalUrl="/financial-calculators/retirement-calculator"
      formula="FV = PV(1+r)ⁿ + PMT × [((1+r)ⁿ - 1) / r]"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Age</Label>
              <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="e.g., 30" />
            </div>
            <div>
              <Label>Retirement Age</Label>
              <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="e.g., 65" />
            </div>
          </div>
          <div>
            <Label>Current Retirement Savings ({currencySymbol})</Label>
            <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="e.g., 50000" />
          </div>
          <div>
            <Label>Monthly Contribution ({currencySymbol})</Label>
            <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 500" />
          </div>
          <div>
            <Label>Expected Annual Return (%)</Label>
            <Input type="number" step="0.1" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 7" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Retirement Savings</Button>
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
                  <p className="text-sm text-neutral-600">Estimated Nest Egg at Retirement</p>
                  <p className="text-2xl font-bold text-primary">{currencySymbol}{fmt(result.totalNestEgg)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Retirement Calculator helps you project your total savings by the time you retire, based on your current age, savings, contributions, and expected investment returns. It provides a vital snapshot of your financial future, helping you determine if you are on track to meet your retirement goals."
        useCases={[
            { title: "Retirement Goal Setting", description: "Estimate your future nest egg to see if it aligns with your desired retirement lifestyle." },
            { title: "Contribution Planning", description: "Understand how increasing your monthly contributions can significantly impact your final retirement savings." },
            { title: "Assessing Your Progress", description: "Regularly check if you are on track to meet your retirement goals and make adjustments as needed." },
        ]}
        tips={[
            { title: "Start Early", description: "The sooner you start saving for retirement, the more time your money has to grow through compounding." },
            { title: "Be Consistent", description: "Make regular, automatic contributions to your retirement accounts to build a strong savings habit." },
            { title: "Invest Wisely", description: "Choose a diversified investment portfolio that matches your risk tolerance and time horizon. Rebalance periodically." },
            { title: "Maximize Employer Match", description: "If your employer offers a 401(k) match, contribute at least enough to get the full match – it\'s free money." },
        ]}
        faqs={[
            { question: "How much do I need to retire?", answer: "A common guideline is the 4% rule, which suggests you can safely withdraw 4% of your retirement savings each year. So, if you need $40,000 per year, you would need a $1 million nest egg." },
            { question: "What is a good rate of return?", answer: "Historically, the stock market has returned an average of 7-10% per year. A diversified portfolio might aim for a 6-8% return, but this depends on your risk tolerance." },
            { question: "Does this account for inflation?", answer: "No, this calculator shows the future value in today\'s dollars. To account for inflation, you can use a lower 'real' rate of return (e.g., if you expect 7% returns and 3% inflation, use a 4% rate of return)." },
            { question: "What about taxes?", answer: "This calculator does not account for taxes. The final amount you can spend in retirement will depend on the type of accounts you have (like a traditional or Roth 401(k)/IRA)." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RetirementCalculatorClient;
