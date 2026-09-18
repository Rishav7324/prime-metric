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

type AnnuityYearRow = { year: number; yearlyPayout: number; cumulative: number; recoveredPct: number };
type AnnuityResult = {
  lumpSum: number; rate: number; frequency: string;
  annualPension: number; monthlyPension: number; periodPayout: number;
  totalPaid: number; breakEvenYears: number; schedule: AnnuityYearRow[];
};

const HORIZON_YEARS = 25;

function computeAnnuity(lumpStr: string, rateStr: string, freqStr: string): AnnuityResult | null {
  const lumpSum = parseFloat(lumpStr);
  const rate = parseFloat(rateStr);

  if (isNaN(lumpSum) || lumpSum < 10000 || lumpSum > 1e10) return null;
  if (isNaN(rate) || rate < 0.1 || rate > 15) return null;
  if (freqStr !== "monthly" && freqStr !== "quarterly" && freqStr !== "yearly") return null;

  const annualPension = lumpSum * (rate / 100);
  const monthlyPension = annualPension / 12;
  const periodPayout = freqStr === "monthly" ? monthlyPension : freqStr === "quarterly" ? annualPension / 4 : annualPension;

  const schedule: AnnuityYearRow[] = [];
  for (let y = 1; y <= HORIZON_YEARS; y++) {
    const cumulative = annualPension * y;
    schedule.push({ year: y, yearlyPayout: annualPension, cumulative, recoveredPct: (cumulative / lumpSum) * 100 });
  }

  return {
    lumpSum, rate, frequency: freqStr,
    annualPension, monthlyPension, periodPayout,
    totalPaid: annualPension * HORIZON_YEARS,
    breakEvenYears: annualPension > 0 ? lumpSum / annualPension : 0,
    schedule,
  };
}

const AnnuityCalculator = () => {
  const [lumpSum, setLumpSum] = useState("5000000");
  const [annuityRate, setAnnuityRate] = useState("7.5");
  const [frequency, setFrequency] = useState("monthly");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<AnnuityResult | null>(() => computeAnnuity("5000000", "7.5", "monthly"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const freqLabel = frequency === "monthly" ? "month" : frequency === "quarterly" ? "quarter" : "year";

  const calculate = () => {
    const computed = computeAnnuity(lumpSum, annuityRate, frequency);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter lump sum (10,000+), annuity rate (0.1-15%), and a payout frequency." });
      return;
    }
    setResult(computed);
    toast({ title: "Pension Estimated", description: `Pension ${currencySymbol}${fmt(computed.monthlyPension)}/mo at ${annuityRate}% annuity rate.` });
  };

  const reset = () => { setLumpSum(""); setAnnuityRate(""); setFrequency("monthly"); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Annuity: ${currencySymbol}${fmt(parseFloat(lumpSum))} at ${annuityRate}% → pension ${currencySymbol}${fmt(result.monthlyPension)}/mo (${currencySymbol}${fmt(result.periodPayout)}/${freqLabel}), ${HORIZON_YEARS}-yr payout ${currencySymbol}${fmt(result.totalPaid)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Annuity Pension Estimator"
      description="Convert a lump sum into monthly pension using the annuity rate, with a yearly principal-vs-payout table"
      keywords="annuity calculator, pension calculator, annuity rate estimator, retirement pension planner"
      canonicalUrl="/financial-calculators/annuity-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Annuity Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Lump Sum Corpus ({currencySymbol})</Label>
              <Input type="number" min={10000} value={lumpSum} onChange={(e) => setLumpSum(e.target.value)} placeholder="e.g., 5000000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annuity Rate (% per year)</Label>
              <Input type="number" step={0.1} value={annuityRate} onChange={(e) => setAnnuityRate(e.target.value)} placeholder="e.g., 7.5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Payout Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="mt-1.5 h-10 text-sm bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Estimate Pension</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Pension Estimate</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Monthly Pension</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.monthlyPension)}</p>
                <p className="text-[11px] text-neutral-500 mt-1">{currencySymbol}{fmt(result.periodPayout)} per {freqLabel} at {result.rate}% annuity rate</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Yearly Pension</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.annualPension)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">25-Yr Total Payout</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.totalPaid)}</p>
                </div>
              </div>
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-center">
                <p className="text-xs text-neutral-500">Break-even (payouts equal principal)</p>
                <p className="text-base font-bold text-black">~{result.breakEvenYears.toFixed(1)} years</p>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Yearly Payout Table
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">Year</th>
                        <th className="text-right font-semibold px-2.5 py-2">Payout</th>
                        <th className="text-right font-semibold px-2.5 py-2">Cumulative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.year}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.yearlyPayout)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.cumulative)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏦</div><p className="text-sm">Enter details to estimate pension</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="An annuity converts a one-time lump sum into guaranteed periodic pension for life. Enter your corpus and the insurer's annuity rate to get the monthly payout instantly, plus a year-by-year table comparing principal against cumulative payouts."
        useCases={[
          { title: "Retirement Paycheck", description: "Turn EPF, gratuity or sale proceeds into a steady monthly income." },
          { title: "Rate Shopping", description: "Compare how 7% vs 8% annuity rates change pension for life." },
          { title: "Corpus Targeting", description: "Work backwards from a desired pension to the lump sum needed." },
          { title: "NPS Planning", description: "Preview the pension leg of NPS before locking in an annuity plan." },
        ]}
        tips={[
          { title: "NPS 40% Annuity Rule", description: "NPS/UPS exits typically require annuitising at least 40% of the corpus — check current rules before withdrawing." },
          { title: "Lock Rates When High", description: "Annuity payouts rise with interest rates; deferring purchase can pay off." },
          { title: "Mind Inflation", description: "Fixed pensions lose buying power — keep part of your corpus in growth assets." },
        ]}
        faqs={[
          { question: "How is monthly pension calculated?", answer: "Annual pension = lump sum × annuity rate; monthly = annual / 12. A 5,000,000 corpus at 7.5% pays 375,000 yearly, about 31,250 monthly." },
          { question: "Is the annuity principal returned?", answer: "Most life annuities pay only income; return-of-purchase options pay less monthly but refund principal to nominees." },
          { question: "Are annuity payouts taxable?", answer: "Yes, in India annuity pension is taxed as income at your slab rate." },
          { question: "What affects the annuity rate?", answer: "Age, interest rates, payout frequency and plan options — older buyers and higher rates get bigger pensions." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default AnnuityCalculator;
