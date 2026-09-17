'use client';

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw, Heart } from "lucide-react";

type LoveResult = {
  score: number;
  verdict: string;
  message: string;
  nameA: string;
  nameB: string;
};

const DEFAULT_A = "Romeo";
const DEFAULT_B = "Juliet";

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h * 31 + s.charCodeAt(i)) >>> 0);
  }
  return h;
}

function verdictFor(score: number): { verdict: string; message: string } {
  if (score >= 90) return { verdict: "Soulmate Energy", message: "The stars are practically writing poetry about you two!" };
  if (score >= 80) return { verdict: "Sizzling Chemistry", message: "Sparks fly whenever you are in the same room." };
  if (score >= 70) return { verdict: "Strong Match", message: "A warm, easy connection with real staying power." };
  if (score >= 60) return { verdict: "Sweet Potential", message: "Something lovely is brewing — keep getting to know each other." };
  if (score >= 50) return { verdict: "Slow Burn", message: "It may start as friendship and grow into something more." };
  return { verdict: "Just Friends (For Now)", message: "Great buddy vibes — who knows what tomorrow brings?" };
}

// Deterministic: same two names (any order, any casing) always yield the same score in the 40–99 range
function computeLove(a: string, b: string): LoveResult | null {
  const cleanA = a.trim().replace(/[^a-zA-Z]+/g, "").toLowerCase();
  const cleanB = b.trim().replace(/[^a-zA-Z]+/g, "").toLowerCase();
  if (!cleanA || !cleanB) return null;
  const pair = [cleanA, cleanB].sort().join("&");
  const score = 40 + (hashString(pair) % 60);
  const { verdict, message } = verdictFor(score);
  return { score, verdict, message, nameA: a.trim(), nameB: b.trim() };
}

const LoveCalculatorClient = () => {
  // Pre-filled defaults so a result renders instantly on mount (no toast on init)
  const [nameA, setNameA] = useState(DEFAULT_A);
  const [nameB, setNameB] = useState(DEFAULT_B);
  const [result, setResult] = useState<LoveResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const computed = computeLove(DEFAULT_A, DEFAULT_B);
    if (computed) setResult(computed);
  }, []);

  const calculate = () => {
    const computed = computeLove(nameA, nameB);
    if (!computed) {
      toast({
        variant: "destructive",
        title: "Missing Names",
        description: !nameA.trim() && !nameB.trim()
          ? "Please enter both names to test your compatibility."
          : !nameA.trim() ? "Please enter the first name." : "Please enter the second name.",
      });
      return;
    }
    setResult(computed);
    toast({ title: "Love Calculated", description: `${computed.nameA} + ${computed.nameB}: ${computed.score}% — ${computed.verdict}!` });
  };

  const reset = () => {
    setNameA(DEFAULT_A);
    setNameB(DEFAULT_B);
    const computed = computeLove(DEFAULT_A, DEFAULT_B);
    if (computed) setResult(computed);
  };

  const copyResult = async () => {
    if (!result) {
      toast({ variant: "destructive", title: "Nothing to Copy", description: "Enter both names first to get a score." });
      return;
    }
    const text = `${result.nameA} + ${result.nameB} = ${result.score}% — ${result.verdict}! Just for fun, via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Love Calculator"
      description="Test name compatibility for fun — enter two names for a playful love score, verdict and shareable result"
      keywords="love calculator, love compatibility test, name compatibility, love match calculator, crush calculator"
      canonicalUrl="/other-calculators/love-calculator"
      explanation="A just-for-fun game that turns two names into a deterministic compatibility score — same names always give the same playful result."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Two Names</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">First Name</Label>
              <Input
                value={nameA}
                onChange={(e) => setNameA(e.target.value)}
                placeholder="e.g. Romeo"
                maxLength={30}
                className="mt-1.5 h-10 text-sm bg-white"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Second Name</Label>
              <Input
                value={nameB}
                onChange={(e) => setNameB(e.target.value)}
                placeholder="e.g. Juliet"
                maxLength={30}
                className="mt-1.5 h-10 text-sm bg-white"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 text-sm gradient-button">
                <Heart className="h-4 w-4 mr-2" /> Calculate Love
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[11px] text-neutral-500">Just for fun — this is entertainment only, not relationship advice.</p>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Compatibility</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center">
                <p className="text-2xl font-bold text-black tabular-nums">{result.score}%</p>
                <p className="text-sm font-semibold text-[#c25136] mt-0.5">{result.verdict}</p>
                <p className="text-xs text-neutral-500 mt-1">{result.nameA} + {result.nameB}</p>
              </div>
              <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#F2765E] to-[#c25136] transition-all"
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="text-[13px] text-neutral-600 text-center">{result.message}</p>
              <p className="text-[11px] text-neutral-500 text-center">For entertainment only — real chemistry can't be calculated.</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">💘</div><p className="text-sm">Enter two names to reveal the score</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Love Calculator is a lighthearted party game: enter any two names and get an instant playful compatibility score with a fun verdict. Scores are deterministic — the same pair of names always produces the same result — but remember it is entertainment only and says nothing real about any relationship."
        useCases={[
          { title: "Party Icebreaker", description: "Test friends' names together for laughs at gatherings." },
          { title: "Crush Curiosity", description: "Pair your name with a crush's just for a giggle." },
          { title: "Couple Fun", description: "Compare scores with nicknames, surnames or ship names." },
          { title: "Shareable Posts", description: "Copy the result text straight into chats and socials." },
        ]}
        tips={[
          { title: "Try Variations", description: "Nicknames vs. full names give different playful scores to compare." },
          { title: "Order Doesn't Matter", description: "Swapping the two names always yields the same score." },
          { title: "Keep It Light", description: "Treat every verdict as a joke — never as dating advice." },
        ]}
        faqs={[
          { question: "Is the Love Calculator accurate?", answer: "No — it is entertainment only. The score comes from a playful name-based formula, not psychology or science, and cannot predict real compatibility." },
          { question: "Why do the same names always give the same score?", answer: "By design: the score is a deterministic hash of the two names, so results are consistent and shareable rather than random." },
          { question: "Should I make relationship decisions based on this?", answer: "Absolutely not. Real relationships depend on communication, trust and shared values — never on an online game score." },
          { question: "Does the calculator store our names?", answer: "No. Everything runs instantly in your browser and nothing is sent or saved anywhere." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default LoveCalculatorClient;
