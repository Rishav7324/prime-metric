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

type FdResult = {
  maturity: number; principal: number; interest: number;
  interestShare: number;
};

function computeFd(principalStr: string, annualStr: string, yearsStr: string): FdResult | null {
  const principal = parseFloat(principalStr);
  const annual = parseFloat(annualStr);
  const years = parseFloat(yearsStr);

  if (!(principal > 0 && principal <= 1e9) || isNaN(annual) || annual < 0 || annual > 15 || !(years >= 1 && years <= 30)) {
    return null;
  }

  // Quarterly compounding (standard for bank FDs)
  const quarters = Math.round(years * 4);
  const maturity = annual === 0 ? principal : principal * Math.pow(1 + annual / 400, quarters);
  const interest = maturity - principal;

  return {
    maturity, principal, interest,
    interestShare: maturity > 0 ? (interest / maturity) * 100 : 0,
  };
}

const FdCalculatorHindi = () => {
  const [principal, setPrincipal] = useState("100000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("5");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<FdResult | null>(() => computeFd("100000", "7", "5"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const computed = computeFd(principal, rate, years);
    if (!computed) {
      toast({ variant: "destructive", title: "अमान्य इनपुट", description: "मूल राशि (1+), ब्याज दर (0-15%), वर्ष (1-30) दर्ज करें।" });
      return;
    }
    setResult(computed);
    toast({ title: "एफडी अनुमान तैयार", description: `${years} वर्ष में मैच्योरिटी राशि ${currencySymbol}${fmt(computed.maturity)}।` });
  };

  const reset = () => { setPrincipal(""); setRate(""); setYears(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `एफडी: ${currencySymbol}${fmt(parseFloat(principal))}, ${rate}% पर ${years} वर्ष (त्रैमासिक चक्रवृद्धि) → मैच्योरिटी ${currencySymbol}${fmt(result.maturity)} (ब्याज ${currencySymbol}${fmt(result.interest)})। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="एफडी कैलकुलेटर"
      description="त्रैमासिक चक्रवृद्धि के साथ फिक्स्ड डिपॉजिट मैच्योरिटी और ब्याज का अनुमान लगाएं — मुफ्त ऑनलाइन टूल"
      keywords="एफडी कैलकुलेटर, fd calculator hindi, फिक्स्ड डिपॉजिट कैलकुलेटर, fd maturity hindi, fd interest hindi"
      canonicalUrl="/hi/fd-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">जमा विवरण</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">मूल राशि ({currencySymbol})</Label>
              <Input type="number" min={1} value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="जैसे, 100000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">वार्षिक ब्याज दर (%)</Label>
              <Input type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="जैसे, 7" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">अवधि (वर्ष)</Label>
              <Input type="number" min={1} max={30} value={years} onChange={(e) => setYears(e.target.value)} placeholder="जैसे, 5" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">गणना करें</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="रीसेट">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">मैच्योरिटी — परिणाम</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">मैच्योरिटी राशि</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.maturity)}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${100 - result.interestShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${result.interestShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />मूलधन {(100 - result.interestShare).toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />ब्याज {result.interestShare.toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">मूलधन</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.principal)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">अर्जित ब्याज</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏦</div><p className="text-sm">मैच्योरिटी जानने के लिए विवरण दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="फिक्स्ड डिपॉजिट में एकमुश्त राशि बैंक में निश्चित अवधि के लिए गारंटीड दर पर रखी जाती है, जिस पर त्रैमासिक चक्रवृद्धि मिलती है। यह कैलकुलेटर मैच्योरिटी राशि और ब्याज का अनुमान देता है ताकि जमा से पहले अवधि और दरों की तुलना कर सकें।"
        useCases={[
          { title: "अवधि की तुलना", description: "पैसा लॉक करने से पहले 1, 3 और 5 वर्ष की जमा में अंतर देखें।" },
          { title: "दरों की तुलना", description: "बैंकों के ऑफर साथ-साथ जांचें — छोटा दर अंतर भी चक्रवृद्धि से बड़ी राशि बनता है।" },
          { title: "आपात फंड", description: "खाली पड़े पैसे को छोटी अवधि की एफडी में रखकर अनुमानित रिटर्न जानें।" },
          { title: "वरिष्ठ नागरिक लाभ", description: "वरिष्ठों को मिलने वाली अतिरिक्त 0.25–0.50% दर डालकर सही अनुमान पाएं।" },
        ]}
        tips={[
          { title: "अवधि बांटें", description: "जमा को अलग-अलग अवधि में बांटें ताकि हर वर्ष कुछ पैसा बिना तोड़े मुक्त हो।" },
          { title: "जुर्माने का ध्यान रखें", description: "एफडी समय से पहले तोड़ने पर ~1% जुर्माना लगता है — आपात पैसा बचत खाते में रखें।" },
          { title: "टैक्स असर देखें", description: "एफडी ब्याज कर योग्य है; असली तुलना टैक्स के बाद के रिटर्न से करें।" },
        ]}
        faqs={[
          { question: "एफडी ब्याज कैसे जुड़ता है?", answer: "अधिकांश बैंक त्रैमासिक चक्रवृद्धि देते हैं: मैच्योरिटी = मूलधन × (1 + दर/400)^(4 × वर्ष)।" },
          { question: "क्या एफडी ब्याज कर योग्य है?", answer: "हां, एफडी ब्याज पूरी तरह आय में कर योग्य है और सीमा से ऊपर TDS कटता है।" },
          { question: "क्या एफडी समय से पहले निकाल सकते हैं?", answer: "हां, लेकिन लागू दर पर आमतौर पर ~1% जुर्माना लगता है।" },
          { question: "एफडी बनाम बचत खाता?", answer: "एफडी में पैसा लॉक करके ज़्यादा दर मिलती है; बचत खाता तरल रहता है पर दर कम होती है।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default FdCalculatorHindi;
