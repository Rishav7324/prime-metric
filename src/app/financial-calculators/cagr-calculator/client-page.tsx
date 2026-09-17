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

type CagrYearRow = { year: number; value: number };
type CagrResult = {
  cagr: number; multiple: number; gain: number; schedule: CagrYearRow[];
};

function computeCagr(initialStr: string, finalStr: string, yearsStr: string): CagrResult | null {
  const initial = parseFloat(initialStr);
  const final = parseFloat(finalStr);
  const years = parseInt(yearsStr);

  if (!(initial > 0 && initial <= 1e12) || !(final > 0 && final <= 1e12) || !(years >= 1 && years <= 50)) {
    return null;
  }

  const rate = Math.pow(final / initial, 1 / years) - 1;
  if (!isFinite(rate)) return null;

  const schedule: CagrYearRow[] = [];
  for (let y = 1; y <= years; y++) {
    schedule.push({ year: y, value: initial * Math.pow(1 + rate, y) });
  }

  return {
    cagr: rate * 100, multiple: final / initial, gain: final - initial, schedule,
  };
}

const CagrCalculator = () => {
  const [initialValue, setInitialValue] = useState("100000");
  const [finalValue, setFinalValue] = useState("250000");
  const [years, setYears] = useState("5");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<CagrResult | null>(() => computeCagr("100000", "250000", "5"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeCagr(initialValue, finalValue, years);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter initial & final values (1+), years (1-50)." });
      return;
    }
    setResult(computed);
    toast({ title: "CAGR Calculated", description: `Growth rate ${computed.cagr.toFixed(2)}% per year over ${years} yrs.` });
  };

  const reset = () => { setInitialValue(""); setFinalValue(""); setYears(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `CAGR: ${currencySymbol}${fmt(parseFloat(initialValue))} → ${currencySymbol}${fmt(parseFloat(finalValue))} over ${years} yrs = ${result.cagr.toFixed(2)}%/yr (${result.multiple.toFixed(2)}x). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="CAGR Calculator — Compound Annual Growth Rate"
      description="Compute CAGR from initial value, final value and years with growth multiple and yearly breakdown"
      keywords="cagr calculator, compound annual growth rate, investment growth rate, annualized return calculator"
      canonicalUrl="/financial-calculators/cagr-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Investment Values</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Initial Value ({currencySymbol})</Label>
              <Input type="number" min={1} value={initialValue} onChange={(e) => setInitialValue(e.target.value)} placeholder="e.g., 100000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Final Value ({currencySymbol})</Label>
              <Input type="number" min={1} value={finalValue} onChange={(e) => setFinalValue(e.target.value)} placeholder="e.g., 250000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Number of Years</Label>
              <Input type="number" min={1} max={50} value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate CAGR</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Growth Result</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Compound Annual Growth Rate</p>
                <p className="text-3xl font-bold text-[#F2765E]">{result.cagr.toFixed(2)}%</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Growth Multiple</p>
                  <p className="text-base font-bold text-black">{result.multiple.toFixed(2)}x</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Gain</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.gain)}</p>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Year-by-Year Value
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">Year</th>
                        <th className="text-right font-semibold px-2.5 py-2">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.year}</td>
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
              <div className="text-center"><div className="text-4xl mb-2">📊</div><p className="text-sm">Enter values to calculate CAGR</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="CAGR (Compound Annual Growth Rate) smooths an investment's growth into a single steady yearly rate. Enter the starting value, ending value and number of years — the calculator returns the annualized rate, growth multiple and a year-by-year table."
        useCases={[
          { title: "Stock & Fund Review", description: "Compare the true annualized return of different investments over different periods." },
          { title: "Business Revenue", description: "Measure how fast company sales or profits compounded year over year." },
          { title: "Savings Goals", description: "Check whether your portfolio is on track for a target corpus." },
          { title: "Benchmarking", description: "Set CAGR side by side with index returns to judge outperformance." },
        ]}
        tips={[
          { title: "CAGR Hides Volatility", description: "Two investments with the same CAGR can have very different ride smoothness — check drawdowns too." },
          { title: "Match Time Periods", description: "Only compare CAGRs measured over identical start and end dates." },
          { title: "Mind Inflation", description: "Subtract inflation from nominal CAGR to see your real purchasing-power gain." },
        ]}
        faqs={[
          { question: "What is CAGR?", answer: "CAGR is the constant yearly growth rate that would take an initial value to a final value over a given number of years, assuming compounding." },
          { question: "How is CAGR calculated?", answer: "CAGR = (Final ÷ Initial)^(1 ÷ Years) − 1. Our calculator applies this formula and shows the growth multiple too." },
          { question: "Can CAGR be negative?", answer: "Yes — if the final value is lower than the initial value, CAGR is negative, showing an average yearly decline." },
          { question: "CAGR vs average return?", answer: "A simple average overstates growth when returns swing. CAGR accounts for compounding, so it reflects the actual end result." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default CagrCalculator;
