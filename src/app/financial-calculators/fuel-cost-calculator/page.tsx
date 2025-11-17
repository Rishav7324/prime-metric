
import FuelCostCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Fuel Cost Calculator",
  description: "Calculate total fuel costs for your trip",
  keywords: "fuel cost calculator, trip cost, gas calculator, mileage cost, fuel budget",
  canonicalUrl: "/financial-calculators/fuel-cost-calculator",
});

export default function FuelCostCalculatorPage() {
    return <FuelCostCalculatorClient />;
}
