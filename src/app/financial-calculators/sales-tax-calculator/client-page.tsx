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

const SalesTaxCalculator = () => {
  const [price, setPrice] = useState("");
  const [taxRate, setTaxRate] = useState("8");
  const [currency, setCurrency] = useState("USD");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const calculate = () => {
    const p = parseFloat(price);
    const rate = parseFloat(taxRate) / 100;

    if (isNaN(p) || p < 0 || isNaN(rate) || rate < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid price and tax rate.",
      });
      return;
    }

    const taxAmount = p * rate;
    const totalPrice = p + taxAmount;

    setResult({
      taxAmount: taxAmount.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
    });

    toast({
        title: "Tax Calculated",
        description: `The total price is ${currencySymbol}${totalPrice.toFixed(2)}.`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">Calculate Total Price</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Total Price (including tax)</p>
                <p className="text-3xl font-bold text-primary">{currencySymbol}{result.totalPrice}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-muted-foreground">Sales Tax Amount</p>
                <p className="text-lg font-bold">{currencySymbol}{result.taxAmount}</p>
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

    