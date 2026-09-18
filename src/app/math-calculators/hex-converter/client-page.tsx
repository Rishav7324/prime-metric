'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type Base = "hex" | "dec" | "bin" | "oct";

type HexResult = {
  hex: string;
  dec: string;
  bin: string;
  oct: string;
  ascii: string;
};

const BASE_LABEL: Record<Base, string> = { hex: "Hexadecimal", dec: "Decimal", bin: "Binary", oct: "Octal" };
const BASE_RADIX: Record<Base, number> = { hex: 16, dec: 10, bin: 2, oct: 8 };
const BASE_PATTERN: Record<Base, RegExp> = {
  hex: /^[0-9a-fA-F]+$/,
  dec: /^[0-9]+$/,
  bin: /^[01]+$/,
  oct: /^[0-7]+$/,
};
const MAX_VALUE = BigInt("18446744073709551615"); // 64-bit cap keeps output readable

function stripPrefix(v: string, base: Base): string {
  const s = v.trim().replace(/[\s_]/g, "");
  if (base === "hex") return s.replace(/^0x/i, "");
  if (base === "bin") return s.replace(/^0b/i, "");
  if (base === "oct") return s.replace(/^0o/i, "");
  return s;
}

function computeAll(raw: string, base: Base): HexResult | null {
  const cleaned = stripPrefix(raw, base);
  if (!cleaned || !BASE_PATTERN[base].test(cleaned)) return null;
  let value: bigint;
  try {
    if (base === "hex") value = BigInt("0x" + cleaned);
    else if (base === "bin") value = BigInt("0b" + cleaned);
    else if (base === "oct") value = BigInt("0o" + cleaned);
    else value = BigInt(cleaned);
  } catch {
    return null;
  }
  if (value < BigInt(0) || value > MAX_VALUE) return null;
  let ascii: string;
  if (value > BigInt(127)) {
    ascii = "— (only 0–127 map to ASCII)";
  } else {
    const code = Number(value);
    ascii = code >= 32 && code <= 126 ? `'${String.fromCharCode(code)}' (code ${code})` : `Non-printable control character (code ${code})`;
  }
  return {
    hex: value.toString(16).toUpperCase(),
    dec: value.toString(10),
    bin: value.toString(2),
    oct: value.toString(8),
    ascii,
  };
}

