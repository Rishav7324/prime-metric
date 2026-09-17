import { generateMetadata } from "@/components/CalculatorLayout";
import EmiCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "ईएमआई कैलकुलेटर",
  description: "होम और पर्सनल लोन की मासिक ईएमआई, कुल ब्याज और भुगतान सूची जानें | Free EMI Calculator in Hindi",
  keywords: "ईएमआई कैलकुलेटर, emi calculator hindi, होम लोन emi कैलकुलेटर, पर्सनल लोन emi, मासिक emi",
  canonicalUrl: "/hi/emi-calculator",
});

export default function EmiCalculatorHindiPage() {
  return <EmiCalculator />;
}
