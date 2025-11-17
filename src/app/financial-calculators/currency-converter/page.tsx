
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout, { generateMetadata } from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

export const metadata = generateMetadata({
  title: "Currency Converter",
  description: "Convert between major world currencies",
  keywords: "currency converter, exchange rates, currency calculator, forex calculator",
  canonicalUrl: "/financial-calculators/currency-converter"
});

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  // Static exchange rates (in production, fetch from API)
  const rates: { [key: string]: number } = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 149.50,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
  };

  const calculate = () => {
    const amt = parseFloat(amount);
    if (amt > 0) {
      const usdAmount = amt / rates[fromCurrency];
      const converted = usdAmount * rates[toCurrency];
      setResult(converted.toFixed(2));
       toast({
        title: "Conversion Complete",
        description: `${amount} ${fromCurrency} is equal to ${converted.toFixed(2)} ${toCurrency}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid amount to convert.",
      });
    }
  };

  const currencies = Object.keys(rates);

  return (
    <CalculatorLayout
      title="Currency Converter"
      description="Convert between major world currencies"
      canonicalUrl="/financial-calculators/currency-converter"
    >
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Convert Currency</h2>
          <div className="space-y-6">
            <div>
              <Label>Amount</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" className="mt-2 h-12 glass-card border-primary/30" />
            </div>
            <div>
              <Label>From</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => <SelectItem key={curr} value={curr}>{curr}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>To</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="mt-2 h-12 glass-card border-primary/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map(curr => <SelectItem key={curr} value={curr}>{curr}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button">Convert</Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Result</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">{amount} {fromCurrency} =</div>
                <div className="text-5xl font-bold gradient-text">{result}</div>
                <div className="text-2xl text-muted-foreground mt-2">{toCurrency}</div>
              </div>
              <div className="p-4 rounded-lg glass-card border border-primary/20">
                <div className="text-sm text-muted-foreground mb-2">Exchange Rate</div>
                <div className="text-xl font-bold">1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center"><div className="text-6xl mb-4">💱</div><p>Enter amount to convert</p></div>
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
          { title: "Exchange Rate Awareness", description: "This calculator uses static rates for demonstration. For financial decisions, always check current rates from your bank or exchange service." },
          { title: "Hidden Costs", description: "Actual exchanges often include fees, commissions, or less favorable rates than mid-market rates shown here. Budget accordingly." },
          { title: "Timing Matters", description: "Exchange rates fluctuate constantly. For large transactions, consider timing and potentially using limit orders with currency services." },
          { title: "Multiple Currencies", description: "For multi-currency trips or transactions, convert each currency pair separately for accuracy rather than daisy-chaining conversions." }
        ]}
        faqs={[
          { question: "How often do exchange rates change?", answer: "Real exchange rates change constantly throughout the trading day. This calculator uses static rates for demonstration. Check a live currency service for current rates." },
          { question: "Why is my actual exchange different?", answer: "Banks and exchange services add markup (spread) to mid-market rates, plus fees. The difference can be 2-5% or more. Shop around for better rates on large amounts." },
          { question: "What's the best way to exchange currency?", answer: "For travel: ATMs often offer competitive rates. For large amounts: compare banks, online services (Wise, Revolut), and currency brokers. Avoid airport exchanges." },
          { question: "Should I exchange before traveling?", answer: "Having some local currency on arrival is convenient, but you'll typically get better rates using ATMs at your destination or prepaid travel cards." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CurrencyCalculator;
