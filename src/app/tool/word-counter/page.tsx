'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { FileText, Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs! How vexingly quick daft zebras jump. PrimeMetric helps you count words, characters, and sentences instantly as you type.";

type WordStats = {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
};

const WordCounter = () => {
  // Pre-filled so live stats show instantly
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [stats, setStats] = useState<WordStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime,
    });
  }, [text]);

  const copyToClipboard = async () => {
    if (!text.trim()) {
      toast({ variant: "destructive", title: "Empty Input", description: "Enter some text to copy." });
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const clear = () => {
    setText("");
  };

  return (
    <CalculatorLayout
      title="Word Counter"
      description="Count words, characters, sentences, and estimate reading time"
      keywords="word counter, character counter, text counter, word count, sentence counter, reading time calculator"
      canonicalUrl="/tool/word-counter"
    >
        <div className="max-w-4xl mx-auto space-y-4">
          <Card className="p-6">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium" htmlFor="text">Enter or paste your text</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="icon" onClick={clear} aria-label="Clear">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[300px] mt-2"
            />
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Words</div>
              </div>
              <div className="result-value">{stats.words.toLocaleString()}</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Characters</div>
              </div>
              <div className="result-value">{stats.characters.toLocaleString()}</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Characters (no spaces)</div>
              </div>
              <div className="result-value">{stats.charactersNoSpaces.toLocaleString()}</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Sentences</div>
              </div>
              <div className="result-value">{stats.sentences.toLocaleString()}</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Paragraphs</div>
              </div>
              <div className="result-value">{stats.paragraphs.toLocaleString()}</div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-primary" />
                <div className="result-label">Reading Time</div>
              </div>
              <div className="result-value">{stats.readingTime} min</div>
            </Card>
          </div>
        </div>

        <CalculatorContentSection
          aboutContent="The Word Counter is a versatile text analysis tool that provides instant statistics about your written content. It counts words, characters (with and without spaces), sentences, and paragraphs, and it also estimates the reading time. This tool is invaluable for writers, students, content creators, and professionals who need to meet specific length requirements or optimize content for different platforms. Whether you're checking if your essay meets the word count, ensuring your tweet fits character limits, or analyzing the readability of your blog post, this counter provides real-time feedback as you type or paste text. We built this tool because we believe that clear and effective communication starts with understanding the building blocks of your text."
          useCases={[
            { title: "Academic Writing", description: "Ensure essays, research papers, and assignments meet required word counts. For example, if your professor requires a 1,500-word essay, you can use this tool to track your progress and avoid going over or under the limit. You can also track character limits for abstracts and verify paragraph distribution for balanced writing." },
            { title: "Social Media Content", description: "Check character limits for tweets (280 characters), Instagram captions (2,200 characters), or LinkedIn posts to optimize content for each platform. For example, a marketing professional can use this tool to draft a compelling tweet that fits within Twitter's character limit, ensuring the message is not cut off." },
            { title: "SEO & Blog Writing", description: "Monitor article length for SEO optimization. Blog posts typically need 1,500-2,500 words for good search rankings, and this tool helps you track progress. For example, a content creator can use this tool to ensure their blog post is long enough to rank well in search results, while also being easy to read." },
            { title: "Professional Documents", description: "Verify resume length (ideally under 500 words), cover letters (250-400 words), and business reports meet professional standards and space constraints. For example, a job seeker can use this tool to ensure their resume is concise and easy to read, increasing their chances of getting an interview." },
            { title: "Content Editing", description: "Analyze text density and readability. Track sentence and paragraph counts to ensure content is well-structured and easy to digest. For example, an editor can use this tool to identify long, complex sentences that may be difficult for readers to understand." },
            { title: "Translation & Localization", description: "Estimate word counts for translation projects to calculate costs and timelines, as translation services typically charge per word. For example, a project manager can use this tool to get a quick estimate of the cost of translating a document into another language." },
            { title: "Public Speaking", description: "Practice your speeches and presentations to ensure they fit within your allotted time. The average person speaks at about 130 words per minute. Use the estimated reading time to gauge the length of your speech and make adjustments as needed." }
          ]}
          tips={[
            { title: "Reading Time Estimation", description: "The tool estimates reading time at approximately 200 words per minute, which is the average adult reading speed. Actual reading time varies based on content complexity and reader proficiency." },
            { title: "Character Count vs Word Count", description: "Different platforms have different limits. Twitter uses characters, academic papers use words, and SMS uses characters. Always check which metric applies to your specific use case." },
            { title: "Quality Over Quantity", description: "Meeting word counts is important, but don't sacrifice quality for length. Concise, clear writing is often more effective than verbose text that artificially inflates word count." },
            { title: "Paragraph Length Guidelines", description: "For web content, aim for 3-5 sentences per paragraph (50-100 words). Long paragraphs intimidate readers, while very short ones may seem choppy. Use this tool to check balance." },
            { title: "Save Your Work", description: "This tool doesn't save text automatically. Copy your text to a document or note-taking app regularly to prevent data loss from browser crashes or accidental navigation." },
            { title: "Pacing for Presentations", description: "When preparing for a presentation, use the word count to estimate your speaking time. A comfortable speaking pace is around 130 words per minute. Adjust your script to fit your time slot, leaving room for pauses and audience interaction." }
          ]}
          faqs={[
            { question: "How accurate is the word count?", answer: "The word counter uses standard algorithms that count sequences of characters separated by spaces as words. It's very accurate for English and handles hyphenated words, contractions, and numbers consistently. Results match Microsoft Word and Google Docs word counts." },
            { question: "Why do different tools show different word counts?", answer: "Minor variations occur because tools handle edge cases differently - like whether to count hyphenated words as one or two words, how to treat numbers and symbols, or whether to count URLs. This tool uses industry-standard counting methods matching most common word processors." },
            { question: "What's the difference between characters with and without spaces?", answer: "Characters without spaces counts only letters, numbers, and punctuation. Characters with spaces includes everything including whitespace. Some platforms (like Twitter) count spaces toward limits, while others (like some academic requirements) don't." },
            { question: "How is reading time calculated?", answer: "Reading time is estimated at 200 words per minute, which is the average silent reading speed for adults. Technical or dense content may take longer, while light reading may be faster. This is a general estimate for planning purposes." },
            { question: "Can this tool count words in other languages?", answer: "Yes, the tool works with any language that uses spaces between words (English, Spanish, French, etc.). Languages without spaces between words (like Chinese or Japanese) may not count accurately as they require different tokenization methods." },
            { question: "Does the tool count punctuation and special characters?", answer: "Punctuation and special characters are counted in the character count but not as separate words. Numbers are counted as words if they appear as separate units. The sentence count uses periods, exclamation marks, and question marks as delimiters." },
            { question: "What is the ideal word count for...?", answer: "The ideal word count depends on the type of content. For example, a blog post should be between 1,500-2,500 words for SEO, a cover letter should be 250-400 words, and an Instagram caption has a limit of 2,200 characters. Always research the best practices for your specific platform or purpose." }
          ]}
        />
    </CalculatorLayout>
  );
};

export default WordCounter;
