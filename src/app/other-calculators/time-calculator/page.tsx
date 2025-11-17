import { generateMetadata } from "@/components/CalculatorLayout";
import TimeCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Time Calculator",
  description: "Add or subtract time units (days, hours, minutes, seconds).",
  keywords: "time calculator, time duration calculator, add time, subtract time",
  canonicalUrl: "/other-calculators/time-calculator",
});

export default function Page() {
  return <TimeCalculator />;
}

    