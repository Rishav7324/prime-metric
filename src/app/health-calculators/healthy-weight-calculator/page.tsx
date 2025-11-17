import HealthyWeightCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Healthy Weight Calculator",
    description: "Find your healthy weight range based on BMI standards",
    keywords: "healthy weight calculator, ideal weight calculator, weight range, BMI range",
    canonicalUrl: "/health-calculators/healthy-weight-calculator",
});

export default function HealthyWeightCalculatorPage() {
    return <HealthyWeightCalculatorClient />;
}
