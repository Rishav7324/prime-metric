import { generateMetadata } from "@/components/CalculatorLayout";
import RoiCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "ROI Calculator",
  description: "Calculate the Return on Investment (ROI) for your investments.",
  keywords: "roi calculator, return on investment, investment calculator, profit calculator",
  canonicalUrl: "/financial-calculators/roi-calculator",
});

export default function Page() {
  return <RoiCalculator />;
}

    