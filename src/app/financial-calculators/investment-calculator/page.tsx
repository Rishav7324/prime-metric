import { generateMetadata } from "@/components/CalculatorLayout";
import InvestmentCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Investment Calculator",
  description: "Calculate returns on your investment with regular contributions",
  keywords: "investment calculator, compound interest calculator, investment return, savings calculator, retirement calculator",
  canonicalUrl: "/financial-calculators/investment-calculator"
});

export default function Page() {
  return <InvestmentCalculator />;
}
