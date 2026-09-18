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

type Slab = { upTo: number; rate: number };

// Simplified FY 2024-25 slabs (no surcharge, no 87A rebate). Stated in tips + FAQ.
const NEW_SLABS: Slab[] = [
  { upTo: 300000, rate: 0 },
  { upTo: 600000, rate: 0.05 },
  { upTo: 900000, rate: 0.10 },
  { upTo: 1200000, rate: 0.15 },
  { upTo: 1500000, rate: 0.20 },
  { upTo: Infinity, rate: 0.30 },
];

const OLD_SLABS: Slab[] = [
  { upTo: 250000, rate: 0 },
  { upTo: 500000, rate: 0.05 },
  { upTo: 1000000, rate: 0.20 },
  { upTo: Infinity, rate: 0.30 },
];

const STANDARD_DEDUCTION = 50000;
const CESS_RATE = 0.04;

function slabTax(income: number, slabs: Slab[]): number {
  let tax = 0;
  let prev = 0;
  for (const s of slabs) {
    if (income <= prev) break;
    tax += (Math.min(income, s.upTo) - prev) * s.rate;
    prev = s.upTo;
  }
  return tax;
}

type TaxResult = {
  taxableOld: number; taxableNew: number;
  taxOld: number; taxNew: number;
  better: "old" | "new" | "tie"; savings: number;
};

function computeTax(grossStr: string, c80Str: string, d80Str: string, hraStr: string): TaxResult | null {
  const gross = parseFloat(grossStr);
  const c80 = parseFloat(c80Str);
  const d80 = parseFloat(d80Str);
  const hra = parseFloat(hraStr);

  if (!(gross > 0 && gross <= 1e12)) return null;
  for (const d of [c80, d80, hra]) {
    if (isNaN(d) || d < 0 || d > gross) return null;
  }

  const taxableNew = Math.max(0, gross - STANDARD_DEDUCTION);
  const taxableOld = Math.max(0, gross - STANDARD_DEDUCTION - Math.min(c80, 150000) - d80 - hra);

  const taxNew = slabTax(taxableNew, NEW_SLABS) * (1 + CESS_RATE);
  const taxOld = slabTax(taxableOld, OLD_SLABS) * (1 + CESS_RATE);

  const diff = taxOld - taxNew;
  const better: TaxResult["better"] = Math.abs(diff) < 1 ? "tie" : diff > 0 ? "new" : "old";

  return { taxableOld, taxableNew, taxOld, taxNew, better, savings: Math.abs(diff) };
}

