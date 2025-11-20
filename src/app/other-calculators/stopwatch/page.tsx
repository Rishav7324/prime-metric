import { generateMetadata } from "@/components/CalculatorLayout";
import StopwatchClient from "./client-page";

export const metadata = generateMetadata({
  title: "Stopwatch",
  description: "A simple and accurate stopwatch to measure elapsed time with lap functionality.",
  keywords: "stopwatch, timer, lap timer, time measurement, chronometer",
  canonicalUrl: "/other-calculators/stopwatch",
});

export default function Page() {
  return <StopwatchClient />;
}
