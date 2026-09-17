import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { categories, allCalculators, faqData } from "@/lib/data";
import { HomeSearch } from "@/components/HomeSearch";
import React from 'react';
import AdBanner from "@/components/AdBanner";
import { Faq } from "@/components/faq";
import { RecentlyViewed } from "@/components/RecentlyViewed";

export const metadata: Metadata = {
  title: 'Prime Metric - Free Online Calculators & Tools',
  description: 'Access 100+ free online calculators for finance, health, math & daily use. Fast, accurate, mobile-friendly, no sign-up required.',
  keywords: 'calculator, online calculator, free calculator, BMI calculator, loan calculator, mortgage calculator, percentage calculator, EMI calculator, age calculator',
  alternates: { canonical: 'https://primemetric.online' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Prime Metric - Free Online Calculators & Tools',
    description: '100+ free calculators for finance, health, math & daily use. Fast, accurate, no sign-up.',
    url: 'https://primemetric.online',
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Metric - Free Online Calculators & Tools',
    description: '100+ free calculators for finance, health, math & daily use.',
  },
};

const popularIds = ["bmi", "loan", "currency", "percentage", "mortgage", "age", "sip", "tip"];
const popularTools = popularIds
  .map((id) => allCalculators.find((c) => c.id === id))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const steps = [
  { n: "1", title: "Pick a tool", description: "Search or browse 100+ calculators by category." },
  { n: "2", title: "Enter values", description: "Type your numbers — results update instantly." },
  { n: "3", title: "Understand it", description: "See formulas, breakdowns and pro tips." },
];

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Prime Metric",
  "url": "https://primemetric.online",
  "description": "100+ free online calculators for finance, health, math & daily use.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://primemetric.online/all-calculators?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prime Metric",
  "url": "https://primemetric.online",
  "logo": "https://primemetric.online/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "help@primemetric.online",
    "contactType": "customer service"
  }
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
  }))
};

