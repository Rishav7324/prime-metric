import MortgageCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
  title: "होम लोन कैलकुलेटर",
  description: "अपनी मासिक होम लोन किस्त, कुल भुगतान और ब्याज की गणना करें | Free Mortgage Calculator in Hindi",
  keywords: "होम लोन कैलकुलेटर, mortgage calculator hindi, home loan emi hindi, हाउस लोन किस्त, emi calculator hindi",
  canonicalUrl: "/hi/mortgage-calculator",
});

export default function MortgageCalculatorHindiPage() {
    return <MortgageCalculatorClient />;
}
