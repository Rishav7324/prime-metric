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

type YearRow = { year: number; invested: number; value: number };
type SipResult = {
  futureValue: number; totalInvested: number; wealthGained: number;
  investedShare: number; schedule: YearRow[];
};

const futureValueAt = (p: number, r: number, n: number) =>
  r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

function computeSip(pStr: string, annualStr: string, yearsStr: string): SipResult | null {
  const p = parseFloat(pStr);
  const annual = parseFloat(annualStr);
  const years = parseInt(yearsStr);

  if (!(p > 0 && p <= 1e9) || isNaN(annual) || annual < -50 || annual > 100 || !(years >= 1 && years <= 50)) {
    return null;
  }

  const r = annual / 100 / 12;
  const n = years * 12;
  const futureValue = futureValueAt(p, r, n);
  const totalInvested = p * n;

  const schedule: YearRow[] = [];
  for (let y = 1; y <= years; y++) {
    schedule.push({ year: y, invested: p * y * 12, value: futureValueAt(p, r, y * 12) });
  }

  return {
    futureValue, totalInvested, wealthGained: futureValue - totalInvested,
    investedShare: (totalInvested / futureValue) * 100, schedule,
  };
}

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [returnRate, setReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<SipResult | null>(() => computeSip("5000", "12", "10"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeSip(monthlyInvestment, returnRate, timePeriod);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter investment (1+), return (-50 to 100%), years (1-50)." });
      return;
    }
    setResult(computed);
    const yrs = parseInt(timePeriod);
    toast({ title: "SIP Projected", description: `Est. value ${currencySymbol}${fmt(computed.futureValue)} in ${yrs} yrs.` });
  };

  const reset = () => { setMonthlyInvestment(""); setReturnRate(""); setTimePeriod(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `SIP: ${currencySymbol}${fmt(parseFloat(monthlyInvestment))}/month for ${timePeriod} yrs at ${returnRate}% → Est. value ${currencySymbol}${fmt(result.futureValue)} (invested ${currencySymbol}${fmt(result.totalInvested)}, gains ${currencySymbol}${fmt(result.wealthGained)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="SIP (Systematic Investment Plan) Calculator"
      description="Project SIP growth with compounding, year-by-year breakdown and invested-vs-gains split"
      keywords="sip calculator, mutual fund sip returns, sip investment planner, compounding calculator"
      canonicalUrl="/financial-calculators/sip-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Investment Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Monthly Investment ({currencySymbol})</Label>
              <Input type="number" min={1} value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} placeholder="e.g., 5000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Expected Annual Return (%)</Label>
              <Input type="number" step={0.5} value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 12" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Time Period (Years)</Label>
              <Input type="number" min={1} max={50} value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} placeholder="e.g., 10" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Project Growth</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Projection</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Estimated Future Value</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.futureValue)}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${result.investedShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${100 - result.investedShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Invested {result.investedShare.toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Gains {(100 - result.investedShare).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Invested</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalInvested)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Wealth Gained</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.wealthGained)}</p>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Year-by-Year Growth
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">Year</th>
                        <th className="text-right font-semibold px-2.5 py-2">Invested</th>
                        <th className="text-right font-semibold px-2.5 py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.year}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.invested)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">📈</div><p className="text-sm">Enter details to project growth</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="A Systematic Investment Plan (SIP) invests a fixed sum every month into mutual funds or stocks. Returns compound over time — this calculator projects the future value using monthly compounding and shows how each year's contributions grow."
        useCases={[
          { title: "Retirement Corpus", description: "See what small monthly sums become over 20-30 years of compounding." },
          { title: "Goal Planning", description: "Work backwards from a target (education, home) to the monthly SIP needed." },
          { title: "Compare Scenarios", description: "Test return rates and durations side by side before committing." },
        ]}
        tips={[
          { title: "Start Early", description: "Time matters more than amount — 10 extra years can triple the outcome." },
          { title: "Stay Consistent", description: "Market dips buy more units (rupee-cost averaging). Don't pause SIPs in crashes." },
          { title: "Be Realistic", description: "12% is a common long-term equity assumption, not a guarantee." },
        ]}
        faqs={[
          { question: "What is a SIP?", answer: "A fixed amount auto-invested at regular intervals (usually monthly) into mutual funds — disciplined, automatic wealth building." },
          { question: "Is the projected return guaranteed?", answer: "No. Market returns vary; treat projections as estimates and review annually." },
          { question: "SIP vs lump sum?", answer: "SIPs smooth market timing risk via averaging; lump sums win if invested right before a rally — but timing is hard." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SipCalculator;
