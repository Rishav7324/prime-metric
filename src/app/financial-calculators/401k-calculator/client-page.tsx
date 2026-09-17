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
import { Copy, RotateCcw } from "lucide-react";

type K401Result = { total: number };

function computeK401(
  ageStr: string,
  retAgeStr: string,
  balanceStr: string,
  salaryStr: string,
  contribStr: string,
  matchStr: string,
  returnStr: string
): K401Result | null {
  const age = parseInt(ageStr);
  const retAge = parseInt(retAgeStr);
  const principal = parseFloat(balanceStr);
  const salary = parseFloat(salaryStr);
  const userContrib = parseFloat(contribStr);
  const employerMatch = parseFloat(matchStr);
  const annualReturn = parseFloat(returnStr);

  if (isNaN(age) || age < 18 || age > 100) return null;
  if (isNaN(retAge) || retAge < 18 || retAge > 100 || retAge <= age) return null;
  if (isNaN(principal) || principal < 0 || principal > 1e12) return null;
  if (!(salary > 0 && salary <= 1e9)) return null;
  if (isNaN(userContrib) || userContrib < 0 || userContrib > 100) return null;
  if (isNaN(employerMatch) || employerMatch < 0 || employerMatch > 100) return null;
  if (isNaN(annualReturn) || annualReturn < 0 || annualReturn > 100) return null;

  const userContribPercent = userContrib / 100;
  const employerMatchPercent = employerMatch / 100;
  const rate = annualReturn / 100;

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

  return { total: futureValue };
}

const K401Calculator = () => {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentBalance, setCurrentBalance] = useState("50000");
  const [annualSalary, setAnnualSalary] = useState("80000");
  const [contribution, setContribution] = useState("10");
  const [employerMatch, setEmployerMatch] = useState("5");
  const [returnRate, setReturnRate] = useState("7");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<K401Result | null>(() => computeK401("30", "65", "50000", "80000", "10", "5", "7"));
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeK401(currentAge, retirementAge, currentBalance, annualSalary, contribution, employerMatch, returnRate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter ages 18-100 (retirement > current), salary (1+), balance (0+), contributions 0-100%, return 0-100%.",
      });
      return;
    }

    setResult(computed);
    toast({
        title: "Calculation Complete",
        description: `Your estimated 401(k) balance at retirement is ${currencySymbol}${fmt(computed.total)}.`,
    });
  };

  const reset = () => { setCurrentAge(""); setRetirementAge(""); setCurrentBalance(""); setAnnualSalary(""); setContribution(""); setEmployerMatch(""); setReturnRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `401(k) at retirement: ${currencySymbol}${fmt(result.total)} (age ${currentAge}→${retirementAge}, salary ${currencySymbol}${fmt(parseFloat(annualSalary) || 0)}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-end mb-2">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-sm text-neutral-600">Estimated 401(k) at Retirement</p>
              <p className="text-3xl font-bold text-primary">{currencySymbol}{fmt(result.total)}</p>
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
