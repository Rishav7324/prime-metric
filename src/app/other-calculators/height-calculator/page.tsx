
import HeightCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Height Conversion Calculator",
    description: "Convert height between metric and imperial units",
    keywords: "height converter, feet to cm, cm to feet, inches to cm, height calculator",
    canonicalUrl: "/other-calculators/height-calculator"
});

export default function Page() {
    return <HeightCalculatorClient />;
}
