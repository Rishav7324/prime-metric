import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Calculator, Heart, Landmark, Percent, Clock, PiggyBank, TrendingUp, Receipt, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Prime Metric Hindi - मुफ्त ऑनलाइन कैलकुलेटर",
  description: "हिंदी में मुफ्त कैलकुलेटर: बीएमआई, ईएमआई, एसआईपी, ब्याज, आयु और बहुत कुछ। तेज़, सटीक, बिना साइन-अप।",
  keywords: "hindi calculator, बीएमआई कैलकुलेटर, ईएमआई कैलकुलेटर, एसआईपी कैलकुलेटर, online calculator hindi",
  alternates: {
    canonical: "https://primemetric.online/hi",
    languages: { hi: "https://primemetric.online/hi", "x-default": "https://primemetric.online" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Prime Metric Hindi - मुफ्त ऑनलाइन कैलकुलेटर",
    description: "हिंदी में मुफ्त कैलकुलेटर: बीएमआई, ईएमआई, एसआईपी और बहुत कुछ।",
    url: "https://primemetric.online/hi",
    siteName: "Prime Metric",
    locale: "hi_IN",
    type: "website",
  },
};

const hiTools = [
  { name: "बीएमआई कैलकुलेटर", desc: "वजन और ऊंचाई से BMI जानें", path: "/hi/bmi-calculator", Icon: Heart },
  { name: "लोन ईएमआई कैलकुलेटर", desc: "मासिक किस्त और ब्याज जानें", path: "/hi/loan-calculator", Icon: Calculator },
  { name: "एसआईपी कैलकुलेटर", desc: "निवेश वृद्धि का अनुमान", path: "/hi/sip-calculator", Icon: TrendingUp },
  { name: "ईएमआई कैलकुलेटर", desc: "होम व पर्सनल लोन EMI", path: "/hi/emi-calculator", Icon: Landmark },
  { name: "प्रतिशत कैलकुलेटर", desc: "प्रतिशत तुरंत निकालें", path: "/hi/percentage-calculator", Icon: Percent },
  { name: "आयु कैलकुलेटर", desc: "सटीक उम्र वर्ष-महीने-दिन में", path: "/hi/age-calculator", Icon: Clock },
  { name: "होम लोन कैलकुलेटर", desc: "मॉर्गेज भुगतान योजना", path: "/hi/mortgage-calculator", Icon: Home },
  { name: "पीपीएफ कैलकुलेटर", desc: "PPF मैच्योरिटी राशि", path: "/hi/ppf-calculator", Icon: PiggyBank },
  { name: "एफडी कैलकुलेटर", desc: "फिक्स्ड डिपॉजिट ब्याज", path: "/hi/fd-calculator", Icon: Landmark },
  { name: "जीएसटी कैलकुलेटर", desc: "GST जोड़ें या हटाएं", path: "/hi/gst-calculator", Icon: Receipt },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Prime Metric Hindi",
  "inLanguage": "hi",
  "url": "https://primemetric.online/hi",
};

export default function HindiHomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-[#FFF8F6] border-b border-[#F2765E]/10">
        <div className="mx-auto max-w-6xl px-4 pt-8 pb-6 text-center">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1 text-xs text-neutral-500 mb-3">
            <Link href="/" className="hover:text-[#F2765E]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-black font-medium">हिंदी</span>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-black">
            हिंदी में <span className="text-[#F2765E]">मुफ्त कैलकुलेटर</span>
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
            बीएमआई, ईएमआई, एसआईपी, ब्याज और उम्र — सब कुछ आपकी भाषा में। तेज़, सटीक, बिना साइन-अप।
          </p>
          <div className="mt-4">
            <Link href="/" className="text-[13px] font-semibold text-[#F2765E] hover:underline">
              100+ tools English में देखें →
            </Link>
          </div>
        </div>
      </header>
      <main className="py-7">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {hiTools.map((tool) => (
              <Link key={tool.path} href={tool.path} className="group">
                <div className="tool-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center shrink-0">
                    <tool.Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-semibold text-black group-hover:text-[#F2765E] leading-snug">{tool.name}</h2>
                    <p className="text-xs text-neutral-500 line-clamp-1">{tool.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#F2765E] shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
