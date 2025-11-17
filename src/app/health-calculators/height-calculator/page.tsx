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
import { Ruler } from "lucide-react";

const HeightCalculator = () => {
  const [fromUnit, setFromUnit] = useState("feet-inches");
  const [toUnit, setToUnit] = useState("cm");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [cm, setCm] = useState("");
  const [meters, setMeters] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const convert = () => {
    let heightInCm = 0;
    
    if(fromUnit === 'cm') {
      const cmVal = parseFloat(cm);
      if(!cmVal || cmVal <= 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid height in centimeters." });
        return;
      }
      heightInCm = cmVal;
    } else if (fromUnit === 'meters') {
      const mVal = parseFloat(meters);
      if(!mVal || mVal <= 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid height in meters." });
        return;
      }
      heightInCm = mVal * 100;
    } else if (fromUnit === 'feet-inches') {
      const ftVal = parseFloat(feet) || 0;
      const inVal = parseFloat(inches) || 0;
      if (ftVal <= 0 && inVal <= 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid height in feet and/or inches." });
        return;
      }
      heightInCm = ftVal * 30.48 + inVal * 2.54;
    }

    let output = "";
    if (toUnit === "cm") {
      output = `${heightInCm.toFixed(2)} cm`;
    } else if (toUnit === "meters") {
      output = `${(heightInCm / 100).toFixed(2)} m`;
    } else if (toUnit === "feet-inches") {
      const totalInches = heightInCm / 2.54;
      const ft = Math.floor(totalInches / 12);
      const inc = (totalInches % 12).toFixed(1);
      output = `${ft}' ${inc}"`;
    }
    
    setResult(output);
    toast({ title: "Success", description: "Height converted successfully!" });
  };

  const renderInputs = () => {
    switch(fromUnit) {
      case 'cm':
        return <Input type="number" value={cm} onChange={(e) => setCm(e.target.value)} placeholder="e.g., 175" />;
      case 'meters':
        return <Input type="number" value={meters} onChange={(e) => setMeters(e.target.value)} placeholder="e.g., 1.75" />;
      case 'feet-inches':
      default:
        return (
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" value={feet} onChange={(e) => setFeet(e.target.value)} placeholder="Feet" />
            <Input type="number" value={inches} onChange={(e) => setInches(e.target.value)} placeholder="Inches" />
          </div>
        );
    }
  }

  return (
    <CalculatorLayout
      title="Height Conversion Calculator"
      description="Convert height between metric and imperial units"
      keywords="height converter, feet to cm, cm to feet, inches to cm, height calculator"
      canonicalUrl="/health-calculators/height-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feet-inches">Feet & Inches</SelectItem>
                <SelectItem value="cm">Centimeters</SelectItem>
                <SelectItem value="meters">Meters</SelectItem>
              </SelectContent>
            </Select>
            {renderInputs()}
          </div>
          
          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feet-inches">Feet & Inches</SelectItem>
                <SelectItem value="cm">Centimeters</SelectItem>
                <SelectItem value="meters">Meters</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={convert} className="w-full gradient-button">
            <Ruler className="w-4 h-4 mr-2" />
            Convert
          </Button>

          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Converted Height</p>
              <p className="text-4xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>

       <CalculatorContentSection
        aboutContent="The Height Conversion Calculator is a practical tool for easily converting height measurements between the metric (centimeters, meters) and imperial (feet, inches) systems. Whether you're filling out forms, tracking personal growth, or working on international projects, this calculator ensures you have accurate and correctly formatted height measurements."
        useCases={[
          { title: "Health & Fitness", description: "Track your height for BMI calculations or fitness progress in the unit system you prefer." },
          { title: "Online Shopping", description: "Convert your height to find the right clothing size when shopping from international websites." },
          { title: "Data Entry", description: "Easily convert height measurements for medical forms, official documents, or any other data entry task requiring a specific unit." },
          { title: "Travel", description: "Quickly understand height requirements or descriptions when traveling in countries that use a different measurement system." }
        ]}
        tips={[
          { title: "Feet & Inches", description: "When converting to 'Feet & Inches', the calculator provides a common real-world format (e.g., 5' 9\")." },
          { title: "Metric System", description: "The metric system (meters and centimeters) is used by most of the world and is standard in scientific contexts." },
          { title: "Accuracy", description: "For the most accurate conversions, use precise input values. Small rounding differences can occur but are generally negligible for everyday use." },
        ]}
        faqs={[
          { question: "How do I enter feet and inches?", answer: "When selecting 'Feet & Inches' as your 'From' unit, two input boxes will appear. Enter the feet value in the first box and the inches value in the second." },
          { question: "Is there a difference between 5.5 feet and 5' 6\"?", answer: "Yes. 5.5 feet is 5 feet and 6 inches (0.5 feet = 6 inches). The calculator handles this correctly when you use the separate feet and inches inputs." },
          { question: "Why do my results have decimals?", answer: "Conversions between metric and imperial systems are rarely whole numbers. The calculator rounds to a practical number of decimal places for accuracy." },
          { question: "What is the standard for medical records?", answer: "It varies by country. In the United States, height is often recorded in feet and inches, while in most other parts of the world, centimeters are the standard." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default HeightCalculator;
