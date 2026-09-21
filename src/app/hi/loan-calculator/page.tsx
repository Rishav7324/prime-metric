import { generateMetadata } from "@/components/CalculatorLayout";
import LoanCalculatorClient from "./client-page";

const _seoBase = generateMetadata({
  title: "लोन ईएमआई कैलकुलेटर",
  description: "किसी भी लोन की मासिक ईएमआई, कुल भुगतान और ब्याज की गणना करें | Free Loan EMI Calculator in Hindi",
  keywords: "लोन ईएमआई कैलकुलेटर, loan emi calculator hindi, लोन कैलकुलेटर, होम लोन emi, कार लोन emi",
  canonicalUrl: "/hi/loan-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/loan-calculator",
    languages: {
      hi: "https://primemetric.online/hi/loan-calculator",
      en: "https://primemetric.online/financial-calculators/loan-calculator",
      "x-default": "https://primemetric.online/financial-calculators/loan-calculator",
    },
  },
};

export default function LoanCalculatorHindiPage() {
  return <LoanCalculatorClient />;
}
