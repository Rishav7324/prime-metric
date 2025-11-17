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

const RoiCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (isNaN(initial) || initial === 0 || isNaN(final)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for both fields. Initial investment cannot be zero.",
      });
      return;
    }

    const netProfit = final - initial;
    const roi = (netProfit / initial) * 100;

    setResult({
      netProfit: netProfit.toFixed(2),
      roi: roi.toFixed(2),
    });

    toast({
        title: "ROI Calculated",
        description: `Your Return on Investment is ${roi.toFixed(2)}%.`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">Calculate ROI</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Return on Investment (ROI)</p>
                <p className="text-3xl font-bold text-primary">{result.roi}%</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-lg font-bold">{currencySymbol}{result.netProfit}</p>
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

    