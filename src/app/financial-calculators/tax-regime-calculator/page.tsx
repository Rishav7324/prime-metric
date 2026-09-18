import { generateMetadata } from "@/components/CalculatorLayout";
import TaxRegimeCalculatorClient from "./client-page";

export const metadata = generateMetadata({
  title: "Tax Regime Calculator – Old vs New",
  description: "Compare old vs new regime tax on your salary with simplified FY slabs, deductions and cess to pick the lower-tax option fast",
  keywords: "india tax regime calculator, old vs new regime, income tax calculator india, new tax regime slabs, 80c deduction calculator",
  canonicalUrl: "/financial-calculators/tax-regime-calculator",
});

export default function TaxRegimeCalculatorPage() {
  return <TaxRegimeCalculatorClient />;
}
