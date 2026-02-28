import { Metadata } from "next";
import { ClientPage } from "./client-page";
import LegalPageLayout from "@/components/LegalPageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Free Online ICO Converter | Convert PNG, JPG, WebP to ICO",
    description: "Easily convert your PNG, JPG, or WebP images to the ICO format for free. Create favicons for your website quickly and without watermarks. SEO-friendly and AdSense compliant.",
    keywords: ["ico converter", "png to ico", "jpg to ico", "webp to ico", "image to ico", "favicon generator", "free online tool"],
};

export default function ImageToIcoPage() {
    return (
        <LegalPageLayout
            title="PNG/JPG/WebP to ICO Converter"
            description="Create favicons for your website by converting your images to the ICO format."
        >
            <ClientPage />
            <div className="prose dark:prose-invert max-w-none">
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>About Our ICO Converter Tool</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Our ICO Converter is a free online tool that allows you to convert images in PNG, JPG, and WebP formats into the ICO format. ICO files are commonly used for website favicons, the small icons you see in browser tabs. This tool is designed to be fast, easy to use, and respectful of your privacy. We do not upload your images to our servers; all conversions are done in your browser.</p>
                    </CardContent>
                </Card>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>How to Use</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal pl-6">
                            <li>Click the 'Upload Image' button to select a PNG, JPG, or WebP file from your computer.</li>
                            <li>The tool will automatically convert the image to the ICO format.</li>
                            <li>A preview of your ICO file will be displayed.</li>
                            <li>Click the 'Download ICO' button to save the file to your device.</li>
                        </ol>
                    </CardContent>
                </Card>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Frequently Asked Questions (FAQ)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li>
                                <strong>What is an ICO file?</strong>
                                <p>An ICO file is an image file format for computer icons in Microsoft Windows. ICO files contain one or more small images at multiple sizes and color depths.</p>
                            </li>
                            <li>
                                <strong>Why do I need an ICO file?</strong>
                                <p>Websites use ICO files for favicons, which are the small icons displayed in browser tabs, bookmarks, and history. They help users visually identify your website.</p>
                            </li>
                            <li>
                                <strong>Is this tool free to use?</strong>
                                <p>Yes, our ICO converter is completely free to use without any limitations or watermarks.</p>
                            </li>
                            <li>
                                <strong>Is it safe to use this tool?</strong>
                                <p>Absolutely. We respect your privacy. Your images are not uploaded to our servers. All processing is done directly in your browser.</p>
                            </li>
                            <li>
                                <strong>What are the supported input formats?</strong>
                                <p>You can upload images in PNG, JPG, and WebP formats.</p>
                            </li>
                             <li>
                                <strong>What are the recommended dimensions for a favicon?</strong>
                                <p>The most common sizes for favicons are 16x16, 32x32, and 48x48 pixels. Our tool will resize your image to these standard dimensions.</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </LegalPageLayout>
    );
}
