import CarbohydrateCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Carbohydrate Calculator",
    description: "Calculate daily carb intake needs for your activity level and goals",
    keywords: "carbohydrate calculator, carb intake, daily carbs, nutrition calculator, macro calculator",
    canonicalUrl: "/health-calculators/carbohydrate-calculator",
});

export default function CarbohydrateCalculatorPage() {
    return <CarbohydrateCalculatorClient />;
}
