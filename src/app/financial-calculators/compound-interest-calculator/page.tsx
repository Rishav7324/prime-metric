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

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (p > 0 && r >= 0 && t > 0 && n > 0) {
      const amount = p * Math.pow(1 + r / n, n * t);
      const interest = amount - p;

      setResult({
        finalAmount: amount.toFixed(2),
        interest: interest.toFixed(2),
      });
      toast({
        title: "Calculation Complete",
        description: "Your investment projection has been calculated.",
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
      title="Compound Interest Calculator"
      description="Calculate the future value of your investment with compound interest"
      keywords="compound interest calculator, investment calculator, future value calculator, interest calculator, savings growth"
      canonicalUrl="/financial-calculators/compound-interest-calculator"
      formula="A = P(1 + r/n)^(nt)"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Investment Details</h2>
          <div className="space-y-6">
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
            <div>
              <Label>Compound Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Final Amount</div>
                <div className="text-5xl font-bold gradient-text">${result.finalAmount}</div>
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
              <div className="text-center"><div className="text-6xl mb-4">💰</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Compound Interest Calculator demonstrates how investments grow exponentially over time when interest is reinvested. Unlike simple interest, compound interest earns returns on both your original principal and accumulated interest, making it one of the most powerful wealth-building tools available."
        useCases={[
          { title: "Investment Planning", description: "Project the future value of savings accounts, retirement accounts, or investment portfolios." },
          { title: "Retirement Savings", description: "Calculate how much you need to save monthly to reach retirement goals, accounting for compound growth." },
          { title: "College Savings", description: "Estimate future education fund values when starting early with compound interest." },
          { title: "Comparing Accounts", description: "Compare different compound frequencies to see which savings or investment accounts offer better returns." }
        ]}
        tips={[
          { title: "Start Early", description: "The earlier you start investing, the more time compound interest has to work. Even small amounts can grow substantially over decades." },
          { title: "Reinvest Returns", description: "Always reinvest dividends and interest to maximize compound growth. Automatic reinvestment makes this effortless." },
          { title: "Consistent Contributions", description: "Regular contributions amplify compound interest effects. Consider dollar-cost averaging into investments." },
          { title: "Higher Frequency Helps", description: "More frequent compounding (daily vs. annually) results in slightly higher returns, though the difference is modest." }
        ]}
        faqs={[
          { question: "What's the Rule of 72?", answer: "Divide 72 by your interest rate to estimate how many years it takes for money to double. For example, at 8% interest, money doubles in roughly 9 years (72 ÷ 8 = 9)." },
          { question: "Is compound interest better than simple interest?", answer: "Yes, compound interest always produces greater returns than simple interest over time because you earn returns on your accumulated interest." },
          { question: "How often should interest compound?", answer: "More frequent compounding is better. Daily compounding produces slightly more than monthly, which beats annual. However, the interest rate itself matters much more than the compounding frequency." },
          { question: "Can compound interest work against me?", answer: "Yes, compound interest on debt (like credit cards) can make debt grow rapidly. This is why it's crucial to pay off high-interest debt before focusing on investments." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CompoundInterestCalculator;
