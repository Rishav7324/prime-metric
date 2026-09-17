import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SavedList } from "./saved-list";

export const metadata: Metadata = {
  title: "Saved Calculators | Prime Metric",
  description: "Your saved calculators in one place. Bookmark tools to find them instantly next time.",
  alternates: { canonical: "https://primemetric.online/saved" },
  robots: { index: false, follow: true },
};

export default function SavedPage() {
  return (
    <main className="bg-white text-black">
      <div className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-neutral-500 mb-3">
          <Link href="/" className="hover:text-[#F2765E]">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-black font-medium">Saved</span>
        </nav>
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Saved Calculators</h1>
          <p className="mt-1.5 text-sm text-neutral-600">Tap Save on any calculator to keep it here.</p>
        </div>
        <SavedList />
      </div>
    </main>
  );
}
