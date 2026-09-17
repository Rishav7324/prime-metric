import type { Metadata } from 'next';

type LegalPageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

const LegalPageLayout = ({
  title,
  children,
}: LegalPageLayoutProps) => {
  return (
    <main className="py-8 sm:py-10 bg-white text-black">
      <div className="mx-auto max-w-2xl px-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">{title}</h1>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </main>
  );
};

export default LegalPageLayout;
