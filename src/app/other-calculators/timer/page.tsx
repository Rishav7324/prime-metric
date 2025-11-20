import { generateMetadata } from "@/components/CalculatorLayout";
import TimerClient from "./client-page";

export const metadata = generateMetadata({
  title: "Countdown Timer",
  description: "Set a countdown timer for any duration. Get an alert when time is up.",
  keywords: "timer, countdown timer, online timer, kitchen timer, study timer",
  canonicalUrl: "/other-calculators/timer",
});

export default function Page() {
  return <TimerClient />;
}
