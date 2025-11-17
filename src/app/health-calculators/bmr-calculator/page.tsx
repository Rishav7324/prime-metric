import BMRCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate",
    keywords: "bmr calculator, basal metabolic rate, metabolism calculator, tdee",
    canonicalUrl: "/health-calculators/bmr-calculator"
});

export default function BMRCalculatorPage() {
    return <BMRCalculatorClient />;
}
