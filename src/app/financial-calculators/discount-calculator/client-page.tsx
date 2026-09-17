
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

type DiscountResult = {
  finalPrice: number;
  savings: number;
};

function computeDiscount(priceStr: string, discountStr: string): DiscountResult | null {
  const price = parseFloat(priceStr);
  const discount = parseFloat(discountStr);

  if (!(price > 0 && price <= 1e12) || isNaN(discount) || discount < 0 || discount > 100) {
    return null;
  }

  const savings = (price * discount) / 100;
  const finalPrice = price - savings;
  return { finalPrice, savings };
}

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("100");
  const [discountPercent, setDiscountPercent] = useState("25");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<DiscountResult | null>(() => computeDiscount("100", "25"));
  const { toast } = useToast();
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  const calculateDiscount = () => {
    const computed = computeDiscount(originalPrice, discountPercent);

    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter price (1+) and a discount between 0 and 100%.",
      });
      return;
    }
    setResult(computed);
    toast({
      title: "Discount Calculated",
      description: `You save ${currencySymbol}${fmt(computed.savings)} and pay ${currencySymbol}${fmt(computed.finalPrice)}.`,
    });
  };

  const reset = () => { setOriginalPrice(""); setDiscountPercent(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Discount: ${discountPercent}% off ${currencySymbol}${fmt(parseFloat(originalPrice))} → Pay ${currencySymbol}${fmt(result.finalPrice)}, Save ${currencySymbol}${fmt(result.savings)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const explanation = (
    <div className="space-y-4 text-left">
      <p>
        <strong>Discount Calculator</strong> helps you quickly find out how much you'll save 
        and what you'll pay after applying a percentage discount.
      </p>
      <div className="space-y-2">
        <p className="font-semibold">How it works:</p>
        <ul className="space-y-1 ml-4" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li><span className="font-semibold">Original Price:</span> The price before discount</li>
          <li><span className="font-semibold">Discount %:</span> Percentage off the original price</li>
          <li><span className="font-semibold">Savings:</span> Amount you save with the discount</li>
          <li><span className="font-semibold">Final Price:</span> What you actually pay</li>
        </ul>
      </div>
      <p className="text-sm">
        Perfect for shopping, sales events, and comparing deals across stores. 
        Always verify the final price at checkout as additional taxes or fees may apply.
      </p>
    </div>
  );

  return (
    <CalculatorLayout
      title="Discount Calculator"
      description="Calculate your savings and final price after discount"
      canonicalUrl="/financial-calculators/discount-calculator"
      explanation={explanation}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Input Section */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 font-headline">Enter Details</h2>
          <div className="space-y-4">
            <CurrencySelector value={currency} onChange={setCurrency} />
            <div>
              <Label htmlFor="originalPrice" className="text-sm font-medium">Original Price ({currencySymbol})</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="e.g., 99.99"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="mt-2 h-10 text-sm bg-white border border-neutral-200"
              />
            </div>

            <div>
              <Label htmlFor="discount" className="text-sm font-medium">Discount Percentage (%)</Label>
              <Input
                id="discount"
                type="number"
                placeholder="e.g., 25"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="mt-2 h-10 text-sm bg-white border border-neutral-200"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={calculateDiscount}
                className="flex-1 h-10 text-sm gradient-button"
              >
                Calculate Discount
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Discount Buttons */}
            <div className="pt-4 border-t border-[#F2765E]/20">
              <p className="text-sm text-neutral-600 mb-3">Quick discounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 25, 30, 40, 50, 60, 75].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setDiscountPercent(percent.toString());
                        if (originalPrice) {
                            const computed = computeDiscount(originalPrice, percent.toString());
                            if (computed) {
                                setResult(computed);
                            }
                        }
                    }}
                    className="bg-white border border-neutral-200 border-[#F2765E]/20 hover:border-[#F2765E]"
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold font-headline">Your Savings</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">You Pay</div>
                <div className="text-4xl font-bold mb-2 gradient-text">
                  {currencySymbol}{fmt(result.finalPrice)}
                </div>
                <div className="text-lg text-green-600 font-semibold">
                  You Save {currencySymbol}{fmt(result.savings)}
                </div>
              </div>

              <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                      <span className="text-neutral-600">Original Price</span>
                      <span className="font-bold text-lg">{currencySymbol}{fmt(parseFloat(originalPrice))}</span>
                </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                     <span className="text-neutral-600">Discount</span>
                     <span className="font-bold text-lg">{discountPercent}%</span>
                </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 text-green-600">
                      <span >Total Savings</span>
                      <span className="font-bold text-lg">{currencySymbol}{fmt(result.savings)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center">
                <div className="text-4xl mb-2">🏷️</div>
                <p>Enter details to calculate discount</p>
              </div>
            </div>
          )}
        </Card>
      </div>
       <CalculatorContentSection
        aboutContent="The Discount Calculator helps you quickly determine the final price of an item after a percentage-based discount. It's an essential tool for savvy shoppers, helping you understand your savings and the final cost during sales events."
        useCases={[
          { title: "Shopping Sales", description: "Quickly calculate the sale price of items during clearance events or holiday sales." },
          { title: "Comparing Deals", description: "Easily compare offers from different stores to find out which discount provides the best final price." },
          { title: "Budgeting for Purchases", description: "Figure out if a discounted item fits within your budget before heading to the checkout." },
        ]}
        tips={[
          { title: "Factor in Taxes", description: "The final price shown is before sales tax. Remember to account for taxes to get the total out-of-pocket cost." },
          { title: "Double Discounts", description: "To calculate an additional discount, use the first final price as the new 'Original Price' and apply the second percentage." },
          { title: "Quick Percentages", description: "Use the quick discount buttons for common sale percentages like 25% or 50% off." },
        ]}
        faqs={[
          { question: "How do I calculate a discount percentage myself?", answer: "To find the savings, multiply the original price by the discount percentage (as a decimal). For example, $50 x 0.20 = $10 savings. To find the final price, subtract the savings from the original price: $50 - $10 = $40." },
          { question: "What if an item has a discount and I also have a coupon?", answer: "This depends on the store's policy. Usually, the percentage discount is applied first, and then the coupon's dollar amount is subtracted from the sale price. Check the coupon's fine print." },
          { question: "Is this the final price I'll pay?", answer: "Not always. This calculator doesn't include sales tax, which is added at the end. Use this as your subtotal before taxes." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default DiscountCalculator;
