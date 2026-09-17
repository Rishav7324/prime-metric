import { generateMetadata } from "@/components/CalculatorLayout";
import RdCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Recurring Deposit (RD) Calculator – Maturity",
  description: "Calculate recurring deposit maturity with monthly compounding. Plan monthly savings and interest earned with this free online RD calculator tool.",
  keywords: "rd calculator, recurring deposit calculator, rd maturity calculator, rd interest calculator",
  canonicalUrl: "/financial-calculators/rd-calculator",
});

export default function Page() {
  return <RdCalculator />;
}
