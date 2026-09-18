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

type GratuityResult = {
  gratuity: number; eligible: boolean; monthlyWage: number; years: number;
};

function computeGratuity(wageStr: string, yearsStr: string): GratuityResult | null {
  const wage = parseFloat(wageStr);
  const years = parseFloat(yearsStr);

  if (!(wage > 0 && wage <= 1e7) || !(years > 0 && years <= 50)) {
    return null;
  }

  return {
    gratuity: (wage * 15 * years) / 26,
    eligible: years >= 5,
    monthlyWage: wage,
    years,
  };
}

const GratuityCalculator = () => {
  const [monthlyWage, setMonthlyWage] = useState("80000");
  const [yearsOfService, setYearsOfService] = useState("8");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<GratuityResult | null>(() => computeGratuity("80000", "8"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeGratuity(monthlyWage, yearsOfService);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter monthly basic+DA (1+) and years of service (0-50)." });
      return;
    }
    setResult(computed);
    toast({
      title: computed.eligible ? "Gratuity Estimated" : "Below Vesting Period",
      description: computed.eligible
        ? `Est. gratuity ${currencySymbol}${fmt(computed.gratuity)} for ${computed.years} yrs.`
        : `${computed.years} yrs is under the 5-year vesting requirement.`,
    });
  };

  const reset = () => { setMonthlyWage(""); setYearsOfService(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Gratuity: ${currencySymbol}${fmt(result.monthlyWage)}/month basic+DA × 15/26 × ${result.years} yrs = ${currencySymbol}${fmt(result.gratuity)} (${result.eligible ? "eligible, 5+ yrs served" : "not eligible, under 5-yr vesting"}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Gratuity Calculator – Estimate Your Payout"
      description="Estimate gratuity under the 15/26 formula and check the 5-year vesting rule"
      keywords="gratuity calculator, gratuity 15/26 formula, gratuity eligibility 5 years, basic da gratuity"
      canonicalUrl="/financial-calculators/gratuity-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Employment Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Last-Drawn Monthly Basic + DA ({currencySymbol})</Label>
              <Input type="number" min={1} value={monthlyWage} onChange={(e) => setMonthlyWage(e.target.value)} placeholder="e.g., 80000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Years of Service</Label>
              <Input type="number" min={0.5} max={50} step={0.5} value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} placeholder="e.g., 8" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Estimate Gratuity</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Payout</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Estimated Gratuity</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.gratuity)}</p>
              </div>
              <div className={`p-3 rounded-lg border text-[13px] leading-relaxed ${result.eligible ? "bg-green-50 border-green-200 text-green-800" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
                {result.eligible
                  ? `✓ Eligible — ${result.years} years meets the 5-year vesting requirement.`
                  : `⚠ Not eligible yet — ${result.years} years is below the 5-year vesting requirement (payable on death/disablement regardless).`}
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Monthly Basic + DA</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.monthlyWage)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Service Years</p>
                  <p className="text-base font-bold text-black">{result.years}</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">Formula: basic + DA × 15/26 × years of service</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">💼</div><p className="text-sm">Enter details to estimate gratuity</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Gratuity is a lump-sum farewell benefit employers pay for long service, computed as last-drawn basic plus DA times 15/26 times completed years. The 15/26 factor treats a month as 26 working days with 15 days of wages per year. This calculator applies the formula and flags whether the 5-year vesting rule is met."
        useCases={[
          { title: "Resignation Planning", description: "Estimate the payout before quitting so you can time your exit and budget the gap." },
          { title: "Retirement Corpus", description: "Add expected gratuity to PF and savings when sizing your retirement fund." },
          { title: "Job-Switch Comparison", description: "Weigh gratuity left on the table against a higher offer elsewhere." },
          { title: "HR Verification", description: "Cross-check the figure on your full-and-final settlement statement." },
        ]}
        tips={[
          { title: "Complete 5 Years", description: "Under 5 years, gratuity is forfeited on resignation — only death or disablement waives vesting." },
          { title: "Know the Rounding Rule", description: "Service over 6 months in the final year counts as a full year, boosting the payout." },
          { title: "Basic Matters, Not CTC", description: "Only basic plus DA count — allowances and bonuses are excluded from the formula." },
        ]}
        examples={[
          {
            title: "80,000 basic plus DA with 8 years of service",
            description: "An 80,000 last-drawn basic plus DA with 8 years of service pays gratuity of 3,69,231.",
            steps: [
              "Formula = monthly basic plus DA x 15/26 x years = 80,000 x 15 x 8 / 26.",
              "80,000 x 15 = 12,00,000; 12,00,000 x 8 = 96,00,000; 96,00,000 / 26 = 3,69,230.77, shown as 3,69,231 rounded.",
              "8 years clears the 5-year vesting rule, so the full amount is payable on resignation or retirement.",
            ],
          },
          {
            title: "50,000 basic plus DA with 5 years of service",
            description: "A 50,000 basic plus DA at exactly the 5-year vesting mark pays gratuity of 1,44,231.",
            steps: [
              "Formula = 50,000 x 15 x 5 / 26 = 37,50,000 / 26 = 1,44,230.77, shown as 1,44,231 rounded.",
              "Each extra year at this salary is worth 50,000 x 15/26 = 28,846.15, so year 6 would add exactly that.",
              "Below 5 years the same math gives a figure but it is forfeited on resignation — only death or disablement waives vesting.",
            ],
          },
        ]}
        faqs={[
          { question: "How is gratuity calculated?", answer: "Last-drawn monthly basic plus DA, multiplied by 15/26, multiplied by completed years of service." },
          { question: "Is 5 years of service mandatory?", answer: "Yes for resignation or retirement — but gratuity is payable regardless of tenure on death or disablement." },
          { question: "Is gratuity taxable?", answer: "Rules vary by country and employer type; in India government employees are fully exempt while others get exemption up to a statutory limit." },
          { question: "Does notice period count toward service?", answer: "Generally yes — continuous service includes the notice period if you remain on payroll." },
          { question: "How much is each extra year of service worth on an 80,000 basic?", answer: "One year equals 80,000 x 15/26 = 46,153.85. So 8 years pays 3,69,231 while 10 years pays 4,61,538 — staying two more years adds 92,307.69 with no change in salary." },
          { question: "Can the 6-month rounding rule change my payout?", answer: "Yes. Service beyond 6 months in the final year rounds up: at a 60,000 basic, 6 years pays 60,000 x 15 x 6/26 = 2,07,692 but 6 years and 7 months counts as 7 years and pays 2,42,308 — crossing that mark is worth an extra 34,615.38." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default GratuityCalculator;
