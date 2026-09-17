'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type BmiResult = {
  bmi: number;
  category: string;
  color: string;
  bg: string;
  border: string;
  healthyMin: number;
  healthyMax: number;
  bmr: number | null;
  gaugePct: number;
};

function computeBmi(weightStr: string, heightStr: string, ageStr: string, genderStr: string): BmiResult | null {
  const w = parseFloat(weightStr);
  const hCm = parseFloat(heightStr);
  const h = hCm / 100;

  if (!(w > 0 && w < 500) || !(hCm > 50 && hCm < 300)) return null;

  const bmi = w / (h * h);
  let category = "", color = "", bg = "", border = "";

  if (bmi < 18.5) {
    category = "कम वजन"; color = "text-blue-600"; bg = "bg-blue-50"; border = "border-blue-200";
  } else if (bmi < 25) {
    category = "सामान्य वजन"; color = "text-green-600"; bg = "bg-green-50"; border = "border-green-200";
  } else if (bmi < 30) {
    category = "अधिक वजन"; color = "text-yellow-600"; bg = "bg-yellow-50"; border = "border-yellow-200";
  } else {
    category = "मोटापा"; color = "text-red-600"; bg = "bg-red-50"; border = "border-red-200";
  }

  const healthyMin = 18.5 * h * h;
  const healthyMax = 24.9 * h * h;

  const ageNum = parseInt(ageStr);
  let bmr: number | null = null;
  if (ageNum >= 10 && ageNum <= 120) {
    bmr = genderStr === "male"
      ? 10 * w + 6.25 * hCm - 5 * ageNum + 5
      : 10 * w + 6.25 * hCm - 5 * ageNum - 161;
  }

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category, color, bg, border,
    healthyMin: parseFloat(healthyMin.toFixed(1)),
    healthyMax: parseFloat(healthyMax.toFixed(1)),
    bmr: bmr ? Math.round(bmr) : null,
    gaugePct: Math.min(100, Math.max(0, ((bmi - 12) / (40 - 12)) * 100)),
  };
}

