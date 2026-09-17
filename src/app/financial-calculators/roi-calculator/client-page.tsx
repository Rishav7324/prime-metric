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

type RoiResult = {
  netProfit: number; roi: number;
};

function computeRoi(
  initialStr: string,
  finalStr: string
): RoiResult | null {
  const initial = parseFloat(initialStr);
  const final = parseFloat(finalStr);

  if (!(initial > 0 && initial <= 1e12)) return null;
  if (isNaN(final) || final < 0 || final > 1e15) return null;

  const netProfit = final - initial;
  return { netProfit, roi: (netProfit / initial) * 100 };
}

const RoiCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [finalValue, setFinalValue] = useState("15000");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<RoiResult | null>(() => computeRoi("10000", "15000"));
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const fmtPct = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeRoi(initialInvestment, finalValue);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter initial investment (1+) and final value (0+).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "ROI Calculated",
        description: `Your Return on Investment is ${fmtPct(computed.roi)}%.`,
    });
  };

  const reset = () => { setInitialInvestment(""); setFinalValue(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `ROI: ${fmtPct(result.roi)}% (net profit ${currencySymbol}${fmt(result.netProfit)} on ${currencySymbol}${fmt(parseFloat(initialInvestment))}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Return on Investment (ROI) Calculator"
      description="Calculate the profitability of an investment."
      canonicalUrl="/financial-calculators/roi-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Initial Investment ({currencySymbol})</Label>
            <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} placeholder="e.g., 1000" />
          </div>
          <div>
            <Label>Final Value of Investment ({currencySymbol})</Label>
            <Input type="number" value={finalValue} onChange={(e) => setFinalValue(e.target.value)} placeholder="e.g., 1500" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate ROI</Button>
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
                <p className="text-sm text-neutral-600">Return on Investment (ROI)</p>
                <p className="text-3xl font-bold text-primary">{fmtPct(result.roi)}%</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">Net Profit</p>
                <p className="text-lg font-bold">{currencySymbol}{fmt(result.netProfit)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Return on Investment (ROI) calculator measures the profitability of an investment as a percentage. It compares the net profit of an investment to its initial cost. ROI is a simple and powerful metric to evaluate the efficiency of an investment and compare the performance of different investments."
        useCases={[
            { title: "Evaluating Investments", description: "Compare the ROI of different investment opportunities like stocks, real estate, or starting a business." },
            { title: "Business Decisions", description: "Assess the potential return of a new project, marketing campaign, or equipment purchase." },
            { title: "Personal Finance", description: "Calculate the ROI on personal investments, such as a home renovation or educational course, to see if it was financially worthwhile." },
        ]}
        tips={[
            { title: "Include All Costs", description: "For an accurate ROI, your 'Initial Investment' should include all costs associated with the investment, such as fees, taxes, and maintenance." },
            { title: "Consider the Time Frame", description: "ROI doesn't inherently account for time. A 20% ROI over one year is much better than a 20% ROI over five years. For time-sensitive comparisons, consider using Annualized ROI." },
            { title: "Compare to a Benchmark", description: "Compare your investment's ROI to a benchmark, like the S&P 500's average return (typically 7-10%), to see if it was a good use of your money." },
        ]}
        faqs={[
            { question: "What is a good ROI?", answer: "A 'good' ROI is relative. It depends on the risk and time frame of the investment. A common benchmark is the average annual return of the S&P 500, which is around 10%. Anything above that is often considered good." },
            { question: "Can ROI be negative?", answer: "Yes. A negative ROI means you lost money on the investment; the final value was less than your initial investment." },
            { question: "What are the limitations of ROI?", answer: "ROI doesn't account for the time period of the investment, which can be misleading. It also doesn't consider risk. A high-ROI investment might have been very risky." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RoiCalculator;

    