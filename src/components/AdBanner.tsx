'use client';

import { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  // Generate a unique key for each ad instance to avoid conflicts.
  const adKey = useRef(Math.random().toString());

  useEffect(() => {
    // This effect runs once per component mount.
    const insElement = adRef.current?.querySelector('ins.adsbygoogle');

    if (insElement) {
      // AdSense adds a 'data-ad-status' attribute when it processes an ad slot.
      // We check this to prevent trying to load an ad into a slot that's already
      // been filled or is in progress.
      if (insElement.getAttribute('data-ad-status') === 'filled') {
        return;
      }
      
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  return (
    <div ref={adRef} className="flex justify-center my-8 min-h-[100px]">
      <ins
        key={adKey.current} // Use the unique key here.
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z"
        data-ad-client="ca-pub-6512188660075861"
        data-ad-slot="7139426902"
      ></ins>
    </div>
  );
};

export default AdBanner;