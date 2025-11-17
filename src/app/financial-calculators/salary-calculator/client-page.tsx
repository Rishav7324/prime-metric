'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";

const SalaryCalculator = () => {
  const [hourly, setHourly] = useState("25");
  const [weekly, setWeekly] = useState("1000");
  const [monthly, setMonthly] = useState("4333");
  const [annually, setAnnually] = useState("52000");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = (from: string, value: string) => {
    const numValue = parseFloat(value);
    const hwp = parseFloat(hoursPerWeek);

    if (isNaN(numValue) || isNaN(hwp) || hwp <= 0) {
      if (from === 'hpw') toast({ variant: "destructive", title: "Invalid Input", description: "Hours per week must be a positive number."});
      return;
    }
    
    let annual = 0;
    if (from === 'annually') annual = numValue;
    if (from === 'monthly') annual = numValue * 12;
    if (from === 'weekly') annual = numValue * 52;
    if (from === 'hourly') annual = numValue * hwp * 52;
    if (from === 'hpw') annual = parseFloat(hourly) * numValue * 52;

    if (isNaN(annual)) return;

    setAnnually(annual.toFixed(2));
    setMonthly((annual / 12).toFixed(2));
    setWeekly((annual / 52).toFixed(2));
    setHourly((annual / 52 / hwp).toFixed(2));
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

    