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

type SsyResult = {
  maturity: number; totalInvested: number; interest: number; maturityAge: number;
};

function computeSsy(depositStr: string, ageStr: string, rateStr: string): SsyResult | null {
  const deposit = parseFloat(depositStr);
  const age = parseFloat(ageStr);
  const rate = parseFloat(rateStr);

  if (!(deposit >= 1500 && deposit <= 150000) || !(age >= 0 && age <= 10) || isNaN(rate) || rate < 0 || rate > 20) {
    return null;
  }

  // Deposits in years 1-15 (start of each year), compounding annually until year 21
  const r = rate / 100;
  let maturity = 0;
  for (let k = 0; k < 15; k++) {
    maturity += deposit * Math.pow(1 + r, 21 - k);
  }
  const totalInvested = deposit * 15;

  return {
    maturity, totalInvested, interest: maturity - totalInvested, maturityAge: age + 21,
  };
}

const SsyCalculator = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState("150000");
  const [girlAge, setGirlAge] = useState("5");
  const [interestRate, setInterestRate] = useState("8.2");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<SsyResult | null>(() => computeSsy("150000", "5", "8.2"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeSsy(yearlyDeposit, girlAge, interestRate);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter deposit (1,500-150,000), girl's age (0-10), rate (0-20%)." });
      return;
    }
    setResult(computed);
    toast({ title: "SSY Projected", description: `Maturity ${currencySymbol}${fmt(computed.maturity)} at age ${computed.maturityAge}.` });
  };

  const reset = () => { setYearlyDeposit(""); setGirlAge(""); setInterestRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `SSY: ${currencySymbol}${fmt(parseFloat(yearlyDeposit))}/yr for 15 yrs at ${interestRate}% → Maturity ${currencySymbol}${fmt(result.maturity)} (invested ${currencySymbol}${fmt(result.totalInvested)}, interest ${currencySymbol}${fmt(result.interest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="SSY Calculator – Sukanya Samriddhi Returns"
      description="Project Sukanya Samriddhi maturity over 21 years with yearly deposits and compounding"
      keywords="ssy calculator, sukanya samriddhi yojana returns, ssy maturity calculator, girl child savings"
      canonicalUrl="/financial-calculators/ssy-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Deposit Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Yearly Deposit ({currencySymbol})</Label>
              <Input type="number" min={1500} max={150000} value={yearlyDeposit} onChange={(e) => setYearlyDeposit(e.target.value)} placeholder="e.g., 150000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Girl&apos;s Current Age (0-10)</Label>
              <Input type="number" min={0} max={10} value={girlAge} onChange={(e) => setGirlAge(e.target.value)} placeholder="e.g., 5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Interest Rate (%)</Label>
              <Input type="number" step={0.1} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 8.2" className="mt-1.5 h-10 text-sm bg-white" />
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
                <p className="text-xs text-neutral-500">Maturity Value (21 Years)</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.maturity)}</p>
                <p className="text-[11px] text-neutral-500 mt-1">Payable when she turns {result.maturityAge}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${(result.totalInvested / result.maturity) * 100}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${(result.interest / result.maturity) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Deposits {((result.totalInvested / result.maturity) * 100).toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Interest {((result.interest / result.maturity) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Invested</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalInvested)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Interest Earned</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">Deposits for 15 years · compounds for 21 years</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">👧</div><p className="text-sm">Enter details to project maturity</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme for a girl child under 10, paying one of the highest small-savings rates with tax-free maturity. Deposits run for 15 years while the balance compounds for a full 21 years. This calculator projects maturity, total deposits and interest earned."
        useCases={[
          { title: "Education Fund", description: "Check whether maximum yearly deposits will cover projected college costs at age 18-21." },
          { title: "Deposit Sizing", description: "Work backwards from a target maturity to the yearly amount you must save." },
          { title: "Rate Comparisons", description: "Compare SSY's tax-free return against PPF, FDs or mutual funds for the same horizon." },
          { title: "Second Child Planning", description: "Model separate accounts for two daughters without mixing up the timelines." },
        ]}
        tips={[
          { title: "Deposit Early Each Year", description: "Money deposited at the year's start earns a full extra year of compounding." },
          { title: "Max Out the Cap", description: "The 150,000 yearly ceiling plus 21 years of compounding creates most of the growth." },
          { title: "Track Rate Revisions", description: "The rate is reset periodically — re-run this calculator when it changes." },
        ]}
        faqs={[
          { question: "Who can open an SSY account?", answer: "A parent or guardian for a girl child below age 10 — one account per girl, up to two daughters per family." },
          { question: "How long do deposits and maturity run?", answer: "Deposits for 15 years from opening; the account matures after 21 years with no deposits needed in the last 6." },
          { question: "What are the deposit limits?", answer: "A minimum of 1,500 and a maximum of 150,000 per financial year, in any number of instalments." },
          { question: "Is SSY maturity taxable?", answer: "No — deposits qualify for deduction and both interest and maturity are fully tax-free." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SsyCalculator;
