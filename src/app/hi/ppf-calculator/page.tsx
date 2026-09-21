import { generateMetadata } from "@/components/CalculatorLayout";
import PpfCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "पीपीएफ कैलकुलेटर",
  description: "पीपीएफ मैच्योरिटी, जमा और कर-मुक्त ब्याज का अनुमान लगाएं | Free PPF Calculator in Hindi",
  keywords: "पीपीएफ कैलकुलेटर, ppf calculator hindi, ppf maturity hindi, पीपीएफ ब्याज, ppf interest hindi",
  canonicalUrl: "/hi/ppf-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/ppf-calculator",
    languages: {
      hi: "https://primemetric.online/hi/ppf-calculator",
      en: "https://primemetric.online/financial-calculators/ppf-calculator",
      "x-default": "https://primemetric.online/financial-calculators/ppf-calculator",
    },
  },
};

export default function PpfCalculatorHindiPage() {
  return <PpfCalculator />;
}
