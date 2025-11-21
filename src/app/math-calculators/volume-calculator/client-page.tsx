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
        aboutContent="The Volume Calculator computes the amount of three-dimensional space occupied by common geometric shapes. Volume is a fundamental concept in geometry, physics, and engineering, essential for understanding capacity, displacement, and material estimation. This tool provides quick and accurate volume calculations for cubes, spheres, cylinders, and cuboids (rectangular prisms), helping users solve practical problems in various fields. Whether you're a student tackling geometry homework, a homeowner planning a DIY project, or a professional estimating material needs, understanding volume is crucial for accurate planning and execution. This calculator simplifies the process by handling the formulas for you, ensuring you get reliable results instantly."
        useCases={[
            { title: "Shipping and Logistics", description: "Calculate the volume of packages to optimize packing, determine shipping costs based on dimensional weight, and maximize cargo space in trucks or containers." },
            { title: "Construction and DIY Projects", description: "Estimate the amount of concrete needed for a foundation (cuboid), soil for a cylindrical planter, or water for a spherical tank. Accurate volume calculations prevent material shortages or over-purchasing." },
            { title: "Cooking and Baking", description: "Determine the capacity of different shaped pots, pans, or containers to scale recipes or ensure ingredients will fit. For example, calculating the volume of a cylindrical cake pan." },
            { title: "Education and Science", description: "Solve geometry problems, understand the relationship between dimensions and capacity, or calculate displacement in physics experiments. This tool is perfect for students and teachers to verify answers and explore 3D concepts." },
            { title: "Fluid Dynamics and Engineering", description: "Engineers use volume calculations to design pipes (cylinders), tanks (spheres, cylinders), and other containers for holding or transporting fluids. Volume is critical for determining flow rates, capacity, and pressure." }
        ]}
        examples={[
          { 
            title: "Example: Calculating Concrete for a Slab",
            description: "You need to pour a rectangular concrete slab for a shed foundation that is 10 feet long, 8 feet wide, and 4 inches thick.",
            steps: [
              "Select 'Cuboid (Rectangular Prism)' as the shape.",
              "Convert all units to be consistent. Since thickness is in inches, convert it to feet: 4 inches / 12 = 0.333 feet.",
              "Enter Length: 10, Width: 8, and Height: 0.333.",
              "Click 'Calculate Volume'. The result is approximately 26.64 cubic feet. This tells you how much concrete to order."
            ]
          },
          { 
            title: "Example: Finding the Capacity of a Cylindrical Tank",
            description: "You have a cylindrical water tank with a radius of 2 meters and a height of 3 meters.",
            steps: [
              "Select 'Cylinder' as the shape.",
              "Enter Radius: 2 and Height: 3.",
              "Click 'Calculate Volume'. The result is approximately 37.70 cubic meters. Since 1 cubic meter holds 1,000 liters, the tank's capacity is about 37,700 liters."
            ]
          }
        ]}
        tips={[
            { title: "Use Consistent Units", description: "The most common mistake is mixing units (e.g., using feet for length and inches for height). Ensure all dimensions are in the same unit (all feet, all meters, etc.) before calculating. The result will be in the cubic version of that unit (e.g., cubic feet, cubic meters)." },
            { title: "Understand Cubic Units", description: "Volume is always measured in cubic units (like cm³, m³, ft³, in³). This represents the number of 1x1x1 cubes that would fit inside the shape." },
            { title: "Radius vs. Diameter", description: "For shapes like spheres and cylinders, the formulas use the radius (distance from the center to the edge). If you have the diameter (distance across the circle), remember to divide it by 2 to get the radius before entering it into the calculator." },
            { title: "Volume of Complex Shapes", description: "To find the volume of a complex object, break it down into simpler shapes. Calculate the volume of each part and then add them together for the total volume." }
        ]}
        faqs={[
            { question: "What is volume?", answer: "Volume is the measure of the three-dimensional space occupied by an object or substance. It quantifies how much 'space' the object takes up. It's different from surface area, which measures the total area of the object's outer surfaces." },
            { question: "How do I calculate the volume of an irregular shape?", answer: "The most common method for irregular solid objects is water displacement. Submerge the object in a container filled with water and measure the volume of the water that spills out or the amount the water level rises. This displaced volume is equal to the object's volume." },
            { question: "What is the difference between a cube and a cuboid?", answer: "A cube is a special type of cuboid where all six faces are identical squares, meaning its length, width, and height are all equal. A cuboid (or rectangular prism) has six rectangular faces, and its dimensions can be different." },
            { question: "How do I convert between different cubic units?", answer: "Conversions involve cubing the linear conversion factor. For example, since 1 foot = 12 inches, 1 cubic foot = 12³ = 1728 cubic inches. Similarly, 1 meter = 100 cm, so 1 cubic meter = 100³ = 1,000,000 cubic centimeters." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default VolumeCalculator;
