
import PasswordGenerator from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Password Generator",
    description: "Create strong, random, and secure passwords.",
    keywords: "password generator, secure password, random password",
    canonicalUrl: "/other-calculators/password-generator"
});

export default function Page() {
    return <PasswordGenerator />;
}
