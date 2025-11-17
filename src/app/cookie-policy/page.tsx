
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Prime Metric",
    description: "Learn about how Prime Metric uses cookies.",
};

const CookiePolicyPage = () => {
  return (
    <LegalPageLayout title="Cookie Policy">
        <div className="space-y-6 text-muted-foreground">
            <h3 className="text-lg font-semibold text-foreground">What Are Cookies</h3>
            <p>As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.</p>

            <h3 className="text-lg font-semibold text-foreground">How We Use Cookies</h3>
            <p>We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site.</p>

            <h3 className="text-lg font-semibold text-foreground">Disabling Cookies</h3>
            <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>
        </div>
    </LegalPageLayout>
  );
};

export default CookiePolicyPage;
