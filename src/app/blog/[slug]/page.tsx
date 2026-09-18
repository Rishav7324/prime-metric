import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, ArrowLeft, Clock, CalendarDays, FlaskConical } from "lucide-react";
import { blogPosts, getBlogPost, getPrevNextPost, slugifyHeading } from "@/lib/blog";
import { allCalculators, imageTools, developerTools } from "@/lib/data";

const allToolsLookup = [...allCalculators, ...imageTools, ...developerTools];

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const title = `${post.title} | Prime Metric Blog`;
  const url = `https://primemetric.online/blog/${post.slug}`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: post.excerpt,
      url,
      siteName: "Prime Metric",
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      images: [
        {
          url: "https://primemetric.online/logo.png",
          width: 512,
          height: 512,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { prev, next } = getPrevNextPost(slug);
  const relatedTools = post.toolPaths
    .map((path) => allToolsLookup.find((c) => c.path === path))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const url = `https://primemetric.online/blog/${post.slug}`;

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Prime Metric", url: "https://primemetric.online" },
    publisher: {
      "@type": "Organization",
      name: "Prime Metric",
      logo: { "@type": "ImageObject", url: "https://primemetric.online/logo.png" },
    },
    mainEntityOfPage: url,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://primemetric.online" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://primemetric.online/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <main className="bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
          <Link href="/" className="hover:text-[#F2765E]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-[#F2765E]">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black font-medium truncate">{post.title}</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">{post.title}</h1>
        <p className="mt-1.5 text-sm text-neutral-600">{post.excerpt}</p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <CalendarDays className="w-3 h-3" />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readMins} min read
          </span>
          <span>By Prime Metric</span>
        </div>

        <nav
          aria-label="Table of contents"
          className="mt-5 border border-neutral-200 rounded-xl p-4 bg-neutral-50"
        >
          <p className="text-xs font-bold uppercase tracking-wide text-black mb-2">
            In this guide
          </p>
          <ol className="space-y-1.5">
            {post.sections.map((section) => (
              <li key={section.heading}>
                <a
                  href={`#${slugifyHeading(section.heading)}`}
                  className="text-[13px] text-neutral-600 hover:text-[#F2765E] hover:underline"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="mt-6">
          {post.sections.map((section) => (
            <section key={section.heading} className="mb-6 scroll-mt-24">
              <h2
                id={slugifyHeading(section.heading)}
                className="text-lg sm:text-xl font-bold text-black mb-2"
              >
                {section.heading}
              </h2>
              {section.paragraphs.map((para, i) => (
                <p key={i} className="text-sm text-neutral-700 leading-relaxed mb-2.5">
                  {para}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-2 space-y-1.5 border border-neutral-200 rounded-xl p-3.5 bg-white">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-[13px] text-neutral-700"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F2765E] shrink-0"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {relatedTools.length > 0 && (
          <section aria-label="Related tools" className="mt-8">
            <h2 className="text-base sm:text-lg font-bold text-black flex items-center gap-2 mb-1">
              <FlaskConical className="w-4 h-4 text-[#F2765E]" />
              Try it yourself
            </h2>
            <p className="text-xs text-neutral-500 mb-2.5">
              Run your own numbers with these free calculators.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {relatedTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link key={tool.id} href={tool.path} className="group">
                    <div className="tool-card flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#FFF5F2] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-[#F2765E]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-semibold text-black group-hover:text-[#F2765E] leading-snug">
                          {tool.name}
                        </h3>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">
                          {tool.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#F2765E] shrink-0" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <nav
          aria-label="More guides"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-t border-neutral-200 pt-5"
        >
          {prev ? (
            <Link href={`/blog/${prev.slug}`} className="group">
              <div className="tool-card h-full">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500">
                  <ArrowLeft className="w-3 h-3" /> Previous guide
                </span>
                <p className="text-[13px] font-semibold text-black group-hover:text-[#F2765E] mt-1 leading-snug">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/blog/${next.slug}`} className="group sm:text-right">
              <div className="tool-card h-full">
                <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 sm:justify-end">
                  Next guide <ArrowRight className="w-3 h-3" />
                </span>
                <p className="text-[13px] font-semibold text-black group-hover:text-[#F2765E] mt-1 leading-snug">
                  {next.title}
                </p>
              </div>
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
}
