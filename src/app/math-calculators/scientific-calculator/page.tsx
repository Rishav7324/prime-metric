import { generateMetadata } from "@/components/CalculatorLayout";
import ScientificCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Scientific Calculator",
  description: "An advanced calculator for scientific, engineering, and mathematical calculations.",
  keywords: "scientific calculator, online scientific calculator, engineering calculator, math calculator",
  canonicalUrl: "/math-calculators/scientific-calculator",
});

export default function Page() {
  return <ScientificCalculator />;
}

    