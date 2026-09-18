import { generateMetadata } from "@/components/CalculatorLayout";
import CapitalGainsCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "India Capital Gains Tax Calculator",
  description: "Estimate India capital gains tax under Budget 2024 rules for equity, mutual funds, property and gold — LTCG vs STCG rates and net proceeds.",
  keywords: "capital gains calculator india, ltcg stcg calculator, equity capital gains tax, property capital gains india",
  canonicalUrl: "/financial-calculators/capital-gains-calculator",
});

export default function Page() {
  return <CapitalGainsCalculator />;
}
