import { generateMetadata } from "@/components/CalculatorLayout";
import GstCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "GST Calculator – Add or Remove GST Instantly",
  description: "Calculate GST-inclusive or exclusive prices instantly. Split CGST and SGST, add or remove tax at any rate with this free online GST calculator.",
  keywords: "gst calculator, gst inclusive exclusive, cgst sgst calculator, add remove gst",
  canonicalUrl: "/financial-calculators/gst-calculator",
});

export default function Page() {
  return <GstCalculator />;
}
