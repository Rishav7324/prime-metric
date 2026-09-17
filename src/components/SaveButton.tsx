'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

function slugOf(path: string) {
  return path.replace(/^\//, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}

export function SaveButton({ path, title }: { path: string; title: string }) {
  const auth = useAuth();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      setSaved(localStorage.getItem(`saved:${path}`) === '1');
    } catch {
      /* storage unavailable */
    }
  }, [path]);

  const toggle = async () => {
    if (busy || !firestore || !auth) return;
    setBusy(true);
    try {
      let uid = user?.uid;
      if (!uid) {
        const cred = await signInAnonymously(auth);
        uid = cred.user.uid;
      }
      const id = `${uid}__${slugOf(path)}`;
      if (saved) {
        await deleteDoc(doc(firestore, 'saved', id));
        try { localStorage.removeItem(`saved:${path}`); } catch {}
        setSaved(false);
        toast({ title: 'Removed', description: 'Removed from your saved tools.' });
      } else {
        await setDoc(doc(firestore, 'saved', id), {
          uid,
          path,
          title,
          createdAt: serverTimestamp(),
        });
        try { localStorage.setItem(`saved:${path}`, '1'); } catch {}
        setSaved(true);
        toast({ title: 'Saved', description: 'Find it anytime on your Saved page.' });
      }
    } catch {
      toast({ variant: 'destructive', title: 'Could not save', description: 'Please try again.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={cn(
        'no-print inline-flex items-center gap-1 h-7 px-2.5 rounded-full border text-[11px] font-medium transition-colors',
        saved
          ? 'bg-[#F2765E] text-white border-[#F2765E]'
          : 'bg-white text-neutral-600 border-neutral-200 hover:border-[#F2765E] hover:text-[#F2765E]'
      )}
      aria-label={saved ? 'Remove from saved' : 'Save this calculator'}
    >
      {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : saved ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}
