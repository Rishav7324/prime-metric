
import BinaryCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "Binary Calculator",
  description: "Perform binary arithmetic operations",
  keywords: "binary calculator, binary arithmetic, binary operations, binary to decimal, binary to hex",
  canonicalUrl: "/math-calculators/binary-calculator",
});

export default function BinaryCalculatorPage() {
    return <BinaryCalculatorClient />;
}
