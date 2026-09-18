
import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { developerTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "Developer Tools - Text, Encoding, Hashing & More",
  description: "A suite of essential developer tools including text formatters, encoders, and generators. Tools for JSON, Base64, QR codes, and more.",
  keywords: "developer tools, text tools, json formatter, base64 encoder, qr code generator, hash generator",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/tool/developer-tools",
  },
  openGraph: {
    title: "Developer Tools - Text, Encoding, Hashing & More",
    description: "A suite of essential developer tools including text formatters, encoders, and generators. Tools for JSON, Base64, QR codes, and more.",
    url: "https://primemetric.online/tool/developer-tools",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Developer Tools - Text, Encoding, Hashing & More",
    description: "A suite of essential developer tools including text formatters, encoders, and generators. Tools for JSON, Base64, QR codes, and more.",
  },
};

const DeveloperToolsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={developerTools} breadcrumb={[{ name: "Home", path: "/" }, { name: "Developer Tools", path: "/tool/developer-tools" }]} />
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-10 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Developer & Text Tools
          </h1>
          <p className="text-sm text-neutral-600">
            A suite of essential developer tools including text formatters, encoders, and generators
          </p>
        </div>
        
        <AdBanner />

        <div className="mx-auto max-w-6xl mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {developerTools.map((calc, index) => {
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
          <h2 className="text-lg font-bold mb-3 text-black">Developer utilities explained: JSON, Base64, QR codes, and hashes</h2>
          <p className="text-sm text-neutral-600 mb-3">
            These tools remove the small frictions that interrupt coding. Paste a minified API response into a <Link href="/tool/json-formatter" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">JSON formatter</Link> to pretty-print, validate, and locate the missing comma or trailing bracket behind a &ldquo;Unexpected token&rdquo; error — for example, spotting that {"`name`"} was quoted with backticks instead of double quotes. Validated JSON also reveals type bugs early, such as zip codes sent as numbers (90210) losing a leading zero that strings (&ldquo;02139&rdquo;) preserve.
          </p>
          <p className="text-sm text-neutral-600 mb-3">
            Encoding tools bridge text and transport. <Link href="/tool/base64" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">Base64</Link> turns binary into plain ASCII — &ldquo;Hi&rdquo; becomes &ldquo;SGk=&rdquo; — which is how small images embed in CSS data URIs, email attachments survive SMTP, and Basic Auth headers carry credentials. Remember it is encoding, not encryption: anyone can decode it, so never treat Base64 as security. For sharing, a <Link href="/tool/qr-code" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">QR code generator</Link> turns a long URL like https://example.com/menu?table=14 into a scannable code for tables, packaging, or Wi-Fi onboarding, with error correction keeping codes readable even when a logo overlays 20–30% of the symbol.
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Hashing answers a different question: &ldquo;Did this change?&rdquo; A SHA-256 digest like 9f86d081884c7d65… uniquely fingerprints a file, so comparing hashes after a download verifies integrity, checksums in CI catch corrupted artifacts, and salted password hashes (bcrypt, Argon2) let servers verify logins without storing passwords. Use MD5 only for non-security checks — it is broken for collision resistance — and prefer SHA-256 or SHA-512 for verification. Together, formatting, encoding, QR, and hash tools cover the daily loop of debug, transmit, share, and verify. The same toolbox handles the surrounding chores: URL-encoding a query string so spaces and ampersands survive transit, stamping events with Unix timestamps, minting UUID v4 identifiers for database rows, and checking password strength before shipping credentials to production.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-black">Popular in this category:</span>
            <Link href="/tool/json-formatter" className="underline underline-offset-2 hover:text-[#F2765E]">JSON Formatter</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/tool/base64" className="underline underline-offset-2 hover:text-[#F2765E]">Base64 Encoder</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/tool/hash-generator" className="underline underline-offset-2 hover:text-[#F2765E]">Hash Generator</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeveloperToolsPage;
