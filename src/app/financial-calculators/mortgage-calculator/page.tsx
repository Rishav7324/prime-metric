import MortgageCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

const _seoBase = generateMetadata({
  title: "Mortgage Calculator",
  description: "Calculate your monthly mortgage payments",
  keywords: "mortgage calculator, home loan, emi calculator, house payment",
  canonicalUrl: "/financial-calculators/mortgage-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/mortgage-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/mortgage-calculator",
      hi: "https://primemetric.online/hi/mortgage-calculator",
      "x-default": "https://primemetric.online/financial-calculators/mortgage-calculator",
    },
  },
};

export default function MortgageCalculatorPage() {
    return <MortgageCalculatorClient />;
}

    