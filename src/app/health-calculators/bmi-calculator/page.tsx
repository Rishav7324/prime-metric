import BMICalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

const _seoBase = generateMetadata({
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your health category",
    keywords: "bmi calculator, body mass index, health calculator, weight calculator",
    canonicalUrl: "/health-calculators/bmi-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/health-calculators/bmi-calculator",
    languages: {
      en: "https://primemetric.online/health-calculators/bmi-calculator",
      hi: "https://primemetric.online/hi/bmi-calculator",
      "x-default": "https://primemetric.online/health-calculators/bmi-calculator",
    },
  },
};

export default function BMICalculatorPage() {
    return <BMICalculatorClient />;
}
