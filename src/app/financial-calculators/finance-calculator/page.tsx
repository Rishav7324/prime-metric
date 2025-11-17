
import FinanceCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Finance Calculator",
  description: "Calculate Future Value and Present Value of money",
  keywords: "finance calculator, future value, present value, time value of money, fv calculator, pv calculator",
  canonicalUrl: "/financial-calculators/finance-calculator"
});

export default function FinanceCalculatorPage() {
    return <FinanceCalculatorClient />;
}
