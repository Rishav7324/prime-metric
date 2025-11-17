import BMICalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "BMI Calculator",
    description: "Calculate your Body Mass Index and understand your health category",
    keywords: "bmi calculator, body mass index, health calculator, weight calculator",
    canonicalUrl: "/health-calculators/bmi-calculator",
});

export default function BMICalculatorPage() {
    return <BMICalculatorClient />;
}
