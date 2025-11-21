
import Link from "next/link";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { developerTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import React from "react";

export const metadata: Metadata = {
    title: "Developer Tools - Text, Encoding, Hashing & More",
    description: "A suite of essential developer tools including text formatters, encoders, and generators. Tools for JSON, Base64, QR codes, and more.",
    keywords: "developer tools, text tools, json formatter, base64 encoder, qr code generator, hash generator",
    alternates: {
        canonical: "https://primemetric.online/tool/developer-tools",
    }
};

const DeveloperToolsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
              <FileText className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Developer & Text Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            A suite of essential developer tools including text formatters, encoders, and generators
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developerTools.map((calc, index) => {
                const Icon = calc.icon;
                return (
                  <React.Fragment key={calc.id}>
                    <Link
                      href={calc.path}
                      className="group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Card className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                              {calc.name}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {calc.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                    {(index + 1) % 6 === 0 && <div className="lg:col-span-3 md:col-span-2"><AdBanner/></div>}
                  </React.Fragment>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperToolsPage;
