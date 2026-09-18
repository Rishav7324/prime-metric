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

function parseFinite(v: string): number | null {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

function computePercentOf(xStr: string, yStr: string): number | null {
  const x = parseFinite(xStr);
  const y = parseFinite(yStr);
  if (x === null || y === null) return null;
  const out = (x / 100) * y;
  return Number.isFinite(out) ? out : null;
}

function computeWhatPercent(xStr: string, yStr: string): number | null {
  const x = parseFinite(xStr);
  const y = parseFinite(yStr);
  if (x === null || y === null || y === 0) return null;
  const out = (x / y) * 100;
  return Number.isFinite(out) ? out : null;
}

function computePercentChange(initialStr: string, finalStr: string): number | null {
  const initial = parseFinite(initialStr);
  const fin = parseFinite(finalStr);
  if (initial === null || fin === null || initial === 0) return null;
  const out = ((fin - initial) / Math.abs(initial)) * 100;
  return Number.isFinite(out) ? out : null;
}

const fmt = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 2 });

const PercentageCalculatorHindi = () => {
  const [val1, setVal1] = useState("20");
  const [val2, setVal2] = useState("500");
  // Pre-filled so results render instantly (no empty state)
  const [result1, setResult1] = useState<number | null>(() => computePercentOf("20", "500"));
  const [result2, setResult2] = useState<number | null>(() => computeWhatPercent("20", "500"));
  const [result3, setResult3] = useState<number | null>(() => computePercentChange("20", "500"));
  const { toast } = useToast();

  const calculate1 = () => {
    const computed = computePercentOf(val1, val2);
    if (computed === null) {
      toast({ title: "अमान्य इनपुट", description: "X (%) और Y के लिए सही संख्याएं दर्ज करें।", variant: "destructive" });
      return;
    }
    setResult1(computed);
    toast({ title: "गणना पूरी हो गई", description: `${val2} का ${val1}% = ${fmt(computed)} है।` });
  };

  const calculate2 = () => {
    const y = parseFinite(val2);
    const computed = computeWhatPercent(val1, val2);
    if (computed === null) {
      if (parseFinite(val1) === null || y === null) {
        toast({ title: "अमान्य इनपुट", description: "X और Y के लिए सही संख्याएं दर्ज करें।", variant: "destructive" });
      } else {
        toast({ title: "अमान्य इनपुट", description: "Y शून्य नहीं हो सकता (शून्य से भाग नहीं)।", variant: "destructive" });
      }
      return;
    }
    setResult2(computed);
    toast({ title: "गणना पूरी हो गई", description: `${val1}, ${val2} का ${fmt(computed)}% है।` });
  };

  const calculate3 = () => {
    const initial = parseFinite(val1);
    const computed = computePercentChange(val1, val2);
    if (computed === null) {
      if (initial === null || parseFinite(val2) === null) {
        toast({ title: "अमान्य इनपुट", description: "प्रारंभिक और अंतिम मूल्य के लिए सही संख्याएं दर्ज करें।", variant: "destructive" });
      } else {
        toast({ title: "अमान्य इनपुट", description: "प्रारंभिक मूल्य शून्य नहीं हो सकता (शून्य से भाग नहीं)।", variant: "destructive" });
      }
      return;
    }
    setResult3(computed);
    toast({ title: "गणना पूरी हो गई", description: `बदलाव ${fmt(computed)}% है।` });
  };

  const reset = () => {
    setVal1(""); setVal2("");
    setResult1(null); setResult2(null); setResult3(null);
  };

  const copyValue = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };


  return (
    <CalculatorLayout
      title="प्रतिशत कैलकुलेटर"
      description="सभी तरह की प्रतिशत गणनाएं करें — प्रतिशत निकालें, अनुपात और वृद्धि-कमी जानें | मुफ्त ऑनलाइन टूल"
      keywords="प्रतिशत कैलकुलेटर, percentage calculator hindi, प्रतिशत कैसे निकालें, percent calculator hindi"
      canonicalUrl="/hi/percentage-calculator"
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">1. Y का X% कितना है?</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>X (%)</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="जैसे, 20" />
            </div>
             <div className="flex-1">
              <Label>Y</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="जैसे, 500" />
            </div>
            <Button onClick={calculate1}>गणना करें</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="रीसेट">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result1 !== null && (
            <div className="mt-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 px-1">परिणाम</span>
                <Button onClick={() => copyValue(fmt(result1))} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
                </Button>
              </div>
              <div className="text-center font-bold">{fmt(result1)}</div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">2. X, Y का कितना प्रतिशत है?</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>X</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="जैसे, 100" />
            </div>
             <div className="flex-1">
              <Label>Y</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="जैसे, 500" />
            </div>
            <Button onClick={calculate2}>गणना करें</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="रीसेट">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result2 !== null && (
            <div className="mt-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 px-1">परिणाम</span>
                <Button onClick={() => copyValue(`${fmt(result2)}%`)} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
                </Button>
              </div>
              <div className="text-center font-bold">{fmt(result2)}%</div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">3. प्रतिशत वृद्धि/कमी</h3>
           <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>प्रारंभिक मूल्य</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="जैसे, 100" />
            </div>
             <div className="flex-1">
              <Label>अंतिम मूल्य</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="जैसे, 120" />
            </div>
            <Button onClick={calculate3}>गणना करें</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="रीसेट">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result3 !== null && (
            <div className="mt-4 p-2 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-neutral-500 px-1">परिणाम</span>
                <Button onClick={() => copyValue(`${fmt(result3)}%`)} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
                </Button>
              </div>
              <div className="text-center font-bold">{fmt(result3)}%</div>
            </div>
          )}
        </Card>
      </div>
      <CalculatorContentSection
        aboutContent="प्रतिशत कैलकुलेटर हर तरह की प्रतिशत समस्याओं के लिए उपयोगी टूल है। किसी संख्या का प्रतिशत निकालना हो, एक संख्या दूसरी का कितना प्रतिशत है यह जानना हो, या प्रतिशत वृद्धि-कमी निकालनी हो — यह टूल सब कुछ करता है।"
        useCases={[
          { title: "खरीदारी छूट", description: "सेल में बचत तुरंत निकालें (जैसे ₹800 की वस्तु पर 25% छूट)।" },
          { title: "टिप की गणना", description: "रेस्तरां में टिप आसानी से निकालें (जैसे ₹550 के बिल पर 10%)।" },
          { title: "वित्तीय विश्लेषण", description: "शेयर भाव, आय या अन्य आंकड़ों में प्रतिशत बदलाव निकालें।" },
          { title: "परीक्षा अंक", description: "टेस्ट स्कोर प्रतिशत में निकालें (जैसे 50 में से 45 सही उत्तर)।" },
        ]}
        tips={[
          { title: "'का' का अर्थ", description: "गणित में 'का' का मतलब आमतौर पर 'गुणा' होता है। यानी '50 का 20%' = '0.20 × 50'।" },
          { title: "दशमलव बदलना", description: "प्रतिशत को दशमलव में बदलने के लिए 100 से भाग दें (25% = 0.25)। दशमलव को प्रतिशत में बदलने के लिए 100 से गुणा करें।" },
          { title: "प्रतिशत बदलाव सूत्र", description: "सूत्र है: ((अंतिम मूल्य − प्रारंभिक मूल्य) ÷ |प्रारंभिक मूल्य|) × 100।" },
        ]}
        faqs={[
          { question: "किसी संख्या का प्रतिशत कैसे निकालें?", answer: "प्रतिशत को दशमलव में बदलकर संख्या से गुणा करें। जैसे 200 का 20% = 0.20 × 200 = 40।" },
          { question: "एक संख्या दूसरी का कितना प्रतिशत है, कैसे जानें?", answer: "पहली संख्या को दूसरी से भाग देकर 100 से गुणा करें। जैसे 200 का 50 = (50 ÷ 200) × 100 = 25%।" },
          { question: "प्रतिशत वृद्धि कैसे निकालें?", answer: "अंतिम में से प्रारंभिक घटाएं, प्रारंभिक से भाग दें और 100 से गुणा करें। जैसे ₹10 से ₹12 = ((12 − 10) ÷ 10) × 100 = 20%।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentageCalculatorHindi;
