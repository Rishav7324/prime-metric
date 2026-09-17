
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

type AprResult = { apr: number; monthlyPayment: number; totalInterest: number; totalCost: number };

function computeApr(loanStr: string, feesStr: string, rateStr: string, termStr: string): AprResult | null {
  const principal = parseFloat(loanStr);
  const totalFees = parseFloat(feesStr);
  const annualRate = parseFloat(rateStr);
  const months = parseInt(termStr);

  if (!(principal > 0 && principal <= 1e12)) return null;
  if (isNaN(totalFees) || totalFees < 0 || totalFees > 1e9) return null;
  if (isNaN(annualRate) || annualRate < 0 || annualRate > 100) return null;
  if (!(months >= 1 && months <= 600)) return null;

  const rate = annualRate / 100 / 12;
  const monthlyPayment = rate === 0
    ? principal / months
    : principal * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  if (!isFinite(monthlyPayment) || monthlyPayment <= 0) return null;

  const totalPayment = monthlyPayment * months;
  const totalCost = totalPayment + totalFees;
  const totalInterest = totalPayment - principal;
  const apr = ((totalInterest + totalFees) / principal) / (months / 365.25 * 12) * 100;

  return { apr, monthlyPayment, totalInterest, totalCost };
}

const APRCalculatorClient = () => {
  const [loanAmount, setLoanAmount] = useState("100000");
  const [fees, setFees] = useState("2000");
  const [interestRate, setInterestRate] = useState("7.5");
  const [term, setTerm] = useState("60");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<AprResult | null>(() => computeApr("100000", "2000", "7.5", "60"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeApr(loanAmount, fees, interestRate, term);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter amount (1+), fees (0+), rate (0-100%), term 1-600 months.",
      });
      return;
    }

    setResult(computed);
    toast({
        title: "APR Calculated",
        description: `APR ${computed.apr.toLocaleString("en-US", { maximumFractionDigits: 2 })}% — payment ${currencySymbol}${fmt(computed.monthlyPayment)}/month.`,
    });
  };

  const reset = () => { setLoanAmount(""); setFees(""); setInterestRate(""); setTerm(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `APR ${result.apr.toLocaleString("en-US", { maximumFractionDigits: 2 })}% on ${currencySymbol}${fmt(parseFloat(loanAmount))} at ${interestRate}% for ${term} months — payment ${currencySymbol}${fmt(result.monthlyPayment)}/month, total cost ${currencySymbol}${fmt(result.totalCost)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="APR Calculator"
      description="Calculate Annual Percentage Rate including fees and interest"
      keywords="apr calculator, annual percentage rate, loan cost, interest and fees"
      canonicalUrl="/financial-calculators/apr-calculator"
    >
        <Card className="p-6">
            <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
                <Label>Loan Amount ({currencySymbol})</Label>
                <Input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Principal amount"
                />
            </div>
            <div>
                <Label>Total Fees ({currencySymbol})</Label>
                <Input
                type="number"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="Processing fees, closing costs, etc."
                />
            </div>
            <div>
                <Label>Interest Rate (%)</Label>
                <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Annual interest rate"
                />
            </div>
            <div>
                <Label>Loan Term (Months)</Label>
                <Input
                type="number"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Loan duration in months"
                />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 gradient-button">Calculate APR</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
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
                    <p className="text-sm text-neutral-600">Annual Percentage Rate (APR)</p>
                    <p className="text-3xl font-bold text-primary">
                    {result.apr.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })}%
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted/50 rounded text-center">
                    <p className="text-sm text-neutral-600">Monthly Payment</p>
                    <p className="text-lg font-bold">{currencySymbol}{fmt(result.monthlyPayment)}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded text-center">
                    <p className="text-sm text-neutral-600">Total Interest</p>
                    <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalInterest)}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded col-span-2 text-center">
                    <p className="text-sm text-neutral-600">Total Loan Cost (Principal + Interest + Fees)</p>
                    <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalCost)}</p>
                    </div>
                </div>
                </div>
            )}
            </div>
        </Card>

      <CalculatorContentSection
        aboutContent="The APR (Annual Percentage Rate) calculator determines the true cost of borrowing by including both interest rates and all associated fees in a single percentage. Unlike simple interest rates, APR provides a complete picture of loan costs, making it easier to compare different loan offers fairly. By law, lenders must disclose APR for consumer loans, helping borrowers make informed decisions. This calculator accounts for origination fees, closing costs, processing fees, and other charges that affect the total cost of borrowing."
        useCases={[
          { title: "Loan Comparison", description: "Compare different loan offers fairly by looking at APR instead of just interest rates. A lower rate with high fees may have a higher APR than a higher rate with no fees." },
          { title: "Mortgage Shopping", description: "Evaluate mortgage offers from different lenders. Closing costs and points significantly affect APR, revealing the true cost of home financing." },
          { title: "Credit Card Analysis", description: "Understand the real cost of credit card balances. Credit cards disclose APR including fees, helping you choose the best card for your usage pattern." },
          { title: "Auto Loan Decisions", description: "Calculate the true cost of car financing including dealer fees, documentation charges, and other costs to negotiate better deals." }
        ]}
        tips={[
          { title: "APR vs Interest Rate", description: "Interest rate is the cost of borrowing the principal. APR includes the interest rate plus all fees, points, and charges, showing the total cost as a percentage." },
          { title: "Lower APR Isn't Always Better", description: "Consider loan terms and your plans. A 30-year mortgage with slightly higher APR but no prepayment penalty may be better than lower APR with restrictions if you plan to pay early." },
          { title: "Watch for Variable APRs", description: "Credit cards and some loans have variable APRs that change with market rates. Initial low APRs may increase significantly, affecting long-term costs." },
          { title: "Calculate Break-Even", description: "For mortgages with points (prepaid interest), calculate how long you need to keep the loan to break even on the upfront cost versus monthly savings." }
        ]}
        faqs={[
          { question: "Why is APR higher than my interest rate?", answer: "APR includes all loan costs (origination fees, closing costs, points, etc.) spread over the loan term, while the interest rate only reflects the cost of borrowing principal. More fees mean a larger difference between rate and APR." },
          { question: "Is APR the only factor when comparing loans?", answer: "No. Also consider loan terms, prepayment penalties, payment flexibility, customer service, and whether rates are fixed or variable. APR is important but not the only decision factor." },
          { question: "What are points and how do they affect APR?", answer: "Points are prepaid interest, where 1 point = 1% of loan amount. Paying points lowers your interest rate but increases APR initially. They make sense if you keep the loan long enough to recoup the upfront cost through lower payments." },
          { question: "Does paying off a loan early affect APR?", answer: "The stated APR assumes you keep the loan for its full term. Paying early means you pay less total interest, effectively lowering your realized APR. However, some loans have prepayment penalties that offset this benefit." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default APRCalculatorClient;
