"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Landmark, TrendingUp, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FloatingCardProps = {
  icon: LucideIcon;
  text: string;
  className?: string;
  animationDelay?: string;
};

const FloatingCard = ({ icon: Icon, text, className, animationDelay }: FloatingCardProps) => (
  <div
    className={`glass-card absolute flex items-center gap-2 p-3 sm:p-4 animate-float rounded-2xl ${className}`}
    style={{ animationDelay }}
  >
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
    <span className="text-xs sm:text-sm font-medium">{text}</span>
  </div>
);

export function Hero() {
  return (
    <section className="relative w-full h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" style={{ backgroundSize: '30px 30px' }} />

      <FloatingCard icon={Calculator} text="Loan Payment" className="top-[10%] left-[5%] md:left-[10%]" animationDelay="0s" />
      <FloatingCard icon={Landmark} text="Mortgage" className="top-[30%] right-[8%] md:right-[15%]" animationDelay="1s" />
      <FloatingCard icon={TrendingUp} text="Investment ROI" className="bottom-[15%] left-[10%] md:left-[20%]" animationDelay="2s" />
      <FloatingCard icon={Wallet} text="Savings Goal" className="bottom-[12%] right-[5%] md:right-[25%]" animationDelay="3s" />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="gradient-text">Precision</span> Calculators,
          <br />
          Crystal-Clear Insights.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/80 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Welcome to Prime Metric. 100+ meticulously crafted calculators and educational tools for financial clarity in a complex world.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          <a href="#tools">
            <Button size="lg" className="gradient-button rounded-full text-base px-8 py-6">
              Explore Tools <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <Button size="lg" variant="outline" className="rounded-full bg-transparent text-base px-8 py-6 border-2">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
