import { generateMetadata } from "@/components/CalculatorLayout";
import FdCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Fixed Deposit (FD) Calculator – Maturity Value",
  description: "Estimate fixed deposit maturity value with quarterly compounding. Compare principal, interest rate and tenure with this free online FD calculator.",
  keywords: "fd calculator, fixed deposit calculator, fd maturity calculator, fd interest calculator",
  canonicalUrl: "/financial-calculators/fd-calculator",
});

export default function Page() {
  return <FdCalculator />;
}
