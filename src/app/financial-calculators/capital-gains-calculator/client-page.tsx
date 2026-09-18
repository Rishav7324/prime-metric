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
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type AssetType = "equity" | "mutual-fund" | "property" | "gold";

type CapGainResult = {
  gain: number; holdingDays: number; holdingLabel: string;
  classification: "LTCG" | "STCG"; thresholdMonths: number;
  rateApplied: number; rateNote: string;
  exemption: number; taxableGain: number; tax: number; netProceeds: number;
};

const LTCG_RATE = 0.125;
const EQUITY_EXEMPTION = 125000;
const EQUITY_STCG_RATE = 0.20;
const SLAB_STCG_RATE = 0.30; // assumed top slab for property/gold STCG

function addMonths(d: Date, m: number): Date {
  const c = new Date(d.getTime());
  c.setMonth(c.getMonth() + m);
  return c;
}

function computeCapitalGains(asset: string, buyStr: string, sellStr: string, buyDateStr: string, sellDateStr: string): CapGainResult | null {
  const buy = parseFloat(buyStr);
  const sell = parseFloat(sellStr);
  if (!(buy > 0 && buy <= 1e12) || !(sell > 0 && sell <= 1e12)) return null;

  const buyDate = new Date(buyDateStr);
  const sellDate = new Date(sellDateStr);
  if (isNaN(buyDate.getTime()) || isNaN(sellDate.getTime())) return null;
  if (sellDate.getTime() <= buyDate.getTime()) return null;

  const isEquityLike = asset === "equity" || asset === "mutual-fund";
  const thresholdMonths = isEquityLike ? 12 : 24;
  const isLongTerm = sellDate.getTime() > addMonths(buyDate, thresholdMonths).getTime();

  const holdingDays = Math.round((sellDate.getTime() - buyDate.getTime()) / 86400000);
  const yrs = Math.floor(holdingDays / 365);
  const mos = Math.floor((holdingDays % 365) / 30);
  const holdingLabel = `${yrs}y ${mos}m (${holdingDays} days)`;

  const gain = sell - buy;
  if (gain <= 0) {
    return {
      gain, holdingDays, holdingLabel,
      classification: isLongTerm ? "LTCG" : "STCG", thresholdMonths,
      rateApplied: 0, rateNote: "No gain — no tax due",
      exemption: 0, taxableGain: 0, tax: 0, netProceeds: sell,
    };
  }

  let rateApplied: number; let rateNote: string; let exemption = 0;
  if (isLongTerm && isEquityLike) {
    rateApplied = LTCG_RATE;
    exemption = Math.min(EQUITY_EXEMPTION, gain);
    rateNote = "12.5% LTCG above ₹1.25L exemption (Sec 112A)";
  } else if (isLongTerm) {
    rateApplied = LTCG_RATE;
    rateNote = "12.5% LTCG, no indexation (Budget 2024)";
  } else if (isEquityLike) {
    rateApplied = EQUITY_STCG_RATE;
    rateNote = "20% STCG (Sec 111A)";
  } else {
    rateApplied = SLAB_STCG_RATE;
    rateNote = "STCG at income slab — assumed 30% top slab";
  }

  const taxableGain = Math.max(0, gain - exemption);
  const tax = taxableGain * rateApplied;
  return {
    gain, holdingDays, holdingLabel,
    classification: isLongTerm ? "LTCG" : "STCG", thresholdMonths,
    rateApplied, rateNote, exemption, taxableGain, tax, netProceeds: sell - tax,
  };
}

const DEF_ASSET = "equity";
const DEF_BUY = "500000";
const DEF_SELL = "800000";
const DEF_BUY_DATE = "2023-04-01";
const DEF_SELL_DATE = "2025-04-15";

