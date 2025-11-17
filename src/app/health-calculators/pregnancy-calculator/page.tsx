import { generateMetadata } from "@/components/CalculatorLayout";
import PregnancyCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Pregnancy Due Date Calculator",
  description: "Estimate your pregnancy due date based on your last menstrual period or conception date.",
  keywords: "pregnancy calculator, due date calculator, pregnancy week calculator",
  canonicalUrl: "/health-calculators/pregnancy-calculator",
});

export default function Page() {
  return <PregnancyCalculator />;
}

    