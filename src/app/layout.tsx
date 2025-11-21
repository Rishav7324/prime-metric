
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
import { Inter, Merriweather } from 'next/font/google';
import AdBanner from '@/components/AdBanner';
import Script from 'next/script';

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
  title: 'Prime Metric - Free Online Calculators & Tools',
  description: '100+ premium calculators and educational tools for financial clarity.',
  openGraph: {
    title: 'Prime Metric - Free Online Calculators & Tools',
    description: '100+ premium calculators and educational tools for financial clarity.',
    url: 'https://primemetric.online',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dkyozgldj/image/upload/v1763651495/IMG_20251120_202321_mpq2or.jpg',
        width: 1200,
        height: 630,
        alt: 'Prime Metric - Financial and Educational Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Metric - Free Online Calculators & Tools',
    description: '100+ premium calculators and educational tools for financial clarity.',
    images: ['https://res.cloudinary.com/dkyozgldj/image/upload/v1763651495/IMG_20251120_202321_mpq2or.jpg']
  },
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
