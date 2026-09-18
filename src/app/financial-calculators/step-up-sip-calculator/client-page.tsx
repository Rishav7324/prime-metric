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
type StepUpSipResult = {
  futureValue: number; totalInvested: number; wealthGained: number;
  investedShare: number; schedule: YearRow[];
};

function computeStepUpSip(pStr: string, stepStr: string, annualStr: string, yearsStr: string): StepUpSipResult | null {
  const p = parseFloat(pStr);
  const step = parseFloat(stepStr);
  const annual = parseFloat(annualStr);
  const years = parseInt(yearsStr);

  if (!(p > 0 && p <= 1e9) || isNaN(step) || step < 0 || step > 100 || isNaN(annual) || annual < -50 || annual > 100 || !(years >= 1 && years <= 50)) {
    return null;
  }

  const r = annual / 100 / 12;
  const s = step / 100;
  let balance = 0;
  let invested = 0;
  const schedule: YearRow[] = [];

  for (let y = 1; y <= years; y++) {
    const monthly = p * Math.pow(1 + s, y - 1);
    for (let m = 0; m < 12; m++) {
      balance = (balance + monthly) * (1 + r);
      invested += monthly;
    }
    schedule.push({ year: y, invested, value: balance });
  }

  return {
    futureValue: balance, totalInvested: invested, wealthGained: balance - invested,
    investedShare: (invested / balance) * 100, schedule,
  };
}

const StepUpSipCalculator = () => {
  const [monthlySip, setMonthlySip] = useState("10000");
  const [stepUp, setStepUp] = useState("10");
  const [returnRate, setReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<StepUpSipResult | null>(() => computeStepUpSip("10000", "10", "12", "10"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeStepUpSip(monthlySip, stepUp, returnRate, timePeriod);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter SIP (1+), step-up (0-100%), return (-50 to 100%), years (1-50)." });
      return;
    }
    setResult(computed);
    toast({ title: "Step-Up SIP Projected", description: `Est. value ${currencySymbol}${fmt(computed.futureValue)} in ${parseInt(timePeriod)} yrs.` });
  };

  const reset = () => { setMonthlySip(""); setStepUp(""); setReturnRate(""); setTimePeriod(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Step-up SIP: ${currencySymbol}${fmt(parseFloat(monthlySip))}/month +${stepUp}%/yr for ${timePeriod} yrs at ${returnRate}% → Est. value ${currencySymbol}${fmt(result.futureValue)} (invested ${currencySymbol}${fmt(result.totalInvested)}, gains ${currencySymbol}${fmt(result.wealthGained)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Step-Up SIP Calculator with Annual Hike"
      description="Project step-up SIP growth as yearly hikes compound, with a year-by-year schedule"
      keywords="step up sip calculator, sip step up returns, annual increase sip planner, sip hike calculator"
      canonicalUrl="/financial-calculators/step-up-sip-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Investment Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Monthly SIP ({currencySymbol})</Label>
              <Input type="number" min={1} value={monthlySip} onChange={(e) => setMonthlySip(e.target.value)} placeholder="e.g., 10000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Step-Up (%)</Label>
              <Input type="number" min={0} max={100} step={0.5} value={stepUp} onChange={(e) => setStepUp(e.target.value)} placeholder="e.g., 10" className="mt-1.5 h-10 text-sm bg-white" />
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
        aboutContent="A step-up SIP raises your monthly investment by a fixed percentage every year, so contributions grow alongside your salary. Even a 10% yearly hike can nearly double the final corpus versus a flat SIP. This calculator compounds monthly instalments with yearly step-ups and shows invested versus value for each year."
        useCases={[
          { title: "Salary-Linked Investing", description: "Match SIP hikes to annual appraisals so lifestyle upgrades never crowd out savings." },
          { title: "Corpus Acceleration", description: "See how much faster you hit a target when contributions rise instead of staying flat." },
          { title: "Late Starters", description: "A small SIP today plus aggressive step-ups can still catch up on missed years." },
          { title: "Flat vs Step-Up Compare", description: "Run both scenarios to quantify exactly what yearly hikes are worth." },
        ]}
        tips={[
          { title: "Mirror Your Hike", description: "Set the step-up near your expected salary growth so investing stays painless." },
          { title: "Start Modest, Hike Bold", description: "A lower starting SIP with 10-15% step-ups beats an overstretched flat SIP." },
          { title: "Review Yearly", description: "Revisit the step-up each appraisal cycle — pause hikes, never the SIP itself." },
        ]}
        faqs={[
          { question: "What is a step-up SIP?", answer: "A SIP that automatically increases by a chosen percentage each year, keeping investments in step with rising income." },
          { question: "What step-up percentage is realistic?", answer: "8-12% mirrors typical salary growth; higher works if income is rising fast and expenses stay controlled." },
          { question: "Does every fund allow step-ups?", answer: "Most major funds and platforms support auto step-up mandates; otherwise raise the SIP manually each year." },
          { question: "Is the projected return guaranteed?", answer: "No — market returns fluctuate, so treat the projection as an estimate and review progress annually." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default StepUpSipCalculator;
