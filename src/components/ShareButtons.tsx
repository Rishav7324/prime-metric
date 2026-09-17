'use client';

import { useState } from 'react';
import { Link2, Check, Printer, MessageCircle } from 'lucide-react';

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${title} — Free calculator: ${url}`)}`;

  return (
    <span className="no-print inline-flex items-center gap-1.5 flex-wrap justify-center">
      <button
        onClick={copy}
        className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-neutral-200 bg-white text-[11px] font-medium text-neutral-600 hover:border-[#F2765E] hover:text-[#F2765E] transition-colors"
        aria-label="Copy link to this calculator"
      >
        {copied ? <Check className="h-3 w-3" /> : <Link2 className="h-3 w-3" />}
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-neutral-200 bg-white text-[11px] font-medium text-neutral-600 hover:border-[#25D366] hover:text-[#128C4B] transition-colors"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-3 w-3" /> WhatsApp
      </a>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1 h-7 px-2.5 rounded-full border border-neutral-200 bg-white text-[11px] font-medium text-neutral-600 hover:border-black hover:text-black transition-colors"
        aria-label="Print or save as PDF"
      >
        <Printer className="h-3 w-3" /> Print / PDF
      </button>
    </span>
  );
}
