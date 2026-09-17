import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, Clock, CalendarDays } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Money & Health Guides | Prime Metric",
  description:
    "Practical guides on SIP investing, BMI, home loans, PPF vs FD, percentages, and income tax — with real numbers and free calculators.",
  alternates: { canonical: "https://primemetric.online/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Blog - Money & Health Guides | Prime Metric",
    description:
      "Practical guides on SIP investing, BMI, home loans, PPF vs FD, percentages, and income tax — with real numbers and free calculators.",
    url: "https://primemetric.online/blog",
    siteName: "Prime Metric",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://primemetric.online/logo.png",
        width: 512,
        height: 512,
        alt: "Prime Metric Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Money & Health Guides | Prime Metric",
    description:
      "Practical guides on SIP investing, BMI, home loans, PPF vs FD, percentages, and income tax.",
  },
};

const jsonLdCollection = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides & Explainers",
  description:
    "Practical money and health guides from Prime Metric, with real numbers and free calculators.",
  url: "https://primemetric.online/blog",
};

const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: blogPosts.map((post, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://primemetric.online/blog/${post.slug}`,
    name: post.title,
  })),
};

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://primemetric.online" },
    { "@type": "ListItem", position: 2, name: "Blog" },
  ],
};

export default function BlogPage() {
  return (
    <main className="bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
          <Link href="/" className="hover:text-[#F2765E]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black font-medium">Blog</span>
        </nav>

        <div className="text-center">
          <span className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#FFF5F2] text-[#c25136] border border-[#F2765E]/25 mb-2.5">
            Learn & Apply
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
            Guides & Explainers
          </h1>
          <p className="mt-1.5 text-sm sm:text-[15px] text-neutral-600 max-w-xl mx-auto">
            Money and health topics explained with real numbers — each guide links to the free
            calculators you need to act on it.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <article className="tool-card h-full">
                <h2 className="text-[15px] font-bold text-black group-hover:text-[#F2765E] leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">{post.excerpt}</p>
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-[11px] text-neutral-500">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readMins} min read
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#F2765E] shrink-0" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
