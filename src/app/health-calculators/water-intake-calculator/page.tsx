import { generateMetadata } from "@/components/CalculatorLayout";
import WaterIntakeCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Daily Water Intake Calculator by Weight",
  description: "Calculate your daily water intake in liters and glasses from body weight, activity level and climate with personalized hydration guidance.",
  keywords: "water intake calculator, daily water requirement calculator, hydration calculator, how much water to drink",
  canonicalUrl: "/health-calculators/water-intake-calculator",
});

export default function Page() {
  return <WaterIntakeCalculator />;
}
