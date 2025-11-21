
import Link from "next/link";
import { Wrench, ImageIcon, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { imageTools, developerTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import React from "react";

export const metadata: Metadata = {
    title: "All Tools - Image & Developer Utilities",
    description: "A complete collection of developer and image utility tools. Includes formatters, converters, generators, and image editors.",
    keywords: "developer tools, image tools, text tools, json formatter, image resizer, qr code generator",
    alternates: {
        canonical: "https://primemetric.online/tool/all-tools",
    }
};

const AllToolsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Wrench className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
            All Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            A complete suite of developer and image utility tools
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Image Tools Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-headline">Image Tools</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <React.Fragment key={tool.id}>
                      <Link href={tool.path} className="group">
                        <Card className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                      {(index + 1) % 3 === 0 && <div className="lg:col-span-3 md:col-span-2"><AdBanner/></div>}
                    </React.Fragment>
              )})}
            </div>
          </section>

          <AdBanner/>

          {/* Developer Tools Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold font-headline">Developer & Text Tools</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developerTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <React.Fragment key={tool.id}>
                      <Link href={tool.path} className="group">
                        <Card className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                            </div>
                          </div>
                        </Card>
                      </Link>
                       {(index + 1) % 3 === 0 && <div className="lg:col-span-3 md:col-span-2"><AdBanner/></div>}
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
