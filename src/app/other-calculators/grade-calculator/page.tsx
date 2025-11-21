
import GradeCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Grade Calculator",
    description: "Calculate grade percentage and letter grade from scored marks",
    keywords: "grade calculator, percentage calculator, test score calculator, final grade",
    canonicalUrl: "/other-calculators/grade-calculator"
});

export default function Page() {
    return <GradeCalculatorClient />;
}
