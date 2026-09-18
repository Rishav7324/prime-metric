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

type EmiYearRow = { year: number; principal: number; interest: number; balance: number };
type EmiResult = {
  emi: number; totalPayment: number; totalInterest: number; schedule: EmiYearRow[];
};

function computeEmi(amountStr: string, rateStr: string, yearsStr: string): EmiResult | null {
  const p = parseFloat(amountStr);
  const annual = parseFloat(rateStr);
  const years = parseInt(yearsStr);

  if (!(p > 0 && p <= 1e11) || isNaN(annual) || annual < 0 || annual > 50 || !(years >= 1 && years <= 40)) {
    return null;
  }

  const r = annual / 100 / 12;
  const n = years * 12;
  const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  if (!isFinite(emi) || emi <= 0) return null;

  let balance = p;
  const schedule: EmiYearRow[] = [];
  for (let y = 1; y <= years; y++) {
    let yP = 0, yI = 0;
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const principal = Math.min(emi - interest, balance);
      yI += interest; yP += principal; balance -= principal;
    }
    schedule.push({ year: y, principal: yP, interest: yI, balance: Math.max(balance, 0) });
    if (balance <= 0) break;
  }

  const totalPayment = emi * n;
  return { emi, totalPayment, totalInterest: totalPayment - p, schedule };
}

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("2500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanYears, setLoanYears] = useState("20");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<EmiResult | null>(() => computeEmi("2500000", "8.5", "20"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeEmi(loanAmount, interestRate, loanYears);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter amount (1+), rate (0-50%), years (1-40)." });
      return;
    }
    setResult(computed);
    toast({ title: "EMI Calculated", description: `Monthly EMI ${currencySymbol}${fmt(computed.emi)} for ${loanYears} yrs.` });
  };

  const reset = () => { setLoanAmount(""); setInterestRate(""); setLoanYears(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `EMI: ${currencySymbol}${fmt(parseFloat(loanAmount))} at ${interestRate}% for ${loanYears} yrs → ${currencySymbol}${fmt(result.emi)}/month (total interest ${currencySymbol}${fmt(result.totalInterest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="EMI Calculator for Home & Personal Loans"
      description="Estimate monthly EMI, total interest and payoff progress for home and personal loans with amortization"
      keywords="emi calculator, home loan emi, personal loan emi calculator, loan amortization schedule"
      canonicalUrl="/financial-calculators/emi-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Loan Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Loan Amount ({currencySymbol})</Label>
              <Input type="number" min={1} value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="e.g., 2500000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Interest Rate (% p.a.)</Label>
              <Input type="number" step={0.1} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 8.5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Loan Tenure (Years)</Label>
              <Input type="number" min={1} max={40} value={loanYears} onChange={(e) => setLoanYears(e.target.value)} placeholder="e.g., 20" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate EMI</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Your EMI</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Monthly EMI</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.emi)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Interest</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalInterest)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Payable</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalPayment)}</p>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Yearly Payoff Schedule
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">Year</th>
                        <th className="text-right font-semibold px-2.5 py-2">Principal</th>
                        <th className="text-right font-semibold px-2.5 py-2">Interest</th>
                        <th className="text-right font-semibold px-2.5 py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.year}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.principal)}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.interest)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏠</div><p className="text-sm">Enter loan details to calculate EMI</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="EMI (Equated Monthly Installment) is the fixed amount you pay each month toward a home or personal loan. This calculator splits every payment into principal and interest, showing your monthly EMI, lifetime interest cost and a yearly payoff schedule."
        useCases={[
          { title: "Home Purchase", description: "Test loan amounts and tenures to find a monthly EMI your budget can handle." },
          { title: "Personal Loan Check", description: "See the true interest cost of short-tenure borrowing before signing." },
          { title: "Prepayment Planning", description: "Use the yearly balance table to judge how lump-sum prepayments cut interest." },
          { title: "Lender Comparison", description: "Compare EMIs across banks at different rates to pick the cheapest offer." },
        ]}
        tips={[
          { title: "Shorter Tenure Saves Big", description: "A 15-year loan costs far less interest than a 20-year one — if the higher EMI fits." },
          { title: "Watch Early Years", description: "Initial EMIs are mostly interest; prepaying early reduces the total dramatically." },
          { title: "Keep EMI Under 40%", description: "Lenders prefer total EMIs below ~40% of monthly income for safe approval odds." },
        ]}
        examples={[
          {
            title: "2,500,000 home loan at 8.5% for 20 years",
            description: "A 2,500,000 loan at 8.5% for 20 years means EMI 21,696 with total interest 2,706,939.",
            steps: [
              "Monthly rate r = 8.5/100/12 = 0.0070833 and months n = 20 x 12 = 240.",
              "EMI = 2,500,000 x 0.0070833 x 1.0070833^240 / (1.0070833^240 - 1) = 21,695.58, shown as 21,696 rounded.",
              "Total payable = 21,695.58 x 240 = 5,206,939.40, so total interest = 5,206,939.40 - 2,500,000 = 2,706,939.40.",
            ],
          },
          {
            title: "500,000 loan at 9% for 7 years",
            description: "A 500,000 loan at 9% for 7 years means EMI 8,045 with total interest 175,741.",
            steps: [
              "Monthly rate r = 9/100/12 = 0.0075 and months n = 7 x 12 = 84.",
              "EMI = 500,000 x 0.0075 x 1.0075^84 / (1.0075^84 - 1) = 8,044.54, shown as 8,045 rounded.",
              "Total payable = 8,044.54 x 84 = 675,741.29, so total interest = 675,741.29 - 500,000 = 175,741.29.",
            ],
          },
        ]}
        faqs={[
          { question: "How is EMI calculated?", answer: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1), where P is principal, r monthly rate and n total months. Our tool applies this and builds the schedule." },
          { question: "Does EMI change with floating rates?", answer: "Yes — if your home loan rate resets, the EMI or tenure adjusts. Re-run the calculator with the new rate." },
          { question: "EMI vs simple loan estimate?", answer: "Unlike flat estimates, EMI math uses reducing balance, so interest falls as you repay — the schedule table shows this shift." },
          { question: "Can I reduce my total interest?", answer: "Yes: choose a shorter tenure, negotiate a lower rate, or make periodic prepayments against principal." },
          { question: "What does a 1% higher rate do to a 2,500,000 loan over 20 years?", answer: "At 8.5%, the EMI is 21,695.58 with total interest 2,706,939.40. At 9.5%, the EMI rises to 23,303.28 with total interest 3,092,787.13 — one extra point costs 1,607.70 more per month and 385,847.73 more over 20 years." },
          { question: "How much do I save by shortening a 2,500,000 loan at 8.5% from 20 to 15 years?", answer: "The 20-year EMI is 21,695.58 with total interest 2,706,939.40, while the 15-year EMI is 24,618.49 with total interest 1,931,328.01. Paying 2,922.91 extra per month saves 775,611.39 in lifetime interest." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default EmiCalculator;
