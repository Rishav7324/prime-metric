import { generateMetadata } from "@/components/CalculatorLayout";
import PaymentCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Payment Calculator",
  description: "Calculate payments for loans, leases, or other financing arrangements.",
  keywords: "payment calculator, loan payment, lease payment, financing calculator",
  canonicalUrl: "/financial-calculators/payment-calculator",
});

export default function Page() {
  return <PaymentCalculator />;
}

    