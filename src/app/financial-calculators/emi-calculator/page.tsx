import { generateMetadata } from "@/components/CalculatorLayout";
import EmiCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "EMI Calculator for Home & Personal Loans",
  description: "Calculate monthly EMI, total interest and payoff schedule for home and personal loans with a year-by-year amortization table.",
  keywords: "emi calculator, home loan emi calculator, personal loan emi, monthly emi calculator",
  canonicalUrl: "/financial-calculators/emi-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/emi-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/emi-calculator",
      hi: "https://primemetric.online/hi/emi-calculator",
      "x-default": "https://primemetric.online/financial-calculators/emi-calculator",
    },
  },
};

export default function Page() {
  return <EmiCalculator />;
}
