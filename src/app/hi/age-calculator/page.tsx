import AgeCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

const _seoBase = generateMetadata({
    title: "आयु कैलकुलेटर",
    description: "अपनी सटीक उम्र वर्ष, महीनों, दिनों में जानें — जन्मदिन, राशि और सप्ताह के दिन के साथ | Free Age Calculator in Hindi",
    keywords: "आयु कैलकुलेटर, age calculator hindi, जन्म तिथि से उम्र, birthday calculator hindi, how old am i hindi",
    canonicalUrl: "/hi/age-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/age-calculator",
    languages: {
      hi: "https://primemetric.online/hi/age-calculator",
      en: "https://primemetric.online/other-calculators/age-calculator",
      "x-default": "https://primemetric.online/other-calculators/age-calculator",
    },
  },
};

export default function AgeCalculatorHindiPage() {
    return <AgeCalculatorClient />;
}
