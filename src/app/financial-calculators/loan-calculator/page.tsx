
import { generateMetadata } from "@/components/CalculatorLayout";
import LoanCalculatorClient from "./client-page";

const _seoBase = generateMetadata({
  title: "Loan EMI Calculator",
  description: "Calculate your monthly EMI, total payment, and interest for any loan",
  keywords: "emi calculator, loan calculator, mortgage calculator, personal loan emi, car loan emi",
  canonicalUrl: "/financial-calculators/loan-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/loan-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/loan-calculator",
      hi: "https://primemetric.online/hi/loan-calculator",
      "x-default": "https://primemetric.online/financial-calculators/loan-calculator",
    },
  },
};

export default function LoanCalculatorPage() {
  return <LoanCalculatorClient />;
}