const jsonLdHowTo = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to use Prime Metric calculators",
  "step": steps.map((s, i) => ({
    "@type": "HowToStep",
    "position": i + 1,
    "name": s.title,
    "text": s.description,
  }))
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }} />

      {/* Hero */}
      <header className="bg-[#FFF8F6] border-b border-[#F2765E]/10">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-6 sm:pt-10 sm:pb-8 text-center">
          <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white text-[#c25136] border border-[#F2765E]/25 mb-3">
            100% Free • No Sign-Up
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-black">
            Every Calculator You Need,
            <span className="block text-[#F2765E]">In One Place</span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
            Finance, health, math & daily tools with instant answers and clear explanations.
          </p>

          <HomeSearch />

          <dl className="flex items-center justify-center gap-5 sm:gap-8 mt-5 text-center">
            <div><dt className="sr-only">Tools</dt><dd className="text-lg sm:text-xl font-bold text-black">{allCalculators.length}+</dd><dd className="text-[11px] text-neutral-500">Free tools</dd></div>
            <div className="w-px h-8 bg-neutral-200" aria-hidden="true" />
            <div><dd className="text-lg sm:text-xl font-bold text-black">6</dd><dd className="text-[11px] text-neutral-500">Categories</dd></div>
            <div className="w-px h-8 bg-neutral-200" aria-hidden="true" />
            <div><dd className="text-lg sm:text-xl font-bold text-black">0s</dd><dd className="text-[11px] text-neutral-500">Instant results</dd></div>
            <div className="w-px h-8 bg-neutral-200" aria-hidden="true" />
            <div><dd className="text-lg sm:text-xl font-bold text-black flex items-center gap-1 justify-center"><Zap className="w-4 h-4 text-[#F2765E]" />Free</dd><dd className="text-[11px] text-neutral-500">Forever</dd></div>
          </dl>
        </div>
      </header>

      <main>
        {/* Popular tools - 2 grid */}
        <section className="py-7 bg-white" aria-labelledby="popular-heading">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-end justify-between mb-3.5">
              <div>
                <h2 id="popular-heading" className="text-xl sm:text-2xl font-bold text-black">Most Popular Tools</h2>
                <p className="text-[13px] text-neutral-600 mt-0.5">Loved by thousands of daily users</p>
              </div>
              <Link href="/all-calculators" className="text-[13px] font-semibold text-[#F2765E] hover:underline shrink-0 hidden sm:flex items-center gap-1">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popularTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.id} href={tool.path} className="group">
                    <div className="tool-card flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-black group-hover:text-[#F2765E] leading-snug">{tool.name}</h3>
                        <p className="text-xs text-neutral-500 line-clamp-1">{tool.description}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#F2765E] shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-4 sm:hidden">
              <Link href="/all-calculators">
                <Button size="sm" variant="outline" className="border-[#F2765E] text-[#F2765E]">View all tools</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories - 2 grid */}
        <section className="py-7 bg-neutral-50 border-y border-neutral-200/70" aria-labelledby="cat-heading">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-3.5">
              <h2 id="cat-heading" className="text-xl sm:text-2xl font-bold text-black">Explore by Category</h2>
              <p className="text-[13px] text-neutral-600 mt-0.5">Six collections, one for every need</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link key={category.title} href={category.path} className="group">
                    <div className="tool-card bg-white h-full">
                      <div className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center shrink-0 group-hover:bg-[#F2765E] transition-colors">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-[15px] font-bold text-black group-hover:text-[#F2765E]">{category.title}</h3>
                          <p className="text-xs text-neutral-600 mt-0.5">{category.description}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {category.calculators.slice(0, 3).map((calc) => (
                              <span key={calc} className="text-[11px] px-2 py-0.5 rounded-full bg-[#FFF5F2] text-[#c25136] border border-[#F2765E]/25">{calc}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <RecentlyViewed />

        <AdBanner />

        {/* How it works */}
        <section className="py-7 bg-white" aria-labelledby="how-heading">
          <div className="mx-auto max-w-6xl px-4">
            <h2 id="how-heading" className="text-xl sm:text-2xl font-bold text-black text-center">How It Works</h2>
            <p className="text-[13px] text-neutral-600 text-center mt-0.5 mb-4">Answer in three simple steps</p>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {steps.map((s) => (
                <li key={s.n} className="border border-neutral-200 rounded-xl p-4 bg-white flex gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#F2765E] text-white text-sm font-bold flex items-center justify-center shrink-0">{s.n}</span>
                  <div>
                    <h3 className="text-sm font-bold text-black">{s.title}</h3>
                    <p className="text-xs text-neutral-600 mt-0.5">{s.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Why us */}
        <section className="py-7 bg-[#FFF8F6]" aria-labelledby="why-heading">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid sm:grid-cols-2 gap-3 items-stretch">
              <div className="bg-white border border-neutral-200 rounded-2xl p-5">
                <h2 id="why-heading" className="text-xl font-bold text-black">Why Prime Metric?</h2>
                <p className="text-[13px] text-neutral-600 mt-1.5">
                  Most calculators give answers without clarity. We show the formula, the breakdown and what the number means — in simple words.
                </p>
                <ul className="mt-3.5 space-y-2">
                  {["Instant & accurate results", "Formulas explained simply", "Breakdowns, tables & pro tips", "Free forever, no sign-up"].map((t) => (
                    <li key={t} className="flex items-center gap-2 text-[13px] text-black font-medium"><CheckCircle className="h-4 w-4 text-[#F2765E] shrink-0" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-black text-white rounded-2xl p-5 flex flex-col justify-center">
                <h3 className="text-xl font-bold">Stop guessing.<br />Start calculating.</h3>
                <p className="text-[13px] text-neutral-300 mt-1.5">Join thousands who plan loans, diets, grades and trips with Prime Metric every day.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/all-calculators"><Button size="sm" className="h-9">Browse All Calculators</Button></Link>
                  <Link href="/all-tools"><Button size="sm" variant="outline" className="h-9 bg-transparent text-white border-neutral-600 hover:bg-white hover:text-black">All Tools</Button></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Faq />
        <AdBanner />

        {/* Help strip */}
        <section className="pb-8 bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-center text-xs text-neutral-500">
              Need help or want a new calculator? <a href="mailto:help@primemetric.online" className="text-[#F2765E] font-semibold hover:underline">help@primemetric.online</a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
