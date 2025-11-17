import { generateMetadata } from "@/components/CalculatorLayout";
import StandardDeviationCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Standard Deviation Calculator",
  description: "Calculate the standard deviation, variance, and mean of a set of numbers.",
  keywords: "standard deviation calculator, variance calculator, statistics calculator",
  canonicalUrl: "/math-calculators/standard-deviation-calculator",
});

export default function Page() {
  return <StandardDeviationCalculator />;
}

    