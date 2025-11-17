import { generateMetadata } from "@/components/CalculatorLayout";
import IncomeTaxCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Income Tax Calculator",
  description: "Estimate your income tax using simplified tax brackets",
  keywords: "income tax calculator, tax estimator, tax brackets, federal income tax",
  canonicalUrl: "/financial-calculators/income-tax-calculator",
});

export default function Page() {
  return <IncomeTaxCalculator />;
}
