import { generateMetadata } from "@/components/CalculatorLayout";
import TdeeCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "TDEE Calculator",
  description: "Calculate your Total Daily Energy Expenditure (TDEE).",
  keywords: "tdee calculator, total daily energy expenditure, calorie needs, maintenance calories",
  canonicalUrl: "/health-calculators/tdee-calculator",
});

export default function Page() {
  return <TdeeCalculator />;
}

    