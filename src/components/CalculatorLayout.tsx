import Head from "next/head";
import { Metadata } from 'next';

type CalculatorLayoutProps = {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  formula?: string;
  explanation?: React.ReactNode;
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Prime Metric',
  description: '100+ premium calculators and educational tools for financial clarity.',
};

const CalculatorLayout = ({
  title,
  description,
  keywords,
  canonicalUrl,
  formula,
  explanation,
  children,
}: CalculatorLayoutProps) => {
  return (
    <>
      <Head>
        <title>{`${title} | Prime Metric`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://primemetric.online${canonicalUrl}`} />
        <meta property="og:title" content={`${title} | Prime Metric`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://primemetric.online${canonicalUrl}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | Prime Metric`} />
        <meta name="twitter:description" content={description} />
      </Head>
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
