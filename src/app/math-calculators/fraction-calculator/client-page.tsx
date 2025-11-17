
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

const FractionCalculator = () => {
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string>("");
  const { toast } = useToast();

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplify = (numerator: number, denominator: number) => {
    if (denominator === 0) return { num: numerator, den: denominator };
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    const num = numerator / divisor;
    const den = denominator / divisor;
    return den < 0 ? { num: -num, den: -den } : { num, den };
  };

  const calculate = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);
    
    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2) || d1 === 0 || d2 === 0) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter valid numbers for numerators and non-zero denominators.",
      });
      setResult("");
      return;
    }

    let numerator = 0;
    let denominator = 1;

    switch (operation) {
      case "add":
        numerator = n1 * d2 + n2 * d1;
        denominator = d1 * d2;
        break;
      case "subtract":
        numerator = n1 * d2 - n2 * d1;
        denominator = d1 * d2;
        break;
      case "multiply":
        numerator = n1 * n2;
        denominator = d1 * d2;
        break;
      case "divide":
        if (n2 === 0) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Cannot divide by zero.",
            });
            setResult("");
            return;
        }
        numerator = n1 * d2;
        denominator = d1 * n2;
        break;
    }

    const simplified = simplify(numerator, denominator);
    
    let resultString = "";
    if (simplified.den === 0) {
        resultString = "Undefined (division by zero)";
    } else if (simplified.num === 0) {
        resultString = "0";
    } else if (simplified.den === 1) {
        resultString = simplified.num.toString();
    } else {
        resultString = `${simplified.num} / ${simplified.den}`;
    }

    setResult(resultString);
    toast({
        title: "Calculation Complete",
        description: `The result is ${resultString}.`,
    });
  };

  return (
    <CalculatorLayout
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions"
      keywords="fraction calculator, add fractions, subtract fractions, multiply fractions, divide fractions, simplify fractions"
      canonicalUrl="/math-calculators/fraction-calculator"
      explanation="This calculator performs arithmetic operations on fractions and automatically simplifies the results."
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num1">Fraction 1 - Numerator</Label>
              <Input
                id="num1"
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value)}
                placeholder="e.g., 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="den1">Fraction 1 - Denominator</Label>
              <Input
                id="den1"
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value)}
                placeholder="e.g., 2"
              />
            </div>
          </div>
          <div className="space-y-2">
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num2">Fraction 2 - Numerator</Label>
              <Input
                id="num2"
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                placeholder="e.g., 3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="den2">Fraction 2 - Denominator</Label>
              <Input
                id="den2"
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value)}
                placeholder="e.g., 4"
              />
            </div>
          </div>
          <Button onClick={calculate} className="w-full gradient-button">
            Calculate
          </Button>
          {result && (
            <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-3xl font-bold text-primary">{result}</p>
            </div>
          )}
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Fraction Calculator is a versatile tool designed to perform basic arithmetic operations—addition, subtraction, multiplication, and division—on two fractions. It simplifies the result to its lowest terms, making it an essential resource for students, teachers, and professionals who need to work with fractions accurately and efficiently."
        useCases={[
          { title: "Homework and Tutoring", description: "Students can use it to check their homework, understand fraction arithmetic, and practice simplifying fractions." },
          { title: "Cooking and Baking", description: "Adjust recipe ingredients by multiplying or dividing fractional quantities, ensuring perfect results every time." },
          { title: "Crafts and Woodworking", description: "Calculate measurements for projects that require precise fractional dimensions, such as carpentry or sewing." },
          { title: "General Math", description: "Quickly perform fraction calculations for everyday tasks without manual computation." }
        ]}
        tips={[
          { title: "Check for Zero", description: "The denominator of a fraction can never be zero. Ensure your denominators are non-zero numbers to avoid errors." },
          { title: "Simplifying is Key", description: "The calculator automatically simplifies the result, showing you the fraction in its most reduced form, which is standard practice." },
          { title: "Improper Fractions", description: "The calculator handles improper fractions (where the numerator is larger than the denominator) correctly." },
          { title: "Whole Numbers", description: "To use a whole number in a calculation, enter it as the numerator with a denominator of 1 (e.g., 5 becomes 5/1)." }
        ]}
        faqs={[
          { question: "How does the calculator simplify fractions?", answer: "It finds the Greatest Common Divisor (GCD) of the numerator and denominator and divides both by it to get the simplest form." },
          { question: "What happens if I divide by a zero fraction?", answer: "Division by a fraction with a zero numerator (which is zero) is not allowed and will result in an error, as division by zero is undefined." },
          { question: "Can I use negative fractions?", answer: "Yes, you can enter negative numbers in the numerator fields to perform calculations with negative fractions." },
          { question: "How are the operations performed?", answer: "The calculator follows standard arithmetic rules for fractions, such as finding a common denominator for addition/subtraction and cross-multiplying for division." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default FractionCalculator;
