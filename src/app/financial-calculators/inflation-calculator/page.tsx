import { generateMetadata } from "@/components/CalculatorLayout";
import InflationCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Inflation Calculator",
  description: "Calculate the future value of money and the impact of inflation on purchasing power",
  keywords: "inflation calculator, purchasing power, future value of money, inflation impact",
  canonicalUrl: "/financial-calculators/inflation-calculator",
});

export default function Page() {
  return <InflationCalculator />;
}
