import MileageCalculator from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Mileage Calculator",
  description: "Calculate your vehicle's fuel efficiency (MPG or km/L).",
  keywords: "mileage calculator, fuel economy calculator, mpg calculator, fuel efficiency",
  canonicalUrl: "/other-calculators/mileage-calculator",
});

export default function Page() {
  return <MileageCalculator />;
}
