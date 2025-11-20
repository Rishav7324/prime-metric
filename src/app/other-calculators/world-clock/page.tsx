import { generateMetadata } from "@/components/CalculatorLayout";
import WorldClockClient from "./client-page";

export const metadata = generateMetadata({
  title: "World Clock",
  description: "Check the current local time in major cities around the world.",
  keywords: "world clock, time zones, international time, current time, time converter",
  canonicalUrl: "/other-calculators/world-clock",
});

export default function Page() {
  return <WorldClockClient />;
}
