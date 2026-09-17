
import SlugGeneratorClient from "./client-page";
import { generateMetadata } from "@/components/CalculatorLayout";

export const metadata = generateMetadata({
    title: "Slug Generator: Clean SEO-Friendly URL Slugs",
    description: "Free slug generator that turns any title into a clean SEO-friendly URL slug instantly, with lowercase, accent and stop-word options.",
    keywords: "slug generator, url slug generator, seo slug generator, permalink generator, title to slug converter",
    canonicalUrl: "/other-calculators/slug-generator"
});

export default function Page() {
    return <SlugGeneratorClient />;
}
