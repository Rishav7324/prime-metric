'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!adRef.current || initialized.current) {
      return;
    }

    // A small timeout to ensure the container has been rendered and has a width
    const timeoutId = setTimeout(() => {
      if (!adRef.current) return;
      
      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (insElement && insElement.getAttribute('data-ad-status') !== 'filled') {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized.current = true; // Mark as initialized
        } catch (err) {
          console.error("AdSense error:", err);
        }
      }
    }, 100); // 100ms delay should be sufficient

    return () => clearTimeout(timeoutId);

  }, []);

  return (
    <div ref={adRef} className="flex justify-center my-8 min-h-[100px] w-full">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z"
        data-ad-client="ca-pub-6512188660075861"
        data-ad-slot="7139426902"
      ></ins>
    </div>
  );
};

export default AdBanner;
