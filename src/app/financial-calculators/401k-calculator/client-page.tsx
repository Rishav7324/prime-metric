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
        aboutContent="The 401(k) Calculator is a powerful financial planning tool designed to project the future value of a 401(k) retirement account. By inputting key variables such as current age, desired retirement age, current 401(k) balance, annual salary, contribution percentages (both employee and employer), and the expected annual rate of return, users can receive a detailed forecast of their potential retirement savings. This calculator not only provides a future lump-sum estimate but also helps individuals understand the profound impact of long-term, consistent investing. It illustrates the power of compound interest, the value of employer matching contributions (often referred to as 'free money'), and the importance of starting to save early. The tool assumes a standard 2% annual salary increase to provide a more realistic long-term projection. By visualizing their potential nest egg, users can make informed decisions about their savings strategy, adjust their contributions, and assess whether they are on track to achieve a financially secure retirement. It serves as an essential first step in comprehensive retirement planning, empowering users to take control of their financial future."
        useCases={[
            { title: "Retirement Planning", description: "Project your total retirement savings to determine if you are on a path to a comfortable retirement. Use the results to set or adjust long-term financial goals." },
            { title: "Contribution Strategy", description: "Analyze how different contribution percentages affect your final nest egg. See the significant long-term impact of increasing your contribution by even 1-2%." },
            { title: "Employer Match Analysis", description: "Understand the powerful effect of employer matching. This calculator quantifies the 'free money' you receive, highlighting why contributing enough to get the full match is crucial." },
            { title: "Job Offer Comparison", description: "When considering a new job, use this calculator to compare the long-term value of different 401(k) matching programs offered by potential employers." }
        ]}
        examples={[
            {
                title: "Scenario: Young Professional Starting Out",
                description: "A 25-year-old starts a new job with a $60,000 salary and no prior 401(k) savings. They decide to contribute 8% of their salary, and their employer matches 50% of the first 6% (a 3% match).",
                steps: [
                    "Enter Current Age: 25",
                    "Enter Retirement Age: 65",
                    "Enter Current Balance: 0",
                    "Enter Annual Salary: 60000",
                    "Enter Your Contribution: 8%",
                    "Enter Employer Match: 3%",
                    "Enter Expected Return: 7%",
                    "The result shows how even modest, early contributions can grow into a substantial sum over 40 years, demonstrating the power of time and compounding."
                ]
            },
            {
                title: "Scenario: Mid-Career Catch-Up",
                description: "A 40-year-old with $100,000 in their 401(k) realizes they need to save more aggressively. Their salary is $90,000, and they have a 5% employer match.",
                steps: [
                    "Enter Current Age: 40, Retirement Age: 65",
                    "Enter Current Balance: 100000",
                    "Enter Annual Salary: 90000",
                    "Enter Employer Match: 5%",
                    "First, calculate with their current 8% contribution. Then, re-calculate with an increased 15% contribution.",
                    "This comparison clearly illustrates how increasing contributions later in a career can still have a dramatic, positive impact on the final retirement balance."
                ]
            }
        ]}
        tips={[
            { title: "Maximize Employer Match", description: "Always contribute at least enough to receive the full employer match. It is an instant, guaranteed return on your investment and is the fastest way to accelerate your savings." },
            { title: "Increase Contributions Annually", description: "Try to increase your contribution percentage by 1% each year, perhaps when you get a raise. These small, regular increments can have a huge impact on your final balance over time without drastically affecting your take-home pay." },
            { title: "Stay the Course During Market Volatility", description: "Market downturns are a normal part of investing. Continuing your regular contributions during these times means you are buying more shares at a lower price (dollar-cost averaging), which can significantly accelerate growth when the market recovers." },
            { title: "Review Your Investments", description: "Don't just 'set it and forget it.' Review your 401(k) investments annually to ensure they are still aligned with your risk tolerance and time horizon. Consider rebalancing if your asset allocation has drifted." }
        ]}
        faqs={[
            { question: "What is a 401(k)?", answer: "A 401(k) is an employer-sponsored retirement savings plan in the United States that allows employees to invest a portion of their paycheck, often before taxes are taken out. Many employers also offer a matching contribution, which is a powerful incentive to save." },
            { question: "What is a realistic rate of return to expect?", answer: "Historically, a diversified portfolio of stocks (like an S&P 500 index fund) has returned an average of 7-10% annually over the long term, after adjusting for inflation. However, past performance is not a guarantee of future results. It's often wise to use a more conservative estimate, like 6-7%, for planning purposes." },
            { question: "How much should I be saving in my 401(k)?", answer: "A common financial rule of thumb is to save at least 15% of your pre-tax income for retirement, which includes any employer match. For example, if you contribute 10% and your employer matches 5%, you've reached the 15% goal." },
            { question: "What is the difference between a Traditional 401(k) and a Roth 401(k)?", answer: "Traditional 401(k) contributions are made pre-tax, which lowers your current taxable income. You pay taxes on the withdrawals in retirement. Roth 401(k) contributions are made after-tax, meaning you don't get a tax break now, but your qualified withdrawals in retirement are completely tax-free." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default K401Calculator;
