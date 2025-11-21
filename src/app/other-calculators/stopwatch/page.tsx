import { generateMetadata } from "@/components/CalculatorLayout";
import StopwatchClient from "./client-page";

export const metadata = generateMetadata({
  title: "Stopwatch",
  description: "Measure elapsed time with precision, including lap functionality.",
  keywords: "stopwatch, timer, lap timer, time measurement",
  canonicalUrl: "/other-calculators/stopwatch",
});

export default function Page() {
  return <StopwatchClient />;
}
