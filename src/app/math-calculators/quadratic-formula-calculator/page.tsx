import { generateMetadata } from "@/components/CalculatorLayout";
import QuadraticFormulaCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Quadratic Formula Calculator",
  description: "Solve quadratic equations of the form ax² + bx + c = 0.",
  keywords: "quadratic formula calculator, solve quadratic equation, algebra calculator",
  canonicalUrl: "/math-calculators/quadratic-formula-calculator",
});

export default function Page() {
  return <QuadraticFormulaCalculator />;
}

    