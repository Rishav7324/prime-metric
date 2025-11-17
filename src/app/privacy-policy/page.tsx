
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Prime Metric",
    description: "Read the privacy policy for Prime Metric.",
};

const PrivacyPolicyPage = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
        <div className="space-y-6 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">1. Information We Collect</h3>
            <p>We do not collect any personally identifiable information. All calculations are performed on your device and are not stored on our servers.</p>

            <h3 className="text-lg font-semibold text-foreground">2. How We Use Information</h3>
            <p>Since we do not collect any personal data, we do not use it for any purpose.</p>

            <h3 className="text-lg font-semibold text-foreground">3. Cookies</h3>
            <p>We may use cookies to enhance your experience. You can choose to disable cookies through your browser settings.</p>

            <h3 className="text-lg font-semibold text-foreground">4. Third-Party Services</h3>
            <p>We may use third-party services that collect, monitor, and analyze data to improve our services. These third-party service providers have their own privacy policies addressing how they use such information.</p>

            <h3 className="text-lg font-semibold text-foreground">5. Changes to This Policy</h3>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

            <p>Last updated: July 29, 2024</p>
        </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
