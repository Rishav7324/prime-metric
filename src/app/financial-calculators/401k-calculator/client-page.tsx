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

const K401Calculator = () => {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentBalance, setCurrentBalance] = useState("50000");
  const [annualSalary, setAnnualSalary] = useState("80000");
  const [contribution, setContribution] = useState("10");
  const [employerMatch, setEmployerMatch] = useState("5");
  const [returnRate, setReturnRate] = useState("7");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const principal = parseFloat(currentBalance);
    const salary = parseFloat(annualSalary);
    const userContribPercent = parseFloat(contribution) / 100;
    const employerMatchPercent = parseFloat(employerMatch) / 100;
    const rate = parseFloat(returnRate) / 100;

    if (isNaN(age) || isNaN(retAge) || retAge <= age || isNaN(principal) || isNaN(salary) || isNaN(userContribPercent) || isNaN(employerMatchPercent) || isNaN(rate)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields.",
      });
      return;
    }

    let futureValue = principal;
    let currentSalary = salary;
    const yearsToRetirement = retAge - age;

    for (let i = 0; i < yearsToRetirement; i++) {
        const userContribution = currentSalary * userContribPercent;
        const employerContribution = currentSalary * employerMatchPercent;
        const totalContribution = userContribution + employerContribution;
        
        futureValue = (futureValue + totalContribution) * (1 + rate);
        currentSalary *= 1.02; // Assuming 2% annual salary increase
    }

    setResult({ total: futureValue });
    toast({
        title: "Calculation Complete",
        description: `Your estimated 401(k) balance at retirement is ${currencySymbol}${futureValue.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}.`,
    });
  };

  return (
    <CalculatorLayout
      title="401(k) Calculator"
      description="Estimate your 401(k) growth over time with employer match and contributions."
      canonicalUrl="/financial-calculators/401k-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Annual Salary ({currencySymbol})</Label>
              <Input type="number" value={annualSalary} onChange={(e) => setAnnualSalary(e.target.value)} placeholder="e.g., 80000" />
            </div>
            <div>
              <Label>Current Age</Label>
              <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} placeholder="e.g., 30" />
            </div>
            <div>
              <Label>Retirement Age</Label>
              <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} placeholder="e.g., 65" />
            </div>
            <div>
              <Label>Current 401(k) Balance ({currencySymbol})</Label>
              <Input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} placeholder="e.g., 50000" />
            </div>
            <div>
              <Label>Your Contribution (%)</Label>
              <Input type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} placeholder="e.g., 10" />
            </div>
            <div>
              <Label>Employer Match (%)</Label>
              <Input type="number" value={employerMatch} onChange={(e) => setEmployerMatch(e.target.value)} placeholder="e.g., 5" />
            </div>
            <div>
              <Label>Expected Annual Return (%)</Label>
              <Input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 7" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Estimated 401(k) at Retirement</p>
              <p className="text-3xl font-bold text-primary">{currencySymbol}{result.total.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The 401(k) Calculator estimates the future value of your 401(k) retirement savings based on your current balance, contributions, employer match, and expected investment returns. It helps you visualize how your retirement savings can grow over time and whether you're on track to meet your goals."
        useCases={[
            { title: "Retirement Planning", description: "Project your retirement savings to see if you are saving enough for a comfortable retirement." },
            { title: "Contribution Strategy", description: "See how increasing your contribution percentage can significantly boost your nest egg." },
            { title: "Employer Match Impact", description: "Understand the powerful effect of 'free money' from your employer's matching contributions." },
        ]}
        tips={[
            { title: "Maximize Employer Match", description: "Always contribute at least enough to get the full employer match. It's an instant, guaranteed return on your investment." },
            { title: "Increase Contributions Annually", description: "Try to increase your contribution percentage by 1% each year. Small, regular increases can have a huge impact over time." },
            { title: "Stay the Course", description: "Don't panic during market downturns. Consistent contributions allow you to buy more shares when prices are low, which can accelerate growth during a recovery." },
        ]}
        faqs={[
            { question: "What is a 401(k)?", answer: "A 401(k) is an employer-sponsored retirement savings plan that allows you to invest a portion of your paycheck before taxes are taken out. Many employers also offer a matching contribution." },
            { question: "What's a realistic rate of return to expect?", answer: "Historically, a diversified portfolio of stocks has returned an average of 7-10% annually over the long term. It's often wise to use a more conservative estimate, like 6-7%, for planning." },
            { question: "How much should I be saving in my 401(k)?", answer: "A common recommendation is to save at least 15% of your pre-tax income for retirement, including any employer match." },
            { question: "What is the difference between a Traditional and a Roth 401(k)?", answer: "Traditional 401(k) contributions are pre-tax, lowering your current taxable income, but withdrawals in retirement are taxed. Roth 401(k) contributions are after-tax, but qualified withdrawals in retirement are tax-free." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default K401Calculator;

    