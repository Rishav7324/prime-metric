'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const SlopeCalculator = () => {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const p1x = parseFloat(x1);
    const p1y = parseFloat(y1);
    const p2x = parseFloat(x2);
    const p2y = parseFloat(y2);

    if (isNaN(p1x) || isNaN(p1y) || isNaN(p2x) || isNaN(p2y)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for all coordinates.",
      });
      return;
    }
    
    if(p2x - p1x === 0) {
        setResult({ slope: "Undefined (vertical line)", equation: `x = ${p1x}` });
        toast({ title: "Result", description: "The line is vertical."});
        return;
    }

    const slope = (p2y - p1y) / (p2x - p1x);
    const yIntercept = p1y - slope * p1x;
    
    setResult({
      slope: slope.toFixed(4),
      equation: `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`
    });

    toast({
        title: "Slope Calculated",
        description: `The slope of the line is ${slope.toFixed(4)}.`,
    });
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
          <Button onClick={calculate} className="w-full gradient-button">Calculate Slope</Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Slope (m)</p>
                <p className="text-3xl font-bold text-primary">{result.slope}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded text-center">
                <p className="text-sm text-muted-foreground">Equation of the Line</p>
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

    