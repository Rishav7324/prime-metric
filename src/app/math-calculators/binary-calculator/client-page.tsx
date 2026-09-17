
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
import { Copy, RotateCcw } from "lucide-react";

type BinaryOp = "add" | "subtract" | "multiply" | "divide";

type BinaryResult = {
  binary: string;
  decimal: number;
  hex: string;
  operation: BinaryOp;
};

function isBinaryString(s: string): boolean {
  return /^[01]+$/.test(s.trim());
}

function toBinaryString(n: number): string {
  if (n < 0) return `-${(-n).toString(2)}`;
  return n.toString(2);
}

function toHexString(n: number): string {
  if (n < 0) return `-${(-n).toString(16).toUpperCase()}`;
  return n.toString(16).toUpperCase();
}

function computeBinary(num1Str: string, num2Str: string, operation: BinaryOp): BinaryResult | null {
  const n1 = num1Str.trim();
  const n2 = num2Str.trim();
  if (!isBinaryString(n1) || !isBinaryString(n2)) return null;
  if (n1.length > 32 || n2.length > 32) return null;
  const binary1 = parseInt(n1, 2);
  const binary2 = parseInt(n2, 2);
  if (!Number.isSafeInteger(binary1) || !Number.isSafeInteger(binary2)) return null;
  let calcResult = 0;

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
      if (binary2 === 0) return null;
      calcResult = Math.floor(binary1 / binary2);
      break;
    default:
      return null;
  }
  if (!Number.isSafeInteger(calcResult)) return null;

  return {
    binary: toBinaryString(calcResult),
    decimal: calcResult,
    hex: toHexString(calcResult),
    operation,
  };
}

const DEFAULT_NUM1 = "1010";
const DEFAULT_NUM2 = "0101";
const DEFAULT_OP: BinaryOp = "add";

const BinaryCalculator = () => {
  const [num1, setNum1] = useState(DEFAULT_NUM1);
  const [num2, setNum2] = useState(DEFAULT_NUM2);
  const [operation, setOperation] = useState<BinaryOp>(DEFAULT_OP);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<BinaryResult | null>(() => computeBinary(DEFAULT_NUM1, DEFAULT_NUM2, DEFAULT_OP));
  const { toast } = useToast();

  const calculate = () => {
    if (!num1.trim() || !num2.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter both binary numbers.",
      });
      return;
    }

    if (!isBinaryString(num1) || !isBinaryString(num2)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid binary numbers (0s and 1s only).",
      });
      return;
    }
    if (num1.trim().length > 32 || num2.trim().length > 32) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Binary numbers must be 32 bits or fewer.",
      });
      return;
    }

    const binary2 = parseInt(num2.trim(), 2);
    if (operation === "divide" && binary2 === 0) {
      toast({ variant: "destructive", title: "Invalid Input", description: "Cannot divide by zero." });
      return;
    }

    const computed = computeBinary(num1, num2, operation);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Could not compute the result. Check your inputs.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Success", description: `Result: ${computed.binary} (decimal ${computed.decimal.toLocaleString()}).` });
  };

  const reset = () => {
    setNum1("");
    setNum2("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `Binary result: ${result.binary} (decimal ${result.decimal.toLocaleString()}, hex ${result.hex}) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
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
            <Select value={operation} onValueChange={(v) => setOperation(v as BinaryOp)}>
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
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">
              Calculate
            </Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">Binary Result</p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-3xl font-bold text-primary break-all font-mono text-center">{result.binary}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Decimal</p>
                  <p className="text-xl font-bold">{result.decimal.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded text-center">
                  <p className="text-sm text-neutral-600">Hexadecimal</p>
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
