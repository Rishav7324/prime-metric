'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const RatioCalculator = () => {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();
  
  const gcd = (x: number, y: number): number => {
    return y === 0 ? x : gcd(y, x % y);
  };
  
  const solveForX = () => {
    const valA = parseFloat(a);
    const valB = parseFloat(b);
    const valC = parseFloat(c);
    
    if(!isNaN(valA) && !isNaN(valB) && !isNaN(valC)) {
      if (valA === 0) {
        toast({title: "Error", description: "Value A cannot be zero in a proportion.", variant: "destructive"});
        return;
      }
      const x = (valB * valC) / valA;
      setD(x.toFixed(4));
      setResult(`${a}:${b} = ${c}:${x.toFixed(4)}`);
      toast({title: "Success", description: `Calculated missing value: ${x.toFixed(4)}`});
    } else {
      toast({title: "Error", description: "Please enter numbers for A, B, and C.", variant: "destructive"});
    }
  }
  
  const simplifyRatio = () => {
      const valA = parseInt(a);
      const valB = parseInt(b);
      
      if(!isNaN(valA) && !isNaN(valB) && valA > 0 && valB > 0) {
          const divisor = gcd(valA, valB);
          const simplifiedA = valA / divisor;
          const simplifiedB = valB / divisor;
          setResult(`Simplified ratio is ${simplifiedA}:${simplifiedB}`);
          toast({title: "Success", description: "Ratio simplified."});
      } else {
          toast({title: "Error", description: "Please enter positive integers for A and B to simplify.", variant: "destructive"});
      }
  }

  return (
    <CalculatorLayout
      title="Ratio Calculator"
      description="Simplify ratios and solve for missing values in proportions."
      canonicalUrl="/math-calculators/ratio-calculator"
    >
      <div className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Solve for X in a Proportion (A:B = C:X)</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1"><Label>A</Label><Input value={a} onChange={e=>setA(e.target.value)} placeholder="A" /></div>
            <div className="flex-1"><Label>B</Label><Input value={b} onChange={e=>setB(e.target.value)} placeholder="B" /></div>
            <div className="flex-1"><Label>C</Label><Input value={c} onChange={e=>setC(e.target.value)} placeholder="C" /></div>
            <div className="flex-1"><Label>X (Result)</Label><Input value={d} readOnly placeholder="X" /></div>
            <Button onClick={solveForX}>Solve</Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Simplify a Ratio (A:B)</h3>
          <div className="flex items-end gap-2">
            <div className="flex-1"><Label>A</Label><Input value={a} onChange={e=>setA(e.target.value)} placeholder="e.g., 10" /></div>
            <div className="flex-1"><Label>B</Label><Input value={b} onChange={e=>setB(e.target.value)} placeholder="e.g., 20" /></div>
            <Button onClick={simplifyRatio}>Simplify</Button>
          </div>
        </Card>
        
        {result && <div className="mt-4 p-4 bg-muted rounded-lg text-center font-bold text-xl">{result}</div>}
      </div>
      
       <CalculatorContentSection
        aboutContent="The Ratio Calculator is a versatile tool for working with ratios and proportions. It can simplify a ratio to its lowest terms or solve for a missing value in a proportion (e.g., A:B = C:X). Ratios are used to compare the relative sizes of two or more values."
        useCases={[
            { title: "Scaling Recipes", description: "If a recipe for 4 people requires 2 cups of flour, use the ratio calculator to find out how much you need for 6 people." },
            { title: "Map Scaling", description: "Convert distances on a map to real-world distances using the map's scale (e.g., 1 inch = 10 miles)." },
            { title: "Image Resizing", description: "Maintain the aspect ratio of an image when resizing. If you have a 1920x1080 (16:9) image and want the new width to be 800px, you can calculate the new height." },
        ]}
        tips={[
            { title: "Proportions", description: "A proportion is an equation stating that two ratios are equal. The calculator solves for 'X' using cross-multiplication." },
            { title: "Simplifying Ratios", description: "To simplify a ratio, the calculator finds the greatest common divisor (GCD) of the two numbers and divides both by it." },
            { title: "Units", description: "When using ratios, make sure the units are consistent. For example, when scaling a recipe, don't mix cups and liters unless you convert them first." },
        ]}
        faqs={[
            { question: "What is a ratio?", answer: "A ratio is a comparison of two quantities. It can be written with a colon (e.g., 3:4), as a fraction (3/4), or with the word 'to' (3 to 4)." },
            { question: "What is a proportion?", answer: "A proportion is an equation that states that two ratios are equal. For example, 1:2 = 2:4 is a proportion." },
            { question: "How do you solve a proportion for a missing value?", answer: "You use cross-multiplication. For a proportion a/b = c/x, you multiply a by x and b by c, so ax = bc. Then you solve for x: x = (bc)/a." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default RatioCalculator;

    