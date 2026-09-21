import { generateMetadata } from "@/components/CalculatorLayout";
import FdCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "एफडी कैलकुलेटर",
  description: "त्रैमासिक चक्रवृद्धि के साथ फिक्स्ड डिपॉजिट मैच्योरिटी राशि जानें | Free FD Calculator in Hindi",
  keywords: "एफडी कैलकुलेटर, fd calculator hindi, फिक्स्ड डिपॉजिट कैलकुलेटर, fd maturity hindi, fd interest hindi",
  canonicalUrl: "/hi/fd-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/fd-calculator",
    languages: {
      hi: "https://primemetric.online/hi/fd-calculator",
      en: "https://primemetric.online/financial-calculators/fd-calculator",
      "x-default": "https://primemetric.online/financial-calculators/fd-calculator",
    },
  },
};

export default function FdCalculatorHindiPage() {
  return <FdCalculator />;
}
