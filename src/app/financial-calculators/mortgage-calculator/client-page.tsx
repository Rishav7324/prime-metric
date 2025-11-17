'use client';

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";

const MortgageCalculatorClient = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const principal = parseFloat(homePrice) - parseFloat(downPayment || "0");
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
        description: `Your monthly mortgage payment is ${currencySymbol}${monthlyPayment.toFixed(2)}.`,
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
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payments"
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n-1]"
      canonicalUrl="/financial-calculators/mortgage-calculator"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6">Loan Details</h2>
          <div className="space-y-6">
             <div>
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
            <div>
              <Label>Home Price ({currencySymbol})</Label>
              <Input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="300000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Down Payment ({currencySymbol})</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="60000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="30" className="mt-2 h-12 glass-card border-primary/30" />
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
                <div className="text-5xl font-bold gradient-text">{currencySymbol}{result.monthlyPayment}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg glass-card border border-primary/20">
                  <div className="text-sm text-muted-foreground">Total Payment</div>
                  <div className="text-2xl font-bold text-primary">{currencySymbol}{result.totalPayment}</div>
                </div>
                <div className="p-4 rounded-lg glass-card border border-secondary/20">
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                  <div className="text-2xl font-bold">{currencySymbol}{result.totalInterest}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">🏠</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Mortgage Calculator helps you estimate your monthly mortgage payment, including principal and interest. It's an essential tool for homebuyers to understand the financial commitment of a home loan."
        useCases={[
          { title: "Home Buying", description: "Estimate your monthly payments to determine how much house you can afford." },
          { title: "Refinancing", description: "Compare your current mortgage with new offers to see if refinancing can save you money." },
          { title: "Loan Comparison", description: "See how different loan terms (e.g., 15-year vs. 30-year) or down payments affect your monthly payment and total interest." },
        ]}
        tips={[
          { title: "The 20% Rule", description: "A down payment of at least 20% helps you avoid Private Mortgage Insurance (PMI), which can add to your monthly cost." },
          { title: "PITI is Key", description: "Your full monthly housing payment will also include property taxes and homeowners insurance (PITI). This calculator only shows principal and interest." },
          { title: "Shop for Rates", description: "Getting quotes from multiple lenders can save you a significant amount of money over the life of your loan." },
        ]}
        faqs={[
          { question: "What is a mortgage?", answer: "A mortgage is a loan used to purchase a home or other type of real estate. The property itself serves as collateral for the loan." },
          { question: "What's the difference between a 15-year and a 30-year mortgage?", answer: "A 15-year mortgage has higher monthly payments but a lower interest rate and less total interest paid over the life of the loan. A 30-year mortgage has lower monthly payments but you'll pay more in interest over time." },
          { question: "What is an amortization schedule?", answer: "An amortization schedule is a table detailing each periodic payment on a loan. It shows how much of each payment goes towards interest and how much goes towards paying down the principal." },
          { question: "Can I pay my mortgage off early?", answer: "Yes, making extra payments towards your principal can help you pay off your mortgage faster and save on interest. Check with your lender to ensure there are no prepayment penalties." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default MortgageCalculatorClient;

    