
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const LoanCalculatorClient = () => {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [term, setTerm] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const principal = parseFloat(amount);
    const monthlyRate = parseFloat(rate) / 100 / 12;
    const months = parseFloat(term) * 12;

    if (principal > 0 && monthlyRate >= 0 && months > 0) {
      const emi = monthlyRate === 0 ? principal / months :
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = emi * months;
      const totalInterest = totalPayment - principal;

      setResult({
        emi: emi.toFixed(2),
        totalPayment: totalPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
      });
      toast({
        title: "Calculation Complete",
        description: `Your monthly EMI is $${emi.toFixed(2)}.`,
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
      title="Loan EMI Calculator"
      description="Calculate your monthly EMI, total payment, and interest for any loan"
      canonicalUrl="/financial-calculators/loan-calculator"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Loan Details</h2>
          <div className="space-y-6">
            <div>
              <Label>Loan Amount ($)</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 100000" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Annual Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 7.5" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={term} onChange={(e) => setTerm(e.target.value)} placeholder="e.g., 10" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Calculate EMI</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Monthly EMI</div>
                <div className="text-5xl font-bold gradient-text">${result.emi}</div>
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
              <div className="text-center"><div className="text-6xl mb-4">💰</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

       <CalculatorContentSection
        aboutContent="The Loan EMI (Equated Monthly Installment) Calculator helps you determine your monthly payments for any type of loan, such as a personal loan, home loan, or car loan. It also shows the total interest you'll pay over the loan's lifetime."
        useCases={[
          { title: "Personal Loan Planning", description: "Estimate monthly payments for personal loans to manage your budget effectively." },
          { title: "Home Loan Analysis", description: "Understand your mortgage payments and the total cost of your home loan over different tenures." },
          { title: "Car Loan Decisions", description: "Compare financing options for a new car by seeing how different interest rates and terms affect your monthly payment." },
          { title: "Debt Consolidation", description: "Evaluate if a consolidation loan is a good option by calculating the new EMI for your combined debts." }
        ]}
        tips={[
          { title: "Shorter Term, Less Interest", description: "Choosing a shorter loan term will result in higher monthly payments but will save you a significant amount in total interest paid." },
          { title: "Impact of Interest Rate", description: "Even a small difference in the interest rate can have a big impact on your total payment over the life of the loan. Always shop for the best rate." },
          { title: "Prepayment", description: "Making extra payments towards your principal can help you pay off your loan faster and save on interest. Check if your loan has any prepayment penalties." },
          { title: "Consider Other Costs", description: "Remember to factor in other costs like processing fees, insurance, and taxes, which are not included in the EMI calculation." }
        ]}
        faqs={[
          { question: "What is an EMI?", answer: "EMI stands for Equated Monthly Installment. It is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full." },
          { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1), where P is the principal loan amount, r is the monthly interest rate, and n is the number of monthly installments." },
          { question: "Can I reduce my EMI?", answer: "You can reduce your EMI by opting for a longer loan tenure. However, this will increase the total interest you pay. Alternatively, making a larger down payment will reduce the principal amount and thus the EMI." },
          { question: "What is the difference between a fixed and floating interest rate?", answer: "A fixed interest rate remains constant throughout the loan tenure, so your EMI amount will not change. A floating interest rate is linked to market rates and can change, causing your EMI to vary." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default LoanCalculatorClient;
