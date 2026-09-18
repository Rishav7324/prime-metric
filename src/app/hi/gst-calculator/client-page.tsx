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

type GstMode = "add" | "remove";
type GstResult = {
  base: number; gst: number; total: number;
  cgst: number; sgst: number; mode: GstMode;
};

function computeGst(amountStr: string, rateStr: string, mode: GstMode): GstResult | null {
  const amount = parseFloat(amountStr);
  const rate = parseFloat(rateStr);

  if (!(amount > 0 && amount <= 1e9) || isNaN(rate) || rate < 0 || rate > 100) {
    return null;
  }

  const r = rate / 100;
  const base = mode === "add" ? amount : amount / (1 + r);
  const total = mode === "add" ? amount * (1 + r) : amount;
  const gst = total - base;

  return { base, gst, total, cgst: gst / 2, sgst: gst / 2, mode };
}

const QUICK_RATES = [0, 5, 12, 18, 28];

const GstCalculatorHindi = () => {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<GstMode>("remove");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<GstResult | null>(() => computeGst("1000", "18", "remove"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeGst(amount, rate, mode);
    if (!computed) {
      toast({ variant: "destructive", title: "अमान्य इनपुट", description: "राशि (1+), जीएसटी दर (0-100%) दर्ज करें।" });
      return;
    }
    setResult(computed);
    toast({ title: "जीएसटी की गणना हो गई", description: `कुल ${currencySymbol}${fmt(computed.total)} (जीएसटी ${currencySymbol}${fmt(computed.gst)})।` });
  };

  const reset = () => { setAmount(""); setRate(""); setMode("remove"); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `जीएसटी (${result.mode === "add" ? "जोड़ें" : "हटाएं"} ${rate}%): आधार ${currencySymbol}${fmt(result.base)} + टैक्स ${currencySymbol}${fmt(result.gst)} (CGST ${currencySymbol}${fmt(result.cgst)} + SGST ${currencySymbol}${fmt(result.sgst)}) = कुल ${currencySymbol}${fmt(result.total)}। — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  return (
    <CalculatorLayout
      title="जीएसटी कैलकुलेटर"
      description="किसी भी कीमत पर तुरंत जीएसटी जोड़ें या हटाएं — CGST और SGST विभाजन के साथ — मुफ्त ऑनलाइन टूल"
      keywords="जीएसटी कैलकुलेटर, gst calculator hindi, cgst sgst hindi, जीएसटी जोड़ें हटाएं, gst rate hindi"
      canonicalUrl="/hi/gst-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">जीएसटी विवरण</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">राशि ({currencySymbol})</Label>
              <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="जैसे, 1000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">जीएसटी दर (%)</Label>
              <Input type="number" min={0} max={100} step={0.5} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="जैसे, 18" className="mt-1.5 h-10 text-sm bg-white" />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {QUICK_RATES.map((r) => (
                  <Button key={r} onClick={() => setRate(String(r))} variant="outline" size="sm" className="h-7 text-xs px-2.5">
                    {r}%
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">गणना का प्रकार</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {(["add", "remove"] as GstMode[]).map((m) => (
                  <Button key={m} onClick={() => setMode(m)} variant={mode === m ? "default" : "outline"} className={mode === m ? "h-10 text-sm gradient-button" : "h-10 text-sm"}>
                    {m === "add" ? "जीएसटी जोड़ें" : "जीएसटी हटाएं"}
                  </Button>
                ))}
              </div>
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
            <h2 className="text-lg font-bold text-black">विवरण — परिणाम</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">{result.mode === "add" ? "जीएसटी सहित कुल" : "जीएसटी रहित आधार मूल्य"}</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.mode === "add" ? result.total : result.base)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">आधार मूल्य</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.base)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">जीएसटी राशि</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.gst)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">CGST (50%)</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.cgst)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">SGST (50%)</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.sgst)}</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">एक ही राज्य में बिक्री पर CGST + SGST लगता है; दूसरे राज्य की बिक्री पर यही कुल राशि IGST के रूप में लगती है।</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🧾</div><p className="text-sm">जीएसटी विवरण के लिए राशि दर्ज करें</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="जीएसटी भारत में अधिकांश वस्तुओं और सेवाओं के आधार मूल्य पर लगने वाला कर है। यह कैलकुलेटर किसी भी दर पर जीएसटी सहित और रहित कीमतों के बीच बदलता है और एक ही राज्य की बिक्री के लिए टैक्स को CGST और SGST में बराबर बांटता है।"
        useCases={[
          { title: "ऑनलाइन मूल्य निर्धारण", description: "जीएसटी सहित MRP तय करें ताकि दिखी कीमत ही ग्राहक भुगतान करे।" },
          { title: "बिल जांच", description: "सप्लायर के बिल में CGST और SGST का बंटवारा सही है या नहीं, जांचें।" },
          { title: "उल्टी गणना", description: "MRP से टैक्स हटाकर असली आधार मूल्य और मार्जिन निकालें।" },
          { title: "व्यापार कोटेशन", description: "ग्राहकों को आधार मूल्य, टैक्स और कुल राशि अलग-अलग साफ दिखाकर कोट करें।" },
        ]}
        tips={[
          { title: "स्लैब जानें", description: "आम जीएसटी स्लैब 0%, 5%, 12%, 18% और 28% हैं — इनके लिए ऊपर दिए बटन उपयोग करें।" },
          { title: "CGST+SGST बनाम IGST", description: "एक ही राज्य में CGST + SGST बंटता है; दूसरे राज्य में यही कुल IGST बनता है।" },
          { title: "राउंडिंग का ध्यान", description: "बिल कुल पर नहीं, हर आइटम पर टैक्स राउंड करें ताकि सॉफ्टवेयर से मेल खाए।" },
        ]}
        faqs={[
          { question: "कीमत में जीएसटी कैसे जोड़ें?", answer: "आधार मूल्य को (1 + दर/100) से गुणा करें। जैसे 18% पर 1,000 → 1,000 × 1.18 = 1,180।" },
          { question: "कीमत से जीएसटी कैसे हटाएं?", answer: "सहित मूल्य को (1 + दर/100) से भाग दें। जैसे 18% पर 1,180 ÷ 1.18 = 1,000 आधार।" },
          { question: "CGST और SGST क्या हैं?", answer: "एक ही राज्य में बिक्री पर जीएसटी केंद्र (CGST) और राज्य (SGST) में बराबर बंटता है।" },
          { question: "जीएसटी का फॉर्मूला क्या है?", answer: "जीएसटी राशि = आधार मूल्य × दर/100; सहित कुल = आधार + जीएसटी; आधार = सहित कुल ÷ (1 + दर/100)।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default GstCalculatorHindi;
