'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type TimeResult = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  display: string;
};

function parseUnit(value: string): number | null {
  if (value.trim() === "") return 0;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0) return null;
  return n;
}

function formatDuration(totalSeconds: number): TimeResult {
  if (totalSeconds < 0) totalSeconds = 0;
  const days = Math.floor(totalSeconds / 86400);
  let rem = totalSeconds % 86400;
  const hours = Math.floor(rem / 3600);
  rem %= 3600;
  const minutes = Math.floor(rem / 60);
  const seconds = rem % 60;
  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds,
    display: `${days.toLocaleString()}d ${hours.toLocaleString()}h ${minutes.toLocaleString()}m ${seconds.toLocaleString()}s`,
  };
}

function computeTime(
  d1: string, h1: string, m1: string, s1: string,
  d2: string, h2: string, m2: string, s2: string,
  operation: string
): TimeResult | null {
  const v1 = [parseUnit(d1), parseUnit(h1), parseUnit(m1), parseUnit(s1)];
  const v2 = [parseUnit(d2), parseUnit(h2), parseUnit(m2), parseUnit(s2)];
  if (v1.some((v) => v === null) || v2.some((v) => v === null)) return null;
  const [dd1, hh1, mm1, ss1] = v1 as number[];
  const [dd2, hh2, mm2, ss2] = v2 as number[];
  const time1 = dd1 * 86400 + hh1 * 3600 + mm1 * 60 + ss1;
  const time2 = dd2 * 86400 + hh2 * 3600 + mm2 * 60 + ss2;
  const total = operation === "add" ? time1 + time2 : time1 - time2;
  if (total < 0) return null;
  return formatDuration(total);
}

const TimeCalculator = () => {
  const [d1, setD1] = useState("1");
  const [h1, setH1] = useState("2");
  const [m1, setM1] = useState("30");
  const [s1, setS1] = useState("0");
  
  const [d2, setD2] = useState("0");
  const [h2, setH2] = useState("4");
  const [m2, setM2] = useState("45");
  const [s2, setS2] = useState("0");
  
  const [operation, setOperation] = useState("add");
  // Auto-calculates on mount with default durations so result renders instantly
  const [result, setResult] = useState<TimeResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const computed = computeTime("1", "2", "30", "0", "0", "4", "45", "0", "add");
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const time1parts = [parseUnit(d1), parseUnit(h1), parseUnit(m1), parseUnit(s1)];
    const time2parts = [parseUnit(d2), parseUnit(h2), parseUnit(m2), parseUnit(s2)];
    if (time1parts.some((v) => v === null) || time2parts.some((v) => v === null)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Time values must be whole numbers zero or greater.",
      });
      return;
    }
    const computed = computeTime(d1, h1, m1, s1, d2, h2, m2, s2, operation);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "The result is negative. Time 1 should be greater than Time 2 for subtraction.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Success", description: `Time calculated: ${computed.display} (${computed.totalSeconds.toLocaleString()} seconds total).` });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `Time calculation result: ${result.display} (${result.totalSeconds.toLocaleString()} seconds total). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Time Calculator"
      description="Add or subtract durations of time."
      canonicalUrl="/other-calculators/time-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Time 1</Label>
            <div className="grid grid-cols-4 gap-2">
              <Input type="number" value={d1} onChange={e=>setD1(e.target.value)} placeholder="Days" />
              <Input type="number" value={h1} onChange={e=>setH1(e.target.value)} placeholder="Hours" />
              <Input type="number" value={m1} onChange={e=>setM1(e.target.value)} placeholder="Minutes" />
              <Input type="number" value={s1} onChange={e=>setS1(e.target.value)} placeholder="Seconds" />
            </div>
          </div>
          
           <div className="flex justify-center">
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
              </SelectContent>
            </Select>
          </div>

           <div>
            <Label>Time 2</Label>
            <div className="grid grid-cols-4 gap-2">
              <Input type="number" value={d2} onChange={e=>setD2(e.target.value)} placeholder="Days" />
              <Input type="number" value={h2} onChange={e=>setH2(e.target.value)} placeholder="Hours" />
              <Input type="number" value={m2} onChange={e=>setM2(e.target.value)} placeholder="Minutes" />
              <Input type="number" value={s2} onChange={e=>setS2(e.target.value)} placeholder="Seconds" />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Time</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Result</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{result.display}</p>
              <p className="text-xs text-neutral-500 mt-1">{result.totalSeconds.toLocaleString()} seconds total</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Time Calculator allows you to add or subtract durations of time, specified in days, hours, minutes, and seconds. It's a handy tool for project management, event planning, or any situation where you need to calculate total time."
        useCases={[
            { title: "Project Management", description: "Add up the time taken for various tasks to get a total project duration." },
            { title: "Flight Times", description: "Calculate total travel time, including layovers." },
            { title: "Logging Hours", description: "Sum up hours worked over a week or month." },
        ]}
        tips={[
            { title: "Carry-overs are handled automatically", description: "The calculator automatically handles conversions, like 70 minutes becoming 1 hour and 10 minutes." },
            { title: "Subtraction", description: "When subtracting, ensure the first time duration is larger than the second to avoid negative results." },
            { title: "Zero values", description: "You can leave fields as 0 if you don't need to specify that unit (e.g., just adding hours and minutes)." },
        ]}
        faqs={[
            { question: "How does the calculator work?", answer: "It converts all the input times into a total number of seconds, performs the addition or subtraction, and then converts the result back into a readable format of days, hours, minutes, and seconds." },
            { question: "Can I use this for dates?", answer: "This calculator is for time durations, not specific dates on a calendar. For calculating the time between two dates, use the 'Date Calculator'." },
            { question: "What happens if I subtract a larger time from a smaller one?", answer: "The calculator will show a result of 0 and a message indicating that the result was negative. For time durations, a negative result is usually not meaningful." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TimeCalculator;
