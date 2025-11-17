
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const DiscountCalculator = () => {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [result, setResult] = useState<{
    finalPrice: number;
    savings: number;
  } | null>(null);
  const { toast } = useToast();

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (price > 0 && discount >= 0 && discount <= 100) {
      const savings = (price * discount) / 100;
      const finalPrice = price - savings;

      const newResult = {
        finalPrice: parseFloat(finalPrice.toFixed(2)),
        savings: parseFloat(savings.toFixed(2)),
      };
      setResult(newResult);
      toast({
        title: "Discount Calculated",
        description: `You save $${newResult.savings.toFixed(2)} and pay $${newResult.finalPrice.toFixed(2)}.`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid price and a discount between 0 and 100.",
      });
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
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Enter Details</h2>
          <div className="space-y-6">
            <div>
              <Label htmlFor="originalPrice" className="text-lg">Original Price ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="e.g., 99.99"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <div>
              <Label htmlFor="discount" className="text-lg">Discount Percentage (%)</Label>
              <Input
                id="discount"
                type="number"
                placeholder="e.g., 25"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="mt-2 h-12 text-lg glass-card border-primary/30"
              />
            </div>

            <Button 
              onClick={calculateDiscount}
              className="w-full h-12 text-lg gradient-button"
              disabled={!originalPrice || !discountPercent}
            >
              Calculate Discount
            </Button>

            {/* Quick Discount Buttons */}
            <div className="pt-4 border-t border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">Quick discounts:</p>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 25, 30, 40, 50, 60, 75].map((percent) => (
                  <Button
                    key={percent}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        setDiscountPercent(percent.toString());
                        if (originalPrice) {
                            const price = parseFloat(originalPrice);
                            if(price > 0){
                                const savings = (price * percent) / 100;
                                const finalPrice = price - savings;
                                setResult({
                                    finalPrice: parseFloat(finalPrice.toFixed(2)),
                                    savings: parseFloat(savings.toFixed(2)),
                                });
                            }
                        }
                    }}
                    className="glass-card border-primary/20 hover:border-primary"
                  >
                    {percent}%
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Result Section */}
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 font-headline">Your Savings</h2>
          {result ? (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="text-sm text-muted-foreground mb-2">You Pay</div>
                <div className="text-6xl font-bold mb-4 gradient-text">
                  ${result.finalPrice.toFixed(2)}
                </div>
                <div className="text-lg text-green-400 font-semibold">
                  You Save ${result.savings.toFixed(2)}
                </div>
              </div>

              <div className="space-y-4">
                 <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Original Price</span>
                    <span className="font-bold text-lg">${parseFloat(originalPrice).toFixed(2)}</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-bold text-lg">{discountPercent}%</span>
                </div>
                 <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10 text-green-400">
                    <span >Total Savings</span>
                    <span className="font-bold text-lg">${result.savings.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <div className="text-6xl mb-4">🏷️</div>
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
