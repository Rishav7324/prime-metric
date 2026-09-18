'use client';

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import CalculatorLayout from "@/components/CalculatorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector, getCurrencySymbol } from "@/components/CurrencySelector";
import { Copy, RotateCcw } from "lucide-react";

type YearRow = { year: number; balance: number };
type MortgageResult = {
  monthlyPayment: number; totalPayment: number; totalInterest: number;
  principal: number; principalShare: number; schedule: YearRow[];
};

function computeMortgage(
  homeStr: string,
  downStr: string,
  rateStr: string,
  termStr: string
): MortgageResult | null {
  const home = parseFloat(homeStr);
  const down = downStr.trim() === "" ? 0 : parseFloat(downStr);
  const annual = parseFloat(rateStr);
  const years = parseFloat(termStr);

  if (!(home > 0 && home <= 1e12)) return null;
  if (isNaN(down) || down < 0 || down >= home) return null;
  if (isNaN(annual) || annual < 0 || annual > 100) return null;
  if (!(years > 0 && years <= 50)) return null;

  const principal = home - down;
  const monthlyRate = annual / 100 / 12;
  const months = Math.round(years * 12);
  if (!(months > 0)) return null;

  const monthlyPayment = monthlyRate === 0 ? principal / months
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;

  // Yearly balance schedule (same EMI amortization math as the loan calculator)
  let balance = principal;
  const schedule: YearRow[] = [];
  for (let y = 1; y <= Math.ceil(months / 12); y++) {
    for (let m = 0; m < 12 && (y - 1) * 12 + m < months; m++) {
      const interest = balance * monthlyRate;
      const prin = Math.min(monthlyPayment - interest, balance);
      balance = Math.max(0, balance - prin);
    }
    schedule.push({ year: y, balance });
    if (balance <= 0) break;
  }

  return {
    monthlyPayment, totalPayment, totalInterest: totalPayment - principal,
    principal, principalShare: (principal / totalPayment) * 100, schedule,
  };
}

