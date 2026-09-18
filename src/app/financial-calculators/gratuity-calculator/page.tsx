import { generateMetadata } from "@/components/CalculatorLayout";
import GratuityCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Gratuity Calculator – Estimate Your Payout",
  description: "Estimate your gratuity payout using the statutory 15/26 formula. Enter last-drawn basic plus DA and service years to check eligibility instantly.",
  keywords: "gratuity calculator, gratuity 15/26 formula, gratuity eligibility, retirement benefits calculator",
  canonicalUrl: "/financial-calculators/gratuity-calculator",
});

export default function Page() {
  return <GratuityCalculator />;
}
