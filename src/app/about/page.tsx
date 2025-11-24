
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Mail } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Prime Metric",
    description: "Learn about Prime Metric, your trusted source for free online calculators. We provide accurate calculation tools for finance, health, math, and everyday needs.",
    keywords: "about Prime Metric, calculator website, free online tools, calculation platform",
    alternates: {
      canonical: "https://primemetric.online/about",
    }
};

const AboutPage = () => {
  return (
    <LegalPageLayout title="About Us">
        
        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-muted-foreground mb-4">
            Prime Metric is a modern digital platform built with a single purpose—making calculations, planning, and data-driven decisions easier, faster, and more reliable for everyone. Whether someone is analyzing a loan, checking taxes, managing time, improving health, calculating growth, or solving everyday math problems, our tools are designed to deliver accuracy with clarity.
          </p>
          <p className="text-muted-foreground">
            In a world that is filled with overwhelming information, Prime Metric focuses on simplicity. Every tool on our platform is crafted to convert complex formulas into easy-to-understand results. Our goal is to help users save time, reduce confusion, and make confident decisions in their personal, academic, or professional life.
          </p>
        </Card>

        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Our mission is straightforward: To provide fast, accurate, educational, and trustworthy calculators and tools that empower people with knowledge and clarity.
          </p>
          <p className="text-muted-foreground mb-4">
            We believe that accurate calculations shouldn’t require advanced skills, long research, or confusing technical knowledge. Anyone, from students to professionals, should be able to understand the numbers that shape important decisions.
          </p>
          <p className="text-muted-foreground">
            Prime Metric aims to build a library of high-quality calculators covering finance, health, business, engineering, personal tools, and more — each supported with deep educational content such as explanations, formulas, tips, best practices, and FAQs.
          </p>
        </Card>

        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">Why Prime Metric Was Created</h2>
          <p className="text-muted-foreground mb-4">
            Modern users face a unique problem: Too many websites show numbers, but very few help people understand their meaning. Most online calculators offer results, but not explanations. People are left wondering: “Is this result correct?” “How did this value come?” “What formula was used?” “What does this mean for me?” “Is this reliable?”
          </p>
          <p className="text-muted-foreground mb-4">
            Prime Metric was created to solve this exact problem. We designed our tools with an educational foundation. Every calculator comes with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>About the tool</li>
              <li>How it works</li>
              <li>Formula breakdown</li>
              <li>Real-world use cases</li>
              <li>Tips and best practices</li>
              <li>Frequently asked questions</li>
          </ul>
           <p className="text-muted-foreground mt-4">
            Our approach ensures that users don’t just get answers — they gain understanding.
          </p>
        </Card>

        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Makes Prime Metric Different</h2>
          <p className="text-muted-foreground mb-4">
            There are thousands of calculators online, but Prime Metric stands apart in several important ways:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">1. Accuracy Above Everything</h3>
              <p className="text-muted-foreground">Each calculator uses industry-standard formulas, verified logic, and correct mathematical models. Tools are regularly reviewed and updated for improvements.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">2. Educational Content With Every Tool</h3>
              <p className="text-muted-foreground">We don’t just provide results. We provide knowledge. Every tool includes detailed explanations, examples, and FAQs that help users learn while they calculate.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">3. Clean, Simple, and Modern Design</h3>
              <p className="text-muted-foreground">Prime Metric uses a clean UI that is distraction-free and easy to navigate. The layout is mobile-friendly, fast, and built for smooth user experience.</p>
            </div>
             <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">4. Focus on Trust and Transparency</h3>
              <p className="text-muted-foreground">We clearly explain how formulas work, what assumptions are used, what the limitations are, and how results should be interpreted. This transparency builds trust.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">5. 100% Free to Use</h3>
              <p className="text-muted-foreground">All calculators and tools are free and accessible without any hidden restrictions.</p>
            </div>
             <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">6. Built for Everyone</h3>
              <p className="text-muted-foreground">Prime Metric tools are used by students, professionals, researchers, small business owners, freelancers, personal users, and people learning finance, math, and health. Our platform is created to serve everyone.</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Vision for the Future</h2>
            <p className="text-muted-foreground mb-4">
                Prime Metric is not just a calculator website — it is growing into a complete digital toolkit. We plan to expand into:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Advanced financial planning tools</li>
                <li>Document generators</li>
                <li>Invoice creation and management</li>
                <li>Educational guides</li>
                <li>AI-assisted explanations</li>
                <li>More scientific and engineering calculators</li>
                <li>Multi-language support</li>
                <li>User dashboards for saving history</li>
            </ul>
            <p className="text-muted-foreground mt-4">
                Our long-term vision is to become a trusted global platform where anyone can find the right tool to make informed decisions instantly.
            </p>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-semibold text-lg mb-2">Our Commitment</h3>
                <p className="text-muted-foreground">
                    We are committed to keeping all tools updated, improving existing calculators, adding new categories, ensuring zero misleading information, providing full transparency, making learning simple, and keeping Prime Metric fast, clean, and reliable. Your trust is our motivation.
                </p>
            </Card>
            <Card className="p-6 bg-card/80 backdrop-blur">
                <h3 className="font-semibold text-lg mb-2">Who We Serve</h3>
                <p className="text-muted-foreground">
                    ⭐ Students, ⭐ Professionals, ⭐ Small Businesses, ⭐ General Users - our platform is built to help anyone make fast and accurate decisions.
                </p>
            </Card>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <Check className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span><strong>Accuracy:</strong> Every calculation must be correct. This is our highest priority.</span>
            </li>
             <li className="flex items-start">
              <Check className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span><strong>Clarity:</strong> Information should be simple, understandable, and helpful.</span>
            </li>
             <li className="flex items-start">
              <Check className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span><strong>Transparency:</strong> We clearly explain formulas, logic, and assumptions.</span>
            </li>
             <li className="flex items-start">
              <Check className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span><strong>Speed:</strong> Tools should load instantly and give results without delay.</span>
            </li>
             <li className="flex items-start">
              <Check className="text-primary mr-3 mt-1 h-5 w-5 flex-shrink-0" />
              <span><strong>Accessibility:</strong> Knowledge must be available to everyone — free and without barriers.</span>
            </li>
          </ul>
        </Card>
         
        <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
            <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
               Prime Metric is more than a website — it is a digital companion for anyone who wants clarity, accuracy, and knowledge. Our mission is to simplify calculations and empower users with information they can rely on. As we continue to grow, we remain committed to accuracy, transparency, and user experience. With 100+ calculators and tools, Prime Metric aims to be the most trusted platform for educational calculations worldwide.
            </p>
            <h3 className="text-xl font-semibold mb-4">Get in Touch With Us</h3>
            <p className="text-muted-foreground mb-4">
                If you have suggestions, feedback, or want to report an issue, you can contact us anytime.
            </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
                <Button>Contact Page</Button>
            </Link>
            <a href="mailto:help@primemetric.online">
                <Button variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    help@primemetric.online
                </Button>
            </a>
          </div>
        </div>
    </LegalPageLayout>
  );
};

export default AboutPage;
