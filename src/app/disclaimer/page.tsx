
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
        <p className="text-muted-foreground mb-6 text-center">Last updated: July 31, 2024</p>
        
        <div className="space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. General Information Purpose Only</h2>
            <p>
              The information, calculators, tools, and content provided by Prime Metric on https://primemetric.online (the "Site") are for general informational and educational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
            </p>
            <p className="mt-2">
              The tools and calculators are designed to provide estimates and should not be used as the sole basis for making significant decisions. The results are based on standard formulas and user-provided data, and they may not account for all individual circumstances or external factors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. No Professional Advice</h2>
            <p className="mb-3 font-semibold text-foreground">
              The content and tools on this Site are not intended to be, and should not be understood as, professional advice.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-foreground">Financial Disclaimer:</strong> The financial calculators and related content on this Site are not substitutes for professional financial advice. The calculations do not constitute financial, investment, legal, or tax advice. Financial decisions carry risk, and you should always consult with a qualified financial advisor, accountant, or other professional before making any decisions based on information or calculations obtained from this Site.
              </li>
              <li>
                <strong className="text-foreground">Medical and Health Disclaimer:</strong> The health and fitness calculators (e.g., BMI, BMR, Calorie calculators) and content are for informational purposes only and are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read or calculated on this Site. Always consult with a physician or other qualified healthcare provider for any questions about a medical condition.
              </li>
            </ul>
             <p className="mt-3">
              Your use of our tools and reliance on any information provided is solely at your own risk. We are not fiduciaries, and no fiduciary relationship is created by your use of this Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. Limitation of Liability</h2>
            <p>
              Under no circumstance shall Prime Metric, its owners, directors, employees, or affiliates be liable to you or any third party for any loss or damage of any kind, including but not limited to direct, indirect, incidental, special, consequential, or punitive damages, incurred as a result of the use of the Site or reliance on any information or calculation provided on the Site. Your use of the Site and your reliance on its content are solely at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Accuracy and Completeness</h2>
            <p>
              While we strive to keep the information and formulas on the Site up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Calculation results may vary due to factors such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Accuracy and completeness of the data you input.</li>
              <li>Simplifications or assumptions made in the underlying formulas.</li>
              <li>Regional or individual differences not accounted for by the general-purpose calculators.</li>
              <li>Changes in laws, tax codes, regulations, or scientific standards that may not be immediately reflected on the Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. External Links and Third-Party Content</h2>
            <p>
              The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </p>
            <p className="mt-2">
              We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising.
            </p>
          </section>
          
           <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. User Responsibility</h2>
            <p>
              You, the user, are solely responsible for how you use the information and tools provided on this Site. It is your responsibility to verify any information or calculation results before relying on them for any personal, financial, or medical decision. You acknowledge that you understand that the tools are for estimation purposes and should be used as a guide, not as an authoritative source.
            </p>
          </section>

          <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="font-semibold text-foreground mb-2 text-xl">Final Reminder:</p>
            <p className="text-base">
              The tools on Prime Metric are designed to be powerful aids for estimation and education. They are not a substitute for professional judgment. Always consult with a qualified professional before making significant life decisions.
            </p>
          </div>
          
           <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Disclaimer, please do not hesitate to <Link href="/contact" className="text-primary hover:underline">contact us</Link> at <a href="mailto:help@primemetric.online" className="text-primary hover:underline">help@primemetric.online</a>.
            </p>
          </section>
        </div>
    </LegalPageLayout>
  );
};

export default DisclaimerPage;
