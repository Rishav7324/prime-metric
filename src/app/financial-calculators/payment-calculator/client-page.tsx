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

type PaymentResult = {
  monthlyPayment: number; totalPayment: number; totalInterest: number;
};

function computePayment(
  amountStr: string,
  rateStr: string,
  termStr: string
): PaymentResult | null {
  const principal = parseFloat(amountStr);
  const annual = parseFloat(rateStr);
  const years = parseFloat(termStr);

  if (!(principal > 0 && principal <= 1e12)) return null;
  if (isNaN(annual) || annual < 0 || annual > 100) return null;
  if (!(years > 0 && years <= 50)) return null;

  const monthlyRate = annual / 100 / 12;
  const months = Math.round(years * 12);
  if (!(months > 0)) return null;

  const monthlyPayment = monthlyRate === 0 ? principal / months
    : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  const totalPayment = monthlyPayment * months;

  return { monthlyPayment, totalPayment, totalInterest: totalPayment - principal };
}

const PaymentCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [loanTerm, setLoanTerm] = useState("5");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PaymentResult | null>(() => computePayment("10000", "5", "5"));
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const computed = computePayment(loanAmount, interestRate, loanTerm);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter amount (1+), rate (0-100%), term (up to 50 yrs).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Calculation Complete",
        description: `Your monthly payment is ${currencySymbol}${fmt(computed.monthlyPayment)}.`,
    });
  };

  const reset = () => { setLoanAmount(""); setInterestRate(""); setLoanTerm(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Loan payment: ${currencySymbol}${fmt(result.monthlyPayment)}/month, total ${currencySymbol}${fmt(result.totalPayment)}, interest ${currencySymbol}${fmt(result.totalInterest)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Payment Calculator"
      description="Calculate monthly payments for loans or other financing."
      canonicalUrl="/financial-calculators/payment-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Loan Amount ({currencySymbol})</Label>
            <Input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g., 10000" />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div>
            <Label>Loan Term (Years)</Label>
            <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Payment</Button>
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
                <p className="text-sm text-neutral-600">Monthly Payment</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{fmt(result.monthlyPayment)}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Payment</p>
                  <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalPayment)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Interest</p>
                  <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalInterest)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Payment Calculator helps determine the monthly payment amount for a loan. This is a versatile tool that can be used for various types of loans, including personal loans, auto loans, and mortgages, by providing the loan amount, interest rate, and term."
        useCases={[
            { title: "Loan Planning", description: "Estimate payments for any type of loan to see how it fits into your budget." },
            { title: "Comparing Offers", description: "Compare different loan offers by seeing how changes in interest rate and term affect your monthly payment." },
            { title: "Debt Management", description: "Understand the monthly cost of a new loan or a debt consolidation plan." },
        ]}
        tips={[
            { title: "Longer Term vs. Lower Payment", description: "A longer loan term will result in a lower monthly payment, but you will pay more in total interest over the life of the loan." },
            { title: "Impact of Interest Rate", description: "Even a small change in the interest rate can significantly affect your total payment. Always shop around for the best rate." },
            { title: "Principal Prepayments", description: "Making extra payments toward the principal can help you pay off your loan faster and save on interest. Check if your loan has prepayment penalties." },
        ]}
        faqs={[
            { question: "What is an amortizing loan?", answer: "An amortizing loan is one where payments are made in equal installments over the life of the loan. Each payment consists of both principal and interest." },
            { question: "How does this differ from a mortgage calculator?", answer: "This is a more general-purpose calculator. A mortgage calculator often includes extra fields for property taxes, homeowners insurance, and PMI, which are specific to home loans." },
            { question: "What is the principal of a loan?", answer: "The principal is the initial amount of money you borrow from the lender, before any interest is added." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PaymentCalculator;

    