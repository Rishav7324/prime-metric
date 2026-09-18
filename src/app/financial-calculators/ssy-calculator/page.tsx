import { generateMetadata } from "@/components/CalculatorLayout";
import SsyCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "SSY Calculator – Sukanya Samriddhi Returns",
  description: "Project Sukanya Samriddhi maturity at current rates. Enter yearly deposit and the girl's age to see total invested, interest earned and maturity value.",
  keywords: "ssy calculator, sukanya samriddhi yojana, ssy maturity calculator, girl child savings scheme",
  canonicalUrl: "/financial-calculators/ssy-calculator",
});

export default function Page() {
  return <SsyCalculator />;
}
