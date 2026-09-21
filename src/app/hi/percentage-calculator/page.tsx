import { generateMetadata } from "@/components/CalculatorLayout";
import PercentageCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "प्रतिशत कैलकुलेटर",
  description: "किसी भी संख्या का प्रतिशत, छूट, वृद्धि-कमी आसानी से निकालें | Free Percentage Calculator in Hindi",
  keywords: "प्रतिशत कैलकुलेटर, percentage calculator hindi, प्रतिशत कैसे निकालें, percent calculator hindi, छूट कैलकुलेटर",
  canonicalUrl: "/hi/percentage-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/percentage-calculator",
    languages: {
      hi: "https://primemetric.online/hi/percentage-calculator",
      en: "https://primemetric.online/math-calculators/percentage-calculator",
      "x-default": "https://primemetric.online/math-calculators/percentage-calculator",
    },
  },
};

export default function PercentageCalculatorHindiPage() {
  return <PercentageCalculator />;
}
