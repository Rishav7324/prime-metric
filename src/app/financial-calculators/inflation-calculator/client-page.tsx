
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

type InflationResult = {
  futureValue: number;
  purchasingPower: number;
  totalInflation: number;
};

function computeInflation(amountStr: string, yearsStr: string, rateStr: string): InflationResult | null {
  const principal = parseFloat(amountStr);
  const y = parseInt(yearsStr);
  const ratePct = parseFloat(rateStr);

  if (!(principal > 0 && principal <= 1e12) || isNaN(y) || y < 0 || y > 100 || isNaN(ratePct) || ratePct < -20 || ratePct > 100) {
    return null;
  }

  const rate = ratePct / 100;
  const futureValue = principal * Math.pow(1 + rate, y);
  const purchasingPower = principal / Math.pow(1 + rate, y);
  const totalInflation = futureValue - principal;
  return { futureValue, purchasingPower, totalInflation };
}

const InflationCalculator = () => {
  const [amount, setAmount] = useState("1000");
  const [years, setYears] = useState("10");
  const [inflationRate, setInflationRate] = useState("3");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<InflationResult | null>(() => computeInflation("1000", "10", "3"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeInflation(amount, years, inflationRate);

    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter amount (1+), years (0-100), rate (-20 to 100%).",
      });
      return;
    }

    setResult(computed);
    toast({
      title: "Calculation Complete",
      description: `You will need ${currencySymbol}${fmt(computed.futureValue)} in ${years} years.`,
    });
  };

  const reset = () => { setAmount(""); setYears(""); setInflationRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Inflation: ${currencySymbol}${fmt(parseFloat(amount))} today at ${inflationRate}% for ${years} yrs → Need ${currencySymbol}${fmt(result.futureValue)}, purchasing power ${currencySymbol}${fmt(result.purchasingPower)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate the future value of money and the impact of inflation on purchasing power"
      canonicalUrl="/financial-calculators/inflation-calculator"
      formula="Future Value = Present Value × (1 + inflation rate)ⁿ"
      explanation="This calculator shows how inflation affects the value of money over time and what today's money will be worth in the future."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Current Amount ({currencySymbol})</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 1000"
            />
          </div>
          <div>
            <Label>Number of Years</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <Label>Assumed Annual Inflation Rate (%)</Label>
            <Input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              placeholder="e.g., 3"
              step="0.1"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Inflation Impact</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">To have the same purchasing power as {currencySymbol}{fmt(parseFloat(amount))} today, you will need:</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs shrink-0 ml-2">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {currencySymbol}{fmt(result.futureValue)}
                </p>
                  <p className="text-sm text-neutral-600">in {years} years.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-neutral-600">Future Purchasing Power</p>
                  <p className="text-xl font-bold">{currencySymbol}{fmt(result.purchasingPower)}</p>
                  <p className="text-xs text-neutral-600 mt-1">Today's {currencySymbol}{fmt(parseFloat(amount))} will be worth this much.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-neutral-600">Value Lost to Inflation</p>
                  <p className="text-xl font-bold text-red-600">{currencySymbol}{fmt(result.totalInflation)}</p>
                    <p className="text-xs text-neutral-600 mt-1">The increase in cost for the same value.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The inflation calculator demonstrates how inflation erodes purchasing power over time by showing what today's money will be worth in the future. Inflation is the rate at which the general level of prices for goods and services rises, decreasing the purchasing power of currency. Understanding inflation's impact is crucial for long-term financial planning, retirement savings, salary negotiations, and investment decisions. This calculator helps you quantify the real value of money across time periods and plan accordingly to maintain your standard of living."
        useCases={[
          { title: "Retirement Planning", description: "Calculate how much money you'll need in retirement to maintain current purchasing power. Account for decades of inflation when setting savings goals." },
          { title: "Salary Negotiations", description: "Determine real salary increases adjusted for inflation. A 3% raise during 3% inflation means no real income growth in purchasing power terms." },
          { title: "Investment Goals", description: "Set realistic investment return targets that beat inflation. Returns must exceed inflation to grow real wealth, not just nominal dollars." },
          { title: "Long-Term Budgeting", description: "Project future costs for education, healthcare, or major purchases accounting for price increases over time to budget accurately." }
        ]}
        tips={[
          { title: "Historical Inflation Rates", description: "U.S. inflation has averaged about 3% annually over the past century, but varies significantly by period. Recent decades saw 2-3%, while the 1970s experienced double-digit inflation." },
          { title: "Real vs Nominal Returns", description: "Investment returns should be viewed after inflation. If investments return 7% but inflation is 3%, your real return is approximately 4%. Focus on beating inflation." },
          { title: "Different Inflation Rates", description: "Healthcare and education often inflate faster than general inflation (5-7% annually), while technology prices may decrease. Consider specific category inflation for planning." },
          { title: "Compounding Effect", description: "Even modest inflation compounds significantly over time. 3% annual inflation halves purchasing power roughly every 24 years, making early planning essential." }
        ]}
        faqs={[
          { question: "What is a normal inflation rate?", answer: "Central banks typically target 2-3% annual inflation as healthy for economic growth. Rates above 5% are concerning, while sustained deflation (negative inflation) can harm economic activity. Historical U.S. average is about 3%." },
          { question: "How does inflation affect my savings?", answer: "Money in low-interest savings accounts loses purchasing power if the interest rate doesn't exceed inflation. With 3% inflation and 0.5% savings interest, you effectively lose 2.5% annually in real value." },
          { question: "Should I adjust my investments for inflation?", answer: "Yes. Your investment strategy should aim to beat inflation by several percentage points to grow real wealth. Stocks historically return 7-10% annually, comfortably beating inflation over long periods." },
          { question: "Why do prices sometimes go down?", answer: "Technology and efficiency improvements can decrease specific product prices even during overall inflation. Electronics, clothing, and some goods deflate while services like healthcare, education, and housing typically inflate faster than average." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default InflationCalculator;
