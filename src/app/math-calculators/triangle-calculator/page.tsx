import { generateMetadata } from "@/components/CalculatorLayout";
import TriangleCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Triangle Calculator",
  description: "Calculate the area, perimeter, and angles of a triangle.",
  keywords: "triangle calculator, triangle solver, area of triangle, triangle angles",
  canonicalUrl: "/math-calculators/triangle-calculator",
});

export default function Page() {
  return <TriangleCalculator />;
}

    