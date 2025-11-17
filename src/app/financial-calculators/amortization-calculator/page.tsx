
import AmortizationCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Amortization Calculator",
  description: "Calculate loan amortization schedule",
  keywords: "amortization calculator, loan schedule, mortgage amortization, loan payment schedule, amortization table",
  canonicalUrl: "/financial-calculators/amortization-calculator",
});

export default function AmortizationCalculatorPage() {
    return <AmortizationCalculatorClient />;
}
