import { generateMetadata } from "@/components/CalculatorLayout";
import EmiCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "EMI Calculator for Home & Personal Loans",
  description: "Calculate monthly EMI, total interest and payoff schedule for home and personal loans with a year-by-year amortization table.",
  keywords: "emi calculator, home loan emi calculator, personal loan emi, monthly emi calculator",
  canonicalUrl: "/financial-calculators/emi-calculator",
});

export default function Page() {
  return <EmiCalculator />;
}
