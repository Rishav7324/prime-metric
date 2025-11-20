'use client';

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

const StopwatchClient = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
      toast({ title: "Lap Recorded", description: `Lap ${laps.length + 1} recorded.` });
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    toast({ title: "Stopwatch Reset", description: "The stopwatch has been reset to zero." });
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <CalculatorLayout
      title="Stopwatch"
      description="Measure elapsed time with precision, including lap functionality."
      canonicalUrl="/other-calculators/stopwatch"
    >
      <Card className="p-6 max-w-lg mx-auto">
        <div className="text-center font-mono text-6xl md:text-8xl mb-8 p-4 bg-muted rounded-lg">
          {formatTime(time)}
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={handleLap} variant="outline" size="lg" disabled={!isRunning}>
            <Flag className="mr-2" /> Lap
          </Button>
          <Button onClick={handleStartStop} size="lg" className="w-32 gradient-button">
            {isRunning ? <><Pause className="mr-2" /> Pause</> : <><Play className="mr-2" /> Start</>}
          </Button>
          <Button onClick={handleReset} variant="destructive" size="lg">
            <RotateCcw className="mr-2" /> Reset
          </Button>
        </div>

        {laps.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Laps</h3>
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {laps.map((lap, index) => (
                <li key={index} className="flex justify-between p-2 bg-muted/50 rounded-md">
                  <span>Lap {index + 1}</span>
                  <span className="font-mono">{formatTime(lap)}</span>
                </li>
              )).reverse()}
            </ul>
          </div>
        )}
      </Card>
      
      <CalculatorContentSection
        aboutContent="A stopwatch is a timepiece designed to measure the amount of time that elapses between its activation and deactivation. This digital stopwatch provides precise measurement up to the centisecond (1/100th of a second) and includes a lap timer to record split times without interrupting the main timer."
        useCases={[
            { title: "Sports & Athletics", description: "Time races, workouts, or drills. Use the lap feature to track performance over multiple intervals." },
            { title: "Cooking & Baking", description: "Precisely time cooking processes that require accuracy beyond a standard kitchen timer." },
            { title: "Presentations & Speeches", description: "Keep track of your speaking time to ensure you stay within your allotted slot." },
            { title: "Scientific Experiments", description: "Measure reaction times or the duration of processes in a laboratory setting." }
        ]}
        tips={[
            { title: "Lap vs. Split Time", description: "This stopwatch records 'lap times,' which is the time for each individual segment. 'Split time' would be the total elapsed time at the point each lap is marked." },
            { title: "Precision", description: "The timer updates every 10 milliseconds (a centisecond) for high precision, suitable for most common timing needs." },
            { title: "Resetting", description: "The reset button will clear the main time and all recorded laps. Be sure you have recorded your times before resetting." }
        ]}
        faqs={[
            { question: "What is the difference between a stopwatch and a timer?", answer: "A stopwatch measures time that passes from zero upwards. A timer counts down from a specified time to zero." },
            { question: "How accurate is a digital stopwatch?", answer: "Digital stopwatches are highly accurate, limited primarily by the refresh rate of the display and the interval of the JavaScript function, which is typically very fast (milliseconds)." },
            { question: "Can I run this in the background?", answer: "Browser tabs may slow down or pause JavaScript timers when they are not the active tab. For critical, long-duration timing, it's best to keep the tab open and active." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default StopwatchClient;
