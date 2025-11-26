
'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LegalPageLayout from "@/components/LegalPageLayout";
import { Mail, Briefcase, Info, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

const ContactPage = () => {
  return (
    <LegalPageLayout title="Contact Us">
      <p className="text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
        We value your feedback, suggestions, and questions. Whether you want to report an issue, request a new calculator, suggest improvements, or inquire about our platform, we are always here to help. Prime Metric is built for users like you, and every message we receive helps us improve and grow.
      </p>

      <div className="space-y-8">
        <Card className="p-8 bg-card/80 backdrop-blur">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Support Email</h2>
              <p className="text-muted-foreground mb-4">
                For all inquiries, support, and assistance, reach us at:
              </p>
              <a href="mailto:help@primemetric.online">
                <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    help@primemetric.online
                </Button>
              </a>
              <p className="text-sm text-muted-foreground mt-4">We make every effort to respond as quickly as possible, generally within 24–72 hours.</p>
            </div>
          </div>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-semibold text-lg mb-4 flex items-center"><Info className="w-5 h-5 mr-2 text-primary"/> When to Contact Us</h3>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5">
                    <li>Reporting a technical problem or bug</li>
                    <li>Requesting a new calculator or feature</li>
                    <li>Suggestions or feedback</li>
                    <li>AdSense or advertising inquiry</li>
                    <li>General questions about how tools work</li>
                    <li>Content-related concerns</li>
                    <li>Legal/privacy-related inquiries</li>
                </ul>
            </Card>
            <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-semibold text-lg mb-4">Before Contacting</h3>
                <p className="text-muted-foreground text-sm">
                    Our platform contains more than 100+ calculators and tools. If you are facing trouble on a specific tool page, please include:
                </p>
                <ul className="space-y-2 text-muted-foreground text-sm list-disc pl-5 mt-2">
                    <li>Tool name / calculator name</li>
                    <li>Problem description</li>
                    <li>Screenshot (if possible)</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-2">This helps us solve your issue faster.</p>
            </Card>
        </div>
        
        <Card className="p-8 bg-card/80 backdrop-blur">
          <div className="flex items-start gap-4">
            <Briefcase className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold mb-2">Business & Partnership Inquiry</h2>
              <p className="text-muted-foreground mb-4">
                We welcome collaboration and partnership opportunities that align with our mission. To propose business or partnership discussions, contact:
              </p>
               <a href="mailto:business@primemetric.online?subject=Partnership Proposal – Prime Metric">
                <Button variant="outline">
                    <Briefcase className="w-4 h-4 mr-2" />
                    business@primemetric.online
                </Button>
              </a>
               <p className="text-sm text-muted-foreground mt-2">Subject line: “Partnership Proposal – Prime Metric”</p>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-card/80 backdrop-blur">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Users</h2>
             <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start"><CheckCircle className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" /><span>Providing responsive support</span></li>
                <li className="flex items-start"><CheckCircle className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" /><span>Maintaining platform accuracy</span></li>
                <li className="flex items-start"><CheckCircle className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" /><span>Improving user experience</span></li>
                <li className="flex items-start"><CheckCircle className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" /><span>Keeping our tools free to use</span></li>
                <li className="flex items-start"><CheckCircle className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" /><span>Expanding calculators based on user demand</span></li>
            </ul>
        </Card>

        <div className="text-center mt-12">
            <h3 className="text-xl font-semibold mb-2">Thank You</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
               Thank you for choosing Prime Metric. We look forward to assisting you and continuing to make calculations and decision-making easier for everyone.
            </p>
        </div>
      </div>
    </LegalPageLayout>
  );
};

export default ContactPage;
