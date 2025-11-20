
import LegalPageLayout from "@/components/LegalPageLayout";
import { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calculator, Heart, TrendingUp, Users } from "lucide-react";
import AdsterraBanner from '@/components/AdsterraBanner';

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
        <p className="text-muted-foreground text-lg text-center mb-12">
            Your trusted source for accurate and easy-to-use calculators
        </p>
        
        <AdsterraBanner />

        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            We are dedicated to providing free, accurate, and user-friendly calculators and tools 
            that help people make informed decisions in their daily lives. Whether you're planning 
            your finances, monitoring your health, or solving mathematical problems, we're here to help.
          </p>
          <p className="text-muted-foreground mb-4">
            Our platform offers a comprehensive collection of calculators across multiple categories 
            including financial planning, health and fitness, mathematics, and everyday utilities.
          </p>
          <p className="text-muted-foreground">
            Founded with the vision of making complex calculations accessible to everyone, Prime Metric has grown 
            into a trusted resource serving thousands of users daily. We believe that everyone deserves access 
            to reliable calculation tools without barriers, which is why all our services remain completely free 
            and require no registration or downloads.
          </p>
        </Card>

        <Card className="p-8 bg-card/80 backdrop-blur mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Financial Calculators</h3>
              <p>From mortgage and loan calculators to investment and retirement planning tools, our financial 
              calculators help you make smart money decisions. Calculate EMIs, compare loan options, plan your 
              savings, and understand the long-term impact of financial choices.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Health & Fitness Tools</h3>
              <p>Monitor your health journey with BMI, BMR, calorie, and macro calculators. Whether you're 
              tracking weight loss progress, planning nutrition, or calculating daily caloric needs, our health 
              tools provide scientifically-backed insights for your wellness goals.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Mathematical Calculators</h3>
              <p>Solve complex mathematical problems with ease using our scientific, algebraic, and statistical 
              calculators. From basic arithmetic to advanced calculus, trigonometry, and geometry, we cover 
              all your mathematical calculation needs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-2">Everyday Utilities</h3>
              <p>Simplify daily tasks with converters, date calculators, grade calculators, and more. Our 
              practical tools help with unit conversions, time zone calculations, discount calculations, 
              and countless other everyday needs.</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <Calculator className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">100+ Calculators</h3>
                <p className="text-muted-foreground">
                  A comprehensive suite of calculators covering financial, health, math, 
                  and everyday calculations.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <Heart className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">User-Focused</h3>
                <p className="text-muted-foreground">
                  Designed with simplicity and accuracy in mind, making complex calculations 
                  accessible to everyone.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <TrendingUp className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Always Improving</h3>
                <p className="text-muted-foreground">
                  We continuously update and add new calculators based on user feedback 
                  and emerging needs.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-card/80 backdrop-blur">
            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                <p className="text-muted-foreground">
                  Built for users by listening to your needs and incorporating your valuable suggestions.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8 bg-card/80 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3 text-muted-foreground mb-6">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>100% free to use - no hidden fees or subscriptions</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Privacy-focused - calculations done locally in your browser</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Mobile-friendly - works seamlessly on all devices</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>No registration required - instant access to all tools</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Regular updates with new calculators and features</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Detailed explanations and formulas for educational purposes</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>Fast and accurate calculations with instant results</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>User-friendly interface designed for everyone</span>
            </li>
          </ul>
          <p className="text-muted-foreground mt-4">
            We understand that making calculations should be simple, fast, and accessible. That's why we've 
            invested thousands of hours into creating an intuitive platform that serves both beginners and 
            experts. Our commitment to quality, accuracy, and user experience sets us apart from other 
            calculator websites. We don't just provide numbers - we provide understanding through detailed 
            explanations, formulas, and contextual information that helps you learn while you calculate.
          </p>
        </Card>
         
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Have questions or suggestions?
          </p>
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
    </LegalPageLayout>
  );
};

export default AboutPage;
