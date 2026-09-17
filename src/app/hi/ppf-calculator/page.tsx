import { generateMetadata } from "@/components/CalculatorLayout";
import PpfCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "पीपीएफ कैलकुलेटर",
  description: "पीपीएफ मैच्योरिटी, जमा और कर-मुक्त ब्याज का अनुमान लगाएं | Free PPF Calculator in Hindi",
  keywords: "पीपीएफ कैलकुलेटर, ppf calculator hindi, ppf maturity hindi, पीपीएफ ब्याज, ppf interest hindi",
  canonicalUrl: "/hi/ppf-calculator",
});

export default function PpfCalculatorHindiPage() {
  return <PpfCalculator />;
}
