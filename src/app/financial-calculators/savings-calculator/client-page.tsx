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

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [years, setYears] = useState("10");
  const [interestRate, setInterestRate] = useState("5");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const principal = parseFloat(initialDeposit);
    const monthly = parseFloat(monthlyContribution);
    const numYears = parseInt(years);
    const rate = parseFloat(interestRate) / 100 / 12;

    if (isNaN(principal) || isNaN(monthly) || isNaN(numYears) || numYears <= 0 || isNaN(rate)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
      });
      return;
    }

    const n = numYears * 12;
    let futureValue = principal * Math.pow(1 + rate, n);
    futureValue += monthly * ((Math.pow(1 + rate, n) - 1) / rate);
    
    const totalInvested = principal + monthly * n;
    const totalInterest = futureValue - totalInvested;

    setResult({
      futureValue: futureValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });

    toast({
        title: "Calculation Complete",
        description: `Your savings will grow to ${currencySymbol}${futureValue.toFixed(2)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="See how your savings can grow over time with compound interest."
      canonicalUrl="/financial-calculators/savings-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <CurrencySelector value={currency} onChange={setCurrency} />
             <div>
                <Label>Initial Deposit ({currencySymbol})</Label>
                <Input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(e.target.value)} placeholder="e.g., 1000" />
            </div>
             <div>
                <Label>Monthly Contribution ({currencySymbol})</Label>
                <Input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} placeholder="e.g., 200" />
            </div>
             <div>
                <Label>Investment Period (Years)</Label>
                <Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 10" />
            </div>
             <div className="col-span-1 md:col-span-2">
                <Label>Expected Annual Interest Rate (%)</Label>
                <Input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="e.g., 5" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Savings</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Future Value of Savings</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{result.futureValue}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-lg font-bold">{currencySymbol}{result.totalInvested}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Interest Earned</p>
                  <p className="text-lg font-bold">{currencySymbol}{result.totalInterest}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Savings Calculator helps you project the future value of your savings based on an initial deposit, regular monthly contributions, and an expected annual interest rate. It's a powerful tool to visualize the impact of compound interest and consistent saving habits."
        useCases={[
            { title: "Setting Savings Goals", description: "Determine how much you need to save monthly to reach a specific financial goal, like a down payment on a house or a new car." },
            { title: "Retirement Planning", description: "Get a rough estimate of how your retirement savings will grow over time." },
            { title: "Comparing Accounts", description: "See how different interest rates on savings accounts or investment vehicles can affect your future savings." },
        ]}
        tips={[
            { title: "Start Early", description: "The earlier you start saving, the more time compound interest has to work its magic. Even small amounts can grow significantly over a long period." },
            { title: "Be Consistent", description: "Making regular, automatic contributions is a powerful way to build your savings without having to think about it." },
            { title: "Realistic Interest Rates", description: "Use a realistic interest rate for your projections. High-yield savings accounts might offer 4-5%, while a diversified investment portfolio might average 7-10% over the long term." },
        ]}
        faqs={[
            { question: "What is compound interest?", answer: "Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods. It's often called 'interest on your interest'." },
            { question: "How does this differ from a simple interest calculator?", answer: "This calculator assumes interest is compounded, which is how most savings and investment accounts work. A simple interest calculator only calculates interest on the initial principal amount." },
            { question: "Does this calculator account for taxes or inflation?", answer: "No, this is a simplified savings calculator. The real return on your savings will be lower after accounting for taxes on the interest earned and the effects of inflation." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SavingsCalculator;

    