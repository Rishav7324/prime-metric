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

type PpfResult = {
  maturity: number; deposited: number; interest: number;
  interestShare: number;
};

function computePpf(yearlyStr: string, annualStr: string, yearsStr: string): PpfResult | null {
  const yearly = parseFloat(yearlyStr);
  const annual = parseFloat(annualStr);
  const years = parseInt(yearsStr);

  if (!(yearly >= 500 && yearly <= 150000) || isNaN(annual) || annual < 0 || annual > 15 || !(years >= 15 && years <= 50)) {
    return null;
  }

  // Yearly compounding, deposits at the start of each year
  const r = annual / 100;
  const maturity = r === 0 ? yearly * years : yearly * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
  const deposited = yearly * years;
  const interest = maturity - deposited;

  return {
    maturity, deposited, interest,
    interestShare: maturity > 0 ? (interest / maturity) * 100 : 0,
  };
}

const PpfCalculator = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState("150000");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PpfResult | null>(() => computePpf("150000", "7.1", "15"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const yearly = parseFloat(yearlyDeposit);
    if (!isNaN(yearly) && yearly > 150000) {
      toast({ variant: "destructive", title: "Over PPF Limit", description: `Yearly deposits are capped at ${currencySymbol}150,000 per financial year.` });
      return;
    }
    const computed = computePpf(yearlyDeposit, rate, years);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: `Yearly deposit (${currencySymbol}500-${currencySymbol}150,000), rate (0-15%), years (15-50).` });
      return;
    }
    setResult(computed);
    toast({ title: "PPF Projected", description: `Maturity value ${currencySymbol}${fmt(computed.maturity)} in ${years} yrs.` });
  };

  const reset = () => { setYearlyDeposit(""); setRate(""); setYears(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `PPF: ${currencySymbol}${fmt(parseFloat(yearlyDeposit))}/year at ${rate}% for ${years} yrs → Maturity ${currencySymbol}${fmt(result.maturity)} (deposited ${currencySymbol}${fmt(result.deposited)}, tax-free interest ${currencySymbol}${fmt(result.interest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="PPF (Public Provident Fund) Calculator"
      description="Project PPF maturity with yearly compounding, deposits-vs-tax-free-interest split"
      keywords="ppf calculator, public provident fund calculator, ppf maturity calculator, ppf interest calculator"
      canonicalUrl="/financial-calculators/ppf-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">PPF Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Yearly Deposit ({currencySymbol})</Label>
              <Input type="number" min={500} max={150000} value={yearlyDeposit} onChange={(e) => setYearlyDeposit(e.target.value)} placeholder="e.g., 150000" className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-[11px] text-neutral-500 mt-1">Min {currencySymbol}500 – max {currencySymbol}150,000 per financial year.</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Interest Rate (%)</Label>
              <Input type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 7.1" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Duration (Years)</Label>
              <Input type="number" min={15} max={50} value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 15" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Project Maturity</Button>
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
                <p className="text-xs text-neutral-500">Maturity Value (Tax-Free)</p>
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
                  <p className="text-xs text-neutral-500">Tax-Free Interest</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏛️</div><p className="text-sm">Enter details to project maturity</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Public Provident Fund is a government-backed savings scheme with a 15-year lock-in, currently paying 7.1% compounded yearly. Deposits up to 150,000 per year earn fully tax-free interest, making PPF a cornerstone of long-term, government-backed long-term savings in India."
        useCases={[
          { title: "Retirement Corpus", description: "Project 15-30 years of max deposits into a guaranteed tax-free retirement sum." },
          { title: "Child's Future", description: "Open a PPF for a minor and let 15+ years of compounding fund education costs." },
          { title: "Tax Saving (80C)", description: "Plan deposits that double as deductions under Section 80C up to the yearly cap." },
          { title: "Extension Planning", description: "Model 5-year block extensions after maturity to keep tax-free growth running." },
        ]}
        tips={[
          { title: "Deposit Before April 5", description: "Interest counts the lowest balance between the 5th and month-end — deposit early in April." },
          { title: "Max the Cap Yearly", description: "Fill the full 150,000 allowance each year; unused allowance cannot be carried forward." },
          { title: "Extend in Blocks", description: "After 15 years, extend in 5-year blocks with or without fresh deposits to keep earning." },
        ]}
        examples={[
          {
            title: "150,000 per year at 7.1% for 15 years",
            description: "Depositing the full 150,000 yearly at 7.1% for 15 years matures to about 4,068,209 on 2,250,000 deposited.",
            steps: [
              "Yearly rate r = 0.071 and years n = 15, with deposits at the start of each year.",
              "Maturity = 150,000 x ((1.071^15 - 1) / 0.071) x 1.071 = 150,000 x 25.3589 = 4,068,209 (rounded).",
              "Interest = 4,068,209 - 2,250,000 = 1,818,209, fully tax-free under EEE status.",
            ],
          },
          {
            title: "50,000 per year at 7.1% for 15 years",
            description: "Depositing 50,000 yearly at 7.1% for 15 years matures to about 1,356,070 on 750,000 deposited.",
            steps: [
              "Same factor 25.3589 as above since rate and tenure match: maturity = 50,000 x 25.3589 = 1,356,070 (rounded).",
              "Total deposited = 50,000 x 15 = 750,000, so interest = 1,356,070 - 750,000 = 606,070.",
              "Tripling the deposit to 150,000 triples the maturity to 4,068,209, showing PPF scales linearly with deposits.",
            ],
          },
        ]}
        faqs={[
          { question: "What is the PPF deposit limit?", answer: "Minimum 500 and maximum 150,000 per financial year; excess deposits earn no interest and are returned." },
          { question: "Is PPF interest taxable?", answer: "No. PPF enjoys EEE status — deposits (up to 80C limits), interest and maturity are all tax-free." },
          { question: "Can I withdraw PPF early?", answer: "Partial withdrawals are allowed from year 7, and full closure is possible after 5 years on specific grounds with a 1% rate cut." },
          { question: "What happens after 15 years?", answer: "You can withdraw fully or extend indefinitely in 5-year blocks, with or without new deposits." },
          { question: "How much does extending PPF from 15 to 20 years add at full deposits?", answer: "Depositing 150,000 yearly at 7.1% gives about 4,068,209 after 15 years on 2,250,000 deposited. Continuing to 20 years gives about 6,658,288 on 3,000,000 deposited — the extra 5 years add roughly 2,590,079 of tax-free value on only 750,000 of extra deposits." },
          { question: "What is the cost of depositing only 100,000 instead of 150,000 each year?", answer: "At 7.1% for 15 years, 150,000 per year matures to about 4,068,209 while 100,000 per year matures to about 2,712,139. Skipping 50,000 per year leaves roughly 1,356,070 of tax-free maturity on the table." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PpfCalculator;
