
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Prime Metric",
    description: "Read the privacy policy for Prime Metric.",
};

const PrivacyPolicyPage = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
        <p className="text-muted-foreground mb-4 text-center">Last updated: July 30, 2024</p>
        <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information that you provide directly to us when using our calculators and tools. 
                This may include calculation inputs and usage data to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our calculators and tools, 
                to develop new features, and to protect our users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Data Storage</h2>
              <p className="text-muted-foreground mb-3">
                All calculations are performed locally in your browser. We do not store your calculation data 
                on our servers unless you explicitly choose to save or share your results.
              </p>
              <p className="text-muted-foreground">
                This means your financial data, health information, and personal calculations remain completely 
                private and secure on your device. We have no access to the numbers you enter into our calculators, 
                ensuring maximum privacy and data security for all users.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-3">
                We use cookies and similar tracking technologies to track activity on our service and 
                hold certain information to improve user experience and analyze usage patterns.
              </p>
              <p className="text-muted-foreground">
                Cookies help us understand how visitors interact with our calculators, which tools are most 
                popular, and where we can improve the user experience. You can control cookie preferences 
                through your browser settings. Most browsers allow you to refuse cookies or alert you when 
                cookies are being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="text-muted-foreground mb-3">
                We may use third-party services such as Google AdSense for advertising. These services 
                may collect information about your visits to our website and other websites.
              </p>
              <p className="text-muted-foreground">
                Third-party advertising partners may use cookies to display personalized advertisements based 
                on your interests. You can opt out of personalized advertising by visiting 
                www.aboutads.info/choices or through Google's ad settings. These third-party services have 
                their own privacy policies, and we encourage you to review them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
              <p className="text-muted-foreground mb-3">
                You have the right to access, update, or delete your personal information. You can also 
                opt out of certain data collection practices through your browser settings.
              </p>
              <p className="text-muted-foreground">
                Under data protection regulations (such as GDPR and CCPA), you have specific rights regarding 
                your personal data including the right to know what data we collect, the right to request 
                deletion of your data, the right to opt-out of data sales (we don't sell data), and the 
                right to non-discrimination for exercising your privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update our Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us through our 
                <Link href="/contact" className="text-primary hover:underline ml-1">contact page</Link>.
              </p>
            </section>
        </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
