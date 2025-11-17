'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const PercentageCalculator = () => {
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [result1, setResult1] = useState("");
  const [result2, setResult2] = useState("");
  const [result3, setResult3] = useState("");
  const { toast } = useToast();

  const calculate1 = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2)) {
      setResult1(((v1 / 100) * v2).toFixed(2));
      toast({title: "Success", description: "Calculation complete."})
    } else {
      toast({title: "Error", description: "Invalid input.", variant: "destructive"})
    }
  };

  const calculate2 = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2) && v2 !== 0) {
      setResult2(((v1 / v2) * 100).toFixed(2) + "%");
      toast({title: "Success", description: "Calculation complete."})
    } else {
       toast({title: "Error", description: "Invalid input.", variant: "destructive"})
    }
  };
  
  const calculate3 = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (!isNaN(v1) && !isNaN(v2) && v1 !== 0) {
      setResult3((((v2 - v1) / v1) * 100).toFixed(2) + "%");
      toast({title: "Success", description: "Calculation complete."})
    } else {
       toast({title: "Error", description: "Invalid input.", variant: "destructive"})
    }
  };


  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="A versatile tool to handle all your percentage calculations."
      canonicalUrl="/math-calculators/percentage-calculator"
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">1. What is X% of Y?</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>X (%)</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="e.g., 20" />
            </div>
             <div className="flex-1">
              <Label>Y</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="e.g., 500" />
            </div>
            <Button onClick={calculate1}>Calculate</Button>
          </div>
          {result1 && <div className="mt-4 p-2 bg-muted rounded-lg text-center font-bold">{result1}</div>}
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">2. X is what percent of Y?</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>X</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="e.g., 100" />
            </div>
             <div className="flex-1">
              <Label>Y</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="e.g., 500" />
            </div>
            <Button onClick={calculate2}>Calculate</Button>
          </div>
          {result2 && <div className="mt-4 p-2 bg-muted rounded-lg text-center font-bold">{result2}</div>}
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">3. Percentage Increase/Decrease</h3>
           <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label>Initial Value</Label>
              <Input type="number" value={val1} onChange={e => setVal1(e.target.value)} placeholder="e.g., 100" />
            </div>
             <div className="flex-1">
              <Label>Final Value</Label>
              <Input type="number" value={val2} onChange={e => setVal2(e.target.value)} placeholder="e.g., 120" />
            </div>
            <Button onClick={calculate3}>Calculate</Button>
          </div>
          {result3 && <div className="mt-4 p-2 bg-muted rounded-lg text-center font-bold">{result3}</div>}
        </Card>
      </div>
      <CalculatorContentSection
        aboutContent="The Percentage Calculator is a versatile tool for handling all types of percentage-based problems. Whether you need to find a percentage of a number, determine what percentage one number is of another, or calculate percentage increase or decrease, this tool has you covered."
        useCases={[
          { title: "Shopping Discounts", description: "Quickly calculate how much you'll save during a sale (e.g., 25% off a $80 item)." },
          { title: "Calculating Tips", description: "Easily figure out how much to tip at a restaurant (e.g., 18% of a $55 bill)." },
          { title: "Financial Analysis", description: "Calculate percentage changes in stock prices, revenue, or other financial metrics." },
          { title: "Academic Grades", description: "Determine your score on a test as a percentage (e.g., 45 correct answers out of 50 questions)." },
        ]}
        tips={[
          { title: "Understanding 'Of'", description: "In math, the word 'of' almost always means 'multiply'. So, '20% of 50' means '0.20 × 50'." },
          { title: "Decimal Conversion", description: "To convert a percentage to a decimal, divide by 100 (e.g., 25% becomes 0.25). To convert a decimal to a percentage, multiply by 100." },
          { title: "Percentage Change Formula", description: "The formula for percentage change is: ((Final Value - Initial Value) / |Initial Value|) × 100." },
        ]}
        faqs={[
          { question: "How do I calculate a percentage of a number?", answer: "Convert the percentage to a decimal and multiply it by the number. For example, to find 20% of 200, you would calculate 0.20 * 200 = 40." },
          { question: "How do I find what percentage one number is of another?", answer: "Divide the first number by the second number, then multiply the result by 100. For example, to find what percentage 50 is of 200, you calculate (50 / 200) * 100 = 25%." },
          { question: "How do I calculate percentage increase?", answer: "Subtract the initial value from the final value, divide by the initial value, and multiply by 100. For example, if a price goes from $10 to $12, the increase is (($12 - $10) / $10) * 100 = 20%." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PercentageCalculator;

    