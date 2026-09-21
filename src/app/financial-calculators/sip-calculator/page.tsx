import { generateMetadata } from "@/components/CalculatorLayout";
import SipCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "SIP Calculator",
  description: "Calculate the future value of your Systematic Investment Plan (SIP) investments.",
  keywords: "sip calculator, systematic investment plan, mutual fund calculator, investment calculator",
  canonicalUrl: "/financial-calculators/sip-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/sip-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/sip-calculator",
      hi: "https://primemetric.online/hi/sip-calculator",
      "x-default": "https://primemetric.online/financial-calculators/sip-calculator",
    },
  },
};

export default function Page() {
  return <SipCalculator />;
}

    