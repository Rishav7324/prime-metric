'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw } from "lucide-react";

type DisplayMode = "remainder" | "decimal";

type LongDivResult = {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  decimal: number;
  steps: string[];
  display: DisplayMode;
};

function computeLongDivision(dividendStr: string, divisorStr: string, display: DisplayMode): LongDivResult | null {
  const aText = dividendStr.trim();
  const bText = divisorStr.trim();
  if (!/^\d{1,8}$/.test(aText) || !/^\d{1,6}$/.test(bText)) return null;
  const a = parseInt(aText, 10);
  const b = parseInt(bText, 10);
  if (!(a >= 0 && a <= 99999999) || !(b >= 1 && b <= 999999)) return null;

  const quotient = Math.floor(a / b);
  const remainder = a % b;

  const digits = String(a).split("");
  const steps: string[] = [];
  let current = 0;
  let started = false;

  digits.forEach((ch, i) => {
    const d = parseInt(ch, 10);
    current = current * 10 + d;
    const stepNo = steps.length + 1;
    if (current < b) {
      if (started) {
        steps.push(`${stepNo}. Bring down ${d} → ${current}: ${b} goes 0 times (0 × ${b} = 0), remainder ${current}.`);
      } else if (i === digits.length - 1) {
        steps.push(`${stepNo}. ${b} goes into ${current} zero times — quotient 0, remainder ${current}.`);
      } else {
        steps.push(`${stepNo}. Bring down ${d} → ${current}: smaller than ${b}, write nothing yet, carry ${current} over.`);
      }
    } else {
      started = true;
      const qd = Math.floor(current / b);
      const prod = qd * b;
      const rem = current - prod;
      steps.push(`${stepNo}. Bring down ${d} → ${current}: ${b} × ${qd} = ${prod}; ${current} − ${prod} = ${rem}.`);
      current = rem;
    }
  });
  steps.push(`${steps.length + 1}. Check: ${quotient} × ${b} + ${remainder} = ${a}. ✓`);

  return { dividend: a, divisor: b, quotient, remainder, decimal: a / b, steps, display };
}

function formatDecimal(v: number): string {
  return v.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

const DEFAULT_DIVIDEND = "125";
const DEFAULT_DIVISOR = "7";
const DEFAULT_DISPLAY: DisplayMode = "remainder";

const LongDivisionCalculator = () => {
  const [dividend, setDividend] = useState(DEFAULT_DIVIDEND);
  const [divisor, setDivisor] = useState(DEFAULT_DIVISOR);
  const [display, setDisplay] = useState<DisplayMode>(DEFAULT_DISPLAY);
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<LongDivResult | null>(() => computeLongDivision(DEFAULT_DIVIDEND, DEFAULT_DIVISOR, DEFAULT_DISPLAY));
  const { toast } = useToast();

  const calculate = () => {
    if (dividend.trim() === "" || divisor.trim() === "") {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Enter both a dividend and a divisor.",
      });
      return;
    }
    const computed = computeLongDivision(dividend, divisor, display);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Use whole numbers 0–99999999 ÷ 1–999999. The divisor cannot be zero.",
      });
      return;
    }
    setResult(computed);

    toast({
      title: "Calculation Complete",
      description: `${computed.dividend.toLocaleString()} ÷ ${computed.divisor.toLocaleString()} = ${computed.quotient.toLocaleString()} remainder ${computed.remainder.toLocaleString()}.`,
    });
  };

  const reset = () => {
    setDividend("");
    setDivisor("");
    setResult(null);
  };

  const copyResult = async () => {
    if (!result) return;
    const text = `${result.dividend.toLocaleString()} ÷ ${result.divisor.toLocaleString()} = ${result.quotient.toLocaleString()} remainder ${result.remainder.toLocaleString()} (${formatDecimal(result.decimal)}) — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Long Division Calculator"
      description="Divide any two whole numbers step by step — quotient, remainder and every stage of working shown."
      keywords="long division calculator, division with steps, quotient remainder calculator, divide step by step"
      canonicalUrl="/math-calculators/long-division-calculator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Dividend</Label>
              <Input value={dividend} onChange={(e) => setDividend(e.target.value)} inputMode="numeric" placeholder="e.g., 125" />
            </div>
            <div>
              <Label>Divisor</Label>
              <Input value={divisor} onChange={(e) => setDivisor(e.target.value)} inputMode="numeric" placeholder="e.g., 7" />
            </div>
          </div>
          <div>
            <Label>Answer style</Label>
            <Select value={display} onValueChange={(v) => { const m = v as DisplayMode; setDisplay(m); const c = computeLongDivision(dividend, divisor, m); if (c) setResult(c); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remainder">Quotient + remainder</SelectItem>
                <SelectItem value="decimal">Decimal answer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button onClick={calculate} className="flex-1 gradient-button">Divide</Button>
            <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          {result && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-[#FFF5F2] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-neutral-600">
                    {result.dividend.toLocaleString()} ÷ {result.divisor.toLocaleString()}
                  </p>
                  <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-3xl font-bold text-primary text-center">
                  {result.display === "decimal" ? formatDecimal(result.decimal) : `${result.quotient.toLocaleString()} R ${result.remainder.toLocaleString()}`}
                </p>
                <p className="text-xs text-neutral-500 text-center mt-1">
                  {result.display === "decimal"
                    ? `Quotient ${result.quotient.toLocaleString()}, remainder ${result.remainder.toLocaleString()}`
                    : `Decimal: ${formatDecimal(result.decimal)}`}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-black mb-1.5">Step-by-step working</p>
                <ol className="font-mono text-xs text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg p-3 pl-4 space-y-1.5 list-none">
                  {result.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </Card>

      <CalculatorContentSection
        aboutContent="Long division breaks a tricky division into small bring-down, multiply and subtract stages you can follow digit by digit. Enter any dividend and divisor to get the quotient and remainder alongside every numbered working step in plain monospaced text. Switch on the decimal view to see the full decimal answer too."
        useCases={[
          { title: "Homework Help", description: "Check school division problems and see exactly where each digit of the answer comes from." },
          { title: "Verify Mental Math", description: "Confirm a head-calculation by comparing it against the full written working." },
          { title: "Learn Place Value", description: "Watching digits get carried down shows why each quotient digit sits where it does." },
          { title: "Remainder Problems", description: "Splitting items into equal groups leaves a remainder — see it computed explicitly." },
        ]}
        tips={[
          { title: "Divisor Can't Be Zero", description: "Division by zero is undefined, so the divisor must be 1 or more — the tool will tell you otherwise." },
          { title: "Line Digits Up", description: "In written work, keep each subtract step aligned under the right digits to avoid place-value slips." },
          { title: "Always Run the Check", description: "Multiply quotient × divisor and add the remainder — it must equal your starting dividend." },
        ]}
        faqs={[
          { question: "What are quotient and remainder?", answer: "The quotient is how many whole times the divisor fits; the remainder is what is left over. For 125 ÷ 7 the quotient is 17 with remainder 6." },
          { question: "Why show the working steps?", answer: "Each bring-down, multiply and subtract stage mirrors the classroom method, so you can learn the process — not just copy the answer." },
          { question: "How big can the numbers be?", answer: "Dividends up to 99,999,999 and divisors up to 999,999 keep every step fast and readable." },
          { question: "What about decimal answers?", answer: "Choose the decimal style to see the full answer to 4 decimal places — 125 ÷ 7 becomes 17.8571." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default LongDivisionCalculator;
