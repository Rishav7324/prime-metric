
import BudgetCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Budget Calculator",
  description: "Plan and track your monthly income and expenses",
  keywords: "budget calculator, monthly budget planner, expense tracker, savings calculator",
  canonicalUrl: "/financial-calculators/budget-calculator",
});

export default function BudgetCalculatorPage() {
    return <BudgetCalculatorClient />;
}
