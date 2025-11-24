
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Disclaimer | Prime Metric",
    description: "Read the important disclaimer for Prime Metric's calculators and tools regarding financial, medical, and general use.",
    keywords: "disclaimer, financial disclaimer, medical disclaimer, calculator accuracy",
    alternates: {
        canonical: "https://primemetric.online/disclaimer",
    }
};

const DisclaimerPage = () => {
  return (
    <LegalPageLayout title="Disclaimer">
        <p className="text-muted-foreground mb-6 text-center">Last updated: November 24, 2025</p>
        
        <div className="space-y-8 text-muted-foreground">
            <p>Welcome to Prime Metric. This Disclaimer (“Disclaimer”) outlines important limitations, clarifications, and responsibilities regarding the use of the website https://primemetric.online (“Site”), its calculators, tools, services, and content. By accessing or using any part of this Site, you agree to the terms described below. If you disagree with any part of this Disclaimer, you must discontinue use immediately.</p>
            <p>Prime Metric is committed to transparency and user safety. However, users must understand that all content, results, and calculations are provided strictly for educational and informational purposes only.</p>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. No Professional Advice</h2>
            <p className="mb-2">Prime Metric is not a substitute for professional advice.</p>
            <p className="mb-2">Our calculators and tools are created to help users understand estimates, formulas, and general guidance in different categories such as:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Finance</li>
                <li>Health</li>
                <li>Business</li>
                <li>Engineering</li>
                <li>Mathematics</li>
                <li>Personal utilities</li>
                <li>Time and date calculations</li>
                <li>Invoice generation</li>
            </ul>
            <p className="mt-2 font-semibold text-foreground">Although we strive for accuracy, Prime Metric does not provide legal, financial, tax, medical, fitness, investment, or professional advice.</p>
            <p className="mt-2">You must NOT use our tools as a final decision-making authority.</p>
            <p className="mt-2">Always consult:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Certified accountants</li>
                <li>Financial consultants</li>
                <li>Tax professionals</li>
                <li>Legal advisors</li>
                <li>Doctors</li>
                <li>Engineers</li>
                <li>Fitness professionals</li>
                <li>Other trained experts</li>
            </ul>
             <p className="mt-2">Prime Metric provides estimates, not certified assessments.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Accuracy of Calculations</h2>
            <p>Prime Metric aims to provide correct formulas and accurate results. However:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Mathematical errors may occur</li>
                <li>Logic may fail in rare edge cases</li>
                <li>External conditions may change real-world results</li>
                <li>User inputs may be incorrect or incomplete</li>
                <li>Formula standards may differ across regions</li>
            </ul>
            <p className="mt-2 font-semibold text-foreground">Because of these factors, we cannot guarantee that results will always be:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Accurate</li>
                <li>Updated</li>
                <li>Complete</li>
                <li>Valid in every scenario</li>
                <li>Suitable for decision-making</li>
            </ul>
            <p className="mt-2">Users are responsible for verifying results independently before relying on them.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. No Liability for Losses</h2>
            <p>Prime Metric shall not be held liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Financial losses</li>
                <li>Business losses</li>
                <li>Health decisions</li>
                <li>Investment issues</li>
                <li>Tax miscalculations</li>
                <li>Incorrect invoices</li>
                <li>Data errors</li>
                <li>Failed predictions</li>
                <li>Misuse of the platform</li>
                <li>Damage from reliance on automated results</li>
            </ul>
            <p className="mt-2">By using the Site, you accept full responsibility for your actions.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Educational Purpose Only</h2>
            <p>All calculators, tools, templates, examples, charts, and explanations are designed for educational purposes.</p>
            <p className="mt-2 font-semibold text-foreground">Prime Metric does not:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Guarantee perfect accuracy</li>
                <li>Certify information legally</li>
                <li>Replace professional analysis</li>
                <li>Provide personalized consulting</li>
                <li>Consider special or unusual scenarios</li>
            </ul>
            <p className="mt-2">The platform is intended for general learning and convenience, not expert diagnostics.</p>
          </section>

           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Third-Party Tools & Links</h2>
            <p>Prime Metric may contain:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Third-party links</li>
                <li>References to external sites</li>
                <li>Advertisements (Google AdSense)</li>
                <li>Affiliate recommendations (future possibility)</li>
                <li>Integrated services such as Google Analytics, Firebase, or social platforms</li>
            </ul>
            <p className="mt-2 font-semibold text-foreground">We do not control or endorse:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Content on external websites</li>
                <li>Policies of third-party platforms</li>
                <li>Accuracy or reliability of linked resources</li>
                <li>Safety or security of third-party sites</li>
            </ul>
            <p className="mt-2">Users must review those websites’ policies separately.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. User Responsibility</h2>
            <p>Users agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Enter correct data</li>
                <li>Understand limitations of automated tools</li>
                <li>Not misuse calculators for fraud</li>
                <li>Not generate false or misleading invoices</li>
                <li>Not rely on output without verification</li>
                <li>Take full responsibility for decisions made using this website</li>
            </ul>
            <p className="mt-2 font-semibold text-foreground">Prime Metric is NOT responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Wrong inputs</li>
                <li>Incorrect interpretations</li>
                <li>Misuse of our calculators</li>
                <li>Misunderstanding of results</li>
            </ul>
            <p className="mt-2">Users should apply personal judgment and verify data independently.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Invoice Generator Disclaimer</h2>
            <p>The invoice generator tool allows users to:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Upload logos</li>
                <li>Create invoices</li>
                <li>Download PDFs</li>
                <li>Save invoice history</li>
            </ul>
            <p className="mt-2 font-semibold text-foreground">However:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>We do NOT verify the legality, authenticity, or correctness of invoices created</li>
                <li>We do NOT confirm tax accuracy or business compliance</li>
                <li>Any errors or misuse are solely the user's responsibility</li>
            </ul>
             <p className="mt-2 font-semibold text-foreground">Prime Metric is NOT liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Business disputes</li>
                <li>Tax penalties</li>
                <li>Invoice fraud</li>
                <li>Mistakes in user-entered data</li>
            </ul>
            <p className="mt-2">This tool is purely for convenience and template generation.</p>
          </section>

           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Ads & Monetization</h2>
            <p>Prime Metric displays advertisements using Google AdSense.</p>
            <p className="mt-2 font-semibold text-foreground">Ad content is:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Served by Google</li>
                <li>Controlled by Google’s algorithms</li>
                <li>Not selected or endorsed by Prime Metric</li>
            </ul>
            <p className="mt-2 font-semibold text-foreground">We are NOT responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Advertiser claims</li>
                <li>Accuracy of ad content</li>
                <li>Safety of external websites</li>
            </ul>
            <p className="mt-2">Users should exercise caution when interacting with any ad.</p>
          </section>

           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">9. No Warranties</h2>
            <p>Prime Metric provides its Services on an “as-is” and “as-available” basis.</p>
            <p className="mt-2 font-semibold text-foreground">We do NOT guarantee:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Uninterrupted service</li>
                <li>Absence of errors or bugs</li>
                <li>Full accuracy of calculations</li>
                <li>Continuous availability of features</li>
                <li>That results will meet your expectations</li>
                <li>100% secure storage of uploaded data</li>
            </ul>
            <p className="mt-2">While we take care to maintain smooth performance, the platform may experience downtime, updates, or temporary maintenance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Limitation of Liability</h2>
            <p>To the maximum extent allowed by applicable laws:</p>
            <p className="mt-2 font-semibold text-foreground">Prime Metric, its owners, developers, partners, and contributors shall NOT be liable for:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Any direct, indirect, incidental, consequential, or special damages</li>
                <li>Financial losses</li>
                <li>Business losses</li>
                <li>Damages resulting from data loss</li>
                <li>Errors in calculations</li>
                <li>Actions taken based on results from our tools</li>
                <li>Problems caused by third-party integrations</li>
            </ul>
            <p className="mt-2">Use of this platform is entirely at your own risk.</p>
          </section>
          
           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">11. Changes to This Disclaimer</h2>
            <p>We may update or revise this Disclaimer at any time. Changes become effective immediately once published on this page. Continued use of the website after changes means you accept the updated Disclaimer.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">12. Contact Information</h2>
            <p>
              If you have questions regarding this Disclaimer, you can contact us:
              <br/>
              📧 <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a>
            </p>
            <p className="mt-2">We will make every effort to respond promptly.</p>
          </section>
        </div>
    </LegalPageLayout>
  );
};

export default DisclaimerPage;

    