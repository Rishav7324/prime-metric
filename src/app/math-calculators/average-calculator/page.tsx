
import AverageCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Average Calculator",
  description: "Calculate mean, median, mode, and range of numbers",
  keywords: "average calculator, mean calculator, median calculator, mode calculator, range calculator, statistics calculator",
  canonicalUrl: "/math-calculators/average-calculator",
});

export default function AverageCalculatorPage() {
    return <AverageCalculatorClient />;
}
