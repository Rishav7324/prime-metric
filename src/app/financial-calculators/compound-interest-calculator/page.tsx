
import InterestCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Interest Calculator",
  description: "Calculate simple or compound interest for your investments or loans",
  keywords: "interest calculator, simple interest, compound interest, investment calculator",
  canonicalUrl: "/financial-calculators/compound-interest-calculator"
});

export default function InterestCalculatorPage() {
    return <InterestCalculatorClient />;
}
