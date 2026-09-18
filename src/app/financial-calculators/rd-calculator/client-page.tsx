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

type RdResult = {
  maturity: number; deposited: number; interest: number;
  interestShare: number;
};

function computeRd(monthlyStr: string, annualStr: string, yearsStr: string): RdResult | null {
  const monthly = parseFloat(monthlyStr);
  const annual = parseFloat(annualStr);
  const years = parseFloat(yearsStr);

  if (!(monthly > 0 && monthly <= 1e7) || isNaN(annual) || annual < 0 || annual > 15 || !(years >= 1 && years <= 10)) {
    return null;
  }

  // Monthly compounding, deposits at the start of each month
  const r = annual / 100 / 12;
  const n = Math.round(years * 12);
  const maturity = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const deposited = monthly * n;
  const interest = maturity - deposited;

  return {
    maturity, deposited, interest,
    interestShare: maturity > 0 ? (interest / maturity) * 100 : 0,
  };
}

const RdCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState("5000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("5");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<RdResult | null>(() => computeRd("5000", "7", "5"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeRd(monthlyDeposit, rate, years);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter monthly deposit (1+), rate (0-15%), years (1-10)." });
      return;
    }
    setResult(computed);
    toast({ title: "RD Projected", description: `Maturity value ${currencySymbol}${fmt(computed.maturity)} in ${years} yrs.` });
  };

  const reset = () => { setMonthlyDeposit(""); setRate(""); setYears(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `RD: ${currencySymbol}${fmt(parseFloat(monthlyDeposit))}/month at ${rate}% for ${years} yrs → Maturity ${currencySymbol}${fmt(result.maturity)} (deposited ${currencySymbol}${fmt(result.deposited)}, interest ${currencySymbol}${fmt(result.interest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Recurring Deposit (RD) Calculator"
      description="Project RD maturity with monthly compounding, deposits-vs-interest split"
      keywords="rd calculator, recurring deposit calculator, rd maturity calculator, rd interest calculator"
      canonicalUrl="/financial-calculators/rd-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Deposit Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Monthly Deposit ({currencySymbol})</Label>
              <Input type="number" min={1} value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(e.target.value)} placeholder="e.g., 5000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Interest Rate (%)</Label>
              <Input type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 7" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Tenure (Years)</Label>
              <Input type="number" min={1} max={10} value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate Maturity</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Maturity</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Maturity Value</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.maturity)}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${100 - result.interestShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${result.interestShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Deposited {(100 - result.interestShare).toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Interest {result.interestShare.toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Deposited</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.deposited)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Interest Earned</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🔁</div><p className="text-sm">Enter details to calculate maturity</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="A Recurring Deposit builds savings with a fixed monthly deposit that earns interest every month. This calculator projects the maturity value with monthly compounding, showing exactly how much of the final sum is your deposits versus interest."
        useCases={[
          { title: "Salary-Based Saving", description: "Turn a fixed slice of each paycheck into a guaranteed lump sum years later." },
          { title: "Short-Term Goals", description: "Fund a vacation, gadget or course fee with disciplined monthly deposits." },
          { title: "First-Time Savers", description: "Start small with low minimums and build a saving habit low-risk." },
          { title: "RD vs SIP Compare", description: "Weigh guaranteed RD returns against market-linked SIP projections." },
        ]}
        tips={[
          { title: "Never Miss a Deposit", description: "Banks charge penalties for missed installments and may close long-defaulted RDs." },
          { title: "Longer Means More", description: "Extending tenure boosts compounding — compare 3 vs 5 years before opening." },
          { title: "Check Tax Impact", description: "RD interest is taxable, so compare post-tax returns with alternatives." },
        ]}
        faqs={[
          { question: "How is RD interest calculated?", answer: "Each monthly deposit compounds monthly until maturity; later deposits earn less interest than earlier ones." },
          { question: "Can I withdraw an RD early?", answer: "Yes, but premature closure usually earns a lower rate minus a ~1% penalty." },
          { question: "Is RD interest taxable?", answer: "Yes, RD interest is fully taxable as income, with TDS deducted above the threshold." },
          { question: "RD vs FD — which is better?", answer: "FDs suit lump sums; RDs suit monthly savers. Rates are similar — pick based on how you receive money." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RdCalculator;
