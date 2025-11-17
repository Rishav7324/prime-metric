import { generateMetadata } from "@/components/CalculatorLayout";
import PasswordGenerator from "./client-page";

export const metadata = generateMetadata({
  title: "Password Generator",
  description: "Create strong, secure, and random passwords.",
  keywords: "password generator, secure password, random password generator",
  canonicalUrl: "/other-calculators/password-generator",
});

export default function Page() {
  return <PasswordGenerator />;
}

    