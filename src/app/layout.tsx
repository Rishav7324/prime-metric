
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
import { Inter, Merriweather } from 'next/font/google';
import AdBanner from '@/components/AdBanner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  weight: ['400', '700'],
});

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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6512188660075861"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body className={cn("font-body antialiased min-h-screen bg-background", inter.variable, merriweather.variable)}>
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <AdBanner />
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
