
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Cookie Policy | Prime Metric",
    description: "Learn about how Prime Metric uses cookies to improve your experience. Understand what cookies are, how we use them, and how you can manage them.",
    keywords: "cookie policy, cookies, primemetric cookies, website cookies, privacy",
    alternates: {
      canonical: "https://primemetric.online/cookie-policy",
    }
};

const CookiePolicyPage = () => {
  return (
    <LegalPageLayout title="Cookie Policy">
      <p className="text-muted-foreground mb-6 text-center">Last updated: July 30, 2024</p>
      
      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit our website. 
            They are widely used to make websites work more efficiently and provide information to 
            website owners. Cookies help us understand how you use our calculators and tools, enabling 
            us to improve your experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">How We Use Cookies</h2>
          <p className="mb-3">We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Essential Cookies:</strong> These cookies are necessary 
              for the website to function properly. They enable basic functions like page navigation and 
              access to secure areas of the website.
            </li>
            <li>
              <strong className="text-foreground">Functionality Cookies:</strong> These cookies allow the 
              website to remember your preferences (such as your selected currency or theme) and provide 
              enhanced, personalized features.
            </li>
            <li>
              <strong className="text-foreground">Analytics Cookies:</strong> These cookies help us 
              understand how visitors interact with our website by collecting and reporting information 
              anonymously. This helps us improve our calculators and overall user experience.
            </li>
            <li>
              <strong className="text-foreground">Advertising Cookies:</strong> These cookies may be used 
              to deliver advertisements that are relevant to you and your interests. They may also be used 
              to limit the number of times you see an advertisement.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Third-Party Cookies</h2>
          <p className="mb-3">
            In addition to our own cookies, we may also use various third-party cookies to report usage 
            statistics of our website and deliver advertisements. These include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Google Analytics:</strong> Used to track and analyze 
              website traffic and user behavior to improve our services.
            </li>
            <li>
              <strong className="text-foreground">Google AdSense:</strong> Used to display personalized 
              advertisements based on your browsing activity.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Managing Cookies</h2>
          <p className="mb-3">
            You have the right to decide whether to accept or reject cookies. Most web browsers 
            automatically accept cookies, but you can usually modify your browser settings to decline 
            cookies if you prefer. Here's how you can manage cookies in popular browsers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-foreground">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong className="text-foreground">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
            <li><strong className="text-foreground">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong className="text-foreground">Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
          </ul>
          <p className="mt-3">
            Please note that if you choose to disable cookies, some features of our website may not 
            function properly, and your user experience may be affected.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Local Storage</h2>
          <p>
            In addition to cookies, we may use local storage to save your calculator preferences and 
            settings locally on your device. This data is stored in your browser and is not transmitted 
            to our servers. You can clear local storage through your browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Cookie Duration</h2>
          <p className="mb-3">Cookies can be either:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-foreground">Session Cookies:</strong> These are temporary cookies 
              that expire when you close your browser.
            </li>
            <li>
              <strong className="text-foreground">Persistent Cookies:</strong> These remain on your device 
              for a set period or until you delete them manually.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Your Consent</h2>
          <p>
            By using our website, you consent to our use of cookies in accordance with this Cookie Policy. 
            If you do not agree to our use of cookies, you should adjust your browser settings accordingly 
            or refrain from using our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
            or our business operations. We encourage you to review this page periodically to stay informed 
            about how we use cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy or how we use cookies, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>.
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default CookiePolicyPage;
