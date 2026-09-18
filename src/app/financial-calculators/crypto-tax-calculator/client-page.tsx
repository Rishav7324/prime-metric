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

type CryptoResult = {
  gains: number; taxable: number; tax: number;
  tdsCredit: number; netPayable: number; isLoss: boolean;
};

const CRYPTO_RATE = 0.30;

function computeCryptoTax(sellStr: string, buyStr: string, tdsStr: string): CryptoResult | null {
  const sell = parseFloat(sellStr);
  const buy = parseFloat(buyStr);
  const tds = parseFloat(tdsStr);

  if (!(sell > 0 && sell <= 1e12) || isNaN(buy) || buy < 0 || buy > 1e12 || isNaN(tds) || tds < 0 || tds > sell) {
    return null;
  }

  const gains = sell - buy;
  const taxable = Math.max(0, gains);
  const tax = taxable * CRYPTO_RATE;
  return {
    gains, taxable, tax,
    tdsCredit: Math.min(tds, tax), netPayable: Math.max(0, tax - tds),
    isLoss: gains < 0,
  };
}

const DEF_SELL = "500000";
const DEF_BUY = "300000";
const DEF_TDS = "2000";

const CryptoTaxCalculator = () => {
  const [sellValue, setSellValue] = useState(DEF_SELL);
  const [buyCost, setBuyCost] = useState(DEF_BUY);
  const [tdsPaid, setTdsPaid] = useState(DEF_TDS);
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<CryptoResult | null>(() => computeCryptoTax(DEF_SELL, DEF_BUY, DEF_TDS));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    if (!(parseFloat(sellValue) > 0)) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Total sell value must be a positive amount." });
      return;
    }
    const buy = parseFloat(buyCost);
    if (isNaN(buy) || buy < 0) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Total buy cost must be zero or positive." });
      return;
    }
    const tds = parseFloat(tdsPaid);
    if (isNaN(tds) || tds < 0 || tds > parseFloat(sellValue)) {
      toast({ variant: "destructive", title: "Invalid Input", description: "TDS already deducted must be between 0 and the sell value." });
      return;
    }
    const computed = computeCryptoTax(sellValue, buyCost, tdsPaid);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Check amounts and retry." });
      return;
    }
    setResult(computed);
    toast({ title: "Crypto Tax Computed", description: `Tax ${currencySymbol}${fmt(computed.tax)}, net payable ${currencySymbol}${fmt(computed.netPayable)} after TDS credit.` });
  };

  const reset = () => { setSellValue(""); setBuyCost(""); setTdsPaid(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Crypto tax (115BBH): gains ${currencySymbol}${fmt(result.gains)}, 30% tax ${currencySymbol}${fmt(result.tax)}, TDS credit ${currencySymbol}${fmt(result.tdsCredit)}, net payable ${currencySymbol}${fmt(result.netPayable)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="India Crypto Tax Calculator (30% Rule)"
      description="Estimate crypto tax on VDA transfers with 30% flat tax on gains, 1% TDS credit, net payable and loss rules"
      keywords="crypto tax calculator india, vda tax calculator, bitcoin tax india, 115bbh tax calculator"
      canonicalUrl="/financial-calculators/crypto-tax-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Transfer Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Total Sell Value ({currencySymbol})</Label>
              <Input type="number" min={1} value={sellValue} onChange={(e) => setSellValue(e.target.value)} placeholder="e.g., 500000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">Total Buy Cost ({currencySymbol})</Label>
              <Input type="number" min={0} value={buyCost} onChange={(e) => setBuyCost(e.target.value)} placeholder="e.g., 300000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <div>
              <Label className="text-sm font-medium">1% TDS Already Deducted ({currencySymbol})</Label>
              <Input type="number" min={0} value={tdsPaid} onChange={(e) => setTdsPaid(e.target.value)} placeholder="e.g., 2000" className="mt-1.5 h-10 text-sm bg-white" />
            </div>
            <p className="text-[11px] text-neutral-500">Flat 30% on gains only (Sec 115BBH) — no deduction except buy cost, no loss set-off.</p>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Compute Crypto Tax</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Tax Estimate</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-xs text-neutral-500">Net Tax Payable (after TDS credit)</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.netPayable)}</p>
              </div>
              {result.isLoss && (
                <p className="text-xs p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">Net loss of {currencySymbol}{fmt(Math.abs(result.gains))} — no tax due, but this loss cannot be set off against other income or carried forward (Sec 115BBH).</p>
              )}
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Gains (Sell − Buy)</p>
                  <p className={`text-base font-bold ${result.gains >= 0 ? "text-green-600" : "text-red-600"}`}>{currencySymbol}{fmt(result.gains)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Tax @ 30%</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.tax)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">TDS Credit (1%)</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.tdsCredit)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Taxable Gains</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.taxable)}</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">Estimate only — surcharge, 4% cess and slab interactions excluded. Consult a CA before filing.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🪙</div><p className="text-sm">Enter details to estimate tax</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="India taxes Virtual Digital Assets (crypto, NFTs) under Section 115BBH at a flat 30% on transfer gains, with 1% TDS under Section 194S on each sale. This calculator taxes gains only — sell value minus buy cost — subtracts TDS already deducted as a credit, and flags the strict no-loss-offset rule."
        useCases={[
          { title: "Pre-Sale Estimate", description: "Know the 30% hit on a planned BTC or ETH sale before you confirm the order." },
          { title: "TDS Reconciliation", description: "Match 1% TDS shown on the exchange or Form 26QE against your final liability." },
          { title: "Multi-Trade Totals", description: "Aggregate a year's sell value and buy cost to preview total VDA tax." },
          { title: "Loss-Year Check", description: "Confirm a loss year still owes zero tax — while losses stay unusable elsewhere." },
        ]}
        tips={[
          { title: "Track Every Trade", description: "Exchanges deduct 1% TDS per transfer; keep records to claim full credit at filing." },
          { title: "No Harvesting Benefit", description: "Booking losses won't cut crypto tax or other income — gains are taxed standalone." },
          { title: "Add Cess on Top", description: "A 4% health & education cess (plus surcharge if applicable) applies over the 30%." },
        ]}
        faqs={[
          { question: "What is the crypto tax rate in India?", answer: "30% flat under Section 115BBH on gains from Virtual Digital Assets, plus applicable surcharge and 4% cess. Only the buy cost is deductible — no expenses, no exemptions." },
          { question: "How does the 1% TDS work?", answer: "Under Section 194S, 1% TDS applies on crypto transfers above thresholds. It is not extra tax — claim it as credit against your 30% liability, as this calculator does." },
          { question: "Can crypto losses offset gains?", answer: "No. VDA losses cannot be set off against crypto gains, any other income, or carried forward — each profitable transfer is taxed in isolation." },
          { question: "Are gifts and mining taxed too?", answer: "Yes. Crypto received as gift (above ₹50,000 from non-relatives) or from mining is taxable, with a zero or fair-value cost base. Consult a CA for your case." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default CryptoTaxCalculator;
