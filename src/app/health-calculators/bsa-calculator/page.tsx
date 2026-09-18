import BSACalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "BSA Calculator: Body Surface Area (DuBois)",
    description: "Calculate body surface area (BSA) in m² with Du Bois and Mosteller formulas from weight and height. Includes dosing uses and safety notes.",
    keywords: "bsa calculator, body surface area calculator, dubois formula, mosteller formula, bsa drug dosing",
    canonicalUrl: "/health-calculators/bsa-calculator",
});

export default function BSACalculatorPage() {
    return <BSACalculatorClient />;
}
