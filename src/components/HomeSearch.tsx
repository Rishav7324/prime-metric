'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function HomeSearch() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const go = (e: React.FormEvent) => {
    e.preventDefault();
    const q = term.trim();
    router.push(`/all-calculators${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <form onSubmit={go} role="search" className="max-w-xl mx-auto mt-5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <Input
          name="q"
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Try BMI, EMI, SIP, Percentage..."
          className="pl-10 pr-24 h-11 text-sm bg-white border-neutral-200 focus:border-[#F2765E] rounded-xl shadow-sm"
          aria-label="Search calculators"
        />
        <Button type="submit" size="sm" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-4 text-[13px]">
          Search
        </Button>
      </div>
    </form>
  );
}
