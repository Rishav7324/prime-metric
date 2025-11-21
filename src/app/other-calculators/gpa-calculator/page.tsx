
import GPACalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "GPA Calculator",
    description: "Calculate your Grade Point Average based on grades and credit hours",
    keywords: "gpa calculator, grade point average, college gpa, high school gpa, weighted gpa",
    canonicalUrl: "/other-calculators/gpa-calculator"
});

export default function Page() {
    return <GPACalculatorClient />;
}
