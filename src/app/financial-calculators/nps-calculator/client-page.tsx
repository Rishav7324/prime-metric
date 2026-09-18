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

type NpsYearRow = { year: number; invested: number; value: number };
type NpsResult = {
  corpus: number; totalInvested: number; wealthGained: number;
  annuityAmount: number; lumpsum: number; monthlyPension: number;
  years: number; schedule: NpsYearRow[];
};

const RETIREMENT_AGE = 60;
const ANNUITY_RATE = 0.06;

const futureValueAt = (p: number, r: number, n: number) =>
  r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

function computeNps(contribStr: string, ageStr: string, returnStr: string, annuityStr: string): NpsResult | null {
  const contrib = parseFloat(contribStr);
  const age = parseInt(ageStr);
  const expected = parseFloat(returnStr);
  const annuityPct = parseFloat(annuityStr);

  if (!(contrib >= 100 && contrib <= 1e7) || !(age >= 18 && age < RETIREMENT_AGE) || isNaN(expected) || expected < 1 || expected > 30 || isNaN(annuityPct) || annuityPct < 0 || annuityPct > 100) {
    return null;
  }

  const years = RETIREMENT_AGE - age;
  const r = expected / 100 / 12;
  const n = years * 12;
  const corpus = futureValueAt(contrib, r, n);
  const totalInvested = contrib * n;
  const annuityAmount = corpus * (annuityPct / 100);

  const schedule: NpsYearRow[] = [];
  for (let y = 1; y <= years; y++) {
    schedule.push({ year: y, invested: contrib * y * 12, value: futureValueAt(contrib, r, y * 12) });
  }

  return {
    corpus, totalInvested, wealthGained: corpus - totalInvested,
    annuityAmount, lumpsum: corpus - annuityAmount,
    monthlyPension: (annuityAmount * ANNUITY_RATE) / 12,
    years, schedule,
  };
}

const NpsCalculator = () => {
  const [contribution, setContribution] = useState("10000");
  const [age, setAge] = useState("30");
  const [expectedReturn, setExpectedReturn] = useState("10");
  const [annuityPct, setAnnuityPct] = useState("40");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<NpsResult | null>(() => computeNps("10000", "30", "10", "40"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeNps(contribution, age, expectedReturn, annuityPct);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter contribution (100+), age (18-59), return (1-30%), annuity (0-100%)." });
      return;
    }
    setResult(computed);
    toast({ title: "NPS Projected", description: `Est. corpus ${currencySymbol}${fmt(computed.corpus)} with pension ${currencySymbol}${fmt(computed.monthlyPension)}/mo.` });
  };

  const reset = () => { setContribution(""); setAge(""); setExpectedReturn(""); setAnnuityPct(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `NPS: ${currencySymbol}${fmt(parseFloat(contribution))}/month from age ${age} at ${expectedReturn}% → Corpus ${currencySymbol}${fmt(result.corpus)} (annuity ${annuityPct}% = ${currencySymbol}${fmt(result.annuityAmount)}, pension ~${currencySymbol}${fmt(result.monthlyPension)}/mo). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="NPS Calculator – Corpus, Pension & Annuity"
      description="Project NPS Tier-1 corpus at retirement with monthly compounding, annuity split and pension estimate"
      keywords="nps calculator, national pension scheme calculator, nps corpus calculator, retirement pension estimator"
      canonicalUrl="/financial-calculators/nps-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Contribution Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Monthly Contribution ({currencySymbol})</Label>
              <Input type="number" min={100} value={contribution} onChange={(e) => setContribution(e.target.value)} placeholder="e.g., 10000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Current Age (retire at 60)</Label>
              <Input type="number" min={18} max={59} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Expected Return (%/yr)</Label>
              <Input type="number" step={0.5} min={1} max={30} value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} placeholder="e.g., 10" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annuity Purchase (%)</Label>
              <Input type="number" step={5} min={0} max={100} value={annuityPct} onChange={(e) => setAnnuityPct(e.target.value)} placeholder="e.g., 40" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <p className="text-[11px] text-neutral-500">Pension assumes a 6% annuity rate on the annuity portion.</p>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Project Corpus</Button>
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
                <p className="text-xs text-neutral-500">Est. Corpus at 60 ({result.years} yrs)</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.corpus)}</p>
                <p className="text-xs text-neutral-500 mt-1">≈ {currencySymbol}{fmt(result.monthlyPension)}/mo pension</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Annuity ({annuityPct}%)</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.annuityAmount)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Tax-Free Lump Sum</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.lumpsum)}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Invested</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalInvested)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Growth</p>
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
              <div className="text-center"><div className="text-4xl mb-2">🧾</div><p className="text-sm">Enter details to project corpus</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The National Pension System Tier-1 account turns small monthly contributions into a retirement corpus through market-linked compounding. At 60, part of the corpus buys an annuity that pays a lifelong monthly pension while the rest can be withdrawn as a lump sum — this calculator projects both halves instantly."
        useCases={[
          { title: "Pension Targeting", description: "Work out the monthly contribution needed for your desired post-retirement income." },
          { title: "Annuity Trade-Offs", description: "Compare 40% versus higher annuity shares to balance monthly pension against lump sum." },
          { title: "Early Starter Edge", description: "Show how starting at 25 instead of 35 multiplies the corpus through extra compounding." },
          { title: "Tax Planning", description: "Pair NPS projections with 80CCD deductions to weigh tax savings against lock-in." },
        ]}
        tips={[
          { title: "Keep 40%+ Annuity in Mind", description: "Rules generally require annuitizing at least 40% — don't plan on withdrawing everything." },
          { title: "Stay Equity-Heavy Early", description: "Younger investors can use higher equity allocation, then shift safer near retirement." },
          { title: "Treat Pension as Approximate", description: "Actual annuity rates vary by insurer and age — 6% is a planning placeholder, not a quote." },
        ]}
        faqs={[
          { question: "What is NPS Tier-1?", answer: "The main retirement account with tax benefits and withdrawal restrictions until age 60 — ideal for long-term pension building." },
          { question: "How is the monthly pension estimated?", answer: "The annuity portion is multiplied by an assumed 6% yearly annuity rate and divided by 12. Real payouts depend on prevailing annuity plans." },
          { question: "Is the lump sum taxable?", answer: "Up to 60% of the corpus withdrawn as a lump sum at maturity is currently tax-exempt; annuity pension received later is taxable as income." },
          { question: "What return should I assume?", answer: "10% reflects a blended equity-heavy portfolio historically, but NPS returns are market-linked — test 8-12% scenarios." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default NpsCalculator;
