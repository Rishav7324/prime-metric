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

type PpfResult = {
  maturity: number; deposited: number; interest: number;
  interestShare: number;
};

function computePpf(yearlyStr: string, annualStr: string, yearsStr: string): PpfResult | null {
  const yearly = parseFloat(yearlyStr);
  const annual = parseFloat(annualStr);
  const years = parseInt(yearsStr);

  if (!(yearly >= 500 && yearly <= 150000) || isNaN(annual) || annual < 0 || annual > 15 || !(years >= 15 && years <= 50)) {
    return null;
  }

  // Yearly compounding, deposits at the start of each year
  const r = annual / 100;
  const maturity = r === 0 ? yearly * years : yearly * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
  const deposited = yearly * years;
  const interest = maturity - deposited;

  return {
    maturity, deposited, interest,
    interestShare: maturity > 0 ? (interest / maturity) * 100 : 0,
  };
}

const PpfCalculatorHindi = () => {
  const [yearlyDeposit, setYearlyDeposit] = useState("150000");
  const [rate, setRate] = useState("7.1");
  const [years, setYears] = useState("15");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<PpfResult | null>(() => computePpf("150000", "7.1", "15"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    const yearly = parseFloat(yearlyDeposit);
    if (!isNaN(yearly) && yearly > 150000) {
      toast({ variant: "destructive", title: "पीपीएफ सीमा से अधिक", description: `एक वित्तीय वर्ष में अधिकतम ${currencySymbol}150,000 जमा कर सकते हैं।` });
      return;
    }
    const computed = computePpf(yearlyDeposit, rate, years);
    if (!computed) {
      toast({ variant: "destructive", title: "अमान्य इनपुट", description: `वार्षिक जमा (${currencySymbol}500-${currencySymbol}150,000), ब्याज दर (0-15%), वर्ष (15-50) दर्ज करें।` });
      return;
    }
    setResult(computed);
    toast({ title: "पीपीएफ अनुमान तैयार", description: `${years} वर्ष में मैच्योरिटी राशि ${currencySymbol}${fmt(computed.maturity)}।` });
  };

  const reset = () => { setYearlyDeposit(""); setRate(""); setYears(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `पीपीएफ: ${currencySymbol}${fmt(parseFloat(yearlyDeposit))}/वर्ष, ${rate}% पर ${years} वर्ष → मैच्योरिटी ${currencySymbol}${fmt(result.maturity)} (जमा ${currencySymbol}${fmt(result.deposited)}, कर-मुक्त ब्याज ${currencySymbol}${fmt(result.interest)})। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="पीपीएफ कैलकुलेटर"
      description="पीपीएफ मैच्योरिटी, कुल जमा और कर-मुक्त ब्याज का अनुमान लगाएं — मुफ्त ऑनलाइन टूल"
      keywords="पीपीएफ कैलकुलेटर, ppf calculator hindi, ppf maturity hindi, पीपीएफ ब्याज, ppf interest hindi"
      canonicalUrl="/hi/ppf-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">पीपीएफ विवरण</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">वार्षिक जमा राशि ({currencySymbol})</Label>
              <Input type="number" min={500} max={150000} value={yearlyDeposit} onChange={(e) => setYearlyDeposit(e.target.value)} placeholder="जैसे, 150000" className="mt-1.5 h-10 text-sm bg-white" />
              <p className="text-[11px] text-neutral-500 mt-1">न्यूनतम {currencySymbol}500 – अधिकतम {currencySymbol}150,000 प्रति वित्तीय वर्ष।</p>
            </div>
            <div>
              <Label className="text-sm font-medium">वार्षिक ब्याज दर (%)</Label>
              <Input type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="जैसे, 7.1" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">अवधि (वर्ष)</Label>
              <Input type="number" min={15} max={50} value={years} onChange={(e) => setYears(e.target.value)} placeholder="जैसे, 15" className="mt-1.5 h-10 text-sm bg-white" />
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
                <p className="text-xs text-neutral-500">मैच्योरिटी राशि (कर-मुक्त)</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.maturity)}</p>
              </div>
              <div>
                <div className="flex h-2.5 rounded-full overflow-hidden">
                  <div className="bg-black" style={{ width: `${100 - result.interestShare}%` }} />
                  <div className="bg-[#F2765E]" style={{ width: `${result.interestShare}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-neutral-500 mt-1">
                  <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />जमा {(100 - result.interestShare).toFixed(1)}%</span>
                  <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />ब्याज {result.interestShare.toFixed(1)}%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">कुल जमा</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.deposited)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">कर-मुक्त ब्याज</p>
                  <p className="text-base font-bold text-green-600">{currencySymbol}{fmt(result.interest)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏛️</div><p className="text-sm">मैच्योरिटी जानने के लिए विवरण दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="पीपीएफ सरकार समर्थित बचत योजना है जिसमें 15 वर्ष का लॉक-इन और वार्षिक चक्रवृद्धि ब्याज मिलता है। सालाना 1,50,000 तक जमा पर पूरा ब्याज कर-मुक्त होता है, इसलिए यह सुरक्षित लंबी अवधि निवेश का मज़बूत आधार है।"
        useCases={[
          { title: "रिटायरमेंट फंड", description: "15-30 वर्षों तक अधिकतम जमा से गारंटीड कर-मुक्त रिटायरमेंट राशि का अनुमान लगाएं।" },
          { title: "बच्चों का भविष्य", description: "नाबालिग के नाम पीपीएफ खोलकर 15+ वर्षों की चक्रवृद्धि से पढ़ाई का खर्च तैयार करें।" },
          { title: "टैक्स बचत (80C)", description: "वार्षिक सीमा तक जमा की योजना बनाएं जो धारा 80C में कटौती भी देता है।" },
          { title: "विस्तार योजना", description: "मैच्योरिटी के बाद 5-5 वर्ष के ब्लॉक में विस्तार करके कर-मुक्त बढ़त जारी रखें।" },
        ]}
        tips={[
          { title: "5 अप्रैल से पहले जमा करें", description: "ब्याज महीने की 5 तारीख से अंत तक न्यूनतम शेष पर गिना जाता है — अप्रैल की शुरुआत में जमा करें।" },
          { title: "हर वर्ष सीमा पूरी करें", description: "हर वर्ष पूरी 1,50,000 की सीमा भरें; बची हुई सीमा आगे नहीं जुड़ती।" },
          { title: "ब्लॉक में बढ़ाएं", description: "15 वर्षों के बाद 5-5 वर्ष के ब्लॉक में नई जमा के साथ या बिना विस्तार जारी रखें।" },
        ]}
        faqs={[
          { question: "पीपीएफ जमा सीमा क्या है?", answer: "प्रति वित्तीय वर्ष न्यूनतम 500 और अधिकतम 1,50,000; अतिरिक्त जमा पर ब्याज नहीं मिलता।" },
          { question: "क्या पीपीएफ ब्याज कर योग्य है?", answer: "नहीं। पीपीएफ EEE श्रेणी में है — जमा, ब्याज और मैच्योरिटी तीनों कर-मुक्त हैं।" },
          { question: "क्या पीपीएफ से जल्दी निकासी हो सकती है?", answer: "7वें वर्ष से आंशिक निकासी और विशेष कारणों पर 5 वर्ष बाद पूर्ण समापन संभव है।" },
          { question: "15 वर्षों के बाद क्या होता है?", answer: "पूरी राशि निकाल सकते हैं या 5-5 वर्ष के ब्लॉक में नई जमा के साथ या बिना विस्तार कर सकते हैं।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PpfCalculatorHindi;
