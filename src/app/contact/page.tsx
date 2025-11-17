
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Prime Metric",
    description: "Get in touch with the Prime Metric team.",
};

const ContactPage = () => {
  return (
    <LegalPageLayout title="Contact Us">
        <div className="space-y-6 text-muted-foreground">
            <p>Have a question, feedback, or a suggestion? We'd love to hear from you. Please feel free to reach out to us, and we will get back to you as soon as possible.</p>
            <p>For general inquiries, you can email us at: <a href="mailto:support@primemetric.online" className="text-primary hover:underline">support@primemetric.online</a></p>
            <p>For business inquiries or partnerships, please contact: <a href="mailto:business@primemetric.online" className="text-primary hover:underline">business@primemetric.online</a></p>
            <p>We appreciate your interest in Prime Metric and look forward to hearing from you.</p>
        </div>
    </LegalPageLayout>
  );
};

export default ContactPage;
