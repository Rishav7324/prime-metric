'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const StandardDeviationCalculator = () => {
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

    if (numArray.length < 2) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter at least two valid numbers.",
      });
      return;
    }

    const n = numArray.length;
    const mean = numArray.reduce((a, b) => a + b) / n;
    const variance = numArray.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (n - 1); // Sample variance
    const stdDev = Math.sqrt(variance);

    setResult({
      mean: mean.toFixed(4),
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4),
      count: n
    });
    
    toast({
        title: "Calculation Complete",
        description: `The standard deviation is ${stdDev.toFixed(4)}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Standard Deviation Calculator"
      description="Calculate standard deviation, variance, and mean for a data set."
      canonicalUrl="/math-calculators/standard-deviation-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Enter numbers (comma-separated)</Label>
            <Input value={numbers} onChange={(e) => setNumbers(e.target.value)} placeholder="e.g., 2, 4, 4, 4, 5, 5, 7, 9" />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Standard Deviation (Sample)</p>
                <p className="text-3xl font-bold text-primary">{result.stdDev}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Mean</p>
                  <p className="text-lg font-bold">{result.mean}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Variance</p>
                  <p className="text-lg font-bold">{result.variance}</p>
                </div>
                 <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Count</p>
                  <p className="text-lg font-bold">{result.count}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Standard Deviation Calculator computes the standard deviation, variance, and mean of a set of numbers. Standard deviation is a measure of the amount of variation or dispersion of a set of values. A low standard deviation indicates that the values tend to be close to the mean, while a high standard deviation indicates that the values are spread out over a wider range."
        useCases={[
            { title: "Statistical Analysis", description: "Measure the volatility of a stock's returns or the dispersion of data in a scientific experiment." },
            { title: "Quality Control", description: "Monitor the consistency of a manufacturing process by measuring the variation in product specifications." },
            { title: "Academic Research", description: "Analyze the spread of data in research studies to determine the reliability of results." },
        ]}
        tips={[
            { title: "Sample vs. Population", description: "This calculator computes the 'sample' standard deviation (dividing by n-1), which is the most common type and is used when your data is a sample of a larger population. " },
            { title: "Interpreting the Result", description: "A smaller standard deviation means your data points are clustered closely around the average. A larger value means they are more spread out." },
            { title: "Relationship to Variance", description: "The standard deviation is simply the square root of the variance. Variance is another measure of spread, but it's in squared units, making standard deviation often easier to interpret." },
        ]}
        faqs={[
            { question: "What is standard deviation?", answer: "It's a statistical measure of how spread out numbers are from the average (mean). A low standard deviation indicates that the numbers are close to the mean, while a high standard deviation indicates that the numbers are spread out." },
            { question: "What is the difference between sample and population standard deviation?", answer: "You use sample standard deviation when your data is a sample of a larger group. You use population standard deviation when you have data for the entire group. The formulas are slightly different (dividing by n-1 for sample, and by N for population)." },
            { question: "Why is standard deviation important?", answer: "It provides a standardized way to understand the variability of a data set. It's widely used in finance to measure risk, in science to measure the precision of experiments, and in many other fields." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default StandardDeviationCalculator;

    