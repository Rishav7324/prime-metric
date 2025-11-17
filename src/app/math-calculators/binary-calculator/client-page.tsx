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

const BinaryCalculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const calculate = () => {
    if (!num1 || !num2) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both binary numbers.",
      });
      return;
    }

    const binary1 = parseInt(num1, 2);
    const binary2 = parseInt(num2, 2);
    let calcResult = 0;

    if (isNaN(binary1) || isNaN(binary2)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid binary numbers (0s and 1s).",
      });
      return;
    }

    switch (operation) {
      case "add":
        calcResult = binary1 + binary2;
        break;
      case "subtract":
        calcResult = binary1 - binary2;
        break;
      case "multiply":
        calcResult = binary1 * binary2;
        break;
      case "divide":
        if (binary2 === 0) {
          toast({ variant: "destructive", title: "Error", description: "Cannot divide by zero." });
          return;
        }
        calcResult = Math.floor(binary1 / binary2);
        break;
    }

    setResult({
      binary: calcResult.toString(2),
      decimal: calcResult,
      hex: calcResult.toString(16).toUpperCase()
    });
    toast({ title: "Success", description: "Calculation complete!" });
  };

  return (
    <CalculatorLayout
      title="Binary Calculator"
      description="Perform binary arithmetic operations"
      keywords="binary calculator, binary arithmetic, binary operations, binary to decimal, binary to hex"
      canonicalUrl="/math-calculators/binary-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>First Binary Number</Label>
            <Input
              value={num1}
              onChange={(e) => setNum1(e.target.value.replace(/[^01]/g, ""))}
              placeholder="1010"
              className="font-mono"
            />
          </div>
          <div>
            <Label>Operation</Label>
            <Select value={operation} onValueChange={setOperation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add (+)</SelectItem>
                <SelectItem value="subtract">Subtract (-)</SelectItem>
                <SelectItem value="multiply">Multiply (×)</SelectItem>
                <SelectItem value="divide">Divide (÷)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Second Binary Number</Label>
            <Input
              value={num2}
              onChange={(e) => setNum2(e.target.value.replace(/[^01]/g, ""))}
              placeholder="0101"
              className="font-mono"
            />
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-primary/10 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Binary Result</p>
                <p className="text-3xl font-bold text-primary break-all font-mono">{result.binary}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Decimal</p>
                  <p className="text-xl font-bold">{result.decimal}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-muted-foreground">Hexadecimal</p>
                  <p className="text-xl font-bold font-mono">{result.hex}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Binary Calculator performs arithmetic operations on binary (base-2) numbers and displays results in multiple formats: binary, decimal, and hexadecimal. Binary is the fundamental number system used by computers, making this calculator essential for computer science, programming, and digital electronics."
        useCases={[
          { title: "Computer Science Education", description: "Learn and practice binary arithmetic, understand how computers perform calculations, and verify homework answers for binary operations." },
          { title: "Programming & Debugging", description: "Calculate binary values for bitwise operations, verify bit manipulation results, or convert between number systems during debugging." },
          { title: "Digital Electronics", description: "Design and analyze digital circuits, calculate logic gate outputs, or work with binary-coded decimal (BCD) values." },
          { title: "Network Engineering", description: "Perform subnet calculations, work with IP addresses in binary form, or calculate network masks and ranges." }
        ]}
        tips={[
          { title: "Binary Input Only", description: "Enter only 0s and 1s. The calculator automatically filters out invalid characters to prevent errors in binary calculations." },
          { title: "Multiple Result Formats", description: "Results show in binary (base-2), decimal (base-10), and hexadecimal (base-16) simultaneously, making it easy to verify conversions and compare formats." },
          { title: "Division Behavior", description: "Binary division performs integer division (floor division), discarding any remainder. For example, 1011 ÷ 10 = 101 (11 ÷ 2 = 5)." },
          { title: "Understanding Results", description: "Binary results can be long. The hexadecimal output provides a more compact representation of the same value." }
        ]}
        faqs={[
          { question: "Why are my binary numbers so long?", answer: "Binary uses only 0s and 1s, requiring more digits than decimal. For example, decimal 255 is binary 11111111. This is why hexadecimal is often used as a shorthand." },
          { question: "What is hexadecimal used for?", answer: "Hexadecimal (base-16) provides a compact way to represent binary values. Each hex digit represents 4 binary digits, making it easier to read and write large binary numbers." },
          { question: "How does binary division work?", answer: "Binary division works like decimal long division but with only 0 and 1. The calculator performs integer division, discarding remainders (floor division)." },
          { question: "Can I enter negative numbers?", answer: "Currently, this calculator works with positive integers only. Negative binary numbers typically use two's complement representation in computer systems." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BinaryCalculator;
