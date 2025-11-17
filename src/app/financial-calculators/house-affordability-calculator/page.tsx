import { generateMetadata } from "@/components/CalculatorLayout";
import HouseAffordabilityCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "House Affordability Calculator",
  description: "Estimate the home price you can afford based on your income and debts",
  keywords: "house affordability calculator, how much house can i afford, mortgage affordability, home buying calculator",
  canonicalUrl: "/financial-calculators/house-affordability-calculator",
});

export default function Page() {
  return <HouseAffordabilityCalculator />;
}
