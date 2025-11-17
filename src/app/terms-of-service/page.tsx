
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Prime Metric",
    description: "Read the terms of service for Prime Metric.",
};

const TermsOfServicePage = () => {
  return (
    <LegalPageLayout title="Terms of Service">
        <div className="space-y-6 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">1. Acceptance of Terms</h3>
            <p>By using Prime Metric, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.</p>

            <h3 className="text-lg font-semibold text-foreground">2. Use of Services</h3>
            <p>Our calculators are for informational purposes only and should not be considered professional financial advice. We are not liable for any decisions you make based on our tools.</p>

            <h3 className="text-lg font-semibold text-foreground">3. Intellectual Property</h3>
            <p>All content and tools on this website are the property of Prime Metric and are protected by copyright laws.</p>

            <h3 className="text-lg font-semibold text-foreground">4. Limitation of Liability</h3>
            <p>Prime Metric shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>

            <h3 className="text-lg font-semibold text-foreground">5. Governing Law</h3>
            <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the company is based, without regard to its conflict of law provisions.</p>
        </div>
    </LegalPageLayout>
  );
};

export default TermsOfServicePage;
