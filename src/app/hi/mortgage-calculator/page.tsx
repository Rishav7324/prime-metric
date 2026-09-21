import MortgageCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

const _seoBase = generateMetadata({
  title: "होम लोन कैलकुलेटर",
  description: "अपनी मासिक होम लोन किस्त, कुल भुगतान और ब्याज की गणना करें | Free Mortgage Calculator in Hindi",
  keywords: "होम लोन कैलकुलेटर, mortgage calculator hindi, home loan emi hindi, हाउस लोन किस्त, emi calculator hindi",
  canonicalUrl: "/hi/mortgage-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/mortgage-calculator",
    languages: {
      hi: "https://primemetric.online/hi/mortgage-calculator",
      en: "https://primemetric.online/financial-calculators/mortgage-calculator",
      "x-default": "https://primemetric.online/financial-calculators/mortgage-calculator",
    },
  },
};

export default function MortgageCalculatorHindiPage() {
    return <MortgageCalculatorClient />;
}
