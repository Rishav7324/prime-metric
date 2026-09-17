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

type YearRow = { year: number; principal: number; interest: number; balance: number };
type LoanResult = {
  emi: number; totalPayment: number; totalInterest: number;
  principalShare: number; schedule: YearRow[];
};

function computeLoan(amountStr: string, rateStr: string, termStr: string): LoanResult | null {
  const principal = parseFloat(amountStr);
  const annualRate = parseFloat(rateStr);
  const years = parseFloat(termStr);

  if (!(principal > 0 && principal <= 1e12) || isNaN(annualRate) || annualRate < 0 || annualRate > 100 || !(years > 0 && years <= 50)) {
    return null;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = Math.round(years * 12);
  const emi = monthlyRate === 0 ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  // Yearly amortization schedule
  let balance = principal;
  const schedule: YearRow[] = [];
  for (let y = 1; y <= Math.ceil(months / 12); y++) {
    let yPrin = 0, yInt = 0;
    for (let m = 0; m < 12 && (y - 1) * 12 + m < months; m++) {
      const interest = balance * monthlyRate;
      const prin = Math.min(emi - interest, balance);
      balance = Math.max(0, balance - prin);
      yPrin += prin; yInt += interest;
    }
    schedule.push({ year: y, principal: yPrin, interest: yInt, balance });
    if (balance <= 0) break;
  }

  const totalPayment = emi * months;
  return {
    emi, totalPayment, totalInterest: totalPayment - principal,
    principalShare: (principal / totalPayment) * 100, schedule,
  };
}

const LoanCalculatorClient = () => {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("7.5");
  const [term, setTerm] = useState("10");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<LoanResult | null>(() => computeLoan("100000", "7.5", "10"));
  const [showSchedule, setShowSchedule] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeLoan(amount, rate, term);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter amount (1+), rate (0-100%), term (up to 50 yrs)." });
      return;
    }
    setResult(computed);
    toast({ title: "EMI Calculated", description: `Monthly EMI is ${currencySymbol}${fmt(computed.emi)}.` });
  };

  const reset = () => { setAmount(""); setRate(""); setTerm(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Loan EMI: ${currencySymbol}${fmt(result.emi)}/month. Total payment: ${currencySymbol}${fmt(result.totalPayment)}, Total interest: ${currencySymbol}${fmt(result.totalInterest)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Loan EMI Calculator"
      description="Calculate monthly EMI, total interest and year-by-year payoff schedule for any loan"
      keywords="emi calculator, loan calculator, mortgage emi, amortization schedule, loan interest calculator"
      canonicalUrl="/financial-calculators/loan-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Loan Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Loan Amount ({currencySymbol})</Label>
              <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 100000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" min={0} max={100} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 7.5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Loan Term (Years)</Label>
              <Input type="number" min={0.5} max={50} step={0.5} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="e.g., 10" className="mt-1.5 h-10 text-sm bg-white" />
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
            <h2 className="text-lg font-bold text-black">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl">
                <div className="text-xs text-neutral-500 mb-1">Monthly EMI</div>
                <div className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.emi)}</div>
              </div>
              {/* Principal vs interest bar */}
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${result.principalShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${100 - result.principalShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Principal {result.principalShare.toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Interest {(100 - result.principalShare).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">Total Payment</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalPayment)}</div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">Total Interest</div>
                  <div className="text-base font-bold text-[#c25136]">{currencySymbol}{fmt(result.totalInterest)}</div>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Year-by-Year Schedule
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
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
                          <td className="px-2.5 py-1.5 text-right text-neutral-500">{currencySymbol}{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">💰</div><p className="text-sm">Enter details to see EMI + schedule</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Loan EMI (Equated Monthly Installment) Calculator computes your fixed monthly payment from loan amount, interest rate and tenure — plus total interest and a year-by-year amortization schedule so you can see exactly how each payment splits between principal and interest."
        useCases={[
          { title: "Personal Loan Planning", description: "Estimate monthly payments and total cost before you borrow." },
          { title: "Home Loan Analysis", description: "Compare tenures — a shorter term raises EMI but slashes lifetime interest." },
          { title: "Car Loan Decisions", description: "See how rate differences change both EMI and total interest." },
          { title: "Prepayment Planning", description: "Use the yearly schedule to plan lump-sum prepayments in high-interest early years." },
        ]}
        tips={[
          { title: "Early Years = Mostly Interest", description: "Amortization front-loads interest, so prepaying early saves the most." },
          { title: "0% Isn't Always Free", description: "Check processing fees and insurance — they add to the true cost." },
          { title: "Round Up Your EMI", description: "Even small extra principal payments shorten the loan noticeably." },
        ]}
        faqs={[
          { question: "What is an EMI?", answer: "EMI (Equated Monthly Installment) is the fixed amount you pay each month toward principal + interest until the loan is fully repaid." },
          { question: "How is EMI calculated?", answer: "EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1), where P is principal, r monthly rate, n number of months." },
          { question: "Does a longer tenure always help?", answer: "It lowers EMI but raises total interest substantially. Balance monthly comfort against lifetime cost." },
          { question: "What is amortization?", answer: "The gradual payoff process where early payments cover mostly interest and later payments mostly principal — shown in the schedule table above." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default LoanCalculatorClient;