const TaxRegimeCalculatorClient = () => {
  const [gross, setGross] = useState("1200000");
  const [c80, setC80] = useState("150000");
  const [d80, setD80] = useState("25000");
  const [hra, setHra] = useState("30000");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<TaxResult | null>(() =>
    computeTax("1200000", "150000", "25000", "30000"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeTax(gross, c80, d80, hra);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter gross salary (1+) and deductions (0 up to gross salary)." });
      return;
    }
    setResult(computed);
    const msg = computed.better === "tie" ? "both regimes cost the same"
      : computed.better === "new" ? "new regime saves tax" : "old regime saves tax";
    toast({ title: "Tax Compared", description: `Old: ${currencySymbol}${fmt(computed.taxOld)}, New: ${currencySymbol}${fmt(computed.taxNew)} — ${msg}.` });
  };

  const reset = () => { setGross(""); setC80(""); setD80(""); setHra(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const pick = result.better === "tie" ? "Either regime" : result.better === "new" ? "New regime" : "Old regime";
    const text = `India tax: old regime ${currencySymbol}${fmt(result.taxOld)} vs new regime ${currencySymbol}${fmt(result.taxNew)}. ${pick} wins, saves ${currencySymbol}${fmt(result.savings)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Tax Regime Calculator – Old vs New"
      description="Compare old vs new regime tax on your salary with simplified FY slabs, deductions and cess to pick the lower-tax option fast"
      keywords="india tax regime calculator, old vs new regime, income tax calculator india, new tax regime slabs, 80c deduction calculator"
      canonicalUrl="/financial-calculators/tax-regime-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Salary & Deductions</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Gross Annual Salary ({currencySymbol})</Label>
              <Input type="number" min={1} value={gross} onChange={(e) => setGross(e.target.value)} placeholder="e.g., 1200000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">80C (max 150k)</Label>
                <Input type="number" min={0} value={c80} onChange={(e) => setC80(e.target.value)} placeholder="e.g., 150000" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">80D Premium</Label>
                <Input type="number" min={0} value={d80} onChange={(e) => setD80(e.target.value)} placeholder="e.g., 25000" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">HRA Exempt ({currencySymbol})</Label>
              <Input type="number" min={0} value={hra} onChange={(e) => setHra(e.target.value)} placeholder="e.g., 30000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">Standard deduction {currencySymbol}{STANDARD_DEDUCTION.toLocaleString("en-US")} applied to both regimes automatically.</p>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Compare Regimes</Button>
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
                <div className="text-xs text-neutral-500 mb-1">Recommendation</div>
                <div className="text-xl font-bold text-[#F2765E]">
                  {result.better === "tie" ? "Either regime — same tax"
                    : result.better === "new" ? "New regime wins" : "Old regime wins"}
                </div>
                <div className="text-xs text-neutral-600 mt-1 font-medium">
                  {result.better === "tie" ? "Difference is under a rupee/dollar" : `Saves ${currencySymbol}${fmt(result.savings)} in tax`}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className={`p-3 rounded-lg border text-center ${result.better === "old" ? "bg-[#FFF5F2] border-[#F2765E]/40" : "bg-neutral-50 border-neutral-200"}`}>
                  <div className="text-xs text-neutral-500">Old Regime Tax</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.taxOld)}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">on {currencySymbol}{fmt(result.taxableOld)}</div>
                </div>
                <div className={`p-3 rounded-lg border text-center ${result.better === "new" ? "bg-[#FFF5F2] border-[#F2765E]/40" : "bg-neutral-50 border-neutral-200"}`}>
                  <div className="text-xs text-neutral-500">New Regime Tax</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.taxNew)}</div>
                  <div className="text-[11px] text-neutral-500 mt-0.5">on {currencySymbol}{fmt(result.taxableNew)}</div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">Simplified FY 2024-25 slabs + 4% cess. Old: 0–2.5L nil, 2.5–5L 5%, 5–10L 20%, &gt;10L 30%. New: 0–3L nil, 3–6L 5%, 6–9L 10%, 9–12L 15%, 12–15L 20%, &gt;15L 30%.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🧾</div><p className="text-sm">Enter salary to compare regimes</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Tax Regime Calculator compares your India income tax under the old regime (with 80C, 80D and HRA deductions) against the new regime (lower slab rates, almost no deductions). It uses a simplified FY 2024-25 slab table plus 4% cess and recommends whichever leaves you with the lower bill."
        useCases={[
          { title: "Salaried Regime Pick", description: "Decide old vs new before the financial year investment proofs are due." },
          { title: "Deduction Payoff Check", description: "See if your 80C + HRA savings actually beat the new slab rates." },
          { title: "Raise Planning", description: "Preview which regime wins after a hike pushes you into a higher slab." },
          { title: "HR Declarations", description: "Back your Form 12BB regime choice with a quick comparison." },
        ]}
        tips={[
          { title: "Know the Simplified Table", description: "New: 0–3L nil, 3–6L 5%, 6–9L 10%, 9–12L 15%, 12–15L 20%, above 15L 30%. Old: 0–2.5L nil, 2.5–5L 5%, 5–10L 20%, above 10L 30%. Both get 4% cess here." },
          { title: "Big Deductions Favor Old", description: "80C at the full 150k plus HRA usually tips the scales toward the old regime." },
          { title: "No Deductions? Go New", description: "With zero 80C/HRA claims the new regime almost always wins." },
        ]}
        examples={[
          {
            title: "12,00,000 salary with 2,05,000 of deductions",
            description: "At 12,00,000 gross with 80C 1,50,000 plus 80D 25,000 plus HRA 30,000, the new regime wins by 19,760.",
            steps: [
              "Taxable new = 12,00,000 - 50,000 = 11,50,000; slab tax = 15,000 + 30,000 + 37,500 = 82,500; plus 4% cess = 85,800.",
              "Taxable old = 12,00,000 - 50,000 - 1,50,000 - 25,000 - 30,000 = 9,45,000; slab tax = 12,500 + 89,000 = 1,01,500; plus 4% cess = 1,05,560.",
              "New regime saves 1,05,560 - 85,800 = 19,760 despite full 80C claims.",
            ],
          },
          {
            title: "8,00,000 salary with the same 2,05,000 of deductions",
            description: "At 8,00,000 gross with identical deductions, the old regime wins by 8,840 — the opposite result.",
            steps: [
              "Taxable new = 8,00,000 - 50,000 = 7,50,000; slab tax = 15,000 + 15,000 = 30,000; plus 4% cess = 31,200.",
              "Taxable old = 8,00,000 - 50,000 - 1,50,000 - 25,000 - 30,000 = 5,45,000; slab tax = 12,500 + 9,000 = 21,500; plus 4% cess = 22,360.",
              "Old regime saves 31,200 - 22,360 = 8,840, showing lower incomes with big deductions still favor old.",
            ],
          },
        ]}
        faqs={[
          { question: "Which slab table does this calculator use?", answer: "A simplified FY 2024-25 table: New regime 0–3L nil, 3–6L 5%, 6–9L 10%, 9–12L 15%, 12–15L 20%, above 15L 30%; Old regime 0–2.5L nil, 2.5–5L 5%, 5–10L 20%, above 10L 30%; plus 4% health & education cess on both. Surcharge and section 87A rebates are ignored." },
          { question: "What deductions are considered?", answer: "Standard deduction of 50000 for both regimes, plus 80C (capped at 150000), 80D premium and HRA exempt only under the old regime." },
          { question: "Is this my exact tax liability?", answer: "No — it is an estimate. Real liability adds 87A rebates, surcharge, marginal relief and other chapter VI-A deductions this tool skips." },
          { question: "Can I switch regimes every year?", answer: "Salaried individuals can generally choose each financial year, but confirm current CBDT rules before filing since conditions change." },
          { question: "I earn 12,00,000 with 80C of 1,50,000, 80D of 25,000 and HRA of 30,000 — which regime wins?", answer: "Taxable income is 11,50,000 under new versus 9,45,000 under old. Tax plus 4% cess is 85,800 under new versus 1,05,560 under old, so the new regime wins and saves 19,760 even with full 80C claimed." },
          { question: "When do big deductions still make the old regime win?", answer: "Take 8,00,000 gross with the same 2,05,000 of deductions: new-regime tax is 31,200 on 7,50,000 taxable while old-regime tax is 22,360 on 5,45,000 taxable. Here the old regime wins by 8,840 — lower salaries with full 80C plus HRA can still beat the new slabs." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TaxRegimeCalculatorClient;
