
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

type DistanceResult = {
  distance: number;
  dx: number;
  dy: number;
};

function computeDistance(x1Str: string, y1Str: string, x2Str: string, y2Str: string): DistanceResult | null {
  const x1 = parseFloat(x1Str);
  const y1 = parseFloat(y1Str);
  const x2 = parseFloat(x2Str);
  const y2 = parseFloat(y2Str);
  if (!Number.isFinite(x1) || !Number.isFinite(y1) || !Number.isFinite(x2) || !Number.isFinite(y2)) return null;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return { distance: Math.sqrt(dx * dx + dy * dy), dx, dy };
}

const DEFAULT_X1 = "0";
const DEFAULT_Y1 = "0";
const DEFAULT_X2 = "3";
const DEFAULT_Y2 = "4";

const DistanceCalculator = () => {
  const [x1, setX1] = useState(DEFAULT_X1);
  const [y1, setY1] = useState(DEFAULT_Y1);
  const [x2, setX2] = useState(DEFAULT_X2);
  const [y2, setY2] = useState(DEFAULT_Y2);
  // Pre-filled so the result renders instantly (no empty state)
  const [distance, setDistance] = useState<DistanceResult | null>(() => computeDistance(DEFAULT_X1, DEFAULT_Y1, DEFAULT_X2, DEFAULT_Y2));
  const { toast } = useToast();

  const formatDist = (v: number) =>
    v.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });

  const calculate = () => {
    if (x1.trim() === "" || y1.trim() === "" || x2.trim() === "" || y2.trim() === "") {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter all four coordinates (x₁, y₁, x₂, y₂).",
      });
      return;
    }
    const computed = computeDistance(x1, y1, x2, y2);
    if (!computed) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid numbers for all coordinates.",
        });
        return;
    }
    setDistance(computed);
    toast({
      title: "Distance Calculated",
      description: `The distance is ${formatDist(computed.distance)}.`,
    });
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setDistance(null);
  };

  const copyResult = async () => {
    if (!distance) return;
    const text = `Distance between (${x1}, ${y1}) and (${x2}, ${y2}) = ${formatDist(distance.distance)} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Distance Calculator"
      description="Calculate distance between two points"
      keywords="distance calculator, distance formula, coordinate geometry, euclidean distance"
      canonicalUrl="/math-calculators/distance-calculator"
      formula="d = √[(x₂-x₁)² + (y₂-y₁)²]"
      explanation="This calculator finds the distance between two points in a 2D coordinate system using the distance formula."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Point 1 (x₁, y₁)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input
                  type="number"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  placeholder="x₁"
                />
                <Input
                  type="number"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  placeholder="y₁"
                />
              </div>
            </div>
            <div>
              <Label>Point 2 (x₂, y₂)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input
                  type="number"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  placeholder="x₂"
                />
                <Input
                  type="number"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  placeholder="y₂"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate Distance
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {distance !== null && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Distance</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-2xl font-bold text-primary text-center">{formatDist(distance.distance)}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The distance calculator uses the Pythagorean theorem to find the straight-line distance between two points in a 2D coordinate system. This fundamental mathematical tool is essential in geometry, physics, navigation, and computer graphics. By inputting the x and y coordinates of two points, you instantly get the precise distance between them. This calculation is the foundation for countless real-world applications, from mapping and GPS navigation to game development and data analysis."
        useCases={[
          { title: "Mathematics & Education", description: "Learn coordinate geometry, practice distance formula problems, verify homework solutions, or visualize spatial relationships between points." },
          { title: "Navigation & Mapping", description: "Calculate straight-line distances on maps, estimate travel distances, or plan optimal routes between locations on a coordinate grid." },
          { title: "Computer Graphics & Gaming", description: "Calculate distances between objects in games, detect collisions, implement AI pathfinding, or measure screen coordinate separations." },
          { title: "Data Analysis & Statistics", description: "Compute distances between data points in 2D space, identify clusters, perform proximity analysis, or calculate Euclidean distances in datasets." }
        ]}
        tips={[
          { title: "Understanding Coordinates", description: "Coordinates are written as (x, y). The x-coordinate shows horizontal position, and y-coordinate shows vertical position. Negative values are allowed and indicate direction." },
          { title: "The Pythagorean Connection", description: "The distance formula is derived from the Pythagorean theorem (a² + b² = c²). The horizontal and vertical distances form the legs, and the diagonal distance is the hypotenuse." },
          { title: "Units Don't Matter", description: "As long as both points use the same units (pixels, meters, miles, etc.), the calculation works. The result will be in the same units as your input." },
          { title: "Zero Distance", description: "If the calculated distance is zero, it means both points are at the exact same location - they have identical coordinates." }
        ]}
        faqs={[
          { question: "What if my coordinates are negative numbers?", answer: "Negative coordinates are perfectly fine! The distance formula works with any real numbers. Negative values simply indicate position relative to the origin (0,0) on the coordinate plane." },
          { question: "Is this the actual travel distance between two points?", answer: "No, this calculates the straight-line distance 'as the crow flies.' Actual travel distance would be longer if you must follow roads or paths. This gives you the shortest possible distance." },
          { question: "Can I use this calculator for 3D coordinates?", answer: "This calculator is designed for 2D (x, y) coordinates only. For 3D distance calculations involving x, y, and z coordinates, you'd need a 3D distance calculator that extends the formula to three dimensions." },
          { question: "Why do I get a decimal result?", answer: "Distance calculations often result in irrational numbers, especially when the points don't align horizontally or vertically. The calculator provides precise decimal results for accuracy." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default DistanceCalculator;
