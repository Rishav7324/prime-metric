'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';

export function HelpfulVotes({ pagePath }: { pagePath?: string }) {
  const pathname = usePathname();
  const path = pagePath || pathname || '/';
  const [voted, setVoted] = useState<string | null>(null);
  const firestore = useFirestore();

  useEffect(() => {
    try {
      setVoted(localStorage.getItem(`vote:${path}`));
    } catch {
      /* storage unavailable */
    }
  }, [path]);

  const vote = (value: 'yes' | 'no') => {
    if (voted || !firestore) return;
    addDocumentNonBlocking(collection(firestore, 'feedback'), {
      pagePath: path,
      vote: value,
      createdAt: serverTimestamp(),
    });
    try {
      localStorage.setItem(`vote:${path}`, value);
    } catch {
      /* storage unavailable */
    }
    setVoted(value);
  };

  return (
    <div className="no-print bg-white border border-neutral-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
      <p className="text-[13px] font-medium text-black">
        {voted ? 'Thanks for your feedback!' : 'Was this calculator helpful?'}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => vote('yes')}
          disabled={!!voted}
          aria-label="Yes, helpful"
          className={cn(
            'flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-medium transition-colors',
            voted === 'yes'
              ? 'bg-[#F2765E] text-white border-[#F2765E]'
              : 'bg-white text-black border-neutral-200 hover:border-[#F2765E] hover:text-[#F2765E] disabled:opacity-50'
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" /> Yes
        </button>
        <button
          onClick={() => vote('no')}
          disabled={!!voted}
          aria-label="No, not helpful"
          className={cn(
            'flex items-center gap-1.5 h-8 px-3 rounded-lg border text-xs font-medium transition-colors',
            voted === 'no'
              ? 'bg-black text-white border-black'
              : 'bg-white text-black border-neutral-200 hover:border-black disabled:opacity-50'
          )}
        >
          <ThumbsDown className="h-3.5 w-3.5" /> No
        </button>
      </div>
    </div>
  );
}
