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
import { Copy, RotateCcw } from "lucide-react";

type ConversionResult = {
  output: number;
  display: string;
};

const UNITS_MAP: Record<string, Record<string, number>> = {
  length: { meters: 1, kilometers: 1000, miles: 1609.34, feet: 0.3048, inches: 0.0254, yards: 0.9144 },
  weight: { grams: 1, kilograms: 1000, pounds: 453.592, ounces: 28.3495 },
  volume: { milliliters: 1, liters: 1000, gallons: 3785.41, cups: 240 },
};

const TEMP_UNITS = ["celsius", "fahrenheit", "kelvin"];
const VALID_CATEGORIES = ["length", "weight", "temperature", "volume"];

function computeConversion(category: string, fromUnit: string, toUnit: string, valueStr: string): ConversionResult | null {
  const val = parseFloat(valueStr);
  if (!valueStr || isNaN(val) || !isFinite(val)) return null;
  if (!VALID_CATEGORIES.includes(category)) return null;
  if (category === "temperature") {
    if (!TEMP_UNITS.includes(fromUnit) || !TEMP_UNITS.includes(toUnit)) return null;
    if (fromUnit === "kelvin" && val < 0) return null;
    if (fromUnit === "celsius" && val < -273.15) return null;
    if (fromUnit === "fahrenheit" && val < -459.67) return null;
    let output = 0;
    if (fromUnit === toUnit) {
      output = val;
    } else if (fromUnit === "celsius" && toUnit === "fahrenheit") output = (val * 9/5) + 32;
    else if (fromUnit === "fahrenheit" && toUnit === "celsius") output = (val - 32) * 5/9;
    else if (fromUnit === "celsius" && toUnit === "kelvin") output = val + 273.15;
    else if (fromUnit === "kelvin" && toUnit === "celsius") output = val - 273.15;
    else if (fromUnit === "fahrenheit" && toUnit === "kelvin") output = (val - 32) * 5/9 + 273.15;
    else if (fromUnit === "kelvin" && toUnit === "fahrenheit") output = (val - 273.15) * 9/5 + 32;
    else return null;
    if (!isFinite(output)) return null;
    return { output, display: `${output.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toUnit}` };
  }
  const catUnits = UNITS_MAP[category];
  if (!catUnits || !(fromUnit in catUnits) || !(toUnit in catUnits)) return null;
  const baseValue = val * catUnits[fromUnit];
  const output = baseValue / catUnits[toUnit];
  if (!isFinite(output)) return null;
  return { output, display: `${output.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toUnit}` };
}

function getUnitKeys(cat: string): string[] {
  if (cat === "temperature") return TEMP_UNITS;
  return Object.keys(UNITS_MAP[cat] || {});
}

