import { generateMetadata } from "@/components/CalculatorLayout";
import PpfCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "PPF Calculator – Public Provident Fund Returns",
  description: "Project Public Provident Fund maturity, deposits and tax-free interest. Plan long-term savings with this free online PPF calculator for India.",
  keywords: "ppf calculator, public provident fund calculator, ppf maturity calculator, ppf interest calculator",
  canonicalUrl: "/financial-calculators/ppf-calculator",
});

export default function Page() {
  return <PpfCalculator />;
}
