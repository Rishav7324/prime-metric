'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Type, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const CaseConverter = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const convertCase = (type: string) => {
    let converted = "";
    switch (type) {
      case "upper":
        converted = text.toUpperCase();
        break;
      case "lower":
        converted = text.toLowerCase();
        break;
      case "title":
        converted = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        break;
      case "sentence":
        converted = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case "camel":
        converted = text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
        break;
      case "snake":
        converted = text.toLowerCase().replace(/\s+/g, '_');
        break;
    }
    setText(converted);
    toast({ title: "Success", description: "Text converted!"});
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Success", description: "Copied to clipboard!"});
  };

  return (
      <CalculatorLayout
        title="Case Converter"
        description="Convert text between different cases - upper, lower, title, sentence, camel, and snake case"
        keywords="case converter, text converter, uppercase, lowercase, title case, sentence case, camel case, snake case"
        canonicalUrl="/tool/case-converter"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="text">Enter your text</Label>
              <Button variant="outline" size="sm" onClick={copyToClipboard} disabled={!text}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="min-h-[200px]"
            />
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Button onClick={() => convertCase("upper")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>UPPERCASE</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("lower")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>lowercase</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("title")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>Title Case</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("sentence")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>Sentence case</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("camel")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>camelCase</span>
              </div>
            </Button>

            <Button onClick={() => convertCase("snake")} className="h-auto py-4">
              <div className="flex flex-col items-center gap-2">
                <Type className="w-5 h-5" />
                <span>snake_case</span>
              </div>
            </Button>
          </div>
        </div>

        <CalculatorContentSection
          aboutContent="The Case Converter is a powerful text formatting tool that instantly transforms text between different letter case styles. It supports six common case formats: UPPERCASE (all capitals), lowercase (all small letters), Title Case (first letter of each word capitalized), Sentence case (first letter of each sentence capitalized), camelCase (used in programming), and snake_case (words separated by underscores). This tool is essential for writers, developers, content creators, and anyone who needs to quickly reformat text for different purposes without manual editing. Simply paste your text and click the desired format for instant conversion."
          useCases={[
            { title: "Content Editing", description: "Quickly fix text that was typed with caps lock accidentally, or convert shouting uppercase text to proper sentence case for more professional communication." },
            { title: "Programming & Development", description: "Convert variable names between camelCase, snake_case, or other conventions to match coding standards and style guides for different programming languages." },
            { title: "SEO & Metadata", description: "Format titles and meta descriptions in title case for better presentation in search results and social media shares." },
            { title: "Data Cleaning", description: "Standardize inconsistent text data in spreadsheets or databases by converting all entries to the same case format for consistency." },
            { title: "Social Media Posting", description: "Format headlines and captions appropriately for different platforms - title case for professional posts, sentence case for casual content." },
            { title: "Document Formatting", description: "Convert headlines, chapter titles, or section headers to proper title case for books, reports, and professional documents." }
          ]}
          tips={[
            { title: "Title Case Nuances", description: "Proper title case capitalizes major words but not articles (a, an, the), short prepositions (in, on, at), or coordinating conjunctions (and, but, or) unless they're the first word. This tool follows standard title case rules automatically." },
            { title: "Sentence Case vs Title Case", description: "Use sentence case for body text and most casual content. Use title case for headlines, book titles, and formal headers. Understanding which to use improves readability and professionalism." },
            { title: "Programming Case Conventions", description: "camelCase is standard in JavaScript and Java. snake_case is common in Python and Ruby. PascalCase (like title case but no spaces) is used for class names. Choose the right convention for your language." },
            { title: "Preserve Special Characters", description: "The converter maintains numbers, punctuation, and special characters while changing letter cases. This ensures your text structure remains intact during conversion." },
            { title: "Copy and Reuse", description: "Use the copy button to quickly grab converted text for use in documents, code editors, or other applications without manually selecting and copying." }
          ]}
          faqs={[
            { question: "What's the difference between title case and sentence case?", answer: "Sentence case capitalizes only the first letter of each sentence and proper nouns, like in normal writing. Title case capitalizes the first letter of most words, used for headlines and titles. Title case makes text stand out more and is more formal." },
            { question: "When should I use camelCase vs snake_case?", answer: "CamelCase (like myVariableName) is standard in JavaScript, Java, and C-based languages for variable names. Snake_case (like my_variable_name) is preferred in Python, Ruby, and SQL. Follow your project's or language's style guide for consistency." },
            { question: "Does the tool handle special characters and numbers?", answer: "Yes, the case converter preserves all numbers, punctuation marks, spaces, and special characters. Only alphabetic characters (letters) are affected by the case conversion, maintaining your text's structure and formatting." },
            { question: "Why use UPPERCASE text?", answer: "UPPERCASE is used for acronyms (NASA, FBI), emphasizing important warnings or alerts, headings in some design styles, and constants in programming. However, avoid using it for large blocks of text as it's harder to read and can seem like shouting in digital communication." },
            { question: "What are title case capitalization rules?", answer: "Standard title case capitalizes: the first and last words, nouns, pronouns, verbs, adjectives, adverbs, and subordinate conjunctions. It keeps lowercase: articles (a, an, the), short prepositions (in, on, at), and coordinating conjunctions (and, but, or) unless they're the first or last word." },
            { question: "Can I convert text with multiple paragraphs?", answer: "Yes, the tool handles text of any length including multiple paragraphs. Each conversion type applies its rules consistently across all paragraphs and sentences in your input text." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default CaseConverter;
