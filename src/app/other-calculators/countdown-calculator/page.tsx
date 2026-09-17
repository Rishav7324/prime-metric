
import CountdownCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Countdown Calculator: Days Until Any Event",
    description: "Free event countdown calculator with a live ticking display of days, hours, minutes and seconds until birthdays, launches and holidays.",
    keywords: "countdown calculator, event countdown timer, days until calculator, online countdown, date countdown timer",
    canonicalUrl: "/other-calculators/countdown-calculator"
});

export default function Page() {
    return <CountdownCalculatorClient />;
}
