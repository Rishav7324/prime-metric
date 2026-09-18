import { generateMetadata } from "@/components/CalculatorLayout";
import StepUpSipCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "Step-Up SIP Calculator with Annual Hike",
  description: "See how yearly SIP step-ups boost long-term wealth. Enter monthly SIP, annual hike, expected return and years to project future value with a schedule.",
  keywords: "step up sip calculator, sip with annual increase, sip step up returns, investment growth calculator",
  canonicalUrl: "/financial-calculators/step-up-sip-calculator",
});

export default function Page() {
  return <StepUpSipCalculator />;
}
