'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { QrCode, Download, Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const DEFAULT_QR_TEXT = "https://primemetric.online";

const buildQrUrl = (value: string, qrSize: string): string =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(value)}`;

const QRCodeGenerator = () => {
  const [text, setText] = useState<string>(DEFAULT_QR_TEXT);
  const [size, setSize] = useState<string>("256");
  // Pre-filled so a code renders instantly
  const [qrCode, setQrCode] = useState<string>(() => buildQrUrl(DEFAULT_QR_TEXT, "256"));
  const { toast } = useToast();

  const generateQR = () => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Input",
        description: "Please enter text or URL",
      });
      return;
    }

    // Simple QR code generation using a public API
    const apiUrl = buildQrUrl(text.trim(), size);
    setQrCode(apiUrl);
    toast({ title: "Generated", description: "QR code generated!" });
  };

  const reset = () => {
    setText(DEFAULT_QR_TEXT);
    setSize("256");
    setQrCode(buildQrUrl(DEFAULT_QR_TEXT, "256"));
  };

  const copyToClipboard = async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const downloadQR = () => {
    if (!qrCode) {
      toast({ variant: "destructive", title: "Nothing to Download", description: "Generate a QR code first." });
      return;
    }
    
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCode;
    link.target = "_blank"; // To allow download of cross-origin URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Downloaded", description: "QR code downloaded!" });
  };

  return (
      <CalculatorLayout
        title="QR Code Generator"
        description="Generate QR codes for URLs, text, and more"
        keywords="qr code generator, create qr code, qr code maker, generate qr code, free qr code, qr code creator"
        canonicalUrl="/tool/qr-code"
      >
        <div className="max-w-4xl mx-auto space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <Label className="text-sm font-medium" htmlFor="text">Text or URL</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any data..."
                className="min-h-[90px]"
              />
            </div>

            <div>
              <Label>QR Code Size</Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="128">Small (128x128)</SelectItem>
                  <SelectItem value="256">Medium (256x256)</SelectItem>
                  <SelectItem value="512">Large (512x512)</SelectItem>
                  <SelectItem value="1024">Extra Large (1024x1024)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateQR} className="flex-1 gradient-button">
                <QrCode className="w-4 h-4 mr-2" />
                Generate QR Code
              </Button>
              <Button onClick={reset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {qrCode && (
            <Card className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <Label>Generated QR Code</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <div className="flex justify-center p-4 sm:p-5 bg-white rounded-lg">
                <img src={qrCode} alt="QR Code" className="max-w-full" />
              </div>
              <Button onClick={downloadQR} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download QR Code
              </Button>
            </Card>
          )}
        </div>

        <CalculatorContentSection
          aboutContent="The QR Code Generator creates scannable QR codes from any text, URL, or data you provide. QR (Quick Response) codes are two-dimensional barcodes that can store information and be quickly scanned by smartphones and cameras. They're widely used for sharing links, contact information, Wi-Fi credentials, and more."
          useCases={[
            { title: "Website Links", description: "Create QR codes for websites, social media profiles, or online stores. Print them on business cards, flyers, or product packaging for easy mobile access." },
            { title: "Event Management", description: "Generate QR codes for event tickets, registration confirmations, or venue check-ins. Attendees can simply scan for quick entry." },
            { title: "Marketing Campaigns", description: "Add QR codes to print advertisements, posters, or product labels to bridge offline and online marketing, tracking campaign effectiveness." },
            { title: "Contact Sharing", description: "Create vCard QR codes containing your contact information. Others can scan to instantly save your details to their phone." }
          ]}
          tips={[
            { title: "URL Shortening", description: "Long URLs create dense QR codes that are harder to scan. Use URL shorteners (bit.ly, tinyurl) before generating QR codes for better scannability." },
            { title: "Size Matters", description: "Larger QR codes are easier to scan from a distance. For posters or billboards, use the Extra Large (1024x1024) size option." },
            { title: "Contrast is Key", description: "QR codes work best with high contrast (black on white). Avoid light colors or low contrast backgrounds when printing." },
            { title: "Test Before Printing", description: "Always test your QR code with multiple devices and apps before mass printing to ensure it scans correctly and leads to the right destination." }
          ]}
          faqs={[
            { question: "How much data can a QR code store?", answer: "QR codes can store up to ~4,000 alphanumeric characters. However, more data creates denser, harder-to-scan codes. Keep content concise for best results." },
            { question: "Do QR codes expire?", answer: "The QR code image itself never expires. However, if it contains a URL, that website might change or go offline, making the QR code effectively useless." },
            { question: "Can I customize QR code colors?", answer: "While this tool generates standard black-and-white QR codes, you can edit the downloaded image. Maintain high contrast for reliable scanning." },
            { question: "What can I encode in a QR code?", answer: "Anything text-based: URLs, plain text, phone numbers, email addresses, SMS messages, Wi-Fi credentials, vCard contact info, and more." }
          ]}
        />
      </CalculatorLayout>
  );
};

export default QRCodeGenerator;
