
import FractionCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Fraction Calculator",
  description: "Add, subtract, multiply, and divide fractions",
  keywords: "fraction calculator, add fractions, subtract fractions, multiply fractions, divide fractions, simplify fractions",
  canonicalUrl: "/math-calculators/fraction-calculator",
});

export default function FractionCalculatorPage() {
    return <FractionCalculatorClient />;
}
