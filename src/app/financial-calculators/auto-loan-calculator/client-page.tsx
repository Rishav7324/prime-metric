
'use client';

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type AutoLoanResult = { monthlyPayment: number; totalPayment: number; totalInterest: number };

function computeAutoLoan(priceStr: string, downStr: string, rateStr: string, termStr: string): AutoLoanResult | null {
  const price = parseFloat(priceStr);
  const down = downStr.trim() === "" ? 0 : parseFloat(downStr);
  const annualRate = parseFloat(rateStr);
  const years = parseFloat(termStr);

  if (!(price > 0 && price <= 1e9)) return null;
  if (isNaN(down) || down < 0 || down > price) return null;
  if (isNaN(annualRate) || annualRate < 0 || annualRate > 100) return null;
  if (!(years > 0 && years <= 10)) return null;

  const principal = price - down;
  if (!(principal > 0 && principal <= 1e9)) return null;
  const monthlyRate = annualRate / 100 / 12;
  const months = Math.round(years * 12);
  if (!(months >= 1 && months <= 120)) return null;

  const monthlyPayment = monthlyRate === 0
    ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  if (!isFinite(monthlyPayment) || monthlyPayment <= 0) return null;

  const totalPayment = monthlyPayment * months;
  return { monthlyPayment, totalPayment, totalInterest: totalPayment - principal };
}

const AutoLoanCalculatorClient = () => {
  const [carPrice, setCarPrice] = useState("25000");
  const [downPayment, setDownPayment] = useState("5000");
  const [interestRate, setInterestRate] = useState("5.5");
  const [loanTerm, setLoanTerm] = useState("5");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<AutoLoanResult | null>(() => computeAutoLoan("25000", "5000", "5.5", "5"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeAutoLoan(carPrice, downPayment, interestRate, loanTerm);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter price (1+), down (0 to price), rate (0-100%), term (up to 10 yrs).",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Calculation Complete",
      description: `Monthly payment ${currencySymbol}${fmt(computed.monthlyPayment)}.`,
    });
  };

  const reset = () => { setCarPrice(""); setDownPayment(""); setInterestRate(""); setLoanTerm(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Auto loan: ${currencySymbol}${fmt(parseFloat(carPrice))} − ${currencySymbol}${fmt(parseFloat(downPayment) || 0)} down at ${interestRate}% for ${loanTerm} yrs → ${currencySymbol}${fmt(result.monthlyPayment)}/month, total ${currencySymbol}${fmt(result.totalPayment)} (interest ${currencySymbol}${fmt(result.totalInterest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your car loan monthly payments"
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n-1]"
      canonicalUrl="/financial-calculators/auto-loan-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4">Car Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Car Price ({currencySymbol})</Label>
              <Input type="number" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} placeholder="25000" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Down Payment ({currencySymbol})</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="5000" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="5.5" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="5" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button">Calculate</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">Monthly Payment</div>
                <div className="text-3xl font-bold gradient-text">{currencySymbol}{fmt(result.monthlyPayment)}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                  <div className="text-sm text-neutral-600">Total Payment</div>
                  <div className="text-2xl font-bold text-primary">{currencySymbol}{fmt(result.totalPayment)}</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-secondary/20">
                  <div className="text-sm text-neutral-600">Total Interest</div>
                  <div className="text-2xl font-bold">{currencySymbol}{fmt(result.totalInterest)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center"><div className="text-4xl mb-2">🚗</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Auto Loan Calculator helps you estimate your monthly car payments based on the vehicle price, down payment, interest rate, and loan term. Understanding these numbers helps you budget effectively and compare different financing options before making a purchase decision."
        useCases={[
          { title: "Car Shopping", description: "Determine affordable monthly payments before visiting dealerships to avoid overspending." },
          { title: "Loan Comparison", description: "Compare different loan offers from banks, credit unions, and dealerships to find the best deal." },
          { title: "Down Payment Planning", description: "See how different down payment amounts affect your monthly payment and total interest paid." },
          { title: "Budget Planning", description: "Ensure car payments fit comfortably within your monthly budget alongside other expenses." }
        ]}
        tips={[
          { title: "Aim for 20% Down", description: "A 20% down payment helps you avoid being underwater (owing more than the car's worth) and reduces interest costs." },
          { title: "Keep Loan Term Reasonable", description: "Shorter loan terms (3-5 years) mean higher monthly payments but significantly less interest paid over time." },
          { title: "Factor in Total Cost", description: "Remember to budget for insurance, maintenance, gas, and registration in addition to the loan payment." },
          { title: "Shop for Rates", description: "Get pre-approved from your bank or credit union before visiting dealerships to negotiate from a position of strength." }
        ]}
        faqs={[
          { question: "What's a good interest rate for an auto loan?", answer: "Rates vary based on credit score and market conditions. As of 2024, excellent credit (720+) might get 5-7%, while lower scores pay 10-15% or more. Shop around for the best rate." },
          { question: "Should I lease or buy?", answer: "Buying builds equity and is cheaper long-term if you keep the car. Leasing has lower monthly payments but you never own the vehicle. Buy if you drive >15k miles/year or keep cars long-term." },
          { question: "How much car can I afford?", answer: "A general rule is to keep total car expenses (payment, insurance, fuel, maintenance) under 15-20% of your monthly take-home pay." },
          { question: "Is it better to pay cash or finance?", answer: "If you have low-interest financing available and can invest cash for higher returns, financing might be better. Otherwise, paying cash avoids interest and debt." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AutoLoanCalculatorClient;
