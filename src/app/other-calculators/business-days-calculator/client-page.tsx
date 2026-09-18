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

type Mode = "diff" | "add";

type DiffResult = { totalDays: number; weekendDays: number; businessDays: number; holidays: number; netBusinessDays: number };
type AddResult = { resultIso: string; formatted: string; weekday: string; skippedWeekends: number };

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toISO = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function defaultRange(): { s: string; e: string } {
  const t = new Date();
  const e = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 30);
  return { s: toISO(t), e: toISO(e) };
}

function parseDay(s: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (isNaN(date.getTime()) || date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date;
}

const isWeekend = (d: Date): boolean => d.getDay() === 0 || d.getDay() === 6;

function computeDiff(startStr: string, endStr: string, holidaysStr: string): DiffResult | null {
  const start = parseDay(startStr);
  const end = parseDay(endStr);
  if (!start || !end || end < start) return null;
  if (!/^\d*$/.test(holidaysStr.trim())) return null;
  const holidays = holidaysStr.trim() === "" ? 0 : parseInt(holidaysStr.trim(), 10);
  if (!Number.isInteger(holidays) || holidays < 0 || holidays > 3660) return null;
  let totalDays = 0;
  let weekendDays = 0;
  const cursor = new Date(start);
  while (cursor <= end) {
    totalDays++;
    if (isWeekend(cursor)) weekendDays++;
    cursor.setDate(cursor.getDate() + 1);
  }
  const businessDays = totalDays - weekendDays;
  return { totalDays, weekendDays, businessDays, holidays, netBusinessDays: Math.max(0, businessDays - holidays) };
}

function computeAdd(startStr: string, nStr: string): AddResult | null {
  const start = parseDay(startStr);
  if (!start) return null;
  const t = nStr.trim();
  if (!/^\d+$/.test(t)) return null;
  const n = parseInt(t, 10);
  if (!Number.isInteger(n) || n < 0 || n > 3650) return null;
  const cursor = new Date(start);
  let added = 0;
  let skippedWeekends = 0;
  while (added < n) {
    cursor.setDate(cursor.getDate() + 1);
    if (isWeekend(cursor)) skippedWeekends++;
    else added++;
  }
  return {
    resultIso: toISO(cursor),
    formatted: cursor.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    weekday: WEEKDAYS[cursor.getDay()],
    skippedWeekends,
  };
}

const BusinessDaysCalculator = () => {
  const [mode, setMode] = useState<Mode>("diff");
  // Defaults: today → +30 days so the difference output renders instantly
  const [start, setStart] = useState(() => defaultRange().s);
  const [end, setEnd] = useState(() => defaultRange().e);
  const [holidays, setHolidays] = useState("0");
  const [diffResult, setDiffResult] = useState<DiffResult | null>(() => {
    const r = defaultRange();
    return computeDiff(r.s, r.e, "0");
  });
  const [addStart, setAddStart] = useState(() => defaultRange().s);
  const [addN, setAddN] = useState("10");
  const [addResult, setAddResult] = useState<AddResult | null>(() => computeAdd(defaultRange().s, "10"));
  const { toast } = useToast();

  const calculateDiff = () => {
    if (!start || !end) {
      toast({ variant: "destructive", title: "Missing Date", description: "Please pick both a start and an end date." });
      return;
    }
    if (!parseDay(start) || !parseDay(end)) {
      toast({ variant: "destructive", title: "Invalid Date", description: "Dates must be real calendar dates (YYYY-MM-DD)." });
      return;
    }
    if (parseDay(end)! < parseDay(start)!) {
      toast({ variant: "destructive", title: "Invalid Range", description: "End date can't be before the start date." });
      return;
    }
    const computed = computeDiff(start, end, holidays);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Holidays", description: "Holiday count must be a whole number from 0 to 3660." });
      return;
    }
    setDiffResult(computed);
    toast({ title: "Calculated", description: `${computed.netBusinessDays} business days (inclusive).` });
  };

  const calculateAdd = () => {
    if (!parseDay(addStart)) {
      toast({ variant: "destructive", title: "Invalid Date", description: "Please pick a valid start date." });
      return;
    }
    const computed = computeAdd(addStart, addN);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Business days to add must be a whole number from 0 to 3650." });
      return;
    }
    setAddResult(computed);
    toast({ title: "Calculated", description: `${addN} business days after start lands on ${computed.formatted}.` });
  };

  const reset = () => {
    const r = defaultRange();
    setStart(r.s);
    setEnd(r.e);
    setHolidays("0");
    setDiffResult(computeDiff(r.s, r.e, "0"));
    setAddStart(r.s);
    setAddN("10");
    setAddResult(computeAdd(r.s, "10"));
    toast({ title: "Reset", description: "Restored defaults (today → +30 days)." });
  };

  const copyText = async (text: string, label: string) => {
    if (!text) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Calculate first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: `${label} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const diffText = diffResult
    ? `Business days: ${diffResult.netBusinessDays} (total ${diffResult.totalDays} days, ${diffResult.weekendDays} weekend days, ${diffResult.holidays} holidays) from ${start} to ${end} — via PrimeMetric`
    : "";
  const addText = addResult
    ? `${addN} business days after ${addStart} = ${addResult.resultIso} (${addResult.formatted}) — via PrimeMetric`
    : "";

  return (
    <CalculatorLayout
      title="Business Days Calculator – Workdays Between Dates"
      description="Count business days between two dates excluding weekends, subtract holidays, or add N workdays to a start date. Free planner for deadlines and leave."
      keywords="business days calculator, workdays calculator, working days between dates, add business days, exclude weekends calculator, workday planner"
      canonicalUrl="/other-calculators/business-days-calculator"
      explanation="Counts weekdays Monday–Friday (inclusive of both dates); optionally subtracts holidays or projects a deadline N workdays ahead."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex gap-2 mb-4">
            <Button onClick={() => setMode("diff")} variant={mode === "diff" ? "default" : "outline"} className={`flex-1 h-9 text-xs ${mode === "diff" ? "gradient-button" : ""}`}>
              Between Dates
            </Button>
            <Button onClick={() => setMode("add")} variant={mode === "add" ? "default" : "outline"} className={`flex-1 h-9 text-xs ${mode === "add" ? "gradient-button" : ""}`}>
              Add Workdays
            </Button>
          </div>

          {mode === "diff" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Start Date</Label>
                <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">End Date</Label>
                <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Holidays to Exclude (optional)</Label>
                <Input type="number" min={0} value={holidays} onChange={(e) => setHolidays(e.target.value)} placeholder="0" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div className="flex gap-2">
                <Button onClick={calculateDiff} className="flex-1 h-10 text-sm gradient-button">Count Days</Button>
                <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Start Date</Label>
                <Input type="date" value={addStart} onChange={(e) => setAddStart(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Business Days to Add</Label>
                <Input type="number" min={0} value={addN} onChange={(e) => setAddN(e.target.value)} placeholder="10" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div className="flex gap-2">
                <Button onClick={calculateAdd} className="flex-1 h-10 text-sm gradient-button">Add Days</Button>
                <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Result</h2>
            {(mode === "diff" ? diffText : addText) && (
              <Button onClick={() => copyText(mode === "diff" ? diffText : addText, "Result")} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>

          {mode === "diff" ? (
            diffResult ? (
              <div className="space-y-3">
                <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                  <p className="text-3xl font-bold text-black">{diffResult.netBusinessDays}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">business days (inclusive)</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    ["Total days", String(diffResult.totalDays)],
                    ["Weekend days", String(diffResult.weekendDays)],
                    ["Holidays", String(diffResult.holidays)],
                  ].map(([label, value]) => (
                    <div key={label} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                      <p className="text-[11px] text-neutral-500">{label}</p>
                      <p className="text-[13px] font-bold text-black">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 text-center">Weekdays before holidays: {diffResult.businessDays}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-neutral-500">
                <p className="text-sm">Pick dates to count</p>
              </div>
            )
          ) : addResult ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-lg font-bold text-black">{addResult.formatted}</p>
                <p className="text-[11px] text-neutral-500 mt-0.5">{addN} workdays after {addStart}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">ISO date</p>
                  <p className="text-[13px] font-bold text-black font-mono">{addResult.resultIso}</p>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">Weekends skipped</p>
                  <p className="text-[13px] font-bold text-[#c25136]">{addResult.skippedWeekends}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <p className="text-sm">Enter days to add</p>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Business Days Calculator measures work time two ways: count weekdays between two dates (excluding Saturdays and Sundays, with an optional holiday deduction) or project a deadline by adding N business days to a start date. Both modes treat Monday–Friday as workdays and count inclusively so quotes and plans match. It opens pre-filled with today through +30 days so results appear immediately."
        useCases={[
          { title: "Quote Project Timelines", description: "Convert a 20-workday estimate into a real delivery date that skips weekends." },
          { title: "Track Leave Balances", description: "Count net workdays in a vacation span after subtracting public holidays." },
          { title: "Set SLA Deadlines", description: "Add contractual response days to a ticket date to find the exact due weekday." },
          { title: "Plan Payroll Periods", description: "Verify payable weekdays in a month before running attendance exports." },
        ]}
        tips={[
          { title: "Inclusive Counting", description: "Both endpoints count if they fall on weekdays — a Monday-to-Friday span is 5 business days, not 4." },
          { title: "Holidays Are Manual", description: "Enter public holidays as a count; the tool subtracts them from the weekday total." },
          { title: "Add Mode Skips Weekends", description: "Day 1 is the next weekday after the start date, so adding 1 on Friday lands on Monday." },
        ]}
        faqs={[
          { question: "Are Saturday and Sunday always excluded?", answer: "Yes. Business days are defined as Monday through Friday regardless of region. If your workweek differs, count manually from the total-days figure." },
          { question: "Does the start date count as day one?", answer: "In between-dates mode both dates count when they are weekdays. In add mode the start date is day zero and counting begins on the next weekday." },
          { question: "How do holidays work?", answer: "Enter the number of public holidays inside your range and they are subtracted from the weekday total. Holidays falling on weekends need no entry since weekends are already excluded." },
          { question: "What is the maximum range?", answer: "Date differences of any reasonable length are supported, with holiday counts up to 3660 and add-mode jumps up to 3650 workdays — well beyond multi-year plans." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default BusinessDaysCalculator;
