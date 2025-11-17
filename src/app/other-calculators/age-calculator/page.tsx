
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    if (!birthDate) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter your birth date.",
      });
      return;
    }
    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      // Get the last day of the previous month
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    setResult({ years, months, days, totalDays, totalMonths, totalWeeks });
    toast({
        title: "Age Calculated",
        description: "Your age has been successfully calculated.",
    });
  };

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days, and more"
      keywords="age calculator, birthday calculator, date of birth calculator, how old am i"
      canonicalUrl="/other-calculators/age-calculator"
      explanation="This calculator determines your age based on your birth date and the current date, providing results in various time units."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Your Birth Date</Label>
            <Input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Age
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                 <p className="text-sm text-muted-foreground">Your Age</p>
                <p className="text-3xl font-bold text-primary">
                  {result.years} years, {result.months} months, {result.days} days
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Months</p>
                  <p className="text-xl font-bold">{result.totalMonths.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Total Weeks</p>
                  <p className="text-xl font-bold">{result.totalWeeks.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded col-span-2 text-center">
                  <p className="text-sm text-muted-foreground">Total Days</p>
                  <p className="text-xl font-bold">{result.totalDays.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The age calculator is a precise tool that determines your exact age in multiple time units. Whether you need your age in years, months, days, or even total hours lived, this calculator provides accurate results instantly. Age calculation is more complex than simple subtraction because it must account for varying month lengths, leap years, and calendar nuances. This tool is essential for legal documents, health assessments, milestone celebrations, and countless other applications where precise age matters."
        useCases={[
          { title: "Legal & Official Documents", description: "Verify age requirements for voting, driving licenses, employment, retirement benefits, or any age-restricted activities and services." },
          { title: "Health & Medical", description: "Calculate age for medical records, pediatric growth charts, vaccination schedules, or age-appropriate health screenings and assessments." },
          { title: "Celebrations & Milestones", description: "Plan birthday celebrations, count down to milestone birthdays, or calculate exactly how many days until a special age or anniversary." },
          { title: "School & Education", description: "Determine grade placement eligibility, calculate age for school enrollment cutoffs, or verify age requirements for educational programs." }
        ]}
        tips={[
          { title: "Leap Year Accuracy", description: "This calculator accounts for leap years automatically, ensuring your age is calculated precisely even across February 29th dates." },
          { title: "Multiple Time Units", description: "View your age in different units (years, months, days, weeks) to gain different perspectives on your lifespan and milestones." },
          { title: "Future Date Planning", description: "While designed for past dates, you can use date math to plan ahead for future milestones by calculating time differences." },
          { title: "Time Zone Considerations", description: "Age calculations are typically based on dates, not specific times. Your age changes at midnight on your birthday in your local time zone." }
        ]}
        faqs={[
          { question: "Why is my age in months different than years × 12?", answer: "The calculator shows your actual age in complete months lived, which accounts for partial years. Your total months will be slightly different from years × 12 if your birthday hasn't occurred yet this year." },
          { question: "How do leap years affect age calculation?", answer: "Leap years add an extra day (February 29th) every four years. The calculator automatically accounts for these when calculating your total days lived and ensures accuracy across all calendar variations." },
          { question: "Can I calculate age for dates in the future?", answer: "This calculator is designed for birth dates in the past. For future dates, you'd be calculating time until that date rather than age. Consider using a date difference calculator for future dates." },
          { question: "Why does my age change at midnight, not my birth time?", answer: "Age is traditionally calculated by date, not time. Legally and culturally, you turn a year older at midnight on your birthday, regardless of what time you were actually born." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AgeCalculator;
