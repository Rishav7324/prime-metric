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

type FireYearRow = { year: number; age: number; yearlyExpenses: number; targetCorpus: number; projectedValue: number };
type FireResult = {
  years: number; swr: number;
  yearlyExpensesAtRetirement: number; monthlyExpensesAtRetirement: number;
  corpusNeeded: number; fvCurrentSavings: number; gap: number;
  monthlySip: number; onTrack: boolean; schedule: FireYearRow[];
};

const sipForGap = (gap: number, annualReturn: number, months: number) => {
  if (gap <= 0) return 0;
  const r = annualReturn / 100 / 12;
  if (r === 0) return gap / months;
  return (gap * r) / ((Math.pow(1 + r, months) - 1) * (1 + r));
};

function computeFire(
  curAgeStr: string, retAgeStr: string, monthlyExpStr: string,
  returnStr: string, inflationStr: string, savingsStr: string, swrStr: string
): FireResult | null {
  const curAge = parseInt(curAgeStr);
  const retAge = parseInt(retAgeStr);
  const monthlyExp = parseFloat(monthlyExpStr);
  const annualReturn = parseFloat(returnStr);
  const inflation = parseFloat(inflationStr);
  const savings = parseFloat(savingsStr);
  const swr = parseFloat(swrStr);

  if (!(curAge >= 18 && curAge <= 70)) return null;
  if (!(retAge > curAge && retAge <= 80)) return null;
  if (!(monthlyExp >= 100 && monthlyExp <= 1e8)) return null;
  if (isNaN(annualReturn) || annualReturn < 1 || annualReturn > 30) return null;
  if (isNaN(inflation) || inflation < 0 || inflation > 20) return null;
  if (isNaN(savings) || savings < 0 || savings > 1e10) return null;
  if (isNaN(swr) || swr < 2 || swr > 8) return null;

  const years = retAge - curAge;
  const annualToday = monthlyExp * 12;
  const yearlyExpensesAtRetirement = annualToday * Math.pow(1 + inflation / 100, years);
  const corpusNeeded = yearlyExpensesAtRetirement / (swr / 100);
  const fvCurrentSavings = savings * Math.pow(1 + annualReturn / 100, years);
  const gap = corpusNeeded - fvCurrentSavings;
  const monthlySip = sipForGap(gap, annualReturn, years * 12);

  const schedule: FireYearRow[] = [];
  const mr = annualReturn / 100 / 12;
  for (let y = 1; y <= years; y++) {
    const yearlyExpenses = annualToday * Math.pow(1 + inflation / 100, y);
    const fvSip = monthlySip === 0
      ? 0
      : mr === 0
        ? monthlySip * y * 12
        : monthlySip * ((Math.pow(1 + mr, y * 12) - 1) / mr) * (1 + mr);
    schedule.push({
      year: y,
      age: curAge + y,
      yearlyExpenses,
      targetCorpus: yearlyExpenses / (swr / 100),
      projectedValue: savings * Math.pow(1 + annualReturn / 100, y) + fvSip,
    });
  }

  return {
    years, swr, yearlyExpensesAtRetirement,
    monthlyExpensesAtRetirement: yearlyExpensesAtRetirement / 12,
    corpusNeeded, fvCurrentSavings, gap: Math.max(gap, 0),
    monthlySip, onTrack: gap <= 0, schedule,
  };
}

