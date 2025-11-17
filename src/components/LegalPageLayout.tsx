
import Head from "next/head";
import { Metadata } from 'next';

type LegalPageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const LegalPageLayout = ({
  title,
  children,
}: LegalPageLayoutProps) => {
  return (
    <main className="py-12 sm:py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="font-headline text-3xl sm:text-5xl font-bold">{title}</h1>
        </div>
        <div className="mt-12 max-w-2xl mx-auto">{children}</div>
      </div>
    </main>
  );
};

export default LegalPageLayout;
