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
  }, [hours, minutes, seconds, isRunning]);


  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      setIsFinished(true);
      toast({ title: "Time's up!", duration: 10000 });
      // Play a sound
      try {
        const audio = new Audio('/alert.mp3'); // Assuming you will add an alert sound file
        audio.play();
      } catch (e) {
        console.error("Failed to play sound", e);
      }
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
        aboutContent="A countdown timer is a virtual clock that measures a specified period, counting down from a pre-set time to zero. This versatile tool is perfect for time management, workouts, cooking, studying, or any activity that requires a specific duration. You can easily set your desired hours, minutes, and seconds. Once started, it provides a clear, real-time visual display of the remaining time. Upon reaching zero, it triggers a notification to alert you that the time is up. It's a simple yet powerful tool for improving productivity, managing tasks, and ensuring precision in time-sensitive activities."
        useCases={[
            { title: "Productivity & Time Management", description: "Use the Pomodoro Technique by setting a 25-minute timer for focused work, followed by a 5-minute break. This method is proven to enhance concentration and prevent burnout by breaking down large tasks into manageable intervals." },
            { title: "Cooking & Baking", description: "Set precise timers for recipes to ensure perfect results. Whether you're steeping tea for 3 minutes, baking a cake for 35, or letting dough rise for an hour, an accurate timer prevents overcooking or undercooking." },
            { title: "Workouts & Fitness", description: "Time your exercises, rest periods, or entire workout sessions. For High-Intensity Interval Training (HIIT), you can use it to time 45-second work periods and 15-second rests, helping you maintain intensity and structure." },
            { title: "Presentations & Speeches", description: "Rehearse presentations to ensure you stay within your time limit. Use it during a speech as a personal clock to manage your pace and finish on time. It's an essential tool for public speakers, teachers, and students." },
            { title: "Classroom Activities & Games", description: "Manage classroom activities, time tests, or run game nights. A visible countdown timer helps keep everyone on track and adds a sense of urgency and fun to activities." }
        ]}
        examples={[
          {
            title: "Implementing the Pomodoro Technique",
            description: "A student wants to study for an exam using the Pomodoro Technique.",
            steps: [
              "Set the timer for 25 minutes (0 hours, 25 minutes, 0 seconds).",
              "Press 'Start' and focus solely on studying until the timer goes off.",
              "When the timer finishes, press 'Reset'.",
              "Set a new timer for 5 minutes for a short break.",
              "Repeat the cycle 3-4 times, then take a longer 15-30 minute break."
            ]
          },
          {
            title: "Timing a HIIT Workout",
            description: "Someone is performing a workout with 45 seconds of exercise followed by 15 seconds of rest.",
            steps: [
              "Set the timer for 45 seconds.",
              "Press 'Start' and perform the exercise.",
              "When the timer ends, immediately press 'Reset' and set a new timer for 15 seconds for rest.",
              "Press 'Start' to begin the rest period.",
              "This method allows for precise control over work and rest intervals, which is key to effective interval training."
            ]
          }
        ]}
        tips={[
            { title: "Set Realistic Goals", description: "Break down large tasks into smaller, timed intervals. Setting a timer for a 30-minute block is less daunting than facing an 8-hour workday, which helps in overcoming procrastination and maintaining focus." },
            { title: "Take Effective Breaks", description: "Use the timer not just for work, but also to ensure you take regular, scheduled breaks. A 5-minute break away from your screen every half hour can significantly improve overall productivity and reduce eye strain." },
            { title: "Don't Hit Snooze", description: "When the timer goes off, act immediately. Whether it's taking a break or moving to the next task, respecting the timer's signal builds discipline and reinforces your time management habits. Pausing the timer 'for just one more minute' defeats its purpose." },
            { title: "Use It for Time-Boxing", description: "Allocate a fixed time slot (a 'time-box') for each task on your to-do list. Set the timer for that duration and work only on that task. This prevents tasks from expanding to fill all available time and encourages efficiency." }
        ]}
        faqs={[
            { question: "What is the difference between a timer and a stopwatch?", answer: "A timer counts down from a specified time to zero and typically sounds an alert when it finishes. It is used to manage a specific duration. A stopwatch, in contrast, measures elapsed time by counting up from zero and is used to see how long something takes." },
            { question: "Will the timer make a sound when it's done?", answer: "Yes, when the countdown reaches zero, the tool is designed to play an alert sound and the display will flash to get your attention. Ensure your device's volume is on and that the browser has permission to play audio." },
            { question: "Will the timer work if I switch tabs or minimize my browser?", answer: "Modern browsers often 'throttle' or slow down JavaScript timers in inactive tabs to save system resources and battery life. This can make the timer inaccurate. For critical timing, it is best to keep the tab visible and active." },
            { question: "Can I set a timer for more than 24 hours?", answer: "This timer is designed for durations within a typical day (up to 99 hours). For longer countdowns, such as counting down to a specific event date, a 'Date Calculator' or a dedicated event countdown tool would be more appropriate." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default TimerClient;