const BMICalculatorHindiClient = () => {
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [age, setAge] = useState("30");
  const [gender, setGender] = useState("male");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BmiResult | null>(() => computeBmi("70", "175", "30", "male"));
  const { toast } = useToast();

  const calculateBMI = () => {
    const computed = computeBmi(weight, height, age, gender);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "अमान्य इनपुट",
        description: "वजन (1-500 kg) और ऊंचाई (50-300 cm) दर्ज करें।",
      });
      return;
    }
    setResult(computed);
    toast({ title: "बीएमआई की गणना हो गई", description: `आपका बीएमआई ${computed.bmi} (${computed.category}) है।` });
  };

  const reset = () => {
    setWeight(""); setHeight(""); setAge(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `मेरा बीएमआई: ${result.bmi} (${result.category})। स्वस्थ वजन सीमा: ${result.healthyMin}-${result.healthyMax} kg।${result.bmr ? ` बीएमआर: ${result.bmr} kcal/day।` : ""} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "कॉपी हो गया", description: "परिणाम क्लिपबोर्ड पर कॉपी हो गया।" });
    } catch {
      toast({ variant: "destructive", title: "कॉपी विफल", description: "क्लिपबोर्ड उपलब्ध नहीं है।" });
    }
  };

  const ranges = [
    { label: "कम वजन", range: "< 18.5", cls: "bg-blue-50 border-blue-200 text-blue-600" },
    { label: "सामान्य", range: "18.5 - 24.9", cls: "bg-green-50 border-green-200 text-green-600" },
    { label: "अधिक वजन", range: "25 - 29.9", cls: "bg-yellow-50 border-yellow-200 text-yellow-600" },
    { label: "मोटापा", range: "≥ 30", cls: "bg-red-50 border-red-200 text-red-600" },
  ];

  return (
    <CalculatorLayout
      title="बीएमआई कैलकुलेटर"
      description="अपना बॉडी मास इंडेक्स, स्वस्थ वजन सीमा और दैनिक कैलोरी खर्च (बीएमआर) जानें — मुफ्त ऑनलाइन टूल"
      keywords="बीएमआई कैलकुलेटर, bmi in hindi, स्वस्थ वजन सीमा, bmr कैलकुलेटर, आदर्श वजन"
      canonicalUrl="/hi/bmi-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">अपना विवरण दर्ज करें</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight" className="text-sm font-medium">वजन (kg)</Label>
              <Input id="weight" type="number" min={1} max={500} placeholder="जैसे, 70" value={weight}
                onChange={(e) => setWeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-medium">ऊंचाई (cm)</Label>
              <Input id="height" type="number" min={50} max={300} placeholder="जैसे, 175" value={height}
                onChange={(e) => setHeight(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age" className="text-sm font-medium">आयु <span className="text-neutral-400 font-normal">(बीएमआर के लिए)</span></Label>
                <Input id="age" type="number" min={10} max={120} placeholder="जैसे, 30" value={age}
                  onChange={(e) => setAge(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">लिंग</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="mt-1.5 h-10 text-sm bg-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">पुरुष</SelectItem>
                    <SelectItem value="female">महिला</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculateBMI} className="flex-1 h-10 text-sm gradient-button" disabled={!weight || !height}>
                बीएमआई की गणना करें
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="रीसेट">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Result */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">आपका परिणाम</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> कॉपी
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className={`text-center py-4 rounded-xl border ${result.bg} ${result.border}`}>
                <div className={`text-4xl font-bold ${result.color}`}>{result.bmi}</div>
                <div className={`text-base font-semibold mt-1 ${result.color}`}>{result.category}</div>
              </div>

              {/* Gauge */}
              <div>
                <div className="relative h-2.5 rounded-full overflow-hidden flex">
                  <div className="bg-blue-400" style={{ width: "23%" }} />
                  <div className="bg-green-500" style={{ width: "23%" }} />
                  <div className="bg-yellow-400" style={{ width: "18%" }} />
                  <div className="bg-red-500" style={{ width: "36%" }} />
                  <div className="absolute top-[-3px] w-1 h-4 bg-black rounded" style={{ left: `calc(${result.gaugePct}% - 2px)` }} />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
                  <span>12</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">स्वस्थ वजन</p>
                  <p className="text-sm font-bold text-black">{result.healthyMin} - {result.healthyMax} kg</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">दैनिक खर्च (बीएमआर)</p>
                  <p className="text-sm font-bold text-black">{result.bmr ? `${result.bmr.toLocaleString()} kcal` : "आयु जोड़ें"}</p>
                </div>
              </div>

              <div className="space-y-2">
                {ranges.map((r) => (
                  <div key={r.label} className={`flex justify-between items-center px-3 py-1.5 rounded-lg border text-[13px] ${r.cls}`}>
                    <span className="font-medium text-black">{r.label}</span>
                    <span className="font-semibold">{r.range}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center">
                <div className="text-4xl mb-2">🏃</div>
                <p className="text-sm">बीएमआई + स्वस्थ सीमा देखने के लिए अपना विवरण दर्ज करें</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="बॉडी मास इंडेक्स (बीएमआई) आपकी ऊंचाई के अनुसार स्वस्थ वजन का अनुमान लगाने वाला एक प्रचलित तरीका है। यह कैलकुलेटर आपकी स्वस्थ वजन सीमा और बेसल मेटाबॉलिक रेट (बीएमआर) भी दिखाता है — यानी आराम की अवस्था में शरीर कितनी कैलोरी खर्च करता है (मिफ्लिन-सेंट जियोर फॉर्मूला)।"
        useCases={[
          { title: "स्वास्थ्य जांच", description: "वजन से जुड़े जोखिमों की पहली जांच के लिए उपयोगी त्वरित तरीका।" },
          { title: "वजन लक्ष्य", description: "स्वस्थ सीमा तक पहुंचने के लिए कितने किलो घटाने या बढ़ाने हैं, जानें।" },
          { title: "कैलोरी योजना", description: "डाइट और फिटनेस लक्ष्य के लिए अपने बीएमआर को आधार बनाएं।" },
          { title: "प्रगति ट्रैक करें", description: "एक बार के बजाय रुझान देखने के लिए हर महीने दोबारा जांचें।" },
        ]}
        tips={[
          { title: "मांसपेशी बनाम चर्बी", description: "खिलाड़ियों का बीएमआई मांसपेशियों के कारण अधिक हो सकता है — बीएमआई चर्बी और मांसपेशी में अंतर नहीं करता।" },
          { title: "सही माप", description: "सुबह वजन करें और दीवार के सहारे नंगे पैर ऊंचाई मापें।" },
          { title: "बीएमआर आधार है", description: "कुल दैनिक खर्च = बीएमआर × गतिविधि स्तर (1.2 सामान्य से 1.9 बहुत सक्रिय)।" },
        ]}
        faqs={[
          { question: "स्वस्थ बीएमआई कितना होता है?", answer: "अधिकांश वयस्कों के लिए 18.5 से 24.9 स्वस्थ माना जाता है। 18.5 से कम कम वजन, 25-29.9 अधिक वजन और 30+ मोटापा है।" },
          { question: "बीएमआर की गणना कैसे होती है?", answer: "हम मिफ्लिन-सेंट जियोर फॉर्मूला उपयोग करते हैं, जिसमें वजन, ऊंचाई, आयु और लिंग शामिल होता है। यह आराम की अवस्था में खर्च कैलोरी बताता है।" },
          { question: "क्या खिलाड़ियों के लिए बीएमआई सटीक है?", answer: "हमेशा नहीं — घनी मांसपेशियों से बीएमआई बढ़ जाता है। खिलाड़ी बॉडी-फैट प्रतिशत और कमर का माप भी देखें।" },
          { question: "बीएमआई कितनी बार जांचें?", answer: "महीने में एक बार पर्याप्त है। पानी और भोजन से रोज़ उतार-चढ़ाव होता है।" },
        ]}
      />
    </CalculatorLayout>
  );
};

export default BMICalculatorHindiClient;
