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

type EpfYearRow = { year: number; age: number; annualContribution: number; balance: number };
type EpfResult = {
  maturity: number; totalContributed: number; interestEarned: number;
  years: number; finalMonthlySalary: number; schedule: EpfYearRow[];
};

const RETIREMENT_AGE = 60;
// Simplified PF share: employee 12% + employer 3.67% to PF (rest of employer share goes to pension)
const PF_SHARE = 0.12 + 0.0367;

function computeEpf(salaryStr: string, ageStr: string, growthStr: string, rateStr: string): EpfResult | null {
  const salary = parseFloat(salaryStr);
  const age = parseInt(ageStr);
  const growth = parseFloat(growthStr);
  const rate = parseFloat(rateStr);

  if (!(salary > 0 && salary <= 1e8) || !(age >= 18 && age < RETIREMENT_AGE) || isNaN(growth) || growth < 0 || growth > 30 || isNaN(rate) || rate < 0 || rate > 15) {
    return null;
  }

  const years = RETIREMENT_AGE - age;
  const r = rate / 100;
  const g = growth / 100;
  let balance = 0;
  let contributed = 0;

  const schedule: EpfYearRow[] = [];
  for (let y = 1; y <= years; y++) {
    const monthly = salary * Math.pow(1 + g, y - 1);
    const annual = monthly * 12 * PF_SHARE;
    contributed += annual;
    balance = balance * (1 + r) + annual;
    schedule.push({ year: y, age: age + y, annualContribution: annual, balance });
  }

  return {
    maturity: balance, totalContributed: contributed, interestEarned: balance - contributed,
    years, finalMonthlySalary: salary * Math.pow(1 + g, years - 1), schedule,
  };
}

const EpfCalculator = () => {
  const [salary, setSalary] = useState("50000");
  const [age, setAge] = useState("30");
  const [growth, setGrowth] = useState("8");
  const [rate, setRate] = useState("8.25");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<EpfResult | null>(() => computeEpf("50000", "30", "8", "8.25"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeEpf(salary, age, growth, rate);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter salary (1+), age (18-59), growth (0-30%), EPF rate (0-15%)." });
      return;
    }
    setResult(computed);
    toast({ title: "EPF Projected", description: `Est. maturity ${currencySymbol}${fmt(computed.maturity)} at age ${RETIREMENT_AGE}.` });
  };

  const reset = () => { setSalary(""); setAge(""); setGrowth(""); setRate(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `EPF: ${currencySymbol}${fmt(parseFloat(salary))}/month salary at age ${age}, growth ${growth}%, rate ${rate}% → Maturity ${currencySymbol}${fmt(result.maturity)} at 60 (contributed ${currencySymbol}${fmt(result.totalContributed)}, interest ${currencySymbol}${fmt(result.interestEarned)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="EPF Calculator – Maturity, Interest & Growth"
      description="Project EPF maturity at retirement with yearly compounding, salary growth and custom interest rate"
      keywords="epf calculator, pf maturity calculator, epf interest calculator, provident fund estimator"
      canonicalUrl="/financial-calculators/epf-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Employment Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Monthly Basic + DA ({currencySymbol})</Label>
              <Input type="number" min={1} value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g., 50000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Current Age (retire at 60)</Label>
              <Input type="number" min={18} max={59} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 30" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Salary Growth (%/yr)</Label>
              <Input type="number" step={0.5} min={0} max={30} value={growth} onChange={(e) => setGrowth(e.target.value)} placeholder="e.g., 8" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">EPF Interest Rate (%/yr)</Label>
              <Input type="number" step={0.05} min={0} max={15} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8.25" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <p className="text-[11px] text-neutral-500">Simplified: 12% employee + 3.67% employer to PF, yearly compounding.</p>
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
                <p className="text-xs text-neutral-500">Est. PF Corpus at 60 ({result.years} yrs)</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.maturity)}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${(result.totalContributed / result.maturity) * 100}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${(result.interestEarned / result.maturity) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Contributed {((result.totalContributed / result.maturity) * 100).toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Interest {((result.interestEarned / result.maturity) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total Contributed</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalContributed)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Interest Earned</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interestEarned)}</p>
                </div>
              </div>
              <p className="text-xs text-neutral-500 text-center">Final monthly salary ≈ {currencySymbol}{fmt(result.finalMonthlySalary)}</p>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "Hide" : "Show"} Year-by-Year Balance
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">Age</th>
                        <th className="text-right font-semibold px-2.5 py-2">Contrib.</th>
                        <th className="text-right font-semibold px-2.5 py-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.age}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.annualContribution)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏦</div><p className="text-sm">Enter details to project maturity</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Employees' Provident Fund builds retirement savings from 12% of your basic salary plus the employer's PF share every month. This calculator grows your salary each year, compounds the balance annually at your chosen EPF rate, and projects the tax-advantaged corpus waiting at age 60."
        useCases={[
          { title: "Retirement Checkup", description: "See if your PF alone covers your post-retirement needs or if extra investing is required." },
          { title: "Job Switch Planning", description: "Compare how different starting salaries and hikes change your final PF corpus." },
          { title: "Rate Sensitivity", description: "Test lower future EPF rates so your plan survives interest-rate cuts." },
          { title: "Voluntary Top-Ups", description: "Estimate the payoff of VPF contributions layered on top of mandatory EPF." },
        ]}
        tips={[
          { title: "Never Withdraw Early", description: "Early withdrawals break compounding and attract tax — transfer PF when switching jobs instead." },
          { title: "Model Hikes Conservatively", description: "Use 6-8% salary growth rather than your best year to avoid inflated expectations." },
          { title: "Track the Rate Yearly", description: "EPFO declares rates annually (8.25% recently) — update your projection when it changes." },
        ]}
        faqs={[
          { question: "How is EPF contribution split?", answer: "You contribute 12% of basic+DA. The employer matches 12%, of which 8.33% (up to a wage cap) goes to the pension scheme and ~3.67% to your PF — this calculator uses the simplified 15.67% PF share." },
          { question: "Is EPF interest taxable?", answer: "Interest is tax-free up to the notified contribution threshold; above that, interest on the excess employee contribution is taxable." },
          { question: "What retirement age is assumed?", answer: "Age 60, the standard assumption. Adjust your current age to change the compounding horizon." },
          { question: "Does this include the pension (EPS) payout?", answer: "No — it projects only the PF lump sum. EPS pays a separate monthly pension based on pensionable salary and service years." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default EpfCalculator;
