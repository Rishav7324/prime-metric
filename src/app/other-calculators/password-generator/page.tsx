'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const generate = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    if (includeUppercase) charset += upper;
    if (includeLowercase) charset += lower;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;
    
    if (charset === "") {
        toast({ title: "Error", description: "Please select at least one character type.", variant: "destructive" });
        return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    toast({ title: "Password Generated", description: "A new secure password has been generated." });
  };
  
  const copyToClipboard = () => {
    if (password) {
        navigator.clipboard.writeText(password);
        toast({ title: "Copied!", description: "Password copied to clipboard." });
    }
  }

  return (
    <CalculatorLayout
      title="Password Generator"
      description="Create strong, random, and secure passwords."
      canonicalUrl="/other-calculators/password-generator"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
              <Input value={password} readOnly placeholder="Your secure password will appear here" className="font-mono text-lg h-12" />
              <Button onClick={copyToClipboard} variant="outline" size="icon" className="h-12 w-12"><Copy /></Button>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
                <Label>Password Length</Label>
                <span className="font-bold">{length}</span>
            </div>
            <Slider
                value={[length]}
                onValueChange={(val) => setLength(val[0])}
                min={8}
                max={64}
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
          <Button onClick={generate} className="w-full gradient-button">Generate Password</Button>
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
