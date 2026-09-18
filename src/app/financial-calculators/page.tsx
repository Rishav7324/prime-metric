
import Link from "next/link";
import { DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { financialCalculators } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "Financial Calculators - Free Online Finance & Investment Tools",
  description: "Comprehensive suite of financial planning and calculation tools. Calculate mortgages, loans, investments, retirement, and more with our free financial calculators.",
  keywords: "financial calculator, mortgage calculator, loan calculator, investment calculator, retirement calculator, budget calculator",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/financial-calculators",
  },
  openGraph: {
    title: "Financial Calculators - Free Online Finance & Investment Tools",
    description: "Comprehensive suite of financial planning and calculation tools. Calculate mortgages, loans, investments, retirement, and more with our free financial calculators.",
    url: "https://primemetric.online/financial-calculators",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Financial Calculators - Free Online Finance & Investment Tools",
    description: "Comprehensive suite of financial planning and calculation tools. Calculate mortgages, loans, investments, retirement, and more with our free financial calculators.",
  },
};

const FinancialCalculatorsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={financialCalculators} breadcrumb={[{ name: "Home", path: "/" }, { name: "Financial Calculators", path: "/financial-calculators" }]} />
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black">
            Financial Calculators
          </h1>
          <p className="text-sm text-neutral-600">
            Comprehensive suite of financial planning and calculation tools
          </p>
        </div>
        
        <AdBanner />

        {/* Calculators Grid */}
        <div className="mx-auto max-w-6xl mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {financialCalculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <React.Fragment key={calc.id}>
                    <Link
                        href={calc.path}
                        className="group"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <Card className="bg-white border border-neutral-200 p-4 shadow-sm h-full hover:border-[#F2765E] transition-all duration-200 hover:-translate-y-0.5">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm mb-1 group-hover:text-[#F2765E] transition-colors">
                                {calc.name}
                            </h3>
                            <p className="text-sm text-neutral-600 line-clamp-2">
                                {calc.description}
                            </p>
                            
                            </div>
                        </div>
                        </Card>
                    </Link>
                    
                  </React.Fragment>
                )
            })}
          </div>
        </div>

        <section className="mx-auto max-w-6xl mt-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-black">How to choose the right financial calculator</h2>
          <p className="text-sm text-neutral-600 mb-3">
            Start with the question you are actually trying to answer: &ldquo;Can I afford this payment?&rdquo; is different from &ldquo;What will this cost me over time?&rdquo; Use an <Link href="/financial-calculators/emi-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">EMI calculator</Link> when you already know the loan amount, rate, and tenure — for example, a $320,000 mortgage at 6.5% for 30 years costs about $2,023 per month before taxes and insurance. Use a <Link href="/financial-calculators/house-affordability-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">house affordability calculator</Link> when you are shopping: lenders commonly apply the 28% housing ratio, meaning total housing costs should stay under 28% of gross monthly income. On an $80,000 salary ($6,667 per month), that caps housing at about $1,867 per month, and putting 20% down ($80,000 on a $400,000 home) usually avoids private mortgage insurance and lowers lifetime interest by tens of thousands.
          </p>
          <p className="text-sm text-neutral-600 mb-3">
            For wealth building, match the tool to the cash flow. A <Link href="/financial-calculators/sip-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">SIP calculator</Link> models fixed monthly investing, while lump-sum, compound-interest, and step-up SIP tools model one-time deposits or contributions that rise each year. The difference is dramatic: investing $500 per month for 20 years at a 10% average annual return grows to roughly $380,000, even though you contributed only $120,000 — the rest is compounding. A 2% higher fee or a 3% inflation rate can erase a similar amount over the same period, so always run the inflation and CAGR versions side by side before choosing between a fixed deposit, index fund, or retirement account.
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Finally, compare borrowing costs with APR rather than headline interest alone, because APR folds in fees and reflects the true yearly cost. If you carry multiple balances, a debt-payoff calculator showing avalanche (highest rate first) versus snowball (smallest balance first) often reveals $1,000–$3,000 in interest savings on a $15,000 credit-card balance. Revisit retirement, rent-vs-buy, and budget calculators once a year or after any raise, move, or rate change — a 1% mortgage-rate shift changes a $300,000 loan payment by about $180 per month, which is exactly the kind of decision these tools make visible in seconds.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-black">Popular in this category:</span>
            <Link href="/financial-calculators/emi-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">EMI Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/financial-calculators/house-affordability-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">House Affordability Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/financial-calculators/sip-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">SIP Calculator</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FinancialCalculatorsPage;
