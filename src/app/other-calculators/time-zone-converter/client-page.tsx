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

const TimeZoneConverter = () => {
  const [time, setTime] = useState("");
  const [fromZone, setFromZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [toZone, setToZone] = useState("Europe/London");
  const [result, setResult] = useState("");
  const [timeZones, setTimeZones] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Intl.supportedValuesOf is a modern API. Fallback for older browsers not needed in this context.
    setTimeZones(Intl.supportedValuesOf('timeZone'));
    
    // Set initial time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);

  }, []);

  const convert = () => {
    if (!time) {
        toast({title: "Error", description: "Please enter a time.", variant: "destructive"});
        return;
    }
    
    try {
        const today = new Date();
        const [hours, minutes] = time.split(':');
        
        // Create a date object in the "from" timezone
        const fromDate = new Date(today.toLocaleString("en-US", { timeZone: fromZone }));
        fromDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // Format the time in the "to" timezone
        const options: Intl.DateTimeFormatOptions = {
          timeZone: toZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        };
        const formatter = new Intl.DateTimeFormat([], options);
        const convertedTime = formatter.format(fromDate);

        setResult(convertedTime);
        toast({title: "Success", description: `Time converted to ${toZone}.`});
    } catch (e) {
        toast({title: "Error", description: "Invalid date or time zone.", variant: "destructive"});
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
                    <Select value={fromZone} onValueChange={setFromZone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-[300px]"><SelectItem value={fromZone}>{fromZone}</SelectItem></SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Your current time zone is detected.</p>
                </div>
                 <div className="col-span-1 md:col-span-2">
                    <Label>To Time Zone</Label>
                    <Select value={toZone} onValueChange={setToZone}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {timeZones.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                    </SelectContent>
                    </Select>
                </div>
            </div>
          <Button onClick={convert} className="w-full gradient-button">Convert Time</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Converted Time</p>
              <p className="text-3xl font-bold text-primary">{result}</p>
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

    