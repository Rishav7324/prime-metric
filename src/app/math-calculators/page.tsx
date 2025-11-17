

import Link from "next/link";
import { Calculator as CalcIcon, ArrowLeft, Binary } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mathCalculators } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Math Calculators - Scientific, Algebra, Geometry & More",
    description: "Advanced mathematical tools and calculators. Free online calculators for percentage, scientific calculations, geometry, fractions, and more.",
    keywords: "math calculator, scientific calculator, percentage calculator, fraction calculator, geometry calculator, algebra calculator",
    alternates: {
        canonical: "https://primemetric.online/math-calculators",
    }
};

const MathCalculators = () => {
  return (
    <>
      <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass-card border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <CalcIcon className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Prime Metric
              </span>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="glass-card border-primary/30">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Binary className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            Math Calculators
          </h1>
          <p className="text-xl text-muted-foreground">
            Advanced mathematical tools and calculators
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mathCalculators.map((calc, index) => {
                const Icon = calc.icon || Binary;
                return (
              <Link
                key={calc.id}
                href={calc.path}
                className="group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Card className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {calc.description}
                      </p>
                      {!calc.implemented && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            )})}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MathCalculators;
