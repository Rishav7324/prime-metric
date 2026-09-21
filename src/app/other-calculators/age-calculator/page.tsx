
import AgeCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

const _seoBase = generateMetadata({
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, and more",
    keywords: "age calculator, birthday calculator, date of birth calculator, how old am i",
    canonicalUrl: "/other-calculators/age-calculator"
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/other-calculators/age-calculator",
    languages: {
      en: "https://primemetric.online/other-calculators/age-calculator",
      hi: "https://primemetric.online/hi/age-calculator",
      "x-default": "https://primemetric.online/other-calculators/age-calculator",
    },
  },
};

export default function Page() {
    return <AgeCalculatorClient />;
}
