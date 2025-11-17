
import DistanceCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Distance Calculator",
  description: "Calculate distance between two points",
  keywords: "distance calculator, distance formula, coordinate geometry, euclidean distance",
  canonicalUrl: "/math-calculators/distance-calculator",
});

export default function DistanceCalculatorPage() {
    return <DistanceCalculatorClient />;
}
