
import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { imageTools } from "@/lib/data";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ListingJsonLd } from "@/components/ListingJsonLd";
import React from "react";

export const metadata: Metadata = {
  title: "Image Tools - Crop, Resize, Compress & Convert",
  description: "A collection of free online image tools to crop, resize, compress, and convert your images. Optimize your images for web and other uses.",
  keywords: "image tools, crop image, resize image, compress image, convert image, color picker",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://primemetric.online/tool/image-tools",
  },
  openGraph: {
    title: "Image Tools - Crop, Resize, Compress & Convert",
    description: "A collection of free online image tools to crop, resize, compress, and convert your images. Optimize your images for web and other uses.",
    url: "https://primemetric.online/tool/image-tools",
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Image Tools - Crop, Resize, Compress & Convert",
    description: "A collection of free online image tools to crop, resize, compress, and convert your images. Optimize your images for web and other uses.",
  },
};

const ImageToolsPage = () => {
  return (
      <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <ListingJsonLd items={imageTools} breadcrumb={[{ name: "Home", path: "/" }, { name: "Image Tools", path: "/tool/image-tools" }]} />
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-10 rounded-xl bg-[#F2765E] flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
            Image Tools
          </h1>
          <p className="text-sm text-neutral-600">
            Crop, Resize, Compress, Convert & Pick Colors from Images
          </p>
        </div>
        
        <AdBanner />

        <div className="mx-auto max-w-6xl mt-6">
          <div className="grid sm:grid-cols-2 gap-3">
            {imageTools.map((calc, index) => {
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
          <h2 className="text-lg font-bold mb-3 text-black">Free online image editing guide: crop, resize, compress, convert</h2>
          <p className="text-sm text-neutral-600 mb-3">
            Use the right operation for the job. <Link href="/tool/crop-image" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">Crop</Link> when composition is the problem — trimming a 4000×3000 photo to a 1080×1080 square for Instagram or a 16:9 banner removes distractions without changing file quality. <Link href="/tool/resize-image" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">Resize</Link> when dimensions are the problem: scaling that same 4000-pixel-wide photo down to 1600 pixels for a blog hero cuts pixel count by 84% and typically shrinks a 4 MB file to under 800 KB before compression even starts. Always resize before uploading — browsers still download the full file even if CSS displays it smaller.
          </p>
          <p className="text-sm text-neutral-600 mb-3">
            <Link href="/tool/compress-image" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">Compress</Link> when load speed is the problem. A quality setting of 75–82% usually reduces a JPG by 60–80% (for example, 2.4 MB down to 400–600 KB) with no visible difference on screens, which can lift a slow page from a 5-second to a sub-2-second load and directly help SEO. Keep an original copy, compress once, and avoid re-saving the same JPG five times — generational loss stacks. For graphics with sharp edges, transparency, or text, skip heavy JPG compression entirely and choose the right format instead.
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            Format choice is simple: JPG for photographs and complex gradients, PNG when you need lossless quality or transparency for logos and screenshots (at the cost of 3–5× larger files), and WebP or AVIF for the web when supported — WebP averages 25–35% smaller than an equivalent JPG. <Link href="/tool/convert-image" className="font-semibold text-black underline underline-offset-2 hover:text-[#F2765E]">Convert</Link> PNG screenshots to WebP for articles, export favicons and icons to ICO, and keep print work in the original high-resolution file. As a rule of thumb, aim for hero images under 300 KB, thumbnails under 100 KB, and total page images under 1–2 MB. When matching brand colors, sample the exact hex value with the color picker so buttons, backgrounds, and thumbnails stay consistent across the site.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="font-semibold text-black">Popular in this category:</span>
            <Link href="/tool/compress-image" className="underline underline-offset-2 hover:text-[#F2765E]">Image Compressor</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/tool/resize-image" className="underline underline-offset-2 hover:text-[#F2765E]">Image Resizer</Link>
            <span className="text-neutral-300">•</span>
            <Link href="/tool/convert-image" className="underline underline-offset-2 hover:text-[#F2765E]">Image Converter</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageToolsPage;
