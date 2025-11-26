
'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import { categories } from "@/lib/data";
import React, { useState } from 'react';
import AdBanner from "@/components/AdBanner";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/all-calculators?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const featuredCalculators = [
    { name: "BMI Calculator", path: "/health-calculators/bmi-calculator", uses: "2.4M+" },
    { name: "Loan Calculator", path: "/financial-calculators/loan-calculator", uses: "1.8M+" },
    { name: "Currency Converter", path: "/financial-calculators/currency-converter", uses: "3.1M+" },
    { name: "Discount Calculator", path: "/financial-calculators/discount-calculator", uses: "1.2M+" },
  ];

  const features = [
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
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background opacity-50 animated-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent)]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight font-headline">
                All Your Calculators
                <span className="block bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                  In One Place
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto">
                From financial planning to health metrics, unit conversions to daily utilities - 
                powerful calculators with instant results and detailed explanations.
              </p>
              
              <div className="max-w-2xl mx-auto mt-8">
                <form onSubmit={handleSearch}>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input 
                      placeholder="Search calculators... (e.g., BMI, Loan, Currency)" 
                      className="pl-12 h-14 text-lg glass-card border-primary/30 focus:border-primary transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-4">
                {featuredCalculators.map((calc) => (
                  <Link key={calc.name} href={calc.path}>
                    <Button variant="outline" className="glass-card border-primary/30 hover:border-primary group">
                      {calc.name}
                      <span className="ml-2 text-xs text-muted-foreground group-hover:text-primary">
                        {calc.uses}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main>

        <section className="py-20 bg-primary/5">
            <div className="container mx-auto px-4 max-w-4xl space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Prime Metric — Fast & Accurate Calculators and Tools in One Place</h2>
                <p className="mt-4 text-muted-foreground">Prime Metric is your one-stop destination for calculations, planning, and informed decision-making. With over 100+ premium calculators and smart digital tools, our platform simplifies everything from finance to health to business analytics — without confusion or complex formulas. Whether you’re a student, a professional, a business owner, or someone curious about everyday calculations, Prime Metric gives you instant, reliable results backed by educational explanations.</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-headline mb-4">Why Thousands of Users Trust Prime Metric</h3>
                <p className="text-muted-foreground">Every tool on Prime Metric is designed to be fast, accurate, and easy to understand. We do not just show the numbers — we explain what they mean. Each calculator provides formulas, step-by-step breakdowns, examples, use cases, tips, and helpful FAQs so you can understand the logic behind every result.</p>
                <p className="text-muted-foreground mt-2">Prime Metric solves a common problem — most online calculators only show answers, not explanations. Here, we focus on clarity and transparency.</p>
              </div>

              <Card className="p-6">
                <h3 className="text-2xl font-bold font-headline mb-4">Categories We Cover</h3>
                <p className="text-muted-foreground mb-6">Our calculators span across a wide range of real-world needs, including:</p>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start"><span className="mr-2">🔹</span><div><strong>Finance Calculators:</strong> EMI, Loan interest, GST & tax, Investment returns, Compound interest.</div></li>
                    <li className="flex items-start"><span className="mr-2">🔹</span><div><strong>Health & Fitness Calculators:</strong> BMI, Calorie, Body fat and fitness tools.</div></li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-start"><span className="mr-2">🔹</span><div><strong>Business Tools:</strong> Invoice generator, Profit & margin, Salary estimator.</div></li>
                    <li className="flex items-start"><span className="mr-2">🔹</span><div><strong>Engineering & Technical Tools:</strong> Physics, Electrical, Unit conversions, Mathematical functions.</div></li>
                    <li className="flex items-start"><span className="mr-2">🔹</span><div><strong>Personal Utilities:</strong> Age, Date difference, Time & productivity tools.</div></li>
                  </ul>
                </div>
              </Card>

              <div>
                <h3 className="text-2xl font-bold font-headline mb-4">How Prime Metric Helps You Make Better Decisions</h3>
                <p className="text-muted-foreground mb-4">Our calculators are more than fast — they are informative. With every tool, you get:</p>
                <ul className="space-y-2 text-muted-foreground">
                    <li>✔ Clear input fields & Instant accurate results</li>
                    <li>✔ Formula explanation & Practical examples</li>
                    <li>✔ Tips & best practices</li>
                    <li>✔ Frequently asked questions</li>
                </ul>
                <p className="text-muted-foreground mt-4">This ensures you not only get the answer — you also understand the answer.</p>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold font-headline mb-2">Start Exploring Prime Metric</h3>
                <p className="text-muted-foreground mb-4">If you are ready to save time and understand important calculations with clarity, start exploring our 100+ calculators today.</p>
                <Link href="/all-calculators">
                  <Button>Explore Tools <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-8">Need Help or Have Suggestions? We love hearing from users. Contact us anytime: <a href="mailto:help@primemetric.online" className="text-primary underline">help@primemetric.online</a></p>
              </div>
            </div>
        </section>

          {/* Categories Grid */}
          <section className="py-20 relative">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Explore by Category</h2>
                <p className="text-xl text-muted-foreground">Choose your calculator category</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <React.Fragment key={category.title}>
                      <Link
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
                            <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground border border-secondary/20">
                              +More
                            </span>
                          </div>
                        </div>
                      </Link>
                      {index % 2 !== 0 && index < categories.length -1 && <div className="lg:hidden"><AdBanner/></div>}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </section>

          <AdBanner/>

          {/* Features Section */}
          <section className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 font-headline">Why Choose PrimeMetric?</h2>
                <p className="text-xl text-muted-foreground">Powerful features for accurate calculations</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {features.map((feature, index) => {
                   return (
                    <div 
                      key={feature.title} 
                      className="glass-card p-6 rounded-xl text-center"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <AdBanner/>

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
                  <Link href="/all-calculators">
                    <Button size="lg" className="gradient-button text-lg px-8">
                      Browse All Calculators
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

    