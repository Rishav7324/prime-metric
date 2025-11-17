
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const FinanceCalculator = () => {
  const [calcType, setCalcType] = useState("future-value");
  const [presentValue, setPresentValue] = useState("");
  const [rate, setRate] = useState("");
  const [periods, setPeriods] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const pv = parseFloat(presentValue);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(periods);

    if (isNaN(pv) || isNaN(r) || isNaN(n) || pv <= 0 || r < 0 || n <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid positive numbers for all fields.",
      });
      return;
    }

    let calculatedResult = 0;
    
    if (calcType === "future-value") {
      calculatedResult = pv * Math.pow(1 + r, n);
    } else if (calcType === "present-value") {
      calculatedResult = pv / Math.pow(1 + r, n);
    }

    setResult(calculatedResult);
    toast({
        title: "Calculation Complete",
        description: `The ${calcType === "future-value" ? "Future Value" : "Present Value"} has been calculated.`,
    });
  };

  return (
    <CalculatorLayout
      title="Finance Calculator"
      description="Calculate Future Value and Present Value of money"
      canonicalUrl="/financial-calculators/finance-calculator"
      formula={calcType === "future-value" ? "FV = PV × (1 + r)^n" : "PV = FV / (1 + r)^n"}
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Calculation Type</Label>
            <Select value={calcType} onValueChange={(value) => {
              setCalcType(value);
              setResult(null);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="future-value">Future Value (FV)</SelectItem>
                <SelectItem value="present-value">Present Value (PV)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{calcType === "future-value" ? "Present Value ($)" : "Future Value ($)"}</Label>
            <Input
              type="number"
              value={presentValue}
              onChange={(e) => setPresentValue(e.target.value)}
              placeholder="e.g., 10000"
            />
          </div>
          <div>
            <Label>Interest Rate (% per period)</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="e.g., 5"
              step="0.1"
            />
          </div>
          <div>
            <Label>Number of Periods</Label>
            <Input
              type="number"
              value={periods}
              onChange={(e) => setPeriods(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate
          </Button>
          {result !== null && !isNaN(result) && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                Calculated {calcType === "future-value" ? "Future Value" : "Present Value"}
              </p>
              <p className="text-4xl font-bold text-primary">${result.toFixed(2)}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The finance calculator performs fundamental time value of money calculations, including future value and present value computations. These calculations are core to financial planning, investment analysis, and understanding how money grows over time. Future value shows what an investment today will be worth in the future given an interest rate and time period. Present value calculates what a future amount is worth in today's dollars. Both calculations are essential for comparing investment options, retirement planning, and making informed financial decisions."
        useCases={[
          { title: "Investment Planning", description: "Calculate how much your current investments will grow over time, or determine how much you need to invest today to reach a future financial goal." },
          { title: "Retirement Calculations", description: "Estimate future value of retirement savings or determine present value of required retirement income to plan adequate savings." },
          { title: "Loan Analysis", description: "Understand the present value of loan payments or future value of payment streams to compare financing options and evaluate deals." },
          { title: "Business Valuation", description: "Calculate present value of future cash flows for business investments, project evaluations, or capital budgeting decisions." }
        ]}
        tips={[
          { title: "Time Value of Money", description: "Money available today is worth more than the same amount in the future due to its potential earning capacity. This principle underpins all financial calculations." },
          { title: "Compounding Effects", description: "Future value calculations assume interest compounds over time. More frequent compounding periods (quarterly vs annually) result in higher future values." },
          { title: "Realistic Rate Assumptions", description: "Use realistic interest rates based on historical averages. Stock markets average 7-10% annually after inflation, while bonds are typically lower at 3-5%." },
          { title: "Inflation Consideration", description: "Real returns account for inflation. If investments earn 7% but inflation is 3%, your real return is approximately 4%. Consider inflation when planning long-term." }
        ]}
        faqs={[
          { question: "What's the difference between future value and present value?", answer: "Future value calculates what money invested today will grow to in the future. Present value determines what a future sum is worth in today's dollars. They're inverse calculations - one moves forward in time, the other backward." },
          { question: "What interest rate should I use?", answer: "Use expected rate of return for your investment type: stocks (7-10%), bonds (3-5%), savings accounts (1-3%), or real estate (8-12%). Conservative estimates are safer for planning purposes." },
          { question: "How do I account for inflation?", answer: "Use the real interest rate (nominal rate minus inflation rate) for more accurate future purchasing power. If nominal return is 8% and inflation is 3%, use 5% for calculations." },
          { question: "Why is the period number important?", answer: "The period number represents compounding frequency. More periods mean more compounding, which significantly affects results over time. Make sure rate and period match (annual rate with annual periods, etc.)." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default FinanceCalculator;
