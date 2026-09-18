import { generateMetadata } from "@/components/CalculatorLayout";
import DebtPayoffCalculatorClient from "./client-page";

export const metadata = generateMetadata({
  title: "Debt Payoff Calculator – Be Debt-Free",
  description: "Enter balance, APR and monthly payment to get months to payoff, total interest and your debt-free date instantly and free",
  keywords: "debt payoff calculator, credit card payoff calculator, debt free date, payoff total interest, loan payoff planner",
  canonicalUrl: "/financial-calculators/debt-payoff-calculator",
});

export default function DebtPayoffCalculatorPage() {
  return <DebtPayoffCalculatorClient />;
}