const MortgageCalculatorClient = () => {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [currency, setCurrency] = useState("USD");
  // Pre-filled so the result renders instantly (no empty state)
  const [result, setResult] = useState<MortgageResult | null>(() => computeMortgage("300000", "60000", "6.5", "30"));
  const { toast } = useToast();
  
  const currencySymbol = getCurrencySymbol(currency);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const pieData = result
    ? [
        { name: "Principal", value: result.principal, fill: "#171717" },
        { name: "Interest", value: Math.max(result.totalInterest, 0), fill: "#F2765E" },
      ]
    : [];
  const balanceData = result
    ? result.schedule.map((row) => ({ year: row.year, balance: Math.round(row.balance) }))
    : [];

  const calculate = () => {
    const computed = computeMortgage(homePrice, downPayment, interestRate, loanTerm);
    if (!computed) {
        toast({
            variant: "destructive",
            title: "Invalid Input",
            description: "Enter home price (1+), down payment (0 to < price), rate (0-100%), term (up to 50 yrs).",
        });
        return;
    }

      setResult(computed);
       toast({
        title: "Calculation Complete",
        description: `Your monthly mortgage payment is ${currencySymbol}${fmt(computed.monthlyPayment)}.`,
      });
  };

  const reset = () => { setHomePrice(""); setDownPayment(""); setInterestRate(""); setLoanTerm(""); setResult(null); };

  const copyResult = async () => {
    if (!result) return;
    const text = `Mortgage: monthly ${currencySymbol}${fmt(result.monthlyPayment)}, total ${currencySymbol}${fmt(result.totalPayment)}, interest ${currencySymbol}${fmt(result.totalInterest)}. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payments"
      formula="Monthly Payment = P × [r(1+r)^n] / [(1+r)^n-1]"
      canonicalUrl="/financial-calculators/mortgage-calculator"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4">Loan Details</h2>
          <div className="space-y-4">
             <div>
              <CurrencySelector value={currency} onChange={setCurrency} />
            </div>
            <div>
              <Label>Home Price ({currencySymbol})</Label>
              <Input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} placeholder="300000" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Down Payment ({currencySymbol})</Label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="60000" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Interest Rate (%)</Label>
              <Input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="6.5" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div>
              <Label>Loan Term (Years)</Label>
              <Input type="number" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} placeholder="30" className="mt-2 h-10 bg-white border border-neutral-200" />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate} className="flex-1 h-10 gradient-button">Calculate</Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Results</h2>
            {result && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result ? (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="text-sm text-neutral-600 mb-2">Monthly Payment</div>
                <div className="text-3xl font-bold gradient-text">{currencySymbol}{fmt(result.monthlyPayment)}</div>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-[#F2765E]/25">
                  <div className="text-sm text-neutral-600">Total Payment</div>
                  <div className="text-2xl font-bold text-primary">{currencySymbol}{fmt(result.totalPayment)}</div>
                </div>
                <div className="p-4 rounded-lg bg-white border border-neutral-200 border border-secondary/20">
                  <div className="text-sm text-neutral-600">Total Interest</div>
                  <div className="text-2xl font-bold">{currencySymbol}{fmt(result.totalInterest)}</div>
                </div>
              </div>
              <div className="grid gap-2.5">
                <div className="border border-neutral-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-black mb-1">Principal vs Interest</p>
                  <div style={{ height: 220, width: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={2} strokeWidth={0}>
                          {pieData.map((entry) => (
                            <Cell key={entry.name} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 text-[11px] text-neutral-500">
                    <span><span className="inline-block w-2 h-2 bg-black rounded-full mr-1" />Principal</span>
                    <span><span className="inline-block w-2 h-2 bg-[#F2765E] rounded-full mr-1" />Interest</span>
                  </div>
                </div>
                <div className="border border-neutral-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-black mb-1">Balance Declining per Year</p>
                  <div style={{ height: 220, width: "100%" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={balanceData} margin={{ top: 5, right: 5, bottom: 0, left: -8 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={24} />
                        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={48} tickFormatter={(v: number) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`)} />
                        <Tooltip />
                        <Area type="monotone" dataKey="balance" name="Balance" stroke="#F2765E" fill="#F2765E" fillOpacity={0.18} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-600">
              <div className="text-center"><div className="text-4xl mb-2">🏠</div><p>Enter details to calculate</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Mortgage Calculator helps you estimate your monthly mortgage payment, including principal and interest. It's an essential tool for homebuyers to understand the financial commitment of a home loan."
        useCases={[
          { title: "Home Buying", description: "Estimate your monthly payments to determine how much house you can afford." },
          { title: "Refinancing", description: "Compare your current mortgage with new offers to see if refinancing can save you money." },
          { title: "Loan Comparison", description: "See how different loan terms (e.g., 15-year vs. 30-year) or down payments affect your monthly payment and total interest." },
        ]}
        tips={[
          { title: "The 20% Rule", description: "A down payment of at least 20% helps you avoid Private Mortgage Insurance (PMI), which can add to your monthly cost." },
          { title: "PITI is Key", description: "Your full monthly housing payment will also include property taxes and homeowners insurance (PITI). This calculator only shows principal and interest." },
          { title: "Shop for Rates", description: "Getting quotes from multiple lenders can save you a significant amount of money over the life of your loan." },
        ]}
        faqs={[
          { question: "What is a mortgage?", answer: "A mortgage is a loan used to purchase a home or other type of real estate. The property itself serves as collateral for the loan." },
          { question: "What's the difference between a 15-year and a 30-year mortgage?", answer: "A 15-year mortgage has higher monthly payments but a lower interest rate and less total interest paid over the life of the loan. A 30-year mortgage has lower monthly payments but you'll pay more in interest over time." },
          { question: "What is an amortization schedule?", answer: "An amortization schedule is a table detailing each periodic payment on a loan. It shows how much of each payment goes towards interest and how much goes towards paying down the principal." },
          { question: "Can I pay my mortgage off early?", answer: "Yes, making extra payments towards your principal can help you pay off your mortgage faster and save on interest. Check with your lender to ensure there are no prepayment penalties." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default MortgageCalculatorClient;

    