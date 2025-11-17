
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
        aboutContent="The amortization calculator generates a detailed payment schedule showing how each loan payment is split between principal and interest over time. Amortization is the process of paying off debt with regular payments over a set period. In early payments, most money goes toward interest with little principal reduction. As the loan progresses, more goes toward principal and less toward interest. This schedule is crucial for understanding the true cost of borrowing and planning strategies to pay off loans faster."
        useCases={[
          { title: "Mortgage Planning", description: "View your complete mortgage payment schedule to understand how much equity you build over time and plan prepayment strategies to save on interest." },
          { title: "Loan Comparison", description: "Compare amortization schedules of different loan terms. See how a 15-year vs 30-year mortgage affects total interest paid and payment distribution." },
          { title: "Extra Payment Strategy", description: "Understand where extra payments have maximum impact. Additional principal payments in early years save significantly more interest than later payments." },
          { title: "Refinancing Decisions", description: "Evaluate whether refinancing makes sense by comparing remaining principal, interest, and payments on your current loan versus a new loan schedule." }
        ]}
        tips={[
          { title: "Early Interest Heavy", description: "Early loan payments are mostly interest. On a 30-year mortgage, over 80% of your first payment may be interest. This ratio gradually reverses over the loan term." },
          { title: "Extra Payments Impact", description: "Extra principal payments early in the loan have the greatest effect. One extra payment in year 1 saves more interest than multiple extra payments in later years." },
          { title: "Biweekly Payments", description: "Making half-payments every two weeks results in 13 full monthly payments per year instead of 12, significantly shortening loan terms and saving interest." },
          { title: "Tax Deductions", description: "For mortgages, interest paid may be tax-deductible. The amortization schedule shows exactly how much interest you pay each year for tax purposes." }
        ]}
        faqs={[
          { question: "Why does so much of my early payment go to interest?", answer: "Interest is calculated on the remaining principal balance. Early in the loan, the balance is highest, so interest charges are highest. As you pay down principal, interest charges decrease and more payment goes toward principal." },
          { question: "How much can I save with extra payments?", answer: "Significant amounts. Adding just $100/month to a $200,000 30-year mortgage at 4% can save over $30,000 in interest and pay off the loan 5+ years early. The exact savings depend on your loan terms." },
          { question: "Should I pay extra on my mortgage or invest instead?", answer: "Compare your mortgage rate to expected investment returns. If your mortgage rate is 4% and investments might return 8%, investing may build more wealth. However, guaranteed interest savings and peace of mind from debt freedom have value too." },
          { question: "What's the difference between amortization and simple interest?", answer: "Amortized loans have level payments where the principal/interest split changes each month. Simple interest charges interest only on the remaining balance without a fixed payment schedule. Amortization provides predictable payments." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AmortizationCalculatorClient;
