'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type YearRow = { year: number; invested: number; value: number };
type SipResult = {
  futureValue: number; totalInvested: number; wealthGained: number;
  investedShare: number; schedule: YearRow[];
};

const futureValueAt = (p: number, r: number, n: number) =>
  r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

function computeSip(pStr: string, annualStr: string, yearsStr: string): SipResult | null {
  const p = parseFloat(pStr);
  const annual = parseFloat(annualStr);
  const years = parseInt(yearsStr);

  if (!(p > 0 && p <= 1e9) || isNaN(annual) || annual < -50 || annual > 100 || !(years >= 1 && years <= 50)) {
    return null;
  }

  const r = annual / 100 / 12;
  const n = years * 12;
  const futureValue = futureValueAt(p, r, n);
  const totalInvested = p * n;

  const schedule: YearRow[] = [];
  for (let y = 1; y <= years; y++) {
    schedule.push({ year: y, invested: p * y * 12, value: futureValueAt(p, r, y * 12) });
  }

  return {
    futureValue, totalInvested, wealthGained: futureValue - totalInvested,
    investedShare: (totalInvested / futureValue) * 100, schedule,
  };
}

const SipCalculatorHindi = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState("5000");
  const [returnRate, setReturnRate] = useState("12");
  const [timePeriod, setTimePeriod] = useState("10");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<SipResult | null>(() => computeSip("5000", "12", "10"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeSip(monthlyInvestment, returnRate, timePeriod);
    if (!computed) {
      toast({ variant: "destructive", title: "अमान्य इनपुट", description: "निवेश (1+), रिटर्न (-50 से 100%), वर्ष (1-50) दर्ज करें।" });
      return;
    }
    setResult(computed);
    const yrs = parseInt(timePeriod);
    toast({ title: "एसआईपी अनुमान तैयार", description: `अनुमानित मूल्य ${currencySymbol}${fmt(computed.futureValue)} (${yrs} वर्ष में)।` });
  };

  const reset = () => { setMonthlyInvestment(""); setReturnRate(""); setTimePeriod(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `एसआईपी: ${currencySymbol}${fmt(parseFloat(monthlyInvestment))}/महीना, ${timePeriod} वर्ष, ${returnRate}% पर → अनुमानित मूल्य ${currencySymbol}${fmt(result.futureValue)} (निवेश ${currencySymbol}${fmt(result.totalInvested)}, लाभ ${currencySymbol}${fmt(result.wealthGained)})। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="एसआईपी कैलकुलेटर"
      description="चक्रवृद्धि के साथ एसआईपी वृद्धि का अनुमान लगाएं — वर्ष-दर-वर्ष विवरण और निवेश-बनाम-लाभ के साथ | मुफ्त ऑनलाइन टूल"
      keywords="एसआईपी कैलकुलेटर, sip hindi, म्यूचुअल फंड sip रिटर्न, sip निवेश योजना"
      canonicalUrl="/hi/sip-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">निवेश विवरण</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">मासिक निवेश ({currencySymbol})</Label>
              <Input type="number" min={1} value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} placeholder="जैसे, 5000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">अपेक्षित वार्षिक रिटर्न (%)</Label>
              <Input type="number" step={0.5} value={returnRate} onChange={(e) => setReturnRate(e.target.value)} placeholder="जैसे, 12" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">समय अवधि (वर्ष)</Label>
              <Input type="number" min={1} max={50} value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} placeholder="जैसे, 10" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">वृद्धि की गणना करें</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="रीसेट">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">अनुमान</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">अनुमानित भविष्य मूल्य</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.futureValue)}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${result.investedShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${100 - result.investedShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />निवेश {result.investedShare.toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />लाभ {(100 - result.investedShare).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">कुल निवेश</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalInvested)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">कुल लाभ</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.wealthGained)}</p>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "छिपाएं" : "दिखाएं"} वर्ष-दर-वर्ष वृद्धि
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">वर्ष</th>
                        <th className="text-right font-semibold px-2.5 py-2">निवेश</th>
                        <th className="text-right font-semibold px-2.5 py-2">मूल्य</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.year}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.invested)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">📈</div><p className="text-sm">वृद्धि का अनुमान देखने के लिए विवरण दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="सिस्टेमैटिक इन्वेस्टमेंट प्लान (एसआईपी) में हर महीने एक निश्चित राशि म्यूचुअल फंड या शेयरों में निवेश होती है। रिटर्न समय के साथ चक्रवृद्धि होता है — यह कैलकुलेटर मासिक चक्रवृद्धि से भविष्य मूल्य का अनुमान और हर वर्ष का योगदान दिखाता है।"
        useCases={[
          { title: "रिटायरमेंट फंड", description: "20-30 वर्षों की चक्रवृद्धि में छोटी मासिक राशि कितनी बनती है, देखें।" },
          { title: "लक्ष्य योजना", description: "लक्ष्य (शिक्षा, घर) से पीछे की ओर मासिक एसआईपी निकालें।" },
          { title: "तुलना करें", description: "निवेश से पहले रिटर्न दर और अवधि के विकल्प आज़माएं।" },
        ]}
        tips={[
          { title: "जल्दी शुरू करें", description: "राशि से ज़्यादा समय मायने रखता है — 10 अतिरिक्त वर्ष परिणाम तिगुना कर सकते हैं।" },
          { title: "नियमित रहें", description: "गिरावट में ज़्यादा यूनिट मिलती हैं। घबराकर एसआईपी न रोकें।" },
          { title: "यथार्थवादी रहें", description: "12% लंबी अवधि का सामान्य अनुमान है, गारंटी नहीं।" },
        ]}
        faqs={[
          { question: "एसआईपी क्या है?", answer: "हर महीने एक निश्चित राशि म्यूचुअल फंड में स्वतः निवेश — अनुशासित, स्वचालित धन निर्माण।" },
          { question: "क्या अनुमानित रिटर्न गारंटी है?", answer: "नहीं। बाज़ार रिटर्न बदलता रहता है; अनुमान को अंदाज़ा मानें और हर साल समीक्षा करें।" },
          { question: "एसआईपी बनाम एकमुश्त?", answer: "एसआईपी औसत से बाज़ार जोखिम घटाती है; एकमुश्त तेज़ी से पहले निवेश पर जीतता है — पर सही समय पकड़ना कठिन है।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SipCalculatorHindi;
