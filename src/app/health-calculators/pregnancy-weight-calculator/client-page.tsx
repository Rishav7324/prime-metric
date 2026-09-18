'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type PregWeightResult = {
  bmi: number;
  category: string;
  color: string;
  bg: string;
  border: string;
  week: number;
  totalMin: number;
  totalMax: number;
  gainMin: number;
  gainMax: number;
  rateMin: number;
  rateMax: number;
};

function computePregWeight(weightStr: string, heightStr: string, weekStr: string): PregWeightResult | null {
  const w = parseFloat(weightStr);
  const hCm = parseFloat(heightStr);
  const week = parseInt(weekStr, 10);

  if (!(w >= 30 && w <= 250) || !(hCm >= 120 && hCm <= 220)) return null;
  if (!(week >= 1 && week <= 42)) return null;

  const h = hCm / 100;
  const bmi = w / (h * h);

  let category = "", color = "", bg = "", border = "";
  let totalMin = 0, totalMax = 0, rateMin = 0, rateMax = 0;

  if (bmi < 18.5) {
    category = "Underweight"; color = "text-blue-600"; bg = "bg-blue-50"; border = "border-blue-200";
    totalMin = 12.5; totalMax = 18; rateMin = 0.44; rateMax = 0.58;
  } else if (bmi < 25) {
    category = "Normal Weight"; color = "text-green-600"; bg = "bg-green-50"; border = "border-green-200";
    totalMin = 11.5; totalMax = 16; rateMin = 0.35; rateMax = 0.5;
  } else if (bmi < 30) {
    category = "Overweight"; color = "text-yellow-600"; bg = "bg-yellow-50"; border = "border-yellow-200";
    totalMin = 7; totalMax = 11.5; rateMin = 0.23; rateMax = 0.33;
  } else {
    category = "Obese"; color = "text-red-600"; bg = "bg-red-50"; border = "border-red-200";
    totalMin = 5; totalMax = 9; rateMin = 0.17; rateMax = 0.27;
  }

  // Expected gain so far: ~0.5-2 kg across trimester 1, then steady weekly rate
  let gainMin: number, gainMax: number;
  if (week <= 13) {
    gainMin = (0.5 * week) / 13;
    gainMax = (2 * week) / 13;
  } else {
    gainMin = 0.5 + rateMin * (week - 13);
    gainMax = 2 + rateMax * (week - 13);
  }

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category, color, bg, border,
    week,
    totalMin, totalMax,
    gainMin: parseFloat(gainMin.toFixed(1)),
    gainMax: parseFloat(gainMax.toFixed(1)),
    rateMin, rateMax,
  };
}

