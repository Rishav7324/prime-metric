'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import { Upload, Download, RefreshCw, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const ConvertImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState("png");
  const [originalFilename, setOriginalFilename] = useState("");
  const [originalFormat, setOriginalFormat] = useState("");
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [convertedImageUrl, setConvertedImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const formats = [
    { value: "png", label: "PNG", mimeType: "image/png" },
    { value: "jpeg", label: "JPEG", mimeType: "image/jpeg" },
    { value: "webp", label: "WebP", mimeType: "image/webp" },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      toast({ variant: "destructive", title: "Invalid File Type", description: "Please upload a valid image file (JPG, PNG, GIF, WebP)." });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({ variant: "destructive", title: "File Too Large", description: "Image must be 10MB or smaller." });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }
    setOriginalFormat(file.type.split('/')[1]?.toUpperCase() || 'N/A');
    setOriginalFilename(file.name.replace(/\.[^/.]+$/, ""));
    setOriginalSize(file.size);
    setConvertedImageUrl(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      toast({ title: "Uploaded", description: `Image uploaded (${formatFileSize(file.size)}).` });
    };
    reader.onerror = () => {
      toast({ variant: "destructive", title: "Upload failed", description: "Failed to read image file." });
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = () => {
    if (!image) {
      toast({ variant: "destructive", title: "No Image", description: "Please upload an image first." });
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        toast({ variant: "destructive", title: "Conversion failed", description: "Could not start conversion." });
        return;
    }

    const img = new Image();
    img.onload = () => {
      try {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        const format = formats.find(f => f.value === outputFormat);
        if (format) {
          const dataUrl = canvas.toDataURL(format.mimeType, outputFormat === "jpeg" ? 0.92 : undefined);
          setConvertedImageUrl(dataUrl);
          toast({ title: "Converted", description: `Image ready to download as ${outputFormat.toUpperCase()}.` });
        }
      } catch {
        toast({ variant: "destructive", title: "Conversion failed", description: "Could not convert this image." });
      }
    };
    img.onerror = () => {
      toast({ variant: "destructive", title: "Conversion failed", description: "Could not load image for conversion." });
    };
    img.src = image;
  };
  
  useEffect(() => {
    if(image){
      handleConvert();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, outputFormat]);


  const handleDownload = () => {
    if (!convertedImageUrl) {
        toast({ variant: "destructive", title: "Not Ready", description: "Please convert the image first." });
        return;
    }

    const link = document.createElement("a");
    link.download = `${originalFilename || "converted"}.${outputFormat}`;
    link.href = convertedImageUrl;
    link.click();
    toast({ title: "Downloaded", description: "Image downloaded." });
  };

  const handleClear = () => {
    setImage(null);
    setConvertedImageUrl(null);
    setOriginalFilename("");
    setOriginalFormat("");
    setOriginalSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast({ title: "Cleared", description: "Image cleared." });
  };

  return (
    <CalculatorLayout
      title="Convert Image"
      description="Convert images between different formats (PNG, JPEG, WebP)"
      keywords="convert image, image converter, png to jpg, jpg to png, webp converter, image format converter"
      canonicalUrl="/tool/convert-image"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 space-y-4">
          {!image ? (
            <div className="space-y-4">
              <Label className="text-sm font-medium" htmlFor="image-upload">Upload Image</Label>
               <div 
                  className="border-2 border-dashed border-neutral-200 rounded-lg p-12 text-center hover:border-[#F2765E]/50 transition-colors cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-10 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium mb-2">Click to upload an image</p>
                  <p className="text-sm text-neutral-600">or drag and drop</p>
                  <p className="text-xs text-neutral-600 mt-2">Supports: JPG, PNG, GIF, WebP • Max 10MB</p>
                </div>
              <input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
             <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <Label className="text-sm font-medium" htmlFor="image-upload">Upload New Image</Label>
                  <Input
                    id="image-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Convert To</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {formats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>


              <div className="space-y-4">
                <Label>Preview</Label>
                {originalSize !== null && (
                  <p className="text-xs text-neutral-500">{originalFilename || "Image"}{originalFormat ? ` • ${originalFormat}` : ""} • {formatFileSize(originalSize)}</p>
                )}
                <div className="border rounded-lg overflow-hidden flex justify-center items-center bg-muted/30 p-4">
                  <img loading="lazy" decoding="async" src={convertedImageUrl || image} alt="Preview" className="max-w-full h-auto max-h-[400px] object-contain" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleConvert} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Convert Image
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1" disabled={!convertedImageUrl}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handleClear} variant="outline" size="icon" className="shrink-0" aria-label="Clear">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Image Format Converter transforms images between popular formats including PNG, JPEG, and WebP. Converting image formats is essential for optimizing web performance, ensuring compatibility, or meeting specific platform requirements. PNG is best for graphics with transparency, JPEG excels for photographs with smaller file sizes, and WebP offers superior compression for modern web applications. This tool makes format conversion simple and fast without quality loss during the conversion process."
        useCases={[
          { title: "Web Optimization", description: "Convert images to WebP format for faster website loading times and reduced bandwidth usage while maintaining visual quality." },
          { title: "Transparency Preservation", description: "Convert images to PNG when you need to preserve transparent backgrounds for logos, icons, or graphics." },
          { title: "File Size Reduction", description: "Convert PNG photos to JPEG format to significantly reduce file sizes for faster uploads and storage savings." },
          { title: "Platform Compatibility", description: "Convert images to formats required by different platforms or content management systems that have specific format requirements." }
        ]}
        tips={[
          { title: "Choose the Right Format", description: "Use PNG for images needing transparency, JPEG for photographs, and WebP for modern web applications where browser support allows." },
          { title: "Consider Quality vs Size", description: "JPEG offers smaller files but lossy compression. PNG is lossless but larger. WebP provides the best of both worlds with superior compression." },
          { title: "Check Browser Support", description: "While WebP offers excellent compression, ensure your target browsers support it. Most modern browsers do, but older versions may need fallbacks." },
          { title: "Preserve Originals", description: "Always keep original high-quality images before converting to lossy formats like JPEG, as you cannot recover quality after conversion." }
        ]}
        faqs={[
          { question: "What's the difference between PNG and JPEG?", answer: "PNG uses lossless compression and supports transparency, making it ideal for graphics, logos, and images needing crisp edges. JPEG uses lossy compression for much smaller file sizes, perfect for photographs where minor quality loss is acceptable." },
          { question: "What is WebP and should I use it?", answer: "WebP is a modern image format developed by Google that provides superior compression (25-35% smaller files) compared to PNG and JPEG while maintaining quality. Use it for web applications where modern browser support is available." },
          { question: "Will I lose quality when converting formats?", answer: "Converting from a lossless format (like PNG) to a lossy one (like JPEG or WebP) involves compression that can reduce quality. Converting from JPEG to PNG won't improve its quality. The tool aims to preserve as much quality as possible." },
          { question: "Which format is best for web use?", answer: "For modern websites, WebP offers the best compression and quality balance. For wider compatibility, use JPEG for photos and PNG for graphics with transparency. Consider providing multiple formats with fallbacks for optimal performance." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ConvertImage;

    