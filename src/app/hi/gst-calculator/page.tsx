import { generateMetadata } from "@/components/CalculatorLayout";
import GstCalculator from "./client-page";

const _seoBase = generateMetadata({
  title: "जीएसटी कैलकुलेटर",
  description: "किसी भी कीमत पर तुरंत जीएसटी जोड़ें या हटाएं — CGST और SGST विभाजन के साथ | Free GST Calculator in Hindi",
  keywords: "जीएसटी कैलकुलेटर, gst calculator hindi, cgst sgst hindi, जीएसटी जोड़ें हटाएं, gst rate hindi",
  canonicalUrl: "/hi/gst-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/gst-calculator",
    languages: {
      hi: "https://primemetric.online/hi/gst-calculator",
      en: "https://primemetric.online/financial-calculators/gst-calculator",
      "x-default": "https://primemetric.online/financial-calculators/gst-calculator",
    },
  },
};

export default function GstCalculatorHindiPage() {
  return <GstCalculator />;
}
