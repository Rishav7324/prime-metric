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
          aboutContent="The Base64 Encoder/Decoder is an essential developer utility for converting text into Base64 format and vice-versa. Base64 is a binary-to-text encoding scheme that represents binary data—such as files, images, or any sequence of bytes—in an ASCII string format. This is crucial for transmitting data over media that are designed to handle only text. For example, it allows binary data to be embedded in URLs, email attachments, or JSON and XML files without being corrupted or misinterpreted. While it makes data safe for transport, it is important to remember that Base64 is an encoding format, not a form of encryption; it is easily reversible and provides no security on its own. The encoding process works by taking 3 bytes (24 bits) of binary data and representing them as 4 ASCII characters, which increases the data size by approximately 33%. This tool provides a simple interface to perform this common encoding and decoding task instantly, aiding developers in a wide range of web and software development scenarios."
          useCases={[
            { title: "Embedding Images in HTML/CSS (Data URLs)", description: "Convert small images or icons into Base64 strings to embed them directly in HTML (`<img>` tags) or CSS (`background-image`). This technique, known as creating a Data URL, can reduce the number of HTTP requests a browser needs to make, which can improve page load times for websites with many small graphical elements. It's particularly useful for icons, logos, and other small, static assets." },
            { title: "Basic HTTP Authentication", description: "In the 'Basic' HTTP authentication scheme, the client sends a username and password to the server. The credentials are combined into a 'username:password' string, which is then encoded using Base64 and sent in the 'Authorization' header of the HTTP request. This tool can be used to manually generate or decode these headers for testing or debugging API authentication flows." },
            { title: "Including Binary Data in Text-Based Formats", description: "Safely embed binary data within text-based formats like JSON, XML, or YAML. For instance, if you need to include a small file, a public key, or a configuration payload in a JSON object, encoding it in Base64 ensures that the data won't contain characters that would break the JSON syntax (like quotes or control characters)." },
            { title: "Email Attachments (MIME)", description: "Base64 is a fundamental part of the MIME (Multipurpose Internet Mail Extensions) standard, which is used for formatting email attachments. When you attach a file to an email, it is typically encoded in Base64 so that it can be transmitted through email systems that were originally designed to handle only plain text. This tool helps in understanding how that data is represented." },
            { title: "Storing Binary Data in Databases", description: "Some database systems or fields are designed to store text only. In such cases, binary data (like a user-uploaded image thumbnail or a small PDF) can be stored by first encoding it into a Base64 string. This avoids issues with character set compatibility and data corruption, although storing large files this way is generally not recommended." }
          ]}
          examples={[
            {
              title: "Example: Creating a Data URL for a Simple SVG",
              description: "You want to embed a simple SVG icon directly into your CSS without a separate file.",
              steps: [
                'First, get your SVG code, for example: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="10" fill="red" /></svg>`',
                'Paste this SVG code into the input box.',
                'Click the "Encode to Base64" button.',
                'The tool will output the Base64 string, e.g., `PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9InJlZCIgLz48L3N2Zz4=`',
                'You can now use this in your CSS: `background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9InJlZCIgLz48L3N2Zz4=");`'
              ]
            },
            {
              title: "Example: Decoding a Basic Auth Header",
              description: "You are debugging an API request and see an Authorization header: `Authorization: Basic dXNlcjpwYXNzd29yZA==`",
              steps: [
                'Copy the string that comes after "Basic ": `dXNlcjpwYXNzd29yZA==`',
                'Paste this string into the input box.',
                'Click the "Decode from Base64" button.',
                'The output will show the original credentials: `user:password`. This allows you to verify the username and password being sent.'
              ]
            }
          ]}
          tips={[
            { title: "Not for Security", description: "It is crucial to remember that Base64 is an encoding format, not a form of encryption. It offers no security or confidentiality, as the encoded data can be easily decoded by anyone. Never use Base64 to 'protect' sensitive information like passwords or private keys. For security, you must use proper encryption algorithms like AES." },
            { title: "Size Increase", description: "Base64 encoding increases the size of the original data by approximately 33%. This is because it uses 4 ASCII characters to represent 3 bytes of binary data. This overhead is generally acceptable for small pieces of data, but for large files, it can significantly increase storage and bandwidth requirements." },
            { title: "URL-Safe Variants", description: "The standard Base64 character set includes '+' and '/' characters, which have special meanings in URLs and can cause issues. A 'URL-safe' variant of Base64 exists, which replaces these characters with '-' and '_'. This tool uses the standard variant, so be mindful when using the output in URL parameters." },
            { title: "Character Set Issues", description: "When encoding text, be aware of character sets. The `btoa()` function in browsers typically works with UTF-8 characters, but issues can arise with multi-byte characters. For robust, cross-platform applications, it's often better to handle character encoding explicitly before passing data to a Base64 encoder." }
          ]}
          faqs={[
            { question: "Is Base64 encoding secure or a form of encryption?", answer: "No, absolutely not. Base64 is an encoding scheme, not an encryption algorithm. Its purpose is to ensure data can be transmitted reliably through text-based systems. It provides no confidentiality and can be instantly reversed by anyone. It should never be used for security purposes." },
            { question: "Why does my encoded text look longer than the original text?", answer: "Base64 represents binary data using only a set of 64 ASCII characters. To do this, it maps every 3 bytes (24 bits) of input data to 4 characters (6 bits each). This mapping inherently increases the data size by a factor of 4/3, or approximately 33%." },
            { question: "What does the '=' character at the end of a Base64 string mean?", answer: "The '=' character is used for padding. Since Base64 processes data in 3-byte chunks, if the input data is not a multiple of 3 bytes, padding is added to the output string to ensure it is a multiple of 4 characters long. You might see one or two '=' characters, or none at all." },
            { question: "Can I use this tool to encode files like images or PDFs?", answer: "This tool is designed to work with text input. While you could technically copy-paste the text content of some file types (like SVG or simple text files), it will not work for binary files like images (JPG, PNG) or PDFs. Converting binary files to Base64 requires reading the file's raw byte stream, which is typically done programmatically or with a file-upload-based tool." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default Base64Tool;
