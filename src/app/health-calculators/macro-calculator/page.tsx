import { generateMetadata } from "@/components/CalculatorLayout";
import MacroCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Macro Calculator",
  description: "Calculate your daily macronutrient needs for your fitness goals.",
  keywords: "macro calculator, macronutrient calculator, protein carbs fat, IIFYM",
  canonicalUrl: "/health-calculators/macro-calculator",
});

export default function Page() {
  return <MacroCalculator />;
}

    