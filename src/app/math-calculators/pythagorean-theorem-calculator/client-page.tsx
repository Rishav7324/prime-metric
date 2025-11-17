'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const PythagoreanCalculator = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (sideA && sideB && !sideC) {
      if (a > 0 && b > 0) {
        const c_squared = a*a + b*b;
        const newC = Math.sqrt(c_squared);
        setSideC(newC.toFixed(4));
        setResult(`Side C (Hypotenuse) = ${newC.toFixed(4)}`);
        toast({ title: "Success", description: "Calculated side C."});
      } else {
        toast({ title: "Error", description: "Sides A and B must be positive.", variant: "destructive"});
      }
    } else if (sideA && sideC && !sideB) {
        if (a > 0 && c > 0 && c > a) {
            const b_squared = c*c - a*a;
            const newB = Math.sqrt(b_squared);
            setSideB(newB.toFixed(4));
            setResult(`Side B = ${newB.toFixed(4)}`);
            toast({ title: "Success", description: "Calculated side B."});
        } else {
            toast({ title: "Error", description: "Side A must be positive and smaller than Side C.", variant: "destructive"});
        }
    } else if (sideB && sideC && !sideA) {
        if (b > 0 && c > 0 && c > b) {
            const a_squared = c*c - b*b;
            const newA = Math.sqrt(a_squared);
            setSideA(newA.toFixed(4));
            setResult(`Side A = ${newA.toFixed(4)}`);
            toast({ title: "Success", description: "Calculated side A."});
        } else {
            toast({ title: "Error", description: "Side B must be positive and smaller than Side C.", variant: "destructive"});
        }
    } else {
        toast({ title: "Invalid Input", description: "Please provide exactly two sides to calculate the third.", variant: "destructive" });
    }
  };

  const clear = () => {
    setSideA("");
    setSideB("");
    setSideC("");
    setResult("");
  }

  return (
    <CalculatorLayout
      title="Pythagorean Theorem Calculator"
      description="Calculate the missing side of a right-angled triangle."
      canonicalUrl="/math-calculators/pythagorean-theorem-calculator"
      formula="a² + b² = c²"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter values for any two sides to calculate the third.</p>
          <div>
            <Label>Side a</Label>
            <Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="Enter length of side a" />
          </div>
          <div>
            <Label>Side b</Label>
            <Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="Enter length of side b" />
          </div>
          <div>
            <Label>Side c (Hypotenuse)</Label>
            <Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} placeholder="Enter length of side c" />
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate</Button>
            <Button onClick={clear} variant="outline" className="flex-1">Clear</Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Pythagorean Theorem Calculator finds the missing side of a right-angled triangle based on the lengths of the other two sides. The theorem, a² + b² = c², is a fundamental principle in geometry where 'a' and 'b' are the lengths of the two legs, and 'c' is the length of the hypotenuse (the side opposite the right angle)."
        useCases={[
            { title: "Construction and Carpentry", description: "Ensure corners are perfectly square (90 degrees) by measuring the sides and diagonal of a frame." },
            { title: "Navigation", description: "Calculate the straight-line distance between two points on a grid by treating the horizontal and vertical distances as the triangle's legs." },
            { title: "Geometry Homework", description: "Quickly solve for the missing side of a right triangle in academic problems." },
        ]}
        tips={[
            { title: "Identify the Hypotenuse", description: "The hypotenuse (side 'c') is always the longest side and is opposite the right angle. When solving for a leg ('a' or 'b'), make sure 'c' is the largest value." },
            { title: "Units", description: "Ensure all measurements are in the same unit (e.g., inches, centimeters). The result will be in that same unit." },
            { title: "Real-World Application", description: "When measuring a TV screen, the advertised size (e.g., 55 inches) is the diagonal (hypotenuse). You can use the theorem to find its actual height and width if you know the aspect ratio." },
        ]}
        faqs={[
            { question: "What is the Pythagorean theorem?", answer: "It's a formula relating the three sides of a right-angled triangle: a² + b² = c², where 'a' and 'b' are the legs and 'c' is the hypotenuse." },
            { question: "Can this be used for any triangle?", answer: "No, the Pythagorean theorem only applies to right-angled triangles (triangles with one 90-degree angle)." },
            { question: "What is a 'Pythagorean Triple'?", answer: "A Pythagorean triple is a set of three positive integers (a, b, c) that perfectly satisfy the theorem, such as (3, 4, 5) or (5, 12, 13)." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PythagoreanCalculator;

    