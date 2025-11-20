'use client';

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TimerClient = () => {
  const [initialTime, setInitialTime] = useState(300); // 5 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('5');
  const [seconds, setSeconds] = useState('0');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;
    const totalSeconds = h * 3600 + m * 60 + s;
    setInitialTime(totalSeconds);
    if (!isRunning) {
      setTime(totalSeconds);
    }
  }, [hours, minutes, seconds]);


  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      toast({ title: "Time's up!", duration: 10000 });
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, time, toast]);

  const handleStartStop = () => {
    if (isFinished) return;
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTime(initialTime);
  };

  const formatTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <CalculatorLayout
      title="Countdown Timer"
      description="Set a timer for any duration and get an alert when time is up."
      canonicalUrl="/other-calculators/timer"
    >
      <Card className="p-6 max-w-lg mx-auto">
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Label htmlFor="hours">Hours</Label>
                    <Input id="hours" type="number" value={hours} onChange={e => setHours(e.target.value)} placeholder="0" disabled={isRunning} />
                </div>
                 <div>
                    <Label htmlFor="minutes">Minutes</Label>
                    <Input id="minutes" type="number" value={minutes} onChange={e => setMinutes(e.target.value)} placeholder="5" disabled={isRunning} />
                </div>
                 <div>
                    <Label htmlFor="seconds">Seconds</Label>
                    <Input id="seconds" type="number" value={seconds} onChange={e => setSeconds(e.target.value)} placeholder="0" disabled={isRunning} />
                </div>
            </div>

            <div className={`text-center font-mono text-6xl md:text-8xl my-8 p-4 rounded-lg transition-colors ${isFinished ? 'bg-destructive text-destructive-foreground animate-pulse' : 'bg-muted'}`}>
              {formatTime(time)}
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={handleStartStop} size="lg" className="w-32 gradient-button" disabled={time === 0 && !isRunning}>
                {isRunning ? <><Pause className="mr-2" /> Pause</> : <><Play className="mr-2" /> Start</>}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="mr-2" /> Reset
              </Button>
            </div>
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="A countdown timer measures a specified period, counting down to zero from a pre-set time. This tool is perfect for time management, workouts, cooking, or any activity that requires a specific duration. Set your desired hours, minutes, and seconds, and receive an alert when the time is up."
        useCases={[
            { title: "Productivity", description: "Use the Pomodoro Technique by setting a 25-minute timer for focused work, followed by a 5-minute break." },
            { title: "Cooking & Baking", description: "Set precise timers for recipes to ensure perfect results without overcooking or undercooking." },
            { title: "Workouts", description: "Time your exercises, rest periods, or entire workout sessions to stay on track and maintain intensity." },
            { title: "Presentations & Speeches", description: "Rehearse presentations to ensure you stay within your time limit. Use it during the speech as a personal clock." }
        ]}
        tips={[
            { title: "Set Realistic Goals", description: "Break down large tasks into smaller, timed intervals to maintain focus and avoid burnout." },
            { title: "Take Breaks", description: "Use the timer not just for work, but also to ensure you take regular breaks, which can improve overall productivity." },
            { title: "Don't Snooze", description: "When the timer goes off, act immediately. Whether it's taking a break or moving to the next task, respecting the timer builds discipline." }
        ]}
        faqs={[
            { question: "What is the difference between a timer and a stopwatch?", answer: "A timer counts down from a specified time to zero. A stopwatch measures elapsed time, counting up from zero." },
            { question: "Will the timer work if I switch tabs?", answer: "Browsers may slow down or pause JavaScript timers in inactive tabs to save resources. For critical timing, it's best to keep the tab visible." },
            { question: "Can I set a timer for more than 24 hours?", answer: "This timer is designed for durations within a typical day. For longer countdowns, such as to an event, a 'Date Calculator' would be more appropriate." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default TimerClient;
