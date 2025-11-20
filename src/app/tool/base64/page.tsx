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
          aboutContent="The Base64 Encoder/Decoder converts text to Base64 encoding and back. Base64 is a binary-to-text encoding scheme that represents binary data (like images or files) in a standard ASCII string format. It's not a form of encryption, but a way to safely transmit data over protocols that are designed to handle only plain text, such as in URLs, email attachments, or JSON files."
          useCases={[
            { title: "Embedding Images in HTML/CSS", description: "Use Base64 to embed small images directly into your code as 'Data URLs', which can reduce HTTP requests and speed up page loads for small assets." },
            { title: "API Authentication", description: "Basic HTTP Authentication uses Base64 to encode a username and password into a single string for the 'Authorization' header." },
            { title: "Data Transfer in Text Formats", description: "Safely include binary data within JSON or XML files where raw binary characters would cause parsing errors." },
            { title: "Email Attachments", description: "Base64 is a key part of the MIME standard, used to encode binary file attachments so they can be sent through text-based email systems." }
          ]}
          tips={[
            { title: "Not for Security", description: "Remember that Base64 is an encoding format, not encryption. It can be easily decoded by anyone. Never use it to protect sensitive information." },
            { title: "Size Increase", description: "Base64 encoding increases the size of the data by approximately 33%. It is best used for small pieces of data where the overhead is negligible." },
            { title: "URL-Safe Variants", description: "Standard Base64 includes '+' and '/' characters, which have special meanings in URLs. For URL parameters, a 'URL-safe' variant of Base64 is often used (this tool uses the standard variant)." },
          ]}
          faqs={[
            { question: "Is Base64 encoding secure?", answer: "No, it is not a security feature. It's a method of representing data, and it is easily reversible. For security, you must use encryption algorithms like AES." },
            { question: "Why does my encoded text look longer than the original?", answer: "Base64 represents 3 bytes of binary data using 4 ASCII characters. This translation results in the final string being about 33% larger than the original data." },
            { question: "What does the '=' at the end mean?", answer: "The '=' character is used as padding to ensure the Base64 string is a multiple of 4 characters long. You might see one, two, or no '=' characters at the end of a string." },
            { question: "Can I use this for files?", answer: "This tool is designed for text. While you could technically copy-paste the text content of some files, it will not work for binary files like images or PDFs. File-to-Base64 conversion requires reading the file's raw binary data." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default Base64Tool;
