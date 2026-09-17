import AgeCalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "आयु कैलकुलेटर",
    description: "अपनी सटीक उम्र वर्ष, महीनों, दिनों में जानें — जन्मदिन, राशि और सप्ताह के दिन के साथ | Free Age Calculator in Hindi",
    keywords: "आयु कैलकुलेटर, age calculator hindi, जन्म तिथि से उम्र, birthday calculator hindi, how old am i hindi",
    canonicalUrl: "/hi/age-calculator",
});

export default function AgeCalculatorHindiPage() {
    return <AgeCalculatorClient />;
}
