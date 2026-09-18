'use client';

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type MortgageResult = {
  monthlyPayment: number; totalPayment: number; totalInterest: number;
};

function computeMortgage(
  homeStr: string,
  downStr: string,
  rateStr: string,
  termStr: string
): MortgageResult | null {
  const home = parseFloat(homeStr);
  const down = downStr.trim() === "" ? 0 : parseFloat(downStr);
  const annual = parseFloat(rateStr);
  const years = parseFloat(termStr);

  if (!(home > 0 && home <= 1e12)) return null;
  if (isNaN(down) || down < 0 || down >= home) return null;
  if (isNaN(annual) || annual < 0 || annual > 100) return null;
  if (!(years > 0 && years <= 50)) return null;

  const principal = home - down;
  const monthlyRate = annual / 100 / 12;
  const months = Math.round(years * 12);
  if (!(months > 0)) return null;

  const monthlyPayment = monthlyRate === 0 ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;

  return { monthlyPayment, totalPayment, totalInterest: totalPayment - principal };
}

const MortgageCalculatorHindiClient = () => {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<MortgageResult | null>(() => computeMortgage("300000", "60000", "6.5", "30"));
  const { toast } = useToast();

  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeMortgage(homePrice, downPayment, interestRate, loanTerm);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "अमान्य इनपुट",
        description: "घर की कीमत (1+), डाउन पेमेंट (0 से कीमत से कम), ब्याज दर (0-100%), अवधि (अधिकतम 50 वर्ष) दर्ज करें।",
      });
      return;
    }

    setResult(computed);
    toast({
      title: "गणना पूरी हो गई",
      description: `आपका मासिक होम लोन भुगतान ${currencySymbol}${fmt(computed.monthlyPayment)} है।`,
    });
  };

  const reset = () => { setHomePrice(""); setDownPayment(""); setInterestRate(""); setLoanTerm(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `होम लोन: मासिक ${currencySymbol}${fmt(result.monthlyPayment)}, कुल ${currencySymbol}${fmt(result.totalPayment)}, ब्याज ${currencySymbol}${fmt(result.totalInterest)}। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="होम लोन कैलकुलेटर"
      description="अपनी मासिक होम लोन किस्त, कुल भुगतान और ब्याज की गणना करें — मुफ्त ऑनलाइन टूल"
      keywords="होम लोन कैलकुलेटर, mortgage calculator hindi, home loan emi hindi, हाउस लोन किस्त, emi calculator hindi"
      canonicalUrl="/hi/mortgage-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">लोन विवरण</h2>
          <div className="space-y-4">
            <div>
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
            <div>
              <Label className="text-sm font-medium">घर की कीमत ({currencySymbol})</Label>
              <Input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="300000" className="mt-1.5 h-10 text-sm bg-white border border-neutral-200" />
            </div>
            <div>
              <Label className="text-sm font-medium">डाउन पेमेंट ({currencySymbol})</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="60000" className="mt-1.5 h-10 text-sm bg-white border border-neutral-200" />
            </div>
            <div>
              <Label className="text-sm font-medium">ब्याज दर (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" className="mt-1.5 h-10 text-sm bg-white border border-neutral-200" />
            </div>
            <div>
              <Label className="text-sm font-medium">लोन अवधि (वर्ष)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="30" className="mt-1.5 h-10 text-sm bg-white border border-neutral-200" />
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
            <h2 className="text-lg font-bold text-black">परिणाम</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">मासिक भुगतान</div>
                <div className="text-3xl font-bold gradient-text">{currencySymbol}{fmt(result.monthlyPayment)}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                  <div className="text-sm text-neutral-600">कुल भुगतान</div>
                  <div className="text-2xl font-bold text-primary">{currencySymbol}{fmt(result.totalPayment)}</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-secondary/20">
                  <div className="text-sm text-neutral-600">कुल ब्याज</div>
                  <div className="text-2xl font-bold">{currencySymbol}{fmt(result.totalInterest)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏠</div><p className="text-sm">गणना के लिए विवरण दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="होम लोन कैलकुलेटर आपकी मासिक किस्त (मूलधन + ब्याज), कुल भुगतान और कुल ब्याज लागत का अनुमान देता है। घर खरीदने से पहले यह जानना ज़रूरी है कि लोन आपके बजट में फिट बैठता है या नहीं।"
        useCases={[
          { title: "घर खरीदना", description: "मासिक किस्त का अनुमान लगाकर तय करें कि कितने कीमत का घर आप खरीद सकते हैं।" },
          { title: "रीफाइनेंसिंग", description: "मौजूदा लोन की तुलना नए ऑफर से करके देखें कि क्या ब्याज बच सकता है।" },
          { title: "लोन तुलना", description: "15 वर्ष बनाम 30 वर्ष की अवधि या अलग डाउन पेमेंट से किस्त और ब्याज पर असर देखें।" },
        ]}
        tips={[
          { title: "20% नियम", description: "कम से कम 20% डाउन पेमेंट से बीमा (PMI) जैसा अतिरिक्त मासिक खर्च बच सकता है।" },
          { title: "PITI याद रखें", description: "असली मासिक खर्च में टैक्स और बीमा भी जुड़ता है — यह टूल मूलधन और ब्याज दिखाता है।" },
          { title: "दरों की तुलना करें", description: "कई बैंकों से कोटेशन लें — छोटी दर का अंतर भी लंबी अवधि में बड़ी बचत देता है।" },
        ]}
        faqs={[
          { question: "होम लोन क्या है?", answer: "होम लोन घर खरीदने के लिए लिया गया कर्ज़ है, जिसमें वही संपत्ति गारंटी के रूप में रहती है।" },
          { question: "15 वर्ष और 30 वर्ष के लोन में क्या अंतर है?", answer: "15 वर्ष में किस्त ज़्यादा पर ब्याज दर कम और कुल ब्याज कम होता है; 30 वर्ष में किस्त कम पर कुल ब्याज ज़्यादा होता है।" },
          { question: "एमॉर्टाइज़ेशन शेड्यूल क्या है?", answer: "यह तालिका बताती है कि हर किस्त का कितना हिस्सा ब्याज और कितना मूलधन चुकाने में जाता है।" },
          { question: "क्या लोन जल्दी चुका सकते हैं?", answer: "हां, मूलधन पर अतिरिक्त भुगतान से लोन जल्दी खत्म होता है और ब्याज बचता है। पहले पूर्व भुगतान शुल्क जांच लें।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default MortgageCalculatorHindiClient;
