import IdealWeightCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Ideal Weight Calculator",
    description: "Calculate your ideal body weight range using the Devine formula and BMI guidelines.",
    keywords: "ideal weight calculator, healthy weight, Devine formula, weight range, health calculator",
    canonicalUrl: "/health-calculators/ideal-weight-calculator",
});

export default function IdealWeightCalculatorPage() {
    return <IdealWeightCalculatorClient />;
}
