import { generateMetadata } from "@/components/CalculatorLayout";
import AnnuityCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Annuity Calculator: Estimate Monthly Pension Payout",
  description: "Estimate monthly pension from a lump sum using the annuity rate, with a yearly principal-vs-payout table for smart retirement planning.",
  keywords: "annuity calculator, pension calculator, annuity rate estimator, monthly pension planner, retirement income calculator",
  canonicalUrl: "/financial-calculators/annuity-calculator",
});

export default function Page() {
  return <AnnuityCalculator />;
}
