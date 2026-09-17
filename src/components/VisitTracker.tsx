'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function VisitTracker() {
  const path = usePathname();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('recent-tools');
      let arr: { path: string; t: number }[] = raw ? JSON.parse(raw) : [];
      arr = [{ path, t: Date.now() }, ...arr.filter((x) => x.path !== path)].slice(0, 12);
      localStorage.setItem('recent-tools', JSON.stringify(arr));
    } catch {
      /* storage unavailable */
    }
  }, [path]);

  return null;
}
