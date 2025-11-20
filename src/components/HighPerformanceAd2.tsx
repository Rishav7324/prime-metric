'use client';

import { useEffect, useRef } from 'react';

const HighPerformanceAd2 = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.children.length === 0) {
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
  }, []);

  return <div ref={adRef} style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }} />;
};

export default HighPerformanceAd2;
