import { generateMetadata } from "@/components/CalculatorLayout";
import GstCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "जीएसटी कैलकुलेटर",
  description: "किसी भी कीमत पर तुरंत जीएसटी जोड़ें या हटाएं — CGST और SGST विभाजन के साथ | Free GST Calculator in Hindi",
  keywords: "जीएसटी कैलकुलेटर, gst calculator hindi, cgst sgst hindi, जीएसटी जोड़ें हटाएं, gst rate hindi",
  canonicalUrl: "/hi/gst-calculator",
});

export default function GstCalculatorHindiPage() {
  return <GstCalculator />;
}
