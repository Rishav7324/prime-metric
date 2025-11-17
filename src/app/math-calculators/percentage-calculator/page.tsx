import { generateMetadata } from "@/components/CalculatorLayout";
import PercentageCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Percentage Calculator",
  description: "Calculate percentages for various scenarios.",
  keywords: "percentage calculator, percent calculator, percentage formula",
  canonicalUrl: "/math-calculators/percentage-calculator",
});

export default function Page() {
  return <PercentageCalculator />;
}

    