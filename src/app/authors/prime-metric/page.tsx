import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, BadgeCheck, RefreshCw, Calculator, HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Prime Metric Team | Prime Metric",
  description:
    "Meet the Prime Metric Editorial Team — the editors who build, test, and maintain our free finance and health calculators with verified formulas and regular 2026 updates.",
  alternates: { canonical: "https://primemetric.online/authors/prime-metric" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About the Prime Metric Team | Prime Metric",
    description:
      "Meet the Prime Metric Editorial Team — the editors who build, test, and maintain our free finance and health calculators with verified formulas and regular 2026 updates.",
    url: "https://primemetric.online/authors/prime-metric",
    siteName: "Prime Metric",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "https://primemetric.online/logo.png",
        width: 512,
        height: 512,
        alt: "Prime Metric Editorial Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About the Prime Metric Team | Prime Metric",
    description:
      "Meet the editors behind Prime Metric's free finance and health calculators — verified formulas, transparent methods, regular updates.",
  },
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Prime Metric Editorial Team",
  jobTitle: "Financial & Health Calculator Editors",
  url: "https://primemetric.online/authors/prime-metric",
  sameAs: ["https://primemetric.online"],
  worksFor: {
    "@type": "Organization",
    name: "Prime Metric",
    url: "https://primemetric.online",
  },
  description:
    "The Prime Metric Editorial Team builds and maintains free finance, health, math, and everyday calculators with verified formulas and plain-language explanations.",
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://primemetric.online" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Authors",
      item: "https://primemetric.online/authors/prime-metric",
    },
  ],
};

export default function AuthorPage() {
  return (
    <LegalPageLayout title="About the Prime Metric Team">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div
            aria-hidden="true"
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F2765E] text-2xl font-bold text-white"
          >
            PM
          </div>
          <div className="text-center sm:text-left">
            <p className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF5F2] text-[#c25136] border border-[#F2765E]/25 mb-2">
              Editorial Team
            </p>
            <h2 className="text-xl font-semibold">Prime Metric Editorial Team</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Financial &amp; Health Calculator Editors · India &amp; Global
            </p>
          </div>
        </div>
        <p className="text-muted-foreground mt-5">
          The Prime Metric Editorial Team maintains every calculator on this site — from SIP,
          PPF, EMI, and income-tax tools to BMI, BMR, and calorie calculators. We write the
          formulas, test edge cases, and pair each result with plain-language explanations so
          you understand not just the number, but what it means for you.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-muted-foreground">
            <Calculator className="h-3.5 w-3.5 text-[#F2765E]" /> 100+ finance, health &amp; math tools
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-muted-foreground">
            <HeartPulse className="h-3.5 w-3.5 text-[#F2765E]" /> Health formulas cross-checked with WHO / CDC guidance
          </span>
        </div>
      </Card>

      <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur mb-6">
        <h2 className="text-xl font-semibold mb-3">How we review</h2>
        <ol className="space-y-4 text-muted-foreground">
          <li className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2765E] text-sm font-bold text-white">
              1
            </span>
            <span>
              <strong className="text-foreground">Verify the formula.</strong> Every calculator
              starts from an industry-standard formula or official rule (e.g. RBI guidance, bank
              rate sheets, WHO BMI cut-offs), documented on the tool page.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2765E] text-sm font-bold text-white">
              2
            </span>
            <span>
              <strong className="text-foreground">Test with real numbers.</strong> We run sample
              inputs — including edge cases like zero tenure or extreme weights — and compare
              outputs against spreadsheets and official calculators.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2765E] text-sm font-bold text-white">
              3
            </span>
            <span>
              <strong className="text-foreground">Second-editor check.</strong> A second editor
              re-reads the explanation, assumptions, and FAQs for clarity and correctness before
              anything is published.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F2765E] text-sm font-bold text-white">
              4
            </span>
            <span>
              <strong className="text-foreground">Monitor &amp; update.</strong> Rates and rules
              change, so we re-check high-impact tools on a fixed cadence and after major
              announcements (budgets, RBI policy, scheme notifications).
            </span>
          </li>
        </ol>
        <p className="mt-4 text-sm">
          <Link href="/editorial-policy" className="text-[#c25136] hover:underline font-medium">
            Read our full editorial policy →
          </Link>
        </p>
      </Card>

      <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-[#F2765E]" /> Update cadence
        </h2>
        <p className="text-muted-foreground">
          Finance calculators that depend on administered rates (EPF, PPF, SSY, NSC) and tax
          slabs are reviewed at least quarterly and immediately after official changes. Health
          calculators are reviewed at least twice a year against current WHO and CDC guidance.
          Each tool page shows its assumptions so you always know what a result is based on.
        </p>
      </Card>

      <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur mb-6">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-[#F2765E]" /> A quick disclaimer
        </h2>
        <p className="text-muted-foreground">
          Our calculators are educational tools, not professional advice. Finance results are
          estimates — confirm decisions with your bank or a qualified adviser. Health results
          are informational only — consult a doctor for personal medical guidance. See our{" "}
          <Link href="/disclaimer" className="text-[#c25136] hover:underline">
            Disclaimer
          </Link>{" "}
          for details.
        </p>
      </Card>

      <div className="text-center mt-8">
        <h2 className="text-xl font-semibold mb-2">Spot an error or have a suggestion?</h2>
        <p className="text-muted-foreground mb-4 text-sm">
          We correct verified errors quickly — tell us which calculator and what you entered.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
          <a href="mailto:help@primemetric.online">
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              help@primemetric.online
            </Button>
          </a>
        </div>
      </div>
    </LegalPageLayout>
  );
}
