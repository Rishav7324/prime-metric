
'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (display.includes('.') && num === '.') return;
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    if (!newNumber) {
        handleEquals();
    }
    const current = parseFloat(display);
    setPreviousValue(current);
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        if (current === 0) return Infinity;
        return prev / current;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null && !newNumber) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(result.toString());
      setPreviousValue(result);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };
  
  const backspace = () => {
    if (display.length > 1) {
        setDisplay(display.slice(0, -1));
    } else {
        setDisplay("0");
    }
  }

  return (
    <CalculatorLayout
      title="Basic Calculator"
      description="Simple calculator for basic arithmetic operations"
      canonicalUrl="/math-calculators/basic-calculator"
    >
      <Card className="p-6 bg-card/50 backdrop-blur border-primary/20 max-w-sm mx-auto shadow-lg">
        <div className="space-y-4">
          <div className="bg-background/80 p-4 rounded-lg text-right text-4xl font-mono min-h-[60px] flex items-center justify-end overflow-x-auto">
            {display}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={clear} variant="destructive" className="col-span-2 text-xl py-6">C</Button>
            <Button onClick={backspace} variant="outline" className="text-xl py-6">⌫</Button>
            <Button onClick={() => handleOperation("÷")} variant="outline" className="text-xl py-6">÷</Button>

            <Button onClick={() => handleNumber("7")} className="text-xl py-6">7</Button>
            <Button onClick={() => handleNumber("8")} className="text-xl py-6">8</Button>
            <Button onClick={() => handleNumber("9")} className="text-xl py-6">9</Button>
            <Button onClick={() => handleOperation("×")} variant="outline" className="text-xl py-6">×</Button>

            <Button onClick={() => handleNumber("4")} className="text-xl py-6">4</Button>
            <Button onClick={() => handleNumber("5")} className="text-xl py-6">5</Button>
            <Button onClick={() => handleNumber("6")} className="text-xl py-6">6</Button>
            <Button onClick={() => handleOperation("-")} variant="outline" className="text-xl py-6">-</Button>

            <Button onClick={() => handleNumber("1")} className="text-xl py-6">1</Button>
            <Button onClick={() => handleNumber("2")} className="text-xl py-6">2</Button>
            <Button onClick={() => handleNumber("3")} className="text-xl py-6">3</Button>
            <Button onClick={() => handleOperation("+")} variant="outline" className="text-xl py-6">+</Button>

            <Button onClick={() => handleNumber("0")} className="col-span-2 text-xl py-6">0</Button>
            <Button onClick={() => handleNumber(".")} className="text-xl py-6">.</Button>
            <Button onClick={handleEquals} className="gradient-button text-xl py-6">=</Button>
          </div>
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="The Basic Calculator provides a streamlined interface for fundamental arithmetic operations: addition, subtraction, multiplication, and division. Its design philosophy centers on simplicity and ease of use, mimicking the functionality of a classic handheld calculator. This tool is indispensable for anyone needing quick, accurate calculations without the complexity of a scientific or graphing calculator. From everyday financial checks to simple math problems, it serves as a reliable digital tool. Unlike physical calculators, this online version offers a clear, large display and tactile button feedback, reducing input errors. It processes calculations sequentially, making it intuitive for users of all ages and technical backgrounds. The backspace and clear functions provide essential error-correction capabilities, ensuring a smooth and frustration-free user experience. It's a foundational tool that supports a wide array of daily numerical tasks, making it a cornerstone of any comprehensive calculator suite."
        useCases={[
          { title: "Quick Math", description: "Perform everyday calculations like splitting restaurant bills, adding up grocery totals, calculating tips, or balancing a checkbook. Its straightforward interface allows for rapid entry and results, making it faster than finding a physical calculator or navigating a complex phone app." },
          { title: "Shopping Budget", description: "Add up prices of items while shopping to stay within a budget. Calculate percentage discounts on the fly (e.g., multiply price by 0.75 for 25% off), compare unit prices between different products, and determine the final cost of purchases before reaching the checkout." },
          { title: "Home Projects & DIY", description: "Calculate measurements for home improvement projects, such as determining the square footage of a room for flooring or paint. It can also be used to sum up material costs, convert units (e.g., inches to feet by dividing by 12), or split expenses for group projects." },
          { title: "Student Homework", description: "A perfect tool for students in elementary or middle school to verify basic math homework, practice arithmetic operations, or double-check calculations on tests. The clean interface prevents the distraction or temptation of more advanced functions found on scientific calculators." }
        ]}
        examples={[
          {
            title: "Calculating a Shopping Trip Total",
            description: "You're at the grocery store and want to make sure you stay under your $50 budget.",
            steps: [
              "Enter the price of the first item: 12.99",
              "Press the '+' button.",
              "Enter the price of the second item: 8.50",
              "Press the '+' button.",
              "Enter the price of the third item: 21.75",
              "Press the '=' button. The display shows 43.24, confirming you are within your budget."
            ]
          },
          {
            title: "Splitting a Dinner Bill",
            description: "You and two friends (3 people total) had dinner. The total bill is $87.60, and you want to split it evenly.",
            steps: [
              "Enter the total bill amount: 87.60",
              "Press the '÷' button.",
              "Enter the number of people: 3",
              "Press the '=' button. The display shows 29.2. Each person owes $29.20."
            ]
          }
        ]}
        tips={[
          { title: "Chain Calculations", description: "You can perform multiple operations in sequence without pressing '=' each time. For example, to calculate 5 + 3 × 2, you can press '5', '+', '3', '×', '2', '='. The calculator processes operations sequentially (left-to-right), so this would yield 16, not 11. Be mindful of the order of operations." },
          { title: "Error Correction", description: "If you mistype a number, use the '⌫' (backspace) button to remove the last digit. This is faster than clearing the entire entry. The 'C' (Clear) button resets the entire calculator, including any previous operations or values." },
          { title: "Decimal Precision", description: "The calculator supports decimal numbers for precise calculations involving money or measurements. Use the '.' button to enter a decimal point. You can only enter one decimal point per number; subsequent presses will be ignored." },
          { title: "Sequential Operations", description: "This calculator works like a standard four-function calculator, executing operations as they are entered. For calculations requiring a specific order of operations (PEMDAS/BODMAS), perform the operations in parentheses or the higher-priority operations first. For example, for (2+3) * 4, you would first calculate 2+3=5, clear, then do 5*4=20." }
        ]}
        faqs={[
          { question: "How do I correct a mistake?", answer: "Use the '⌫' (backspace) button to delete the last digit you entered. If you need to start the entire calculation over, press the 'C' (Clear) button, which will reset the display to zero and clear any stored operation." },
          { question: "Does this calculator follow the order of operations (PEMDAS/BODMAS)?", answer: "No, this is a basic, sequential calculator. It performs operations in the order they are entered. For example, 2 + 3 × 4 will be calculated as (2 + 3) × 4 = 20, not 2 + (3 × 4) = 14. To follow PEMDAS, you must perform the multiplication part first yourself." },
          { question: "What happens if I divide by zero?", answer: "Division by zero is an undefined mathematical operation. The calculator will display 'Infinity' to indicate this error. You will need to press the 'C' button to clear the error and start a new calculation." },
          { question: "Can it handle negative numbers?", answer: "Yes. To enter a negative number, you would typically perform a subtraction from zero (e.g., '0', '-', '5' to get -5) or as part of a larger calculation. The current interface is optimized for positive number entry followed by operations." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default BasicCalculator;
