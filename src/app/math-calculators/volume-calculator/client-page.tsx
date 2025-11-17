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

const VolumeCalculator = () => {
  const [shape, setShape] = useState("cube");
  const [dim1, setDim1] = useState("");
  const [dim2, setDim2] = useState("");
  const [dim3, setDim3] = useState("");
  const [volume, setVolume] = useState<number | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const d1 = parseFloat(dim1);
    const d2 = parseFloat(dim2);
    const d3 = parseFloat(dim3);

    let result = 0;
    switch (shape) {
      case "cube":
        if (isNaN(d1) || d1 <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a positive side length." }); return;
        }
        result = d1 * d1 * d1;
        break;
      case "sphere":
        if (isNaN(d1) || d1 <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a positive radius." }); return;
        }
        result = (4/3) * Math.PI * Math.pow(d1, 3);
        break;
      case "cylinder":
        if (isNaN(d1) || d1 <= 0 || isNaN(d2) || d2 <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a positive radius and height." }); return;
        }
        result = Math.PI * d1 * d1 * d2;
        break;
      case "cuboid":
         if (isNaN(d1) || d1 <= 0 || isNaN(d2) || d2 <= 0 || isNaN(d3) || d3 <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Please enter positive values for length, width, and height." }); return;
        }
        result = d1 * d2 * d3;
        break;
    }
    setVolume(result);
    toast({ title: "Volume Calculated", description: `The volume of the ${shape} is ${result.toFixed(2)}.`});
  };
  
  const getLabels = () => {
    switch(shape) {
        case 'cube': return [{label: 'Side'}];
        case 'sphere': return [{label: 'Radius'}];
        case 'cylinder': return [{label: 'Radius'}, {label: 'Height'}];
        case 'cuboid': return [{label: 'Length'}, {label: 'Width'}, {label: 'Height'}];
        default: return [];
    }
  }
  
  const labels = getLabels();

  return (
    <CalculatorLayout
      title="Volume Calculator"
      description="Calculate the volume of common 3D shapes."
      canonicalUrl="/math-calculators/volume-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Shape</Label>
            <Select value={shape} onValueChange={(val) => { setShape(val); setVolume(null); setDim1(''); setDim2(''); setDim3('');}}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cube">Cube</SelectItem>
                <SelectItem value="sphere">Sphere</SelectItem>
                <SelectItem value="cylinder">Cylinder</SelectItem>
                <SelectItem value="cuboid">Cuboid (Rectangular Prism)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {labels.map((l, i) => (
              <div key={i}>
                <Label>{l.label}</Label>
                <Input type="number" 
                       value={[dim1, dim2, dim3][i]} 
                       onChange={e => [setDim1, setDim2, setDim3][i](e.target.value)} 
                       placeholder={`Enter ${l.label.toLowerCase()}`}
                />
              </div>
            ))}
          </div>

          <Button onClick={calculate} className="w-full gradient-button">Calculate Volume</Button>
          {volume !== null && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="text-3xl font-bold text-primary">{volume.toFixed(2)} cubic units</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Volume Calculator computes the volume of several common three-dimensional shapes, including cubes, spheres, cylinders, and cuboids. Volume is the measure of the amount of space inside a solid figure, expressed in cubic units."
        useCases={[
            { title: "Shipping and Packaging", description: "Calculate the volume of a box to determine shipping costs or how much it can hold." },
            { title: "Construction and Landscaping", description: "Estimate the amount of material needed, such as concrete for a foundation or soil for a planter." },
            { title: "Cooking", description: "Calculate the volume of ingredients needed when scaling recipes, especially for cylindrical or spherical containers." },
        ]}
        tips={[
            { title: "Use Consistent Units", description: "Ensure all your measurements are in the same unit (e.g., all in inches or all in centimeters). The result will be in the cubic version of that unit (e.g., cubic inches)." },
            { title: "Pi (π)", description: "For calculations involving circles, like spheres and cylinders, the calculator uses the mathematical constant Pi (π ≈ 3.14159)." },
            { title: "Volume vs. Surface Area", description: "Volume measures the space inside an object, while surface area measures the total area of its outer surfaces." },
        ]}
        faqs={[
            { question: "What is volume?", answer: "Volume is the amount of three-dimensional space occupied by a substance or object. It is measured in cubic units, such as cubic meters or cubic feet." },
            { question: "How do I calculate the volume of an irregular shape?", answer: "For irregular shapes, one common method is water displacement. Submerge the object in a container of water and measure the volume of the water that is displaced. This is equal to the object's volume." },
            { question: "What is the difference between a cube and a cuboid?", answer: "A cube has six identical square faces, meaning all its sides (length, width, and height) are equal. A cuboid (or rectangular prism) has six rectangular faces, and its length, width, and height can be different." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default VolumeCalculator;

    