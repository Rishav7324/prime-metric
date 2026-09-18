import { generateMetadata } from "@/components/CalculatorLayout";
import VO2maxCalculatorClient from "./client-page";

export const metadata = generateMetadata({
  title: "VO2max Calculator — Estimate Cardio Fitness",
  description: "Estimate VO2max from a 1-mile walk or run using time, heart rate, age, gender and weight, with fitness rating tables and MET calorie burn.",
  keywords: "vo2max calculator, cardio fitness test, rockport walk test, aerobic capacity, met calories",
  canonicalUrl: "/health-calculators/vo2max-calculator",
});

export default function Page() {
  return <VO2maxCalculatorClient />;
}
