import { generateMetadata } from "@/components/CalculatorLayout";
import BusinessDaysCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Business Days Calculator – Workdays Between Dates",
  description: "Count business days between two dates excluding weekends, subtract holidays, or add N workdays to a start date. Free planner for deadlines and leave.",
  keywords: "business days calculator, workdays calculator, working days between dates, add business days, exclude weekends calculator, workday planner",
  canonicalUrl: "/other-calculators/business-days-calculator",
});

export default function Page() {
  return <BusinessDaysCalculator />;
}
