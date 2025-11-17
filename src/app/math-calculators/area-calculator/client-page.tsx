
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

const AreaCalculator = () => {
  const [shape, setShape] = useState("rectangle");
  const [dim1, setDim1] = useState("");
  const [dim2, setDim2] = useState("");
  const [area, setArea] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const d1 = parseFloat(dim1);
    const d2 = parseFloat(dim2);

    if (isNaN(d1) || (labels.label2 && isNaN(d2))) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter valid numbers for all dimensions.",
        });
        return;
    }
    
    let result = 0;
    switch (shape) {
      case "rectangle":
        result = d1 * d2;
        break;
      case "circle":
        result = Math.PI * d1 * d1;
        break;
      case "triangle":
        result = (d1 * d2) / 2;
        break;
      case "square":
        result = d1 * d1;
        break;
    }
    setArea(result);
    toast({
        title: "Area Calculated",
        description: `The area of the ${shape} has been calculated.`,
    });
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
            <Select value={shape} onValueChange={(value) => {
              setShape(value);
              setDim1("");
              setDim2("");
              setArea(null);
            }}>
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
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate Area
          </Button>
          {area !== null && !isNaN(area) && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Calculated Area</p>
              <p className="text-3xl font-bold text-primary">
                {area.toFixed(2)} sq units
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
