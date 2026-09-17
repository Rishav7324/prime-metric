'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type PregnancyResult = {
  dueDate: string;
  weeksPregnant: number;
};

function computePregnancy(lmpStr: string): PregnancyResult | null {
  if (!lmpStr) return null;
  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lmpDay = new Date(lmp);
  lmpDay.setHours(0, 0, 0, 0);
  if (lmpDay.getTime() > today.getTime()) return null;
  const diffDays = Math.floor((today.getTime() - lmpDay.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays > 294) return null; // more than 42 weeks ago
  const dueDate = new Date(lmpDay.getTime() + 280 * 24 * 60 * 60 * 1000);
  const weeksPregnant = Math.floor(diffDays / 7);
  return {
    dueDate: dueDate.toDateString(),
    weeksPregnant,
  };
}

function defaultLmpString(): string {
  // ~280 days ago so a due date (LMP + 280 days ≈ today) shows instantly.
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - 280);
  return d.toISOString().split("T")[0];
}

const PregnancyCalculator = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>(() => defaultLmpString());
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PregnancyResult | null>(() => computePregnancy(defaultLmpString()));
  const { toast } = useToast();

  const calculate = () => {
    if (!lastPeriodDate) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter the first day of your last menstrual period.",
      });
      return;
    }

    const lmp = new Date(lastPeriodDate);
    if (isNaN(lmp.getTime())) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter a valid date for your last menstrual period (YYYY-MM-DD).",
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lmpDay = new Date(lmp);
    lmpDay.setHours(0, 0, 0, 0);
    if (lmpDay.getTime() > today.getTime()) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Last period date cannot be in the future.",
      });
      return;
    }

    const computed = computePregnancy(lastPeriodDate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter a date within the last 42 weeks (294 days).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Due Date Estimated",
        description: `Your estimated due date is ${computed.dueDate}.`,
    });
  };

  const reset = () => {
    setLastPeriodDate(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Estimated due date: ${result.dueDate}. Approximately ${result.weeksPregnant.toLocaleString()} weeks pregnant — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Pregnancy Due Date Calculator"
      description="Estimate your due date based on your last menstrual period."
      canonicalUrl="/health-calculators/pregnancy-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>First Day of Your Last Menstrual Period (LMP)</Label>
            <Input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button" disabled={!lastPeriodDate}>Calculate Due Date</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Estimated Due Date</p>
                <p className="text-3xl font-bold text-primary">{result.dueDate}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">You are approximately</p>
                <p className="text-lg font-bold">{result.weeksPregnant.toLocaleString()} weeks pregnant</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Pregnancy Due Date Calculator estimates your baby's due date based on the first day of your last menstrual period (LMP). This method, known as Naegele's rule, is a standard way healthcare providers estimate a due date. It assumes a 28-day menstrual cycle, with ovulation occurring on day 14. The calculator adds 280 days (40 weeks) to the LMP to predict the due date."
        useCases={[
            { title: "Due Date Estimation", description: "Get a quick estimate of your baby's due date to help you plan for the arrival." },
            { title: "Tracking Pregnancy", description: "Understand how far along you are in your pregnancy in weeks." },
            { title: "Doctor's Visits", description: "Use this estimate as a starting point for discussions with your healthcare provider, who will provide a more accurate date based on ultrasound." },
        ]}
        tips={[
            { title: "This is an Estimate", description: "Only about 5% of babies are born on their exact due date. It's more of a guideline for when you can expect your baby." },
            { title: "Cycle Length Matters", description: "This calculator assumes a 28-day cycle. If your cycle is longer or shorter, your actual due date may differ. Your doctor can provide a more accurate date." },
            { title: "Ultrasound is More Accurate", description: "An early ultrasound, usually in the first trimester, is the most accurate way to determine a baby's gestational age and due date." },
        ]}
        faqs={[
            { question: "How is the due date calculated?", answer: "The most common method is Naegele's rule, which adds 280 days (40 weeks) to the first day of your last menstrual period (LMP)." },
            { question: "What if I have an irregular cycle?", answer: "If your cycles are irregular, an LMP-based due date may not be accurate. An early ultrasound is the best way to determine your due date in this case." },
            { question: "What if I don't know my LMP?", answer: "If you're unsure of your last menstrual period, a healthcare provider can use an ultrasound to measure the baby and estimate a due date." },
            { question: "Why is a pregnancy 40 weeks instead of 9 months?", answer: "Pregnancy is counted from the first day of your last period, not from conception (which happens about two weeks later). 40 weeks is roughly 9 calendar months plus about one week." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default PregnancyCalculator;

    