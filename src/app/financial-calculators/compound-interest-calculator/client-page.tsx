
'use client';

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw, TrendingUp } from "lucide-react";

type CompoundResult = { interest: number; total: number };

function computeInterest(principalStr: string, rateStr: string, timeStr: string, typeStr: string): CompoundResult | null {
  const p = parseFloat(principalStr);
  const annualRate = parseFloat(rateStr);
  const t = parseFloat(timeStr);

  if (!(p > 0 && p <= 1e12)) return null;
  if (isNaN(annualRate) || annualRate < 0 || annualRate > 100) return null;
  if (!(t > 0 && t <= 50)) return null;
  if (typeStr !== "simple" && typeStr !== "compound") return null;

  const r = annualRate / 100;
  let interest: number, total: number;

  if (typeStr === "simple") {
    interest = p * r * t;
    total = p + interest;
  } else {
    total = p * Math.pow(1 + r, t);
    interest = total - p;
  }
  if (!isFinite(interest) || !isFinite(total)) return null;

  return { interest, total };
}

const InterestCalculatorClient = () => {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("8");
  const [time, setTime] = useState("10");
  const [type, setType] = useState("compound");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<CompoundResult | null>(() => computeInterest("10000", "8", "10", "compound"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeInterest(principal, rate, time, type);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter principal (1+), rate (0-100%), time (up to 50 yrs).",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Calculation Complete",
      description: `Interest is ${currencySymbol}${fmt(computed.interest)}; total ${currencySymbol}${fmt(computed.total)}.`,
    });
  };

  const reset = () => { setPrincipal(""); setRate(""); setTime(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Interest (${type}): principal ${currencySymbol}${fmt(parseFloat(principal) || 0)} at ${rate}% for ${time} yrs → interest ${currencySymbol}${fmt(result.interest)}, total ${currencySymbol}${fmt(result.total)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Interest Calculator"
      description="Calculate simple or compound interest for your investments or loans"
      canonicalUrl="/financial-calculators/compound-interest-calculator"
      formula={type === 'simple' ? "Simple Interest: I = P × r × t" : "Compound Interest: A = P(1 + r)ⁿ"}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 font-headline">Investment Details</h2>
          <div className="space-y-4">
             <CurrencySelector value={currency} onChange={setCurrency} />
              <div>
               <Label>Interest Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2 h-10 bg-white border border-neutral-200"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="compound">Compound Interest</SelectItem>
                  <SelectItem value="simple">Simple Interest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Principal Amount ({currencySymbol})</Label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 10000" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Time Period (Years)</Label>
              <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 10" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button">Calculate Interest</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-headline">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">Total Amount</div>
                <div className="text-3xl font-bold gradient-text">{currencySymbol}{fmt(result.total)}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-green-500/20">
                  <div className="text-sm text-neutral-600">Total Interest Earned</div>
                  <div className="text-2xl font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</div>
                </div>
                 <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                  <div className="text-sm text-neutral-600">Principal Amount</div>
                  <div className="text-2xl font-bold text-primary">{currencySymbol}{fmt(parseFloat(principal) || 0)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center">
                <TrendingUp className="text-6xl mb-4 mx-auto w-16 h-16" />
                <p>Enter details to calculate</p>
                </div>
            </div>
          )}
        </Card>
      </div>

       <CalculatorContentSection
        aboutContent="The Interest Calculator computes both simple and compound interest, helping you understand how investments grow or how much interest you'll owe on a loan. Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest, leading to exponential growth over time."
        useCases={[
          { title: "Investment Projections", description: "Project the future value of your savings or investments using either simple or compound interest." },
          { title: "Loan Cost Analysis", description: "Understand the total interest you'll pay on a loan over its term." },
          { title: "Comparing Savings Accounts", description: "Compare how different interest types and rates affect your savings growth." },
          { title: "Educational Tool", description: "Learn the fundamental difference between simple and compound interest and see the power of compounding in action." }
        ]}
        tips={[
          { title: "The Power of Compounding", description: "Compound interest generates significantly more returns over long periods compared to simple interest because you earn interest on your interest." },
          { title: "Start Early", description: "The earlier you start investing, the more time your money has to grow with compounding, even with small amounts." },
          { title: "Impact of Rate and Time", description: "Higher interest rates and longer time periods dramatically increase the amount of interest earned, especially with compounding." },
          { title: "Interest on Debt", description: "Remember that compound interest also works on debt like credit cards, which is why balances can grow quickly if not paid off." }
        ]}
        examples={[
          {
            title: "10,000 at 8% compounded for 10 years",
            description: "Investing 10,000 at 8% compound annual growth for 10 years grows to 21,589.25 with 11,589.25 of interest.",
            steps: [
              "Compound formula A = P x (1 + r)^t = 10,000 x 1.08^10.",
              "1.08^10 = 2.158925, so A = 10,000 x 2.158925 = 21,589.25.",
              "Interest = 21,589.25 - 10,000 = 11,589.25, versus only 8,000 under simple interest.",
            ],
          },
          {
            title: "10,000 at 8% simple interest for 10 years",
            description: "The same 10,000 at 8% simple interest for 10 years reaches only 18,000 — 3,589.25 less than compounding.",
            steps: [
              "Simple formula I = P x r x t = 10,000 x 0.08 x 10 = 8,000.",
              "Total = 10,000 + 8,000 = 18,000.",
              "Gap to compounding = 21,589.25 - 18,000 = 3,589.25, which widens every extra year.",
            ],
          },
        ]}
        faqs={[
          { question: "What's the main difference between simple and compound interest?", answer: "Simple interest is calculated only on the initial principal. Compound interest is calculated on the principal plus any interest that has already been earned. This 'interest on interest' is what leads to faster growth." },
          { question: "Which type of interest is more common?", answer: "Most savings accounts, investments, and loans use compound interest. Simple interest is less common but can be found in some short-term loans or bonds." },
          { question: "Does this calculator account for different compounding frequencies?", answer: "This version calculates interest compounded annually. For more detailed calculations with different frequencies (monthly, quarterly), you would need a more advanced compound interest calculator." },
          { question: "How does inflation affect my interest earnings?", answer: "Your 'real' return is the interest rate minus the inflation rate. If your interest rate is 5% and inflation is 3%, your real return is about 2%. To grow your purchasing power, your interest rate must be higher than the inflation rate." },
          { question: "How much extra does compounding add over simple interest on 10,000 at 8% for 10 years?", answer: "Simple interest gives 10,000 x 0.08 x 10 = 8,000 for a total of 18,000. Compound interest gives 10,000 x 1.08^10 = 21,589.25, with interest of 11,589.25 — compounding adds 3,589.25 with no extra deposits." },
          { question: "What happens if I leave 10,000 at 8% compounded for 20 instead of 10 years?", answer: "After 10 years the total is 21,589.25 with interest of 11,589.25. After 20 years it is 10,000 x 1.08^20 = 46,609.57 with interest of 36,609.57 — doubling the time more than triples the interest because gains start earning their own gains." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default InterestCalculatorClient;
