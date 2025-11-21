'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const AdBanner = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1,    // Trigger when 10% of the banner is visible
  });

  useEffect(() => {
    if (inView) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="flex justify-center my-8 min-h-[100px]">
      <ins
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
