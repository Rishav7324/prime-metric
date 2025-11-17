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

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("2");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || p < 0 || isNaN(r) || r < 0 || isNaN(t) || t < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid, non-negative numbers for all fields.",
      });
      return;
    }

    const interest = p * r * t;
    const totalAmount = p + interest;

    setResult({
      interest: interest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
    
    toast({
        title: "Interest Calculated",
        description: `The total simple interest is ${currencySymbol}${interest.toFixed(2)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      description="Calculate simple interest on a principal amount."
      canonicalUrl="/financial-calculators/simple-interest-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
           <CurrencySelector value={currency} onChange={setCurrency} />
          <div>
            <Label>Principal Amount ({currencySymbol})</Label>
            <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 1000" />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 5" />
          </div>
          <div>
            <Label>Time Period (Years)</Label>
            <Input type="number" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., 2" />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Simple Interest</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{result.totalAmount}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-muted-foreground">Total Simple Interest</p>
                <p className="text-lg font-bold">{currencySymbol}{result.interest}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Simple Interest Calculator determines the interest earned or paid on a principal amount at a fixed rate over a specific period. Unlike compound interest, simple interest is calculated only on the original principal and does not include interest on accumulated interest."
        useCases={[
            { title: "Basic Loan Analysis", description: "Understand the interest cost for simple, short-term loans where interest is not compounded." },
            { title: "Educational Tool", description: "Learn the fundamental concept of interest calculation as a basis for more complex financial topics." },
            { title: "Comparing Investments", description: "Quickly compare the returns of a simple interest investment against a compounding one to see the difference." },
        ]}
        tips={[
            { title: "Time Period is Key", description: "Ensure your interest rate and time period use the same time unit (e.g., an annual rate with a term in years)." },
            { title: "Less Common in Practice", description: "Most modern financial products like savings accounts and loans use compound interest. Simple interest is more of a foundational concept." },
            { title: "Linear Growth", description: "Simple interest results in linear growth of your money, whereas compound interest leads to exponential growth." },
        ]}
        faqs={[
            { question: "What is simple interest?", answer: "Simple interest is a quick method of calculating the interest charge on a loan or principal. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments." },
            { question: "What's the difference between simple and compound interest?", answer: "Simple interest is calculated only on the principal amount of a loan or deposit, so it's a fixed amount over time. Compound interest is calculated on the principal amount and also on the accumulated interest of previous periods, thus it can be regarded as 'interest on interest'." },
            { question: "When is simple interest used?", answer: "Simple interest is not as common as compound interest, but it can be used for some short-term personal loans or for auto loans that use the 'simple interest method'." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SimpleInterestCalculator;

    