const fmt1 = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const PregnancyWeightCalculatorClient = () => {
  const [weight, setWeight] = useState("60");
  const [height, setHeight] = useState("165");
  const [week, setWeek] = useState("20");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PregWeightResult | null>(() => computePregWeight("60", "165", "20"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computePregWeight(weight, height, week);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight (30-250 kg), height (120-220 cm) and week (1-42).",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Target Calculated",
      description: `By week ${computed.week.toLocaleString("en-US")}, target gain is ${fmt1(computed.gainMin)}-${fmt1(computed.gainMax)} kg.`,
    });
  };

  const reset = () => {
    setWeight(""); setHeight(""); setWeek(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Pregnancy weight target (week ${result.week.toLocaleString("en-US")}, pre-pregnancy BMI ${result.bmi} ${result.category}): total gain ${fmt1(result.totalMin)}-${fmt1(result.totalMax)} kg, gained-so-far target ${fmt1(result.gainMin)}-${fmt1(result.gainMax)} kg. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Pregnancy Weight Calculator"
      description="Track healthy pregnancy weight gain by week using IOM guidelines for your pre-pregnancy BMI"
      keywords="pregnancy weight gain calculator, iom weight gain chart, pregnancy bmi calculator, weight gain by week pregnancy"
      canonicalUrl="/health-calculators/pregnancy-weight-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="pre-weight" className="text-sm font-medium">Pre-pregnancy weight (kg)</Label>
              <Input id="pre-weight" type="number" min={30} max={250} placeholder="e.g., 60" value={weight}
                onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="pre-height" className="text-sm font-medium">Height (cm)</Label>
              <Input id="pre-height" type="number" min={120} max={220} placeholder="e.g., 165" value={height}
                onChange={(e) => setHeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="preg-week" className="text-sm font-medium">Current week of pregnancy</Label>
              <Input id="preg-week" type="number" min={1} max={42} placeholder="e.g., 20" value={week}
                onChange={(e) => setWeek(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!weight || !height || !week}>
                Calculate Target
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
            <h2 className="text-lg font-bold text-black">Your Target</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className={`text-center py-4 rounded-xl border ${result.bg} ${result.border}`}>
                <div className={`text-4xl font-bold ${result.color}`}>{fmt1(result.gainMin)} – {fmt1(result.gainMax)} kg</div>
                <div className="text-sm font-medium mt-1 text-black">target gained by week {result.week.toLocaleString("en-US")}</div>
                <div className={`text-sm font-semibold mt-0.5 ${result.color}`}>BMI {result.bmi.toLocaleString("en-US")} · {result.category}</div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Total gain (full term)</p>
                  <p className="text-sm font-bold text-black">{fmt1(result.totalMin)} – {fmt1(result.totalMax)} kg</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Weekly rate (2nd/3rd tri)</p>
                  <p className="text-sm font-bold text-black">{fmt1(result.rateMin)} – {fmt1(result.rateMax)} kg/wk</p>
                </div>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Based on Institute of Medicine (IOM) guidelines for a {result.category.toLowerCase()} pre-pregnancy BMI. Twin or triplet pregnancies need higher targets — ask your provider.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🤰</div>
                <p className="text-sm">Enter your details to see your gain target</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="This tracker applies Institute of Medicine (IOM) weight-gain guidelines to your pre-pregnancy BMI and current week. It shows your BMI category, the recommended total gain for a full-term singleton pregnancy, and the target range you should have gained so far — so you and your provider can spot trends early."
        useCases={[
          { title: "Weekly Check-ins", description: "Compare scale readings against the gained-so-far range at each prenatal week." },
          { title: "Set a Total Goal", description: "Know your full-term target range from the first trimester onward." },
          { title: "Doctor Discussions", description: "Bring your trend to appointments to guide nutrition and activity advice." },
          { title: "Postpartum Planning", description: "Staying near the recommended range makes returning to pre-pregnancy weight easier." },
        ]}
        tips={[
          { title: "Weigh Consistently", description: "Weigh weekly, same time of day and clothing, and look at the trend — not single readings." },
          { title: "Eat for Nourishment", description: "Most people need no extra calories in trimester 1, ~340 extra in trimester 2 and ~450 in trimester 3." },
          { title: "Not Medical Advice", description: "IOM ranges are general guidance for singleton pregnancies. Always follow your own doctor's advice, especially with twins or health conditions." },
        ]}
        faqs={[
          { question: "How much weight should I gain in pregnancy?", answer: "It depends on pre-pregnancy BMI: roughly 12.5–18 kg if underweight, 11.5–16 kg if normal weight, 7–11.5 kg if overweight, and 5–9 kg if obese, for singleton pregnancies." },
          { question: "How is the gained-so-far target worked out?", answer: "We assume about 0.5–2 kg across the first 13 weeks, then a steady weekly rate by BMI category (e.g. 0.35–0.5 kg/week for normal BMI) for the rest of pregnancy." },
          { question: "What if I am carrying twins?", answer: "Twin pregnancies need higher gains (e.g. 16.8–24.5 kg for normal BMI). This calculator covers singleton pregnancies — ask your provider for a twin target." },
          { question: "Should I diet if I gain too fast?", answer: "Never restrict calories without medical supervision during pregnancy. Talk to your provider, who may adjust nutrition and activity rather than cut intake." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PregnancyWeightCalculatorClient;
