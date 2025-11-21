'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const TimeCalculator = () => {
  const [d1, setD1] = useState("0");
  const [h1, setH1] = useState("0");
  const [m1, setM1] = useState("0");
  const [s1, setS1] = useState("0");
  
  const [d2, setD2] = useState("0");
  const [h2, setH2] = useState("0");
  const [m2, setM2] = useState("0");
  const [s2, setS2] = useState("0");
  
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const toSeconds = (d:string, h:string, m:string, s:string) => {
    return (parseInt(d)||0)*86400 + (parseInt(h)||0)*3600 + (parseInt(m)||0)*60 + (parseInt(s)||0);
  }

  const fromSeconds = (totalSeconds: number) => {
    if(totalSeconds < 0) totalSeconds = 0;
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  const calculate = () => {
    const time1 = toSeconds(d1, h1, m1, s1);
    const time2 = toSeconds(d2, h2, m2, s2);

    let totalSeconds = 0;
    if (operation === 'add') {
      totalSeconds = time1 + time2;
    } else {
      totalSeconds = time1 - time2;
      if (totalSeconds < 0) {
        toast({title: "Result is negative", description: "The result is negative, showing as 0. Time 1 should be greater than Time 2 for subtraction."});
      }
    }
    
    setResult(fromSeconds(totalSeconds));
    toast({title: "Success", description: "Time calculated."});
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

          <Button onClick={calculate} className="w-full gradient-button">Calculate Time</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-3xl font-bold text-primary">{result}</p>
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
