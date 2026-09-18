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

type EmiYearRow = { year: number; principal: number; interest: number; balance: number };
type EmiResult = {
  emi: number; totalPayment: number; totalInterest: number; schedule: EmiYearRow[];
};

function computeEmi(amountStr: string, rateStr: string, yearsStr: string): EmiResult | null {
  const p = parseFloat(amountStr);
  const annual = parseFloat(rateStr);
  const years = parseInt(yearsStr);

  if (!(p > 0 && p <= 1e11) || isNaN(annual) || annual < 0 || annual > 50 || !(years >= 1 && years <= 40)) {
    return null;
  }

  const r = annual / 100 / 12;
  const n = years * 12;
  const emi = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  if (!isFinite(emi) || emi <= 0) return null;

  let balance = p;
  const schedule: EmiYearRow[] = [];
  for (let y = 1; y <= years; y++) {
    let yP = 0, yI = 0;
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const interest = balance * r;
      const principal = Math.min(emi - interest, balance);
      yI += interest; yP += principal; balance -= principal;
    }
    schedule.push({ year: y, principal: yP, interest: yI, balance: Math.max(balance, 0) });
    if (balance <= 0) break;
  }

  const totalPayment = emi * n;
  return { emi, totalPayment, totalInterest: totalPayment - p, schedule };
}

const EmiCalculatorHindi = () => {
  const [loanAmount, setLoanAmount] = useState("2500000");
  const [interestRate, setInterestRate] = useState("8.5");
  const [loanYears, setLoanYears] = useState("20");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<EmiResult | null>(() => computeEmi("2500000", "8.5", "20"));
  const [showSchedule, setShowSchedule] = useState(false);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeEmi(loanAmount, interestRate, loanYears);
    if (!computed) {
      toast({ variant: "destructive", title: "अमान्य इनपुट", description: "राशि (1+), ब्याज दर (0-50%), वर्ष (1-40) दर्ज करें।" });
      return;
    }
    setResult(computed);
    toast({ title: "ईएमआई की गणना हो गई", description: `मासिक ईएमआई ${currencySymbol}${fmt(computed.emi)} (${loanYears} वर्ष के लिए)।` });
  };

  const reset = () => { setLoanAmount(""); setInterestRate(""); setLoanYears(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `ईएमआई: ${currencySymbol}${fmt(parseFloat(loanAmount))} पर ${interestRate}% ब्याज, ${loanYears} वर्ष → ${currencySymbol}${fmt(result.emi)}/महीना (कुल ब्याज ${currencySymbol}${fmt(result.totalInterest)})। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="ईएमआई कैलकुलेटर"
      description="होम और पर्सनल लोन की मासिक ईएमआई, कुल ब्याज और भुगतान प्रगति जानें — मुफ्त ऑनलाइन टूल"
      keywords="ईएमआई कैलकुलेटर, emi calculator hindi, होम लोन emi, पर्सनल लोन emi, मासिक emi"
      canonicalUrl="/hi/emi-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">लोन विवरण</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">लोन राशि ({currencySymbol})</Label>
              <Input type="number" min={1} value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="जैसे, 2500000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">ब्याज दर (% वार्षिक)</Label>
              <Input type="number" step={0.1} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="जैसे, 8.5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">लोन अवधि (वर्ष)</Label>
              <Input type="number" min={1} max={40} value={loanYears} onChange={(e) => setLoanYears(e.target.value)} placeholder="जैसे, 20" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">ईएमआई की गणना करें</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="रीसेट">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">आपकी ईएमआई</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">मासिक ईएमआई</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.emi)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">कुल ब्याज</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalInterest)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">कुल भुगतान</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalPayment)}</p>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "छिपाएं" : "दिखाएं"} वार्षिक भुगतान सूची
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0">
                      <tr className="bg-neutral-100 text-black">
                        <th className="text-left font-semibold px-2.5 py-2">वर्ष</th>
                        <th className="text-right font-semibold px-2.5 py-2">मूलधन</th>
                        <th className="text-right font-semibold px-2.5 py-2">ब्याज</th>
                        <th className="text-right font-semibold px-2.5 py-2">शेष</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row) => (
                        <tr key={row.year} className="border-t border-neutral-100">
                          <td className="px-2.5 py-1.5 font-medium">{row.year}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.principal)}</td>
                          <td className="px-2.5 py-1.5 text-right">{currencySymbol}{fmt(row.interest)}</td>
                          <td className="px-2.5 py-1.5 text-right font-semibold">{currencySymbol}{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏠</div><p className="text-sm">ईएमआई जानने के लिए लोन विवरण दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="ईएमआई (समान मासिक किस्त) वह निश्चित राशि है जो आप होम या पर्सनल लोन के लिए हर महीने देते हैं। यह कैलकुलेटर हर भुगतान को मूलधन और ब्याज में बांटकर मासिक ईएमआई, कुल ब्याज लागत और वार्षिक भुगतान सूची दिखाता है।"
        useCases={[
          { title: "घर खरीदना", description: "बजट में फिट मासिक ईएमआई के लिए लोन राशि और अवधि आज़माएं।" },
          { title: "पर्सनल लोन जांच", description: "हस्ताक्षर से पहले कम अवधि के उधार की असली ब्याज लागत देखें।" },
          { title: "पूर्व भुगतान योजना", description: "एकमुश्त भुगतान से ब्याज कितना घटेगा, वार्षिक शेष तालिका से आंकें।" },
          { title: "बैंकों की तुलना", description: "अलग-अलग दरों पर ईएमआई तुलना करके सबसे सस्ता विकल्प चुनें।" },
        ]}
        tips={[
          { title: "छोटी अवधि में बड़ी बचत", description: "अगर अधिक ईएमआई दे सकते हैं तो 15 वर्ष का लोन 20 वर्ष से काफी सस्ता पड़ता है।" },
          { title: "शुरुआती वर्षों पर ध्यान दें", description: "शुरुआती ईएमआई ज़्यादातर ब्याज होती है; जल्दी पूर्व भुगतान से कुल लागत घटती है।" },
          { title: "ईएमआई 40% से कम रखें", description: "सुरक्षित स्वीकृति के लिए कुल ईएमआई मासिक आय के ~40% से कम रखना बेहतर है।" },
        ]}
        faqs={[
          { question: "ईएमआई की गणना कैसे होती है?", answer: "ईएमआई = P × r × (1+r)^n ÷ ((1+r)^n − 1), जहां P मूलधन, r मासिक दर और n कुल महीने हैं। हमारा टूल यही लगाकर सूची बनाता है।" },
          { question: "क्या फ्लोटिंग दर से ईएमआई बदलती है?", answer: "हां — होम लोन दर बदलने पर ईएमआई या अवधि समायोजित होती है। नई दर डालकर दोबारा गणना करें।" },
          { question: "ईएमआई और साधारण अनुमान में क्या अंतर है?", answer: "ईएमआई घटते शेष पर निकलती है, इसलिए चुकाने के साथ ब्याज घटता है — सूची तालिका में यही बदलाव दिखता है।" },
          { question: "कुल ब्याज कैसे घटाएं?", answer: "छोटी अवधि चुनें, कम दर पर बातचीत करें या समय-समय पर मूलधन पर पूर्व भुगतान करें।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default EmiCalculatorHindi;
