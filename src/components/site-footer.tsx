import { Calculator } from 'lucide-react';
import Link from 'next/link';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-primary/20 py-12 mt-20" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">PrimeMetric</h4>
              <p className="text-muted-foreground text-sm">
                Your complete calculator and converter platform for all daily needs.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Calculators</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/financial-calculators" className="hover:text-primary transition-colors">Financial</Link></li>
                <li><Link href="/health-calculators" className="hover:text-primary transition-colors">Health</Link></li>
                <li><Link href="/math-calculators" className="hover:text-primary transition-colors">Math</Link></li>
                <li><Link href="/other-calculators" className="hover:text-primary transition-colors">Other</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tool/color-picker" className="hover:text-primary transition-colors">Image Tools</Link></li>
                <li><Link href="/all-calculators" className="hover:text-primary transition-colors">All Calculators</Link></li>
                <li><Link href="/financial-calculators/currency-converter" className="hover:text-primary transition-colors">Currency Converter</Link></li>
                <li><Link href="/health-calculators/bmi-calculator" className="hover:text-primary transition-colors">BMI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary/20 pt-8 text-center text-sm text-muted-foreground">
            <p>© {currentYear} PrimeMetric. All rights reserved. Built with precision and care.</p>
          </div>
        </div>
      </footer>
  );
}
