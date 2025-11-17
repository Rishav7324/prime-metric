'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const DateCalculatorClient = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    if (!startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both a start and end date.",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid dates.",
      });
      return;
    }
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);
    
    setResult({ days: diffDays, weeks: diffWeeks, months: diffMonths, years: diffYears });
    toast({
        title: "Difference Calculated",
        description: `The difference is ${diffDays} days.`,
    });
  };

  return (
    <CalculatorLayout
      title="Date Calculator"
      description="Calculate the difference between two dates in various units"
      keywords="date calculator, time between dates, date difference, days between dates, date duration"
      canonicalUrl="/other-calculators/date-calculator"
      explanation="This calculator finds the time difference between two dates and displays the result in days, weeks, months, and years."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Difference
          </Button>
          {result && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-4 bg-primary/10 rounded-lg col-span-2 text-center">
                <p className="text-sm text-muted-foreground">Total Difference in Days</p>
                <p className="text-4xl font-bold text-primary">{result.days.toLocaleString()} Days</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-muted-foreground">In Weeks</p>
                <p className="text-xl font-bold">{result.weeks.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-muted-foreground">In Months</p>
                <p className="text-xl font-bold">{result.months.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded col-span-2 text-center">
                <p className="text-sm text-muted-foreground">In Years</p>
                <p className="text-xl font-bold">{result.years.toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The date calculator computes the time difference between two dates and displays the result in multiple units including days, weeks, months, and years. This versatile tool helps with project planning, age calculations, contract durations, event countdowns, and historical analysis. Whether you're calculating how many days until a deadline, how long since a milestone, or the duration of a project, this calculator provides instant, accurate results accounting for all calendar complexities including varying month lengths and leap years."
        useCases={[
          { title: "Project Management", description: "Calculate project durations, track milestone deadlines, estimate completion dates, and manage timeline planning for complex projects." },
          { title: "Personal Events", description: "Count days until weddings, vacations, birthdays, anniversaries, or other important life events. Perfect for event planning and countdowns." },
          { title: "Legal & Contracts", description: "Determine contract durations, lease periods, warranty expiration, statute of limitations, and other legally significant time periods." },
          { title: "Historical Analysis", description: "Calculate time elapsed between historical events, analyze trends over specific periods, or understand the time span of significant occurrences." }
        ]}
        tips={[
          { title: "Inclusive vs Exclusive Dates", description: "This calculator measures the time between dates. If you need to include both start and end dates in your count, add 1 to the days result." },
          { title: "Business Days vs Calendar Days", description: "This calculator shows calendar days. For business days (excluding weekends and holidays), you'll need to subtract non-working days manually." },
          { title: "Different Date Formats", description: "Dates can be entered in various formats depending on your browser and locale settings. The calculator automatically interprets the dates correctly." },
          { title: "Planning with Results", description: "Use the multiple unit display to choose the most meaningful representation - weeks for short periods, months for medium terms, years for long durations." }
        ]}
        faqs={[
          { question: "How does the calculator handle leap years?", answer: "The calculator automatically accounts for leap years when computing date differences. Leap years occur every 4 years (except century years not divisible by 400) and add an extra day to February." },
          { question: "Why are months and years approximate?", answer: "Months vary from 28-31 days, so month calculations use an average of 30.44 days per month. Years use 365.25 days to account for leap years. For precise results, use the days or weeks display." },
          { question: "Can I calculate dates in the future?", answer: "Yes, the calculator works for any date combination - past to present, present to future, or any historical date range. It always shows the absolute difference between the two dates." },
          { question: "What if I enter the dates in reverse order?", answer: "The calculator automatically computes the absolute difference, so it doesn't matter which date you enter first. The result will be the same either way." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default DateCalculatorClient;
