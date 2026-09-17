import { generateMetadata } from "@/components/CalculatorLayout";
import HeartRateCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Heart Rate Zone Calculator: Max HR & Targets",
  description: "Find your max heart rate and 5 personalized training zones from age and resting HR, with fat-burn and cardio targets for smarter workouts.",
  keywords: "heart rate zone calculator, max heart rate calculator, target heart rate, fat burn zone, cardio zone chart",
  canonicalUrl: "/health-calculators/heart-rate-calculator",
});

export default function Page() {
  return <HeartRateCalculator />;
}
