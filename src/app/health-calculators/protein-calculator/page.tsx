import { generateMetadata } from "@/components/CalculatorLayout";
import ProteinCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Protein Calculator",
  description: "Calculate your daily protein needs based on your body weight and activity level.",
  keywords: "protein calculator, daily protein intake, protein needs",
  canonicalUrl: "/health-calculators/protein-calculator",
});

export default function Page() {
  return <ProteinCalculator />;
}

    