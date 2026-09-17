
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 flex items-center justify-between flex-wrap gap-3 shadow-lg">
      <p className="text-xs text-neutral-600">
        We use cookies to improve your experience. By using this site, you accept our{' '}
        <Link href="/cookie-policy" className="underline text-[#F2765E]">
          Cookie Policy
        </Link>
        .
      </p>
      <Button onClick={handleAccept} size="sm" className="h-8 text-xs">
        Accept
      </Button>
    </div>
  );
};

export default CookieConsentBanner;
