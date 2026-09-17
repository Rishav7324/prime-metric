import { generateMetadata } from "@/components/CalculatorLayout";
import LoanCalculatorClient from "./client-page";

export const metadata = generateMetadata({
  title: "लोन ईएमआई कैलकुलेटर",
  description: "किसी भी लोन की मासिक ईएमआई, कुल भुगतान और ब्याज की गणना करें | Free Loan EMI Calculator in Hindi",
  keywords: "लोन ईएमआई कैलकुलेटर, loan emi calculator hindi, लोन कैलकुलेटर, होम लोन emi, कार लोन emi",
  canonicalUrl: "/hi/loan-calculator",
});

export default function LoanCalculatorHindiPage() {
  return <LoanCalculatorClient />;
}
