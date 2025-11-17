
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Prime Metric",
    description: "Learn about the mission and vision behind Prime Metric.",
};

const AboutPage = () => {
  return (
    <LegalPageLayout title="About Us">
        <div className="space-y-6 text-muted-foreground">
            <p>Welcome to Prime Metric, your number one source for all things calculation. We're dedicated to providing you the very best of online tools, with an emphasis on accuracy, ease of use, and comprehensive coverage.</p>
            <p>Founded in 2024, Prime Metric has come a long way from its beginnings. When we first started out, our passion for making complex calculations simple and accessible drove us to start this project.</p>
            <p>We now serve users all over the world, and are thrilled that we're able to turn our passion into our own website. We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.</p>
            <p>Sincerely,</p>
            <p>The Prime Metric Team</p>
        </div>
    </LegalPageLayout>
  );
};

export default AboutPage;
