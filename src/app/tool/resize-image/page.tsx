import { generateMetadata } from "@/components/CalculatorLayout";
import ResizeImage from "./client-page";

export const metadata = generateMetadata({
  title: "Image Resizer",
  description: "Resize images to your desired dimensions online.",
  keywords: "resize image, image resizer, change image size, photo resizer",
  canonicalUrl: "/tool/resize-image",
});

export default function Page() {
  return <ResizeImage />;
}

    