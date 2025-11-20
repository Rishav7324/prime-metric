'use client';

import { useEffect, useRef } from 'react';

const HighPerformanceAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (adRef.current && adRef.current.children.length === 0) {
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
  }, []);

  return <div ref={adRef} style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }} />;
};

export default HighPerformanceAd;
