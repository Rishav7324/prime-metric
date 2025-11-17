
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout, { generateMetadata } from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

export const metadata = generateMetadata({
  title: "Investment Calculator",
  description: "Calculate returns on your investment with regular contributions",
  keywords: "investment calculator, compound interest calculator, investment return, savings calculator, retirement calculator",
  canonicalUrl: "/financial-calculators/investment-calculator"
});

const InvestmentCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [years, setYears] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const monthly = parseFloat(monthlyInvestment) || 0;
    const y = parseInt(years);
    const rate = parseFloat(returnRate) / 100 / 12;

    if (isNaN(y) || y <= 0 || isNaN(rate) || rate < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for all fields, with positive years and a non-negative return rate.",
      });
      return;
    }
    
    const n = y * 12;
    
    const principalFV = p * Math.pow(1 + rate, n);
    const investmentFV = monthly * ((Math.pow(1 + rate, n) - 1) / rate);
    const totalValue = principalFV + investmentFV;
    const totalInvested = p + monthly * n;
    const totalReturns = totalValue - totalInvested;
    
    setResult({ totalValue, totalInvested, totalReturns });
    toast({
        title: "Calculation Complete",
        description: `Your investment is projected to grow to $${totalValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Investment Calculator"
      description="Calculate returns on your investment with regular contributions"
      canonicalUrl="/financial-calculators/investment-calculator"
      formula="FV = PV(1+r)ⁿ + PMT × [((1+r)ⁿ - 1) / r]"
      explanation="This calculator estimates the future value of your investment based on initial amount, regular contributions, time period, and expected rate of return."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Initial Investment ($)</Label>
            <Input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              placeholder="e.g., 1000"
            />
          </div>
          <div>
            <Label>Monthly Investment ($)</Label>
            <Input
              type="number"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              placeholder="e.g., 200"
            />
          </div>
          <div>
            <Label>Investment Period (Years)</Label>
            <Input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <Label>Expected Annual Return (%)</Label>
            <Input
              type="number"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              placeholder="e.g., 8"
              step="0.1"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Investment</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Projected Future Value</p>
                <p className="text-3xl font-bold text-primary">
                  ${result.totalValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-lg font-bold">${result.totalInvested.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                  <p className="text-lg font-bold text-green-500">${result.totalReturns.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Investment Calculator is a comprehensive financial tool that projects the future value of your investments by considering your initial investment amount, regular monthly contributions, investment timeframe, and expected annual return rate. Using the power of compound interest - where your earnings generate their own earnings - this calculator demonstrates how consistent investing over time can build substantial wealth. Whether you're saving for retirement, a home down payment, your children's education, or any long-term financial goal, this calculator helps you visualize your investment growth trajectory and make informed decisions about your savings strategy."
        useCases={[
          { title: "Long-Term Wealth Building", description: "Plan systematic wealth accumulation by visualizing how regular monthly investments grow over decades through compound returns, helping you achieve financial independence." },
          { title: "Education Savings Planning", description: "Calculate how much to invest monthly in a 529 plan or other education savings account to fully fund college expenses by the time your child reaches college age." },
          { title: "Down Payment Savings", description: "Determine the monthly investment needed to save for a house down payment within your target timeframe, helping you set realistic homeownership goals." },
          { title: "Early Retirement Goal Setting", description: "Project how aggressive saving and investing can accelerate your path to early retirement, showing you what's possible with different savings rates and return scenarios." },
          { title: "Investment Strategy Testing", description: "Compare different investment approaches - aggressive growth versus conservative income - by adjusting expected return rates to see how strategy choices impact outcomes." },
          { title: "Legacy & Estate Planning", description: "Estimate the estate value you could leave to heirs or charities by projecting long-term investment growth under various contribution and return scenarios." }
        ]}
        tips={[
          { title: "Harness Compound Interest Early", description: "The earlier you start investing, the more time compound interest has to work its magic. Even small amounts invested in your 20s can outgrow much larger amounts invested in your 40s due to decades of compounding returns." },
          { title: "Automate Your Investments", description: "Set up automatic monthly transfers to your investment accounts to ensure consistency. Dollar-cost averaging through regular contributions helps smooth out market volatility and removes emotion from investing decisions." },
          { title: "Use Realistic Return Expectations", description: "The S&P 500 has historically returned about 10% annually, but individual results vary. Use 7-8% for diversified stock portfolios, 5-6% for balanced portfolios, and 3-4% for conservative bond-heavy portfolios for realistic planning." },
          { title: "Reinvest All Dividends", description: "Always reinvest dividends and interest payments rather than taking them as cash. Reinvested dividends can account for up to 40% of total long-term returns through the power of compounding." },
          { title: "Increase Contributions with Income", description: "Whenever you receive a raise, bonus, or windfall, increase your monthly investment amount. This allows you to accelerate wealth building without impacting your current lifestyle or spending habits." },
          { title: "Consider Tax-Advantaged Accounts", description: "Maximize contributions to 401(k), IRA, and HSA accounts first. These offer tax deductions or tax-free growth, effectively boosting your returns by 20-30% compared to taxable accounts." }
        ]}
        faqs={[
          { question: "What is compound interest and why is it important?", answer: "Compound interest means earning returns on your returns. When you invest $1,000 and earn 8%, you gain $80. The next year, you earn 8% on $1,080, gaining $86.40. This snowball effect accelerates wealth building over time. Albert Einstein allegedly called it 'the eighth wonder of the world' because those who understand it earn it, while those who don't pay it." },
          { question: "How much should I invest each month?", answer: "Financial advisors recommend investing 15-20% of your gross income for long-term wealth building and retirement. If you earn $5,000/month, that's $750-1,000 monthly. Start with what you can afford, even if it's just $50-100, and increase gradually. The key is consistency and starting as early as possible." },
          { question: "What's a realistic investment return to expect?", answer: "Historically, diversified stock portfolios have returned 9-10% annually, bonds 4-5%, and balanced portfolios 6-8%. However, these are averages over decades with significant year-to-year volatility. For planning purposes, use conservative estimates: 7-8% for stock-heavy portfolios, 5-6% for balanced, 3-4% for conservative bond portfolios." },
          { question: "Should I invest during market downturns?", answer: "Yes! Market downturns offer buying opportunities. Continuing to invest during downturns (or increasing contributions) means you buy more shares at lower prices. When the market recovers, these shares appreciate significantly. This is called 'buying the dip' and dollar-cost averaging through regular contributions automatically does this for you." },
          { question: "How long should I plan to keep my money invested?", answer: "For stock-based investments, plan for at least 5-10 years, ideally longer. Short-term market volatility can result in losses, but historically, the stock market has never had a negative 20-year period. The longer your time horizon, the more aggressive you can be, and the more time compound interest has to work." },
          { question: "What's the difference between this calculator and a savings account?", answer: "This calculator assumes you're investing in assets that grow (stocks, mutual funds, ETFs), typically earning 6-10% annually. Regular savings accounts currently earn 0.01-5% with FDIC insurance. Investments carry more risk but offer far greater growth potential. Use savings accounts for emergency funds and short-term goals; use investments for long-term wealth building." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default InvestmentCalculator;
