import { generateMetadata } from "@/components/CalculatorLayout";
import PercentErrorCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Percent Error Calculator",
  description: "Calculate the percent error between an observed value and a true value.",
  keywords: "percent error calculator, percentage error, relative error",
  canonicalUrl: "/math-calculators/percent-error-calculator",
});

export default function Page() {
  return <PercentErrorCalculator />;
}

    