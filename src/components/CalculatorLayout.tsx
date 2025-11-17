
import Head from "next/head";
import { Metadata } from 'next';

type CalculatorLayoutProps = {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  formula?: string;
  explanation?: React.ReactNode;
  children: React.ReactNode;
};

export function generateMetadata({ title, description, keywords, canonicalUrl }: CalculatorLayoutProps): Metadata {
  return {
    title: `${title} | Prime Metric`,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: `https://primemetric.online${canonicalUrl}`,
    },
    openGraph: {
        title: `${title} | Prime Metric`,
        description: description,
        url: `https://primemetric.online${canonicalUrl}`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: `${title} | Prime Metric`,
        description: description,
    }
  };
}

const CalculatorLayout = ({
  title,
  description,
  formula,
  explanation,
  children,
}: CalculatorLayoutProps) => {
  return (
    <>
      <main className="py-12 sm:py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-headline text-3xl sm:text-5xl font-bold">{title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
            {formula && (
              <div className="mt-6 font-mono text-sm p-3 bg-muted rounded-lg inline-block">
                {formula}
              </div>
            )}
             {explanation && (
              <p className="mt-4 text-sm text-muted-foreground italic max-w-md mx-auto">{explanation}</p>
            )}
          </div>
          <div className="mt-12">{children}</div>
        </div>
      </main>
    </>
  );
};

export default CalculatorLayout;
