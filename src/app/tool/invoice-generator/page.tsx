import { generateMetadata } from "@/components/CalculatorLayout";
import InvoiceGenerator from "./client-page";

export const metadata = generateMetadata({
  title: "Invoice Generator",
  description: "Create professional invoices for your business quickly and easily.",
  keywords: "invoice generator, free invoice maker, create invoice, business invoice",
  canonicalUrl: "/tool/invoice-generator",
});

export default function Page() {
  return <InvoiceGenerator />;
}

    