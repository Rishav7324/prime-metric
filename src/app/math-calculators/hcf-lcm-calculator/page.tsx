import { generateMetadata } from "@/components/CalculatorLayout";
import HcfLcmCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "HCF and LCM Calculator: GCD & LCM with Steps",
  description: "Find the HCF (GCD) and LCM of two or three numbers with step-by-step Euclidean algorithm working, ideal for homework, exams and quick checks.",
  keywords: "hcf lcm calculator, gcd calculator, greatest common divisor, least common multiple, euclidean algorithm steps",
  canonicalUrl: "/math-calculators/hcf-lcm-calculator",
});

export default function Page() {
  return <HcfLcmCalculator />;
}
