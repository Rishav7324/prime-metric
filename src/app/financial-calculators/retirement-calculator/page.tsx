import { generateMetadata } from "@/components/CalculatorLayout";
import RetirementCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Retirement Calculator",
  description: "Plan your retirement and see if you are on track to meet your goals",
  keywords: "retirement calculator, retirement planning, 401k calculator, investment calculator, retirement savings",
  canonicalUrl: "/financial-calculators/retirement-calculator",
});

export default function Page() {
  return <RetirementCalculator />;
}
