import { generateMetadata } from "@/components/CalculatorLayout";
import NpsCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "NPS Calculator – Corpus, Pension & Annuity",
  description: "Project your NPS Tier-1 corpus at age 60 from monthly contributions and returns. Split annuity versus lump sum and estimate monthly pension payout.",
  keywords: "nps calculator, national pension scheme calculator, nps corpus calculator, retirement pension estimator",
  canonicalUrl: "/financial-calculators/nps-calculator",
});

export default function Page() {
  return <NpsCalculator />;
}
