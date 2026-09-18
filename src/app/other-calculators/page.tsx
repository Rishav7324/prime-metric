
import Link from "next/link";
import { Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { otherCalculators } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
    title: "Daily Utility Calculators - Age, Time, GPA & More Tools",
    description: "Practical tools for everyday calculations. Free online calculators for age, date, time, GPA, password generation, and more daily utilities.",
    keywords: "utility calculator, age calculator, date calculator, time calculator, GPA calculator, password generator, everyday tools",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/other-calculators",
  },
  openGraph: {
    title: "Daily Utility Calculators - Age, Time, GPA & More Tools",
    description: "Practical tools for everyday calculations. Free online calculators for age, date, time, GPA, password generation, and more daily utilities.",
    url: "https://primemetric.online/other-calculators",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Daily Utility Calculators - Age, Time, GPA & More Tools",
    description: "Practical tools for everyday calculations. Free online calculators for age, date, time, GPA, password generation, and more daily utilities.",
  },
};

const OtherCalculatorsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={otherCalculators} breadcrumb={[{ name: "Home", path: "/" }, { name: "Other Calculators", path: "/other-calculators" }]} />
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Daily Utility Calculators
          </h1>
          <p className="text-sm text-neutral-600">
            Practical tools for everyday calculations
          </p>
        </div>
        
        <AdBanner />

        <div className="mx-auto max-w-6xl mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {otherCalculators.map((calc, index) => {
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
          <h2 className="text-lg font-bold mb-3 text-black">Daily utilities that save time: age, dates, and time zones</h2>
          <p className="text-sm text-neutral-600 mb-3">
            Small date questions cause outsized hassle without the right tool. An <Link href="/other-calculators/age-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">age calculator</Link> turns a birthdate like March 14, 1998 into an exact answer — 28 years, 6 months, and 4 days on September 18, 2026, or about 10,415 days — which settles school cutoffs, insurance bands, and retirement eligibility in one click. A <Link href="/other-calculators/date-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">date calculator</Link> does the reverse: add 90 days to a contract signed January 10 to get an April 10 deadline, or count 45 business days for a project timeline while skipping weekends and holidays.
          </p>
          <p className="text-sm text-neutral-600 mb-3">
            Time math is equally error-prone. A <Link href="/other-calculators/time-calculator" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">time calculator</Link> adds a 7-hour-45-minute shift starting at 9:15 PM to correctly land at 5:00 AM the next day, including overtime past 40 hours, while a <Link href="/other-calculators/time-zone-converter" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">time zone converter</Link> prevents the classic missed meeting: 3:00 PM in New York (EST, UTC−5) is 8:00 PM in London (GMT, UTC+0) and 1:30 AM the next day in Mumbai (IST, UTC+5:30). For remote teams spanning San Francisco, Berlin, and Sydney, pin the overlap window — often just 1–2 hours around 8–10 AM Pacific — before sending recurring invites.
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            The same category streamlines money and school decisions. Splitting a $184 dinner four ways with 8% tax and an 18% tip is $184 × 1.08 × 1.18 ÷ 4 ≈ $58.60 per person, not the $46 the raw bill suggests. Students can model grades precisely: scoring 88% on a final worth 30% of the course lifts an 81% average to 83.1%, while a GPA tool converts five courses of A, A−, B+, B, and C+ into roughly a 3.3 on a 4.0 scale. Bookmark these utilities for forms, deadlines, travel itineraries, and unit conversions — five minutes with the right calculator beats an hour of manual calendar counting.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-black">Popular in this category:</span>
            <Link href="/other-calculators/age-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">Age Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/other-calculators/date-calculator" className="underline underline-offset-2 hover:text-[#F2765E]">Date Calculator</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/other-calculators/time-zone-converter" className="underline underline-offset-2 hover:text-[#F2765E]">Time Zone Converter</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OtherCalculatorsPage;
