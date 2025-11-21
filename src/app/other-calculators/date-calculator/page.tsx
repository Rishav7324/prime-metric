
import DateCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Date Calculator",
    description: "Calculate the difference between two dates in various units",
    keywords: "date calculator, time between dates, date difference, days between dates, date duration",
    canonicalUrl: "/other-calculators/date-calculator"
});

export default function Page() {
    return <DateCalculatorClient />;
}
