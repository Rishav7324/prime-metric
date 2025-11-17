'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const HouseAffordabilityCalculator = () => {
  const [income, setIncome] = useState("");
  const [debt, setDebt] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const monthlyIncome = parseFloat(income);
    const monthlyDebt = parseFloat(debt || "0");
    const down = parseFloat(downPayment);
    const interestRate = parseFloat(rate) / 100 / 12;

    if (isNaN(monthlyIncome) || isNaN(down) || isNaN(interestRate) || monthlyIncome <= 0 || down < 0 || interestRate <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for income, down payment, and interest rate.",
      });
      return;
    }
    
    // Using the 28/36 rule. Housing costs should not exceed 28% of gross monthly income.
    const maxPayment = monthlyIncome * 0.28 - monthlyDebt;

    if (maxPayment <= 0) {
        toast({
            variant: "destructive",
            title: "High Debt",
            description: "Your monthly debt is too high to afford a mortgage payment based on the 28% rule.",
        });
        setResult(null);
        return;
    }

    const loanTerm = 30 * 12; // 30-year mortgage
    
    const maxLoan = maxPayment * ((Math.pow(1 + interestRate, loanTerm) - 1) / (interestRate * Math.pow(1 + interestRate, loanTerm)));
    const maxPrice = maxLoan + down;

    setResult({
      maxPrice: maxPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      maxLoan: maxLoan.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }),
      monthlyPayment: maxPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    });

    toast({
      title: "Calculation Complete",
      description: "Your estimated house affordability has been calculated.",
    });
  };

  return (
    <CalculatorLayout
      title="House Affordability Calculator"
      description="Estimate the home price you can afford based on your income and debts"
      keywords="house affordability calculator, how much house can i afford, mortgage affordability, home buying calculator"
      canonicalUrl="/financial-calculators/house-affordability-calculator"
      formula="Based on the 28/36 rule for debt-to-income ratios"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Gross Monthly Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g., 6000"
            />
          </div>
          <div>
            <Label>Total Monthly Debt Payments ($)</Label>
            <Input
              type="number"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
              placeholder="e.g., 500 (car, student loan)"
            />
          </div>
          <div>
            <Label>Down Payment ($)</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="e.g., 50000"
            />
          </div>
          <div>
            <Label>Estimated Mortgage Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 6.5"
              step="0.01"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Affordability
          </Button>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">You Can Afford a Home Up To</p>
                <p className="text-4xl font-bold text-primary">{result.maxPrice}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Max Loan Amount</p>
                  <p className="text-xl font-bold">{result.maxLoan}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Est. Monthly Payment</p>
                  <p className="text-xl font-bold">{result.monthlyPayment}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The House Affordability Calculator helps you estimate the maximum home price you can likely afford based on your income, monthly debts, down payment, and expected interest rate. It uses the common 28/36 rule to determine a reasonable mortgage payment, giving you a strong starting point for your home search."
        useCases={[
            { title: "First-Time Home Buyers", description: "Get a realistic idea of your budget before you start looking at properties." },
            { title: "Budget Planning", description: "Understand how your income, debts, and down payment affect your home-buying power." },
            { title: "Mortgage Pre-Qualification", description: "Prepare for discussions with lenders by knowing what you can realistically borrow." },
        ]}
        tips={[
            { title: "Improve Your DTI Ratio", description: "Paying down other debts (like car loans or credit cards) can increase the amount you can afford for a mortgage payment." },
            { title: "Factor in Other Costs", description: "Remember that your monthly housing cost will also include property taxes, homeowners insurance, and potentially PMI, which are not included in this basic calculation." },
            { title: "Save for a Larger Down Payment", description: "A larger down payment reduces your loan amount, lowers your monthly payment, and can help you avoid Private Mortgage Insurance (PMI)." },
        ]}
        faqs={[
            { question: "What is the 28/36 rule?", answer: "It's a guideline used by lenders. It suggests that your monthly housing costs (mortgage, taxes, insurance) shouldn't exceed 28% of your gross monthly income, and your total debt payments shouldn't exceed 36%." },
            { question: "Does this calculator include taxes and insurance?", answer: "No, this is a simplified calculator. Your actual monthly payment will be higher once you add property taxes and homeowners insurance (often called PITI - Principal, Interest, Taxes, and Insurance)." },
            { question: "How does my credit score affect affordability?", answer: "A higher credit score will help you qualify for a lower interest rate, which in turn increases the total loan amount you can afford for the same monthly payment." },
            { question: "What is a down payment?", answer: "A down payment is the initial, upfront portion of the total cost of the home that you pay in cash. It is not part of the mortgage loan." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default HouseAffordabilityCalculator;
