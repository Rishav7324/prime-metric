import { generateMetadata } from "@/components/CalculatorLayout";
import RentCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Rent Calculator",
  description: "Determine how much rent you can afford based on your income.",
  keywords: "rent calculator, rent affordability, how much rent can i afford, rental budget",
  canonicalUrl: "/financial-calculators/rent-calculator",
});

export default function Page() {
  return <RentCalculator />;
}

    