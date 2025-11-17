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

const ConversionCalculatorClient = () => {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("feet");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const units: any = {
    length: { meters: 1, kilometers: 1000, miles: 1609.34, feet: 0.3048, inches: 0.0254, yards: 0.9144 },
    weight: { grams: 1, kilograms: 1000, pounds: 453.592, ounces: 28.3495 },
    temperature: { celsius: "c", fahrenheit: "f", kelvin: "k" },
    volume: { milliliters: 1, liters: 1000, gallons: 3785.41, cups: 240 }
  };
  
  useEffect(() => {
    const unitKeys = Object.keys(units[category]);
    setFromUnit(unitKeys[0]);
    setToUnit(unitKeys[1] || unitKeys[0]);
    setValue("");
    setResult("");
  }, [category]);


  const convert = () => {
    const val = parseFloat(value);
    if(isNaN(val)) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Please enter a valid number to convert."
        });
        return;
    }
    
    let output = 0;
    
    if (category === "temperature") {
      if (fromUnit === toUnit) {
        output = val;
      } else if (fromUnit === "celsius" && toUnit === "fahrenheit") output = (val * 9/5) + 32;
      else if (fromUnit === "fahrenheit" && toUnit === "celsius") output = (val - 32) * 5/9;
      else if (fromUnit === "celsius" && toUnit === "kelvin") output = val + 273.15;
      else if (fromUnit === "kelvin" && toUnit === "celsius") output = val - 273.15;
      else if (fromUnit === "fahrenheit" && toUnit === "kelvin") output = (val - 32) * 5/9 + 273.15;
      else if (fromUnit === "kelvin" && toUnit === "fahrenheit") output = (val - 273.15) * 9/5 + 32;
    } else {
      const baseValue = val * units[category][fromUnit];
      output = baseValue / units[category][toUnit];
    }
    
    setResult(`${output.toFixed(4)} ${toUnit}`);
    toast({
        title: "Conversion Complete",
        description: `${value} ${fromUnit} is ${output.toFixed(4)} ${toUnit}.`
    });
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
          <Button onClick={convert} className="w-full gradient-button">Convert</Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-3xl font-bold text-primary">{result}</p>
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
