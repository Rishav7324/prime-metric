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

type DebtResult = {
  months: number; totalInterest: number; totalPaid: number;
  payoffDate: string; lastPayment: number; never: boolean; firstMonthInterest: number;
};

function computeDebt(balanceStr: string, aprStr: string, paymentStr: string): DebtResult | null {
  const balance = parseFloat(balanceStr);
  const apr = parseFloat(aprStr);
  const payment = parseFloat(paymentStr);

  if (!(balance > 0 && balance <= 1e12)) return null;
  if (isNaN(apr) || apr < 0 || apr > 100) return null;
  if (!(payment > 0 && payment <= 1e12)) return null;

  const r = apr / 100 / 12;
  const firstMonthInterest = balance * r;

  if (r > 0 && payment <= firstMonthInterest) {
    return { months: 0, totalInterest: 0, totalPaid: 0, payoffDate: "—", lastPayment: 0, never: true, firstMonthInterest };
  }

  let months: number;
  let totalPaid: number;
  if (r === 0) {
    months = Math.ceil(balance / payment);
    totalPaid = balance;
  } else {
    months = Math.ceil(-Math.log(1 - (r * balance) / payment) / Math.log(1 + r));
    // Balance after (months-1) full payments, then the smaller final payment
    const growth = Math.pow(1 + r, months - 1);
    const balanceBeforeLast = balance * growth - payment * ((growth - 1) / r);
    const lastPayment = balanceBeforeLast * (1 + r);
    totalPaid = payment * (months - 1) + lastPayment;
  }

  const payoff = new Date();
  payoff.setMonth(payoff.getMonth() + months);
  const payoffDate = payoff.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const lastPayment = r === 0
    ? balance - payment * (months - 1)
    : totalPaid - payment * (months - 1);

  return {
    months, totalPaid, payoffDate, lastPayment,
    totalInterest: totalPaid - balance, never: false, firstMonthInterest,
  };
}

const DebtPayoffCalculatorClient = () => {
  const [balance, setBalance] = useState("500000");
  const [apr, setApr] = useState("18");
  const [payment, setPayment] = useState("15000");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<DebtResult | null>(() =>
    computeDebt("500000", "18", "15000"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeDebt(balance, apr, payment);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter balance (1+), APR (0-100%) and monthly payment (1+)." });
      return;
    }
    setResult(computed);
    if (computed.never) {
      toast({ variant: "destructive", title: "Never Pays Off", description: `Payment must exceed monthly interest of ${currencySymbol}${fmt(computed.firstMonthInterest)}.` });
      return;
    }
    toast({ title: "Payoff Planned", description: `Debt-free in ${computed.months} months by ${computed.payoffDate}.` });
  };

  const reset = () => { setBalance(""); setApr(""); setPayment(""); setResult(null); };

  const copyResult = async () => {
    if (!result || result.never) return;
    const text = `Debt payoff: ${result.months} months, total interest ${currencySymbol}${fmt(result.totalInterest)}, debt-free by ${result.payoffDate}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Debt Payoff Calculator – Be Debt-Free"
      description="Enter balance, APR and monthly payment to get months to payoff, total interest and your debt-free date instantly and free"
      keywords="debt payoff calculator, credit card payoff calculator, debt free date, payoff total interest, loan payoff planner"
      canonicalUrl="/financial-calculators/debt-payoff-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Debt Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Outstanding Balance ({currencySymbol})</Label>
              <Input type="number" min={1} value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="e.g., 500000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Interest Rate / APR (%)</Label>
              <Input type="number" step="0.1" min={0} max={100} value={apr} onChange={(e) => setApr(e.target.value)} placeholder="e.g., 18" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Payment ({currencySymbol})</Label>
              <Input type="number" min={1} value={payment} onChange={(e) => setPayment(e.target.value)} placeholder="e.g., 15000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate Payoff</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Results</h2>
            {result && !result.never && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            result.never ? (
              <div className="space-y-4">
                <div className="text-center py-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="text-xs text-red-500 mb-1">Warning</div>
                  <div className="text-xl font-bold text-red-600">Never pays off</div>
                  <div className="text-xs text-neutral-600 mt-1">Monthly interest is {currencySymbol}{fmt(result.firstMonthInterest)} — raise payment above it.</div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl">
                  <div className="text-xs text-neutral-500 mb-1">Debt-Free In</div>
                  <div className="text-3xl font-bold text-[#F2765E]">
                    {result.months} <span className="text-base font-semibold">months</span>
                  </div>
                  <div className="text-xs text-neutral-600 mt-1 font-medium">Payoff date: {result.payoffDate}</div>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                    <div className="text-xs text-neutral-500">Total Interest</div>
                    <div className="text-base font-bold text-[#c25136]">{currencySymbol}{fmt(result.totalInterest)}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                    <div className="text-xs text-neutral-500">Total Paid</div>
                    <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalPaid)}</div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">Final Payment</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.lastPayment)}</div>
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">💳</div><p className="text-sm">Enter details to see your payoff plan</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Debt Payoff Calculator turns your balance, APR and monthly payment into a clear finish line: months to payoff, total interest and your debt-free date. If your payment cannot even cover one month of interest, it warns you immediately so you can raise it."
        useCases={[
          { title: "Credit Card Payoff", description: "See how long a fixed monthly payment takes to kill card debt." },
          { title: "Payment Bump Test", description: "Compare two payment amounts to see interest saved by paying more." },
          { title: "Loan Finish Line", description: "Pin down the exact month any fixed-payment debt ends." },
          { title: "Minimum Payment Check", description: "Confirm your payment actually exceeds monthly interest." },
        ]}
        tips={[
          { title: "Beat the Interest First", description: "Your payment must top one month of interest or the balance never shrinks." },
          { title: "Small Bumps, Big Savings", description: "Even a slightly higher payment cuts months and interest sharply." },
          { title: "Attack High APR First", description: "With multiple debts, overpay the highest rate while minimum-paying the rest." },
        ]}
        faqs={[
          { question: "How is the payoff time calculated?", answer: "With n = −ln(1 − r×B/P) / ln(1+r), where r is monthly rate, B balance and P payment — then rounded up, with a smaller final payment." },
          { question: "Why does it say my debt never pays off?", answer: "When your payment is at or below one month of interest, the balance cannot fall. Raise the payment above that interest amount." },
          { question: "Is the final payment the same amount?", answer: "Usually not — the last payment is smaller and covers only the leftover balance plus its interest." },
          { question: "Does this include fees or changing rates?", answer: "No. It assumes a fixed APR, no new charges and no late fees — treat it as a best-case plan." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default DebtPayoffCalculatorClient;
