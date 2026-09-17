import { generateMetadata } from "@/components/CalculatorLayout";
import OneRepMaxCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "One Rep Max Calculator: Estimate Your 1RM Strength",
  description: "Estimate your one-rep max from weight lifted and reps using Epley and Brzycki formulas, plus a full training-percentage chart for programming.",
  keywords: "one rep max calculator, 1rm calculator, max lift estimator, epley formula, brzycki formula, strength training",
  canonicalUrl: "/health-calculators/one-rep-max-calculator",
});

export default function Page() {
  return <OneRepMaxCalculator />;
}
