
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { imageTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import React from "react";

export const metadata: Metadata = {
    title: "Image Tools - Crop, Resize, Compress & Convert",
    description: "A collection of free online image tools to crop, resize, compress, and convert your images. Optimize your images for web and other uses.",
    keywords: "image tools, crop image, resize image, compress image, convert image, color picker",
    alternates: {
        canonical: "https://primemetric.online/tool/image-tools",
    }
};

const ImageToolsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
            Image Tools
          </h1>
          <p className="text-xl text-muted-foreground">
            Crop, Resize, Compress, Convert & Pick Colors from Images
          </p>
        </div>
        
        <AdBanner />

        <div className="max-w-7xl mx-auto mt-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageTools.map((calc, index) => {
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
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                    {(index + 1) % 6 === 0 && <div className="lg:col-span-3 md:col-span-2" key={`ad-${index}`}><AdBanner/></div>}
                  </React.Fragment>
            )})}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToolsPage;
