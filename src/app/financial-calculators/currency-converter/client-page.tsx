'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { currencies } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const [isStale, setIsStale] = useState(false);
  const { toast } = useToast();

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/47d21e70f7f01c637fbd6d49/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
          setRates(data.conversion_rates);
          setIsStale(false);
        } else {
          throw new Error('Failed to fetch rates');
        }
      })
      .catch(error => {
        console.error("Failed to fetch exchange rates:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch live exchange rates. Using static data.",
        });
        // Fallback to static rates if API fails
        setRates({
          USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.12, JPY: 149.50, AUD: 1.52,
          CAD: 1.36, CHF: 0.88, CNY: 7.24,
        });
        setIsStale(true);
      });
  }, [toast]);

  const calculate = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || amt > 1e12) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter a valid amount greater than 0 (up to 1,000,000,000,000).",
      });
      return;
    }
    if (!rates) {
      toast({
        variant: "destructive",
        title: "Rates not loaded",
        description: "Please wait for exchange rates to load and try again.",
      });
      return;
    }
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Selected currency is not available in the current rate table.",
      });
      return;
    }
    const usdAmount = amt / rates[fromCurrency];
    const converted = usdAmount * rates[toCurrency];
    setResult(converted.toFixed(2));
    toast({
      title: "Conversion Complete",
      description: `${fmt(amt)} ${fromCurrency} is equal to ${fmt(converted)} ${toCurrency}.`,
    });
  };

  const reset = () => { setAmount("1"); setFromCurrency("USD"); setToCurrency("EUR"); setResult(null); };

  const copyResult = async () => {
    if (!result || !rates) return;
    const amt = parseFloat(amount);
    const text = `${fmt(isNaN(amt) ? 0 : amt)} ${fromCurrency} = ${fmt(parseFloat(result))} ${toCurrency} (1 ${fromCurrency} = ${(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} ${toCurrency}). — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const currencyOptions = currencies.map(c => ({ value: c.code, label: c.name }));

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between major world currencies"
      canonicalUrl="/financial-calculators/currency-converter"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 font-headline">Convert Currency</h2>
          <div className="space-y-4">
            <div>
              <Label>Amount</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="mt-2 h-10 bg-white border border-neutral-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map(curr => <SelectItem key={curr.value} value={curr.value}>{curr.value} - {curr.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="mt-2 h-10 bg-white border border-neutral-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencyOptions.map(curr => <SelectItem key={curr.value} value={curr.value}>{curr.value} - {curr.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button" disabled={!rates}>
                {rates ? 'Convert' : 'Loading Rates...'}
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            {isStale && rates && (
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-2">Live rates unavailable — showing cached fallback rates. Figures may be stale.</p>
            )}
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-headline">Result</h2>
            {result && rates && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result && rates ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">{fmt(parseFloat(amount) || 0)} {fromCurrency} =</div>
                <div className="text-3xl font-bold gradient-text">{fmt(parseFloat(result))}</div>
                <div className="text-2xl text-neutral-600 mt-2">{toCurrency}</div>
              </div>
              <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                <div className="text-sm text-neutral-600 mb-2">Exchange Rate</div>
                <div className="text-xl font-bold">1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center"><div className="text-4xl mb-2">💱</div><p>Enter amount to convert</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Currency Converter helps you convert amounts between major world currencies using current exchange rates. Whether you're planning international travel, shopping online from foreign stores, or conducting business across borders, this tool provides quick and easy currency conversions."
        useCases={[
          { title: "International Travel", description: "Calculate how much your money is worth in your destination country, budget for trips, and compare prices across different currencies." },
          { title: "Online Shopping", description: "Convert prices from international websites to your local currency to understand actual costs and compare deals across regions." },
          { title: "Business Transactions", description: "Calculate international invoice amounts, compare quotes from foreign suppliers, or price products for different markets." },
          { title: "Investment Tracking", description: "Monitor foreign investments, convert dividend payments, or track portfolio values across different currency zones." }
        ]}
        tips={[
          { title: "Exchange Rate Awareness", description: "This calculator uses live mid-market rates. For financial decisions, always check the final rate from your bank or exchange service, which may include a markup." },
          { title: "Hidden Costs", description: "Actual exchanges often include fees, commissions, or less favorable rates than mid-market rates shown here. Budget accordingly." },
          { title: "Timing Matters", description: "Exchange rates fluctuate constantly. For large transactions, consider timing and potentially using limit orders with currency services." },
          { title: "Multiple Currencies", description: "For multi-currency trips or transactions, convert each currency pair separately for accuracy rather than daisy-chaining conversions." }
        ]}
        examples={[
          { title: "100 USD to EUR", description: "Converting 100 US dollars to euros at a rate of 0.92 gives €92.00.", steps: ["Start with 100 USD and the USD-based rate table (USD = 1, EUR = 0.92).", "Convert to USD first: 100 / 1 = 100 USD.", "Multiply by the target rate: 100 × 0.92 = €92.00."] },
          { title: "100 EUR to GBP", description: "Converting 100 euros to pounds at fallback rates (EUR 0.92, GBP 0.79) gives £85.87.", steps: ["Convert euros to USD: 100 / 0.92 = 108.6957 USD.", "Multiply by the pound rate: 108.6957 × 0.79 = 85.8696.", "Round to two decimals: £85.87."] },
        ]}
        faqs={[
          { question: "How often do exchange rates change?", answer: "Real exchange rates change constantly throughout the trading day. This calculator uses live rates that update periodically. For time-sensitive transactions, re-check the rate just before converting." },
          { question: "Why is my actual exchange different?", answer: "Banks and exchange services add markup (spread) to mid-market rates, plus fees. The difference can be 2-5% or more. Shop around for better rates on large amounts." },
          { question: "What's the best way to exchange currency?", answer: "For travel: ATMs often offer competitive rates. For large amounts: compare banks, online services (Wise, Revolut), and currency brokers. Avoid airport exchanges." },
          { question: "Should I exchange before traveling?", answer: "Having some local currency on arrival is convenient, but you'll typically get better rates using ATMs at your destination or prepaid travel cards." },
          { question: "How much is $250 USD in euros if 1 USD = 0.92 EUR?", answer: "Multiply by the rate: 250 × 0.92 = €230.00. The calculator does this as 250 / 1 × 0.92, converting through USD as the base currency." },
          { question: "How do I convert €200 back to dollars at that same rate?", answer: "Divide by the euro rate: 200 / 0.92 = $217.39. The reverse calculation is (200 / 0.92) × 1, which is why converting there and back never matches exactly once fees are added." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CurrencyCalculator;
