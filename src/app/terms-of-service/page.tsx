
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service | Prime Metric",
    description: "Read the Terms of Service for Prime Metric before using our calculators and tools.",
    keywords: "terms of service, terms and conditions, primemetric terms, user agreement",
    alternates: {
        canonical: "https://primemetric.online/terms-of-service",
    }
};

const TermsOfServicePage = () => {
  return (
    <LegalPageLayout title="Terms of Service">
        <p className="text-muted-foreground mb-6 text-center">Last updated: July 31, 2024</p>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or using our website, https://primemetric.online (the "Site"), and the services, features, content, applications, or tools offered by Prime Metric (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use our Services.
            </p>
            <p className="mt-2">
              These Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and Prime Metric (“we,” “us,” or “our”), concerning your access to and use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Description of Service</h2>
            <p>
              Prime Metric provides a collection of online calculators, converters, and educational content for general informational and educational purposes only. The tools cover various domains including finance, health, and mathematics. All calculations are performed within your browser, and we do not store the personal or financial data you enter into the calculators. Our Services are provided free of charge and are supported by advertising.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. No Professional Advice (Disclaimer of Warranties)</h2>
            <p className="font-semibold text-foreground mb-2">
              The information and tools provided through the Services are for educational and informational purposes only and are not a substitute for professional advice.
            </p>
            <p className="mb-3">
              The Services are provided on an "AS IS" and "AS AVAILABLE" basis. We expressly disclaim all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We make no warranty that the Services will meet your requirements, be uninterrupted, timely, secure, or error-free.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>No Financial Advice:</strong> The financial calculators are not intended to provide financial, investment, legal, or tax advice. You should consult with a qualified professional before making any financial decisions.</li>
              <li><strong>No Medical Advice:</strong> The health calculators are not intended to provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</li>
            </ul>
             <p className="mt-3">
              Your reliance on any information or calculation provided by the Services is solely at your own risk. Please read our full <Link href="/disclaimer" className="text-primary hover:underline">Disclaimer</Link> for more details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. User Conduct and Responsibilities</h2>
            <p className="mb-3">
              You agree to use the Services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Services. Prohibited behavior includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Using the Services for any fraudulent or illegal purpose.</li>
              <li>Attempting to gain unauthorized access to our computer systems or engaging in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of the Services.</li>
              <li>Introducing any viruses, trojans, worms, logic bombs, or other material that is malicious or technologically harmful.</li>
              <li>Scraping, data mining, or extracting data from the Site without our prior written permission.</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Intellectual Property Rights</h2>
            <p>
              The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Prime Metric, its licensors, or other providers of such material and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
             <p className="mt-2">
              You are granted a limited, non-exclusive, non-transferable license to access and use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as it is necessary for your personal use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Third-Party Links and Advertising</h2>
            <p>
              The Services may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="mt-2">
              Our Services are supported by advertising from third-party networks, such as Google AdSense. These ads are not endorsements, and we are not responsible for the content of these advertisements or the products/services they offer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, in no event shall Prime Metric, its affiliates, directors, employees, or licensors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, arising out of or relating to the use of, or inability to use, the Services.
            </p>
             <p className="mt-2">
              Under no circumstances will we be responsible for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access or use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Prime Metric and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, or b) a breach of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Modifications to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect by updating the "Last updated" date. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Prime Metric operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us by email at <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a> or through our <Link href="/contact" className="text-primary hover:underline">contact page</Link>.
            </p>
          </section>
        </div>
    </LegalPageLayout>
  );
};

export default TermsOfServicePage;
