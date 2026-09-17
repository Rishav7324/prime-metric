import { generateMetadata } from "@/components/CalculatorLayout";
import FdCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "एफडी कैलकुलेटर",
  description: "त्रैमासिक चक्रवृद्धि के साथ फिक्स्ड डिपॉजिट मैच्योरिटी राशि जानें | Free FD Calculator in Hindi",
  keywords: "एफडी कैलकुलेटर, fd calculator hindi, फिक्स्ड डिपॉजिट कैलकुलेटर, fd maturity hindi, fd interest hindi",
  canonicalUrl: "/hi/fd-calculator",
});

export default function FdCalculatorHindiPage() {
  return <FdCalculator />;
}
