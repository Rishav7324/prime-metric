import { generateMetadata } from "@/components/CalculatorLayout";
import WorldClockClient from "./client-page";

export const metadata = generateMetadata({
  title: "World Clock",
  description: "View the current time in major cities across the globe.",
  keywords: "world clock, time zones, international time, current time",
  canonicalUrl: "/other-calculators/world-clock",
});

export default function Page() {
  return <WorldClockClient />;
}
