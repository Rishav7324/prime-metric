
import AgeCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Age Calculator",
    description: "Calculate your exact age in years, months, days, and more",
    keywords: "age calculator, birthday calculator, date of birth calculator, how old am i",
    canonicalUrl: "/other-calculators/age-calculator"
});

export default function Page() {
    return <AgeCalculatorClient />;
}
