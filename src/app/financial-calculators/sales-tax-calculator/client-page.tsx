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

type SalesTaxResult = { taxAmount: number; totalPrice: number; price: number };

function computeSalesTax(priceStr: string, taxRateStr: string): SalesTaxResult | null {
  const p = parseFloat(priceStr);
  const ratePct = parseFloat(taxRateStr);
  if (!(p >= 0 && p <= 1e12) || isNaN(ratePct) || ratePct < 0 || ratePct > 100) {
    return null;
  }
  const rate = ratePct / 100;
  const taxAmount = p * rate;
  const totalPrice = p + taxAmount;
  return { taxAmount, totalPrice, price: p };
}

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState("99.99");
  const [taxRate, setTaxRate] = useState("8");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<SalesTaxResult | null>(() => computeSalesTax("99.99", "8"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculate = () => {
    const computed = computeSalesTax(price, taxRate);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter a valid price (0 to 1,000,000,000,000) and tax rate (0-100%).",
      });
      return;
    }

    setResult(computed);

    toast({
        title: "Tax Calculated",
        description: `The total price is ${currencySymbol}${fmt(computed.totalPrice)}.`,
    });
  };

  const reset = () => { setPrice(""); setTaxRate(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Sales tax: price ${currencySymbol}${fmt(result.price)}, tax ${currencySymbol}${fmt(result.taxAmount)}, total ${currencySymbol}${fmt(result.totalPrice)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Sales Tax Calculator"
      description="Calculate sales tax and total price for a purchase."
      canonicalUrl="/financial-calculators/sales-tax-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label>Pre-Tax Price ({currencySymbol})</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g., 99.99" />
            </div>
            <div className="col-span-1 md:col-span-2">
              <Label>Sales Tax Rate (%)</Label>
              <Input type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} placeholder="e.g., 8.25" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Total Price</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="flex justify-end">
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="p-4 bg-[#FFF5F2] rounded-lg text-center">
                <p className="text-sm text-neutral-600">Total Price (including tax)</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{fmt(result.totalPrice)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">Sales Tax Amount</p>
                <p className="text-lg font-bold">{currencySymbol}{fmt(result.taxAmount)}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Sales Tax Calculator helps you quickly determine the total cost of a purchase, including sales tax. Simply enter the pre-tax price and the local sales tax rate to find out how much tax you'll pay and what the final price will be."
        useCases={[
            { title: "Shopping", description: "Know the final price of an item before you get to the checkout." },
            { title: "Budgeting", description: "Accurately budget for large purchases by including the cost of sales tax." },
            { title: "Business Invoicing", description: "Correctly calculate the sales tax to add to an invoice for a customer." },
        ]}
        tips={[
            { title: "Tax Rates Vary", description: "Sales tax rates can vary significantly by state, county, and even city. Make sure you are using the correct rate for your location." },
            { title: "Tax-Exempt Items", description: "Some items, like groceries or clothing, may be exempt from sales tax or taxed at a lower rate in certain areas." },
            { title: "Online Purchases", description: "Sales tax for online purchases is typically based on the shipping address, not where the company is located." },
        ]}
        faqs={[
            { question: "What is sales tax?", answer: "Sales tax is a tax paid to a governing body for the sales of certain goods and services. It is usually a percentage of the purchase price." },
            { question: "How do I find my local sales tax rate?", answer: "You can usually find your local sales tax rate on your state or city's department of revenue website. A quick web search for '[Your City] sales tax rate' often works too." },
            { question: "What is the difference between sales tax and VAT?", answer: "Sales tax is typically only applied to the final sale to the consumer. A Value-Added Tax (VAT) is collected at every stage of production and distribution. The final price to the consumer usually has the VAT included." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SalesTaxCalculator;

    