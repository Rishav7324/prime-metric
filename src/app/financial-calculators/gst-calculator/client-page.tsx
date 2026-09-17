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

const GstCalculator = () => {
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
      toast({ variant: "destructive", title: "Invalid Input", description: "Enter amount (1+), GST rate (0-100%)." });
      return;
    }
    setResult(computed);
    toast({ title: "GST Calculated", description: `Total ${currencySymbol}${fmt(computed.total)} (GST ${currencySymbol}${fmt(computed.gst)}).` });
  };

  const reset = () => { setAmount(""); setRate(""); setMode("remove"); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `GST (${result.mode} ${rate}%): base ${currencySymbol}${fmt(result.base)} + tax ${currencySymbol}${fmt(result.gst)} (CGST ${currencySymbol}${fmt(result.cgst)} + SGST ${currencySymbol}${fmt(result.sgst)}) = total ${currencySymbol}${fmt(result.total)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="GST Calculator"
      description="Add or remove GST from any amount, with CGST + SGST split at any tax rate"
      keywords="gst calculator, gst inclusive exclusive, cgst sgst calculator, add remove gst"
      canonicalUrl="/financial-calculators/gst-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">GST Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Amount ({currencySymbol})</Label>
              <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 1000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">GST Rate (%)</Label>
              <Input type="number" min={0} max={100} step={0.5} value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 18" className="mt-1.5 h-10 text-sm bg-white" />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {QUICK_RATES.map((r) => (
                  <Button key={r} onClick={() => setRate(String(r))} variant="outline" size="sm" className="h-7 text-xs px-2.5">
                    {r}%
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Calculation Type</Label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {(["add", "remove"] as GstMode[]).map((m) => (
                  <Button key={m} onClick={() => setMode(m)} variant={mode === m ? "default" : "outline"} className={mode === m ? "h-10 text-sm gradient-button" : "h-10 text-sm"}>
                    {m === "add" ? "Add GST" : "Remove GST"}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Calculate GST</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Breakdown</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">{result.mode === "add" ? "GST-Inclusive Total" : "GST-Exclusive Base Price"}</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.mode === "add" ? result.total : result.base)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Base Price</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.base)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">GST Amount</p>
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
              <p className="text-[11px] text-neutral-500 text-center">CGST + SGST applies to intra-state sales; for inter-state sales the same amount is charged as IGST.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🧾</div><p className="text-sm">Enter details to break down GST</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="Goods and Services Tax (GST) is added to the base price of most goods and services in India. This calculator converts between GST-exclusive and GST-inclusive prices at any rate, and splits the tax into equal CGST and SGST halves for intra-state sales."
        useCases={[
          { title: "E-commerce Pricing", description: "Set MRPs that already include GST so listed prices match what customers pay at checkout." },
          { title: "Invoice Verification", description: "Check that a supplier's bill splits tax correctly into CGST and SGST halves." },
          { title: "Reverse Calculation", description: "Back out the tax from an MRP to find the true base price and margin." },
          { title: "Business Quoting", description: "Quote clients cleanly with base price, tax, and total shown separately." },
        ]}
        tips={[
          { title: "Know Your Slab", description: "Common GST slabs are 0%, 5%, 12%, 18% and 28% — use the quick-select chips for these." },
          { title: "CGST+SGST vs IGST", description: "Intra-state sales split tax as CGST + SGST; inter-state sales charge the same total as IGST." },
          { title: "Watch Rounding", description: "Round tax per line item, not on the invoice total, to match compliant billing software." },
        ]}
        faqs={[
          { question: "How do I add GST to a price?", answer: "Multiply the base price by (1 + rate/100). For example, 1,000 at 18% becomes 1,000 × 1.18 = 1,180." },
          { question: "How do I remove GST from a price?", answer: "Divide the inclusive price by (1 + rate/100). For example, 1,180 at 18% gives 1,180 ÷ 1.18 = 1,000 base." },
          { question: "What are CGST and SGST?", answer: "For sales within a state, GST is split equally between the central government (CGST) and the state government (SGST)." },
          { question: "What is the GST formula?", answer: "GST amount = base price × rate/100. Inclusive total = base + GST; base = inclusive total ÷ (1 + rate/100)." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default GstCalculator;
