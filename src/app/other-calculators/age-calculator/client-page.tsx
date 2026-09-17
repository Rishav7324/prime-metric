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

type AgeResult = {
  years: number; months: number; days: number;
  totalDays: number; totalMonths: number; totalWeeks: number;
  totalHours: number; totalMinutes: number;
  weekday: string; zodiac: string; nextBirthday: string; nextInDays: number;
};

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function zodiacSign(m: number, d: number): string {
  const signs: [string, [number, number], [number, number]][] = [
    ["Capricorn", [12, 22], [1, 19]], ["Aquarius", [1, 20], [2, 18]],
    ["Pisces", [2, 19], [3, 20]], ["Aries", [3, 21], [4, 19]],
    ["Taurus", [4, 20], [5, 20]], ["Gemini", [5, 21], [6, 20]],
    ["Cancer", [6, 21], [7, 22]], ["Leo", [7, 23], [8, 22]],
    ["Virgo", [8, 23], [9, 22]], ["Libra", [9, 23], [10, 22]],
    ["Scorpio", [10, 23], [11, 21]], ["Sagittarius", [11, 22], [12, 21]],
  ];
  for (const [name, [sm, sd], [em, ed]] of signs) {
    if ((m === sm && d >= sd) || (m === em && d <= ed)) return name;
  }
  return "Capricorn";
}

function computeAge(birthStr: string): AgeResult | null {
  if (!birthStr) return null;
  const birth = new Date(birthStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(birth.getTime()) || birth.getTime() > today.getTime()) return null;

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);

  // Next birthday
  let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next.getTime() <= today.getTime()) next = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  const nextInDays = Math.round((next.getTime() - today.getTime()) / 86400000);

  return {
    years, months, days, totalDays,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    weekday: WEEKDAYS[birth.getDay()],
    zodiac: zodiacSign(birth.getMonth() + 1, birth.getDate()),
    nextBirthday: next.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    nextInDays,
  };
}

const AgeCalculatorClient = () => {
  const [birthDate, setBirthDate] = useState("");
  // Auto-calculates on mount with default date so result renders instantly
  const [result, setResult] = useState<AgeResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const d = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    const iso = d.toISOString().split('T')[0];
    setBirthDate(iso);
    const computed = computeAge(iso);
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const computed = computeAge(birthDate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: !birthDate ? "Please enter your birth date." : "Birth date can't be in the future.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Age Calculated", description: `You are ${computed.years} years, ${computed.months} months old.` });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `I am ${result.years} years, ${result.months} months, ${result.days} days old (${result.totalDays.toLocaleString()} days total). Born on a ${result.weekday}, zodiac ${result.zodiac}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Exact age in years, months, days — plus weekday born, zodiac and next birthday countdown"
      keywords="age calculator, birthday calculator, date of birth calculator, how old am i, zodiac calculator"
      canonicalUrl="/other-calculators/age-calculator"
      explanation="Determines your precise age from your birth date, with fun extras like birth weekday and countdown to your next birthday."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Your Birth Date</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Date of Birth</Label>
              <Input type="date" value={birthDate} max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBirthDate(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate Age</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Your Age</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-2xl font-bold text-black">
                  {result.years}<span className="text-sm font-medium text-neutral-500">y </span>
                  {result.months}<span className="text-sm font-medium text-neutral-500">m </span>
                  {result.days}<span className="text-sm font-medium text-neutral-500">d</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ["Days", result.totalDays.toLocaleString()],
                  ["Weeks", result.totalWeeks.toLocaleString()],
                  ["Months", result.totalMonths.toLocaleString()],
                  ["Hours", result.totalHours.toLocaleString()],
                  ["Minutes", result.totalMinutes.toLocaleString()],
                  ["Weekday", result.weekday],
                ].map(([label, value]) => (
                  <div key={label} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <p className="text-[11px] text-neutral-500">{label}</p>
                    <p className="text-[13px] font-bold text-black truncate">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">Zodiac</p>
                  <p className="text-[13px] font-bold text-black">♈ {result.zodiac}</p>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">Next birthday in</p>
                  <p className="text-[13px] font-bold text-[#c25136]">{result.nextInDays} days</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">Next birthday: {result.nextBirthday}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🎂</div><p className="text-sm">Pick your birth date</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Age Calculator finds your exact chronological age — years, months and days — from your date of birth, handling leap years and month lengths correctly. It also reveals which weekday you were born on, your zodiac sign, and counts down to your next birthday."
        useCases={[
          { title: "Official Forms", description: "Get precise age in years-months-days for job, visa and exam applications." },
          { title: "Milestones", description: "Track total days lived or countdown to landmark birthdays." },
          { title: "Fun Facts", description: "Discover your birth weekday and zodiac sign to share." },
        ]}
        tips={[
          { title: "Leap Babies", description: "Born Feb 29? The calculator counts actual elapsed days, so leap birthdays stay exact." },
          { title: "Timezone Note", description: "Age uses your device date — results shift at local midnight." },
        ]}
        faqs={[
          { question: "How is exact age calculated?", answer: "Years, months and days are derived by calendar comparison (borrowing days/months like manual subtraction), while totals come from elapsed milliseconds — leap years included automatically." },
          { question: "Why do online age calculators differ by a day?", answer: "Usually timezone or time-of-day handling. We normalize both dates to local midnight for consistency." },
          { question: "What zodiac system is used?", answer: "Western tropical zodiac based on birth month and day." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default AgeCalculatorClient;
