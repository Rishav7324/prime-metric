
import LoveCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Love Calculator: Fun Name Compatibility Test",
    description: "Fun love calculator for entertainment only — enter two names for a playful compatibility score, verdict and shareable result instantly.",
    keywords: "love calculator, love compatibility calculator, name love match, crush compatibility test, love percentage calculator",
    canonicalUrl: "/other-calculators/love-calculator"
});

export default function Page() {
    return <LoveCalculatorClient />;
}
