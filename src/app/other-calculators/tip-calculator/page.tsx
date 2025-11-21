import TipCalculator from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Tip Calculator",
  description: "Calculate the tip for a bill and split it among friends.",
  keywords: "tip calculator, gratuity calculator, split the bill",
  canonicalUrl: "/other-calculators/tip-calculator",
});

export default function Page() {
  return <TipCalculator />;
}
