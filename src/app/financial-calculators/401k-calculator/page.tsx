import { generateMetadata } from "@/components/CalculatorLayout";
import K401Calculator from "./client-page";

export const metadata = generateMetadata({
  title: "401(k) Calculator",
  description: "Estimate your 401(k) growth over time with employer match and contributions.",
  keywords: "401k calculator, retirement savings, investment calculator, 401k growth",
  canonicalUrl: "/financial-calculators/401k-calculator",
});

export default function Page() {
  return <K401Calculator />;
}

    