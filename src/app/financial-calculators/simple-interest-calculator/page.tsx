import { generateMetadata } from "@/components/CalculatorLayout";
import SimpleInterestCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Simple Interest Calculator",
  description: "Calculate simple interest on a principal amount.",
  keywords: "simple interest calculator, interest calculator, loan interest",
  canonicalUrl: "/financial-calculators/simple-interest-calculator",
});

export default function Page() {
  return <SimpleInterestCalculator />;
}

    