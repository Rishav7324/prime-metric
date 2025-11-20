
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

type GenerateMetadataProps = Omit<CalculatorLayoutProps, 'children' | 'formula' | 'explanation'>;

export function generateMetadata({ title, description, keywords, canonicalUrl }: GenerateMetadataProps): Metadata {
  const fullTitle = `${title} | Prime Metric`;
  const fullUrl = `https://primemetric.online${canonicalUrl}`;
  const ogImageUrl = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNoYXJ0fGVufDB8fHx8MTc2OTYzOTMwN3ww&ixlib=rb-4.1.0&q=80&w=1200';

  return {
    title: fullTitle,
    description: description,
    keywords: keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
        title: fullTitle,
        description: description,
        url: fullUrl,
        type: 'website',
        images: [
            {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                alt: fullTitle,
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description: description,
        images: [ogImageUrl],
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
