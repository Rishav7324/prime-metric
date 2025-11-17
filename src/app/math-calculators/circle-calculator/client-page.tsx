
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const CircleCalculator = () => {
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    const r = parseFloat(radius);
    
    if (r > 0) {
      const area = Math.PI * r * r;
      const circumference = 2 * Math.PI * r;
      const diameter = 2 * r;
      
      setResult({
        area: area.toFixed(2),
        circumference: circumference.toFixed(2),
        diameter: diameter.toFixed(2)
      });
      toast({
        title: "Circle Calculated",
        description: "The circle's properties have been calculated.",
      });
    } else {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a valid positive number for the radius.",
        });
    }
  };

  return (
    <CalculatorLayout
      title="Circle Calculator"
      description="Calculate area, circumference, and diameter of a circle"
      keywords="circle calculator, area of circle, circumference calculator, diameter calculator"
      canonicalUrl="/math-calculators/circle-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              placeholder="Enter radius"
              className="mt-2"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="text-3xl font-bold text-primary">{result.area} sq units</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Circumference</p>
                  <p className="text-xl font-bold">{result.circumference}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Diameter</p>
                  <p className="text-xl font-bold">{result.diameter}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The circle calculator is an essential geometry tool that computes all important measurements of a circle from a single input - the radius. Circles are fundamental shapes in mathematics, engineering, architecture, and design. This calculator instantly provides the area, circumference, and diameter, making it invaluable for students, professionals, and anyone working with circular shapes. Understanding these relationships helps in solving real-world problems involving circular objects, from pizza sizes to wheel dimensions."
        useCases={[
          { title: "Construction & Architecture", description: "Calculate circular floor space, determine materials needed for round structures, or design circular features like fountains and patios." },
          { title: "Engineering & Manufacturing", description: "Compute dimensions for circular parts, wheels, pipes, or containers. Essential for mechanical design and product development." },
          { title: "Landscaping & Gardening", description: "Plan circular garden beds, calculate mulch or soil needed for round areas, or design circular pathways and features." },
          { title: "Academic & Educational", description: "Learn and practice circle geometry concepts, verify homework solutions, or understand the relationship between radius, diameter, and circumference." }
        ]}
        tips={[
          { title: "Understanding Pi (π)", description: "Pi is approximately 3.14159 and represents the ratio of a circle's circumference to its diameter. It's an irrational number used in all circle calculations." },
          { title: "Radius vs Diameter", description: "The diameter is always exactly twice the radius. If you know one, you can easily find the other by multiplying or dividing by 2." },
          { title: "Area Applications", description: "Area is measured in square units (like sq ft or sq m). Use it to calculate material coverage, paint needed, or space enclosed by a circle." },
          { title: "Practical Measurements", description: "When measuring physical circles, measure the diameter and divide by 2 to get the radius. This is often easier than measuring the radius directly." }
        ]}
        faqs={[
          { question: "What is the difference between radius and diameter?", answer: "The radius is the distance from the center of a circle to any point on its edge. The diameter is the distance across the entire circle, passing through the center. The diameter is always exactly twice the radius." },
          { question: "Why do we use Pi (π) in circle calculations?", answer: "Pi (π) is a mathematical constant that represents the ratio of any circle's circumference to its diameter. This ratio is the same for all circles, regardless of size, making it essential for calculating circular measurements." },
          { question: "How do I calculate the area of a half circle?", answer: "Calculate the full circle area using πr², then divide the result by 2. For a quarter circle, divide by 4. This works for any fraction of a circle." },
          { question: "What units should I use for circle measurements?", answer: "You can use any unit of length (inches, feet, meters, centimeters, etc.). Just make sure to use the same unit throughout. The area will be in square units, and the circumference in linear units." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CircleCalculator;
