'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef, useEffect } from "react";
import { Upload, Download, RefreshCw, Copy, RotateCcw } from "lucide-react";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const CompressImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [targetSize, setTargetSize] = useState("500");
  const [targetUnit, setTargetUnit] = useState("KB");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [originalFilename, setOriginalFilename] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedImageBlob, setCompressedImageBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!compressedImageBlob) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(compressedImageBlob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [compressedImageBlob]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ variant: "destructive", title: "Invalid File Type", description: "Please upload a JPG, PNG, or WebP image." });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast({ variant: "destructive", title: "File Too Large", description: "Please upload an image under 20MB." });
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setOriginalSize(file.size);
    setOriginalFilename(file.name.replace(/\.[^/.]+$/, ""));
    setCompressedSize(0);
    setCompressedImageBlob(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      toast({ title: "Success", description: "Image uploaded successfully!" });
    };
    reader.readAsDataURL(file);
  };

  const getCanvasBlob = (canvas: HTMLCanvasElement, quality: number): Promise<Blob | null> => {
    return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob), "image/jpeg", quality);
    });
  }

  const handleCompress = async () => {
    if (!image) {
      toast({ variant: "destructive", title: "No Image", description: "Please upload an image first." });
      return;
    }
    const target = parseFloat(targetSize);
    if (isNaN(target) || target <= 0) {
      toast({ variant: "destructive", title: "Invalid Target Size", description: "Enter a positive target size." });
      return;
    }

    setIsCompressing(true);
    toast({ title: "Compressing...", description: "Finding the best quality for your target size." });

    const targetBytes = target * (targetUnit === "KB" ? 1024 : 1024 * 1024);
    
    const img = new Image();
    img.src = image;
    img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            toast({ variant: "destructive", title: "Error", description: "Could not process image." });
            setIsCompressing(false);
            return;
          }
          ctx.drawImage(img, 0, 0);

          let bestBlob: Blob | null = null;
          let low = 0;
          let high = 1;

          // Binary search for the best quality that is under the target size
          for(let i=0; i<10; i++) { // 10 iterations are enough for good precision
              const mid = (low + high) / 2;
              const blob = await getCanvasBlob(canvas, mid);
              if (blob && blob.size <= targetBytes) {
                  bestBlob = blob;
                  low = mid; // Try for higher quality
              } else {
                  high = mid; // Quality is too high, reduce it
              }
          }
          
          if (bestBlob) {
              setCompressedSize(bestBlob.size);
              setCompressedImageBlob(bestBlob);
              toast({ title: "Success", description: `Image compressed to ~${formatFileSize(bestBlob.size)}` });
          } else {
              toast({ variant: "destructive", title: "Error", description: "Could not compress image to the target size. Try a larger size." });
          }
        } catch {
          toast({ variant: "destructive", title: "Error", description: "Failed to compress image. Please try again." });
        } finally {
          setIsCompressing(false);
        }
    };
    img.onerror = () => {
      toast({ variant: "destructive", title: "Error", description: "Could not load image. Please try another file." });
      setIsCompressing(false);
    };
  };
  
  const handleDownload = () => {
    if (!compressedImageBlob) {
      toast({ variant: "destructive", title: "No Result", description: "Please compress the image first." });
      return;
    }
    const link = document.createElement("a");
    link.download = `${originalFilename || "image"}-compressed.jpg`;
    const url = URL.createObjectURL(compressedImageBlob);
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast({ title: "Success", description: "Image downloaded!" });
  };

  const handleReset = () => {
    setImage(null);
    setOriginalSize(0);
    setCompressedSize(0);
    setCompressedImageBlob(null);
    setTargetSize("500");
    setTargetUnit("KB");
    setOriginalFilename("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const copySummary = async () => {
    if (!originalSize || !compressedSize) return;
    const text = `Original: ${formatFileSize(originalSize)}, Compressed: ${formatFileSize(compressedSize)}, Saved: ${compressionRatio}%. — via PrimeMetric`;
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied", description: "Result copied to clipboard." });
    } catch {
      toast({ variant: "destructive", title: "Copy failed", description: "Clipboard not available." });
    }
  };

  const compressionRatio = originalSize && compressedSize
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : 0;

  return (
    <CalculatorLayout
      title="Compress Image"
      description="Reduce image file size by targeting a specific size."
      keywords="compress image, reduce image size, image compression, optimize images, compress jpg, compress png"
      canonicalUrl="/tool/compress-image"
    >
      <div className="max-w-4xl mx-auto">

        <Card className="p-6 space-y-4">
          {!image && (
            <div className="space-y-4">
              <Label>Upload Image</Label>
               <div 
                  className="border-2 border-dashed border-neutral-200 rounded-lg p-12 text-center hover:border-[#F2765E]/50 transition-colors cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-10 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium mb-2">Click to upload an image</p>
                  <p className="text-sm text-neutral-600">or drag and drop</p>
                  <p className="text-xs text-neutral-600 mt-2">Supports: JPG, PNG, WebP</p>
                </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          )}

          {image && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                   <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-3.5 w-3.5 mr-1" />
                       Upload New Image
                     </Button>
                      {compressedImageBlob && (
                        <Button variant="outline" size="sm" onClick={copySummary}>
                          <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                        </Button>
                      )}
                    </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <Label>Target Size</Label>
                       <div className="flex gap-2">
                         <Input type="number" value={targetSize} onChange={e => setTargetSize(e.target.value)} />
                         <Select value={targetUnit} onValueChange={setTargetUnit}>
                           <SelectTrigger className="w-[80px]">
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="KB">KB</SelectItem>
                             <SelectItem value="MB">MB</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-neutral-600 mb-1">Original</div>
                      <div className="font-bold">{formatFileSize(originalSize)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-neutral-600 mb-1">Compressed</div>
                      <div className="font-bold text-primary">{formatFileSize(compressedSize)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-neutral-600 mb-1">Saved</div>
                      <div className="font-bold text-green-500">{compressionRatio}%</div>
                    </div>
                  </div>
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="border rounded-lg overflow-hidden flex justify-center items-center bg-muted/30">
                  {previewUrl ? (
                    <img src={previewUrl} className="max-w-full h-auto" alt="Compressed preview" />
                  ) : (
                    <img src={image} className="max-w-full h-auto" alt="Original preview" />
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCompress} className="flex-1" disabled={isCompressing}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${isCompressing ? 'animate-spin' : ''}`} />
                  {isCompressing ? "Compressing..." : "Compress to Target Size"}
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1" disabled={!compressedImageBlob}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Image Compression Tool reduces image file sizes by intelligently adjusting the quality to meet a specific target file size in kilobytes (KB) or megabytes (MB). Large image files slow down websites, consume storage space, and increase bandwidth costs. This tool lets you achieve a predictable file size, which is perfect for web performance optimization, meeting upload limits, or managing storage. Compressed images load faster, improve SEO, and enhance user experience."
        useCases={[
          { title: "Website Performance", description: "Compress images to a specific size (e.g., under 100KB) to dramatically improve page load speeds and boost SEO rankings." },
          { title: "Meeting Upload Limits", description: "Reduce image file sizes to meet the requirements of email attachments, online forms, or content management systems." },
          { title: "Social Media Uploads", description: "Compress images before posting to social platforms to speed up uploads and ensure faster loading for followers." },
          { title: "Mobile App Optimization", description: "Reduce app bundle sizes by compressing image assets to a specific target, resulting in faster downloads and better performance." }
        ]}
        tips={[
          { title: "Be Realistic", description: "You cannot compress a 10MB photo to 10KB without extreme quality loss. Set a reasonable target size based on the image dimensions and content." },
          { title: "Test Before Deploying", description: "Always preview compressed images to ensure the quality is acceptable for your needs before using them in a live environment." },
          { title: "Resize First", description: "For best results, resize your image to its final display dimensions *before* using this tool to compress it to a target size." },
          { title: "Keep Originals", description: "Always maintain the original, high-quality version of your images. Compression is a lossy process, and quality cannot be recovered." }
        ]}
        faqs={[
          { question: "How does it find the right quality for the target size?", answer: "The tool uses a binary search algorithm. It quickly tests different quality levels to find the highest possible quality that results in a file size at or just below your target." },
          { question: "Why can't it hit my target size exactly?", answer: "JPEG compression is complex, and the final size can vary. The tool aims to get as close as possible without exceeding your target. The result will be very close to what you specified." },
          { question: "What if it can't reach my target size?", answer: "If your target size is too small for the image dimensions (e.g., trying to compress a large photo to 1KB), the tool may not be able to achieve it. In this case, it will produce the smallest possible file, and you may need to resize the image first." },
          { question: "Does this work for all image types?", answer: "This target-size compression works by converting the image to JPEG, which is ideal for photographs. If you upload a PNG with transparency, the transparency will be lost." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CompressImage;