const FireCalculator = () => {
  const [currentAge, setCurrentAge] = useState("30");
  const [retireAge, setRetireAge] = useState("45");
  const [monthlyExpenses, setMonthlyExpenses] = useState("50000");
  const [expectedReturn, setExpectedReturn] = useState("12");
  const [inflation, setInflation] = useState("6");
  const [currentSavings, setCurrentSavings] = useState("1000000");
  const [swr, setSwr] = useState("4");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<FireResult | null>(() => computeFire("30", "45", "50000", "12", "6", "1000000", "4"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeFire(currentAge, retireAge, monthlyExpenses, expectedReturn, inflation, currentSavings, swr);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter age (18-70), retire age above current age (max 80), expenses (100+), return (1-30%), inflation (0-20%), savings (0+)." });
      return;
    }
    setResult(computed);
    toast({ title: "FIRE Number Ready", description: `Corpus ${currencySymbol}${fmt(computed.corpusNeeded)} → SIP ${currencySymbol}${fmt(computed.monthlySip)}/mo for ${computed.years} yrs.` });
  };

  const reset = () => { setCurrentAge(""); setRetireAge(""); setMonthlyExpenses(""); setExpectedReturn(""); setInflation(""); setCurrentSavings(""); setSwr("4"); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `FIRE plan: retire at ${retireAge} in ${result.years} yrs → corpus needed ${currencySymbol}${fmt(result.corpusNeeded)} (expenses ${currencySymbol}${fmt(result.monthlyExpensesAtRetirement)}/mo at retirement, SWR ${result.swr}%), monthly SIP ${currencySymbol}${fmt(result.monthlySip)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="FIRE Retirement Simulator"
      description="Estimate your FIRE corpus with inflation, the monthly SIP needed to retire early and track yearly growth"
      keywords="fire calculator, retirement corpus calculator, early retirement planner, financial independence calculator"
      canonicalUrl="/financial-calculators/fire-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Retirement Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Current Age</Label>
                <Input type="number" min={18} max={70} value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="e.g., 30" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Retire By Age</Label>
                <Input type="number" min={19} max={80} value={retireAge} onChange={(e) => setRetireAge(e.target.value)} placeholder="e.g., 45" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Expenses Today ({currencySymbol})</Label>
              <Input type="number" min={100} value={monthlyExpenses} onChange={(e) => setMonthlyExpenses(e.target.value)} placeholder="e.g., 50000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Expected Return (%)</Label>
                <Input type="number" step={0.5} value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} placeholder="e.g., 12" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Inflation (%)</Label>
                <Input type="number" step={0.5} value={inflation} onChange={(e) => setInflation(e.target.value)} placeholder="e.g., 6" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Current Savings ({currencySymbol})</Label>
              <Input type="number" min={0} value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="e.g., 1000000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Safe Withdrawal Rate</Label>
              <Select value={swr} onValueChange={setSwr}>
                <SelectTrigger className="mt-1.5 h-10 text-sm bg-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="3.5">3.5% — Conservative</SelectItem>
                  <SelectItem value="4">4% — Standard (25x)</SelectItem>
                  <SelectItem value="5">5% — Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Simulate FIRE</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">FIRE Plan</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Corpus Needed (25x rule, SWR {result.swr}%)</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.corpusNeeded)}</p>
                <p className="text-[11px] text-neutral-500 mt-1">Monthly SIP needed: {currencySymbol}{fmt(result.monthlySip)}/mo × {result.years} yrs</p>
              </div>
              <div className={`p-3 rounded-lg border text-center text-[13px] font-semibold ${result.onTrack ? "bg-green-50 border-green-200 text-green-700" : "bg-amber-50 border-amber-200 text-amber-700"}`}>
                {result.onTrack
                  ? "✓ On Track — current savings alone cover your FIRE corpus."
                  : `⚠ Shortfall of ${currencySymbol}${fmt(result.gap)} — invest ${currencySymbol}${fmt(result.monthlySip)}/mo to close it.`}
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Expenses at Retirement</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.monthlyExpensesAtRetirement)}/mo</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Savings Grow To</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.fvCurrentSavings)}</p>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Year-by-Year Table
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">Age</th>
                        <th className="text-right font-semibold px-2.5 py-2">Expenses/yr</th>
                        <th className="text-right font-semibold px-2.5 py-2">Corpus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.age}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.yearlyExpenses)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.projectedValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🔥</div><p className="text-sm">Enter details to simulate FIRE</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The FIRE (Financial Independence, Retire Early) simulator inflates your current monthly expenses to your retirement age, then applies the 25x rule (4% safe withdrawal rate) to find your target corpus. It also back-calculates the monthly SIP needed to bridge the gap after growing your current savings."
        useCases={[
          { title: "Early Retirement Target", description: "See the exact corpus needed to quit at 40 or 45 at today's lifestyle." },
          { title: "SIP Goal Setting", description: "Convert a large corpus into a simple monthly investment figure." },
          { title: "Inflation Reality Check", description: "Watch how 6% inflation multiplies expenses over 15-20 years." },
          { title: "Coast FIRE Test", description: "Check if current savings alone can compound to your number." },
        ]}
        tips={[
          { title: "Track Real Spending", description: "Base expenses on 6-12 months of actuals, not guesses — small errors compound hugely." },
          { title: "Keep Equity Heavy Early", description: "A 10-12% long-term return assumption needs sustained equity exposure." },
          { title: "Revisit Yearly", description: "Lifestyle, inflation and returns drift — rerun this plan every year." },
        ]}
        faqs={[
          { question: "What is the 25x rule?", answer: "Save 25 times your annual retirement expenses so a 4% yearly withdrawal sustains you — corpus = yearly expenses / 0.04." },
          { question: "Is 4% withdrawal safe in India?", answer: "It is a global starting rule of thumb; many planners use 3.5% for longer retirements or higher inflation." },
          { question: "Does this include taxes?", answer: "No. Treat the corpus as pre-tax and add a buffer for capital gains and slab taxes." },
          { question: "What if I am already on track?", answer: "If your savings compounding alone covers the corpus, the required SIP shows zero — you are Coast FIRE." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default FireCalculator;
