import { generateMetadata } from "@/components/CalculatorLayout";
import SipCalculator from "./client-page";

export const metadata = generateMetadata({
  title: "एसआईपी कैलकुलेटर",
  description: "अपने सिस्टेमैटिक इन्वेस्टमेंट प्लान (SIP) निवेश का भविष्य मूल्य जानें | Free SIP Calculator in Hindi",
  keywords: "एसआईपी कैलकुलेटर, sip calculator hindi, म्यूचुअल फंड कैलकुलेटर, निवेश कैलकुलेटर, sip return hindi",
  canonicalUrl: "/hi/sip-calculator",
});

export default function SipCalculatorHindiPage() {
  return <SipCalculator />;
}
