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

type BsaResult = {
  dubois: number;
  mosteller: number;
  average: number;
};

function computeBsa(weightStr: string, heightStr: string): BsaResult | null {
  const w = parseFloat(weightStr);
  const hCm = parseFloat(heightStr);

  if (!(w > 0 && w < 500) || !(hCm > 50 && hCm < 300)) return null;

  // Du Bois: 0.007184 × W^0.425 × H^0.725 (W in kg, H in cm)
  const dubois = 0.007184 * Math.pow(w, 0.425) * Math.pow(hCm, 0.725);
  // Mosteller: sqrt(W × H / 3600)
  const mosteller = Math.sqrt((w * hCm) / 3600);

  return {
    dubois: parseFloat(dubois.toFixed(2)),
    mosteller: parseFloat(mosteller.toFixed(2)),
    average: parseFloat(((dubois + mosteller) / 2).toFixed(2)),
  };
}

const fmt2 = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const BSACalculatorClient = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BsaResult | null>(() => computeBsa("70", "175"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeBsa(weight, height);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter weight (1-500 kg) and height (50-300 cm).",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "BSA Calculated",
      description: `Du Bois: ${fmt2(computed.dubois)} m², Mosteller: ${fmt2(computed.mosteller)} m².`,
    });
  };

  const reset = () => {
    setWeight(""); setHeight(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `My BSA: Du Bois ${fmt2(result.dubois)} m², Mosteller ${fmt2(result.mosteller)} m² (average ${fmt2(result.average)} m²). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="BSA Calculator"
      description="Calculate Body Surface Area in m² with the Du Bois and Mosteller formulas from weight and height"
      keywords="bsa calculator, body surface area calculator, dubois formula, mosteller formula, bsa drug dosing"
      canonicalUrl="/health-calculators/bsa-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Enter Your Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bsa-weight" className="text-sm font-medium">Weight (kg)</Label>
              <Input id="bsa-weight" type="number" min={1} max={500} placeholder="e.g., 70" value={weight}
                onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="bsa-height" className="text-sm font-medium">Height (cm)</Label>
              <Input id="bsa-height" type="number" min={50} max={300} placeholder="e.g., 175" value={height}
                onChange={(e) => setHeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button" disabled={!weight || !height}>
                Calculate BSA
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
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="py-4 px-2 rounded-xl border bg-[#FFF5F2] border-[#F2765E]/25">
                  <p className="text-xs text-neutral-500">Du Bois</p>
                  <p className="text-2xl font-bold text-[#c25136]">{fmt2(result.dubois)}</p>
                  <p className="text-xs text-neutral-500">m²</p>
                </div>
                <div className="py-4 px-2 rounded-xl border bg-green-50 border-green-200">
                  <p className="text-xs text-neutral-500">Mosteller</p>
                  <p className="text-2xl font-bold text-green-600">{fmt2(result.mosteller)}</p>
                  <p className="text-xs text-neutral-500">m²</p>
                </div>
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-center">
                <p className="text-xs text-neutral-500">Average of both formulas</p>
                <p className="text-sm font-bold text-black">{fmt2(result.average)} m²</p>
              </div>

              <p className="text-[11px] text-neutral-500 leading-relaxed">
                BSA guides chemotherapy and drug dosing, burn-area estimates and cardiac index. Dosing decisions must be made by a clinician — never dose medication from this calculator alone.
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🧍</div>
                <p className="text-sm">Enter weight and height to see BSA</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Body Surface Area (BSA) estimates your skin's total area in square metres from weight and height. This calculator shows both the classic Du Bois formula and the simpler Mosteller formula, which usually agree within a few percent and are widely used in clinical practice."
        useCases={[
          { title: "Drug Dosing", description: "Many chemotherapy, paediatric and critical-care doses are scaled to BSA rather than weight alone." },
          { title: "Burn Assessment", description: "BSA helps express burn size and fluid needs as a share of total body area." },
          { title: "Cardiac Index", description: "Cardiac output divided by BSA gives cardiac index, a standard heart-function measure." },
          { title: "Fitness Tracking", description: "Compare BSA over time alongside BMI for a fuller picture of body size." },
        ]}
        tips={[
          { title: "Formulas Agree Closely", description: "Du Bois suits research precision; Mosteller is easier mental math — either is fine for everyday estimates." },
          { title: "Measure Accurately", description: "Weigh lightly clothed and measure height barefoot — small errors shift BSA noticeably." },
          { title: "Consult Your Doctor", description: "BSA-based dosing is a clinical decision. Always consult a doctor or pharmacist before using BSA for any medication." },
        ]}
        faqs={[
          { question: "What is the Du Bois formula?", answer: "BSA = 0.007184 × weight^0.425 × height^0.725, with weight in kg and height in cm. Published in 1916, it remains the reference formula." },
          { question: "What is the Mosteller formula?", answer: "BSA = √((weight × height) / 3600). It is simpler and matches Du Bois closely for most adults, so many clinics prefer it." },
          { question: "What is a normal BSA?", answer: "Average adults fall around 1.6–1.9 m² for women and 1.9–2.2 m² for men, but healthy values vary widely with size." },
          { question: "Why is BSA used for drug dosing?", answer: "Some drugs distribute or clear in proportion to surface-influenced metabolism better than weight alone, so BSA-based dosing can be safer — decided by clinicians." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default BSACalculatorClient;
