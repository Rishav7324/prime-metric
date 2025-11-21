'use client';

import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Braces, Copy, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setIsValid(true);
      toast({ title: "Success", description: "JSON formatted successfully!" });
    } catch (error) {
      setOutput("");
      setIsValid(false);
      toast({ variant: "destructive", title: "Error", description: "Invalid JSON provided." });
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setIsValid(true);
      toast({ title: "Success", description: "JSON minified successfully!" });
    } catch (error) {
      setOutput("");
      setIsValid(false);
      toast({ variant: "destructive", title: "Error", description: "Invalid JSON provided." });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    toast({ title: "Success", description: "Copied to clipboard!" });
  };

  return (
      <CalculatorLayout
        title="JSON Formatter & Validator"
        description="Format, validate, and minify JSON data"
        keywords="json formatter, json validator, format json, minify json, json beautifier, json parser"
        canonicalUrl="/tool/json-formatter"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="input">Input JSON</Label>
              {isValid !== null && (
                <div className={`flex items-center gap-2 text-sm ${isValid ? 'text-green-500' : 'text-destructive'}`}>
                  {isValid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  {isValid ? 'Valid JSON' : 'Invalid JSON'}
                </div>
              )}
            </div>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsValid(null);
              }}
              placeholder='{"name": "value", "array": [1, 2, 3]}'
              className="min-h-[200px] font-mono text-sm"
            />
            
            <div className="flex gap-2">
              <Button onClick={format} className="flex-1">
                <Braces className="w-4 h-4 mr-2" />
                Format JSON
              </Button>
              <Button onClick={minify} variant="outline" className="flex-1">
                <Braces className="w-4 h-4 mr-2" />
                Minify JSON
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
                className="min-h-[200px] font-mono text-sm bg-muted/50"
              />
            </Card>
          )}
        </div>

        <CalculatorContentSection
          aboutContent="The JSON Formatter is an essential developer tool that formats, validates, and minifies JSON (JavaScript Object Notation) data. JSON is the most common data format for APIs, configuration files, and data exchange between applications. This tool helps developers quickly beautify messy JSON for readability, validate JSON syntax for errors, and minify JSON to reduce file size. Whether you're debugging API responses, working with configuration files, or preparing JSON for production, this formatter ensures your JSON is properly structured and error-free."
          useCases={[
            { title: "API Response Debugging", description: "Format minified API responses to easily read and understand the data structure, making debugging and development much faster." },
            { title: "Configuration File Management", description: "Validate and format JSON configuration files for applications, ensuring proper syntax before deployment to prevent runtime errors." },
            { title: "Data Transfer Optimization", description: "Minify JSON data to reduce payload size for faster API responses and lower bandwidth usage in production environments." },
            { title: "Code Documentation", description: "Format JSON examples in technical documentation to improve readability and help developers understand data structures quickly." },
            { title: "JSON Schema Validation", description: "Check JSON syntax before using it in applications or databases to catch errors early in the development process." },
            { title: "Learning & Education", description: "Format complex JSON structures to better understand nested objects and arrays when learning web development or APIs." }
          ]}
          tips={[
            { title: "Understand JSON Structure", description: "JSON consists of key-value pairs, arrays, objects, strings, numbers, booleans, and null. Keys must be strings in double quotes, and proper syntax is critical for validity." },
            { title: "Common JSON Errors", description: "Watch for trailing commas, single quotes instead of double quotes, missing brackets/braces, and unescaped special characters in strings - these are the most frequent JSON syntax errors." },
            { title: "Use Browser DevTools", description: "Modern browser developer tools have built-in JSON formatters in the Network tab. However, standalone formatters like this offer better validation and minification features." },
            { title: "Validate Before Use", description: "Always validate JSON before using it in production. Invalid JSON will cause application errors and can be difficult to debug once deployed." },
            { title: "Minify for Production", description: "Use minified JSON in production to reduce file sizes and improve load times. Keep formatted versions for development and documentation purposes." }
          ]}
          faqs={[
            { question: "What is JSON and why is it important?", answer: "JSON (JavaScript Object Notation) is a lightweight, text-based data format that's easy for humans to read and write, and easy for machines to parse and generate. It's the de facto standard for data exchange in modern web APIs, making it essential for web development." },
            { question: "Why does my JSON fail to validate?", answer: "Common validation errors include: trailing commas after the last item in arrays/objects, using single quotes instead of double quotes, missing closing brackets or braces, unescaped special characters in strings, or duplicate keys in objects. Check the error message for the specific line causing issues." },
            { question: "What's the difference between formatted and minified JSON?", answer: "Formatted JSON includes indentation, line breaks, and whitespace for human readability. Minified JSON removes all unnecessary whitespace, making files smaller but harder to read. Use formatted JSON during development and minified JSON in production for optimal performance." },
            { question: "Can I use comments in JSON?", answer: "Standard JSON does not support comments, which is a frequent point of confusion. Some parsers allow comments (like JSON5 or JSONC), but standard JSON specification does not include them. If you need annotations, consider using a wrapper format or separate documentation." },
            { question: "How do I handle special characters in JSON strings?", answer: "Escape special characters using backslashes: \\\" for quotes, \\\\ for backslashes, \\n for newlines, \\t for tabs. Unicode characters can be represented as \\uXXXX. The formatter automatically handles these when validating and formatting your JSON." },
            { question: "Is there a size limit for JSON files?", answer: "This tool can handle most typical JSON files, but very large files (multiple megabytes) may slow down browser performance. For extremely large JSON files, consider using command-line tools or splitting the data into smaller chunks." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default JSONFormatter;
