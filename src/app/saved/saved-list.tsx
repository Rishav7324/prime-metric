'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookmarkX, ArrowRight, Trash2 } from 'lucide-react';
import { useAuth, useUser, useFirestore } from '@/firebase';
import { signInAnonymously } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { allCalculators } from '@/lib/data';
import { Button } from '@/components/ui/button';

type SavedItem = { id: string; path: string; title: string };

export function SavedList() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [items, setItems] = useState<SavedItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (isUserLoading || !firestore || !auth) return;
      try {
        let uid = user?.uid;
        if (!uid) {
          const cred = await signInAnonymously(auth);
          uid = cred.user.uid;
        }
        const q = query(collection(firestore, 'saved'), where('uid', '==', uid));
        const snap = await getDocs(q);
        if (!cancelled) {
          setItems(snap.docs.map((d) => ({ id: d.id, path: d.data().path as string, title: d.data().title as string })));
        }
      } catch {
        if (!cancelled) setItems([]);
      }
    })();
    return () => { cancelled = true; };
  }, [firestore, auth, user, isUserLoading]);

  const remove = async (id: string, path: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'saved', id));
      try { localStorage.removeItem(`saved:${path}`); } catch {}
      setItems((prev) => (prev ? prev.filter((x) => x.id !== id) : prev));
    } catch {
      /* ignore */
    }
  };

  if (items === null) {
    return <p className="text-center text-sm text-neutral-500 py-10">Loading your saved tools...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10 border border-dashed border-neutral-300 rounded-2xl">
        <BookmarkX className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
        <p className="text-sm font-medium text-black">Nothing saved yet</p>
        <p className="text-xs text-neutral-500 mt-1 mb-4">Tap the Save button on any calculator.</p>
        <Link href="/all-calculators">
          <Button size="sm">Browse Calculators</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {items.map((item) => {
        const tool = allCalculators.find((c) => c.path === item.path);
        const Icon = tool?.icon;
        return (
          <div key={item.id} className="tool-card flex items-center gap-3">
            <Link href={item.path} className="flex items-center gap-3 flex-1 min-w-0">
              {Icon && (
                <div className="w-10 h-10 rounded-lg bg-[#FFF5F2] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#F2765E]" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-black leading-snug">{item.title}</h3>
                <p className="text-xs text-neutral-500 line-clamp-1 flex items-center gap-1">
                  Open <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </Link>
            <button
              onClick={() => remove(item.id, item.path)}
              aria-label={`Remove ${item.title}`}
              className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
