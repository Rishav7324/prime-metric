
import BasicCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Basic Calculator",
  description: "Simple calculator for basic arithmetic operations",
  canonicalUrl: "/math-calculators/basic-calculator",
});

export default function BasicCalculatorPage() {
    return <BasicCalculatorClient />;
}
