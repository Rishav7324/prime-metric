
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { healthCalculators } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health & Fitness Calculators - BMI, Calorie, TDEE & More",
  description: "Track your health metrics and fitness goals. Free online calculators for BMI, calorie needs, body fat, ideal weight, and more health metrics.",
  keywords: "health calculator, fitness calculator, BMI calculator, calorie calculator, TDEE calculator, body fat calculator, ideal weight",
};

const HealthCalculatorsPage = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent">
            Health & Fitness Calculators
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your health metrics and fitness goals
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthCalculators.map((calc, index) => {
                const Icon = calc.icon;
                return (
                    <Link
                        key={calc.id}
                        href={calc.path}
                        className="group"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <Card className="glass-card p-6 h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCalculatorsPage;
