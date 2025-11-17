import { generateMetadata } from "@/components/CalculatorLayout";
import SalesTaxCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Sales Tax Calculator",
  description: "Calculate sales tax and total price for any purchase.",
  keywords: "sales tax calculator, tax calculator, price calculator, VAT calculator",
  canonicalUrl: "/financial-calculators/sales-tax-calculator",
});

export default function Page() {
  return <SalesTaxCalculator />;
}

    