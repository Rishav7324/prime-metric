
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cookie Policy | Prime Metric",
    description: "Learn how Prime Metric uses cookies to improve your experience. Understand what cookies are, how we use them, and how you can manage them.",
    keywords: "cookie policy, cookies, primemetric cookies, website cookies, privacy, tracking technologies",
    alternates: {
      canonical: "https://primemetric.online/cookie-policy",
    }
};

const CookiePolicyPage = () => {
  return (
    <LegalPageLayout title="Cookie Policy">
      <p className="text-muted-foreground mb-6 text-center">Last Updated: November 26, 2025</p>
      
      <div className="space-y-8 text-muted-foreground">
        <p>
          This Cookie Policy explains how Prime Metric ("PrimeMetric", "we", "us", or "our") uses cookies and similar tracking technologies when you visit or interact with our website https://primemetric.online (“Site”) and the tools, calculators, dashboards, invoice systems, and services associated with it (“Services”).
        </p>
        <p>
          By continuing to browse or use Prime Metric, you agree to the use of cookies in accordance with this Cookie Policy. If you do not agree, you may manage cookie preferences through your browser settings.
        </p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored in your browser or device when you visit a website. Cookies help websites load faster, remember your preferences, and improve user experience.
          </p>
          <p className="mt-2">Cookies may:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Store settings such as dark/light mode</li>
            <li>Remember login sessions</li>
            <li>Track navigation patterns</li>
            <li>Personalize content and recommendations</li>
            <li>Analyze website performance</li>
            <li>Display relevant advertisements</li>
          </ul>
          <p className="mt-2">Cookies do not give us access to your personal device or files.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Types of Cookies We Use</h2>
          <p className="mb-3">Prime Metric uses several categories of cookies, each serving a specific purpose.</p>
          
          <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.1 Essential Cookies</h3>
          <p>These cookies are necessary for the website to operate properly. They enable:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Page navigation</li>
            <li>Login authentication</li>
            <li>Keeping users logged in</li>
            <li>Access to secure pages</li>
            <li>Saving invoices and dashboards</li>
          </ul>
          <p className="mt-2">Without these cookies, certain features of the website may not work correctly.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.2 Performance & Analytics Cookies</h3>
          <p>These cookies help us understand how visitors engage with our website. They collect anonymous statistics such as:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Pages visited</li>
            <li>Time spent on each page</li>
            <li>Click patterns</li>
            <li>Scroll movement</li>
            <li>Browser and device details</li>
          </ul>
          <p className="mt-2">We use analytics cookies to improve:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Website speed</li>
            <li>UI/UX</li>
            <li>Tool logic and reliability</li>
            <li>Content accessibility</li>
          </ul>
          <p className="mt-2">Examples include Google Analytics and Firebase Analytics.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.3 Functional Cookies</h3>
          <p>These cookies improve personalization and convenience, such as:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Saving currency format or tax settings</li>
            <li>Remembering theme preferences (dark/light)</li>
            <li>Auto-filling frequently used inputs</li>
            <li>Storing recently viewed calculators</li>
          </ul>
          <p className="mt-2">Functional cookies enhance experience but are not mandatory.</p>

          <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">2.4 Advertising & Marketing Cookies</h3>
          <p>Prime Metric uses Google AdSense, which may use advertising cookies to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Display relevant ads</li>
            <li>Prevent repetitive ads</li>
            <li>Measure ad effectiveness</li>
            <li>Improve quality of ad content</li>
          </ul>
          <p className="mt-2">Ads appear based on:</p>
           <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Website context</li>
            <li>General browsing patterns</li>
            <li>User interests (based on Google’s systems)</li>
          </ul>
          <p className="mt-2">Ad personalization settings are controlled by Google, not Prime Metric.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Third-Party Cookies</h2>
          <p>Some third parties may place cookies when interacting with our website, such as:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Google Analytics</li>
            <li>Google AdSense</li>
            <li>Firebase</li>
            <li>Social networks (if content is shared)</li>
          </ul>
          <p className="mt-2">These third-party cookies operate under their own policies, not ours. We suggest reviewing their privacy documentation separately.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Managing and Blocking Cookies</h2>
          <p className="mb-3">Users can manage or disable cookies at any time.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">How to control cookies in your browser</h3>
          <p>Most browsers allow cookie management. You can:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Block certain types of cookies</li>
            <li>Delete previously stored cookies</li>
            <li>Clear browsing data</li>
            <li>Enable “Do Not Track” mode</li>
          </ul>
          <p className="mt-2">Refer to your browser support page for instructions:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Firefox</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Edge</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
            <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Opera</a></li>
            <li>Android / iOS browsers</li>
          </ul>
          <p className="mt-2">Note: Disabling cookies may affect website features such as login, saved history, preferences, and invoice generation.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">5. How We Use Data from Cookies</h2>
          <p>We use cookie-related data for:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Enhancing website performance</li>
            <li>Fixing bugs</li>
            <li>Adding new features</li>
            <li>Improving calculators and invoice tools</li>
            <li>Personalizing user experience</li>
            <li>Maintaining security</li>
            <li>Showing relevant advertisements</li>
          </ul>
          <p className="mt-2">We do not:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Sell cookie data</li>
            <li>Share personally identifiable information without consent</li>
            <li>Use cookies to access files on user devices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Data Retention</h2>
          <p>Cookies remain stored for different durations depending on type:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Session cookies:</strong> deleted when browser closes</li>
            <li><strong>Persistent cookies:</strong> stored until expiry or manual deletion</li>
          </ul>
          <p className="mt-2">Expiry may range from a few hours to several months depending on function.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Children’s Use</h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Prime Metric is not intended for children under 13.</li>
            <li>We do not knowingly collect or store personal cookie information from children.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Updates to This Cookie Policy</h2>
          <p>We may modify this Cookie Policy periodically to reflect:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>New regulations</li>
            <li>Updated advertising practices</li>
            <li>Analytics improvements</li>
            <li>Website enhancements</li>
          </ul>
          <p className="mt-2">The updated version will always be available on this page with a revised “Last Updated” date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Contact Information</h2>
          <p>
            If you have questions regarding this Cookie Policy or want to request changes, contact us anytime:
            <br />
            📧 <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a>
          </p>
          <p className="mt-2">We respond to all genuine inquiries as quickly as possible.</p>
        </section>
      </div>
    </LegalPageLayout>
  );
};

export default CookiePolicyPage;
