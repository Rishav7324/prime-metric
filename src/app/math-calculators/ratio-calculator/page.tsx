import { generateMetadata } from "@/components/CalculatorLayout";
import RatioCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Ratio Calculator",
  description: "Simplify ratios or find the missing value in a proportion.",
  keywords: "ratio calculator, proportion calculator, simplify ratio, aspect ratio",
  canonicalUrl: "/math-calculators/ratio-calculator",
});

export default function Page() {
  return <RatioCalculator />;
}

    