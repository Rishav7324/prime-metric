
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type AreaResult = { area: number };

function computeArea(shape: string, dim1Str: string, dim2Str: string): AreaResult | null {
  const d1 = parseFloat(dim1Str);
  const d2 = parseFloat(dim2Str);
  const valid = (n: number) => Number.isFinite(n) && n > 0 && n <= 1_000_000;
  let out = 0;
  switch (shape) {
    case "rectangle":
      if (!valid(d1) || !valid(d2)) return null;
      out = d1 * d2;
      break;
    case "circle":
      if (!valid(d1)) return null;
      out = Math.PI * d1 * d1;
      break;
    case "triangle":
      if (!valid(d1) || !valid(d2)) return null;
      out = (d1 * d2) / 2;
      break;
    case "square":
      if (!valid(d1)) return null;
      out = d1 * d1;
      break;
    default:
      return null;
  }
  return Number.isFinite(out) ? { area: out } : null;
}

function defaultDimsForShape(shape: string): [string, string] {
  switch (shape) {
    case "rectangle": return ["10", "5"];
    case "circle": return ["5", ""];
    case "triangle": return ["10", "6"];
    case "square": return ["5", ""];
    default: return ["10", "5"];
  }
}

const AreaCalculator = () => {
  const [shape, setShape] = useState("rectangle");
  const [dim1, setDim1] = useState("10");
  const [dim2, setDim2] = useState("5");
  // Pre-filled so the result renders instantly (no empty state)
  const [area, setArea] = useState<AreaResult | null>(() => computeArea("rectangle", "10", "5"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeArea(shape, dim1, dim2);
    if (!computed) {
      const d1 = parseFloat(dim1);
      const d2 = parseFloat(dim2);
      const needsTwo = shape === "rectangle" || shape === "triangle";
      const vals = needsTwo ? [d1, d2] : [d1];
      if (vals.some((v) => !Number.isFinite(v) || isNaN(v))) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Please enter valid numbers for all dimensions.",
        });
      } else if (vals.some((v) => v <= 0)) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Dimensions must be positive numbers greater than zero.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Dimensions must be no larger than 1,000,000.",
        });
      }
      return;
    }
    setArea(computed);
    toast({
      title: "Area Calculated",
      description: `The area of the ${shape} is ${computed.area.toLocaleString(undefined, { maximumFractionDigits: 2 })}.`,
    });
  };

  const reset = () => {
    setDim1(""); setDim2(""); setArea(null);
  };

  const copyResult = async () => {
    if (!area) return;
    const text = `Area of ${shape}: ${area.area.toLocaleString(undefined, { maximumFractionDigits: 2 })} sq units — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const handleShapeChange = (value: string) => {
    setShape(value);
    const [nd1, nd2] = defaultDimsForShape(value);
    setDim1(nd1);
    setDim2(nd2);
    setArea(computeArea(value, nd1, nd2));
  };

  const getLabels = () => {
    switch (shape) {
      case "rectangle":
        return { label1: "Length", label2: "Width" };
      case "circle":
        return { label1: "Radius", label2: null };
      case "triangle":
        return { label1: "Base", label2: "Height" };
      case "square":
        return { label1: "Side", label2: null };
      default:
        return { label1: "Dimension 1", label2: "Dimension 2" };
    }
  };

  const labels = getLabels();

  return (
    <CalculatorLayout
      title="Area Calculator"
      description="Calculate area of different geometric shapes"
      keywords="area calculator, square feet calculator, triangle area, circle area, rectangle area"
      canonicalUrl="/math-calculators/area-calculator"
      explanation="Area is the measure of the two-dimensional space enclosed by a shape. Different shapes have different formulas for calculating area."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Shape</Label>
            <Select value={shape} onValueChange={handleShapeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rectangle">Rectangle</SelectItem>
                <SelectItem value="square">Square</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="triangle">Triangle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{labels.label1}</Label>
            <Input
              type="number"
              value={dim1}
              onChange={(e) => setDim1(e.target.value)}
              placeholder={`Enter ${labels.label1?.toLowerCase()}`}
            />
          </div>
          {labels.label2 && (
            <div>
              <Label>{labels.label2}</Label>
              <Input
                type="number"
                value={dim2}
                onChange={(e) => setDim2(e.target.value)}
                placeholder={`Enter ${labels.label2.toLowerCase()}`}
              />
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate Area
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {area !== null && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm text-neutral-600">Calculated Area</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary text-center">
                {area.area.toLocaleString(undefined, { maximumFractionDigits: 2 })} sq units
              </p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Area Calculator helps you calculate the two-dimensional space enclosed by various geometric shapes. Whether you're measuring a room, planning a garden, or solving math problems, this tool provides accurate area calculations for rectangles, squares, circles, and triangles."
        useCases={[
          { title: "Home Improvement", description: "Calculate flooring, carpet, or paint requirements for rooms by measuring rectangular or square spaces." },
          { title: "Landscaping", description: "Determine the area of lawns, gardens, or circular features like fountains for material estimation." },
          { title: "Construction Planning", description: "Calculate roof areas, wall spaces, or foundation sizes for building projects." },
          { title: "Academic Work", description: "Solve geometry problems and verify area calculations for homework or exams." }
        ]}
        tips={[
          { title: "Use Consistent Units", description: "Always use the same unit of measurement for all dimensions to get accurate results. Convert units before calculating if needed." },
          { title: "Add Extra for Waste", description: "When buying materials, add 5-10% extra to account for waste, cutting, and pattern matching." },
          { title: "Break Complex Shapes", description: "For irregular spaces, divide them into rectangles, squares, or triangles, calculate each area, and add them together." },
          { title: "Double-Check Measurements", description: "Measure twice to ensure accuracy, especially for costly projects like flooring or painting." }
        ]}
        faqs={[
          { question: "How do I calculate area for irregular shapes?", answer: "Break irregular shapes into multiple regular shapes (rectangles, triangles, circles), calculate each area separately, then add them together." },
          { question: "What's the difference between area and perimeter?", answer: "Area measures the space inside a shape (square units), while perimeter measures the distance around the outside (linear units)." },
          { question: "Why does circle area use π (pi)?", answer: "Pi (≈3.14159) is the mathematical constant representing the ratio of a circle's circumference to its diameter, essential for circular calculations." },
          { question: "How do I convert between square feet and square meters?", answer: "Multiply square feet by 0.0929 to get square meters, or multiply square meters by 10.764 to get square feet." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default AreaCalculator;
