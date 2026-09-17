
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

type BudgetResult = { totalExpenses: number; remaining: number; savingsRate: number };

function computeBudget(
  incomeStr: string,
  housingStr: string,
  transportationStr: string,
  foodStr: string,
  utilitiesStr: string,
  entertainmentStr: string,
  otherStr: string
): BudgetResult | null {
  const monthlyIncome = parseFloat(incomeStr);
  if (!(monthlyIncome > 0 && monthlyIncome <= 1e9)) return null;

  const raw = [housingStr, transportationStr, foodStr, utilitiesStr, entertainmentStr, otherStr];
  const expenses: number[] = [];
  for (const e of raw) {
    if (e.trim() === "") { expenses.push(0); continue; }
    const v = parseFloat(e);
    if (isNaN(v) || v < 0 || v > 1e9) return null;
    expenses.push(v);
  }
  const totalExpenses = expenses.reduce((a, b) => a + b, 0);
  const remaining = monthlyIncome - totalExpenses;
  const savingsRate = (remaining / monthlyIncome) * 100;

  return { totalExpenses, remaining, savingsRate };
}

const BudgetCalculatorClient = () => {
  const [income, setIncome] = useState("5000");
  const [housing, setHousing] = useState("1500");
  const [transportation, setTransportation] = useState("400");
  const [food, setFood] = useState("600");
  const [utilities, setUtilities] = useState("250");
  const [entertainment, setEntertainment] = useState("300");
  const [other, setOther] = useState("200");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BudgetResult | null>(() => computeBudget("5000", "1500", "400", "600", "250", "300", "200"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeBudget(income, housing, transportation, food, utilities, entertainment, other);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter income (1+); expenses must be 0 or more.",
      });
      return;
    }

    setResult(computed);
    toast({
        title: "Budget Calculated",
        description: `Remaining ${currencySymbol}${fmt(computed.remaining)} (${computed.savingsRate.toLocaleString("en-US", { maximumFractionDigits: 1 })}% savings).`,
    });
  };

  const reset = () => { setIncome(""); setHousing(""); setTransportation(""); setFood(""); setUtilities(""); setEntertainment(""); setOther(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Budget: income ${currencySymbol}${fmt(parseFloat(income))}, expenses ${currencySymbol}${fmt(result.totalExpenses)}, remaining ${currencySymbol}${fmt(result.remaining)} (${result.savingsRate.toLocaleString("en-US", { maximumFractionDigits: 1 })}% savings). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Budget Calculator"
      description="Plan and track your monthly income and expenses"
      canonicalUrl="/financial-calculators/budget-calculator"
      explanation="This calculator helps you manage your finances by tracking income vs expenses and showing how much you can save each month."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <CurrencySelector value={currency} onChange={setCurrency} />
          <div className="space-y-2">
            <Label className="text-sm font-medium">Monthly Income ({currencySymbol})</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Total after-tax income"
              className="h-12"
            />
          </div>
          <h3 className="text-lg font-semibold pt-4">Monthly Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Housing</Label>
              <Input
                type="number"
                value={housing}
                onChange={(e) => setHousing(e.target.value)}
                placeholder="Rent/mortgage"
              />
            </div>
            <div className="space-y-2">
              <Label>Transportation</Label>
              <Input
                type="number"
                value={transportation}
                onChange={(e) => setTransportation(e.target.value)}
                placeholder="Car, gas, transit"
              />
            </div>
            <div className="space-y-2">
              <Label>Food</Label>
              <Input
                type="number"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Groceries, dining"
              />
            </div>
            <div className="space-y-2">
              <Label>Utilities</Label>
              <Input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(e.target.value)}
                placeholder="Electric, water, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Entertainment</Label>
              <Input
                type="number"
                value={entertainment}
                onChange={(e) => setEntertainment(e.target.value)}
                placeholder="Movies, hobbies, etc."
              />
            </div>
            <div className="space-y-2">
              <Label>Other</Label>
              <Input
                type="number"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                placeholder="Miscellaneous"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button h-10">Calculate Budget</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className={`p-4 rounded-lg text-center ${result.remaining >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <p className="text-sm text-neutral-600">Money Remaining</p>
                <p className={`text-3xl font-bold ${result.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {currencySymbol}{fmt(result.remaining)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Total Expenses</p>
                  <p className="text-lg font-bold">{currencySymbol}{fmt(result.totalExpenses)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Savings Rate</p>
                  <p className="text-lg font-bold">{result.savingsRate.toLocaleString("en-US", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="A Budget Calculator helps you track monthly income and expenses to understand your financial health. By categorizing your spending and comparing it to your income, you can identify opportunities to save more and reach your financial goals faster."
        useCases={[
          { title: "Monthly Planning", description: "Create a realistic monthly budget by tracking all income sources and expense categories." },
          { title: "Savings Goals", description: "Calculate how much money you can save each month after covering all necessary expenses." },
          { title: "Spending Analysis", description: "Identify which expense categories consume the most of your income and find areas to cut back." },
          { title: "Financial Health Check", description: "Monitor your savings rate to ensure you're building wealth over time." }
        ]}
        tips={[
          { title: "Follow the 50/30/20 Rule", description: "Allocate 50% to needs (housing, utilities), 30% to wants (entertainment), and 20% to savings and debt repayment." },
          { title: "Track All Expenses", description: "Include small recurring expenses like subscriptions - they add up quickly over time." },
          { title: "Build an Emergency Fund", description: "Aim to save 3-6 months of expenses in an easily accessible emergency fund before investing." },
          { title: "Review Regularly", description: "Review your budget monthly and adjust categories based on actual spending patterns." }
        ]}
        faqs={[
          { question: "What's a good savings rate?", answer: "Financial experts typically recommend saving at least 20% of your income. However, any amount saved is better than none, and the ideal rate depends on your goals and situation." },
          { question: "How do I budget with irregular income?", answer: "Base your budget on your lowest expected monthly income. When you earn more, put the extra toward savings or debt repayment." },
          { question: "Should I pay off debt or save first?", answer: "Generally, build a small emergency fund ($1000-2000) first, then focus on high-interest debt, then build larger savings." },
          { question: "What if my expenses exceed my income?", answer: "Look for ways to reduce expenses or increase income. Start with discretionary spending like entertainment, then consider larger changes if needed." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BudgetCalculatorClient;
