import BMICalculatorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

const _seoBase = generateMetadata({
    title: "बीएमआई कैलकुलेटर",
    description: "अपना बॉडी मास इंडेक्स (BMI) जानें — स्वस्थ वजन सीमा और BMR के साथ | Free BMI Calculator in Hindi",
    keywords: "बीएमआई कैलकुलेटर, bmi calculator hindi, body mass index hindi, वजन कैलकुलेटर, bmr calculator hindi",
    canonicalUrl: "/hi/bmi-calculator",
});

export const metadata = {
  ..._seoBase,
  alternates: {
    canonical: "https://primemetric.online/hi/bmi-calculator",
    languages: {
      hi: "https://primemetric.online/hi/bmi-calculator",
      en: "https://primemetric.online/health-calculators/bmi-calculator",
      "x-default": "https://primemetric.online/health-calculators/bmi-calculator",
    },
  },
};

export default function BMICalculatorHindiPage() {
    return <BMICalculatorClient />;
}
