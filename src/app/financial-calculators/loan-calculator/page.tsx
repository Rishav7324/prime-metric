import { generateMetadata } from "@/components/CalculatorLayout";
import LoanCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Loan EMI Calculator",
  description: "Calculate your monthly EMI, total payment, and interest for any loan",
  keywords: "emi calculator, loan calculator, mortgage calculator, personal loan emi, car loan emi",
  canonicalUrl: "/financial-calculators/loan-calculator",
});

export default function Page() {
  return <LoanCalculator />;
}
