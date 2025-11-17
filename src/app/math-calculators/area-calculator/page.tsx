
import AreaCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Area Calculator",
    description: "Calculate area of different geometric shapes",
    keywords: "area calculator, square feet calculator, triangle area, circle area, rectangle area",
    canonicalUrl: "/math-calculators/area-calculator"
});

export default function AreaCalculatorPage() {
    return <AreaCalculatorClient />;
}
