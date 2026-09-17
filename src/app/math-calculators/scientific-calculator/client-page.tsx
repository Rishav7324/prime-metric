'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

function evaluateExpression(expr: string): number | null {
  const trimmed = expr.trim();
  if (!trimmed || trimmed === "Error") return null;
  if (!/^[0-9+\-*/.()\s]+$/.test(trimmed)) return null;
  if (/[+\-*/.(]\s*$/.test(trimmed)) return null;
  if (/\(\)/.test(trimmed)) return null;
  try {
    // For safety, only evaluate math expressions. `eval` can be dangerous.
    // This is a simplified approach. A production calculator would use a proper math expression parser.
    const result = new Function('return ' + trimmed)();
    if (typeof result !== "number" || !Number.isFinite(result)) return null;
    return result;
  } catch {
    return null;
  }
}

const fmtSci = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 6 });

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [isRad, setIsRad] = useState(true);
  const { toast } = useToast();

  const handleInput = (value: string) => {
    if (display === "Error") {
      setDisplay("0123456789.".includes(value) ? (value === "." ? "0." : value) : "0" + value);
      return;
    }
    if (display === "0" && "0123456789.".includes(value)) {
        setDisplay(value);
        return;
    }
    // Prevent multiple decimals
    if (value === "." && display.includes(".")) return;
    
    // Check if the last input was an operator to avoid double operators
    const lastChar = display.slice(-1);
    const operators = "+-*/";
    if (operators.includes(lastChar) && operators.includes(value)) {
        setDisplay(display.slice(0, -1) + value);
    } else {
        setDisplay(display + value);
    }
  };

  const calculate = () => {
    const computed = evaluateExpression(display);
    if (computed === null) {
      const trimmed = display.trim();
      if (!trimmed || display === "Error") {
        toast({ variant: "destructive", title: "Invalid Input", description: "Enter a valid expression before pressing =." });
      } else if (!/^[0-9+\-*/.()\s]+$/.test(trimmed)) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Expression contains invalid characters. Use numbers and + - × ÷ only." });
      } else if (/[+\-*/.(]\s*$/.test(trimmed)) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Expression cannot end with an operator. Add a number after it." });
      } else {
        toast({ variant: "destructive", title: "Invalid Expression", description: "Could not evaluate. Check for division by zero or malformed input." });
      }
      setDisplay("Error");
      return;
    }
    setDisplay(String(computed));
    toast({ title: "Calculation Complete", description: `Result is ${fmtSci(computed)}.` });
  };

  const handleFunction = (fn: string) => {
    if (display === "Error") {
      toast({ variant: "destructive", title: "Invalid Input", description: "Press C to clear the error first." });
      return;
    }
    try {
      const current = parseFloat(display);
      if (!Number.isFinite(current)) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Enter a valid number first." });
        setDisplay("Error");
        return;
      }
      let result: number | string | undefined;
      switch(fn) {
        case 'sqrt':
          if (current < 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "Cannot take the square root of a negative number." });
            setDisplay("Error");
            return;
          }
          result = Math.sqrt(current); break;
        case 'sq': result = Math.pow(current, 2); break;
        case 'sin': result = isRad ? Math.sin(current) : Math.sin(current * Math.PI / 180); break;
        case 'cos': result = isRad ? Math.cos(current) : Math.cos(current * Math.PI / 180); break;
        case 'tan': result = isRad ? Math.tan(current) : Math.tan(current * Math.PI / 180); break;
        case 'log':
          if (current <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "log requires a positive number." });
            setDisplay("Error");
            return;
          }
          result = Math.log10(current); break;
        case 'ln':
          if (current <= 0) {
            toast({ variant: "destructive", title: "Invalid Input", description: "ln requires a positive number." });
            setDisplay("Error");
            return;
          }
          result = Math.log(current); break;
        case 'pi': setDisplay(display === "0" ? String(Math.PI) : display + String(Math.PI)); return;
        default: result = "Error";
      }
      if (typeof result === "number") {
        if (!Number.isFinite(result)) {
          toast({ variant: "destructive", title: "Invalid Result", description: "Result is undefined (e.g., division by zero)." });
          setDisplay("Error");
          return;
        }
        setDisplay(String(result));
      } else {
        toast({ variant: "destructive", title: "Invalid Input", description: "Unknown function." });
        setDisplay("Error");
      }
    } catch {
      toast({ variant: "destructive", title: "Invalid Input", description: "Could not apply function to current value." });
      setDisplay("Error");
    }
  }

  const clear = () => setDisplay("0");
  const backspace = () => setDisplay(display.length > 1 && display !== "Error" ? display.slice(0, -1) : "0");

  const copyDisplay = async () => {
    if (display === "Error") {
      toast({ variant: "destructive", title: "Invalid Input", description: "Nothing valid to copy." });
      return;
    }
    try {
      await navigator.clipboard.writeText(display);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const buttons = [
    'sin', 'cos', 'tan', 'C',
    'sqrt', 'sq', 'log', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', 'π', '=',
  ];
  
  const handleButtonClick = (btn: string) => {
      if("0123456789.".includes(btn)) handleInput(btn);
      else if("+-×÷".includes(btn)) handleInput(btn.replace('×', '*').replace('÷', '/'));
      else if(btn === 'C') clear();
      else if(btn === '=') calculate();
      else if(btn === 'π') handleFunction('pi');
      else handleFunction(btn);
  }

  return (
    <CalculatorLayout
      title="Scientific Calculator"
      description="Perform advanced mathematical and engineering calculations."
      canonicalUrl="/math-calculators/scientific-calculator"
    >
      <Card className="p-4 max-w-md mx-auto">
        <div className="bg-background/80 p-4 rounded-lg text-right text-3xl font-mono min-h-[60px] flex items-center justify-end overflow-x-auto break-all">
          {display}
        </div>
         <div className="flex justify-end my-2">
            <Button variant="ghost" size="sm" onClick={copyDisplay} aria-label="Copy result">
              <Copy className="h-3.5 w-3.5 mr-1" /> Copy
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsRad(!isRad)}>
              {isRad ? 'RAD' : 'DEG'}
            </Button>
             <Button variant="ghost" size="sm" onClick={backspace}>
              DEL
            </Button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map(btn => (
            <Button 
              key={btn} 
              onClick={() => handleButtonClick(btn)}
              variant={ "0123456789.".includes(btn) ? 'secondary' : 'default'}
              className="text-lg h-16"
            >
              {btn}
            </Button>
          ))}
        </div>
      </Card>
      
      <CalculatorContentSection
        aboutContent="The Scientific Calculator extends the functionality of a basic calculator with features for scientific, mathematical, and engineering problems. This includes trigonometric functions (sin, cos, tan), logarithms (log, ln), square roots, and constants like Pi (π)."
        useCases={[
            { title: "Students", description: "Solve complex math and science homework problems in trigonometry, algebra, and physics." },
            { title: "Engineers", description: "Perform calculations needed for design, analysis, and other engineering tasks." },
            { title: "Scientists", description: "Analyze data, model experiments, and solve equations in various scientific fields." },
        ]}
        tips={[
            { title: "RAD vs. DEG", description: "Make sure to set the calculator to the correct mode (Radians or Degrees) for trigonometric functions. Most math problems use radians, while many real-world problems (like physics) use degrees." },
            { title: "Order of Operations", description: "This calculator follows the standard order of operations (PEMDAS/BODMAS). Use parentheses to group operations and ensure your calculation is performed as intended." },
            { title: "Logarithms", description: "'log' is the base-10 logarithm, while 'ln' is the natural logarithm (base e)." },
        ]}
        faqs={[
            { question: "What are radians and degrees?", answer: "They are two different units for measuring angles. A full circle is 360 degrees or 2π radians. Ensure you are in the correct mode for your problem." },
            { question: "What is 'e'?", answer: "'e' is Euler's number, a mathematical constant approximately equal to 2.71828. It is the base of the natural logarithm." },
            { question: "Why do I get an 'Error' message?", answer: "This can happen for several reasons, such as dividing by zero, taking the square root of a negative number, or entering an invalid mathematical expression. Check your input for mistakes." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default ScientificCalculator;

    