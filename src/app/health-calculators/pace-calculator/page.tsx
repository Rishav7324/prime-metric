import { generateMetadata } from "@/components/CalculatorLayout";
import PaceCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Pace Calculator",
  description: "Calculate running pace, time, or distance for your runs.",
  keywords: "pace calculator, running calculator, marathon pace, race predictor",
  canonicalUrl: "/health-calculators/pace-calculator",
});

export default function Page() {
  return <PaceCalculator />;
}

    