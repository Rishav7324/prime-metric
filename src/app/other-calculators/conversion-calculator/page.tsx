
import ConversionCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Unit Conversion Calculator",
    description: "Convert between different units of measurement",
    keywords: "unit converter, length converter, weight converter, temperature converter, volume converter, metric conversion",
    canonicalUrl: "/other-calculators/conversion-calculator"
});

export default function Page() {
    return <ConversionCalculatorClient />;
}
