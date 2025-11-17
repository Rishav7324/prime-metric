import { generateMetadata } from "@/components/CalculatorLayout";
import CompressImage from "./client-page";

export const metadata = generateMetadata({
  title: "Image Compressor",
  description: "Reduce image file size by quality or to a specific target size (KB/MB).",
  keywords: "compress image, reduce image size, image compression, optimize images, compress jpg, compress png",
  canonicalUrl: "/tool/compress-image",
});

export default function Page() {
  return <CompressImage />;
}
