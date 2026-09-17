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

type CountdownResult = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
  targetLabel: string;
};

const DEFAULT_EVENT = "Product Launch";

function toInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function defaultTarget(): string {
  return toInputValue(new Date(Date.now() + 30 * 86400000));
}

function computeCountdown(targetStr: string, nowMs: number): CountdownResult | null {
  if (!targetStr) return null;
  const target = new Date(targetStr);
  if (isNaN(target.getTime())) return null;
  const diffMs = target.getTime() - nowMs;
  const totalSeconds = Math.floor(Math.abs(diffMs) / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalSeconds,
    isPast: diffMs <= 0,
    targetLabel: target.toLocaleString("en-US", {
      weekday: "long", month: "long", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    }),
  };
}

const CountdownCalculatorClient = () => {
  // Pre-filled defaults; result renders instantly on mount (no toast on init)
  const [eventName, setEventName] = useState(DEFAULT_EVENT);
  const [target, setTarget] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [result, setResult] = useState<CountdownResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initial = defaultTarget();
    setTarget(initial);
    setResult(computeCountdown(initial, Date.now()));
  }, []);

  // Live ticking clock with proper cleanup
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!target) {
      setResult(null);
      return;
    }
    setResult(computeCountdown(target, now));
  }, [target, now]);

  const handleTargetChange = (value: string) => {
    setTarget(value);
    if (!value) return;
    const parsed = new Date(value);
    if (isNaN(parsed.getTime())) {
      toast({ variant: "destructive", title: "Invalid Date", description: "Please enter a valid date and time." });
    } else if (parsed.getTime() <= Date.now()) {
      toast({ variant: "destructive", title: "Date Is in the Past", description: "Pick a future date and time to count down to." });
    }
  };

  const reset = () => {
    setEventName(DEFAULT_EVENT);
    const initial = defaultTarget();
    setTarget(initial);
    setResult(computeCountdown(initial, Date.now()));
  };

  const shareText = () => {
    if (!result || result.isPast) return null;
    const name = eventName.trim() || "My event";
    return `${name} is in ${result.days}d ${result.hours}h ${result.minutes}m ${result.seconds}s (${result.targetLabel}) — via PrimeMetric`;
  };

  const copyResult = async () => {
    const text = shareText();
    if (!text) {
      toast({
        variant: "destructive",
        title: result?.isPast ? "Event Already Passed" : "Nothing to Share",
        description: result?.isPast
          ? "This date is in the past — pick a future date to share a countdown."
          : "Please enter a valid future date and time first.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Countdown share text copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const units: [string, number][] = result
    ? [["Days", result.days], ["Hours", result.hours], ["Minutes", result.minutes], ["Seconds", result.seconds]]
    : [];

  return (
    <CalculatorLayout
      title="Countdown Calculator"
      description="Count down to any event with live days, hours, minutes and seconds — name your event, pick a date, share it"
      keywords="countdown calculator, event countdown, days until calculator, countdown timer online, date countdown"
      canonicalUrl="/other-calculators/countdown-calculator"
      explanation="Shows exactly how long until your event — ticking live every second — with a one-click share message for friends and followers."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Your Event</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Event Name</Label>
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Birthday, Wedding, Exam"
                className="mt-1.5 h-10 text-sm bg-white"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Target Date & Time</Label>
              <Input
                type="datetime-local"
                value={target}
                onChange={(e) => handleTargetChange(e.target.value)}
                className="mt-1.5 h-10 text-sm bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={copyResult} className="flex-1 h-10 text-sm gradient-button">
                <Copy className="h-4 w-4 mr-2" /> Share Countdown
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black truncate">{eventName.trim() || "Your Countdown"}</h2>
            {result && !result.isPast && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs shrink-0 ml-2">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            result.isPast ? (
              <div className="flex items-center justify-center h-40 text-neutral-500">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-sm font-semibold text-black">That moment has arrived!</p>
                  <p className="text-xs mt-1">Pick a future date to start a new countdown.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-4 gap-2 text-center">
                  {units.map(([label, value]) => (
                    <div key={label} className="p-2.5 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-lg">
                      <p className="text-xl font-bold text-black tabular-nums">{value}</p>
                      <p className="text-[11px] text-neutral-500">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-neutral-500 text-center">Counting down to {result.targetLabel}</p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">⏳</div><p className="text-sm">Pick a date to start counting</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Countdown Calculator shows exactly how much time remains until any moment — birthdays, launches, exams or holidays — ticking live in days, hours, minutes and seconds. Name your event, pick a date and time, and share a ready-made countdown message with one click."
        useCases={[
          { title: "Birthdays & Weddings", description: "Build excitement with a live ticker for the big day." },
          { title: "Exams & Deadlines", description: "See remaining study time broken into days and hours." },
          { title: "Product Launches", description: "Share countdown text across socials and newsletters." },
          { title: "Holidays & Trips", description: "Track every second until vacation or festivities begin." },
        ]}
        tips={[
          { title: "Set the Time, Not Just the Date", description: "Adding the hour keeps the countdown exact to the second." },
          { title: "Watch Timezones", description: "The countdown uses your device time — confirm it matches the event location." },
          { title: "Share Early", description: "Copy the share text to rally friends and followers ahead of time." },
        ]}
        faqs={[
          { question: "How accurate is the countdown?", answer: "It recomputes from your device clock every second, so it stays exact down to the second as long as the page is open." },
          { question: "What happens when the countdown reaches zero?", answer: "The display switches to a celebration message. Pick a new future date to start another countdown." },
          { question: "Why does it say my date is in the past?", answer: "The target must be later than right now — check the AM/PM and date, especially around midnight." },
          { question: "Does the countdown run when I close the page?", answer: "No — it ticks while the page is open. Reopen it anytime and the remaining time recalculates instantly." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default CountdownCalculatorClient;
