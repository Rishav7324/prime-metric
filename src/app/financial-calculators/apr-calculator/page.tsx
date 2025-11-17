
import APRCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "APR Calculator",
  description: "Calculate Annual Percentage Rate including fees and interest",
  keywords: "apr calculator, annual percentage rate, loan cost, interest and fees",
  canonicalUrl: "/financial-calculators/apr-calculator"
});

export default function APRCalculatorPage() {
    return <APRCalculatorClient />;
}
