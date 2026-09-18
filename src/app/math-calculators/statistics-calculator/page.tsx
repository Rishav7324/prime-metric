import { generateMetadata } from "@/components/CalculatorLayout";
import StatisticsCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Statistics Calculator — Mean, Median & CI",
  description: "Compute mean, median, mode, range, variance and standard deviation for any number list, plus the 95% confidence interval and sample-size hints.",
  keywords: "statistics calculator, mean median mode, confidence interval calculator, variance, sample size",
  canonicalUrl: "/math-calculators/statistics-calculator",
});

export default function Page() {
  return <StatisticsCalculator />;
}
