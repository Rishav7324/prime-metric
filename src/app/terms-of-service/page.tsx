
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
    title: "Terms of Service | Prime Metric",
    description: "Read the terms of service for Prime Metric.",
};

const TermsOfServicePage = () => {
  return (
    <LegalPageLayout title="Terms of Service">
        <p className="text-muted-foreground mb-4 text-center">Last updated: July 30, 2024</p>
        <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using our calculators and tools, you accept and agree to be bound by 
                the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily use our calculators and tools for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
              <p className="text-muted-foreground">
                The calculators and tools are provided "as is". We make no warranties, expressed or implied, 
                and hereby disclaim all warranties including, without limitation, implied warranties or conditions 
                of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Accuracy of Calculations</h2>
              <p className="text-muted-foreground mb-3">
                While we strive to provide accurate calculations, we do not guarantee the accuracy, 
                completeness, or reliability of any calculation results. Users should verify important 
                calculations with professional advisors.
              </p>
              <p className="text-muted-foreground">
                Our calculators are designed to provide estimates and general information for educational 
                purposes. For critical financial, medical, or legal decisions, always consult with qualified 
                professionals such as financial advisors, doctors, lawyers, or certified accountants who can 
                provide personalized advice based on your specific circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Limitations</h2>
              <p className="text-muted-foreground mb-3">
                In no event shall our company or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use our services.
              </p>
              <p className="text-muted-foreground">
                This includes but is not limited to direct, indirect, incidental, punitive, and consequential 
                damages. Some jurisdictions do not allow the exclusion of certain warranties or limitations 
                on liability, so some of the above limitations may not apply to you. In such cases, our 
                liability will be limited to the maximum extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. User Conduct</h2>
              <p className="text-muted-foreground">
                You agree not to use our services for any unlawful purpose or in any way that could 
                damage, disable, or impair our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Modifications</h2>
              <p className="text-muted-foreground">
                We may revise these terms of service at any time without notice. By using our services, 
                you agree to be bound by the current version of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by and construed in accordance with applicable laws, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Information</h2>
              <p className="text-muted-foreground">
                Questions about the Terms of Service should be sent to us via our 
                <Link href="/contact" className="text-primary hover:underline ml-1">contact page</Link>.
              </p>
            </section>
          </div>
    </LegalPageLayout>
  );
};

export default TermsOfServicePage;
