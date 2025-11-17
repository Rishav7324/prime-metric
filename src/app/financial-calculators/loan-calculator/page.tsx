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

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<{
    emi: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);
  const { toast } = useToast();

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(tenure) * 12; // Total months

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;

      setResult({
        emi: parseFloat(emi.toFixed(2)),
        totalPayment: parseFloat(totalPayment.toFixed(2)),
        totalInterest: parseFloat(totalInterest.toFixed(2)),
      });
      toast({
        title: "EMI Calculated",
        description: `Your monthly payment is ${getCurrencySymbol(currency)}${emi.toFixed(2)}.`,
      });
    } else {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid, positive numbers for all fields.",
        });
    }
  };

  const explanation = (
    <div className="space-y-4 text-left">
      <p>
        <strong>EMI (Equated Monthly Installment)</strong> is the fixed amount you pay every month 
        to repay your loan. It includes both principal and interest components.
      </p>
      <div className="space-y-2">
        <p className="font-semibold">Components:</p>
        <ul className="space-y-1 ml-4" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><strong>Principal:</strong> The original loan amount borrowed</li>
          <li><strong>Interest Rate:</strong> Annual percentage rate charged by the lender</li>
          <li><strong>Tenure:</strong> Loan repayment period in years</li>
        </ul>
      </div>
      <p className="text-sm">
        The EMI remains constant throughout the loan tenure, but the ratio of principal to interest changes. 
        Initially, a larger portion goes toward interest, gradually shifting toward principal repayment.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      title="Loan EMI Calculator"
      description="Calculate your monthly EMI, total payment, and interest for any loan"
      keywords="emi calculator, loan calculator, mortgage calculator, personal loan emi, car loan emi"
      canonicalUrl="/financial-calculators/loan-calculator"
      explanation={explanation}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Loan Details</h2>
          <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
            
            <div>
              <Label htmlFor="principal" className="text-lg">Loan Amount ({getCurrencySymbol(currency)})</Label>
              <Input
                id="principal"
                type="number"
                placeholder="e.g., 100000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="rate" className="text-lg">Annual Interest Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.1"
                placeholder="e.g., 8.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="tenure" className="text-lg">Loan Tenure (Years)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="e.g., 15"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <Button 
              onClick={calculateEMI}
              className="w-full h-12 text-lg gradient-button"
              disabled={!principal || !rate || !tenure}
            >
              Calculate EMI
            </Button>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Your Results</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">Monthly EMI</div>
                <div className="text-5xl font-bold mb-2 gradient-text">
                  {getCurrencySymbol(currency)}{result.emi.toLocaleString()}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="font-bold text-lg">{getCurrencySymbol(currency)}{result.totalPayment.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-bold text-lg text-red-400">{getCurrencySymbol(currency)}{result.totalInterest.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Principal Amount</span>
                    <span className="font-bold text-lg">{getCurrencySymbol(currency)}{parseFloat(principal).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">💰</div>
                <p>Enter loan details to calculate EMI</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="An EMI (Equated Monthly Installment) calculator is an essential financial planning tool that helps you understand the exact monthly payment required to repay a loan. Whether you're considering a personal loan, car loan, or home loan, this calculator provides instant insights into your financial commitment. By entering the loan amount, interest rate, and repayment period, you can make informed decisions about loan affordability and compare different loan offers. Understanding your EMI helps with budgeting, prevents overextension of finances, and allows you to plan for future financial goals while managing debt responsibly."
        useCases={[
          {
            title: "Home Loan Planning",
            description: "Calculate affordable mortgage payments before house hunting. Compare different loan amounts and terms to find the sweet spot between monthly budget and dream home."
          },
          {
            title: "Auto Loan Comparison",
            description: "Evaluate different car financing options by comparing EMIs across various loan terms and interest rates to find the most cost-effective auto loan."
          },
          {
            title: "Personal Loan Assessment",
            description: "Determine if a personal loan fits your budget for major expenses like medical bills, weddings, or home renovations by calculating the monthly financial impact."
          },
          {
            title: "Business Expansion Financing",
            description: "Plan business loans for equipment purchases or expansion by understanding the monthly cash flow impact before committing to business financing."
          },
          {
            title: "Debt Consolidation Strategy",
            description: "Compare your current multiple EMIs with a potential consolidated loan to see if debt consolidation could reduce your monthly financial burden."
          },
          {
            title: "Educational Loan Planning",
            description: "Calculate future EMI obligations for student loans to understand post-graduation financial responsibilities and plan career choices accordingly."
          }
        ]}
        tips={[
          {
            title: "Choose the Right Tenure",
            description: "Shorter loan tenures mean higher EMIs but significantly lower total interest. Longer tenures offer lower monthly payments but accumulate more interest over time. Balance affordability with cost-effectiveness."
          },
          {
            title: "Follow the 40% Rule",
            description: "Financial advisors recommend keeping total EMI payments below 40% of your monthly income. This ensures you have sufficient funds for other expenses, emergencies, and savings."
          },
          {
            title: "Compare Multiple Offers",
            description: "Even a 0.5% difference in interest rates can result in thousands of dollars in savings over the loan term. Always compare offers from multiple lenders before committing."
          },
          {
            title: "Consider Pre-payment Options",
            description: "Many loans allow partial prepayments without penalties. Making occasional lump sum payments can significantly reduce your overall interest burden and shorten the loan tenure."
          },
          {
            title: "Factor in Hidden Costs",
            description: "Remember to account for processing fees, insurance premiums, and other charges when calculating the true cost of your loan beyond just the EMI amount."
          }
        ]}
        faqs={[
          {
            question: "What is EMI and how is it calculated?",
            answer: "EMI (Equated Monthly Installment) is a fixed monthly payment you make to repay a loan. It's calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the number of monthly installments. Each EMI includes both principal repayment and interest charges."
          },
          {
            question: "Does EMI amount remain fixed throughout the loan tenure?",
            answer: "Yes, in most cases, EMI remains constant throughout the loan period. However, the composition changes over time - initially, a larger portion goes toward interest and a smaller portion toward principal. As the loan matures, more of your EMI goes toward principal repayment. This is called an amortization schedule."
          },
          {
            question: "How does interest rate affect my EMI?",
            answer: "Interest rate directly impacts your EMI amount. Even a small change in interest rate can significantly affect your monthly payment and total interest paid. For example, on a $100,000 loan over 15 years, a 1% increase in interest rate can add over $50 to your monthly EMI and thousands to your total repayment."
          },
          {
            question: "Is it better to choose longer or shorter loan tenure?",
            answer: "It depends on your financial situation. Shorter tenure means higher EMI but much lower total interest paid, saving you money long-term. Longer tenure offers lower monthly payments but costs more in total interest. Choose based on your monthly cash flow capacity and long-term financial goals."
          },
          {
            question: "Can I reduce my EMI after taking a loan?",
            answer: "While you can't directly reduce EMI once it's fixed, you can make prepayments to reduce the outstanding principal, which allows you to either reduce the tenure or request an EMI reduction. Some lenders also allow EMI reduction through loan restructuring, though this may extend your tenure and increase total interest."
          },
          {
            question: "What happens if I miss an EMI payment?",
            answer: "Missing EMI payments can have serious consequences including late payment fees, damage to your credit score, penalty interest charges, and potential legal action by the lender. If you're facing difficulty, contact your lender immediately to discuss options like EMI restructuring or temporary payment holidays."
          }
        ]}
      />
    </CalculatorLayout>
  );
};

export default LoanCalculator;
