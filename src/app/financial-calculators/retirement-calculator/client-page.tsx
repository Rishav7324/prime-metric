'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const RetirementCalculatorClient = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const principal = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(returnRate) / 100 / 12;
    
    if (isNaN(age) || isNaN(retAge) || isNaN(principal) || isNaN(monthly) || isNaN(rate) || age < 0 || retAge <= age || principal < 0 || monthly < 0 || rate < 0) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid numbers for all fields and ensure retirement age is greater than current age.",
        });
        return;
    }

    const years = retAge - age;
    const n = years * 12;
    
    const principalFV = principal * Math.pow(1 + rate, n);
    const investmentFV = monthly * ((Math.pow(1 + rate, n) - 1) / rate);
    const totalNestEgg = principalFV + investmentFV;
    
    setResult({ totalNestEgg });

    toast({
        title: "Calculation Complete",
        description: `Your estimated retirement nest egg is $${totalNestEgg.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
    });
  };

  return (
    <CalculatorLayout
      title="Retirement Calculator"
      description="Plan your retirement and see if you are on track to meet your goals"
      canonicalUrl="/financial-calculators/retirement-calculator"
      formula="FV = PV(1+r)ⁿ + PMT × [((1+r)ⁿ - 1) / r]"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Age</Label>
              <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="e.g., 30" />
            </div>
            <div>
              <Label>Retirement Age</Label>
              <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="e.g., 65" />
            </div>
          </div>
          <div>
            <Label>Current Retirement Savings ($)</Label>
            <Input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} placeholder="e.g., 50000" />
          </div>
          <div>
            <Label>Monthly Contribution ($)</Label>
            <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 500" />
          </div>
          <div>
            <Label>Expected Annual Return (%)</Label>
            <Input type="number" step="0.1" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 7" />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Retirement Savings</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Estimated Nest Egg at Retirement</p>
                <p className="text-4xl font-bold text-primary">${result.totalNestEgg.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Retirement Calculator helps you project your total savings by the time you retire, based on your current age, savings, contributions, and expected investment returns. It provides a vital snapshot of your financial future, helping you determine if you are on track to meet your retirement goals."
        useCases={[
            { title: "Retirement Goal Setting", description: "Estimate your future nest egg to see if it aligns with your desired retirement lifestyle." },
            { title: "Contribution Planning", description: "Understand how increasing your monthly contributions can significantly impact your final retirement savings." },
            { title: "Assessing Your Progress", description: "Regularly check if you are on track to meet your retirement goals and make adjustments as needed." },
        ]}
        tips={[
            { title: "Start Early", description: "The sooner you start saving for retirement, the more time your money has to grow through compounding." },
            { title: "Be Consistent", description: "Make regular, automatic contributions to your retirement accounts to build a strong savings habit." },
            { title: "Invest Wisely", description: "Choose a diversified investment portfolio that matches your risk tolerance and time horizon. Rebalance periodically." },
            { title: "Maximize Employer Match", description: "If your employer offers a 401(k) match, contribute at least enough to get the full match – it\'s free money." },
        ]}
        faqs={[
            { question: "How much do I need to retire?", answer: "A common guideline is the 4% rule, which suggests you can safely withdraw 4% of your retirement savings each year. So, if you need $40,000 per year, you would need a $1 million nest egg." },
            { question: "What is a good rate of return?", answer: "Historically, the stock market has returned an average of 7-10% per year. A diversified portfolio might aim for a 6-8% return, but this depends on your risk tolerance." },
            { question: "Does this account for inflation?", answer: "No, this calculator shows the future value in today\'s dollars. To account for inflation, you can use a lower 'real' rate of return (e.g., if you expect 7% returns and 3% inflation, use a 4% rate of return)." },
            { question: "What about taxes?", answer: "This calculator does not account for taxes. The final amount you can spend in retirement will depend on the type of accounts you have (like a traditional or Roth 401(k)/IRA)." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RetirementCalculatorClient;
