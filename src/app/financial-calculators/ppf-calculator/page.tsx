import { generateMetadata } from "@/components/CalculatorLayout";
import PpfCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "PPF Calculator – Public Provident Fund Returns",
  description: "Project Public Provident Fund maturity, deposits and tax-free interest. Plan long-term savings with this free online PPF calculator for India.",
  keywords: "ppf calculator, public provident fund calculator, ppf maturity calculator, ppf interest calculator",
  canonicalUrl: "/financial-calculators/ppf-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/ppf-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/ppf-calculator",
      hi: "https://primemetric.online/hi/ppf-calculator",
      "x-default": "https://primemetric.online/financial-calculators/ppf-calculator",
    },
  },
};

export default function Page() {
  return <PpfCalculator />;
}
