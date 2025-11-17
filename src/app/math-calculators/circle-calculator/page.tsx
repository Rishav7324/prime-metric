
import CircleCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Circle Calculator",
  description: "Calculate area, circumference, and diameter of a circle",
  keywords: "circle calculator, area of circle, circumference calculator, diameter calculator",
  canonicalUrl: "/math-calculators/circle-calculator",
});

export default function CircleCalculatorPage() {
    return <CircleCalculatorClient />;
}
