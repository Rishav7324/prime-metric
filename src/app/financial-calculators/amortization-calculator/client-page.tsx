'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const AmortizationCalculatorClient = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [schedule, setSchedule] = useState<any[]>([]);
  const { toast } = useToast();

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r < 0 || n <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid positive numbers for all fields.",
      });
      return;
    }
    
    const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    let balance = p;
    const scheduleData = [];

    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * r;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      scheduleData.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: balance.toFixed(2)
      });
    }

    setSchedule(scheduleData);
    toast({
        title: "Schedule Generated",
        description: "Your amortization schedule has been calculated.",
    });
  };

  return (
    <CalculatorLayout
      title="Amortization Calculator"
      description="Calculate loan amortization schedule"
      keywords="amortization calculator, loan schedule, mortgage amortization, loan payment schedule, amortization table"
      canonicalUrl="/financial-calculators/amortization-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Loan Amount ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 250000"
            />
          </div>
          <div>
            <Label>Annual Interest Rate (%)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 5.5"
              step="0.01"
            />
          </div>
          <div>
            <Label>Loan Term (years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 30"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Generate Schedule
          </Button>
          {schedule.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3 text-center text-lg">Amortization Schedule</h3>
              <div className="overflow-x-auto rounded-lg border max-h-[400px] overflow-y-auto">
                <Table>
                  <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm">
                    <TableRow>
                      <TableHead className="text-center">Month</TableHead>
                      <TableHead className="text-right">Payment</TableHead>
                      <TableHead className="text-right">Principal</TableHead>
                      <TableHead className="text-right">Interest</TableHead>
                      <TableHead className="text-right">Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schedule.map((row) => (
                      <TableRow key={row.month}>
                        <TableCell className="text-center">{row.month}</TableCell>
                        <TableCell className="text-right">${row.payment}</TableCell>
                        <TableCell className="text-right text-green-500">${row.principal}</TableCell>
                        <TableCell className="text-right text-red-500">${row.interest}</TableCell>
                        <TableCell className="text-right font-medium">${row.balance}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The amortization calculator generates a detailed payment schedule for a loan, showing precisely how each payment is allocated between principal and interest over the loan's entire term. Amortization is the financial process of paying off a debt over time through regular, equal payments. A key characteristic of amortizing loans, like mortgages and auto loans, is that the proportion of interest to principal changes with each payment. In the early stages of a loan, a larger portion of the payment goes toward interest. As the loan matures and the principal balance decreases, this ratio shifts, with more of each payment going toward paying down the principal. This calculator provides a transparent, month-by-month breakdown, empowering borrowers to understand the true cost of their loan, visualize their equity growth, and strategically plan for early repayment to save on interest costs."
        useCases={[
          { title: "Mortgage Planning", description: "View your complete mortgage payment schedule to understand how much equity you build over time and plan prepayment strategies to save on interest." },
          { title: "Auto Loan Analysis", description: "Analyze car loan payments to see how much of your payment goes to interest versus the car's actual value, especially in the early years." },
          { title: "Personal Loan Transparency", description: "Get a clear picture of how a personal loan is paid down over its term, helping you compare different loan offers effectively." },
          { title: "Financial Education", description: "A powerful tool for learning about how loans work, the impact of interest rates, and the long-term process of debt repayment." }
        ]}
         examples={[
          {
            title: "Example: 30-Year Mortgage",
            description: "Analyze a typical $300,000, 30-year mortgage with a 6% interest rate.",
            steps: [
                "Enter Loan Amount: 300000",
                "Enter Interest Rate: 6",
                "Enter Loan Term: 30",
                "Generate the schedule and observe how in the first year, a significant majority of your payments go towards interest. Scroll down to the final years to see how this ratio flips, with most of the payment going towards principal."
            ]
          },
          {
            title: "Example: 15-Year vs. 30-Year Mortgage Comparison",
            description: "Compare the total interest paid on a $250,000 loan at 5.5% over 30 years versus 15 years.",
            steps: [
                "First, calculate the schedule for a 30-year term. Note the total interest paid.",
                "Then, change the term to 15 years and recalculate. Note the new, higher monthly payment but significantly lower total interest.",
                "This demonstrates the trade-off between monthly affordability and long-term interest savings."
            ]
          }
        ]}
        tips={[
          { title: "The Power of Extra Payments", description: "Making even one extra principal payment per year can shave years off a 30-year mortgage and save you tens of thousands in interest. Use the schedule to see how your balance would decrease faster." },
          { title: "Bi-Weekly Payment Strategy", description: "Consider making half-payments every two weeks instead of full payments monthly. This results in 26 half-payments, equivalent to 13 full monthly payments per year, which naturally accelerates your loan payoff." },
          { title: "Understand Your Equity", description: "The 'Principal' column in the schedule shows how much equity you are building in your home with each payment. This is a key component of your net worth." },
          { title: "Tax Deduction Insights", description: "The 'Interest' column shows the amount of interest you pay each month. For mortgages, this interest is often tax-deductible. You can sum up the interest for a year to estimate your potential deduction." }
        ]}
        faqs={[
          { question: "Why does so much of my early payment go to interest?", answer: "Interest is calculated based on the outstanding loan balance. In the beginning, the balance is at its highest, so the interest charges are also at their highest. As you pay down the principal, the interest portion of each subsequent payment decreases." },
          { question: "How much can I really save with extra payments?", answer: "The savings can be substantial. For example, on a $300,000, 30-year mortgage at 6%, paying an extra $200 per month can save you over $75,000 in interest and pay off the loan more than 6 years early." },
          { question: "Should I choose a shorter loan term if I can afford it?", answer: "Generally, yes. A shorter-term loan (like a 15-year mortgage) will have higher monthly payments but typically comes with a lower interest rate and results in far less total interest paid over the life of the loan, building equity much faster." },
          { question: "What is 'PITI'?", answer: "PITI stands for Principal, Interest, Taxes, and Insurance. This amortization calculator shows your Principal and Interest (P&I) payment. Your actual monthly mortgage payment will also include escrow payments for property taxes and homeowners' insurance, making the total payment higher." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AmortizationCalculatorClient;
