'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { FileText, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const LoremIpsum = () => {
  const [count, setCount] = useState("5");
  const [type, setType] = useState("paragraphs");
  const [generated, setGenerated] = useState("");
  const { toast } = useToast();

  const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  
  const sentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  ];

  const generate = () => {
    const num = parseInt(count) || 1;
    let result = "";

    if (type === "paragraphs") {
      result = Array(num).fill(loremText).join("\n\n");
    } else if (type === "sentences") {
      const allSentences = [];
      for (let i = 0; i < num; i++) {
        allSentences.push(sentences[i % sentences.length]);
      }
      result = allSentences.join(" ");
    } else if (type === "words") {
      const words = loremText.split(" ");
      const selectedWords = [];
      for (let i = 0; i < num; i++) {
        selectedWords.push(words[i % words.length]);
      }
      result = selectedWords.join(" ");
    }

    setGenerated(result);
    toast({ title: "Success", description: "Lorem ipsum generated!" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated);
    toast({ title: "Success", description: "Copied to clipboard!" });
  };

  return (
      <CalculatorLayout
        title="Lorem Ipsum Generator"
        description="Generate placeholder text for your design and development projects"
        keywords="lorem ipsum, placeholder text, dummy text, lorem ipsum generator, filler text, sample text"
        canonicalUrl="/tool/lorem-ipsum"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Count</Label>
                <Input
                  type="number"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="words">Words</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={generate} className="w-full gradient-button">
              <FileText className="w-4 h-4 mr-2" />
              Generate Lorem Ipsum
            </Button>
          </Card>

          {generated && (
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Label>Generated Text</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={generated}
                readOnly
                className="min-h-[300px] text-sm bg-muted/50"
              />
            </Card>
          )}
        </div>

        <CalculatorContentSection
          aboutContent="The Lorem Ipsum Generator creates placeholder text for design mockups, website templates, and content layouts. Lorem Ipsum is scrambled Latin text that has been the industry-standard dummy text since the 1500s. It provides realistic-looking text that doesn't distract from design elements with readable content. This tool generates paragraphs, sentences, or words of Lorem Ipsum text instantly, helping designers, developers, and content creators visualize how layouts will look with actual content before final copy is available. The generated text maintains a natural-looking distribution of letters and word lengths, making it ideal for testing typography, spacing, and overall design aesthetics."
          useCases={[
            { title: "Website Mockups", description: "Fill website templates with placeholder text to demonstrate layout, typography, and spacing before actual content is written or approved." },
            { title: "Graphic Design", description: "Use in brochures, posters, magazines, and print materials to show clients how final designs will look with text content." },
            { title: "App Development", description: "Populate user interfaces with sample text during development to test responsive layouts and user experiences across different screen sizes." },
            { title: "Client Presentations", description: "Create realistic mockups for client presentations showing how their content will appear without waiting for final copy approval." },
            { title: "Typography Testing", description: "Test font choices, sizes, line spacing, and text hierarchy by filling designs with Lorem Ipsum to evaluate readability and aesthetics." },
            { title: "Template Development", description: "Build email templates, document templates, or CMS themes with placeholder content to demonstrate functionality and design flexibility." }
          ]}
          tips={[
            { title: "Why Lorem Ipsum?", description: "Real text in mockups can distract stakeholders who focus on content rather than design. Lorem Ipsum looks like text but is meaningless, keeping attention on visual elements, layout, and design decisions." },
            { title: "Paragraph vs Sentence Generation", description: "Use paragraphs for body text, sentences for shorter sections like captions, and words for testing buttons or navigation labels. Choose the unit that best matches your design needs." },
            { title: "Replace Before Launch", description: "Never leave Lorem Ipsum in production sites or final deliverables. It's unprofessional and harms SEO. Always replace with real content before going live." },
            { title: "Consider Content Length", description: "Generate slightly more text than you think you need to test how designs handle overflow, text wrapping, and various content lengths. Real content rarely fits perfectly." },
            { title: "Alternative Placeholder Text", description: "While Lorem Ipsum is standard, consider industry-specific placeholder text or themed generators for presentations where context matters, but always clarify it's sample content." }
          ]}
          faqs={[
            { question: "What does Lorem Ipsum mean?", answer: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of Cicero's 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) written in 45 BC. The text has been scrambled and is now nonsensical Latin, but it maintains a natural distribution of letters making it look like readable text." },
            { question: "Why not use real English text as placeholder?", answer: "Real English text can distract reviewers who read the content instead of evaluating design, layout, and visual hierarchy. Lorem Ipsum is clearly placeholder text that signals it's temporary, allowing stakeholders to focus on design elements rather than copy." },
            { question: "Is Lorem Ipsum the only placeholder text option?", answer: "No. Alternatives include 'Ipsum Lorem' variations, themed generators (bacon ipsum, hipster ipsum), repeated phrases, or industry-specific sample text. However, Lorem Ipsum remains the professional standard recognized worldwide in design and development." },
            { question: "Should I leave Lorem Ipsum in my live website?", answer: "Absolutely not. Lorem Ipsum should only appear in mockups and development. Live sites with Lorem Ipsum look unprofessional, harm SEO (search engines may penalize placeholder content), and confuse users. Always replace with real content before launch." },
            { question: "How much Lorem Ipsum should I generate?", answer: "Generate enough to test your design with realistic content volumes. For body text, 3-5 paragraphs is typical. For headlines, 1-2 sentences works well. Generate extra to test how your design handles both minimal and excessive content amounts." },
            { question: "Can Lorem Ipsum affect my website's SEO?", answer: "Yes, negatively. Search engines recognize Lorem Ipsum as placeholder text and may flag or penalize sites using it. It provides zero keyword value and signals incomplete content. Never publish Lorem Ipsum on live sites - replace with real, SEO-optimized content." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default LoremIpsum;
