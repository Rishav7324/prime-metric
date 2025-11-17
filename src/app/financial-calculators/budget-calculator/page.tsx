
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout, { generateMetadata } from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

export const metadata = generateMetadata({
  title: "Budget Calculator",
  description: "Plan and track your monthly income and expenses",
  keywords: "budget calculator, monthly budget planner, expense tracker, savings calculator",
  canonicalUrl: "/financial-calculators/budget-calculator",
});

const BudgetCalculator = () => {
  const [income, setIncome] = useState("");
  const [housing, setHousing] = useState("");
  const [transportation, setTransportation] = useState("");
  const [food, setFood] = useState("");
  const [utilities, setUtilities] = useState("");
  const [entertainment, setEntertainment] = useState("");
  const [other, setOther] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const monthlyIncome = parseFloat(income);

    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid monthly income.",
      });
      return;
    }

    const expenses = [housing, transportation, food, utilities, entertainment, other]
      .map(e => parseFloat(e) || 0);
    const totalExpenses = expenses.reduce((a, b) => a + b, 0);
    const remaining = monthlyIncome - totalExpenses;
    const savingsRate = (remaining / monthlyIncome) * 100;
    
    setResult({ totalExpenses, remaining, savingsRate });
    toast({
        title: "Budget Calculated",
        description: "Your monthly budget has been analyzed.",
    });
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
          <div className="space-y-2">
            <Label className="text-lg">Monthly Income ($)</Label>
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
          <Button onClick={calculate} className="w-full gradient-button h-12">Calculate Budget</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className={`p-4 rounded-lg text-center ${result.remaining >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                <p className="text-sm text-muted-foreground">Money Remaining</p>
                <p className={`text-3xl font-bold ${result.remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${result.remaining.toFixed(2)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-lg font-bold">${result.totalExpenses.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Savings Rate</p>
                  <p className="text-lg font-bold">{result.savingsRate.toFixed(1)}%</p>
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

export default BudgetCalculator;
