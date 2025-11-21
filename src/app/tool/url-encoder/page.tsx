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
          aboutContent="The URL Encoder/Decoder is a web utility that converts strings into a URL-safe format and back. This process, known as percent-encoding, is crucial for ensuring that data passed within a Uniform Resource Locator (URL) is transmitted correctly. URLs can only contain a specific set of characters; special characters like spaces, slashes, or ampersands have reserved meanings and must be encoded to be treated as literal data. This tool uses standard JavaScript functions (`encodeURIComponent` and `decodeURIComponent`) to perform this task, which is a fundamental requirement for web development, API interaction, and handling data in web applications."
          useCases={[
            { title: "Creating Safe URL Query Parameters", description: "When passing data in a URL's query string (the part after '?'), values must be encoded. For example, a search query like 'shirts & shoes' must be encoded to 'shirts%20%26%20shoes' to prevent the '&' from being misinterpreted as a separator for a new parameter. This is essential for search bars, filters, and forms that use GET requests." },
            { title: "Preparing Data for API Requests", description: "Many REST APIs require data to be passed in the URL path or as query parameters. Encoding user-generated content, file names, or any data that might contain special characters ensures the API server interprets the request correctly. For instance, an API endpoint to fetch a user profile might look like `/api/users/john.doe@example.com`, which would need to be encoded to `/api/users/john.doe%40example.com`." },
            { title: "Generating 'mailto:' Links", description: "To create email links that pre-fill the subject or body, you must URL-encode the content. A link to email someone with the subject 'Hello World!' would require encoding the subject to 'Hello%20World!' to ensure the spaces are handled correctly by email clients." },
            { title: "Debugging Web Traffic and Logs", description: "Developers and network administrators often need to analyze URLs from server logs, browser history, or network traffic captures. These URLs are typically encoded. This tool allows them to quickly decode the URLs to see the original, human-readable data, which is invaluable for troubleshooting and debugging issues." }
          ]}
          examples={[
            {
              title: "Encoding a Search Query",
              description: "You have a search input on your website that redirects to a URL like `https://example.com/search?q=your query`.",
              steps: [
                "A user types 'black t-shirt & jeans' into the search box.",
                "Paste 'black t-shirt & jeans' into the input field of the encoder.",
                "Click 'Encode URL'.",
                "The output will be 'black%20t-shirt%20%26%20jeans'.",
                "The final, safe URL would be `https://example.com/search?q=black%20t-shirt%20%26%20jeans`."
              ]
            },
            {
              title: "Decoding a URL from a Log File",
              description: "You see a log entry for a request to your server: `/api/v1/documents/Report%20-%20Q4%202024.pdf`.",
              steps: [
                "Copy the encoded part of the URL: `Report%20-%20Q4%202024.pdf`.",
                "Paste it into the input field of the decoder.",
                "Click 'Decode URL'.",
                "The output will reveal the original filename: `Report - Q4 2024.pdf`. This helps you understand which file was being accessed."
              ]
            }
          ]}
          tips={[
            { title: "Encode Only the Data, Not the Whole URL", description: "A common mistake is to encode an entire URL. You should only encode the individual components (like query parameter values or path segments) that contain special characters. Encoding the 'http://' or the separating '?' and '&' characters will break the URL." },
            { title: "Spaces Can Be '+' or '%20'", description: "When encoding form data, spaces are often represented as a plus sign ('+'). In most other URL contexts, the standard encoding is '%20'. Both are generally understood by servers, but using `%20` is more universally compatible, which is what this tool does." },
            { title: "Beware of Double Encoding", description: "Be careful not to encode a string that has already been encoded. This can happen if data is passed through multiple systems. For example, encoding 'hello%20world' again will result in 'hello%2520world' (because '%' is encoded as '%25'), which will not decode correctly." },
            { title: "Use 'encodeURIComponent' for Safety", description: "This tool uses `encodeURIComponent`, which encodes more characters (like '/', '?', ':', '&', '=') than the older `encodeURI` function. This makes it safer for encoding parameter values, as it prevents those characters from being interpreted as part of the URL structure." }
          ]}
          faqs={[
            { question: "What is URL encoding, and why is it necessary?", answer: "URL encoding (or percent-encoding) is a mechanism for representing characters in a URL that are not in the limited set of 'safe' ASCII characters. It replaces unsafe characters with a '%' symbol followed by two hexadecimal digits that represent the character's byte value. It is necessary because certain characters have special meanings in URLs (e.g., '/', '?', '#', '&') and would break the URL structure if used literally within data." },
            { question: "Which characters need to be URL encoded?", answer: "Any character that is not an unreserved alphanumeric character (`a-z`, `A-Z`, `0-9`) or one of the few unreserved symbols (`-`, `_`, `.`, `~`) should be encoded. This includes spaces, all punctuation marks, and any non-ASCII characters (like accents or emojis)." },
            { question: "What's the difference between URL encoding and Base64 encoding?", answer: "URL encoding is designed specifically to make text safe to be included in a URL by escaping problematic characters. Base64 encoding is a general-purpose method for representing any binary data as a text string. They are not interchangeable and serve different purposes." },
            { question: "What does '%20' mean in a URL?", answer: "The string '%20' is the percent-encoded representation of a space character. URLs cannot contain literal spaces, so they are replaced with '%20' to ensure they are transmitted correctly and not misinterpreted by servers or browsers." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default URLEncoder;
