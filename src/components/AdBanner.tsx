'use client';

import { useEffect, useRef, useState } from 'react';

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => {
      if (!adRef.current) return;
      const insElement = adRef.current.querySelector('ins.adsbygoogle');
      if (insElement && insElement.getAttribute('data-ad-status') !== 'filled') {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          /* ads blocked - will collapse below */
        }
      }
    }, 300);

    // Collapse completely if ad never fills (no empty bands)
    const t2 = setTimeout(() => {
      const insElement = adRef.current?.querySelector('ins.adsbygoogle');
      if (!insElement || insElement.getAttribute('data-ad-status') !== 'filled') {
        setVisible(false);
      }
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={adRef} className="no-print flex justify-center my-3 w-full mx-auto max-w-6xl px-4" aria-hidden="true">
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
