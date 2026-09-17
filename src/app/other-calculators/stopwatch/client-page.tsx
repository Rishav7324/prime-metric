'use client';

import { useState, useRef, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, RotateCcw, Flag, Copy } from "lucide-react";

const formatTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000).toString().padStart(2, '0');
  const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
  const centiseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}.${centiseconds}`;
};

const StopwatchClient = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!isRunning) return;
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime + 10);
    }, 10);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const splits: number[] = useMemo(() => {
    return laps.map((lap, i) => (i === 0 ? lap : lap - laps[i - 1]));
  }, [laps]);

  const fastestLap: number | null = splits.length > 0 ? Math.min(...splits) : null;
  const slowestLap: number | null = splits.length > 0 ? Math.max(...splits) : null;

  const handleStartStop = (): void => {
    setIsRunning(prev => !prev);
  };

  const handleLap = (): void => {
    if (!isRunning) {
      toast({ variant: "destructive", title: "Not Running", description: "Start the stopwatch before recording a lap." });
      return;
    }
    const lapNumber = laps.length + 1;
    setLaps(prevLaps => [...prevLaps, time]);
    toast({ title: "Lap Recorded", description: `Lap ${lapNumber.toLocaleString()} recorded.` });
  };

  const handleReset = (): void => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    toast({ title: "Stopwatch Reset", description: "The stopwatch has been reset to zero." });
  };

  const copyResult = async (): Promise<void> => {
    if (time === 0 && laps.length === 0) return;
    const lines: string[] = [
      `Stopwatch: ${formatTime(time)}`,
      `Laps: ${laps.length.toLocaleString()}`,
      ...splits.map((split, i) => `Lap ${(i + 1).toLocaleString()}: ${formatTime(laps[i])} (split ${formatTime(split)})`),
    ];
    if (fastestLap !== null && slowestLap !== null) {
      lines.push(`Fastest split: ${formatTime(fastestLap)}`, `Slowest split: ${formatTime(slowestLap)}`);
    }
    const text = `${lines.join("\n")} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const isResetDisabled: boolean = !isRunning && time === 0 && laps.length === 0;

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
          <Button onClick={handleReset} variant="destructive" size="lg" disabled={isResetDisabled}>
            <RotateCcw className="mr-2" /> Reset
          </Button>
        </div>

        {laps.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Laps</h3>
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            </div>
            {fastestLap !== null && slowestLap !== null && (
              <div className="grid grid-cols-2 gap-2 mb-3 text-center">
                <div className="p-2 bg-muted/50 rounded-md">
                  <p className="text-xs text-neutral-600">Fastest split</p>
                  <p className="font-mono font-bold">{formatTime(fastestLap)}</p>
                </div>
                <div className="p-2 bg-muted/50 rounded-md">
                  <p className="text-xs text-neutral-600">Slowest split</p>
                  <p className="font-mono font-bold">{formatTime(slowestLap)}</p>
                </div>
              </div>
            )}
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {laps.map((lap, index) => (
                <li key={index} className="flex justify-between p-2 bg-muted/50 rounded-md">
                  <span>Lap {(index + 1).toLocaleString()}</span>
                  <span className="font-mono">{formatTime(lap)}</span>
                </li>
              )).reverse()}
            </ul>
          </div>
        )}
      </Card>
      
      <CalculatorContentSection
        aboutContent="A stopwatch is a timepiece designed to measure the amount of time that elapses between its activation and deactivation. This digital stopwatch provides precise measurement up to the centisecond (1/100th of a second), offering a level of accuracy suitable for both professional and casual use. It includes a lap timer to record split times—capturing the duration of specific intervals without interrupting the main timer. This functionality is crucial for analyzing performance in multi-stage events or workouts. The interface is designed for simplicity and immediate feedback, with clear displays and responsive controls for starting, stopping, recording laps, and resetting the timer. It operates entirely within the user's browser, ensuring privacy and instant accessibility without needing an internet connection after the page has loaded."
        useCases={[
            { title: "Sports & Athletics", description: "Time races, workouts, or drills with high precision. Use the lap feature to track performance over multiple intervals, such as timing individual laps in swimming or running. Coaches can use it to monitor athlete performance and identify areas for improvement. It is essential for track and field, motorsports, and any sport where timing is critical." },
            { title: "Cooking & Baking", description: "Precisely time cooking processes that require accuracy beyond a standard kitchen timer, such as steeping tea, searing a steak, or timing the stages of a complex recipe. The centisecond precision allows for very fine control over cooking durations." },
            { title: "Presentations & Speeches", description: "Keep track of your speaking time to ensure you stay within your allotted slot. The lap function can be used to time individual sections of a talk, helping you manage your pace and deliver a well-timed presentation. It's an invaluable tool for public speakers, students, and professionals." },
            { title: "Scientific Experiments", description: "Measure reaction times, the duration of chemical processes, or the timing of physical phenomena in a laboratory setting. The precision and lap functionality allow researchers to collect accurate temporal data for analysis and reporting, ensuring the reliability of experimental results." }
        ]}
        examples={[
          {
            title: "Timing a 400-Meter Race",
            description: "A track coach wants to time a runner's 400-meter race and record the time for each 100-meter split.",
            steps: [
              "Press 'Start' the moment the race begins.",
              "As the runner completes the first 100 meters, press 'Lap'. The first lap time is recorded.",
              "Press 'Lap' again as they complete the 200m and 300m marks.",
              "Press 'Pause' as the runner crosses the finish line at 400 meters.",
              "The main display shows the total race time, and the laps list shows the cumulative time at each 100m split."
            ]
          },
          {
            title: "Interval Training Workout",
            description: "An athlete is doing an interval workout consisting of 5 rounds of a 1-minute sprint followed by a 30-second rest.",
            steps: [
              "Press 'Start' at the beginning of the first sprint.",
              "Press 'Lap' after 1 minute to mark the end of the sprint and beginning of the rest.",
              "Press 'Lap' again after the 30-second rest period to mark the start of the next sprint.",
              "Repeat this process for all 5 rounds.",
              "After pressing 'Pause', the lap list will show the exact duration of each sprint and rest interval, allowing for performance analysis."
            ]
          }
        ]}
        tips={[
            { title: "Lap vs. Split Time", description: "This stopwatch records 'lap times,' which show the cumulative time at the moment the lap button is pressed. To find the time for an individual segment (a 'split'), you would manually subtract the previous lap's time from the current one. For example, if Lap 1 is 1:05 and Lap 2 is 2:15, the split for the second segment is 1:10." },
            { title: "Precision", description: "The timer updates every 10 milliseconds (a centisecond), providing high precision suitable for most common timing needs. This is more accurate than many physical stopwatches and standard timers. Be aware that human reaction time can introduce a small margin of error when starting and stopping the timer." },
            { title: "Resetting", description: "The reset button will instantly clear the main time and all recorded laps. Before resetting, ensure you have noted down any important times, as this action cannot be undone. This is crucial after timing an important event or race." },
            { title: "Use in a Stable Environment", description: "For critical timing, ensure your device is stable and you have a clear view of the screen. Avoid running too many other heavy applications in the background, as this could theoretically impact the browser's timer performance, although this is rare on modern devices." }
        ]}
        faqs={[
            { question: "What is the difference between a stopwatch and a timer?", answer: "A stopwatch measures elapsed time by counting up from zero. It is used to see how long something takes. A timer, on the other hand, counts down from a specified time to zero and is used to signal when a certain amount of time has passed." },
            { question: "How accurate is a digital browser-based stopwatch?", answer: "Digital stopwatches are highly accurate. Their precision is limited primarily by the browser's JavaScript timer interval, which is typically set to a few milliseconds (this one uses 10ms). The main source of inaccuracy comes from human reaction time when starting and stopping the timer, which is usually much larger than the timer's technical precision." },
            { question: "Can I run this in the background or if my screen locks?", answer: "Most modern browsers significantly slow down or pause JavaScript timers in inactive tabs or when the device screen is locked to save battery and resources. For critical, long-duration timing, it is highly recommended to keep the tab open and active to ensure the stopwatch continues to run accurately." },
            { question: "How many laps can I record?", answer: "The number of laps you can record is practically unlimited, constrained only by your browser's memory. The lap list is scrollable, so you can record dozens or even hundreds of laps without issue, making it suitable for long events or detailed workout tracking." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default StopwatchClient;
