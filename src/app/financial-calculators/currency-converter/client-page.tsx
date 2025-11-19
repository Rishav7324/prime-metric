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

const CurrencyCalculator = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<string | null>(null);
  const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/47d21e70f7f01c637fbd6d49/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
          setRates(data.conversion_rates);
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
      });
  }, [toast]);

  const calculate = () => {
    const amt = parseFloat(amount);
    if (amt > 0 && rates) {
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
        description: "Please enter a valid amount to convert or wait for rates to load.",
      });
    }
  };

  const currencyOptions = currencies.map(c => ({ value: c.code, label: c.name }));

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
                  {currencyOptions.map(curr => <SelectItem key={curr.value} value={curr.value}>{curr.value} - {curr.label}</SelectItem>)}
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
                  {currencyOptions.map(curr => <SelectItem key={curr.value} value={curr.value}>{curr.value} - {curr.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={calculate} className="w-full h-12 gradient-button" disabled={!rates}>
              {rates ? 'Convert' : 'Loading Rates...'}
            </Button>
          </div>
        </Card>

        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Result</h2>
          {result && rates ? (
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
