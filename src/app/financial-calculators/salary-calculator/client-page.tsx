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

type SalaryResult = { hourly: number; weekly: number; monthly: number; annually: number };

function computeSalary(from: string, valueStr: string, hpwStr: string, hourlyStr: string): SalaryResult | null {
  const hwp = parseFloat(hpwStr);
  const numValue = parseFloat(valueStr);
  if (isNaN(hwp) || hwp <= 0 || hwp > 168) return null;
  if (isNaN(numValue) || numValue < 0 || numValue > 1e12) return null;

  let annual = 0;
  if (from === 'annually') annual = numValue;
  else if (from === 'monthly') annual = numValue * 12;
  else if (from === 'weekly') annual = numValue * 52;
  else if (from === 'hourly') annual = numValue * hwp * 52;
  else if (from === 'hpw') {
    const hourlyNum = parseFloat(hourlyStr);
    if (isNaN(hourlyNum) || hourlyNum < 0 || hourlyNum > 1e9) return null;
    annual = hourlyNum * numValue * 52;
  } else return null;

  if (isNaN(annual) || annual < 0 || annual > 1e15) return null;
  return {
    annually: annual,
    monthly: annual / 12,
    weekly: annual / 52,
    hourly: annual / 52 / hwp,
  };
}

const SalaryCalculator = () => {
  const [hourly, setHourly] = useState("25");
  const [weekly, setWeekly] = useState("1000");
  const [monthly, setMonthly] = useState("4333");
  const [annually, setAnnually] = useState("52000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = (from: string, value: string) => {
    const hwp = parseFloat(from === 'hpw' ? value : hoursPerWeek);
    if (isNaN(hwp) || hwp <= 0 || hwp > 168) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Hours per week must be between 1 and 168."});
      return;
    }
    const computed = computeSalary(from, value, from === 'hpw' ? value : hoursPerWeek, from === 'hourly' ? value : hourly);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter a valid non-negative salary amount (up to 1,000,000,000,000)."});
      return;
    }

    setAnnually(computed.annually.toFixed(2));
    setMonthly(computed.monthly.toFixed(2));
    setWeekly(computed.weekly.toFixed(2));
    setHourly(computed.hourly.toFixed(2));
  };

  const reset = () => {
    setHourly("25");
    setWeekly("1000");
    setMonthly("4333");
    setAnnually("52000");
    setHoursPerWeek("40");
  };

  const copyResult = async () => {
    const text = `Salary: ${currencySymbol}${fmt(parseFloat(hourly) || 0)}/hour, ${currencySymbol}${fmt(parseFloat(weekly) || 0)}/week, ${currencySymbol}${fmt(parseFloat(monthly) || 0)}/month, ${currencySymbol}${fmt(parseFloat(annually) || 0)}/year (${hoursPerWeek} hrs/week). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };
  
  const handleInputChange = (setter: Function, from: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    calculate(from, e.target.value);
  }

  return (
    <CalculatorLayout
      title="Salary Calculator"
      description="Convert salary between hourly, weekly, monthly, and annual rates."
      canonicalUrl="/financial-calculators/salary-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Hours Per Week</Label>
              <Input type="number" value={hoursPerWeek} onChange={handleInputChange(setHoursPerWeek, 'hpw')} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Hourly ({currencySymbol})</Label>
              <Input type="number" value={hourly} onChange={handleInputChange(setHourly, 'hourly')} />
            </div>
            <div>
              <Label>Weekly ({currencySymbol})</Label>
              <Input type="number" value={weekly} onChange={handleInputChange(setWeekly, 'weekly')} />
            </div>
            <div>
              <Label>Monthly ({currencySymbol})</Label>
              <Input type="number" value={monthly} onChange={handleInputChange(setMonthly, 'monthly')} />
            </div>
            <div>
              <Label>Annually ({currencySymbol})</Label>
              <Input type="number" value={annually} onChange={handleInputChange(setAnnually, 'annually')} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={copyResult} variant="outline" className="flex-1">
              <Copy className="h-4 w-4 mr-2" /> Copy Result
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Salary Calculator allows you to easily convert your pay between hourly, weekly, monthly, and annual rates. This tool is helpful for comparing job offers, understanding your compensation in different terms, and budgeting your finances."
        useCases={[
            { title: "Job Offer Comparison", description: "Compare salaries from different job offers, even if one is hourly and another is salaried." },
            { title: "Budgeting", description: "Break down your annual salary into a monthly amount to create a detailed budget." },
            { title: "Negotiation", description: "Understand the annual equivalent of an hourly rate increase you are negotiating." },
        ]}
        tips={[
            { title: "Standard Work Week", description: "The calculations are based on the number of hours you enter for a work week, which is typically 40 in many places." },
            { title: "Gross vs. Net", description: "This calculator deals with gross (pre-tax) salary. Your take-home pay will be lower after taxes and other deductions." },
            { title: "Weeks in a Year", description: "The annual salary is calculated based on 52 weeks in a year." },
        ]}
        faqs={[
            { question: "How many work hours are in a year?", answer: "For a standard 40-hour work week, there are 2,080 work hours in a year (40 hours/week * 52 weeks/year)." },
            { question: "Does this account for overtime?", answer: "No, this is a simple salary converter and does not account for overtime pay, bonuses, or other forms of compensation." },
            { question: "How do I calculate my take-home pay?", answer: "To find your take-home (net) pay, you would need to subtract federal, state, and local taxes, as well as any deductions for retirement, health insurance, etc., from your gross salary. An income tax calculator can help with this." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SalaryCalculator;

    