'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Ruler, Copy, RotateCcw } from "lucide-react";

type HeightResult = {
  display: string;
  heightInCm: number;
};

const VALID_UNITS = ["feet-inches", "cm", "meters"];

function computeHeight(
  fromUnit: string,
  toUnit: string,
  feetStr: string,
  inchesStr: string,
  cmStr: string,
  metersStr: string
): HeightResult | null {
  if (!VALID_UNITS.includes(fromUnit) || !VALID_UNITS.includes(toUnit)) return null;
  let heightInCm = 0;
  if (fromUnit === "cm") {
    const cmVal = parseFloat(cmStr);
    if (!isFinite(cmVal) || cmVal <= 0 || cmVal < 20 || cmVal > 300) return null;
    heightInCm = cmVal;
  } else if (fromUnit === "meters") {
    const mVal = parseFloat(metersStr);
    if (!isFinite(mVal) || mVal <= 0 || mVal < 0.2 || mVal > 3) return null;
    heightInCm = mVal * 100;
  } else {
    const ftVal = parseFloat(feetStr) || 0;
    const inVal = parseFloat(inchesStr) || 0;
    if (ftVal <= 0 && inVal <= 0) return null;
    if (ftVal < 0 || ftVal > 9 || inVal < 0 || inVal >= 12) return null;
    heightInCm = ftVal * 30.48 + inVal * 2.54;
    if (heightInCm < 20 || heightInCm > 300) return null;
  }
  let display = "";
  if (toUnit === "cm") {
    display = `${heightInCm.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cm`;
  } else if (toUnit === "meters") {
    display = `${(heightInCm / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m`;
  } else {
    const totalInches = heightInCm / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inc = totalInches % 12;
    display = `${ft.toLocaleString()}' ${inc.toFixed(1)}"`;
  }
  return { display, heightInCm };
}

const HeightCalculatorClient = () => {
  const [fromUnit, setFromUnit] = useState("feet-inches");
  const [toUnit, setToUnit] = useState("cm");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("9");
  const [cm, setCm] = useState("175");
  const [meters, setMeters] = useState("1.75");
  const [result, setResult] = useState<HeightResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Pre-filled defaults + instant result on mount (no toast on init)
    const computed = computeHeight("feet-inches", "cm", "5", "9", "175", "1.75");
    if (computed) setResult(computed);
  }, []);

  const convert = () => {
    if (!VALID_UNITS.includes(fromUnit) || !VALID_UNITS.includes(toUnit)) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Please select valid from and to units." });
      return;
    }
    if (fromUnit === 'cm') {
      const cmVal = parseFloat(cm);
      if (isNaN(cmVal) || cmVal <= 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid height in centimeters." });
        return;
      }
      if (cmVal < 20 || cmVal > 300) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Height must be between 20 and 300 cm." });
        return;
      }
    } else if (fromUnit === 'meters') {
      const mVal = parseFloat(meters);
      if (isNaN(mVal) || mVal <= 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid height in meters." });
        return;
      }
      if (mVal < 0.2 || mVal > 3) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Height must be between 0.2 and 3 meters." });
        return;
      }
    } else if (fromUnit === 'feet-inches') {
      const ftVal = parseFloat(feet) || 0;
      const inVal = parseFloat(inches) || 0;
      if (ftVal <= 0 && inVal <= 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Please enter a valid height in feet and/or inches." });
        return;
      }
      if (ftVal < 0 || ftVal > 9) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Feet must be between 0 and 9." });
        return;
      }
      if (inVal < 0 || inVal >= 12) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Inches must be between 0 and 11." });
        return;
      }
    }
    const computed = computeHeight(fromUnit, toUnit, feet, inches, cm, meters);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Height must be between 20 and 300 cm (realistic range)." });
      return;
    }
    setResult(computed);
    toast({ title: "Success", description: `Height converted: ${computed.display}.` });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `Height: ${result.display} (${result.heightInCm.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cm) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
      canonicalUrl="/other-calculators/height-calculator"
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
          
          <div className="flex gap-2">
            <Button onClick={convert} className="flex-1 gradient-button">
              <Ruler className="w-4 h-4 mr-2" />
              Convert
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Converted Height</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-2xl font-bold text-primary">{result.display}</p>
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

export default HeightCalculatorClient;
