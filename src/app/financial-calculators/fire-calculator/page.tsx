import { generateMetadata } from "@/components/CalculatorLayout";
import FireCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "FIRE Calculator: Retire Early Corpus Planner",
  description: "Estimate your FIRE corpus, retirement expenses after inflation, and the monthly SIP needed to retire early with a yearly growth table.",
  keywords: "fire calculator, retire early calculator, retirement corpus calculator, financial independence planner, swr calculator",
  canonicalUrl: "/financial-calculators/fire-calculator",
});

export default function Page() {
  return <FireCalculator />;
}
