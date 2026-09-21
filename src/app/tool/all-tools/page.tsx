
import Link from "next/link";
import { Wrench, ImageIcon, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { imageTools, developerTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "Image & Developer Tools Collection | Prime Metric",
  description: "Browse image editors (crop, resize, compress, convert) and developer utilities (JSON, Base64, QR, hash) — free online tools.",
  keywords: "developer tools, image tools, text tools, json formatter, image resizer, qr code generator",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/all-tools",
  },
  openGraph: {
    title: "Image & Developer Tools Collection | Prime Metric",
    description: "Browse image editors (crop, resize, compress, convert) and developer utilities (JSON, Base64, QR, hash) — free online tools.",
    url: "https://primemetric.online/all-tools",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "All Tools - Image & Developer Utilities",
    description: "A complete collection of developer and image utility tools. Includes formatters, converters, generators, and image editors.",
  },
};

const AllToolsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={[...imageTools, ...developerTools]} breadcrumb={[{ name: "Home", path: "/" }, { name: "All Tools", path: "/tool/all-tools" }]} />
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-10 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-black">
            Image & Developer Tools
          </h1>
          <p className="text-sm text-neutral-600">
            Crop, resize and convert images, or use developer utilities like JSON formatting and QR codes
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Image Tools Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-headline">Image Tools</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {imageTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <React.Fragment key={tool.id}>
                      <Link href={tool.path} className="group">
                        <Card className="bg-white border border-neutral-200 p-4 shadow-sm h-full hover:border-[#F2765E] transition-all duration-200 hover:-translate-y-0.5">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm mb-1 group-hover:text-[#F2765E] transition-colors">{tool.name}</h3>
                              <p className="text-sm text-neutral-600 line-clamp-2">{tool.description}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                      
                    </React.Fragment>
              )})}
            </div>
          </section>

          <AdBanner/>

          {/* Developer Tools Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-headline">Developer & Text Tools</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {developerTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <React.Fragment key={tool.id}>
                      <Link href={tool.path} className="group">
                        <Card className="bg-white border border-neutral-200 p-4 shadow-sm h-full hover:border-[#F2765E] transition-all duration-200 hover:-translate-y-0.5">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#F2765E] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-sm mb-1 group-hover:text-[#F2765E] transition-colors">{tool.name}</h3>
                              <p className="text-sm text-neutral-600 line-clamp-2">{tool.description}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                       
                    </React.Fragment>
              )})}
            </div>
          </section>

          <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-3 text-black">Everyday image and developer utilities in one place</h2>
            <p className="text-sm text-neutral-600 mb-3">
              This collection covers the two toolboxes most people reach for weekly: image tools that crop, resize, compress, and convert photos for faster pages and cleaner posts, and developer tools that format JSON, encode Base64, generate QR codes, and hash files for quick debugging and sharing.               Everything runs free in the browser — shrink a 3 MB photo under 300 KB before uploading, validate a broken API response in seconds, or turn a long link into a scannable code for print and packaging.
            </p>
            <p className="text-sm text-neutral-600 mb-4">
              Start with the most-used trio below, then explore the full grid above: pick WebP output for web images, pretty-print JSON before debugging, and prefer SHA-256 over MD5 when verifying downloads. Each tool works on any device with no signup, so one bookmark covers quick fixes at the desk or on the go.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="font-semibold text-black">Popular in this category:</span>
              <Link href="/tool/compress-image" className="underline underline-offset-2 hover:text-[#F2765E]">Image Compressor</Link>
              <span className="text-neutral-300">•</span>
              <Link href="/tool/json-formatter" className="underline underline-offset-2 hover:text-[#F2765E]">JSON Formatter</Link>
              <span className="text-neutral-300">•</span>
              <Link href="/tool/qr-code" className="underline underline-offset-2 hover:text-[#F2765E]">QR Code Generator</Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AllToolsPage;
