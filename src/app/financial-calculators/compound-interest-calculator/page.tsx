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
import { TrendingUp } from "lucide-react";

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("compound");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    
    if (p > 0 && r >= 0 && t > 0) {
      let interest, total;
      
      if (type === "simple") {
        interest = p * r * t;
        total = p + interest;
      } else { // compound
        total = p * Math.pow(1 + r, t);
        interest = total - p;
      }
      
      setResult({
        interest: interest.toFixed(2),
        total: total.toFixed(2)
      });
      toast({
        title: "Calculation Complete",
        description: `The calculated interest is $${interest.toFixed(2)}.`,
      });
    } else {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid, positive numbers for all fields.",
        });
    }
  };

  return (
    <CalculatorLayout
      title="Interest Calculator"
      description="Calculate simple or compound interest for your investments or loans"
      keywords="interest calculator, simple interest, compound interest, investment calculator"
      canonicalUrl="/financial-calculators/compound-interest-calculator"
      formula={type === 'simple' ? "Simple Interest: I = P × r × t" : "Compound Interest: A = P(1 + r)ⁿ"}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Investment Details</h2>
          <div className="space-y-6">
             <div>
              <Label>Interest Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="compound">Compound Interest</SelectItem>
                  <SelectItem value="simple">Simple Interest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Principal Amount ($)</Label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 10000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Time Period (Years)</Label>
              <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 10" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate Interest</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Total Amount</div>
                <div className="text-5xl font-bold gradient-text">${result.total}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-green-500/20">
                  <div className="text-sm text-muted-foreground">Total Interest Earned</div>
                  <div className="text-2xl font-bold text-green-400">${result.interest}</div>
                </div>
                 <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Principal Amount</div>
                  <div className="text-2xl font-bold text-primary">${parseFloat(principal).toFixed(2)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
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
        faqs={[
          { question: "What's the main difference between simple and compound interest?", answer: "Simple interest is calculated only on the initial principal. Compound interest is calculated on the principal plus any interest that has already been earned. This 'interest on interest' is what leads to faster growth." },
          { question: "Which type of interest is more common?", answer: "Most savings accounts, investments, and loans use compound interest. Simple interest is less common but can be found in some short-term loans or bonds." },
          { question: "Does this calculator account for different compounding frequencies?", answer: "This version calculates interest compounded annually. For more detailed calculations with different frequencies (monthly, quarterly), you would need a more advanced compound interest calculator." },
          { question: "How does inflation affect my interest earnings?", answer: "Your 'real' return is the interest rate minus the inflation rate. If your interest rate is 5% and inflation is 3%, your real return is about 2%. To grow your purchasing power, your interest rate must be higher than the inflation rate." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default InterestCalculator;
