
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout, { generateMetadata } from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

export const metadata = generateMetadata({
  title: "Income Tax Calculator",
  description: "Estimate your income tax using simplified tax brackets",
  keywords: "income tax calculator, tax estimator, tax brackets, federal income tax",
  canonicalUrl: "/financial-calculators/income-tax-calculator",
});

const IncomeTaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("single");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const grossIncome = parseFloat(income);

    if (isNaN(grossIncome) || grossIncome < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid annual income.",
      });
      return;
    }

    let taxRate = 0;
    
    // Simplified tax brackets
    if (filingStatus === "single") {
      if (grossIncome <= 10000) taxRate = 0.10;
      else if (grossIncome <= 40000) taxRate = 0.12;
      else if (grossIncome <= 85000) taxRate = 0.22;
      else taxRate = 0.24;
    } else { // married
      if (grossIncome <= 20000) taxRate = 0.10;
      else if (grossIncome <= 80000) taxRate = 0.12;
      else if (grossIncome <= 170000) taxRate = 0.22;
      else taxRate = 0.24;
    }

    const taxAmount = grossIncome * taxRate;
    const netIncome = grossIncome - taxAmount;

    setResult({
      taxRate: (taxRate * 100).toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      netIncome: netIncome.toFixed(2)
    });

    toast({
        title: "Tax Calculated",
        description: `Your estimated tax amount is $${taxAmount.toFixed(2)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      description="Estimate your income tax using simplified tax brackets"
      canonicalUrl="/financial-calculators/income-tax-calculator"
      formula="Tax = Income × Applicable Tax Rate"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Annual Gross Income ($)</Label>
            <Input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="e.g., 50000"
            />
          </div>
          <div>
            <Label>Filing Status</Label>
            <Select value={filingStatus} onValueChange={setFilingStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married Filing Jointly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Tax
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Net Income (After Tax)</p>
                <p className="text-4xl font-bold text-primary">${result.netIncome}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                  <p className="text-xl font-bold">{result.taxRate}%</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Tax Amount</p>
                  <p className="text-xl font-bold">${result.taxAmount}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Income Tax Calculator provides a simplified estimate of your federal income tax liability based on your annual gross income and filing status. It uses a basic tax bracket system to give you a quick overview of your potential taxes. This tool is intended for educational and estimation purposes only."
        useCases={[
          { title: "Quick Tax Estimate", description: "Get a rough idea of your annual income tax for budgeting purposes." },
          { title: "Comparing Salaries", description: "Understand the after-tax difference between two salary offers." },
          { title: "Financial Planning", description: "Estimate your tax burden to better plan your savings and investments." }
        ]}
        tips={[
          { title: "This is an Estimate", description: "This calculator uses a simplified model. Your actual tax liability will depend on deductions, credits, and state taxes, which are not included here." },
          { title: "Check Official Sources", description: "For accurate tax filing, always consult the official IRS guidelines or a qualified tax professional." },
          { title: "Filing Status Matters", description: "Your filing status (Single, Married Filing Jointly, etc.) significantly impacts your tax brackets and standard deduction." }
        ]}
        faqs={[
          { question: "Does this calculator include state taxes?", answer: "No, this is a simplified federal income tax calculator. State income taxes vary widely by location and are not included in this calculation." },
          { question: "What are tax brackets?", answer: "Tax brackets are ranges of income that are taxed at different rates. As your income increases, it moves into higher brackets, and that portion of your income is taxed at a higher rate. This is called a progressive tax system." },
          { question: "What are deductions and credits?", answer: "Deductions (like the standard deduction) reduce your taxable income, while credits directly reduce your tax bill. This calculator does not account for them, so your actual tax may be lower." },
          { question: "Is this suitable for filing my taxes?", answer: "No. This tool is for informational and planning purposes only. It is not a substitute for professional tax advice or official tax filing software." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default IncomeTaxCalculator;
