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

type SlopeResult = {
  slope: number | null;
  intercept: number | null;
  vertical: boolean;
  equation: string;
};

const fmtSlope = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 4 });

function computeSlope(x1Str: string, y1Str: string, x2Str: string, y2Str: string): SlopeResult | null {
  const p1x = parseFloat(x1Str);
  const p1y = parseFloat(y1Str);
  const p2x = parseFloat(x2Str);
  const p2y = parseFloat(y2Str);
  if (![p1x, p1y, p2x, p2y].every((v) => Number.isFinite(v))) return null;
  if ([p1x, p1y, p2x, p2y].some((v) => Math.abs(v) > 1_000_000_000)) return null;
  if (p2x - p1x === 0) {
    if (p2y - p1y === 0) return null;
    return { slope: null, intercept: null, vertical: true, equation: `x = ${fmtSlope(p1x)}` };
  }
  const slope = (p2y - p1y) / (p2x - p1x);
  const yIntercept = p1y - slope * p1x;
  if (!Number.isFinite(slope) || !Number.isFinite(yIntercept)) return null;
  return {
    slope,
    intercept: yIntercept,
    vertical: false,
    equation: `y = ${fmtSlope(slope)}x + ${fmtSlope(yIntercept)}`,
  };
}

const SlopeCalculator = () => {
  const [x1, setX1] = useState("0");
  const [y1, setY1] = useState("0");
  const [x2, setX2] = useState("4");
  const [y2, setY2] = useState("2");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<SlopeResult | null>(() => computeSlope("0", "0", "4", "2"));
  const { toast } = useToast();

  const calculate = () => {
    const computed = computeSlope(x1, y1, x2, y2);
    if (!computed) {
      const vals = [parseFloat(x1), parseFloat(y1), parseFloat(x2), parseFloat(y2)];
      if (vals.some((v) => !Number.isFinite(v))) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Please enter valid numbers for all coordinates.",
        });
      } else if (x1 === x2 && y1 === y2) {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "The two points must be different (identical points have no defined slope).",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Input",
          description: "Coordinate values must be within ±1,000,000,000.",
        });
      }
      return;
    }

    if (computed.vertical) {
      setResult(computed);
      toast({ title: "Result", description: "The line is vertical (undefined slope)." });
      return;
    }

    setResult(computed);
    toast({
      title: "Slope Calculated",
      description: `The slope of the line is ${fmtSlope(computed.slope as number)}.`,
    });
  };

  const reset = () => {
    setX1(""); setY1(""); setX2(""); setY2(""); setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const slopeText = result.vertical ? "Undefined (vertical line)" : fmtSlope(result.slope as number);
    const text = `Slope: ${slopeText}. Equation: ${result.equation} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Slope Calculator"
      description="Calculate the slope of a line from two points."
      canonicalUrl="/math-calculators/slope-calculator"
      formula="m = (y₂ - y₁) / (x₂ - x₁)"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Point 1 (x₁, y₁)</Label>
              <div className="flex gap-2 mt-1">
                <Input type="number" value={x1} onChange={(e) => setX1(e.target.value)} placeholder="x₁" />
                <Input type="number" value={y1} onChange={(e) => setY1(e.target.value)} placeholder="y₁" />
              </div>
            </div>
            <div>
              <Label>Point 2 (x₂, y₂)</Label>
              <div className="flex gap-2 mt-1">
                <Input type="number" value={x2} onChange={(e) => setX2(e.target.value)} placeholder="x₂" />
                <Input type="number" value={y2} onChange={(e) => setY2(e.target.value)} placeholder="y₂" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Calculate Slope</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-neutral-600">Slope (m)</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-3xl font-bold text-primary text-center">{result.vertical ? "Undefined (vertical line)" : fmtSlope(result.slope as number)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-neutral-600">Equation of the Line</p>
                <p className="text-lg font-bold">{result.equation}</p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Slope Calculator determines the slope or gradient of a line connecting two points in a 2D Cartesian coordinate system. The slope represents the steepness of the line, often described as 'rise over run.' The calculator also provides the equation of the line in slope-intercept form (y = mx + b)."
        useCases={[
            { title: "Algebra and Geometry", description: "Quickly solve for the slope in math homework and understand the relationship between points on a line." },
            { title: "Physics", description: "Calculate rates of change, such as velocity from a position-time graph." },
            { title: "Engineering and Construction", description: "Determine the grade or incline of a road, ramp, or piece of land." },
        ]}
        tips={[
            { title: "Positive vs. Negative Slope", description: "A positive slope means the line goes up from left to right. A negative slope means it goes down." },
            { title: "Zero Slope", description: "A slope of zero indicates a perfectly horizontal line." },
            { title: "Undefined Slope", description: "An 'undefined' slope indicates a perfectly vertical line, as the 'run' (change in x) is zero." },
        ]}
        faqs={[
            { question: "What is slope?", answer: "Slope is a measure of the steepness of a line. It is the ratio of the change in the y-coordinate (rise) to the change in the x-coordinate (run) between any two points on the line." },
            { question: "What is the slope-intercept form?", answer: "It is a common way to write the equation of a line: y = mx + b, where 'm' is the slope and 'b' is the y-intercept (the point where the line crosses the y-axis)." },
            { question: "Does the order of the points matter?", answer: "No, as long as you are consistent. You can do (y₂ - y₁) / (x₂ - x₁) or (y₁ - y₂) / (x₁ - x₂). Both will give you the same result." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SlopeCalculator;

    