'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type DateResult = {
  days: number;
  weeks: number;
  months: number;
  years: number;
};

function computeDateDiff(startStr: string, endStr: string): DateResult | null {
  if (!startStr || !endStr) return null;
  const start = new Date(startStr + "T00:00:00");
  const end = new Date(endStr + "T00:00:00");
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30.44);
  const diffYears = Math.floor(diffDays / 365.25);
  return { days: diffDays, weeks: diffWeeks, months: diffMonths, years: diffYears };
}

function toISODate(d: Date): string {
  return d.toISOString().split("T")[0];
}

const DateCalculatorClient = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Auto-calculates on mount with default dates so result renders instantly
  const [result, setResult] = useState<DateResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1);
    const startISO = toISODate(start);
    const endISO = toISODate(today);
    setStartDate(startISO);
    setEndDate(endISO);
    const computed = computeDateDiff(startISO, endISO);
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    if (!startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both a start and end date.",
      });
      return;
    }

    const start = new Date(startDate + "T00:00:00");
    const end = new Date(endDate + "T00:00:00");
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid dates.",
      });
      return;
    }
    
    const computed = computeDateDiff(startDate, endDate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid dates.",
      });
      return;
    }
    setResult(computed);
    toast({
        title: "Difference Calculated",
        description: `The difference is ${computed.days.toLocaleString()} days.`,
    });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `Date difference: ${result.days.toLocaleString()} days (${result.weeks.toLocaleString()} weeks, ${result.months.toLocaleString()} months, ${result.years.toLocaleString()} years) between ${startDate} and ${endDate}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate Difference
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg col-span-2 text-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">Total Difference in Days</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-2xl font-bold text-primary">{result.days.toLocaleString()} Days</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">In Weeks</p>
                <p className="text-xl font-bold">{result.weeks.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">In Months</p>
                <p className="text-xl font-bold">{result.months.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded col-span-2 text-center">
                <p className="text-sm text-neutral-600">In Years</p>
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
        examples={[
          { title: "1 January 2024 to 1 January 2025", description: "A full leap year apart: 366 days, 52 weeks, 12 months and 1 year.", steps: ["Days: 1 Jan 2024 to 1 Jan 2025 spans leap day 29 Feb 2024, so 366 days.", "Weeks: 366 / 7 = 52 full weeks (52 × 7 = 364) plus 2 days.", "Months: 366 / 30.44 = 12; years: 366 / 365.25 = 1."] },
          { title: "1 March 2026 to 18 September 2026", description: "Spring to autumn 2026: 201 days, 28 weeks, 6 months and 0 years.", steps: ["Add month hops: 31 + 30 + 31 + 30 + 31 + 31 = 184 days from 1 March to 1 September.", "Add 17 days from 1 to 18 September: 184 + 17 = 201 days.", "Weeks: 201 / 7 = 28; months: 201 / 30.44 = 6; years: 201 / 365.25 = 0."] },
        ]}
        faqs={[
          { question: "How does the calculator handle leap years?", answer: "The calculator automatically accounts for leap years when computing date differences. Leap years occur every 4 years (except century years not divisible by 400) and add an extra day to February." },
          { question: "Why are months and years approximate?", answer: "Months vary from 28-31 days, so month calculations use an average of 30.44 days per month. Years use 365.25 days to account for leap years. For precise results, use the days or weeks display." },
          { question: "Can I calculate dates in the future?", answer: "Yes, the calculator works for any date combination - past to present, present to future, or any historical date range. It always shows the absolute difference between the two dates." },
          { question: "What if I enter the dates in reverse order?", answer: "The calculator automatically computes the absolute difference, so it doesn't matter which date you enter first. The result will be the same either way." },
          { question: "How many days are there from 1 January 2025 to 18 September 2026?", answer: "There are 625 days. From 1 Jan 2025 to 1 Jan 2026 is 365 days (2025 is not a leap year), plus 260 days from 1 Jan to 18 Sep 2026 (31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 17). That is 89 weeks, 20 months and 1 year in the other units." },
          { question: "A 90-day contract starts 10 October 2026 — when does it end?", answer: "It ends on 8 January 2027. October has 21 remaining days after the 10th (31 − 10), plus 30 in November and 31 in December = 82 days, so day 90 lands 8 days into January (90 − 82 = 8)." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default DateCalculatorClient;
