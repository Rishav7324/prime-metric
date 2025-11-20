'use client';

import { useEffect, useRef, useState } from 'react';

const HighPerformanceAd = () => {
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
        rootMargin: '30px', // Load the ad when it's 30px away from the viewport
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
        		'key' : 'a598d172134d0e96f5b3abb7aee0c4fc',
            		'format' : 'iframe',
                		'height' : 250,
                    		'width' : 300,
                        		'params' : {}
                            	};
                              
      `;

      const adScript = document.createElement('script');
      adScript.type = 'text/javascript';
      adScript.src = '//www.highperformanceformat.com/a598d172134d0e96f5b3abb7aee0c4fc/invoke.js';

      scriptContainer.appendChild(configScript);
      scriptContainer.appendChild(adScript);
      adRef.current.appendChild(scriptContainer);
    }
  }, [isIntersecting]);

  return <div ref={adRef} style={{ display: 'flex', justifyContent: 'center', minHeight: '250px' }} />;
};

export default HighPerformanceAd;
