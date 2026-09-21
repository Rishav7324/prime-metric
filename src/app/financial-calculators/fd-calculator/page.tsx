import { generateMetadata } from "@/components/CalculatorLayout";
import FdCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "Fixed Deposit (FD) Calculator – Maturity Value",
  description: "Estimate fixed deposit maturity value with quarterly compounding. Compare principal, interest rate and tenure with this free online FD calculator.",
  keywords: "fd calculator, fixed deposit calculator, fd maturity calculator, fd interest calculator",
  canonicalUrl: "/financial-calculators/fd-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/fd-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/fd-calculator",
      hi: "https://primemetric.online/hi/fd-calculator",
      "x-default": "https://primemetric.online/financial-calculators/fd-calculator",
    },
  },
};

export default function Page() {
  return <FdCalculator />;
}
