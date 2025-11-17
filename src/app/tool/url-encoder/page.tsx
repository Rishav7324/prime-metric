'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const encode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast({ title: "Success", description: "URL encoded!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Error encoding URL" });
    }
  };

  const decode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast({ title: "Success", description: "URL decoded!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Error decoding URL - invalid input" });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({ title: "Success", description: "Copied to clipboard!" });
  };

  return (
      <CalculatorLayout
        title="URL Encoder/Decoder"
        description="Encode and decode URLs and URI components"
        keywords="url encoder, url decoder, encode url, decode url, uri encoder, percent encoding"
        canonicalUrl="/tool/url-encoder"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <Label htmlFor="input">Input Text or URL</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text or URL to encode/decode..."
              className="min-h-[150px] font-mono"
            />
            
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1 gradient-button">
                <Link className="w-4 h-4 mr-2" />
                Encode URL
              </Button>
              <Button onClick={decode} variant="outline" className="flex-1">
                <Link className="w-4 h-4 mr-2" />
                Decode URL
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
          aboutContent="The URL Encoder/Decoder converts text and URLs to percent-encoded format (URL encoding) and decodes them back to readable text. URL encoding replaces unsafe characters with '%' followed by two hexadecimal digits. This is essential for passing data in URLs, ensuring special characters are transmitted correctly across the web."
          useCases={[
            { title: "Query Parameters", description: "Encode data being passed in URL query strings (e.g., ?search=hello world becomes ?search=hello%20world) for proper HTTP transmission." },
            { title: "API Requests", description: "Prepare parameters for RESTful API calls, ensuring special characters in usernames, searches, or filters are correctly encoded." },
            { title: "Email Links", description: "Create mailto: links with pre-filled subjects or bodies containing special characters that need encoding to work across all email clients." },
            { title: "Debugging", description: "Decode URL-encoded strings from browser address bars, server logs, or error messages to understand actual content being transmitted." }
          ]}
          tips={[
            { title: "Space Encoding", description: "Spaces are encoded as %20 (or + in form data). Both are valid but %20 is more universal for general URL encoding." },
            { title: "Reserved Characters", description: "Characters like ?, &, =, #, / have special meanings in URLs. Encoding prevents them from being interpreted as URL structure when they're part of data." },
            { title: "Double Encoding", description: "Be careful not to encode already-encoded URLs. Encoding 'hello%20world' again becomes 'hello%2520world' (double-encoded)." },
            { title: "Encoding Only Data", description: "Only encode the parameter values, not the entire URL structure. Don't encode http://, ?, &, or = that are part of the URL syntax itself." }
          ]}
          faqs={[
            { question: "What characters need URL encoding?", answer: "Non-alphanumeric characters except: - _ . ~. This includes spaces, special symbols (@, #, $), and non-ASCII characters. When in doubt, encode it." },
            { question: "Why does my URL have %20 instead of spaces?", answer: "%20 is the URL-encoded representation of a space. URLs can't contain literal spaces, so they're encoded as %20 for transmission." },
            { question: "What's the difference from Base64 encoding?", answer: "URL encoding is for making text URL-safe (replacing problematic characters). Base64 converts binary to text. They serve different purposes." },
            { question: "Do I need to encode the entire URL?", answer: "No! Only encode the data parts (query parameter values, path segments with special characters). Don't encode the protocol (http://), domain, or URL structure characters." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default URLEncoder;
