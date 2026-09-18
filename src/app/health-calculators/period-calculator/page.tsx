import PeriodCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Period Calculator: Predict Next 3 Cycles",
    description: "Predict your next 3 period dates, ovulation days and fertile windows from your last period and cycle length. Free, private and easy.",
    keywords: "period calculator, menstrual cycle predictor, ovulation calculator, fertile window calculator, next period predictor",
    canonicalUrl: "/health-calculators/period-calculator",
});

export default function PeriodCalculatorPage() {
    return <PeriodCalculatorClient />;
}
