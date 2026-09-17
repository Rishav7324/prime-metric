'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMemo, useState } from "react";
import { ShieldCheck, Copy, RotateCcw, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const DEMO_PASSWORD = "Sunshine2024!";
const COMMON_PASSWORDS = [
  "password", "123456", "123456789", "qwerty", "abc123", "letmein",
  "welcome", "admin", "monkey", "dragon", "football", "master",
  "sunshine", "princess", "shadow", "superman",
];

const LABELS = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
const BAR_COLORS = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-lime-500", "bg-emerald-500"];
const TEXT_COLORS = ["text-red-600", "text-orange-600", "text-yellow-600", "text-lime-600", "text-emerald-600"];

type Analysis = {
  score: number;
  tips: string[];
  charsetSize: number;
  crackTime: string;
};

function humanizeSeconds(sec: number): string {
  if (!Number.isFinite(sec)) return "effectively uncrackable";
  if (sec < 1) return "instantly";
  if (sec < 60) return `${Math.round(sec)} second${Math.round(sec) === 1 ? "" : "s"}`;
  const min = sec / 60;
  if (min < 60) return `${Math.round(min)} minute${Math.round(min) === 1 ? "" : "s"}`;
  const hrs = min / 60;
  if (hrs < 24) return `${Math.round(hrs)} hour${Math.round(hrs) === 1 ? "" : "s"}`;
  const days = hrs / 24;
  if (days < 365) return `${Math.round(days)} day${Math.round(days) === 1 ? "" : "s"}`;
  const years = days / 365;
  if (years < 100) return `${Math.round(years)} year${Math.round(years) === 1 ? "" : "s"}`;
  if (years < 1000000) return `${years.toLocaleString(undefined, { maximumFractionDigits: 0 })} years`;
  return "millions of years";
}

function analyzePassword(pw: string): Analysis {
  if (!pw) {
    return {
      score: 0,
      tips: ["Type a password above to get a live strength analysis with fix suggestions."],
      charsetSize: 0,
      crackTime: "—",
    };
  }
  const tips: string[] = [];
  let score = 0;

  if (pw.length >= 8) {
    score += 1;
  } else {
    tips.push("Make it at least 8 characters long — 12 or more is much stronger.");
  }
  if (pw.length >= 12) score += 1;

  const hasLower = /[a-z]/.test(pw);
  const hasUpper = /[A-Z]/.test(pw);
  const hasDigit = /[0-9]/.test(pw);
  const hasSymbol = /[^A-Za-z0-9]/.test(pw);
  const variety = [hasLower, hasUpper, hasDigit, hasSymbol].filter(Boolean).length;

  if (!hasLower) tips.push("Add lowercase letters (a-z).");
  if (!hasUpper) tips.push("Add uppercase letters (A-Z).");
  if (!hasDigit) tips.push("Add numbers (0-9).");
  if (!hasSymbol) tips.push("Add symbols such as ! @ # $ %.");
  if (variety >= 3) score += 1;
  if (variety === 4 && pw.length >= 10) score += 1;

  const lowered = pw.toLowerCase();
  if (COMMON_PASSWORDS.some((c) => lowered.includes(c))) {
    score = Math.min(score, 1);
    tips.unshift("Avoid common words and passwords — attackers try these first.");
  }
  if (/(.)\1{2,}/.test(pw)) {
    tips.push("Avoid repeated characters like 'aaa' — they add almost no security.");
  }
  if (/^(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde)+/i.test(pw.replace(/[^a-z0-9]/gi, ""))) {
    tips.push("Avoid sequences like '123' or 'abc' — they are trivially guessable.");
  }

  score = Math.max(0, Math.min(4, score));

  const charsetSize =
    (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasDigit ? 10 : 0) + (hasSymbol ? 32 : 0);
  const combinations = Math.pow(Math.max(charsetSize, 2), pw.length);
  const crackTime = humanizeSeconds(combinations / 2 / 1e10);

  if (tips.length === 0) {
    tips.push("Excellent — consider a password manager so every account gets one this strong.");
  }

  return { score, tips, charsetSize, crackTime };
}

const PasswordStrengthChecker = () => {
  // Pre-filled demo password so the meter shows instantly (analysis only — nothing is generated or sent)
  const [password, setPassword] = useState<string>(DEMO_PASSWORD);
  const [visible, setVisible] = useState<boolean>(false);
  const { toast } = useToast();

  const analysis = useMemo(() => analyzePassword(password), [password]);

  const copyPassword = async () => {
    if (!password) {
      toast({ variant: "destructive", title: "Nothing to copy", description: "Enter a password first." });
      return;
    }
    try {
      await navigator.clipboard.writeText(password);
      toast({ title: "Copied", description: "Password copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const clear = () => {
    setPassword("");
    toast({ title: "Cleared", description: "Password input cleared." });
  };

  return (
    <CalculatorLayout
      title="Password Strength Checker"
      description="Analyze password strength instantly with a 0-4 score, crack-time estimate and fix tips. Free client-side checker that never sends data."
      keywords="password strength checker, password strength meter, password security check, password crack time, strong password test"
      canonicalUrl="/tool/password-strength-checker"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium" htmlFor="password">Enter a password to analyze</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyPassword}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="icon" onClick={clear} aria-label="Clear">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              id="password"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type a password..."
              className="font-mono"
              autoComplete="off"
            />
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Hide password" : "Show password"}
            >
              {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-neutral-500">{password.length} characters • checked locally in your browser — nothing is sent or stored.</p>
        </Card>

        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <div className="result-label">Strength Score</div>
            <div className={`ml-auto text-sm font-bold ${TEXT_COLORS[analysis.score]}`}>
              {analysis.score}/4 • {LABELS[analysis.score]}
            </div>
          </div>
          <div className="flex gap-1.5" aria-label={`Score ${analysis.score} out of 4`}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-2.5 flex-1 rounded-full ${i <= analysis.score ? BAR_COLORS[analysis.score] : "bg-neutral-200"}`}
              />
            ))}
          </div>
          <div className="grid sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="result-label mb-1">Estimated Crack Time</div>
              <div className="text-sm font-semibold">{analysis.crackTime}</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="result-label mb-1">Character Set</div>
              <div className="text-sm font-semibold">
                {analysis.charsetSize > 0 ? `${analysis.charsetSize} possible symbols` : "—"}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="text-sm font-semibold">How to improve</div>
          <ul className="space-y-2">
            {analysis.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm text-neutral-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F2765E] shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Password Strength Checker scores any password from 0 to 4, estimates how long it would take to crack, and lists concrete ways to improve it. Everything runs instantly in your browser — your password is never sent, stored, or logged anywhere. Use it to audit existing passwords before replacing weak ones with fresh, unique alternatives."
        useCases={[
          { title: "Auditing Old Passwords", description: "Paste in passwords you reuse across sites to find the weakest ones worth replacing first with strong unique alternatives." },
          { title: "Meeting Signup Rules", description: "Check a new account password against length and complexity expectations before submitting a registration form that might reject it." },
          { title: "Team Security Training", description: "Demonstrate live how small changes like adding symbols or length turn an instantly-cracked password into one lasting centuries." },
          { title: "Verifying Manager Output", description: "Spot-check passwords produced by your password manager or generator to confirm they reach a top score before saving them." },
        ]}
        tips={[
          { title: "Length Beats Complexity", description: "A long passphrase of random words resists cracking far better than a short tangle of symbols. Aim for 12+ characters at minimum, 16+ for important accounts." },
          { title: "Unique Beats Strong", description: "Even a top-scoring password fails if reused — one breach exposes every account sharing it. Give every site its own password via a manager." },
          { title: "Enable Two-Factor Auth", description: "No password is unbreakable, so add an authenticator app or security key on email, banking, and social accounts as a second line of defense." },
        ]}
        faqs={[
          { question: "Is it safe to type my real password here?", answer: "Yes. The analysis runs entirely with JavaScript on your device — nothing is transmitted, saved, or logged. For extra peace of mind you can disconnect from the internet and the meter still works." },
          { question: "How is the 0-4 score calculated?", answer: "Points come from length (8+ and 12+ characters) and character variety across lowercase, uppercase, digits, and symbols. Scores are capped when the password contains common words, since attackers guess those first regardless of length." },
          { question: "What does the crack-time estimate assume?", answer: "It divides the total combinations in half (average guesses needed) by 10 billion guesses per second, roughly what a modern GPU cracking rig attempts. Targeted attacks with personal info or leaked databases can be faster, so treat it as an optimistic upper bound." },
          { question: "Does this tool generate passwords?", answer: "No — this is analysis-only and never creates passwords. To make a new one, use a dedicated password generator or manager, then paste the result back here to verify its score." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default PasswordStrengthChecker;
