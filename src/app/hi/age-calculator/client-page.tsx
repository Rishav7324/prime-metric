'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type AgeResult = {
  years: number; months: number; days: number;
  totalDays: number; totalMonths: number; totalWeeks: number;
  totalHours: number; totalMinutes: number;
  weekday: string; zodiac: string; nextBirthday: string; nextInDays: number;
};

const WEEKDAYS = ["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"];

function zodiacSign(m: number, d: number): string {
  const signs: [string, [number, number], [number, number]][] = [
    ["मकर", [12, 22], [1, 19]], ["कुंभ", [1, 20], [2, 18]],
    ["मीन", [2, 19], [3, 20]], ["मेष", [3, 21], [4, 19]],
    ["वृषभ", [4, 20], [5, 20]], ["मिथुन", [5, 21], [6, 20]],
    ["कर्क", [6, 21], [7, 22]], ["सिंह", [7, 23], [8, 22]],
    ["कन्या", [8, 23], [9, 22]], ["तुला", [9, 23], [10, 22]],
    ["वृश्चिक", [10, 23], [11, 21]], ["धनु", [11, 22], [12, 21]],
  ];
  for (const [name, [sm, sd], [em, ed]] of signs) {
    if ((m === sm && d >= sd) || (m === em && d <= ed)) return name;
  }
  return "मकर";
}

function computeAge(birthStr: string): AgeResult | null {
  if (!birthStr) return null;
  const birth = new Date(birthStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (isNaN(birth.getTime()) || birth.getTime() > today.getTime()) return null;

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) { years--; months += 12; }

  const totalDays = Math.floor((today.getTime() - birth.getTime()) / 86400000);

  // Next birthday
  let next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
  if (next.getTime() <= today.getTime()) next = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
  const nextInDays = Math.round((next.getTime() - today.getTime()) / 86400000);

  return {
    years, months, days, totalDays,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    weekday: WEEKDAYS[birth.getDay()],
    zodiac: zodiacSign(birth.getMonth() + 1, birth.getDate()),
    nextBirthday: next.toLocaleDateString("hi-IN", { weekday: "long", month: "long", day: "numeric" }),
    nextInDays,
  };
}

const AgeCalculatorHindiClient = () => {
  const [birthDate, setBirthDate] = useState("");
  // Auto-calculates on mount with default date so result renders instantly
  const [result, setResult] = useState<AgeResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const d = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
    const iso = d.toISOString().split('T')[0];
    setBirthDate(iso);
    const computed = computeAge(iso);
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const computed = computeAge(birthDate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "अमान्य इनपुट",
        description: !birthDate ? "कृपया अपनी जन्म तिथि दर्ज करें।" : "जन्म तिथि भविष्य की नहीं हो सकती।",
      });
      return;
    }
    setResult(computed);
    toast({ title: "आयु की गणना हो गई", description: `आप ${computed.years} वर्ष, ${computed.months} महीने के हैं।` });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `मेरी आयु ${result.years} वर्ष, ${result.months} महीने, ${result.days} दिन है (कुल ${result.totalDays.toLocaleString()} दिन)। ${result.weekday} को जन्म, राशि ${result.zodiac}। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="आयु कैलकुलेटर"
      description="वर्ष, महीने, दिनों में सटीक उम्र — जन्म का सप्ताह का दिन, राशि और अगले जन्मदिन की उल्टी गिनती के साथ — मुफ्त ऑनलाइन टूल"
      keywords="आयु कैलकुलेटर, age calculator hindi, जन्म तिथि से उम्र, birthday calculator hindi"
      canonicalUrl="/hi/age-calculator"
      explanation="अपनी जन्म तिथि से सटीक उम्र जानें, साथ ही जन्म के सप्ताह का दिन और अगले जन्मदिन की उल्टी गिनती जैसी मज़ेदार जानकारी।"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">आपकी जन्म तिथि</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">जन्म तिथि</Label>
              <Input type="date" value={birthDate} max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBirthDate(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">आयु की गणना करें</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="रीसेट">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">आपकी आयु — परिणाम</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-2xl font-bold text-black">
                  {result.years}<span className="text-sm font-medium text-neutral-500">व </span>
                  {result.months}<span className="text-sm font-medium text-neutral-500">म </span>
                  {result.days}<span className="text-sm font-medium text-neutral-500">दि</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ["दिन", result.totalDays.toLocaleString()],
                  ["सप्ताह", result.totalWeeks.toLocaleString()],
                  ["महीने", result.totalMonths.toLocaleString()],
                  ["घंटे", result.totalHours.toLocaleString()],
                  ["मिनट", result.totalMinutes.toLocaleString()],
                  ["सप्ताह का दिन", result.weekday],
                ].map(([label, value]) => (
                  <div key={label} className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                    <p className="text-[11px] text-neutral-500">{label}</p>
                    <p className="text-[13px] font-bold text-black truncate">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">राशि</p>
                  <p className="text-[13px] font-bold text-black">♈ {result.zodiac}</p>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">अगले जन्मदिन में</p>
                  <p className="text-[13px] font-bold text-[#c25136]">{result.nextInDays} दिन</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">अगला जन्मदिन: {result.nextBirthday}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🎂</div><p className="text-sm">अपनी जन्म तिथि चुनें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="आयु कैलकुलेटर आपकी जन्म तिथि से सटीक उम्र — वर्ष, महीने और दिन — बताता है। लीप वर्ष और महीनों की लंबाई का ध्यान अपने आप रखा जाता है। यह भी पता चलता है कि आप सप्ताह के किस दिन पैदा हुए थे, आपकी राशि क्या है और अगले जन्मदिन में कितने दिन बचे हैं।"
        useCases={[
          { title: "सरकारी फॉर्म", description: "नौकरी, वीज़ा और परीक्षा आवेदनों के लिए वर्ष-महीने-दिन में सटीक उम्र पाएं।" },
          { title: "खास मौके", description: "जिए गए कुल दिनों को गिनें या खास जन्मदिन की उल्टी गिनती करें।" },
          { title: "मज़ेदार जानकारी", description: "अपने जन्म का सप्ताह का दिन और राशि जानकर साझा करें।" },
        ]}
        tips={[
          { title: "लीप वर्ष के जन्म", description: "29 फरवरी को जन्मे हैं? कैलकुलेटर बीते वास्तविक दिनों से गिनता है, इसलिए परिणाम सटीक रहता है।" },
          { title: "समय क्षेत्र नोट", description: "आयु आपके डिवाइस की तारीख से निकलती है — आधी रात को परिणाम बदल सकता है।" },
          { title: "सही तारीख चुनें", description: "सर्टिफिकेट वाली जन्म तिथि ही दर्ज करें ताकि फॉर्म से मेल खाए।" },
        ]}
        faqs={[
          { question: "सटीक उम्र कैसे निकाली जाती है?", answer: "वर्ष, महीने और दिन कैलेंडर तुलना से निकाले जाते हैं (हाथ से घटाने जैसे दिन-महीने उधार लेकर), जबकि कुल दिन बीते मिलीसेकंड से — लीप वर्ष अपने आप शामिल।" },
          { question: "ऑनलाइन आयु कैलकुलेटर कभी एक दिन अलग क्यों बताते हैं?", answer: "आमतौर पर समय क्षेत्र या दिन के समय के कारण। हम दोनों तारीखों को स्थानीय आधी रात पर सामान्य करते हैं।" },
          { question: "कौन सी राशि प्रणाली उपयोग होती है?", answer: "जन्म के महीने और दिन पर आधारित पश्चिमी राशि प्रणाली।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default AgeCalculatorHindiClient;
