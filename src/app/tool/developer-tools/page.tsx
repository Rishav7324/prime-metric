
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
                    {(index + 1) % 6 === 0 && <div className="sm:col-span-2" key={`ad-${index}`}><AdBanner/></div>}
                  </React.Fragment>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperToolsPage;
