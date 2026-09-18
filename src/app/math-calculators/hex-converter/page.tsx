import { generateMetadata } from "@/components/CalculatorLayout";
import HexConverter from "./client-page";

export const metadata = generateMetadata({
  title: "Hex Converter – Hex, Decimal, Binary, Octal",
  description: "Convert numbers between hexadecimal, decimal, binary and octal instantly. Enter one value, pick its base, and see all four forms plus ASCII.",
  keywords: "hex converter, hex to decimal, decimal to hex, binary converter, octal converter, ascii converter, base converter",
  canonicalUrl: "/math-calculators/hex-converter",
});

export default function Page() {
  return <HexConverter />;
}
