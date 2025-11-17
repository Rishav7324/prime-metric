'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const TriangleCalculator = () => {
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || a <= 0 || isNaN(b) || b <= 0 || isNaN(c) || c <= 0) {
      toast({ title: "Error", description: "Please enter positive lengths for all three sides.", variant: "destructive" });
      return;
    }

    // Triangle inequality theorem
    if (a + b <= c || a + c <= b || b + c <= a) {
      toast({ title: "Error", description: "These side lengths do not form a valid triangle.", variant: "destructive" });
      setResult(null);
      return;
    }

    const perimeter = a + b + c;
    const s = perimeter / 2; // semi-perimeter
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula

    // Law of Cosines to find angles
    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    setResult({
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      angleA: angleA.toFixed(2),
      angleB: angleB.toFixed(2),
      angleC: angleC.toFixed(2),
    });

    toast({ title: "Success", description: "Triangle properties calculated." });
  };

  return (
    <CalculatorLayout
      title="Triangle Calculator"
      description="Calculate area, perimeter, and angles of a triangle given its side lengths."
      canonicalUrl="/math-calculators/triangle-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Enter the lengths of the three sides of the triangle.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Side a</Label>
              <Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="Length of side a" />
            </div>
            <div>
              <Label>Side b</Label>
              <Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="Length of side b" />
            </div>
            <div>
              <Label>Side c</Label>
              <Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} placeholder="Length of side c" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">Calculate</Button>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-primary/10 rounded text-center">
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="text-xl font-bold text-primary">{result.area}</p>
                </div>
                 <div className="p-3 bg-muted/50 rounded text-center">
                    <p className="text-sm text-muted-foreground">Perimeter</p>
                    <p className="text-xl font-bold">{result.perimeter}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Angle A</p>
                  <p className="text-lg font-bold">{result.angleA}°</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Angle B</p>
                  <p className="text-lg font-bold">{result.angleB}°</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Angle C</p>
                  <p className="text-lg font-bold">{result.angleC}°</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Triangle Calculator is a comprehensive tool that solves for the area, perimeter, and angles of a triangle when given the lengths of all three sides. It uses Heron's formula to find the area and the Law of Cosines to determine the angles."
        useCases={[
            { title: "Geometry Homework", description: "Quickly solve for all properties of a triangle for math assignments." },
            { title: "Construction and DIY", description: "Calculate angles and area for projects that involve triangular shapes, such as building a truss or cutting a piece of land." },
            { title: "Land Surveying", description: "Estimate the area and angles of a triangular plot of land from its side measurements." },
        ]}
        tips={[
            { title: "Triangle Inequality Theorem", description: "For any three lengths to form a valid triangle, the sum of the lengths of any two sides must be greater than the length of the third side." },
            { title: "Units", description: "Ensure all side lengths are in the same unit. The area will be in square units, and the perimeter will be in linear units." },
            { title: "Angle Sum", description: "The sum of the three angles in any triangle always equals 180 degrees. You can use this to check your results." },
        ]}
        faqs={[
            { question: "What is Heron's formula?", answer: "Heron's formula allows you to calculate the area of a triangle given the lengths of its three sides. It uses the semi-perimeter (s), which is half the perimeter: Area = √[s(s-a)(s-b)(s-c)]." },
            { question: "What is the Law of Cosines?", answer: "The Law of Cosines relates the lengths of the sides of a triangle to the cosine of one of its angles. It's used here to find the angles when all three sides are known. c² = a² + b² - 2ab*cos(C)." },
            { question: "Can this calculator solve for a missing side?", answer: "This specific calculator requires all three sides to be known. To solve for a missing side, you would need to know at least two sides and an angle, or use a tool like the Pythagorean Theorem Calculator for right-angled triangles." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default TriangleCalculator;

    