
import AutoLoanCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Auto Loan Calculator",
  description: "Calculate your car loan monthly payments",
  keywords: "auto loan calculator, car loan, emi calculator, car payment",
  canonicalUrl: "/financial-calculators/auto-loan-calculator"
});

export default function AutoLoanCalculatorPage() {
    return <AutoLoanCalculatorClient />;
}
