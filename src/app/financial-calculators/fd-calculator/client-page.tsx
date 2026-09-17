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

type FdResult = {
  maturity: number; principal: number; interest: number;
  interestShare: number;
};

function computeFd(principalStr: string, annualStr: string, yearsStr: string): FdResult | null {
  const principal = parseFloat(principalStr);
  const annual = parseFloat(annualStr);
  const years = parseFloat(yearsStr);

  if (!(principal > 0 && principal <= 1e9) || isNaN(annual) || annual < 0 || annual > 15 || !(years >= 1 && years <= 30)) {
    return null;
  }

  // Quarterly compounding (standard for bank FDs)
  const quarters = Math.round(years * 4);
  const maturity = annual === 0 ? principal : principal * Math.pow(1 + annual / 400, quarters);
  const interest = maturity - principal;

  return {
    maturity, principal, interest,
    interestShare: maturity > 0 ? (interest / maturity) * 100 : 0,
  };
}

const FdCalculator = () => {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("5");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<FdResult | null>(() => computeFd("100000", "7", "5"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeFd(principal, rate, years);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter principal (1+), rate (0-15%), years (1-30)." });
      return;
    }
    setResult(computed);
    toast({ title: "FD Projected", description: `Maturity value ${currencySymbol}${fmt(computed.maturity)} in ${years} yrs.` });
  };

  const reset = () => { setPrincipal(""); setRate(""); setYears(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `FD: ${currencySymbol}${fmt(parseFloat(principal))} at ${rate}% for ${years} yrs (quarterly compounding) → Maturity ${currencySymbol}${fmt(result.maturity)} (interest ${currencySymbol}${fmt(result.interest)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Fixed Deposit (FD) Calculator"
      description="Estimate FD maturity value with quarterly compounding, principal-vs-interest split"
      keywords="fd calculator, fixed deposit calculator, fd maturity calculator, fd interest calculator"
      canonicalUrl="/financial-calculators/fd-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Deposit Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Principal Amount ({currencySymbol})</Label>
              <Input type="number" min={1} value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 100000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Annual Interest Rate (%)</Label>
              <Input type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 7" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Tenure (Years)</Label>
              <Input type="number" min={1} max={30} value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 5" className="mt-1.5 h-10 text-sm bg-white" />
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
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Principal {(100 - result.interestShare).toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Interest {result.interestShare.toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Principal</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.principal)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Interest Earned</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏦</div><p className="text-sm">Enter details to calculate maturity</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="A Fixed Deposit locks a lump sum with a bank for a fixed tenure at a guaranteed rate, compounded quarterly. This calculator estimates the maturity value and interest earned so you can compare tenures and rates before booking a deposit."
        useCases={[
          { title: "Compare Tenures", description: "See how 1, 3 and 5-year deposits differ before locking in your money." },
          { title: "Rate Shopping", description: "Compare bank offers side by side — small rate gaps compound into real money." },
          { title: "Emergency Fund Parking", description: "Estimate returns on idle cash parked in short-term FDs or sweep-ins." },
          { title: "Senior Citizen Benefits", description: "Factor in the extra 0.25–0.50% banks pay seniors by entering the higher rate." },
        ]}
        tips={[
          { title: "Ladder Maturities", description: "Split deposits across tenures so some money frees up every year without breaking FDs." },
          { title: "Mind Premature Penalties", description: "Breaking an FD early usually costs ~1% — keep emergency cash in savings instead." },
          { title: "Check Tax Impact", description: "FD interest is taxable; post-tax returns matter more than headline rates." },
        ]}
        faqs={[
          { question: "How is FD interest compounded?", answer: "Most banks compound FD interest quarterly: maturity = principal × (1 + rate/400)^(4 × years)." },
          { question: "Is FD interest taxable?", answer: "Yes, FD interest is fully taxable as income, and banks deduct TDS above the threshold." },
          { question: "Can I withdraw an FD early?", answer: "Yes, but banks charge a premature-withdrawal penalty (usually ~1%) on the applicable rate." },
          { question: "FD vs savings account?", answer: "FDs pay higher rates in exchange for locking money for a fixed tenure; savings accounts stay liquid but pay less." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default FdCalculator;
