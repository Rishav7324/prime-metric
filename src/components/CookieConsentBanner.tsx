
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
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 flex items-center justify-between flex-wrap gap-3 shadow-lg">
      <p className="text-xs text-neutral-600">
        We use cookies to improve your experience and to show personalized ads via Google AdSense. Choose Accept, or Reject to continue with limited ads. See our{' '}
        <Link href="/cookie-policy" className="underline text-[#F2765E]">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <Button onClick={handleReject} variant="outline" size="sm" className="h-8 text-xs">
          Reject
        </Button>
        <Button onClick={handleAccept} size="sm" className="h-8 text-xs">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
