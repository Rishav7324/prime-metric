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
import { Copy, RotateCcw } from "lucide-react";

type Vo2Rating = {
  label: string;
  color: string;
  bg: string;
  border: string;
};

type Vo2Result = {
  vo2: number;
  rating: Vo2Rating;
  mets: number;
  kcalPerMin: number;
  groupLabel: string;
  groupIndex: number;
  gender: string;
  age: number;
};

// Rockport 1-mile walk test norms (ml/kg/min): [poorMax, fairMax, goodMax, excellentMax]
const VO2_TABLE: { group: string; male: number[]; female: number[] }[] = [
  { group: "20–29", male: [33, 37, 41, 45], female: [28, 31, 35, 39] },
  { group: "30–39", male: [31.5, 35.5, 39, 42.5], female: [26.5, 29.5, 33, 37] },
  { group: "40–49", male: [29, 33, 36, 39], female: [25, 28.5, 31.5, 35] },
  { group: "50–59", male: [25.5, 29, 32, 34.5], female: [22.5, 26, 28.5, 31] },
  { group: "60+", male: [23, 26, 28, 30.5], female: [20.5, 23.5, 25.5, 27.5] },
];

function groupIndexForAge(age: number): number {
  if (age < 30) return 0;
  if (age < 40) return 1;
  if (age < 50) return 2;
  if (age < 60) return 3;
  return 4;
}

