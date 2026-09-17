import { generateMetadata } from "@/components/CalculatorLayout";
import PrimeChecker from "./client-page";

export const metadata = generateMetadata({
  title: "Prime Number Checker",
  description: "Check if any number is prime instantly with full factors and nearest primes. Fast primality testing for math homework and coding.",
  keywords: "prime checker, prime number checker, is prime, prime factorization, nearest prime, primality test",
  canonicalUrl: "/math-calculators/prime-checker",
});

export default function Page() {
  return <PrimeChecker />;
}
