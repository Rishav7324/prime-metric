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

type SleepMode = "wake" | "bed";
type SleepOption = { cycles: number; time: string; sleepHours: number };
type SleepResult = { mode: SleepMode; anchor: string; options: SleepOption[] };

function toMinutes(t: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!m) return null;
  const h = parseInt(m[1]);
  const min = parseInt(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

function fmtTime(totalMin: number): string {
  const m = ((totalMin % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${min.toString().padStart(2, "0")} ${suffix}`;
}

function computeSleep(timeStr: string, mode: SleepMode): SleepResult | null {
  const mins = toMinutes(timeStr);
  if (mins === null) return null;
  const cyclesList = [6, 5, 4, 3];
  const options: SleepOption[] = cyclesList.map((c) => ({
    cycles: c,
    time: fmtTime(mode === "wake" ? mins - (c * 90 + 15) : mins + 15 + c * 90),
    sleepHours: (c * 90) / 60,
  }));
  return { mode, anchor: fmtTime(mins), options };
}

const SleepCalculator = () => {
  const [mode, setMode] = useState<SleepMode>("wake");
  const [time, setTime] = useState("06:30");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<SleepResult | null>(() => computeSleep("06:30", "wake"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeSleep(time, mode);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter a valid time (HH:MM) and pick a mode." });
      return;
    }
    setResult(computed);
    toast({
      title: "Sleep Times Ready",
      description: mode === "wake"
        ? `For a ${computed.anchor} wake-up, earliest bedtime ${computed.options[0].time}.`
        : `If you sleep at ${computed.anchor}, best wake-up ${computed.options[0].time}.`,
    });
  };

  const switchMode = (next: SleepMode) => {
    setMode(next);
    setResult(computeSleep(time, next));
  };

  const reset = () => { setTime(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const lines = result.options.map((o) => `${o.time} (${o.cycles} cycles, ${o.sleepHours}h)`);
    const text = result.mode === "wake"
      ? `To wake at ${result.anchor}, go to bed at: ${lines.join(" / ")}. — via PrimeMetric`
      : `If you sleep at ${result.anchor}, wake at: ${lines.join(" / ")}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Sleep Calculator: Best Bedtime & Wake Times"
      description="Plan bedtimes and wake-ups around 90-minute sleep cycles to wake refreshed and rested"
      keywords="sleep calculator, bedtime calculator, wake up time calculator, sleep cycle calculator"
      canonicalUrl="/health-calculators/sleep-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Sleep Planner</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">I want to…</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                <Button
                  variant={mode === "wake" ? "default" : "outline"}
                  onClick={() => switchMode("wake")}
                  className={`h-10 text-sm ${mode === "wake" ? "gradient-button" : ""}`}
                >
                  Wake up at…
                </Button>
                <Button
                  variant={mode === "bed" ? "default" : "outline"}
                  onClick={() => switchMode("bed")}
                  className={`h-10 text-sm ${mode === "bed" ? "gradient-button" : ""}`}
                >
                  Sleep at…
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">
                {mode === "wake" ? "Wake-Up Time" : "Bedtime"} (HH:MM)
              </Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Find Best Times</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">
              {result?.mode === "bed" ? "Wake-Up Options" : "Bedtime Options"}
            </h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">
                  {result.mode === "wake" ? `To wake up at ${result.anchor}` : `If you fall asleep around ${result.anchor}`}
                </p>
                <p className="text-3xl font-bold text-[#F2765E]">{result.options[0].time}</p>
                <p className="text-xs text-neutral-500 mt-1">Best pick — {result.options[0].cycles} cycles ({result.options[0].sleepHours}h sleep)</p>
              </div>
              <div className="space-y-2">
                {result.options.map((o) => (
                  <div key={o.cycles} className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <div>
                      <p className="text-base font-bold text-black">{o.time}</p>
                      <p className="text-xs text-neutral-500">{o.cycles} cycles · {o.sleepHours}h sleep</p>
                    </div>
                    {o.cycles >= 5 ? (
                      <span className="text-[11px] font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">Recommended</span>
                    ) : (
                      <span className="text-[11px] font-semibold text-neutral-500 bg-neutral-200 px-2 py-1 rounded-full">Minimum</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">Includes ~15 min to fall asleep. Waking at the end of a 90-min cycle avoids grogginess.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">😴</div><p className="text-sm">Enter a time to plan your sleep</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Sleep runs in ~90-minute cycles, and waking mid-cycle causes grogginess. This calculator counts backwards from your alarm (or forwards from bedtime) in full cycles — adding 15 minutes to fall asleep — so you wake at the lightest sleep stage."
        useCases={[
          { title: "Early Workdays", description: "Pick the bedtime that gives 5-6 full cycles before a 6 AM alarm." },
          { title: "Late Nights", description: "If bedtime is fixed, find the wake time that completes whole cycles." },
          { title: "Shift Workers", description: "Plan daytime sleep blocks that still end at a cycle boundary." },
          { title: "Naps & Recovery", description: "Use the 3-cycle option when only a short night is possible." },
        ]}
        tips={[
          { title: "Aim for 5-6 Cycles", description: "Most adults need 7.5-9 hours — the green-tagged options above." },
          { title: "Keep It Consistent", description: "Same bed/wake times daily trains your body clock better than catch-up sleep." },
          { title: "Wind Down First", description: "Dim screens and avoid caffeine 6h before bed so the 15-min buffer holds." },
        ]}
        faqs={[
          { question: "Why 90-minute sleep cycles?", answer: "A full cycle through light, deep and REM sleep averages ~90 minutes. Waking between cycles feels far more refreshing than waking mid-cycle." },
          { question: "What is the 15-minute buffer?", answer: "Most people need ~15 minutes to fall asleep, so suggested bedtimes are 15 minutes before the cycle count starts." },
          { question: "Is 6 hours of sleep enough?", answer: "Four full cycles (6h) beats 7h that ends mid-cycle short-term, but most adults should target 5-6 cycles nightly for health." },
          { question: "Bedtime or wake-time mode?", answer: "Use wake-time mode when your alarm is fixed, and bedtime mode when tonight's bedtime is fixed — both use the same cycle math." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SleepCalculator;
