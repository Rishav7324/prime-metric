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

type PeriodCycle = {
  periodDate: string;
  ovulationDate: string;
  fertileStart: string;
  fertileEnd: string;
};

type PeriodResult = {
  cycleLength: number;
  lastPeriod: string;
  cycleDay: number;
  cycles: PeriodCycle[];
};

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function todayISO(): string {
  return toISODate(new Date());
}

function defaultLastPeriodISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 14);
  return toISODate(d);
}

function parseISODate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = parseInt(m[1], 10);
  const mo = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  const d = new Date(y, mo - 1, day);
  if (d.getFullYear() !== y || d.getMonth() !== mo - 1 || d.getDate() !== day) return null;
  return d;
}

function addDaysISO(iso: string, days: number): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

function fmtISO(iso: string): string {
  const d = parseISODate(iso);
  if (!d) return iso;
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function computePeriod(lastPeriodStr: string, cycleStr: string): PeriodResult | null {
  const last = parseISODate(lastPeriodStr);
  const cycle = parseInt(cycleStr, 10);
  if (!last) return null;
  if (!(cycle >= 21 && cycle <= 45)) return null;
  // Last period must not be in the future
  const today = parseISODate(todayISO());
  if (!today || last.getTime() > today.getTime()) return null;

  const cycles: PeriodCycle[] = [1, 2, 3].map((i) => {
    const periodDate = addDaysISO(lastPeriodStr, cycle * i);
    const ovulationDate = addDaysISO(periodDate, -14);
    return {
      periodDate,
      ovulationDate,
      fertileStart: addDaysISO(ovulationDate, -5),
      fertileEnd: addDaysISO(ovulationDate, 0),
    };
  });

  const diffMs = today.getTime() - last.getTime();
  const cycleDay = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  return { cycleLength: cycle, lastPeriod: lastPeriodStr, cycleDay, cycles };
}

const DEFAULT_LAST = defaultLastPeriodISO();

const PeriodCalculatorClient = () => {
  const [lastPeriod, setLastPeriod] = useState(DEFAULT_LAST);
  const [cycleLength, setCycleLength] = useState("28");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PeriodResult | null>(() => computePeriod(DEFAULT_LAST, "28"));
  const { toast } = useToast();

  const calculate = () => {
    if (!lastPeriod || !parseISODate(lastPeriod)) {
      toast({
        variant: "destructive",
        title: "Invalid Date",
        description: "Enter a valid last period date (YYYY-MM-DD).",
      });
      return;
    }
    const today = parseISODate(todayISO());
    const last = parseISODate(lastPeriod);
    if (last && today && last.getTime() > today.getTime()) {
      toast({
        variant: "destructive",
        title: "Date In Future",
        description: "Last period date cannot be in the future.",
      });
      return;
    }
    const computed = computePeriod(lastPeriod, cycleLength);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter a cycle length between 21 and 45 days.",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Periods Predicted",
      description: `Next period: ${parseISODate(computed.cycles[0].periodDate)?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.`,
    });
  };

  const reset = () => {
    setLastPeriod(""); setCycleLength(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const lines = result.cycles.map(
      (c, i) =>
        `Cycle ${i + 1}: period ${parseISODate(c.periodDate)?.toLocaleDateString("en-US")}, fertile ${parseISODate(c.fertileStart)?.toLocaleDateString("en-US")}–${parseISODate(c.fertileEnd)?.toLocaleDateString("en-US")}`
    );
    const text = `My period predictions (${result.cycleLength}-day cycle): ${lines.join("; ")}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Period Calculator"
      description="Predict your next 3 periods, ovulation days and fertile windows from your last period date"
      keywords="period calculator, menstrual cycle predictor, ovulation calculator, fertile window calculator, next period predictor"
      canonicalUrl="/health-calculators/period-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Cycle Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="last-period" className="text-sm font-medium">First day of last period</Label>
              <Input id="last-period" type="date" max={todayISO()} value={lastPeriod}
                onChange={(e) => setLastPeriod(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="cycle-length" className="text-sm font-medium">Average cycle length (days)</Label>
              <Input id="cycle-length" type="number" min={21} max={45} placeholder="e.g., 28" value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-[11px] text-neutral-500 mt-1">Most cycles are 21–45 days (average 28).</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!lastPeriod || !cycleLength}>
                Predict Periods
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Result */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Your Predictions</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4 rounded-xl border bg-[#FFF5F2] border-[#F2765E]/25">
                <div className="text-4xl font-bold text-[#c25136]">Day {result.cycleDay.toLocaleString("en-US")}</div>
                <div className="text-sm font-medium mt-1 text-black">of your {result.cycleLength.toLocaleString("en-US")}-day cycle</div>
              </div>

              <div className="space-y-2.5">
                {result.cycles.map((c, i) => (
                  <div key={c.periodDate} className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Predicted period {i + 1}</p>
                    <p className="text-sm font-bold text-black">{fmtISO(c.periodDate)}</p>
                    <div className="mt-1.5 grid grid-cols-2 gap-2 text-[13px]">
                      <div>
                        <p className="text-xs text-neutral-500">Fertile window</p>
                        <p className="font-semibold text-green-700">{fmtISO(c.fertileStart)} – {fmtISO(c.fertileEnd)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500">Ovulation day</p>
                        <p className="font-semibold text-black">{fmtISO(c.ovulationDate)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-sm">Enter your last period to see predictions</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="This period calculator estimates your next three period start dates from the first day of your last period and your average cycle length. It also flags each cycle's fertile window and likely ovulation day (about 14 days before the next period), which is useful for planning or cycle awareness."
        useCases={[
          { title: "Plan Ahead", description: "See upcoming period dates for travel, events and everyday planning." },
          { title: "Cycle Awareness", description: "Track fertile windows and ovulation when trying to conceive — or avoid pregnancy with backup methods." },
          { title: "Spot Irregularities", description: "Compare predictions with actual dates to notice skipped or unusually short cycles." },
          { title: "Doctor Visits", description: "Bring a record of recent cycles when discussing menstrual health with your provider." },
        ]}
        tips={[
          { title: "Track 3+ Cycles", description: "Averages from several months predict better than a single cycle — cycles naturally vary by a few days." },
          { title: "Fertile Window Basics", description: "The 6 days ending on ovulation day are the most fertile; sperm can survive up to 5 days." },
          { title: "Not Medical Advice", description: "Predictions are estimates, not a diagnosis or contraception. See a doctor for irregular, missed or painful periods." },
        ]}
        faqs={[
          { question: "How is the next period predicted?", answer: "We add your average cycle length to the first day of your last period. For example, a 28-day cycle starting March 1 predicts March 29 as the next start date." },
          { question: "How is the fertile window calculated?", answer: "Ovulation is estimated as 14 days before the next predicted period, and the fertile window is the 5 days before plus ovulation day itself." },
          { question: "What if my cycle is irregular?", answer: "Predictions are less reliable with irregular cycles. Track each period's actual start date and use your shortest recent cycle for cautious planning." },
          { question: "Can I use this as birth control?", answer: "No. Calendar predictions alone are not reliable contraception because ovulation timing can shift. Use a proven contraceptive method." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PeriodCalculatorClient;
