import { generateMetadata } from "@/components/CalculatorLayout";
import SavingsCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Savings Calculator",
  description: "Calculate the future value of your savings with regular contributions.",
  keywords: "savings calculator, investment calculator, future value calculator, compound interest",
  canonicalUrl: "/financial-calculators/savings-calculator",
});

export default function Page() {
  return <SavingsCalculator />;
}

    