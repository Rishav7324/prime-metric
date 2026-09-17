
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

function computeFinance(calcType: string, valueStr: string, rateStr: string, periodsStr: string): number | null {
  const pv = parseFloat(valueStr);
  const rPct = parseFloat(rateStr);
  const n = parseFloat(periodsStr);

  if (!(pv > 0 && pv <= 1e12) || isNaN(rPct) || rPct < 0 || rPct > 100 || !(n > 0 && n <= 100)) {
    return null;
  }

  const r = rPct / 100;
  if (calcType === "future-value") {
    return pv * Math.pow(1 + r, n);
  }
  return pv / Math.pow(1 + r, n);
}

const FinanceCalculator = () => {
  const [calcType, setCalcType] = useState("future-value");
  const [presentValue, setPresentValue] = useState("10000");
  const [rate, setRate] = useState("5");
  const [periods, setPeriods] = useState("10");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<number | null>(() => computeFinance("future-value", "10000", "5", "10"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeFinance(calcType, presentValue, rate, periods);

    if (computed === null) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter value (1+), rate (0-100%), periods (1-100).",
      });
      return;
    }

    setResult(computed);
    toast({
        title: "Calculation Complete",
        description: `The ${calcType === "future-value" ? "Future Value" : "Present Value"} is ${currencySymbol}${fmt(computed)}.`,
    });
  };

  const reset = () => { setPresentValue(""); setRate(""); setPeriods(""); setResult(null); };

  const copyResult = async () => {
    if (result === null) return;
    const label = calcType === "future-value" ? "Future Value" : "Present Value";
    const text = `${label}: ${currencySymbol}${fmt(result)} (from ${currencySymbol}${fmt(parseFloat(presentValue))} at ${rate}% for ${periods} periods). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Finance Calculator"
      description="Calculate Future Value and Present Value of money"
      canonicalUrl="/financial-calculators/finance-calculator"
      formula={calcType === "future-value" ? "FV = PV × (1 + r)^n" : "PV = FV / (1 + r)^n"}
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Calculation Type</Label>
            <Select value={calcType} onValueChange={(value) => {
              setCalcType(value);
              const recomputed = computeFinance(value, presentValue, rate, periods);
              if (recomputed !== null) setResult(recomputed);
              else setResult(null);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="future-value">Future Value (FV)</SelectItem>
                <SelectItem value="present-value">Present Value (PV)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{calcType === "future-value" ? `Present Value (${currencySymbol})` : `Future Value (${currencySymbol})`}</Label>
            <Input
              type="number"
              value={presentValue}
              onChange={(e) => setPresentValue(e.target.value)}
              placeholder="e.g., 10000"
            />
          </div>
          <div>
            <Label>Interest Rate (% per period)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 5"
              step="0.1"
            />
          </div>
          <div>
            <Label>Number of Periods</Label>
            <Input
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result !== null && !isNaN(result) && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">
                  Calculated {calcType === "future-value" ? "Future Value" : "Present Value"}
                </p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-2xl font-bold text-primary">{currencySymbol}{fmt(result)}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The finance calculator performs fundamental time value of money calculations, including future value and present value computations. These calculations are core to financial planning, investment analysis, and understanding how money grows over time. Future value shows what an investment today will be worth in the future given an interest rate and time period. Present value calculates what a future amount is worth in today's dollars. Both calculations are essential for comparing investment options, retirement planning, and making informed financial decisions."
        useCases={[
          { title: "Investment Planning", description: "Calculate how much your current investments will grow over time, or determine how much you need to invest today to reach a future financial goal." },
          { title: "Retirement Calculations", description: "Estimate future value of retirement savings or determine present value of required retirement income to plan adequate savings." },
          { title: "Loan Analysis", description: "Understand the present value of loan payments or future value of payment streams to compare financing options and evaluate deals." },
          { title: "Business Valuation", description: "Calculate present value of future cash flows for business investments, project evaluations, or capital budgeting decisions." }
        ]}
        tips={[
          { title: "Time Value of Money", description: "Money available today is worth more than the same amount in the future due to its potential earning capacity. This principle underpins all financial calculations." },
          { title: "Compounding Effects", description: "Future value calculations assume interest compounds over time. More frequent compounding periods (quarterly vs annually) result in higher future values." },
          { title: "Realistic Rate Assumptions", description: "Use realistic interest rates based on historical averages. Stock markets average 7-10% annually after inflation, while bonds are typically lower at 3-5%." },
          { title: "Inflation Consideration", description: "Real returns account for inflation. If investments earn 7% but inflation is 3%, your real return is approximately 4%. Consider inflation when planning long-term." }
        ]}
        faqs={[
          { question: "What's the difference between future value and present value?", answer: "Future value calculates what money invested today will grow to in the future. Present value determines what a future sum is worth in today's dollars. They're inverse calculations - one moves forward in time, the other backward." },
          { question: "What interest rate should I use?", answer: "Use expected rate of return for your investment type: stocks (7-10%), bonds (3-5%), savings accounts (1-3%), or real estate (8-12%). Conservative estimates are safer for planning purposes." },
          { question: "How do I account for inflation?", answer: "Use the real interest rate (nominal rate minus inflation rate) for more accurate future purchasing power. If nominal return is 8% and inflation is 3%, use 5% for calculations." },
          { question: "Why is the period number important?", answer: "The period number represents compounding frequency. More periods mean more compounding, which significantly affects results over time. Make sure rate and period match (annual rate with annual periods, etc.)." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default FinanceCalculator;
