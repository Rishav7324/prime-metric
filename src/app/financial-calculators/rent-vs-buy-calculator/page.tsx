import { generateMetadata } from "@/components/CalculatorLayout";
import RentVsBuyCalculatorClient from "./client-page";

export const metadata = generateMetadata({
  title: "Rent vs Buy Calculator – Own or Rent?",
  description: "Compare total renting vs buying costs with loan EMI, rent hikes and home growth to see which option saves you more money",
  keywords: "rent vs buy calculator, renting vs buying home, buy or rent calculator, home loan vs rent, rent hike calculator",
  canonicalUrl: "/financial-calculators/rent-vs-buy-calculator",
});

export default function RentVsBuyCalculatorPage() {
  return <RentVsBuyCalculatorClient />;
}
