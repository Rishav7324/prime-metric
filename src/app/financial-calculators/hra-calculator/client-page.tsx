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

type HraResult = {
  ruleHra: number; ruleRent: number; ruleSalary: number;
  exemptMonthly: number; taxableMonthly: number;
  exemptAnnual: number; taxableAnnual: number;
  exemptShare: number;
};

function computeHra(basicStr: string, hraStr: string, rentStr: string, metro: boolean): HraResult | null {
  const basic = parseFloat(basicStr);
  const hra = parseFloat(hraStr);
  const rent = parseFloat(rentStr);

  if (!(basic > 0 && basic <= 1e8) || isNaN(hra) || hra < 0 || hra > 1e8 || isNaN(rent) || rent < 0 || rent > 1e8) {
    return null;
  }

  const ruleHra = hra;
  const ruleRent = Math.max(0, rent - 0.10 * basic);
  const ruleSalary = (metro ? 0.50 : 0.40) * basic;
  const exemptMonthly = Math.min(ruleHra, ruleRent, ruleSalary);
  const taxableMonthly = hra - exemptMonthly;

  return {
    ruleHra, ruleRent, ruleSalary, exemptMonthly, taxableMonthly,
    exemptAnnual: exemptMonthly * 12, taxableAnnual: taxableMonthly * 12,
    exemptShare: hra > 0 ? (exemptMonthly / hra) * 100 : 0,
  };
}

const HraCalculator = () => {
  const [basic, setBasic] = useState("100000");
  const [hraReceived, setHraReceived] = useState("40000");
  const [rentPaid, setRentPaid] = useState("30000");
  const [cityType, setCityType] = useState("metro");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<HraResult | null>(() => computeHra("100000", "40000", "30000", true));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);
  const metro = cityType === "metro";

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeHra(basic, hraReceived, rentPaid, cityType === "metro");
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter basic (1+), HRA received (0+), rent paid (0+)." });
      return;
    }
    setResult(computed);
    toast({ title: "HRA Computed", description: `Exempt ${currencySymbol}${fmt(computed.exemptMonthly)}/mo, taxable ${currencySymbol}${fmt(computed.taxableMonthly)}/mo.` });
  };

  const reset = () => { setBasic(""); setHraReceived(""); setRentPaid(""); setCityType("metro"); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `HRA (${metro ? "metro" : "non-metro"}): basic ${currencySymbol}${fmt(parseFloat(basic))}, HRA ${currencySymbol}${fmt(parseFloat(hraReceived))}, rent ${currencySymbol}${fmt(parseFloat(rentPaid))} → Exempt ${currencySymbol}${fmt(result.exemptMonthly)}/mo, taxable ${currencySymbol}${fmt(result.taxableMonthly)}/mo. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="HRA Calculator – Exemption & Taxable HRA"
      description="Compute HRA exemption under old-regime rules with metro limits, rent breakdown and taxable HRA"
      keywords="hra calculator, hra exemption calculator, house rent allowance calculator, taxable hra calculator"
      canonicalUrl="/financial-calculators/hra-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Salary & Rent Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Monthly Basic Salary ({currencySymbol})</Label>
              <Input type="number" min={1} value={basic} onChange={(e) => setBasic(e.target.value)} placeholder="e.g., 100000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly HRA Received ({currencySymbol})</Label>
              <Input type="number" min={0} value={hraReceived} onChange={(e) => setHraReceived(e.target.value)} placeholder="e.g., 40000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Rent Paid ({currencySymbol})</Label>
              <Input type="number" min={0} value={rentPaid} onChange={(e) => setRentPaid(e.target.value)} placeholder="e.g., 30000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">City Type</Label>
              <Select value={cityType} onValueChange={setCityType}>
                <SelectTrigger className="mt-1.5 h-10 text-sm bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metro">Metro (50% of basic)</SelectItem>
                  <SelectItem value="non-metro">Non-Metro (40% of basic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-[11px] text-neutral-500">Old-regime exemption = min of the 3 statutory rules, computed monthly.</p>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Compute Exemption</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Exemption</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Exempt HRA / month ({metro ? "Metro" : "Non-Metro"})</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.exemptMonthly)}</p>
                <p className="text-xs text-neutral-500 mt-1">{currencySymbol}{fmt(result.exemptAnnual)} / year</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#F2765E]" style={{ width: `${result.exemptShare}%` }} />
                  <div className="bg-black" style={{ width: `${100 - result.exemptShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Exempt {result.exemptShare.toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Taxable {(100 - result.exemptShare).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Taxable HRA / mo</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.taxableMonthly)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Taxable HRA / yr</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.taxableAnnual)}</p>
                </div>
              </div>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-neutral-100 text-black">
                      <th className="text-left font-semibold px-2.5 py-2">Rule (least wins)</th>
                      <th className="text-right font-semibold px-2.5 py-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-neutral-100">
                      <td className="px-2.5 py-1.5">HRA received</td>
                      <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(result.ruleHra)}</td>
                    </tr>
                    <tr className="border-t border-neutral-100">
                      <td className="px-2.5 py-1.5">Rent − 10% of basic</td>
                      <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(result.ruleRent)}</td>
                    </tr>
                    <tr className="border-t border-neutral-100">
                      <td className="px-2.5 py-1.5">{metro ? "50%" : "40%"} of basic ({metro ? "metro" : "non-metro"})</td>
                      <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(result.ruleSalary)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏠</div><p className="text-sm">Enter details to compute exemption</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="House Rent Allowance exemption under the old tax regime is the smallest of three statutory amounts: actual HRA received, rent minus 10% of basic salary, and 50% of basic in metro cities (40% elsewhere). This calculator applies all three rules to your monthly figures and shows exactly how much HRA stays tax-free."
        useCases={[
          { title: "Rent Negotiation", description: "Find the rent level that maximizes exemption before extra rent stops helping." },
          { title: "Metro vs Non-Metro Moves", description: "Quantify the exemption drop when relocating from a metro to a smaller city." },
          { title: "Salary Structuring", description: "Work with HR to balance basic versus HRA for the best post-tax outcome." },
          { title: "Regime Comparison", description: "Use your taxable HRA to decide between old-regime HRA benefits and the new regime." },
        ]}
        tips={[
          { title: "Pay Enough Rent", description: "Rent below 10% of basic wipes out one rule entirely — exemption can fall to zero." },
          { title: "Keep Rent Receipts", description: "Landlord PAN is needed above monthly thresholds and employers ask for proof yearly." },
          { title: "Remember It's Old Regime Only", description: "The new regime offers no HRA exemption — run both regimes before opting in." },
        ]}
        faqs={[
          { question: "What are the 3 HRA rules?", answer: "Exemption is the minimum of: actual HRA received, rent paid minus 10% of basic salary, and 50% of basic for metro cities (40% for non-metro)." },
          { question: "Which cities count as metro?", answer: "Delhi, Mumbai, Chennai and Kolkata qualify for the 50% limit; all other locations use 40%." },
          { question: "Does HRA exemption apply in the new regime?", answer: "No. HRA exemption is available only if you opt for the old tax regime." },
          { question: "What if I live in my own house?", answer: "With no rent paid, the rent-minus-10% rule becomes zero, so no HRA exemption is available." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default HraCalculator;
