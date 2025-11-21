import { generateMetadata } from "@/components/CalculatorLayout";
import TimerClient from "./client-page";

export const metadata = generateMetadata({
  title: "Countdown Timer",
  description: "Set a timer for any duration and get an alert when time is up.",
  keywords: "countdown timer, timer, kitchen timer, workout timer",
  canonicalUrl: "/other-calculators/timer",
});

export default function Page() {
  return <TimerClient />;
}
