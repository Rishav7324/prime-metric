import { generateMetadata } from "@/components/CalculatorLayout";
import LongDivisionCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Long Division Calculator with Steps Shown",
  description: "Divide any two whole numbers step by step — see each bring-down, multiply and subtract stage plus quotient, remainder and decimal answer.",
  keywords: "long division calculator, division with steps, quotient remainder calculator, divide step by step",
  canonicalUrl: "/math-calculators/long-division-calculator",
});

export default function Page() {
  return <LongDivisionCalculator />;
}
