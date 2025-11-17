import { generateMetadata } from "@/components/CalculatorLayout";
import TimeZoneConverter from "./client-page";

export const metadata = generateMetadata({
  title: "Time Zone Converter",
  description: "Convert time between different time zones around the world.",
  keywords: "time zone converter, time converter, world clock, time zone calculator",
  canonicalUrl: "/other-calculators/time-zone-converter",
});

export default function Page() {
  return <TimeZoneConverter />;
}

    