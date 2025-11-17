import { generateMetadata } from "@/components/CalculatorLayout";
import SipCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "SIP Calculator",
  description: "Calculate the future value of your Systematic Investment Plan (SIP) investments.",
  keywords: "sip calculator, systematic investment plan, mutual fund calculator, investment calculator",
  canonicalUrl: "/financial-calculators/sip-calculator",
});

export default function Page() {
  return <SipCalculator />;
}

    