'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { History, ArrowRight } from 'lucide-react';
import { allCalculators } from '@/lib/data';

export function RecentlyViewed() {
  const [items, setItems] = useState<typeof allCalculators>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recent-tools');
      if (!raw) return;
      const arr: { path: string }[] = JSON.parse(raw);
      const tools = arr
        .map((x) => allCalculators.find((c) => c.path === x.path))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
        .filter((c) => c.path !== '/')
        .slice(0, 4);
      // Hide duplicates / show only if user has browsed tools
      const unique = tools.filter((t, i, a) => a.findIndex((x) => x.path === t.path) === i);
      if (unique.length >= 2) setItems(unique);
    } catch {
      /* storage unavailable */
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="py-7 bg-white border-t border-neutral-200/70" aria-labelledby="recent-heading">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-2 mb-3.5">
          <History className="w-4 h-4 text-[#F2765E]" />
          <h2 id="recent-heading" className="text-xl sm:text-2xl font-bold text-black">Recently Viewed</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {items.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.path} href={tool.path} className="group">
                <div className="tool-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0 group-hover:bg-[#F2765E] transition-colors">
                    <Icon className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-black group-hover:text-[#F2765E] leading-snug">{tool.name}</h3>
                    <p className="text-xs text-neutral-500 line-clamp-1">{tool.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#F2765E] shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
