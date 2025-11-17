import BodyFatCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Body Fat Calculator",
    description: "Estimate body fat percentage using the U.S. Navy method",
    keywords: "body fat calculator, us navy body fat, body composition, fitness calculator",
    canonicalUrl: "/health-calculators/body-fat-calculator"
});

export default function BodyFatCalculatorPage() {
    return <BodyFatCalculatorClient />;
}
