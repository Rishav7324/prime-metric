import { generateMetadata } from "@/components/CalculatorLayout";
import GstCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "GST Calculator – Add or Remove GST Instantly",
  description: "Calculate GST-inclusive or exclusive prices instantly. Split CGST and SGST, add or remove tax at any rate with this free online GST calculator.",
  keywords: "gst calculator, gst inclusive exclusive, cgst sgst calculator, add remove gst",
  canonicalUrl: "/financial-calculators/gst-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/financial-calculators/gst-calculator",
    languages: {
      en: "https://primemetric.online/financial-calculators/gst-calculator",
      hi: "https://primemetric.online/hi/gst-calculator",
      "x-default": "https://primemetric.online/financial-calculators/gst-calculator",
    },
  },
};

export default function Page() {
  return <GstCalculator />;
}
