import PregnancyWeightCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Pregnancy Weight Gain Calculator by Week",
    description: "Track healthy pregnancy weight gain by week with IOM guidelines. Enter pre-pregnancy weight, height and week for BMI-based targets.",
    keywords: "pregnancy weight gain calculator, iom weight gain chart, pregnancy bmi calculator, weight gain by week pregnancy",
    canonicalUrl: "/health-calculators/pregnancy-weight-calculator",
});

export default function PregnancyWeightCalculatorPage() {
    return <PregnancyWeightCalculatorClient />;
}