const HexConverter = () => {
  const [input, setInput] = useState("FF");
  const [base, setBase] = useState<Base>("hex");
  // Pre-filled FF/hex so all four representations render instantly
  const [result, setResult] = useState<HexResult | null>(() => computeAll("FF", "hex"));
  const { toast } = useToast();

  const convert = () => {
    const cleaned = stripPrefix(input, base);
    if (!cleaned) {
      toast({ title: "Empty Input", description: `Enter a ${BASE_LABEL[base].toLowerCase()} value to convert.`, variant: "destructive" });
      return;
    }
    if (!BASE_PATTERN[base].test(cleaned)) {
      const hints: Record<Base, string> = {
        hex: "Use only digits 0–9 and letters A–F.",
        dec: "Use only digits 0–9.",
        bin: "Use only 0s and 1s.",
        oct: "Use only digits 0–7.",
      };
      toast({ title: "Invalid Input", description: `Not valid ${BASE_LABEL[base].toLowerCase()}. ${hints[base]}`, variant: "destructive" });
      return;
    }
    const computed = computeAll(input, base);
    if (!computed) {
      toast({ title: "Out of Range", description: "Value must be between 0 and 2⁶⁴−1.", variant: "destructive" });
      return;
    }
    setResult(computed);
    toast({ title: "Converted", description: `${BASE_LABEL[base]} value converted to all bases.` });
  };

  const reset = () => {
    setInput("FF");
    setBase("hex");
    setResult(computeAll("FF", "hex"));
    toast({ title: "Reset", description: "Restored demo value FF (hex)." });
  };

  const copyValue = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: `${label} copied to clipboard.` });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const boxes: { key: keyof Omit<HexResult, "ascii">; label: string; hint: string }[] = [
    { key: "hex", label: "Hexadecimal", hint: "Base 16" },
    { key: "dec", label: "Decimal", hint: "Base 10" },
    { key: "bin", label: "Binary", hint: "Base 2" },
    { key: "oct", label: "Octal", hint: "Base 8" },
  ];

  return (
    <CalculatorLayout
      title="Hex Converter – Hex, Decimal, Binary, Octal"
      description="Convert numbers between hexadecimal, decimal, binary and octal instantly. Enter one value, pick its base, and see all four forms plus ASCII."
      keywords="hex converter, hex to decimal, decimal to hex, binary converter, octal converter, ascii converter, base converter"
      canonicalUrl="/math-calculators/hex-converter"
    >
      <div className="space-y-4">
        <Card className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1">
              <Label>Value</Label>
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g., FF" className="mt-1.5 h-10 text-sm font-mono" />
            </div>
            <div className="sm:w-44">
              <Label>Base of input</Label>
              <select
                value={base}
                onChange={(e) => setBase(e.target.value as Base)}
                className="mt-1.5 h-10 w-full text-sm bg-white border border-neutral-200 rounded-md px-2.5"
                aria-label="Base of input"
              >
                {(Object.keys(BASE_LABEL) as Base[]).map((b) => (
                  <option key={b} value={b}>{BASE_LABEL[b]} (base {BASE_RADIX[b]})</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={convert} className="h-10 text-sm gradient-button flex-1 sm:flex-none">Convert</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {result && (
          <div className="grid sm:grid-cols-2 gap-3">
            {boxes.map(({ key, label, hint }) => (
              <Card key={key} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="text-sm font-bold">{label}</p>
                    <p className="text-[11px] text-neutral-500">{hint}</p>
                  </div>
                  <Button onClick={() => copyValue(result[key], label)} variant="outline" size="sm" className="h-8 text-xs">
                    <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                  </Button>
                </div>
                <p className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-sm font-semibold break-all text-center">{result[key]}</p>
              </Card>
            ))}
            <Card className="p-4 sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold">ASCII character</p>
                <Button onClick={() => copyValue(result.ascii, "ASCII")} variant="outline" size="sm" className="h-8 text-xs">
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
              </div>
              <p className="p-2.5 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-lg font-mono text-sm font-semibold text-center">{result.ascii}</p>
            </Card>
          </div>
        )}
      </div>

      <CalculatorContentSection
        aboutContent="The Hex Converter translates a single number across hexadecimal, decimal, binary and octal in one step — pick the base of your input and all four representations appear together. It also shows the ASCII character when the value falls in the printable range. The demo value FF (hex) loads converted so the matrix is visible immediately."
        useCases={[
          { title: "Read Memory Dumps", description: "Turn hex bytes from logs or debuggers into decimal and binary for inspection." },
          { title: "Set File Permissions", description: "Convert between octal modes like 755 and their binary bit patterns." },
          { title: "Decode Color Codes", description: "Break hex colors such as FF2765E into decimal RGB channels." },
          { title: "Learn Number Bases", description: "See the same value in four bases side by side to grasp place-value systems." },
        ]}
        tips={[
          { title: "Prefixes Are Optional", description: "You can include 0x, 0b or 0o prefixes — they are stripped before validation." },
          { title: "Watch the Base Rules", description: "Binary allows only 0–1, octal 0–7, decimal 0–9 and hex adds A–F; anything else triggers an error toast." },
          { title: "ASCII Needs 32–126", description: "Only codes 32–126 print as characters; lower codes are control characters and 128+ are outside ASCII." },
        ]}
        faqs={[
          { question: "What is hexadecimal and why do programmers use it?", answer: "Hexadecimal is base 16, using digits 0–9 plus A–F. Each hex digit maps exactly to 4 binary bits, so it compresses binary into a compact form ideal for memory addresses, colors and byte values." },
          { question: "How do I convert hex FF to decimal manually?", answer: "Multiply each digit by its place value: F×16 + F = 15×16 + 15 = 255. Each position is a power of 16, just like decimal positions are powers of 10." },
          { question: "Why does my binary input get rejected?", answer: "Binary accepts only the characters 0 and 1. Digits like 2–9, letters or spaces fail strict validation — remove them and convert again." },
          { question: "What is the largest value this converter accepts?", answer: "Values up to 2⁶⁴−1 (18446744073709551615) are supported using BigInt math, so even large addresses convert exactly without floating-point rounding." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default HexConverter;
