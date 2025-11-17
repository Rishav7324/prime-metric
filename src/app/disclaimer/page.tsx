
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Disclaimer | Prime Metric",
    description: "Read the disclaimer for Prime Metric's calculators and tools.",
};

const DisclaimerPage = () => {
  return (
    <LegalPageLayout title="Disclaimer">
        <p className="text-muted-foreground mb-6 text-center">Last updated: July 30, 2024</p>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">General Information</h2>
            <p>
              The information provided by our website ("we," "us," or "our") on primemetric.online 
              (the "Site") is for general informational purposes only. All information on the Site is 
              provided in good faith, however we make no representation or warranty of any kind, express 
              or implied, regarding the accuracy, adequacy, validity, reliability, availability, or 
              completeness of any information on the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">No Professional Advice</h2>
            <p className="mb-3">
              The calculators and tools provided on this website are for informational and educational 
              purposes only. They should NOT be considered as:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">Financial Advice:</strong> Our financial calculators 
                (mortgage, loan, investment, retirement, etc.) do not constitute financial, investment, 
                or tax advice. Always consult with a qualified financial advisor before making important 
                financial decisions.
              </li>
              <li>
                <strong className="text-foreground">Medical Advice:</strong> Our health calculators 
                (BMI, BMR, calorie, macro, etc.) are not intended to diagnose, treat, cure, or prevent 
                any disease or health condition. Always consult with a qualified healthcare professional 
                before starting any diet, exercise program, or making health-related decisions.
              </li>
              <li>
                <strong className="text-foreground">Legal Advice:</strong> Nothing on this website 
                should be construed as legal advice. For legal matters, please consult with a qualified 
                attorney.
              </li>
              <li>
                <strong className="text-foreground">Tax Advice:</strong> Our tax-related calculators 
                are simplified tools and may not account for all variables in your specific situation. 
                Consult with a certified tax professional for personalized tax advice.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Accuracy of Calculations</h2>
            <p>
              While we strive to provide accurate calculations using standard formulas and methodologies, 
              we cannot guarantee that all results will be 100% accurate or applicable to your specific 
              situation. Calculation results may vary based on:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Input accuracy and completeness</li>
              <li>Rounding and precision settings</li>
              <li>Regional differences in calculation methods</li>
              <li>Changes in laws, regulations, or industry standards</li>
              <li>Individual circumstances not accounted for in the calculator</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Use at Your Own Risk</h2>
            <p>
              Under no circumstance shall we have any liability to you for any loss or damage of any kind 
              incurred as a result of the use of our calculators or tools, or reliance on any information 
              provided on the Site. Your use of the Site and your reliance on any information is solely 
              at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Third-Party Links and Content</h2>
            <p>
              Our Site may contain links to third-party websites or services that are not owned or 
              controlled by us. We have no control over, and assume no responsibility for, the content, 
              privacy policies, or practices of any third-party websites or services. We strongly advise 
              you to read the terms and conditions and privacy policies of any third-party websites or 
              services that you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">No Warranties</h2>
            <p>
              The Site is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including, 
              without limitation, implied warranties or conditions of merchantability, fitness for a 
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Limitation of Liability</h2>
            <p>
              In no event shall we, our directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential, or punitive damages, including 
              without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting 
              from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Your access to or use of or inability to access or use the Site</li>
              <li>Any conduct or content of any third party on the Site</li>
              <li>Any content obtained from the Site</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Results May Vary</h2>
            <p>
              Individual results using our calculators may vary. Past performance does not guarantee future 
              results. Financial markets, health metrics, and other variables are subject to change and may 
              not perform as calculated or predicted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Updates and Changes</h2>
            <p>
              We reserve the right to modify, update, or discontinue any calculator, tool, or feature at 
              any time without notice. We also reserve the right to update this Disclaimer at any time. 
              Your continued use of the Site after any changes constitutes your acceptance of the new 
              Disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Jurisdictional Issues</h2>
            <p>
              The information on this Site may not be appropriate or available for use in all jurisdictions. 
              Users are responsible for compliance with applicable local laws and regulations. We make no 
              representation that materials on the Site are appropriate or available for use in all locations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Educational Purpose</h2>
            <p>
              Our calculators and tools are designed primarily for educational purposes to help users 
              understand various concepts in finance, health, mathematics, and other areas. They are 
              meant to provide general guidance and should not replace professional consultation for 
              important decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">Contact Information</h2>
            <p>
              If you have any questions or concerns about this Disclaimer, please{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact us
              </Link>.
            </p>
          </section>

          <div className="mt-8 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="font-semibold text-foreground mb-2">Important Reminder:</p>
            <p>
              Always verify calculation results with professional advisors and official sources before 
              making important financial, health, legal, or other significant decisions. The calculators 
              on this site are tools to assist you, not to replace professional advice.
            </p>
          </div>
        </div>
    </LegalPageLayout>
  );
};

export default DisclaimerPage;
