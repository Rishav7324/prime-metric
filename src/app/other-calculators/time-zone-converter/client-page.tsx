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

type TimeZoneResult = {
  convertedTime: string;
};

function computeTimeZoneConversion(time: string, fromZone: string, toZone: string): TimeZoneResult | null {
  if (!time || !fromZone || !toZone) return null;
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;
  try {
    const today = new Date();
    // Create a date object anchored in the "from" timezone
    const fromDate = new Date(today.toLocaleString("en-US", { timeZone: fromZone }));
    fromDate.setHours(hours, minutes, 0, 0);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: toZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat([], options);
    const convertedTime = formatter.format(fromDate);
    if (!convertedTime) return null;
    return { convertedTime };
  } catch {
    return null;
  }
}

const TimeZoneConverter = () => {
  const [time, setTime] = useState("12:00");
  const [fromZone, setFromZone] = useState("");
  const [toZone, setToZone] = useState("Europe/London");
  const [result, setResult] = useState<TimeZoneResult | null>(null);
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Set client-side-only values here to avoid hydration mismatch
    // Pre-fill realistic defaults + instant result on mount (no toast on init)
    const localZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zones = Intl.supportedValuesOf('timeZone');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    const defaultTo = "Europe/London";
    setFromZone(localZone);
    setTimeZones(zones);
    setTime(currentTime);
    setToZone(defaultTo);
    const computed = computeTimeZoneConversion(currentTime, localZone, defaultTo);
    if (computed) setResult(computed);
  }, []);

  const convert = () => {
    if (!time) {
      toast({ title: "Invalid Input", description: "Please enter a time.", variant: "destructive" });
      return;
    }
    if (!/^(\d{1,2}):(\d{2})$/.test(time)) {
      toast({ title: "Invalid Input", description: "Please enter a valid time in HH:MM format.", variant: "destructive" });
      return;
    }
    const [hStr, mStr] = time.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      toast({ title: "Invalid Input", description: "Hours must be 0-23 and minutes 0-59.", variant: "destructive" });
      return;
    }
    if (!fromZone || !toZone) {
      toast({ title: "Invalid Input", description: "Please select valid from and to time zones.", variant: "destructive" });
      return;
    }
    const computed = computeTimeZoneConversion(time, fromZone, toZone);
    if (!computed) {
      toast({ title: "Invalid Input", description: "Invalid date or time zone.", variant: "destructive" });
      return;
    }
    setResult(computed);
    toast({ title: "Success", description: `Time converted to ${toZone}.` });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `${time} in ${fromZone} is ${result.convertedTime} in ${toZone} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Time Zone Converter"
      description="Convert time between different time zones."
      canonicalUrl="/other-calculators/time-zone-converter"
    >
      <Card className="p-6">
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label>Time</Label>
                    <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
                </div>
                 <div>
                    <Label>From Time Zone</Label>
                    <Select value={fromZone} onValueChange={setFromZone} disabled={!fromZone}>
                    <SelectTrigger><SelectValue placeholder="Loading..." /></SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {fromZone && <SelectItem value={fromZone}>{fromZone}</SelectItem>}
                    </SelectContent>
                    </Select>
                    <p className="text-xs text-neutral-600 mt-1">Your current time zone is detected.</p>
                </div>
                 <div className="col-span-1 md:col-span-2">
                    <Label>To Time Zone</Label>
                    <Select value={toZone} onValueChange={setToZone}>
                    <SelectTrigger><SelectValue placeholder="Select a timezone" /></SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {timeZones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                    </SelectContent>
                    </Select>
                </div>
            </div>
          <div className="flex gap-2">
            <Button onClick={convert} className="flex-1 gradient-button">Convert Time</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Converted Time</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{result.convertedTime}</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Time Zone Converter helps you find the corresponding time in another city or time zone. It's an essential tool for scheduling international meetings, planning travel, or coordinating with people across the globe."
        useCases={[
            { title: "International Meetings", description: "Schedule calls and virtual meetings with colleagues or clients in different countries without confusion." },
            { title: "Travel Planning", description: "Check the local time of your destination to plan your arrival and activities." },
            { title: "Global Events", description: "Find out when a live-streamed event, like a sports match or product launch, will start in your local time." },
        ]}
        tips={[
            { title: "Daylight Saving Time (DST)", description: "This tool automatically accounts for Daylight Saving Time if it's currently in effect for the selected time zones." },
            { title: "Use City Names", description: "Time zones are often represented by major cities (e.g., 'America/New_York', 'Europe/London') to avoid ambiguity with names like EST, which can be used in multiple places." },
            { title: "UTC as a Reference", description: "Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks and time. It is a useful reference point when dealing with many time zones." },
        ]}
        faqs={[
            { question: "How does the converter work?", answer: "It uses your browser's internationalization API (Intl) to get a list of supported time zones and perform the conversion based on the current date and time rules for each zone, including DST." },
            { question: "Why is my current time zone detected?", answer: "Your browser can determine your current time zone from your system settings, which makes it easier to convert from your local time." },
            { question: "What is UTC?", answer: "UTC (Coordinated Universal Time) is the standard time common to every place in the world. It is not affected by Daylight Saving Time. Time zones are often expressed as an offset from UTC (e.g., UTC-5)." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TimeZoneConverter;
