
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { healthCalculators } from "@/lib/data";
import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "Health & Fitness Calculators - BMI, Calorie, TDEE & More",
  description: "Track your health metrics and fitness goals. Free online calculators for BMI, calorie needs, body fat, ideal weight, and more health metrics.",
  keywords: "health calculator, fitness calculator, BMI calculator, calorie calculator, TDEE calculator, body fat calculator, ideal weight",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/health-calculators",
  },
  openGraph: {
    title: "Health & Fitness Calculators - BMI, Calorie, TDEE & More",
    description: "Track your health metrics and fitness goals. Free online calculators for BMI, calorie needs, body fat, ideal weight, and more health metrics.",
    url: "https://primemetric.online/health-calculators",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Health & Fitness Calculators - BMI, Calorie, TDEE & More",
    description: "Track your health metrics and fitness goals. Free online calculators for BMI, calorie needs, body fat, ideal weight, and more health metrics.",
  },
};

const HealthCalculatorsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={healthCalculators} breadcrumb={[{ name: "Home", path: "/" }, { name: "Health Calculators", path: "/health-calculators" }]} />
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
            Health & Fitness Calculators
          </h1>
          <p className="text-sm text-neutral-600">
            Track your health metrics and fitness goals
          </p>
        </div>
        
        <AdBanner />

        <div className="mx-auto max-w-6xl mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {healthCalculators.map((calc, index) => {
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
          <h2 className="text-lg font-bold mb-3 text-black">How health metrics work together: BMI, BMR, and TDEE</h2>
          <p className="text-sm text-neutral-600 mb-3">
            Health numbers are most useful as a chain, not in isolation. Start with <Link href="/health-calculators/bmi-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">BMI</Link>, which screens weight relative to height: a 70 kg adult who is 175 cm tall has a BMI of 70 / (1.75 × 1.75) = 22.9, squarely in the 18.5–24.9 healthy range. BMI does not distinguish muscle from fat, so pair it with body-fat and ideal-weight estimates — two people with the same 22.9 BMI can look and perform very differently if one lifts weights and the other does not.
          </p>
          <p className="text-sm text-neutral-600 mb-3">
            Next, estimate burn. <Link href="/health-calculators/bmr-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">BMR</Link> is what that same 70 kg adult burns at complete rest — roughly 1,600–1,700 kcal per day for a 30-year-old man using the Mifflin-St Jeor equation — while <Link href="/health-calculators/tdee-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">TDEE</Link> multiplies BMR by activity: sedentary (×1.2) gives about 2,000 kcal, moderately active (×1.55) gives about 2,600 kcal, and very active (×1.9) exceeds 3,100 kcal. That 600–1,100 kcal swing explains why generic &ldquo;eat 2,000 calories&rdquo; advice fails: the right target depends on your size, age, and training load.
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Finally, turn TDEE into a plan. Subtract 300–500 kcal per day for sustainable fat loss of about 0.25–0.5 kg per week, or add 200–300 kcal for lean muscle gain, then split calories into macros: around 1.6–2.2 g of protein per kg of body weight (112–154 g for our 70 kg example), 45–65% of calories from carbohydrates for active people, and the rest from fats. Check water intake (about 30–35 ml per kg, or 2.1–2.5 liters), sleep consistency, and heart-rate zones alongside the scale — if weight stalls for 2–3 weeks, recalculate TDEE first, because a 5 kg loss alone can lower daily burn by 100–150 kcal. Re-measure monthly and adjust portions before cutting further, since sleep debt and stress can mask steady fat-loss progress.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-black">Popular in this category:</span>
            <Link href="/health-calculators/bmi-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">BMI Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/health-calculators/bmr-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">BMR Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/health-calculators/tdee-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">TDEE Calculator</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HealthCalculatorsPage;
