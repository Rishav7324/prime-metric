import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import AdBanner from "./AdBanner";
import { ShareButtons } from "./ShareButtons";
import { SaveButton } from "./SaveButton";
import { allCalculators } from "@/lib/data";

type CalculatorLayoutProps = {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  formula?: string;
  explanation?: React.ReactNode;
  children: React.ReactNode;
};

type GenerateMetadataProps = Omit<CalculatorLayoutProps, 'children' | 'formula' | 'explanation'>;

export function generateMetadata({ title, description, keywords, canonicalUrl }: GenerateMetadataProps): Metadata {
  const fullTitle = `${title} | Prime Metric`;
  const fullUrl = `https://primemetric.online${canonicalUrl}`;

  return {
    title: fullTitle,
    description: description,
    keywords: keywords,
    alternates: { canonical: fullUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: description,
      url: fullUrl,
      siteName: 'Prime Metric',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://primemetric.online/logo.png',
          width: 512,
          height: 512,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description,
      images: ['https://primemetric.online/logo.png'],
    },
  };
}

const CalculatorLayout = ({
  title,
  description,
  formula,
  explanation,
  children,
  canonicalUrl,
}: CalculatorLayoutProps & { canonicalUrl: string }) => {
  const parts = canonicalUrl.split('/').filter(Boolean);
  const category = parts.length > 1 ? parts[0] : 'tools';
  const categoryLabel = category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const related = allCalculators
    .filter((c) => c.path.startsWith(`/${category}/`) && c.path !== canonicalUrl)
    .slice(0, 4);

  const now = new Date();
  const updatedLabel = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const dateModified = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const fullUrl = `https://primemetric.online${canonicalUrl}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": title,
    "description": description,
    "url": fullUrl,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web",
    "isAccessibleForFree": true,
    "inLanguage": "en",
    "dateModified": dateModified,
    "author": { "@type": "Organization", "name": "Prime Metric", "url": "https://primemetric.online" },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://primemetric.online" },
      { "@type": "ListItem", "position": 2, "name": categoryLabel, "item": `https://primemetric.online/${category}` },
      { "@type": "ListItem", "position": 3, "name": title },
    ],
  };

  return (
    <main className="bg-white text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
          <Link href="/" className="hover:text-[#F2765E]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/${category}`} className="hover:text-[#F2765E] capitalize">{categoryLabel}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black font-medium truncate">{title}</span>
        </nav>

        <div className="text-center">
          <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF5F2] text-[#c25136] border border-[#F2765E]/25 mb-2.5">
            Free Online Tool
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">{title}</h1>
          <p className="mt-1.5 text-sm sm:text-[15px] text-neutral-600 max-w-xl mx-auto">{description}</p>
          <div className="mt-2.5 flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[11px] text-neutral-500">Reviewed by Prime Metric • Updated {updatedLabel}</span>
            <ShareButtons url={fullUrl} title={title} />
            <SaveButton path={canonicalUrl} title={title} />
          </div>
          {formula && (
            <div className="mt-3 inline-block font-mono text-xs sm:text-sm px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-lg text-black">
              {formula}
            </div>
          )}
          {explanation && (
            <p className="mt-2.5 text-xs text-neutral-500 italic max-w-md mx-auto">{explanation}</p>
          )}
        </div>

        <div className="mt-5 bg-white border border-neutral-200 rounded-2xl p-3.5 sm:p-5 shadow-sm">
          {children}
        </div>

        {related.length > 0 && (
          <section aria-label="Related calculators" className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <h2 className="text-base sm:text-lg font-bold text-black">Related Calculators</h2>
              <Link href={`/${category}`} className="text-xs font-semibold text-[#F2765E] hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {related.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.id} href={tool.path} className="group">
                    <div className="tool-card flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#FFF5F2] flex items-center justify-center shrink-0">
                        <Icon className="w-4.5 h-4.5 text-[#F2765E]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-semibold text-black group-hover:text-[#F2765E] leading-snug">{tool.name}</h3>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">{tool.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <AdBanner />
      </div>
    </main>
  );
};

export default CalculatorLayout;
