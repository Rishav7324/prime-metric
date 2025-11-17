
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calculator, DollarSign, Heart, GraduationCap, Repeat, TrendingUp, Menu, FileText, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Head from "next/head";

const Index = () => {
  const categories = [
    {
      title: "Financial Calculators",
      icon: DollarSign,
      description: "Loans, EMI, Investment, Tax & More",
      gradient: "from-blue-500 to-purple-600",
      calculators: ["Loan Calculator", "EMI Calculator", "Currency Converter", "ROI Calculator"],
      path: "#"
    },
    {
      title: "Health & Fitness",
      icon: Heart,
      description: "BMI, BMR, Calories & Body Metrics",
      gradient: "from-pink-500 to-rose-600",
      calculators: ["BMI Calculator", "BMR Calculator", "Calorie Calculator", "Body Fat %"],
      path: "#"
    },
    {
      title: "Math Calculators",
      icon: GraduationCap,
      description: "Algebra, Geometry, Statistics & More",
      gradient: "from-emerald-500 to-teal-600",
      calculators: ["Scientific Calculator", "Percentage", "Fraction", "Pythagorean"],
      path: "#"
    },
    {
      title: "Other Calculators",
      icon: Repeat,
      description: "Converters, Utilities & Daily Tools",
      gradient: "from-orange-500 to-amber-600",
      calculators: ["Date Calculator", "Age Calculator", "Time Zone", "Dice Roller"],
      path: "#"
    },
    {
      title: "Image Tools",
      icon: ImageIcon,
      description: "Crop, Resize, Compress & Convert Images",
      gradient: "from-cyan-500 to-blue-600",
      calculators: ["Crop Image", "Resize Image", "Compress Image", "Convert Image"],
      path: "/tool/crop-image"
    },
    {
      title: "Text & Developer Tools",
      icon: FileText,
      description: "Text Formatting, Encoding & Generation",
      gradient: "from-indigo-500 to-blue-600",
      calculators: ["Word Counter", "Case Converter", "JSON Formatter", "QR Code"],
      path: "/tool/word-counter"
    },
    {
      title: "All Calculators",
      icon: TrendingUp,
      description: "Browse Complete Collection",
      gradient: "from-violet-500 to-purple-600",
      calculators: ["100+ Calculators", "Financial", "Health", "Math & More"],
      path: "#tools"
    }
  ];

  const featuredCalculators = [
    { name: "BMI Calculator", path: "#", uses: "2.4M+" },
    { name: "Loan Calculator", path: "#", uses: "1.8M+" },
    { name: "Currency Converter", path: "#", uses: "3.1M+" },
    { name: "Discount Calculator", path: "#", uses: "1.2M+" },
  ];

  return (
    <>
      <Head> 
        <title>Prime Metric - Free Online Calculators & Tools</title>
        <meta name="description" content="Access 100+ free online calculators for financial planning, health & fitness, math problems, and everyday calculations. Fast, accurate, and easy to use." />
        <meta name="keywords" content="calculator, online calculator, free calculator, BMI calculator, loan calculator, mortgage calculator, math calculator, percentage calculator" />
        <link rel="canonical" href="https://primemetric.online" />
      </Head>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <header className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/20 to-background opacity-50 animated-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight font-headline">
              All Your Calculators
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                In One Place
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto">
              From financial planning to health metrics, unit conversions to daily utilities - 
              powerful calculators with instant results and detailed explanations.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Search calculators... (e.g., BMI, Loan, Currency)" 
                  className="pl-12 h-14 text-lg glass-card border-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Featured Quick Access */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {featuredCalculators.map((calc) => (
                (<Link key={calc.name} href={calc.path}>
                  <Button variant="outline" className="glass-card border-primary/30 hover:border-primary group">
                    {calc.name}
                    <span className="ml-2 text-xs text-muted-foreground group-hover:text-primary">
                      {calc.uses}
                    </span>
                  </Button>
                </Link>)
              ))}
            </div>
          </div>
        </div>
      </header>

      <main>

        {/* Categories Grid */}
        <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Explore by Category</h2>
            <p className="text-xl text-muted-foreground">Choose your calculator category</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                (<Link
                  key={category.title}
                  href={category.path}
                  className="group"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="glass-card p-8 rounded-2xl hover:shadow-glow transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors font-headline">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.calculators.slice(0, 3).map((calc) => (
                        <span key={calc} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {calc}
                        </span>
                      ))}
                      <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                        +More
                      </span>
                    </div>
                  </div>
                </Link>)
              );
            })}
          </div>
        </div>
        </section>

        {/* Features Section */}
        <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Why Choose PrimeMetric?</h2>
            <p className="text-xl text-muted-foreground">Powerful features for accurate calculations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Instant Results",
                description: "Get accurate calculations in milliseconds with real-time updates",
                icon: "⚡"
              },
              {
                title: "Detailed Explanations",
                description: "Understand the formulas and logic behind every calculation",
                icon: "📚"
              },
              {
                title: "Visual Charts",
                description: "Interactive graphs and charts to visualize your results",
                icon: "📊"
              },
              {
                title: "Mobile Friendly",
                description: "Perfect experience on any device, anywhere, anytime",
                icon: "📱"
              },
              {
                title: "No Sign-up Required",
                description: "Start calculating immediately without creating an account",
                icon: "🚀"
              },
              {
                title: "100% Free",
                description: "All calculators and converters completely free to use",
                icon: "💎"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title} 
                className="glass-card p-6 rounded-xl text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-card">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-headline">
              Ready to Calculate?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join millions of users who trust PrimeMetric for their daily calculations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#tools">
                <Button size="lg" className="gradient-button text-lg px-8">
                  Browse All Calculators
                </Button>
              </Link>
              <Link href="/tool/color-picker">
                <Button size="lg" variant="outline" className="glass-card border-primary/30 text-lg px-8">
                  View Image Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </section>
      </main>
      </div>
    </>
  );
};

export default Index;

    