function rateVo2(vo2: number, age: number, gender: string): Vo2Rating {
  const cuts = gender === "female" ? VO2_TABLE[groupIndexForAge(age)].female : VO2_TABLE[groupIndexForAge(age)].male;
  if (vo2 < cuts[0]) return { label: "Poor", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  if (vo2 < cuts[1]) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
  if (vo2 < cuts[2]) return { label: "Good", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" };
  if (vo2 < cuts[3]) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
  return { label: "Superior", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-200" };
}

function computeVo2Max(timeStr: string, hrStr: string, ageStr: string, genderStr: string, weightStr: string): Vo2Result | null {
  const time = parseFloat(timeStr);
  const hr = parseFloat(hrStr);
  const age = parseInt(ageStr);
  const weightKg = parseFloat(weightStr);

  if (!(time >= 5 && time <= 30)) return null;
  if (!(hr >= 80 && hr <= 220)) return null;
  if (!(age >= 10 && age <= 100)) return null;
  if (!(weightKg >= 30 && weightKg <= 250)) return null;

  const weightLb = weightKg * 2.20462;
  const raw = 132.853 - 0.0769 * weightLb - 0.3877 * age - 3.2649 * time - 0.1565 * hr + (genderStr === "male" ? 6.315 : 0);
  const vo2 = parseFloat(raw.toFixed(1));
  const gi = groupIndexForAge(age);

  return {
    vo2,
    rating: rateVo2(vo2, age, genderStr),
    mets: parseFloat((vo2 / 3.5).toFixed(1)),
    kcalPerMin: parseFloat(((vo2 * weightKg * 5) / 1000).toFixed(1)),
    groupLabel: VO2_TABLE[gi].group,
    groupIndex: gi,
    gender: genderStr,
    age,
  };
}

const VO2maxCalculatorClient = () => {
  const [time, setTime] = useState("15");
  const [heartRate, setHeartRate] = useState("140");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("70");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<Vo2Result | null>(() => computeVo2Max("15", "140", "30", "male", "70"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeVo2Max(time, heartRate, age, gender, weight);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Time 5–30 min, heart rate 80–220 bpm, age 10–100, weight 30–250 kg.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "VO2max Estimated", description: `Your VO2max is ${computed.vo2} ml/kg/min (${computed.rating.label}).` });
  };

  const reset = () => {
    setTime(""); setHeartRate(""); setAge(""); setWeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My estimated VO2max: ${result.vo2} ml/kg/min (${result.rating.label}, ${result.gender} ${result.groupLabel}). About ${result.mets} METs, ~${result.kcalPerMin} kcal/min at max effort — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const cuts = gender === "female"
    ? VO2_TABLE.map((r) => r.female)
    : VO2_TABLE.map((r) => r.male);

  return (
    <CalculatorLayout
      title="VO2max Calculator"
      description="Estimate VO2max from a 1-mile walk or run using time, heart rate, age, gender and weight."
      keywords="vo2max calculator, cardio fitness test, rockport walk test, aerobic capacity, met calories"
      canonicalUrl="/health-calculators/vo2max-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Test Result</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="vo2-time" className="text-sm font-medium">1-mile time (minutes)</Label>
              <Input id="vo2-time" type="number" min={5} max={30} step={0.1} placeholder="e.g., 15" value={time}
                onChange={(e) => setTime(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-[11px] text-neutral-500 mt-1">Decimals allowed — 15.5 means 15 min 30 sec.</p>
            </div>
            <div>
              <Label htmlFor="vo2-hr" className="text-sm font-medium">Heart rate at finish (bpm)</Label>
              <Input id="vo2-hr" type="number" min={80} max={220} placeholder="e.g., 140" value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="vo2-age" className="text-sm font-medium">Age</Label>
                <Input id="vo2-age" type="number" min={10} max={100} placeholder="e.g., 30" value={age}
                  onChange={(e) => setAge(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Gender</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="mt-1.5 h-10 text-sm bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="vo2-weight" className="text-sm font-medium">Weight (kg)</Label>
              <Input id="vo2-weight" type="number" min={30} max={250} placeholder="e.g., 70" value={weight}
                onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!time || !heartRate || !age || !weight}>
                Estimate VO2max
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Result */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Your Result</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className={`text-center py-4 rounded-xl border ${result.rating.bg} ${result.rating.border}`}>
                <div className={`text-4xl font-bold ${result.rating.color}`}>{result.vo2}</div>
                <div className="text-xs text-neutral-500 mt-0.5">ml/kg/min</div>
                <div className={`text-base font-semibold mt-1 ${result.rating.color}`}>{result.rating.label}</div>
                <div className="text-[11px] text-neutral-500 mt-0.5 capitalize">{result.gender} · age {result.age} (group {result.groupLabel})</div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Intensity</p>
                  <p className="text-sm font-bold text-black">{result.mets.toLocaleString()} METs</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Burn at max effort</p>
                  <p className="text-sm font-bold text-black">~{result.kcalPerMin.toLocaleString()} kcal/min</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                1 MET = resting burn. At VO2max pace your body uses ~{result.mets.toLocaleString()}× resting energy, roughly {result.kcalPerMin.toLocaleString()} kcal per minute at your weight.
              </p>

              <div>
                <p className="text-xs font-semibold text-black mb-1.5 capitalize">Norms — {gender === "female" ? "women" : "men"} (ml/kg/min)</p>
                <div className="overflow-x-auto border border-neutral-200 rounded-lg">
                  <table className="w-full text-[10px] sm:text-[11px]">
                    <thead>
                      <tr className="bg-neutral-50 text-neutral-500">
                        <th className="px-2 py-1.5 text-left font-semibold">Age</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Poor</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Fair</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Good</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Excl.</th>
                        <th className="px-2 py-1.5 text-center font-semibold">Super.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {VO2_TABLE.map((row, i) => (
                        <tr key={row.group} className={i === result.groupIndex && result.gender === gender ? "bg-[#FFF5F2] font-semibold text-black" : "text-neutral-600"}>
                          <td className="px-2 py-1.5">{row.group}</td>
                          <td className="px-2 py-1.5 text-center">&lt;{cuts[i][0]}</td>
                          <td className="px-2 py-1.5 text-center">{cuts[i][0]}–{cuts[i][1]}</td>
                          <td className="px-2 py-1.5 text-center">{cuts[i][1]}–{cuts[i][2]}</td>
                          <td className="px-2 py-1.5 text-center">{cuts[i][2]}–{cuts[i][3]}</td>
                          <td className="px-2 py-1.5 text-center">≥{cuts[i][3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🫁</div>
                <p className="text-sm">Enter your 1-mile test result to estimate VO2max</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="VO2max is the maximum rate your body can use oxygen during hard exercise, measured in ml/kg/min — the gold-standard marker of cardio fitness. This calculator uses the Rockport 1-mile walk formula, which estimates VO2max from your mile time, finishing heart rate, age, gender and body weight. Your score is graded against age- and gender-based norms, with MET intensity and calorie-burn equivalents included."
        useCases={[
          { title: "Track Aerobic Base", description: "Runners and cyclists can re-test every few weeks to see if endurance training is working." },
          { title: "Lab-Free Fitness Check", description: "Get a solid cardio estimate from a flat 1-mile walk — no mask or treadmill lab needed." },
          { title: "Fair Age Comparisons", description: "Norms adjust for age and gender, so a 55-year-old can judge fitness against true peers." },
          { title: "Fuel Hard Sessions", description: "Convert your MET score into calories per minute to plan fueling for intense workouts." },
        ]}
        tips={[
          { title: "Walk It Fast and Flat", description: "Warm up first, then cover exactly one mile as fast as you can walk on level ground." },
          { title: "Catch Your Pulse Instantly", description: "Check your heart rate the moment you finish — even a 30-second delay reads too low." },
          { title: "Retest Like for Like", description: "Same route, same time of day and similar effort make before-and-after scores comparable." },
        ]}
        faqs={[
          { question: "What is a good VO2max?", answer: "It depends on age and gender — roughly 40+ for young men and 33+ for young women is good, while 45+/39+ is excellent. Check your row in the norms table above." },
          { question: "Should I walk or run the mile?", answer: "The Rockport formula was built for a fast walk. Running all-out skews the estimate upward, so walk briskly without breaking into a jog." },
          { question: "How accurate is this vs a lab test?", answer: "Within about 10% for most people — plenty for tracking trends and setting training zones, though labs remain the gold standard." },
          { question: "How can I raise my VO2max?", answer: "Mix weekly interval sessions (e.g. 4×4 minutes hard) with longer easy cardio. Most beginners gain 10–20% in two to three months." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default VO2maxCalculatorClient;
