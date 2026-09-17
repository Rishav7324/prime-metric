import { generateMetadata } from "@/components/CalculatorLayout";
import SleepCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Sleep Calculator: Best Bedtime & Wake Times",
  description: "Find your ideal bedtime from your wake-up time, or ideal wake time from bedtime, using 90-minute sleep cycles to wake up refreshed.",
  keywords: "sleep calculator, bedtime calculator, sleep cycle calculator, best time to wake up",
  canonicalUrl: "/health-calculators/sleep-calculator",
});

export default function Page() {
  return <SleepCalculator />;
}
