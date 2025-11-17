
import DiscountCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Discount Calculator",
  description: "Calculate your savings and final price after discount",
  keywords: "discount calculator, sale calculator, percentage off, savings calculator",
  canonicalUrl: "/financial-calculators/discount-calculator"
});

export default function DiscountCalculatorPage() {
    return <DiscountCalculatorClient />;
}
