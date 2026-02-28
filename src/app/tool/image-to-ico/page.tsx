import LegalPageLayout from "./layout";
import ClientPage from "./client-page";

const Page = () => {
    return (
        <LegalPageLayout
            title="PNG/JPG/WebP to ICO Converter"
        >
            <ClientPage />
            <div className="prose dark:prose-invert max-w-none">
                <h2>How to Use the Image to ICO Converter</h2>
                <p>To convert your image to the ICO format, simply click the "Upload Image" button and select the image file you wish to convert. The converted ICO file will be available for download immediately.</p>
                <h2>What is an ICO File?</h2>
                <p>An ICO file is an image file format that can contain multiple images at multiple sizes and color depths. ICO files are commonly used for website favicons.</p>
            </div>
        </LegalPageLayout>
    );
};

export default Page;