const CapitalGainsCalculator = () => {
  const [asset, setAsset] = useState(DEF_ASSET);
  const [buyPrice, setBuyPrice] = useState(DEF_BUY);
  const [sellPrice, setSellPrice] = useState(DEF_SELL);
  const [buyDate, setBuyDate] = useState(DEF_BUY_DATE);
  const [sellDate, setSellDate] = useState(DEF_SELL_DATE);
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<CapGainResult | null>(() => computeCapitalGains(DEF_ASSET, DEF_BUY, DEF_SELL, DEF_BUY_DATE, DEF_SELL_DATE));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  const calculate = () => {
    if (!(parseFloat(buyPrice) > 0) || !(parseFloat(sellPrice) > 0)) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Buy and sell prices must be positive amounts." });
      return;
    }
    const b = new Date(buyDate);
    const s = new Date(sellDate);
    if (!buyDate || !sellDate || isNaN(b.getTime()) || isNaN(s.getTime())) {
      toast({ variant: "destructive", title: "Invalid Dates", description: "Enter valid buy and sell dates." });
      return;
    }
    if (s.getTime() <= b.getTime()) {
      toast({ variant: "destructive", title: "Invalid Dates", description: "Sell date must be after buy date." });
      return;
    }
    const computed = computeCapitalGains(asset, buyPrice, sellPrice, buyDate, sellDate);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Check amounts and dates, then retry." });
      return;
    }
    setResult(computed);
    toast({ title: `${computed.classification} Computed`, description: `Tax ${currencySymbol}${fmt(computed.tax)} at ${(computed.rateApplied * 100).toFixed(1)}% — held ${computed.holdingLabel}.` });
  };

  const reset = () => { setAsset(DEF_ASSET); setBuyPrice(""); setSellPrice(""); setBuyDate(""); setSellDate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Capital gains (${asset}, ${result.classification}, held ${result.holdingLabel}): gain ${currencySymbol}${fmt(result.gain)}, tax ${currencySymbol}${fmt(result.tax)} at ${(result.rateApplied * 100).toFixed(1)}%, net ${currencySymbol}${fmt(result.netProceeds)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="India Capital Gains Tax Calculator"
      description="Estimate capital gains tax on equity, mutual funds, property and gold with holding-period rules and net proceeds"
      keywords="capital gains calculator india, ltcg stcg calculator, equity capital gains tax, property capital gains india"
      canonicalUrl="/financial-calculators/capital-gains-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Asset & Transaction</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label className="text-sm font-medium">Asset Type</Label>
              <Select value={asset} onValueChange={setAsset}>
                <SelectTrigger className="mt-1.5 h-10 text-sm bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equity">Listed Equity Shares</SelectItem>
                  <SelectItem value="mutual-fund">Equity Mutual Fund</SelectItem>
                  <SelectItem value="property">Property / Real Estate</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Buy Price ({currencySymbol})</Label>
                <Input type="number" min={1} value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} placeholder="e.g., 500000" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Sell Price ({currencySymbol})</Label>
                <Input type="number" min={1} value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} placeholder="e.g., 800000" className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <Label className="text-sm font-medium">Buy Date</Label>
                <Input type="date" value={buyDate} onChange={(e) => setBuyDate(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
              <div>
                <Label className="text-sm font-medium">Sell Date</Label>
                <Input type="date" value={sellDate} onChange={(e) => setSellDate(e.target.value)} className="mt-1.5 h-10 text-sm bg-white" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">Compute Tax</Button>
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
                <p className="text-xs text-neutral-500">Estimated Tax Payable</p>
                <p className="text-3xl font-bold text-[#F2765E]">{currencySymbol}{fmt(result.tax)}</p>
                <span className={`inline-block mt-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${result.classification === "LTCG" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {result.classification} · held {result.holdingLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 text-center">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Capital Gain</p>
                  <p className={`text-base font-bold ${result.gain >= 0 ? "text-green-600" : "text-red-600"}`}>{currencySymbol}{fmt(result.gain)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Net Proceeds</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.netProceeds)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Taxable Gain</p>
                  <p className="text-base font-bold text-black">{currencySymbol}{fmt(result.taxableGain)}</p>
                </div>
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-xs text-neutral-500">Rate Applied</p>
                  <p className="text-base font-bold text-black">{(result.rateApplied * 100).toFixed(1)}%</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500">Rule: {result.rateNote}. Exemption {currencySymbol}{fmt(result.exemption)}. Property/gold STCG assumes top slab — actual tax follows your income slab.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">📊</div><p className="text-sm">Enter details to estimate tax</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="India taxes capital gains differently by asset and holding period under the Finance Act 2024 (Budget 2024). This calculator classifies your sale as long-term or short-term from the buy/sell dates, applies the matching rate — including the 12.5% LTCG rate and the ₹1.25 lakh equity exemption — and shows tax plus net proceeds."
        useCases={[
          { title: "Equity Profit Planning", description: "Check whether waiting past 12 months flips STCG at 20% into lower-taxed LTCG." },
          { title: "Property Sale Estimate", description: "Estimate 12.5% LTCG (no indexation) on flats or land held over 24 months." },
          { title: "Gold Exit Timing", description: "Compare tax on selling jewellery, coins or ETFs before vs after 24 months." },
          { title: "Mutual Fund Redemption", description: "Preview tax on equity-fund redemptions before placing the sell order." },
        ]}
        tips={[
          { title: "Watch the Threshold", description: "One extra day past 12 months (equity) or 24 months (property/gold) can change the slab entirely." },
          { title: "Use the Equity Exemption", description: "Up to ₹1.25 lakh of equity LTCG per year is exempt — spread large redemptions across years." },
          { title: "Indexation Is Gone", description: "Budget 2024 removed indexation for property/gold LTCG; tax is a flat 12.5% on nominal gains." },
        ]}
        faqs={[
          { question: "What are the holding-period and rate rules (Budget 2024)?", answer: "Equity/mutual funds: over 12 months = LTCG at 12.5% above ₹1.25L exemption (Sec 112A), else STCG at 20% (Sec 111A). Property/gold: over 24 months = LTCG at 12.5% with no indexation (Sec 112), else STCG added to income and taxed at your slab (assumed 30% here)." },
          { question: "Is indexation still available?", answer: "No. The Finance Act 2024 removed indexation for LTCG on property and gold for transfers on/after 23 July 2024; the rate dropped to 12.5% without indexation." },
          { question: "What if I sell at a loss?", answer: "Tax is zero. Short-term losses can offset both STCG and LTCG, and long-term losses only LTCG; unadjusted losses carry forward up to 8 years." },
          { question: "Does STCG on property use my slab?", answer: "Yes — it is added to total income and taxed at your slab rate. This tool assumes the 30% top slab, so treat it as an upper-bound estimate." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default CapitalGainsCalculator;
