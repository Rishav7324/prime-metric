'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FileCode, Copy } from "lucide-react";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const Base64Tool = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      toast({ title: "Success", description: "Text encoded to Base64!"});
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Error encoding to Base64" });
    }
  };

  const decode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
      toast({ title: "Success", description: "Base64 decoded!"});
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Error decoding Base64 - invalid input" });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({ title: "Success", description: "Copied to clipboard!"});
  };

  return (
      <CalculatorLayout
        title="Base64 Encoder/Decoder"
        description="Encode text to Base64 or decode Base64 strings"
        keywords="base64 encoder, base64 decoder, encode base64, decode base64, base64 converter, base64 tool"
        canonicalUrl="/tool/base64"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <Label htmlFor="input">Input Text</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to encode or Base64 to decode..."
              className="min-h-[150px] font-mono text-sm"
            />
            
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1">
                <FileCode className="w-4 h-4 mr-2" />
                Encode to Base64
              </Button>
              <Button onClick={decode} variant="outline" className="flex-1">
                <FileCode className="w-4 h-4 mr-2" />
                Decode from Base64
              </Button>
            </div>
          </Card>

          {output && (
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Label>Output</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[150px] font-mono text-sm bg-muted/50"
              />
            </Card>
          )}
        </div>

        <CalculatorContentSection
          aboutContent="The Base64 Encoder/Decoder converts text to Base64 encoding and back. Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used for encoding data in emails, URLs, and data transfer where binary data needs to be transmitted over text-based protocols."
          useCases={[
            { title: "Email Attachments", description: "Email protocols like SMTP were designed for text. Base64 encoding allows binary files (images, documents) to be sent as text in email attachments." },
            { title: "Data URLs", description: "Embed small images or files directly in HTML or CSS using Base64 data URLs, reducing HTTP requests and simplifying deployment." },
            { title: "API Authentication", description: "Many APIs use Base64 encoding for Basic Authentication headers, encoding username:password combinations." },
            { title: "Data Storage", description: "Store binary data in JSON, XML, or databases that only handle text, such as embedding images in JSON API responses." }
          ]}
          tips={[
            { title: "Not Encryption", description: "Base64 is encoding, not encryption. It doesn't provide security—anyone can decode it. Never use Base64 alone for sensitive data." },
            { title: "Size Increase", description: "Base64 encoding increases data size by about 33%. Original 100 bytes becomes approximately 133 bytes encoded." },
            { title: "URL Safety", description: "Standard Base64 uses +, /, and = which aren't URL-safe. For URLs, use URL-safe Base64 variants that replace these characters." },
            { title: "Line Breaks", description: "Some Base64 implementations add line breaks every 76 characters. This tool doesn't add line breaks, providing compact output." }
          ]}
          faqs={[
            { question: "Is Base64 encoding secure?", answer: "No. Base64 is encoding, not encryption. It's easily reversible and provides no security. Use proper encryption (AES, RSA) for sensitive data." },
            { question: "Why does my encoded data look like random text?", answer: "Base64 uses A-Z, a-z, 0-9, +, /, and = characters to represent data. It appears random but is actually a deterministic encoding of your input." },
            { question: "What causes 'invalid input' errors when decoding?", answer: "The input must be valid Base64 (only A-Z, a-z, 0-9, +, /, =). Other characters, including unencoded text, will cause decode errors." },
            { question: "Can I encode any type of file?", answer: "This tool works with text input. For files (images, PDFs), use file-specific Base64 tools or programming libraries that can handle binary data." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default Base64Tool;
