
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
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Introduction</h2>
            <p>
              Welcome to Prime Metric ("we," "us," or "our"). We operate the website https://primemetric.online (the "Site"). We are committed to protecting the privacy of our users and providing a transparent understanding of how we handle data. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of information when you use our Service and the choices you have associated with that data.
            </p>
            <p className="mt-2">
              Our services primarily consist of online calculators and tools designed to be used without requiring personal identification. The core functionality of our calculators operates directly within your browser. This means that the data you input into the calculators (e.g., financial figures, health metrics) is processed locally on your device and is not transmitted to or stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Information We Collect</h2>
            <p className="mb-4">We collect a limited amount of information to operate and improve our services. The types of information we collect can be categorized as follows:</p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.1. Information You Provide to Us</h3>
            <p>
              The only time we collect personally identifiable information is when you voluntarily provide it to us. This includes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Contact Information:</strong> If you contact us directly via our contact form or by email at <a href="mailto:help@primemetric.online" className="text-primary">help@primemetric.online</a>, we will collect your name, email address, and the content of your message.</li>
              <li><strong>Newsletter Subscription:</strong> If you subscribe to our newsletter, we collect your email address to send you updates and information related to our services.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.2. Information Collected Automatically (Usage Data)</h3>
            <p>
              When you access and use our Site, we automatically collect certain non-personally identifiable information. This "Usage Data" is crucial for understanding how our services are used, improving user experience, and maintaining security. This data includes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Log and Device Information:</strong> We collect standard log files, which include your IP address, browser type (e.g., Chrome, Firefox), browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
              <li><strong>Usage Analytics:</strong> We use third-party services like Vercel Analytics and Google Analytics to collect aggregated data about user interactions. This may include which calculators are used most frequently, which buttons are clicked, and general user flow patterns. This data is anonymized and cannot be used to identify individual users.</li>
              <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar technologies to track activity on our Site and hold certain information. Please see our <Link href="/cookie-policy" className="text-primary">Cookie Policy</Link> for detailed information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. How We Use Your Information</h2>
            <p className="mb-3">
              The information we collect is used for the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>To Provide and Maintain Our Service:</strong> To ensure our calculators function correctly and to provide you with the services you request.</li>
              <li><strong>To Improve and Optimize Our Service:</strong> We analyze Usage Data to understand which tools are popular, identify areas for improvement, fix bugs, and develop new calculators and features that meet our users' needs.</li>
              <li><strong>To Communicate with You:</strong> To respond to your inquiries, comments, or questions when you contact us directly. If you subscribe to our newsletter, we will use your email to send it to you.</li>
              <li><strong>For Advertising Purposes:</strong> We use third-party services like Google AdSense to display advertisements on our Site. These services may use cookies to serve ads based on a user's prior visits to our website or other websites. This helps support the free availability of our tools.</li>
              <li><strong>For Security and Fraud Prevention:</strong> To monitor for and prevent malicious activity, spam, or security breaches.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Data Sharing and Disclosure</h2>
            <p className="mb-3">
              We do not sell your personal information. We may share your information in the following limited circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With Service Providers:</strong> We may share Usage Data with third-party vendors who perform services on our behalf, such as website hosting (Vercel), analytics (Google Analytics), and advertising (Google AdSense). These service providers are obligated not to disclose or use the information for any other purpose.</li>
              <li><strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
              <li><strong>To Protect Our Rights:</strong> We may disclose information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, or situations involving potential threats to the safety of any person.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Data Retention</h2>
            <p>
              We retain personal information we collect from you where we have an ongoing legitimate business need to do so. For example, we will retain your email address if you are subscribed to our newsletter until you choose to unsubscribe. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our service, or we are legally obligated to retain this data for longer time periods.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Your Data Protection Rights</h2>
            <p className="mb-3">
              Depending on your location, you may have the following rights regarding your personal information under laws like the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal information.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal information, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal information, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at <a href="mailto:help@primemetric.online" className="text-primary">help@primemetric.online</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Children's Privacy</h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us by email at <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a> or through our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyPage;
