'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type PasswordOptions = {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
};

function buildCharset(opts: PasswordOptions): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let charset = "";
  if (opts.includeUppercase) charset += upper;
  if (opts.includeLowercase) charset += lower;
  if (opts.includeNumbers) charset += numbers;
  if (opts.includeSymbols) charset += symbols;
  return charset;
}

function secureRandomIndex(max: number): number {
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function computePassword(opts: PasswordOptions): string | null {
  if (!Number.isInteger(opts.length) || opts.length < 4 || opts.length > 128) return null;
  const charset = buildCharset(opts);
  if (charset === "") return null;
  let out = "";
  for (let i = 0; i < opts.length; i++) {
    out += charset.charAt(secureRandomIndex(charset.length));
  }
  return out;
}

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Auto-generates on mount with default options so result renders instantly (no toast on init)
  useEffect(() => {
    const initial = computePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    });
    if (initial) setPassword(initial);
  }, []);

  const generate = () => {
    if (!Number.isInteger(length) || length < 4 || length > 128) {
        toast({ title: "Invalid Input", description: "Password length must be between 4 and 128 characters.", variant: "destructive" });
        return;
    }
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        toast({ title: "Invalid Input", description: "Please select at least one character type.", variant: "destructive" });
        return;
    }

    const newPassword = computePassword({ length, includeUppercase, includeLowercase, includeNumbers, includeSymbols });
    if (!newPassword) {
        toast({ title: "Invalid Input", description: "Could not generate a password with the current settings.", variant: "destructive" });
        return;
    }
    setPassword(newPassword);
    toast({ title: "Password Generated", description: `A new ${length.toLocaleString()}-character secure password has been generated.` });
  };

  const reset = () => {
    setLength(16);
    setIncludeUppercase(true);
    setIncludeLowercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(true);
    setPassword("");
  };
  
  const copyToClipboard = async () => {
    if (!password) {
        toast({ variant: "destructive", title: "Invalid Input", description: "Generate a password first before copying." });
        return;
    }
    try {
        await navigator.clipboard.writeText(password);
        toast({ title: "Copied", description: "Password copied to clipboard." });
    } catch {
        toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  }

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Create strong, random, and secure passwords."
      canonicalUrl="/other-calculators/password-generator"
    >
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
              <Input value={password} readOnly placeholder="Your secure password will appear here" className="font-mono text-lg h-10" />
              <Button onClick={copyToClipboard} variant="outline" size="icon" className="h-12 w-12"><Copy /></Button>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
                <Label>Password Length</Label>
                <span className="font-bold">{length.toLocaleString()}</span>
            </div>
            <Slider
                value={[length]}
                onValueChange={(val) => setLength(val[0])}
                min={4}
                max={128}
                step={1}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox id="upper" checked={includeUppercase} onCheckedChange={(checked) => setIncludeUppercase(Boolean(checked))} />
                <label htmlFor="upper" className="text-sm font-medium leading-none">Uppercase</label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="lower" checked={includeLowercase} onCheckedChange={(checked) => setIncludeLowercase(Boolean(checked))} />
                <label htmlFor="lower" className="text-sm font-medium leading-none">Lowercase</label>
            </div>
            <div className="flex items-center space-x-2">
                <Checkbox id="numbers" checked={includeNumbers} onCheckedChange={(checked) => setIncludeNumbers(Boolean(checked))} />
                <label htmlFor="numbers" className="text-sm font-medium leading-none">Numbers</label>
            </div>
             <div className="flex items-center space-x-2">
                <Checkbox id="symbols" checked={includeSymbols} onCheckedChange={(checked) => setIncludeSymbols(Boolean(checked))} />
                <label htmlFor="symbols" className="text-sm font-medium leading-none">Symbols</label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={generate} className="flex-1 gradient-button">Generate Password</Button>
            <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
      
       <CalculatorContentSection
        aboutContent="The Password Generator creates strong, random passwords to help secure your online accounts. You can customize the length and character types (uppercase, lowercase, numbers, symbols) to meet the requirements of any website or application."
        useCases={[
            { title: "New Account Signup", description: "Create a unique, strong password for every new online account to prevent credential stuffing attacks." },
            { title: "Password Updates", description: "Regularly update your passwords for critical accounts like email and banking with new, randomly generated ones." },
            { title: "Improving Security", description: "Replace weak, easily guessable passwords with strong, random ones to improve your overall digital security." },
        ]}
        tips={[
            { title: "Longer is Stronger", description: "Every character you add to a password increases its complexity exponentially. Aim for at least 16 characters for important accounts." },
            { title: "Use a Password Manager", description: "It's impossible to remember dozens of unique, complex passwords. Use a password manager to securely store and auto-fill them for you." },
            { title: "Mix Character Types", description: "Including uppercase letters, lowercase letters, numbers, and symbols makes a password much harder to crack through brute-force attacks." },
        ]}
        faqs={[
            { question: "What makes a password strong?", answer: "A strong password is long, complex, and unique. It should be at least 16 characters and include a mix of uppercase letters, lowercase letters, numbers, and symbols. It should not be a common word or phrase." },
            { question: "Why can't I just use a simple password I can remember?", answer: "Simple or reused passwords are very vulnerable to being guessed or stolen in data breaches. If one site is breached, attackers will try that same password on all your other accounts." },
            { question: "Is this password generator secure?", answer: "Yes, the passwords are generated entirely on your device using your browser's built-in cryptographically secure random number generator. The passwords are not sent over the internet or stored anywhere." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PasswordGenerator;
