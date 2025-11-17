'use client';

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const AutoLoanCalculator = () => {
  const [carPrice, setCarPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const principal = parseFloat(carPrice) - parseFloat(downPayment || "0");
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const months = parseFloat(loanTerm) * 12;

    if (principal > 0 && monthlyRate >= 0 && months > 0) {
      const monthlyPayment = monthlyRate === 0 ? principal / months : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - principal;

      setResult({
        monthlyPayment: monthlyPayment.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      });
       toast({
        title: "Calculation Complete",
        description: "Your auto loan details have been calculated.",
      });
    } else {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid numbers for all fields.",
        });
    }
  };

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate your car loan monthly payments"
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n-1]"
      canonicalUrl="/financial-calculators/auto-loan-calculator"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Car Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Car Price ($)</Label>
              <Input type="number" value={carPrice} onChange={(e) => setCarPrice(e.target.value)} placeholder="25000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Down Payment ($)</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="5000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="5.5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Monthly Payment</div>
                <div className="text-5xl font-bold gradient-text">${result.monthlyPayment}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Total Payment</div>
                  <div className="text-2xl font-bold text-primary">${result.totalPayment}</div>
                </div>
                <div className="p-4 rounded-lg glass-card border border-secondary/20">
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                  <div className="text-2xl font-bold">${result.totalInterest}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🚗</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Auto Loan Calculator helps you estimate your monthly car payments based on the vehicle price, down payment, interest rate, and loan term. Understanding these numbers helps you budget effectively and compare different financing options before making a purchase decision."
        useCases={[
          { title: "Car Shopping", description: "Determine affordable monthly payments before visiting dealerships to avoid overspending." },
          { title: "Loan Comparison", description: "Compare different loan offers from banks, credit unions, and dealerships to find the best deal." },
          { title: "Down Payment Planning", description: "See how different down payment amounts affect your monthly payment and total interest paid." },
          { title: "Budget Planning", description: "Ensure car payments fit comfortably within your monthly budget alongside other expenses." }
        ]}
        tips={[
          { title: "Aim for 20% Down", description: "A 20% down payment helps you avoid being underwater (owing more than the car's worth) and reduces interest costs." },
          { title: "Keep Loan Term Reasonable", description: "Shorter loan terms (3-5 years) mean higher monthly payments but significantly less interest paid over time." },
          { title: "Factor in Total Cost", description: "Remember to budget for insurance, maintenance, gas, and registration in addition to the loan payment." },
          { title: "Shop for Rates", description: "Get pre-approved from your bank or credit union before visiting dealerships to negotiate from a position of strength." }
        ]}
        faqs={[
          { question: "What's a good interest rate for an auto loan?", answer: "Rates vary based on credit score and market conditions. As of 2024, excellent credit (720+) might get 5-7%, while lower scores pay 10-15% or more. Shop around for the best rate." },
          { question: "Should I lease or buy?", answer: "Buying builds equity and is cheaper long-term if you keep the car. Leasing has lower monthly payments but you never own the vehicle. Buy if you drive >15k miles/year or keep cars long-term." },
          { question: "How much car can I afford?", answer: "A general rule is to keep total car expenses (payment, insurance, fuel, maintenance) under 15-20% of your monthly take-home pay." },
          { question: "Is it better to pay cash or finance?", answer: "If you have low-interest financing available and can invest cash for higher returns, financing might be better. Otherwise, paying cash avoids interest and debt." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AutoLoanCalculator;
