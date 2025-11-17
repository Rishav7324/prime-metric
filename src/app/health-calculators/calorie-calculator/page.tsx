import CalorieCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Calorie Calculator",
    description: "Calculate daily calorie needs for your goals",
    keywords: "calorie calculator, tdee calculator, calorie intake, weight loss calculator, weight gain calculator",
    canonicalUrl: "/health-calculators/calorie-calculator"
});

export default function CalorieCalculatorPage() {
    return <CalorieCalculatorClient />;
}
