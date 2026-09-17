import { generateMetadata } from "@/components/CalculatorLayout";
import CagrCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "CAGR Calculator: Compound Annual Growth Rate",
  description: "Calculate the compound annual growth rate (CAGR) of any investment from start value, end value and years, with growth multiple and yearly table.",
  keywords: "cagr calculator, compound annual growth rate, annualized return calculator, investment growth rate",
  canonicalUrl: "/financial-calculators/cagr-calculator",
});

export default function Page() {
  return <CagrCalculator />;
}
