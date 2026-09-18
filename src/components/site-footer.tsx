
'use client';

import { Calculator } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase';

export function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const firestore = useFirestore();

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firestore) return;

    const subscribersCollection = collection(firestore, "subscribers");
    addDocumentNonBlocking(subscribersCollection, {
      email: email,
      subscribedAt: serverTimestamp(),
      isVerified: false, // You can implement an email verification flow later
    });

    toast({
      title: "Subscribed!",
      description: "Thanks for subscribing to our newsletter.",
    });
    setEmail('');
  };
  
  return (
    <footer className="border-t border-neutral-200 bg-white py-6 mt-8" role="contentinfo">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="col-span-2 sm:col-span-1">
              <h4 className="font-bold text-base mb-1.5 text-black">PrimeMetric</h4>
              <p className="text-neutral-600 text-xs mb-3">
                Free calculators for finance, health, math & daily needs. Fast, accurate, no sign-up.
              </p>
              <form onSubmit={handleSubscription} className="space-y-1.5">
                <p className="text-xs font-medium text-black">Subscribe for updates</p>
                <div className="flex max-w-xs">
                  <Input 
                    type="email" 
                    placeholder="Your email" 
                    className="rounded-r-none h-9 text-sm bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="rounded-l-none h-9 text-sm">Subscribe</Button>
                </div>
              </form>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 col-span-2 sm:col-span-1">
            <div>
              <h4 className="font-bold text-xs mb-2.5 text-black uppercase tracking-wide">Calculators</h4>
              <ul className="space-y-1.5 text-[13px] text-neutral-600">
                <li><Link href="/financial-calculators" className="hover:text-[#F2765E] transition-colors">Financial</Link></li>
                <li><Link href="/health-calculators" className="hover:text-[#F2765E] transition-colors">Health</Link></li>
                <li><Link href="/math-calculators" className="hover:text-[#F2765E] transition-colors">Math</Link></li>
                <li><Link href="/other-calculators" className="hover:text-[#F2765E] transition-colors">Other</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-2.5 text-black uppercase tracking-wide">Tools</h4>
              <ul className="space-y-1.5 text-[13px] text-neutral-600">
                <li><Link href="/tool/image-tools" className="hover:text-[#F2765E] transition-colors">Image Tools</Link></li>
                <li><Link href="/all-calculators" className="hover:text-[#F2765E] transition-colors">All Calculators</Link></li>
                <li><Link href="/saved" className="hover:text-[#F2765E] transition-colors">Saved</Link></li>
                <li><Link href="/financial-calculators/currency-converter" className="hover:text-[#F2765E] transition-colors">Currency Converter</Link></li>
                <li><Link href="/health-calculators/bmi-calculator" className="hover:text-[#F2765E] transition-colors">BMI Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xs mb-2.5 text-black uppercase tracking-wide">Company</h4>
              <ul className="space-y-1.5 text-[13px] text-neutral-600">
                <li><Link href="/about" className="hover:text-[#F2765E] transition-colors">About Us</Link></li>
                <li><Link href="/authors/prime-metric" className="hover:text-[#F2765E] transition-colors">Our Team</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-[#F2765E] transition-colors">Editorial Policy</Link></li>
                <li><Link href="/blog" className="hover:text-[#F2765E] transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-[#F2765E] transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-[#F2765E] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-[#F2765E] transition-colors">Terms of Service</Link></li>
                 <li><Link href="/disclaimer" className="hover:text-[#F2765E] transition-colors">Disclaimer</Link></li>
                <li><Link href="/cookie-policy" className="hover:text-[#F2765E] transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-4 text-center text-xs text-neutral-500">
            <p>© {currentYear} PrimeMetric. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
