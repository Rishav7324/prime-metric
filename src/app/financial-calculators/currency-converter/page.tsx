
import CurrencyConverterClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Currency Converter",
  description: "Convert between major world currencies",
  keywords: "currency converter, exchange rates, currency calculator, forex calculator",
  canonicalUrl: "/financial-calculators/currency-converter"
});

export default function CurrencyConverterPage() {
    return <CurrencyConverterClient />;
}
