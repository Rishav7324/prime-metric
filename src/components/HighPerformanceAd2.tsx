'use client';

import { useEffect, useRef, useState } from 'react';

const HighPerformanceAd2 = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '120px', // Load the ad when it's 200px away from the viewport
      }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isIntersecting && adRef.current && adRef.current.children.length === 0) {
      const scriptContainer = document.createElement('div');

      const configScript = document.createElement('script');
      configScript.type = 'text/javascript';
      configScript.innerHTML = `
        atOptions = {
          'key' : 'da36f35df68f4b66b7d48c85d11776a5',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;

      const adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = '//www.highperformanceformat.com/da36f35df68f4b66b7d48c85d11776a5/invoke.js';

      scriptContainer.appendChild(configScript);
      scriptContainer.appendChild(adScript);
      adRef.current.appendChild(scriptContainer);
    }
  }, [isIntersecting]);

  return <div ref={adRef} style={{ display: 'flex', justifyContent: 'center', minHeight: '50px' }} />;
};

export default HighPerformanceAd2;
