import { generateMetadata } from "@/components/CalculatorLayout";
import EpfCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "EPF Calculator – Maturity, Interest & Growth",
  description: "Estimate your EPF maturity at age 60 with yearly compounding, salary growth and custom rates. See contributions, interest earned and final PF corpus.",
  keywords: "epf calculator, pf maturity calculator, epf interest calculator, provident fund estimator",
  canonicalUrl: "/financial-calculators/epf-calculator",
});

export default function Page() {
  return <EpfCalculator />;
}
