
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Prime Metric',
  description: '100+ premium calculators and educational tools for financial clarity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6512188660075861"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={cn("font-body antialiased min-h-screen bg-background")}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <Toaster />
        </FirebaseClientProvider>
        <CookieConsentBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
