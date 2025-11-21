
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
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50 flex items-center justify-between flex-wrap gap-4">
      <p className="text-sm text-muted-foreground">
        This website uses cookies to enhance your experience. By continuing to use this site, you consent to our use of cookies. Read our{' '}
        <Link href="/cookie-policy" className="underline hover:text-primary">
          Cookie Policy
        </Link>
        .
      </p>
      <Button onClick={handleAccept} size="sm">
        Accept
      </Button>
    </div>
  );
};

export default CookieConsentBanner;
