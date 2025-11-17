import MortgageCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Mortgage Calculator",
  description: "Calculate your monthly mortgage payments",
  keywords: "mortgage calculator, home loan, emi calculator, house payment",
  canonicalUrl: "/financial-calculators/mortgage-calculator",
});

export default function MortgageCalculatorPage() {
    return <MortgageCalculatorClient />;
}

    