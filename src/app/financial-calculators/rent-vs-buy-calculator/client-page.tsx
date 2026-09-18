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

type RentBuyResult = {
  down: number; loan: number; emi: number;
  totalBuying: number; totalRenting: number; homeValue: number;
  multiple: number; cheaper: "buy" | "rent" | "tie"; savings: number;
};

function computeRentBuy(
  priceStr: string, downPctStr: string, rateStr: string, yearsStr: string,
  rentStr: string, rentGrowthStr: string, apprecStr: string
): RentBuyResult | null {
  const price = parseFloat(priceStr);
  const downPct = parseFloat(downPctStr);
  const annualRate = parseFloat(rateStr);
  const years = parseFloat(yearsStr);
  const rent = parseFloat(rentStr);
  const rentGrowth = parseFloat(rentGrowthStr);
  const apprec = parseFloat(apprecStr);

  if (!(price > 0 && price <= 1e12)) return null;
  if (isNaN(downPct) || downPct < 0 || downPct > 90) return null;
  if (isNaN(annualRate) || annualRate < 0 || annualRate > 100) return null;
  if (!(years > 0 && years <= 50)) return null;
  if (!(rent > 0 && rent <= 1e9)) return null;
  if (isNaN(rentGrowth) || rentGrowth < 0 || rentGrowth > 50) return null;
  if (isNaN(apprec) || apprec < 0 || apprec > 50) return null;

  const down = (price * downPct) / 100;
  const loan = price - down;
  const monthlyRate = annualRate / 100 / 12;
  const months = Math.round(years * 12);
  const emi = monthlyRate === 0 ? loan / months
    : (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const totalBuying = down + emi * months;

  // Rent grows once a year: sum rent*12*(1+g)^y
  const g = rentGrowth / 100;
  const fullYears = Math.ceil(months / 12);
  let totalRenting = 0;
  for (let y = 0; y < fullYears; y++) {
    const monthsThisYear = Math.min(12, months - y * 12);
    totalRenting += rent * Math.pow(1 + g, y) * monthsThisYear;
  }

  const homeValue = price * Math.pow(1 + apprec / 100, years);
  const multiple = totalRenting > 0 ? totalBuying / totalRenting : 0;
  const diff = totalBuying - totalRenting;
  const cheaper: RentBuyResult["cheaper"] =
    Math.abs(diff) < 1 ? "tie" : diff < 0 ? "buy" : "rent";

  return { down, loan, emi, totalBuying, totalRenting, homeValue, multiple, cheaper, savings: Math.abs(diff) };
}

const RentVsBuyCalculatorClient = () => {
  const [price, setPrice] = useState("8000000");
  const [downPct, setDownPct] = useState("20");
  const [rate, setRate] = useState("8.5");
  const [years, setYears] = useState("20");
  const [rent, setRent] = useState("25000");
  const [rentGrowth, setRentGrowth] = useState("5");
  const [apprec, setApprec] = useState("6");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<RentBuyResult | null>(() =>
    computeRentBuy("8000000", "20", "8.5", "20", "25000", "5", "6"));
  const [currency, setCurrency] = useState("USD");
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeRentBuy(price, downPct, rate, years, rent, rentGrowth, apprec);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Check price, down % (0-90), rate (0-100), years (≤50), rent, growth % (0-50)." });
      return;
    }
    setResult(computed);
    const verdict = computed.cheaper === "tie" ? "a tie"
      : computed.cheaper === "buy" ? "buying wins" : "renting wins";
    toast({ title: "Comparison Ready", description: `Buying costs ${computed.multiple.toFixed(2)}x renting — ${verdict}.` });
  };

  const reset = () => {
    setPrice(""); setDownPct(""); setRate(""); setYears("");
    setRent(""); setRentGrowth(""); setApprec(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const winner = result.cheaper === "tie" ? "Both cost about the same"
      : result.cheaper === "buy" ? "Buying is cheaper" : "Renting is cheaper";
    const text = `Rent vs Buy: renting costs ${currencySymbol}${fmt(result.totalRenting)}, buying costs ${currencySymbol}${fmt(result.totalBuying)} (${result.multiple.toFixed(2)}x). ${winner} by ${currencySymbol}${fmt(result.savings)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Rent vs Buy Calculator"
      description="Compare total renting vs buying costs with loan EMI, rent hikes and home growth to see which option saves you more"
      keywords="rent vs buy calculator, renting vs buying home, buy or rent calculator, home loan vs rent, rent hike calculator"
      canonicalUrl="/financial-calculators/rent-vs-buy-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Home & Rent Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Home Price ({currencySymbol})</Label>
                <Input type="number" min={1} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 8000000" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Down Payment (%)</Label>
                <Input type="number" step="0.5" min={0} max={90} value={downPct} onChange={(e) => setDownPct(e.target.value)} placeholder="e.g., 20" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Loan Rate (%)</Label>
                <Input type="number" step="0.1" min={0} max={100} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 8.5" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Horizon (Years)</Label>
                <Input type="number" min={1} max={50} step={1} value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 20" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Current Monthly Rent ({currencySymbol})</Label>
              <Input type="number" min={1} value={rent} onChange={(e) => setRent(e.target.value)} placeholder="e.g., 25000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Rent Growth (%/yr)</Label>
                <Input type="number" step="0.5" min={0} max={50} value={rentGrowth} onChange={(e) => setRentGrowth(e.target.value)} placeholder="e.g., 5" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Home Growth (%/yr)</Label>
                <Input type="number" step="0.5" min={0} max={50} value={apprec} onChange={(e) => setApprec(e.target.value)} placeholder="e.g., 6" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Compare</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className={`text-center py-4 border rounded-xl ${result.cheaper === "rent" ? "bg-[#FFF5F2] border-[#F2765E]/25" : "bg-neutral-50 border-neutral-200"}`}>
                <div className="text-xs text-neutral-500 mb-1">Buy / Rent Multiple</div>
                <div className="text-3xl font-bold text-[#F2765E]">{result.multiple.toFixed(2)}x</div>
                <div className="text-xs text-neutral-600 mt-1 font-medium">
                  {result.cheaper === "tie" ? "Both options cost about the same"
                    : result.cheaper === "buy"
                      ? `Buying wins — saves ${currencySymbol}${fmt(result.savings)}`
                      : `Renting wins — saves ${currencySymbol}${fmt(result.savings)}`}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className={`p-3 rounded-lg border text-center ${result.cheaper === "rent" ? "bg-[#FFF5F2] border-[#F2765E]/40" : "bg-neutral-50 border-neutral-200"}`}>
                  <div className="text-xs text-neutral-500">Total Renting Cost</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalRenting)}</div>
                </div>
                <div className={`p-3 rounded-lg border text-center ${result.cheaper === "buy" ? "bg-[#FFF5F2] border-[#F2765E]/40" : "bg-neutral-50 border-neutral-200"}`}>
                  <div className="text-xs text-neutral-500">Total Buying Cost</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.totalBuying)}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">Monthly EMI</div>
                  <div className="text-base font-bold text-black">{currencySymbol}{fmt(result.emi)}</div>
                </div>
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-center">
                  <div className="text-xs text-neutral-500">Home Value at End</div>
                  <div className="text-base font-bold text-[#c25136]">{currencySymbol}{fmt(result.homeValue)}</div>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">Buying cost = down payment + all EMIs. Renting cost = rent compounded yearly. Home value shown for context, not deducted.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🏠</div><p className="text-sm">Enter details to compare rent vs buy</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Rent vs Buy Calculator pits lifetime renting costs against homeownership costs over your chosen horizon. It combines down payment plus loan EMIs on the buying side with annually-compounding rent on the other, then crowns a winner with a buy/rent multiple."
        useCases={[
          { title: "First Home Decision", description: "Check whether buying beats renting in your city before house-hunting." },
          { title: "Relocation Planning", description: "Compare short stays (renting usually wins) against long settles." },
          { title: "Down Payment Trade-offs", description: "See how a bigger down payment shrinks the buying total." },
          { title: "Rent Hike Stress Test", description: "Raise expected rent growth to see when buying starts winning." },
        ]}
        tips={[
          { title: "Horizon Matters Most", description: "Buying usually needs 7-10+ years to beat renting after upfront costs." },
          { title: "Watch the Multiple", description: "A multiple near 1.0x means lifestyle, not money, should decide." },
          { title: "Growth Rates Swing It", description: "Small changes in rent growth or home appreciation flip close calls." },
        ]}
        faqs={[
          { question: "What does the buy/rent multiple mean?", answer: "Total buying cost divided by total renting cost. Above 1.0x means renting is cheaper; below 1.0x means buying is cheaper." },
          { question: "Is home appreciation subtracted from buying cost?", answer: "No — this tool compares cash outflows side by side and shows end home value separately for context." },
          { question: "Are maintenance and property tax included?", answer: "No, this is a simplified comparison of down payment + EMIs versus rent. Add a buffer to buying if those costs are high." },
          { question: "Why does renting often win short-term?", answer: "Buying front-loads big costs (down payment + early interest), which need many years of rent hikes to overcome." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RentVsBuyCalculatorClient;
