import { generateMetadata } from "@/components/CalculatorLayout";
import SwpCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "SWP Calculator",
  description: "Calculate how long your investments will last with a Systematic Withdrawal Plan.",
  keywords: "swp calculator, systematic withdrawal plan, retirement income, investment withdrawal",
  canonicalUrl: "/financial-calculators/swp-calculator",
});

export default function Page() {
  return <SwpCalculator />;
}
