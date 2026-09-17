'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type TriangleResult = {
  area: number;
  perimeter: number;
  angleA: number;
  angleB: number;
  angleC: number;
};

const MAX_SIDE = 1000000;

function clampCos(v: number): number {
  return Math.min(1, Math.max(-1, v));
}

function computeTriangle(aStr: string, bStr: string, cStr: string): TriangleResult | null {
  if (aStr.trim() === "" || bStr.trim() === "" || cStr.trim() === "") return null;
  const a = parseFloat(aStr);
  const b = parseFloat(bStr);
  const c = parseFloat(cStr);
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) return null;
  if (a <= 0 || b <= 0 || c <= 0) return null;
  if (a > MAX_SIDE || b > MAX_SIDE || c > MAX_SIDE) return null;

  // Triangle inequality theorem
  if (a + b <= c || a + c <= b || b + c <= a) return null;

  const perimeter = a + b + c;
  const s = perimeter / 2; // semi-perimeter
  const areaSquared = s * (s - a) * (s - b) * (s - c);
  if (!Number.isFinite(areaSquared) || areaSquared <= 0) return null;
  const area = Math.sqrt(areaSquared); // Heron's formula
  if (!Number.isFinite(area)) return null;

  // Law of Cosines to find angles
  const angleA = Math.acos(clampCos((b * b + c * c - a * a) / (2 * b * c))) * (180 / Math.PI);
  const angleB = Math.acos(clampCos((a * a + c * c - b * b) / (2 * a * c))) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;
  if (!Number.isFinite(angleA) || !Number.isFinite(angleB) || !Number.isFinite(angleC)) return null;

  return { area, perimeter, angleA, angleB, angleC };
}

function formatMeasure(n: number): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEFAULT_A = "3";
const DEFAULT_B = "4";
const DEFAULT_C = "5";

const TriangleCalculator = () => {
  const [sideA, setSideA] = useState(DEFAULT_A);
  const [sideB, setSideB] = useState(DEFAULT_B);
  const [sideC, setSideC] = useState(DEFAULT_C);
  // Pre-filled so the result renders instantly (no empty state, no toast on init)
  const [result, setResult] = useState<TriangleResult | null>(() => computeTriangle(DEFAULT_A, DEFAULT_B, DEFAULT_C));
  const { toast } = useToast();

  const calculate = () => {
    if (sideA.trim() === "" || sideB.trim() === "" || sideC.trim() === "") {
      toast({ title: "Invalid Input", description: "Please enter positive lengths for all three sides.", variant: "destructive" });
      return;
    }
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
      toast({ title: "Invalid Input", description: "Side lengths must be valid numbers.", variant: "destructive" });
      return;
    }
    if (a <= 0 || b <= 0 || c <= 0) {
      toast({ title: "Invalid Input", description: "Please enter positive lengths for all three sides.", variant: "destructive" });
      return;
    }
    if (a > MAX_SIDE || b > MAX_SIDE || c > MAX_SIDE) {
      toast({ title: "Invalid Input", description: `Each side must be between 0 and ${MAX_SIDE.toLocaleString()}.`, variant: "destructive" });
      return;
    }

    // Triangle inequality theorem
    if (a + b <= c || a + c <= b || b + c <= a) {
      toast({ title: "Invalid Triangle", description: "These side lengths do not form a valid triangle (sum of any two sides must exceed the third).", variant: "destructive" });
      setResult(null);
      return;
    }

    const computed = computeTriangle(sideA, sideB, sideC);
    if (!computed) {
      toast({ title: "Invalid Input", description: "Could not calculate a triangle with these side lengths.", variant: "destructive" });
      setResult(null);
      return;
    }

    setResult(computed);

    toast({ title: "Triangle Calculated", description: `Area is ${formatMeasure(computed.area)} sq units.` });
  };

  const reset = () => {
    setSideA("");
    setSideB("");
    setSideC("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Triangle (${Number(sideA).toLocaleString()}, ${Number(sideB).toLocaleString()}, ${Number(sideC).toLocaleString()}): Area ${formatMeasure(result.area)}, Perimeter ${formatMeasure(result.perimeter)}, Angles ${formatMeasure(result.angleA)}°, ${formatMeasure(result.angleB)}°, ${formatMeasure(result.angleC)}° — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Triangle Calculator"
      description="Calculate area, perimeter, and angles of a triangle given its side lengths."
      canonicalUrl="/math-calculators/triangle-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">Enter the lengths of the three sides of the triangle.</p>
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-black">Your Result</h2>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FFF5F2] rounded text-center">
                     <p className="text-sm text-neutral-600">Area</p>
                     <p className="text-xl font-bold text-primary">{formatMeasure(result.area)}</p>
                </div>
                  <div className="p-3 bg-muted/50 rounded text-center">
                     <p className="text-sm text-neutral-600">Perimeter</p>
                     <p className="text-xl font-bold">{formatMeasure(result.perimeter)}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Angle A</p>
                  <p className="text-lg font-bold">{formatMeasure(result.angleA)}°</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Angle B</p>
                  <p className="text-lg font-bold">{formatMeasure(result.angleB)}°</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Angle C</p>
                  <p className="text-lg font-bold">{formatMeasure(result.angleC)}°</p>
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

    