const ConversionCalculatorClient = () => {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [value, setValue] = useState("100");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const { toast } = useToast();

  const units: Record<string, Record<string, number | string>> = {
    length: UNITS_MAP.length,
    weight: UNITS_MAP.weight,
    temperature: { celsius: "c", fahrenheit: "f", kelvin: "k" },
    volume: UNITS_MAP.volume,
  };

  useEffect(() => {
    // Pre-filled defaults + instant result on mount / category change (no toast on init)
    const unitKeys = getUnitKeys(category);
    const newFrom = unitKeys[0];
    const newTo = unitKeys[1] || unitKeys[0];
    setFromUnit(newFrom);
    setToUnit(newTo);
    setValue("100");
    const computed = computeConversion(category, newFrom, newTo, "100");
    if (computed) setResult(computed);
    else setResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);


  const convert = () => {
    const val = parseFloat(value);
    if (value.trim() === "" || isNaN(val) || !isFinite(val)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid number to convert."
      });
      return;
    }
    if (Math.abs(val) > 1000000000) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Value must be between -1,000,000,000 and 1,000,000,000."
      });
      return;
    }
    if (!VALID_CATEGORIES.includes(category)) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Please select a valid category." });
      return;
    }
    const validUnits = getUnitKeys(category);
    if (!validUnits.includes(fromUnit) || !validUnits.includes(toUnit)) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Please select valid from and to units." });
      return;
    }
    if (category === "temperature") {
      if (fromUnit === "kelvin" && val < 0) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Kelvin cannot be below 0." });
        return;
      }
      if (fromUnit === "celsius" && val < -273.15) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Celsius cannot be below -273.15 (absolute zero)." });
        return;
      }
      if (fromUnit === "fahrenheit" && val < -459.67) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Fahrenheit cannot be below -459.67 (absolute zero)." });
        return;
      }
    }
    const computed = computeConversion(category, fromUnit, toUnit, value);
    if (!computed) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Could not convert with the given units." });
      return;
    }
    setResult(computed);
    toast({
      title: "Conversion Complete",
      description: `${val.toLocaleString()} ${fromUnit} is ${computed.display}.`
    });
  };

  const reset = () => setResult(null);

  const copyResult = async () => {
    if (!result) return;
    const text = `${parseFloat(value).toLocaleString()} ${fromUnit} = ${result.display} — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Unit Conversion Calculator"
      description="Convert between different units of measurement"
      keywords="unit converter, length converter, weight converter, temperature converter, volume converter, metric conversion"
      canonicalUrl="/other-calculators/conversion-calculator"
      explanation="This calculator converts values between various units including length, weight, temperature, and volume."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="length">Length</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units[category]).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(units[category]).map(unit => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={convert} className="flex-1 gradient-button">Convert</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 p-4 bg-[#FFF5F2] rounded-lg text-center">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Result</p>
                <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="text-3xl font-bold text-primary">{result.display}</p>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Unit Conversion Calculator converts values between different units of measurement across four categories: length, weight, temperature, and volume. It provides accurate conversions using standard conversion factors, making it easy to switch between metric and imperial units for various applications."
        useCases={[
          { title: "Cooking & Recipes", description: "Convert between cups, liters, and milliliters when following international recipes or scaling recipes up or down." },
          { title: "Travel Planning", description: "Convert temperatures between Celsius and Fahrenheit, distances between miles and kilometers, or weights when traveling internationally." },
          { title: "Science & Engineering", description: "Perform precise unit conversions for experiments, calculations, or technical specifications across different measurement systems." },
          { title: "Fitness Tracking", description: "Convert weights between pounds and kilograms for gym equipment, body weight, or nutritional information." }
        ]}
        tips={[
          { title: "Temperature Special Cases", description: "Temperature conversions are not proportional (e.g., 0°C ≠ 0°F). Always use the calculator for accuracy rather than mental math." },
          { title: "Precision Considerations", description: "Results display up to 4 decimal places for precision. Round as needed for your specific application." },
          { title: "Category Switching", description: "When changing categories, the calculator automatically updates available units. Make sure to re-select appropriate from/to units." },
          { title: "Common Conversions", description: "Save time: 1 mile ≈ 1.6 km, 1 pound ≈ 0.45 kg, 1 gallon ≈ 3.8 liters. Use the calculator for precise values." }
        ]}
        faqs={[
          { question: "Why do temperature conversions seem different?", answer: "Temperature scales have different zero points and intervals. 0°C = 32°F, not 0°F. The calculator uses proper formulas to account for these differences." },
          { question: "What's the difference between metric and imperial?", answer: "Metric (meters, kilograms, liters) is based on powers of 10 and used globally. Imperial (feet, pounds, gallons) is primarily used in the US and has irregular conversion factors." },
          { question: "How accurate are the conversions?", answer: "Conversions use standard, precise conversion factors (e.g., 1 inch = 2.54 cm exactly). Results are accurate to 4 decimal places." },
          { question: "Can I convert multiple values at once?", answer: "Currently, you convert one value at a time. For multiple conversions, update the input value and click Convert again." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ConversionCalculatorClient;
