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

type OvulationResult = {
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
  fertileDays: Date[];
  cycleLength: number;
};

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getDefaultLMP(): string {
  const d = new Date();
  d.setDate(d.getDate() - 14);
  return toISODate(d);
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function computeOvulation(lmpStr: string, cycleStr: string): OvulationResult | null {
  const cycle = parseInt(cycleStr);
  if (!(cycle >= 21 && cycle <= 45)) return null;
  if (!lmpStr) return null;
  const lmp = new Date(`${lmpStr}T00:00:00`);
  if (isNaN(lmp.getTime())) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (lmp > today) return null;

  const ovulationDate = addDays(lmp, cycle - 14);
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = addDays(ovulationDate, 1);
  const nextPeriod = addDays(lmp, cycle);
  const fertileDays: Date[] = [];
  for (let i = -5; i <= 1; i++) fertileDays.push(addDays(ovulationDate, i));

  return { ovulationDate, fertileStart, fertileEnd, nextPeriod, fertileDays, cycleLength: cycle };
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function fmtLong(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

const OvulationCalculatorClient = () => {
  const [lmp, setLmp] = useState(getDefaultLMP);
  const [cycle, setCycle] = useState("28");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<OvulationResult | null>(() => computeOvulation(getDefaultLMP(), "28"));
  const { toast } = useToast();

  const calculate = () => {
    if (!lmp) {
      toast({ variant: "destructive", title: "Invalid Date", description: "Enter the first day of your last period." });
      return;
    }
    const lmpDate = new Date(`${lmp}T00:00:00`);
    if (isNaN(lmpDate.getTime())) {
      toast({ variant: "destructive", title: "Invalid Date", description: "Enter a valid last-period date." });
      return;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (lmpDate > today) {
      toast({ variant: "destructive", title: "Date In Future", description: "Last period date cannot be in the future." });
      return;
    }
    const computed = computeOvulation(lmp, cycle);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter a cycle length between 21 and 45 days." });
      return;
    }
    setResult(computed);
    toast({ title: "Fertile Window Calculated", description: `Likely ovulation: ${fmt(computed.ovulationDate)}.` });
  };

  const reset = () => {
    const def = getDefaultLMP();
    setLmp(def);
    setCycle("28");
    setResult(computeOvulation(def, "28"));
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Fertile window: ${fmt(result.fertileStart)} – ${fmt(result.fertileEnd)}. Likely ovulation: ${fmt(result.ovulationDate)}. Next period: ${fmt(result.nextPeriod)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Ovulation Calculator"
      description="Estimate your ovulation day, fertile window and next period from your cycle"
      keywords="ovulation calculator, fertile window calculator, fertility calendar, ovulation tracker"
      canonicalUrl="/health-calculators/ovulation-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Cycle Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="lmp" className="text-sm font-medium">First day of last period</Label>
              <Input id="lmp" type="date" value={lmp}
                onChange={(e) => setLmp(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="cycle" className="text-sm font-medium">Cycle length (days)</Label>
              <Input id="cycle" type="number" min={21} max={45} placeholder="e.g., 28" value={cycle}
                onChange={(e) => setCycle(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-xs text-neutral-500 mt-1">Most cycles are 21–45 days (average 28).</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!lmp || !cycle}>
                Calculate Fertile Window
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
            <h2 className="text-lg font-bold text-black">Your Result</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4 rounded-xl border bg-pink-50 border-pink-200">
                <p className="text-xs text-neutral-500">Likely ovulation day</p>
                <div className="text-2xl font-bold text-pink-600">{fmt(result.ovulationDate)}</div>
                <p className="text-xs text-neutral-500 mt-1">{result.ovulationDate.toLocaleDateString("en-US", { weekday: "long" })}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Fertile window</p>
                  <p className="text-sm font-bold text-black">{fmt(result.fertileStart)} – {fmt(result.fertileEnd)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Next period</p>
                  <p className="text-sm font-bold text-black">{fmt(result.nextPeriod)}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2">Fertile days ({result.cycleLength}-day cycle)</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.fertileDays.map((d) => (
                    <span key={d.toISOString()} className="text-xs font-medium px-2 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700">
                      {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📅</div>
                <p className="text-sm">Enter your dates to see your fertile window</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="This ovulation calculator estimates your fertile window using the standard calendar method: ovulation typically occurs about 14 days before your next period. Enter the first day of your last period and your average cycle length to get your likely ovulation day, 7-day fertile window, and predicted next period."
        useCases={[
          { title: "Trying To Conceive", description: "Time intercourse to the 5 days before plus ovulation day, when conception odds are highest." },
          { title: "Cycle Awareness", description: "Understand when fertile-phase symptoms like cervical-mucus changes are most likely." },
          { title: "Period Planning", description: "Predict your next period to plan travel, events and workouts with confidence." },
          { title: "Doctor Visits", description: "Bring a clear cycle summary to fertility or gynecology appointments." },
        ]}
        tips={[
          { title: "Cycles Vary", description: "Stress, illness and travel can shift ovulation — track 3+ cycles for a reliable average length." },
          { title: "Confirm With Signs", description: "Combine calendar estimates with ovulation test strips or basal body temperature for accuracy." },
          { title: "Not Contraception", description: "The calendar method alone is unreliable for avoiding pregnancy — sperm can survive up to 5 days." },
        ]}
        faqs={[
          { question: "How is the ovulation day calculated?", answer: "Ovulation is estimated as last period date plus cycle length minus 14 days, since the luteal phase after ovulation is fairly constant at ~14 days." },
          { question: "What is the fertile window?", answer: "The 6 most fertile days: the 5 days before ovulation plus ovulation day itself, because sperm survives up to 5 days while the egg lives about 24 hours." },
          { question: "What if my cycle is irregular?", answer: "Use your average length over the last 3–6 cycles. With very irregular cycles, ovulation predictor kits or medical advice give better estimates." },
          { question: "Can this calculator prevent pregnancy?", answer: "No. Calendar estimates cannot reliably prevent pregnancy. Use proven contraception and speak to a clinician for family-planning advice." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default OvulationCalculatorClient;
