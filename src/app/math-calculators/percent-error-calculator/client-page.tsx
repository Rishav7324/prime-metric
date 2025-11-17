'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const PercentErrorCalculator = () => {
  const [observedValue, setObservedValue] = useState("");
  const [trueValue, setTrueValue] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const observed = parseFloat(observedValue);
    const trueVal = parseFloat(trueValue);

    if (isNaN(observed) || isNaN(trueVal) || trueVal === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers. The true value cannot be zero.",
      });
      return;
    }

    const percentError = (Math.abs(observed - trueVal) / Math.abs(trueVal)) * 100;
    
    setResult({ percentError: percentError.toFixed(2) });

    toast({
        title: "Calculation Complete",
        description: `The percent error is ${percentError.toFixed(2)}%.`,
    });
  };

  return (
    <CalculatorLayout
      title="Percent Error Calculator"
      description="Calculate the percent error between an observed and true value."
      canonicalUrl="/math-calculators/percent-error-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Observed (Measured) Value</Label>
            <Input type="number" value={observedValue} onChange={(e) => setObservedValue(e.target.value)} placeholder="e.g., 9.8" />
          </div>
          <div>
            <Label>True (Accepted) Value</Label>
            <Input type="number" value={trueValue} onChange={(e) => setTrueValue(e.target.value)} placeholder="e.g., 10" />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate Percent Error</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Percent Error</p>
              <p className="text-3xl font-bold text-primary">{result.percentError}%</p>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Percent Error Calculator measures the difference between an experimental or observed value and a true or accepted value, expressed as a percentage. It is a common way to evaluate the accuracy of a measurement in science and engineering."
        useCases={[
            { title: "Scientific Experiments", description: "Determine the accuracy of your measurements in a chemistry or physics lab compared to theoretical values." },
            { title: "Engineering", description: "Assess the precision of a manufactured part against its design specifications." },
            { title: "Statistics", description: "Evaluate the error of a statistical estimate compared to a known population parameter." },
        ]}
        tips={[
            { title: "Absolute Value", description: "Percent error is always a positive value because it measures the magnitude of the error, not its direction." },
            { title: "Context is Key", description: "A 'good' percent error is relative. In some fields, a 5% error is acceptable, while in high-precision engineering, it might need to be less than 0.1%." },
            { title: "Identify Error Sources", description: "A high percent error can indicate issues with your measurement technique, equipment, or experimental setup." },
        ]}
        faqs={[
            { question: "What is percent error?", answer: "Percent error is a measure of how close a measured value is to a true or accepted value. It's calculated as the absolute difference between the two values, divided by the true value, multiplied by 100." },
            { question: "What's the difference between percent error and percent difference?", answer: "Percent error compares a measured value to a known true value. Percent difference is used when you are comparing two experimental measurements to each other, and there is no known true value." },
            { question: "Can percent error be negative?", answer: "No, because the formula uses the absolute value of the difference. It only measures the size of the error, not whether you were over or under the true value." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentErrorCalculator;

    