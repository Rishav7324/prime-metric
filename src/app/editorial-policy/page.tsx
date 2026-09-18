import LegalPageLayout from "@/components/LegalPageLayout";
import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Editorial Policy | Prime Metric",
  description:
    "How Prime Metric keeps calculators accurate: verification standards, trusted sources (WHO, CDC, RBI, bank rates), review process, 2026 India rate updates, corrections, and ad separation.",
  keywords:
    "editorial policy, accuracy standards, corrections policy, primemetric editors, EPF 8.25 PPF 7.1 SSY 8.2",
  alternates: { canonical: "https://primemetric.online/editorial-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Editorial Policy | Prime Metric",
    description:
      "How Prime Metric keeps calculators accurate: verification standards, trusted sources, review process, 2026 updates, corrections, and ad separation.",
    url: "https://primemetric.online/editorial-policy",
    siteName: "Prime Metric",
    locale: "en_US",
    type: "article",
    images: [
      {
        url: "https://primemetric.online/logo.png",
        width: 512,
        height: 512,
        alt: "Prime Metric Editorial Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Policy | Prime Metric",
    description:
      "Accuracy standards, trusted sources, review process, 2026 rate updates, corrections, and ad separation.",
  },
};

const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Editorial Policy | Prime Metric",
  description:
    "How Prime Metric keeps calculators accurate: verification standards, trusted sources, review process, update cadence, corrections, and advertising separation.",
  url: "https://primemetric.online/editorial-policy",
  isPartOf: {
    "@type": "WebSite",
    name: "Prime Metric",
    url: "https://primemetric.online",
  },
  author: {
    "@type": "Person",
    name: "Prime Metric Editorial Team",
    url: "https://primemetric.online/authors/prime-metric",
  },
  datePublished: "2026-01-15",
  dateModified: "2026-09-17",
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://primemetric.online" },
    { "@type": "ListItem", position: 2, name: "Editorial Policy" },
  ],
};

export default function EditorialPolicyPage() {
  return (
    <LegalPageLayout title="Editorial Policy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <p className="text-muted-foreground mb-6 text-center text-sm">
        Last updated: September 17, 2026 · Maintained by the{" "}
        <Link
          href="/authors/prime-metric"
          className="text-[#c25136] hover:underline font-medium"
        >
          Prime Metric Editorial Team
        </Link>
      </p>

      <div className="space-y-6">
        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Accuracy standards</h2>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Every calculator uses an industry-standard formula or official rule, shown or described on the tool page.</li>
            <li>We state assumptions and limitations (e.g. fees excluded, pre-tax vs post-tax) so results are interpretable.</li>
            <li>Sample inputs are tested against spreadsheets or official calculators, including edge cases.</li>
            <li>A second editor checks formulas, explanations, and FAQs before publication.</li>
            <li>We never invent rates, thresholds, or medical cut-offs — if a value is illustrative, we label it as an example.</li>
          </ul>
        </Card>

        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Sources we cite</h2>
          <p className="text-muted-foreground mb-3">
            We prioritise primary, authoritative sources over blogs or aggregators:
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>Health: World Health Organization (WHO) and U.S. Centers for Disease Control and Prevention (CDC) for BMI categories, activity guidance, and general health references.</li>
            <li>Indian finance: Reserve Bank of India (RBI) policy and reporting, official small-savings scheme notifications, and published bank rate sheets for loans and deposits.</li>
            <li>Tax: official budget documents and income-tax guidance for slab-based calculators.</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            Where a tool page relies on a specific source, it is linked or named there. Figures
            without a cited source should be treated as illustrative estimates.
          </p>
        </Card>

        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Review process</h2>
          <ol className="list-decimal pl-6 space-y-1.5 text-muted-foreground">
            <li>Draft: an editor builds the calculator logic and writes the explanation, formula breakdown, and FAQs.</li>
            <li>Verification: sample outputs are checked against independent calculations or official tools.</li>
            <li>Second read: another editor reviews clarity, correctness, and tone.</li>
            <li>Post-publish monitoring: user feedback and scheduled re-checks trigger fixes or refreshes.</li>
          </ol>
        </Card>

        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Update cadence</h2>
          <p className="text-muted-foreground mb-3">
            Rate-dependent finance tools are reviewed at least quarterly and immediately after
            major official changes (Union Budget, RBI policy, scheme notifications). Health
            tools are reviewed at least twice a year.
          </p>
          <p className="text-muted-foreground mb-3">
            Current administered rates reflected in our 2026 checks: EPF 8.25%, PPF 7.1%, and
            Sukanya Samriddhi Yojana (SSY) 8.2%. If the government revises these rates, affected
            calculators and guides are updated and the change is noted where visible.
          </p>
          <p className="text-muted-foreground">
            Calculators that do not depend on external rates (e.g. percentage, age, BMI math)
            are re-tested at least annually.
          </p>
        </Card>

        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Corrections policy</h2>
          <p className="text-muted-foreground mb-3">
            Found a mistake? Email{" "}
            <a
              href="mailto:help@primemetric.online"
              className="text-[#c25136] hover:underline"
            >
              help@primemetric.online
            </a>{" "}
            with the page URL, the inputs you used, and what looked wrong.
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-muted-foreground">
            <li>We acknowledge reports promptly and investigate against primary sources.</li>
            <li>Verified errors are fixed as fast as possible; material fixes are noted on the page or in the content where practical.</li>
            <li>We do not silently change methodology to hide errors — corrections preserve the page history in our review log.</li>
          </ul>
        </Card>

        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Advertising separation</h2>
          <p className="text-muted-foreground">
            Prime Metric is free to use and supported by advertising, including Google AdSense.
            Ads are clearly separate from calculator results and editorial content. Advertisers
            do not influence our formulas, explanations, or recommendations, and sponsored
            content — if ever published — would be explicitly labelled. See our{" "}
            <Link href="/privacy-policy" className="text-[#c25136] hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="text-[#c25136] hover:underline">
              Cookie Policy
            </Link>{" "}
            for how ads and cookies work on this site.
          </p>
        </Card>

        <Card className="p-6 sm:p-8 bg-card/80 backdrop-blur">
          <h2 className="text-xl font-semibold mb-3">Medical &amp; finance disclaimer</h2>
          <p className="text-muted-foreground">
            Content and calculator outputs are for general information only — not financial,
            tax, legal, or medical advice. Finance results are estimates; confirm important
            decisions with your bank or a qualified professional. Health results are
            informational; consult a doctor for personal guidance. Full details in our{" "}
            <Link href="/disclaimer" className="text-[#c25136] hover:underline">
              Disclaimer
            </Link>
            . Questions about this policy?{" "}
            <Link href="/contact" className="text-[#c25136] hover:underline">
              Contact us
            </Link>
            .
          </p>
        </Card>
      </div>
    </LegalPageLayout>
  );
}
