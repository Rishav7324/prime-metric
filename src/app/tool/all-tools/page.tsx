
import Link from "next/link";
import { Wrench, ImageIcon, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { imageTools, developerTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "All Tools - Image & Developer Utilities",
  description: "A complete collection of developer and image utility tools. Includes formatters, converters, generators, and image editors.",
  keywords: "developer tools, image tools, text tools, json formatter, image resizer, qr code generator",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/tool/all-tools",
  },
  openGraph: {
    title: "All Tools - Image & Developer Utilities",
    description: "A complete collection of developer and image utility tools. Includes formatters, converters, generators, and image editors.",
    url: "https://primemetric.online/tool/all-tools",
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
            All Tools
          </h1>
          <p className="text-sm text-neutral-600">
            A complete suite of developer and image utility tools
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
                      {(index + 1) % 3 === 0 && <div className="sm:col-span-2" key={`ad-${index}`}><AdBanner/></div>}
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
                       {(index + 1) % 3 === 0 && <div className="sm:col-span-2" key={`ad-${index}`}><AdBanner/></div>}
                    </React.Fragment>
              )})}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default AllToolsPage;
