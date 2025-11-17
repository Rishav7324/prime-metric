import { generateMetadata } from "@/components/CalculatorLayout";
import SlopeCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Slope Calculator",
  description: "Calculate the slope of a line given two points.",
  keywords: "slope calculator, slope formula, gradient calculator, rise over run",
  canonicalUrl: "/math-calculators/slope-calculator",
});

export default function Page() {
  return <SlopeCalculator />;
}

    