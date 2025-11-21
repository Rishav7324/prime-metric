
import MileageCalculator from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Fuel Mileage Calculator",
    description: "Calculate your vehicle's fuel efficiency (e.g., MPG or km/L).",
    keywords: "mileage calculator, fuel efficiency, mpg calculator, km/l calculator",
    canonicalUrl: "/other-calculators/mileage-calculator"
});

export default function Page() {
    return <MileageCalculator />;
}
