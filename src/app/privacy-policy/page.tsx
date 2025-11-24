
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | Prime Metric",
    description: "Read the privacy policy for Prime Metric to understand how we collect, use, and protect your data.",
    keywords: "privacy policy, data protection, primemetric privacy, gdpr, ccpa",
    alternates: {
        canonical: "https://primemetric.online/privacy-policy",
    }
};

const PrivacyPolicyPage = () => {
  return (
    <LegalPageLayout title="Privacy Policy">
        <p className="text-muted-foreground mb-6 text-center">Last updated: July 31, 2024</p>
        
        <div className="space-y-8 text-muted-foreground">
          <p>
            Prime Metric (“PrimeMetric”, “we”, “us”, “our”) values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, manage, and safeguard information when you access our website located at https://primemetric.online and any associated tools, calculators, content, features, dashboards, or services (collectively, “Services”).
          </p>
          <p>
            By using Prime Metric, you agree to the practices described in this Privacy Policy. If you do not agree with any part of this policy, you should immediately discontinue using our website.
          </p>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Information We Collect</h2>
            <p className="mb-3">
              We collect information to improve functionality, personalize user experience, and enhance the quality of our tools. The types of information collected include:
            </p>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">1.1 Personal Information (Provided by You)</h3>
            <p>This includes information voluntarily submitted by users, such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name (optional)</li>
                <li>Email address (for contact forms or account creation)</li>
                <li>Business or billing details (for invoice tools)</li>
                <li>Uploaded files (e.g., logo for invoice creation)</li>
                <li>Account login information (when signing up)</li>
            </ul>
            <p className="mt-2">We do not request or store sensitive information such as financial data (credit card numbers), biometric data, health medical reports, or passwords in plain text.</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">1.2 Automatically Collected Information</h3>
            <p>When you use our platform, we may automatically collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Session duration</li>
                <li>Pages visited</li>
                <li>Referring links</li>
                <li>Navigation paths</li>
                <li>Date and time of visits</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">1.3 Cookies and Tracking Technologies</h3>
            <p>We use:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Essential cookies</li>
                <li>Preference cookies</li>
                <li>Analytics cookies</li>
                <li>Advertising cookies (Google AdSense compliant)</li>
            </ul>
            <p className="mt-2">Cookies help us:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Improve user experience</li>
                <li>Measure performance</li>
                <li>Provide relevant content</li>
                <li>Detect unusual activity</li>
            </ul>
            <p className="mt-2">You can manage cookies through your browser settings.</p>

            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">1.4 Third-Party Information</h3>
            <p>Third-party tools such as Google Analytics, Firebase, or AdSense may collect anonymized data for analytics, ads, and service improvements.</p>
            <p className="mt-2">Prime Metric does not sell personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. How We Use Your Information</h2>
            <p className="mb-3">We use your information solely for enhancing the Services. Usage includes:</p>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.1 Improving Website Features</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Ensuring calculators are accurate</li>
                <li>Enhancing performance</li>
                <li>Introducing new tools</li>
                <li>Fixing issues and errors</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.2 Personalization</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Remembering preferences</li>
                <li>Showing relevant calculators</li>
                <li>Tailoring content to user behavior</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.3 Communication</h3>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Responding to inquiries</li>
                <li>Sending critical service updates</li>
                <li>Account notifications</li>
                <li>Support-related replies</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.4 Legal Obligations</h3>
            <p>We may process data to comply with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Applicable laws</li>
                <li>Data protection regulations</li>
                <li>User safety</li>
                <li>Fraud prevention</li>
            </ul>
             <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.5 Advertising and Monetization</h3>
            <p>Prime Metric uses:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Google AdSense (non-personalized or personalized ads)</li>
                <li>Anti-fraud and anti-abuse systems</li>
                <li>Contextual advertising</li>
            </ul>
            <p className="mt-2">We strictly follow Google Publisher Policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. How We Store and Protect Information</h2>
            <p className="mb-3">We take data protection seriously and use the following safeguards:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Encrypted connections through HTTPS</li>
                <li>Secure cloud storage (e.g., Firebase Storage)</li>
                <li>Firewalls and spam filters</li>
                <li>Access control layers</li>
                <li>Regular security audits</li>
                <li>No unauthorized access allowed</li>
            </ul>
            <p className="mt-2">We store data only for as long as necessary for the purpose it was collected.</p>
          </section>

           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Sharing and Disclosure</h2>
            <p className="mb-3">We do not sell user data. We may share limited information with:</p>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">4.1 Service Providers</h3>
            <p>Trusted partners who help us run the website, such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Google Analytics</li>
                <li>Google AdSense</li>
                <li>Firebase Authentication</li>
                <li>Cloud hosting services</li>
            </ul>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">4.2 Legal Requirements</h3>
            <p>Data may be shared if required:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>To comply with a legal process</li>
                <li>To enforce our Terms and Conditions</li>
                <li>To protect user safety</li>
                <li>To prevent fraud or abuse</li>
            </ul>
             <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">4.3 Business Transfers</h3>
             <p>If Prime Metric is acquired, merged, or sold, we may transfer collected data responsibly.</p>
          </section>

           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have rights such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access personal data</li>
                <li>Request correction</li>
                <li>Request deletion (“right to be forgotten”)</li>
                <li>Restrict processing</li>
                <li>Object to certain uses</li>
                <li>Request a copy of your data</li>
            </ul>
            <p className="mt-2">Contact us at <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a> to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Children’s Privacy</h2>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Prime Metric is not intended for children under 13.</li>
              <li>We do not knowingly collect personal information from children.</li>
              <li>If we learn that a child’s data has been collected, we will take steps to remove it immediately.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Third-Party Links</h2>
            <p>Our website may contain links to external websites. We are not responsible for:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Privacy practices</li>
                <li>Security</li>
                <li>Content</li>
                <li>Actions of third-party sites</li>
            </ul>
             <p className="mt-2">We encourage users to read their policies.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">8. International Users</h2>
            <p>By using PrimeMetric, you acknowledge that your data may be processed in servers located outside your country. We ensure all data processing meets global standards.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Updates to This Privacy Policy</h2>
            <p>We may update the Privacy Policy periodically to reflect improved practices or legal requirements. You will be informed through:</p>
             <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Notice on the website</li>
                <li>Email (if applicable)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Contact Us</h2>
            <p>
              For privacy-related questions:
              <br/>
              📧 Email: <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a>
            </p>
             <p className="mt-2">We aim to reply promptly.</p>
          </section>
        </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
