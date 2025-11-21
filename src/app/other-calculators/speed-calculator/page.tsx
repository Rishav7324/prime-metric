import SpeedCalculator from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Speed Calculator",
  description: "Calculate speed, distance, or time given the other two values.",
  keywords: "speed calculator, distance time calculator, speed distance time",
  canonicalUrl: "/other-calculators/speed-calculator",
});

export default function Page() {
  return <SpeedCalculator />;
}
