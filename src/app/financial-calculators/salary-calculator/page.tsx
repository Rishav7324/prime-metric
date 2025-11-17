import { generateMetadata } from "@/components/CalculatorLayout";
import SalaryCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Salary Calculator",
  description: "Convert your salary between hourly, weekly, monthly, and annual rates.",
  keywords: "salary calculator, wage calculator, hourly to annual, salary converter",
  canonicalUrl: "/financial-calculators/salary-calculator",
});

export default function Page() {
  return <SalaryCalculator />;
}

    