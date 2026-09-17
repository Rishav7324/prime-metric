import { generateMetadata } from "@/components/CalculatorLayout";
import OvulationCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Ovulation Calculator: Fertility Window Tracker",
  description: "Estimate your ovulation day, fertile window and next period from your last period date and cycle length with this free fertility calculator.",
  keywords: "ovulation calculator, fertile window calculator, fertility calendar, ovulation tracker, conception calculator",
  canonicalUrl: "/health-calculators/ovulation-calculator",
});

export default function Page() {
  return <OvulationCalculator />;
}
