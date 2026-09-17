'use client';

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CalculatorLayout from "@/components/CalculatorLayout";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";
import { Copy, RotateCcw } from "lucide-react";

type SlugOptions = {
  lowercase: boolean;
  removeAccents: boolean;
  stripStopWords: boolean;
};

type SlugResult = {
  slug: string;
  length: number;
  words: number;
};

const DEFAULT_TITLE = "Best Online Calculators 2026";
const DEFAULT_OPTIONS: SlugOptions = { lowercase: true, removeAccents: true, stripStopWords: true };

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "of", "to", "in", "on", "for",
  "with", "at", "by", "from", "as", "is", "are", "was", "were", "be",
]);

function generateSlug(title: string, opts: SlugOptions): SlugResult {
  let text = title.trim();
  if (opts.removeAccents) {
    text = text.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  if (opts.lowercase) {
    text = text.toLowerCase();
  }
  const rawWords = text.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  const words = opts.stripStopWords
    ? rawWords.filter((w) => !STOP_WORDS.has(w.toLowerCase()))
    : rawWords;
  const slug = words.join("-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return { slug, length: slug.length, words: words.length };
}

const SlugGeneratorClient = () => {
  // Pre-filled default so a result renders instantly on mount (no toast on init)
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [options, setOptions] = useState<SlugOptions>(DEFAULT_OPTIONS);
  const { toast } = useToast();

  // Live as-you-type: recomputes on every keystroke / option toggle
  const result = useMemo(() => generateSlug(title, options), [title, options]);

  const toggle = (key: keyof SlugOptions) => (checked: boolean | "indeterminate") => {
    setOptions((prev) => ({ ...prev, [key]: checked === true }));
  };

  const reset = () => {
    setTitle(DEFAULT_TITLE);
    setOptions(DEFAULT_OPTIONS);
  };

  const copyResult = async () => {
    if (!result.slug) {
      toast({
        variant: "destructive",
        title: "Nothing to Copy",
        description: "Please enter a title first — the slug is currently empty.",
      });
      return;
    }
    try {
      await navigator.clipboard.writeText(result.slug);
      toast({ title: "Copied", description: "Slug copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const optionRows: { key: keyof SlugOptions; label: string; hint: string }[] = [
    { key: "lowercase", label: "Lowercase", hint: "Convert everything to lowercase" },
    { key: "removeAccents", label: "Remove accents", hint: "café → cafe, naïve → naive" },
    { key: "stripStopWords", label: "Strip stop words", hint: "Drop a, the, of, and…" },
  ];

  return (
    <CalculatorLayout
      title="Slug Generator"
      description="Turn any title into a clean, SEO-friendly URL slug — live preview with lowercase, accent and stop-word options"
      keywords="slug generator, url slug generator, seo slug, permalink generator, title to slug"
      canonicalUrl="/other-calculators/slug-generator"
      explanation="Converts blog post titles and headings into URL-safe slugs, stripping accents, punctuation and filler words as you type."
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <h2 className="text-lg font-bold mb-4 text-black">Your Title</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Post or Page Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 10 Tips for Better Mornings!"
                className="mt-1.5 h-10 text-sm bg-white"
              />
            </div>
            <div className="space-y-2.5">
              {optionRows.map((row) => (
                <label key={row.key} className="flex items-start gap-2.5 cursor-pointer">
                  <Checkbox checked={options[row.key]} onCheckedChange={toggle(row.key)} className="mt-0.5" />
                  <span>
                    <span className="block text-sm font-medium text-black">{row.label}</span>
                    <span className="block text-xs text-neutral-500">{row.hint}</span>
                  </span>
                </label>
              ))}
            </div>
            <div className="flex gap-2">
              <Button onClick={copyResult} className="flex-1 h-10 text-sm gradient-button">
                <Copy className="h-4 w-4 mr-2" /> Copy Slug
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="h-10 w-10 shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="bg-white border border-neutral-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-black">Generated Slug</h2>
            {result.slug && (
              <Button onClick={copyResult} variant="outline" size="sm" className="h-8 text-xs">
                <Copy className="h-3.5 w-3.5 mr-1" /> Copy
              </Button>
            )}
          </div>
          {result.slug ? (
            <div className="space-y-3">
              <div className="p-4 bg-[#FFF5F2] border border-[#F2765E]/25 rounded-xl text-center break-all">
                <p className="text-lg font-bold text-black">/{result.slug}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">Characters</p>
                  <p className="text-[13px] font-bold text-black">{result.length}</p>
                </div>
                <div className="p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-[11px] text-neutral-500">Words</p>
                  <p className="text-[13px] font-bold text-black">{result.words}</p>
                </div>
              </div>
              <p className="text-[11px] text-neutral-500 text-center">Full URL preview: yoursite.com/{result.slug}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 text-neutral-500">
              <div className="text-center"><div className="text-4xl mb-2">🔗</div><p className="text-sm">Type a title to generate a slug</p></div>
            </div>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Slug Generator turns any headline into a clean, URL-safe slug — lowercasing text, stripping accents, removing punctuation and optionally dropping filler stop words. What you type is what you get: the slug preview updates live with every keystroke, so you can fine-tune titles for readability and SEO before publishing."
        useCases={[
          { title: "Blog Permalinks", description: "Create short, readable URLs for posts and articles in seconds." },
          { title: "SEO Cleanup", description: "Remove accents, capitals and filler words that weaken rankings." },
          { title: "E-commerce Slugs", description: "Generate consistent product and category URLs at scale." },
          { title: "CMS Migration", description: "Rebuild legacy URLs into a modern, uniform slug format." },
        ]}
        tips={[
          { title: "Keep It Short", description: "Aim for 3–5 meaningful words — shorter slugs rank and share better." },
          { title: "Use Stop-Word Stripping", description: "Dropping words like 'the' and 'of' tightens URLs without losing meaning." },
          { title: "Mind Accents", description: "Keep accent removal on so links work everywhere without encoding issues." },
        ]}
        faqs={[
          { question: "What is a URL slug?", answer: "The readable tail of a URL after the domain — e.g. /best-online-calculators. Good slugs are short, lowercase and hyphen-separated." },
          { question: "Why remove accents from slugs?", answer: "Accented characters get percent-encoded into long unreadable strings (%C3%A9), which hurt readability and can break in emails or old systems." },
          { question: "Should I remove stop words from URLs?", answer: "Usually yes for long titles — words like 'a', 'the' and 'of' add length without meaning. Keep them only when removal changes the sense." },
          { question: "Are underscores or hyphens better in slugs?", answer: "Hyphens. Search engines treat hyphens as word separators but join words around underscores, so hyphens rank better." },
        ]}
      />
    </CalculatorLayout>
  );
};

export default SlugGeneratorClient;
