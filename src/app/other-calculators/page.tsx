
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
                            {!calc.implemented && (
                              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                                Coming Soon
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    </Link>
                    {(index + 1) % 6 === 0 && <div className="sm:col-span-2" key={`ad-${index}`}><AdBanner/></div>}
                  </React.Fragment>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherCalculatorsPage;
