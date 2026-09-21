import { generateMetadata } from "@/components/CalculatorLayout";
import PercentageCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "Percentage Calculator",
  description: "Calculate percentages for various scenarios.",
  keywords: "percentage calculator, percent calculator, percentage formula",
  canonicalUrl: "/math-calculators/percentage-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/math-calculators/percentage-calculator",
    languages: {
      en: "https://primemetric.online/math-calculators/percentage-calculator",
      hi: "https://primemetric.online/hi/percentage-calculator",
      "x-default": "https://primemetric.online/math-calculators/percentage-calculator",
    },
  },
};

export default function Page() {
  return <PercentageCalculator />;
}

    