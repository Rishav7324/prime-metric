import { generateMetadata } from "@/components/CalculatorLayout";
import RandomNumberGenerator from "./client-page";

export const metadata = generateMetadata({
  title: "Random Number Generator",
  description: "Generate a random number within a specified range.",
  keywords: "random number generator, rng, random number",
  canonicalUrl: "/math-calculators/random-number-generator",
});

export default function Page() {
  return <RandomNumberGenerator />;
}

    