import BMICalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "बीएमआई कैलकुलेटर",
    description: "अपना बॉडी मास इंडेक्स (BMI) जानें — स्वस्थ वजन सीमा और BMR के साथ | Free BMI Calculator in Hindi",
    keywords: "बीएमआई कैलकुलेटर, bmi calculator hindi, body mass index hindi, वजन कैलकुलेटर, bmr calculator hindi",
    canonicalUrl: "/hi/bmi-calculator",
});

export default function BMICalculatorHindiPage() {
    return <BMICalculatorClient />;
}
