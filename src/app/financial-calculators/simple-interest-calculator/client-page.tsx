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

type SimpleInterestResult = { interest: number; totalAmount: number; principal: number };

function computeSimpleInterest(principalStr: string, rateStr: string, timeStr: string): SimpleInterestResult | null {
  const p = parseFloat(principalStr);
  const ratePct = parseFloat(rateStr);
  const t = parseFloat(timeStr);
  if (!(p > 0 && p <= 1e12) || isNaN(ratePct) || ratePct < 0 || ratePct > 100 || isNaN(t) || t < 0 || t > 50) {
    return null;
  }
  const r = ratePct / 100;
  const interest = p * r * t;
  const totalAmount = p + interest;
  return { interest, totalAmount, principal: p };
}

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("2");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<SimpleInterestResult | null>(() => computeSimpleInterest("1000", "5", "2"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeSimpleInterest(principal, rate, time);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter principal (1+), rate (0-100%), time (0-50 yrs).",
      });
      return;
    }

    setResult(computed);
    
    toast({
        title: "Interest Calculated",
        description: `The total simple interest is ${currencySymbol}${fmt(computed.interest)}.`,
    });
  };

  const reset = () => { setPrincipal(""); setRate(""); setTime(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Simple interest: principal ${currencySymbol}${fmt(result.principal)}, interest ${currencySymbol}${fmt(result.interest)}, total ${currencySymbol}${fmt(result.totalAmount)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest on a principal amount."
      canonicalUrl="/financial-calculators/simple-interest-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
           <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Principal Amount ({currencySymbol})</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 1000" />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div>
            <Label>Time Period (Years)</Label>
            <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 2" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Simple Interest</Button>
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
                <p className="text-sm text-neutral-600">Total Amount</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{fmt(result.totalAmount)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">Total Simple Interest</p>
                <p className="text-lg font-bold">{currencySymbol}{fmt(result.interest)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Simple Interest Calculator determines the interest earned or paid on a principal amount at a fixed rate over a specific period. Unlike compound interest, simple interest is calculated only on the original principal and does not include interest on accumulated interest."
        useCases={[
            { title: "Basic Loan Analysis", description: "Understand the interest cost for simple, short-term loans where interest is not compounded." },
            { title: "Educational Tool", description: "Learn the fundamental concept of interest calculation as a basis for more complex financial topics." },
            { title: "Comparing Investments", description: "Quickly compare the returns of a simple interest investment against a compounding one to see the difference." },
        ]}
        tips={[
            { title: "Time Period is Key", description: "Ensure your interest rate and time period use the same time unit (e.g., an annual rate with a term in years)." },
            { title: "Less Common in Practice", description: "Most modern financial products like savings accounts and loans use compound interest. Simple interest is more of a foundational concept." },
            { title: "Linear Growth", description: "Simple interest results in linear growth of your money, whereas compound interest leads to exponential growth." },
        ]}
        faqs={[
            { question: "What is simple interest?", answer: "Simple interest is a quick method of calculating the interest charge on a loan or principal. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments." },
            { question: "What's the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount of a loan or deposit, so it's a fixed amount over time. Compound interest is calculated on the principal amount and also on the accumulated interest of previous periods, thus it can be regarded as 'interest on interest'." },
            { question: "When is simple interest used?", answer: "Simple interest is not as common as compound interest, but it can be used for some short-term personal loans or for auto loans that use the 'simple interest method'." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;

    