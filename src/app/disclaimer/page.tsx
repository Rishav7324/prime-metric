
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | Prime Metric",
    description: "Read the disclaimer for Prime Metric.",
};

const DisclaimerPage = () => {
  return (
    <LegalPageLayout title="Disclaimer">
        <div className="space-y-6 text-muted-foreground">
            <p>The information provided by Prime Metric on our website is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
            <p>Our tools are not a substitute for professional financial advice. Always consult with a qualified professional before making any financial decisions.</p>
            <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
        </div>
    </LegalPageLayout>
  );
};

export default DisclaimerPage;
