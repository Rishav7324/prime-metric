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

type YearRow = { year: number; principal: number; interest: number; balance: number };
type LoanResult = {
  emi: number; totalPayment: number; totalInterest: number;
  principalShare: number; schedule: YearRow[];
};

function computeLoan(amountStr: string, rateStr: string, termStr: string): LoanResult | null {
  const principal = parseFloat(amountStr);
  const annualRate = parseFloat(rateStr);
  const years = parseFloat(termStr);

  if (!(principal > 0 && principal <= 1e12) || isNaN(annualRate) || annualRate < 0 || annualRate > 100 || !(years > 0 && years <= 50)) {
    return null;
  }

  const monthlyRate = annualRate / 100 / 12;
  const months = Math.round(years * 12);
  const emi = monthlyRate === 0 ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  // Yearly amortization schedule
  let balance = principal;
  const schedule: YearRow[] = [];
  for (let y = 1; y <= Math.ceil(months / 12); y++) {
    let yPrin = 0, yInt = 0;
    for (let m = 0; m < 12 && (y - 1) * 12 + m < months; m++) {
      const interest = balance * monthlyRate;
      const prin = Math.min(emi - interest, balance);
      balance = Math.max(0, balance - prin);
      yPrin += prin; yInt += interest;
    }
    schedule.push({ year: y, principal: yPrin, interest: yInt, balance });
    if (balance <= 0) break;
  }

  const totalPayment = emi * months;
  return {
    emi, totalPayment, totalInterest: totalPayment - principal,
    principalShare: (principal / totalPayment) * 100, schedule,
  };
}

const LoanCalculatorHindiClient = () => {
  const [amount, setAmount] = useState("100000");
  const [rate, setRate] = useState("7.5");
  const [term, setTerm] = useState("10");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<LoanResult | null>(() => computeLoan("100000", "7.5", "10"));
  const [showSchedule, setShowSchedule] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeLoan(amount, rate, term);
    if (!computed) {
      toast({ variant: "destructive", title: "अमान्य इनपुट", description: "राशि (1+), ब्याज दर (0-100%), अवधि (50 वर्ष तक) दर्ज करें।" });
      return;
    }
    setResult(computed);
    toast({ title: "ईएमआई की गणना हो गई", description: `मासिक ईएमआई ${currencySymbol}${fmt(computed.emi)} है।` });
  };

  const reset = () => { setAmount(""); setRate(""); setTerm(""); setResult(null); setShowSchedule(false); };

  const copyResult = async () => {
    if (!result) return;
    const text = `लोन ईएमआई: ${currencySymbol}${fmt(result.emi)}/महीना। कुल भुगतान: ${currencySymbol}${fmt(result.totalPayment)}, कुल ब्याज: ${currencySymbol}${fmt(result.totalInterest)}। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="लोन ईएमआई कैलकुलेटर"
      description="किसी भी लोन की मासिक ईएमआई, कुल ब्याज और वर्ष-दर-वर्ष भुगतान सूची जानें — मुफ्त ऑनलाइन टूल"
      keywords="लोन ईएमआई कैलकुलेटर, loan emi hindi, होम लोन emi, लोन ब्याज कैलकुलेटर"
      canonicalUrl="/hi/loan-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">लोन विवरण</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">लोन राशि ({currencySymbol})</Label>
              <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="जैसे, 100000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">वार्षिक ब्याज दर (%)</Label>
              <Input type="number" step="0.1" min={0} max={100} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="जैसे, 7.5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">लोन अवधि (वर्ष)</Label>
              <Input type="number" min={0.5} max={50} step={0.5} value={term} onChange={(e) => setTerm(e.target.value)} placeholder="जैसे, 10" className="mt-1.5 h-10 text-sm bg-white" />
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
            <h2 className="text-lg font-bold text-black">परिणाम</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl">
                <div className="text-xs text-neutral-500 mb-1">मासिक ईएमआई</div>
                <div className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.emi)}</div>
              </div>
              {/* Principal vs interest bar */}
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${result.principalShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${100 - result.principalShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />मूलधन {result.principalShare.toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />ब्याज {(100 - result.principalShare).toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">कुल भुगतान</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalPayment)}</div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">कुल ब्याज</div>
                  <div className="text-base font-bold text-[#c25136]">{currencySymbol}{fmt(result.totalInterest)}</div>
                </div>
              </div>
              <Button onClick={() => setShowSchedule(!showSchedule)} variant="outline" size="sm" className="w-full h-9 text-[13px]">
                {showSchedule ? "छिपाएं" : "दिखाएं"} वर्ष-दर-वर्ष सूची
              </Button>
              {showSchedule && (
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
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
                          <td className="px-2.5 py-1.5 text-right text-neutral-500">{currencySymbol}{fmt(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">💰</div><p className="text-sm">ईएमआई + सूची देखने के लिए विवरण दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="लोन ईएमआई (समान मासिक किस्त) कैलकुलेटर लोन राशि, ब्याज दर और अवधि से आपकी निश्चित मासिक किस्त निकालता है — साथ में कुल ब्याज और वर्ष-दर-वर्ष सूची, ताकि हर भुगतान में मूलधन और ब्याज का हिस्सा साफ दिखे।"
        useCases={[
          { title: "पर्सनल लोन योजना", description: "उधार लेने से पहले मासिक किस्त और कुल लागत का अनुमान लगाएं।" },
          { title: "होम लोन विश्लेषण", description: "अवधि की तुलना करें — छोटी अवधि में ईएमआई बढ़ती है पर कुल ब्याज घटता है।" },
          { title: "कार लोन निर्णय", description: "देखें कि ब्याज दर का अंतर ईएमआई और कुल ब्याज कैसे बदलता है।" },
          { title: "पूर्व भुगतान योजना", description: "अधिक ब्याज वाले शुरुआती वर्षों में एकमुश्त भुगतान की योजना के लिए वार्षिक सूची देखें।" },
        ]}
        tips={[
          { title: "शुरुआती वर्ष = ज़्यादा ब्याज", description: "शुरुआत में ब्याज अधिक होता है, इसलिए जल्दी पूर्व भुगतान से सबसे ज़्यादा बचत होती है।" },
          { title: "0% हमेशा मुफ्त नहीं", description: "प्रोसेसिंग फीस और बीमा जांचें — वे असली लागत बढ़ाते हैं।" },
          { title: "ईएमआई बढ़ाकर दें", description: "थोड़ा अतिरिक्त मूलधन भी लोन अवधि काफी घटा देता है।" },
        ]}
        faqs={[
          { question: "ईएमआई क्या है?", answer: "ईएमआई (समान मासिक किस्त) वह निश्चित राशि है जो लोन पूरा चुकाने तक हर महीने मूलधन + ब्याज के लिए देते हैं।" },
          { question: "ईएमआई की गणना कैसे होती है?", answer: "ईएमआई = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1), जहां P मूलधन, r मासिक दर, n महीनों की संख्या है।" },
          { question: "क्या लंबी अवधि हमेशा फायदेमंद है?", answer: "इससे ईएमआई घटती है पर कुल ब्याज काफी बढ़ जाता है। मासिक सुविधा और कुल लागत में संतुलन रखें।" },
          { question: "एमॉर्टाइज़ेशन क्या है?", answer: "धीरे-धीरे चुकाने की प्रक्रिया जिसमें शुरुआती भुगतान ज़्यादा ब्याज और बाद के भुगतान ज़्यादा मूलधन कवर करते हैं — ऊपर तालिका में दिखता है।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default LoanCalculatorHindiClient;
