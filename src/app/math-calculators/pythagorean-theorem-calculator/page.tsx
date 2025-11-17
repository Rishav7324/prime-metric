import { generateMetadata } from "@/components/CalculatorLayout";
import PythagoreanCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Pythagorean Theorem Calculator",
  description: "Calculate the missing side of a right-angled triangle using the Pythagorean theorem.",
  keywords: "pythagorean theorem calculator, right triangle calculator, hypotenuse calculator",
  canonicalUrl: "/math-calculators/pythagorean-theorem-calculator",
});

export default function Page() {
  return <PythagoreanCalculator />;
}

    