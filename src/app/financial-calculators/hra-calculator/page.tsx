import { generateMetadata } from "@/components/CalculatorLayout";
import HraCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "HRA Calculator – Exemption & Taxable HRA",
  description: "Calculate HRA exemption under old-regime rules from basic salary, HRA received and rent paid. Compare metro limits and find your taxable HRA.",
  keywords: "hra calculator, hra exemption calculator, house rent allowance calculator, taxable hra calculator",
  canonicalUrl: "/financial-calculators/hra-calculator",
});

export default function Page() {
  return <HraCalculator />;
}
