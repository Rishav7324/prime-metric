'use client';

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type SwpResult = { years: number | "Infinity"; months: number | "Infinity"; perpetual: boolean };

function computeSwp(initialStr: string, withdrawalStr: string, returnStr: string): SwpResult | null {
  const p = parseFloat(initialStr);
  const w = parseFloat(withdrawalStr);
  const annual = parseFloat(returnStr);
  if (!(p > 0 && p <= 1e12) || !(w > 0 && w <= 1e9) || isNaN(annual) || annual < -50 || annual > 100) {
    return null;
  }
  const r = annual / 100 / 12;
  if (r === 0) {
    const n = p / w;
    if (!isFinite(n) || n < 0) return null;
    return { years: Math.floor(n / 12), months: Math.floor(n % 12), perpetual: false };
  }
  if (r > 0 && p * r >= w) {
    return { years: "Infinity", months: "Infinity", perpetual: true };
  }
  if (w - p * r <= 0) return null;
  const n = Math.log(w / (w - p * r)) / Math.log(1 + r);
  if (!isFinite(n) || isNaN(n) || n < 0) return null;
  return { years: Math.floor(n / 12), months: Math.floor(n % 12), perpetual: false };
}

type SwpScheduleRow = { year: number; withdrawn: number; tax: number; balance: number; realBalance: number };

type SwpProjection = {
  firstYearNeed: number;
  withdrawalRate: number;
  realReturn: number;
  effectiveNet: number;
  warnDeplete: boolean;
  depletedYear: number | null;
  rows: SwpScheduleRow[];
};

const LTCG_RATE = 0.125;
const LTCG_EXEMPTION = 125000;

function computeProSchedule(
  initialStr: string,
  withdrawalStr: string,
  returnStr: string,
  inflationStr: string,
  maxYears = 50
): SwpProjection | null {
  const p = parseFloat(initialStr);
  const wMonthly = parseFloat(withdrawalStr);
  const annual = parseFloat(returnStr);
  const inflation = parseFloat(inflationStr);
  if (
    !(p > 0 && p <= 1e12) ||
    !(wMonthly > 0 && wMonthly <= 1e9) ||
    isNaN(annual) ||
    annual < -50 ||
    annual > 100 ||
    isNaN(inflation) ||
    inflation < -10 ||
    inflation > 30
  ) {
    return null;
  }
  const r = annual / 100;
  const g = inflation / 100;
  const annualWithdrawal = wMonthly * 12;
  const firstYearNeed = annualWithdrawal;
  const withdrawalRate = (annualWithdrawal / p) * 100;
  const realReturn = ((1 + r) / (1 + g) - 1) * 100;
  const effectiveNet = annual - inflation - withdrawalRate;
  const warnDeplete = effectiveNet < 0;
  let balance = p;
  let costBasis = p;
  const rows: SwpScheduleRow[] = [];
  let depletedYear: number | null = null;
  for (let year = 1; year <= maxYears; year++) {
    const grown = balance * (1 + r);
    let withdrawn = annualWithdrawal * Math.pow(1 + g, year - 1);
    if (!(grown > 0)) {
      depletedYear = year;
      rows.push({ year, withdrawn, tax: 0, balance: 0, realBalance: 0 });
      break;
    }
    if (withdrawn > grown) withdrawn = grown;
    const unrealized = Math.max(0, grown - costBasis);
    const gainRatio = grown > 0 ? Math.min(1, unrealized / grown) : 0;
    const gainsInWithdrawal = Math.min(withdrawn, withdrawn * gainRatio, unrealized);
    const taxable = Math.max(0, gainsInWithdrawal - LTCG_EXEMPTION);
    const tax = taxable * LTCG_RATE;
    const totalOutflow = Math.min(grown, withdrawn + tax);
    // Pro-rata cost basis reduction for the principal portion withdrawn.
    if (grown > 0 && costBasis > 0) {
      const principalRatio = Math.min(1, withdrawn / grown);
      costBasis = Math.max(0, costBasis * (1 - principalRatio));
    }
    balance = Math.max(0, grown - totalOutflow);
    const realBalance = balance / Math.pow(1 + g, year);
    rows.push({
      year,
      withdrawn,
      tax,
      balance,
      realBalance: isFinite(realBalance) ? realBalance : 0,
    });
    if (balance <= 0.005) {
      depletedYear = year;
      break;
    }
  }
  return { firstYearNeed, withdrawalRate, realReturn, effectiveNet, warnDeplete, depletedYear, rows };
}

const SwpCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("100000");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("500");
  const [returnRate, setReturnRate] = useState("10");
  const [inflationRate, setInflationRate] = useState("6");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<SwpResult | null>(() => computeSwp("100000", "500", "10"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const projection = useMemo(
    () => computeProSchedule(initialInvestment, monthlyWithdrawal, returnRate, inflationRate),
    [initialInvestment, monthlyWithdrawal, returnRate, inflationRate]
  );

  const calculate = () => {
    const computed = computeSwp(initialInvestment, monthlyWithdrawal, returnRate);
    const inflationNum = parseFloat(inflationRate);
    if (!computed || isNaN(inflationNum) || inflationNum < -10 || inflationNum > 30) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter investment (1+), withdrawal (1+), return (-50 to 100%), inflation (-10 to 30%).",
      });
      return;
    }

    setResult(computed);

    if (computed.perpetual) {
        toast({
            title: "Investment will not deplete",
            description: "Your withdrawals are less than or equal to your investment returns.",
        });
        return;
    }

    toast({
        title: "Calculation Complete",
        description: `Your investment will last for ${computed.years} years and ${computed.months} months.`,
    });
  };

  const reset = () => { setInitialInvestment(""); setMonthlyWithdrawal(""); setReturnRate(""); setInflationRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const pNum = parseFloat(initialInvestment);
    const wNum = parseFloat(monthlyWithdrawal);
    const base = result.perpetual
      ? `SWP: ${currencySymbol}${fmt(isNaN(pNum) ? 0 : pNum)} with ${currencySymbol}${fmt(isNaN(wNum) ? 0 : wNum)}/month at ${returnRate}% lasts forever (withdrawals covered by returns). — via PrimeMetric`
      : `SWP: ${currencySymbol}${fmt(isNaN(pNum) ? 0 : pNum)} with ${currencySymbol}${fmt(isNaN(wNum) ? 0 : wNum)}/month at ${returnRate}% lasts ${result.years} years and ${result.months} months. — via PrimeMetric`;
    const proLine = projection
      ? ` Inflation ${inflationRate}%: first-year need ${currencySymbol}${fmt(projection.firstYearNeed)}, withdrawal rate ${projection.withdrawalRate.toLocaleString("en-US", { maximumFractionDigits: 2 })}%, real return ${projection.realReturn.toLocaleString("en-US", { maximumFractionDigits: 2 })}%.`
      : "";
    const text = `${base}${proLine}`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="SWP (Systematic Withdrawal Plan) Calculator"
      description="Estimate how long your investments will last with regular withdrawals."
      canonicalUrl="/financial-calculators/swp-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Total Investment ({currencySymbol})</Label>
              <Input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} placeholder="e.g., 100000" />
            </div>
            <div>
              <Label>Monthly Withdrawal ({currencySymbol})</Label>
              <Input type="number" value={monthlyWithdrawal} onChange={(e) => setMonthlyWithdrawal(e.target.value)} placeholder="e.g., 500" />
            </div>
            <div>
              <Label>Expected Annual Return Rate (%)</Label>
              <Input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 10" />
            </div>
            <div>
              <Label>Inflation Rate (%/yr)</Label>
              <Input type="number" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} placeholder="e.g., 6" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate SWP</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Your investment will last for</p>
                <p className="text-3xl font-bold text-primary">
                  {result.years === "Infinity" ? "an infinite time" : `${result.years} years and ${result.months} months`}
                </p>
              </div>
            </div>
          )}
          {projection && (
            <div className="mt-6 space-y-3 border-t pt-4">
              <h3 className="text-sm font-semibold">Inflation-adjusted projection</h3>
              {projection.warnDeplete && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                  Warning: effective net return ({projection.effectiveNet.toLocaleString("en-US", { maximumFractionDigits: 2 })}% = return − inflation − withdrawal rate) is below 0 — corpus may deplete.
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="p-3 bg-neutral-50 rounded-lg">
                  <p className="text-neutral-600">Inflation-adjusted first-year need</p>
                  <p className="font-semibold">{currencySymbol}{fmt(projection.firstYearNeed)}/yr</p>
                </div>
                <div className="p-3 bg-neutral-50 rounded-lg">
                  <p className="text-neutral-600">Withdrawal rate / Real return / Net</p>
                  <p className="font-semibold">
                    {projection.withdrawalRate.toLocaleString("en-US", { maximumFractionDigits: 2 })}% / {projection.realReturn.toLocaleString("en-US", { maximumFractionDigits: 2 })}% / {projection.effectiveNet.toLocaleString("en-US", { maximumFractionDigits: 2 })}%
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-500">
                Note: equity SWP LTCG 12.5% above {currencySymbol}1,25,000/yr (Indian rules). Yearly tax below is simplified — 12.5% on the estimated gains portion of that year&apos;s withdrawal above the {currencySymbol}{LTCG_EXEMPTION.toLocaleString("en-US")} exemption. {projection.depletedYear !== null ? `Inflation-adjusted corpus depletes in year ${projection.depletedYear}.` : "Inflation-adjusted corpus survives the full projection horizon."}
              </p>
              <div className="max-h-80 overflow-auto border rounded-lg">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-neutral-100">
                    <tr>
                      <th className="text-left p-2">Year</th>
                      <th className="text-right p-2">Withdrawn that year</th>
                      <th className="text-right p-2">Est. tax</th>
                      <th className="text-right p-2">Balance (nominal)</th>
                      <th className="text-right p-2">Balance (today&apos;s money)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projection.rows.map((row) => (
                      <tr key={row.year} className="border-t">
                        <td className="p-2">{row.year}</td>
                        <td className="p-2 text-right">{currencySymbol}{fmt(row.withdrawn)}</td>
                        <td className="p-2 text-right">{currencySymbol}{fmt(row.tax)}</td>
                        <td className="p-2 text-right">{currencySymbol}{fmt(row.balance)}</td>
                        <td className="p-2 text-right">{currencySymbol}{fmt(row.realBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount from your investments at regular intervals. This calculator helps you estimate how long your investment corpus will last based on your withdrawal amount and expected returns."
        useCases={[
            { title: "Retirement Income Planning", description: "Determine a sustainable monthly withdrawal amount from your retirement fund." },
            { title: "Financial Independence", description: "See how long your investments can support you if you decide to stop working." },
            { title: "Comparing Scenarios", description: "Analyze how different withdrawal amounts or investment returns affect the longevity of your funds." },
        ]}
        tips={[
            { title: "The 4% Rule", description: "A common retirement guideline is to withdraw 4% of your initial portfolio value each year, adjusted for inflation. This calculator can help you test that rule." },
            { title: "Be Conservative", description: "It's often wise to use a conservative expected rate of return to ensure your funds last, even in down markets." },
            { title: "Impact of Inflation", description: "This calculator does not account for inflation. In reality, you may need to increase your withdrawals over time to maintain your purchasing power." },
        ]}
        faqs={[
            { question: "What is an SWP?", answer: "A Systematic Withdrawal Plan (SWP) is a facility that allows an investor to withdraw a fixed amount of money from a mutual fund scheme at regular intervals." },
            { question: "What is a safe withdrawal rate?", answer: "A safe withdrawal rate is the percentage of your portfolio that you can withdraw each year without running out of money. Historically, a rate of 4% has been considered safe for a 30-year retirement, but this can vary." },
            { question: "What happens if my withdrawals are less than my returns?", answer: "If your monthly withdrawal amount is less than the monthly interest or returns your investment generates, your corpus will never deplete. In fact, it will continue to grow over time." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SwpCalculator;
