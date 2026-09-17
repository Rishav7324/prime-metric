
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Montserrat } from 'next/font/google';
import AdBanner from '@/components/AdBanner';
import { VisitTracker } from '@/components/VisitTracker';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-headline',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://primemetric.online'),
  title: {
    default: 'Prime Metric - Free Online Calculators & Tools',
    template: '%s | Prime Metric',
  },
  description: '100+ free online calculators for finance, health, math & everyday use. Fast, accurate, mobile-friendly. No sign-up needed.',
  keywords: ['online calculator', 'free calculator', 'BMI calculator', 'loan calculator', 'mortgage calculator', 'percentage calculator', 'financial calculator', 'health calculator'],
  authors: [{ name: 'Prime Metric' }],
  creator: 'Prime Metric',
  publisher: 'Prime Metric',
  alternates: {
    canonical: 'https://primemetric.online',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Prime Metric - Free Online Calculators & Tools',
    description: '100+ free online calculators for finance, health, math & everyday use. Fast, accurate, mobile-friendly.',
    url: 'https://primemetric.online',
    siteName: 'Prime Metric',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dkyozgldj/image/upload/v1763651495/IMG_20251120_202321_mpq2or.jpg',
        width: 1200,
        height: 630,
        alt: 'Prime Metric - Free Online Calculators & Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prime Metric - Free Online Calculators & Tools',
    description: '100+ free online calculators for finance, health, math & everyday use.',
    images: ['https://res.cloudinary.com/dkyozgldj/image/upload/v1763651495/IMG_20251120_202321_mpq2or.jpg']
  },
  verification: {
    google: 'google1e431e5ecb53acb7',
  },
};

export const viewport: Viewport = {
  themeColor: '#F2765E',
  width: 'device-width',
  initialScale: 1,
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
      <body className={cn("font-body antialiased min-h-screen bg-white text-black", inter.variable, montserrat.variable)}>
        <FirebaseClientProvider>
          <VisitTracker />
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
