'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { QrCode, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState("256");
  const [qrCode, setQrCode] = useState("");
  const { toast } = useToast();

  const generateQR = () => {
    if (!text.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter text or URL",
      });
      return;
    }

    // Simple QR code generation using a public API
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    setQrCode(apiUrl);
    toast({ title: "Success", description: "QR code generated!" });
  };

  const downloadQR = () => {
    if (!qrCode) return;
    
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCode;
    link.target = "_blank"; // To allow download of cross-origin URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({ title: "Success", description: "QR code downloaded!" });
  };

  return (
      <CalculatorLayout
        title="QR Code Generator"
        description="Generate QR codes for URLs, text, and more"
        keywords="qr code generator, create qr code, qr code maker, generate qr code, free qr code, qr code creator"
        canonicalUrl="/tool/qr-code"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6 space-y-4">
            <div>
              <Label htmlFor="text">Text or URL</Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text, URL, or any data..."
                className="min-h-[100px]"
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

            <Button onClick={generateQR} className="w-full gradient-button">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </Card>

          {qrCode && (
            <Card className="p-6 space-y-4">
              <Label>Generated QR Code</Label>
              <div className="flex justify-center p-8 bg-white rounded-lg">
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
