
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { mathCalculators } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "Math Calculators - Scientific, Algebra, Geometry & More",
  description: "Advanced mathematical tools and calculators. Free online calculators for percentage, scientific calculations, geometry, fractions, and more.",
  keywords: "math calculator, scientific calculator, percentage calculator, fraction calculator, geometry calculator, algebra calculator",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/math-calculators",
  },
  openGraph: {
    title: "Math Calculators - Scientific, Algebra, Geometry & More",
    description: "Advanced mathematical tools and calculators. Free online calculators for percentage, scientific calculations, geometry, fractions, and more.",
    url: "https://primemetric.online/math-calculators",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Math Calculators - Scientific, Algebra, Geometry & More",
    description: "Advanced mathematical tools and calculators. Free online calculators for percentage, scientific calculations, geometry, fractions, and more.",
  },
};

const MathCalculatorsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={mathCalculators} breadcrumb={[{ name: "Home", path: "/" }, { name: "Math Calculators", path: "/math-calculators" }]} />
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Math Calculators
          </h1>
          <p className="text-sm text-neutral-600">
            Advanced mathematical tools and calculators
          </p>
        </div>
        
        <AdBanner />

        <div className="mx-auto max-w-6xl mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {mathCalculators.map((calc, index) => {
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
            )})}
          </div>
        </div>

        <section className="mx-auto max-w-6xl mt-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-black">Everyday math, solved: percentages, discounts, and fractions</h2>
          <p className="text-sm text-neutral-600 mb-3">
            Most daily math is percentage math in disguise. A 20% discount on a $60 jacket means you pay 80%: $60 × 0.80 = $48, saving $12. Stack a second 10% coupon and you pay $48 × 0.90 = $43.20, not $42 — percentages multiply, they do not add. The same logic runs taxes and tips: an $85 restaurant bill with 8% sales tax plus a 15% tip is $85 × 1.08 = $91.80, then $91.80 × 1.15 ≈ $105.57, which is why our <Link href="/math-calculators/percentage-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">percentage calculator</Link> handles &ldquo;X is what percent of Y&rdquo; and &ldquo;X increased by Y%&rdquo; as separate modes.
          </p>
          <p className="text-sm text-neutral-600 mb-3">
            Fractions and ratios show up wherever things are split. Half a cup plus two-thirds of a cup is 1/2 + 2/3 = 3/6 + 4/6 = 7/6, or 1 1/6 cups — a <Link href="/math-calculators/fraction-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">fraction calculator</Link> prevents the classic mistake of adding denominators. Ratios work the same way: a 2:3 paint mix totaling 5 liters means 2 liters of color A and 3 liters of color B, and scaling to 15 liters simply triples both sides. For repeated scaling, averages, and spreads, pair these with mean, median, and standard-deviation tools: five quiz scores of 72, 78, 81, 85, and 94 average 82, but the median of 81 better reflects the &ldquo;typical&rdquo; score when one outlier skews the mean.
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Geometry and number tools finish the toolkit. A 12-foot by 15-foot room is 180 square feet, so with 10% waste you should order about 198 square feet of flooring; a circle with a 9-inch radius holds π × 9² ≈ 254 square inches of pizza — roughly 27% more than an 8-inch radius at 201 square inches. Use long division with remainders for splitting costs ($412 ÷ 6 = $68 each with $4 left), HCF and LCM for syncing schedules or simplifying 48/180 to 4/15, and binary and hex converters when subnet masks or color codes like #F2765E need translating between base 2, base 10, and base 16.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-black">Popular in this category:</span>
            <Link href="/math-calculators/percentage-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">Percentage Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/math-calculators/fraction-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">Fraction Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/math-calculators/average-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">Average Calculator</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MathCalculatorsPage;
