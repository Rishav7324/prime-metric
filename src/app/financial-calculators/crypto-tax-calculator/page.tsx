import { generateMetadata } from "@/components/CalculatorLayout";
import CryptoTaxCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "India Crypto Tax Calculator (30% Rule)",
  description: "Estimate India crypto tax under Section 115BBH — 30% flat tax on gains, 1% TDS credit, net payable plus no-loss-offset rules explained.",
  keywords: "crypto tax calculator india, vda tax calculator, bitcoin tax india, 115bbh tax calculator",
  canonicalUrl: "/financial-calculators/crypto-tax-calculator",
});

export default function Page() {
  return <CryptoTaxCalculator />;
}
