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

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [returnRate, setReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const p = parseFloat(monthlyInvestment);
    const r = parseFloat(returnRate) / 100 / 12;
    const n = parseInt(timePeriod) * 12;

    if (isNaN(p) || p <= 0 || isNaN(r) || isNaN(n) || n <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid, positive numbers for all fields.",
      });
      return;
    }

    const futureValue = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvested = p * n;
    const wealthGained = futureValue - totalInvested;
    
    setResult({
      futureValue: futureValue.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      wealthGained: wealthGained.toFixed(2),
    });

    toast({
        title: "Calculation Complete",
        description: `Your estimated future value is ${currencySymbol}${futureValue.toFixed(2)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="SIP (Systematic Investment Plan) Calculator"
      description="Estimate the returns on your monthly SIP investments."
      canonicalUrl="/financial-calculators/sip-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Monthly Investment ({currencySymbol})</Label>
              <Input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} placeholder="e.g., 5000" />
            </div>
            <div>
              <Label>Expected Annual Return Rate (%)</Label>
              <Input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="e.g., 12" />
            </div>
            <div>
              <Label>Time Period (Years)</Label>
              <Input type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} placeholder="e.g., 10" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate SIP Returns</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Estimated Future Value</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{result.futureValue}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Invested</p>
                  <p className="text-lg font-bold">{currencySymbol}{result.totalInvested}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Wealth Gained</p>
                  <p className="text-lg font-bold">{currencySymbol}{result.wealthGained}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="A Systematic Investment Plan (SIP) is a method of investing a fixed amount of money in mutual funds or stocks at regular intervals. This calculator helps you estimate the future value of your SIP investments based on your monthly investment amount, expected rate of return, and the investment duration."
        useCases={[
            { title: "Long-Term Goal Planning", description: "Plan for long-term financial goals like retirement, a child's education, or buying a home." },
            { title: "Wealth Creation", description: "Visualize how small, regular investments can grow into a significant corpus over time through the power of compounding." },
            { title: "Comparing Scenarios", description: "Experiment with different investment amounts, return rates, and time periods to see how they impact your final returns." },
        ]}
        tips={[
            { title: "The Power of Compounding", description: "The longer you stay invested, the more your money works for you. The wealth gained through compounding often surpasses the total amount you invested." },
            { title: "Rupee Cost Averaging", description: "By investing a fixed amount regularly, you buy more units when the market is low and fewer when it's high. This averages out your cost per unit over time." },
            { title: "Be Patient and Consistent", description: "SIPs are designed for long-term investing. Don't be discouraged by short-term market fluctuations. Consistency is key." },
        ]}
        faqs={[
            { question: "What is a SIP?", answer: "A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. It allows you to invest a fixed amount of money at regular intervals (usually monthly)." },
            { question: "What is a realistic expected rate of return?", answer: "Equity mutual funds have historically delivered returns in the range of 12-15% over the long term. However, this is not guaranteed and depends on market performance. It's wise to be conservative with your expectations." },
            { question: "Is SIP better than a lump sum investment?", answer: "It depends on the market. SIPs benefit from rupee cost averaging and are less risky for beginners. A lump sum investment can yield higher returns if timed correctly during a market low, but it's also riskier." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SipCalculator;

    