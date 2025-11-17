'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { Upload, Download, Minimize2 } from "lucide-react";
import CalculatorContentSection from "@/components/CalculatorContentSection";
import { useToast } from "@/hooks/use-toast";

const CompressImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [originalFilename, setOriginalFilename] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalSize(file.size);
      setOriginalFilename(file.name.replace(/\.[^/.]+$/, ""));
      setCompressedSize(0);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        toast({ title: "Success", description: "Image uploaded successfully!" });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCompress = () => {
    if (!image || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            toast({ title: "Success", description: "Image compressed successfully!" });
          } else {
             toast({ variant: "destructive", title: "Error", description: "Failed to compress image." });
          }
        },
        "image/jpeg",
        quality[0] / 100
      );
    };
    img.onerror = () => {
       toast({ variant: "destructive", title: "Error", description: "Could not load image for compression." });
    };
    img.src = image;
  };
  
  useEffect(() => {
    if(image){
      handleCompress();
    }
  }, [image, quality]);


  const handleDownload = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const link = document.createElement("a");
          link.download = `${originalFilename}-compressed-q${quality[0]}.jpg`;
          link.href = URL.createObjectURL(blob);
          link.click();
          toast({ title: "Success", description: "Image downloaded!" });
        }
      },
      "image/jpeg",
      quality[0] / 100
    );
  };

  const compressionRatio = originalSize && compressedSize
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : 0;

  return (
    <CalculatorLayout
      title="Compress Image"
      description="Reduce image file size while maintaining quality"
      keywords="compress image, reduce image size, image compression, optimize images, compress jpg, compress png"
      canonicalUrl="/tool/compress-image"
    >
      <div className="max-w-4xl mx-auto">

        <Card className="p-6 space-y-6">
          {!image && (
            <div className="space-y-4">
              <Label>Upload Image</Label>
               <div 
                  className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium mb-2">Click to upload an image</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports: JPG, PNG, WebP</p>
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
                  <div className="flex justify-between items-center">
                    <Label>Quality: {quality[0]}%</Label>
                     <Button variant="outline" size="sm" onClick={() => {
                        setImage(null);
                        setOriginalSize(0);
                        setCompressedSize(0);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                     }}>
                      Upload New Image
                    </Button>
                  </div>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={1}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Original</div>
                      <div className="font-bold">{formatFileSize(originalSize)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Compressed</div>
                      <div className="font-bold text-primary">{formatFileSize(compressedSize)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">Saved</div>
                      <div className="font-bold text-green-500">{compressionRatio}%</div>
                    </div>
                  </div>
              </div>

              <div className="space-y-4">
                <Label>Preview</Label>
                <div className="border rounded-lg overflow-hidden flex justify-center items-center bg-muted/30">
                  <canvas ref={canvasRef} className="max-w-full h-auto" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCompress} className="flex-1">
                  <Minimize2 className="w-4 h-4 mr-2" />
                  Compress Image
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1" disabled={!compressedSize}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Image Compression Tool reduces image file sizes while maintaining visual quality by adjusting compression levels. Large image files slow down websites, consume storage space, and increase bandwidth costs. This tool lets you control the quality-to-size ratio by selecting compression levels from 1-100%, allowing you to find the perfect balance between file size reduction and image quality. Compressed images load faster, improve SEO, enhance user experience, and reduce hosting costs without visible quality loss when optimized properly."
        useCases={[
          { title: "Website Performance", description: "Compress images before uploading to websites to dramatically improve page load speeds, boost SEO rankings, and enhance user experience." },
          { title: "Email Attachments", description: "Reduce image file sizes to meet email attachment limits while maintaining sufficient quality for recipients to view clearly." },
          { title: "Social Media Uploads", description: "Compress images before posting to social platforms to speed up uploads and ensure faster loading for followers viewing your content." },
          { title: "Mobile App Optimization", description: "Reduce app bundle sizes by compressing image assets, resulting in faster downloads and better performance on mobile devices." }
        ]}
        tips={[
          { title: "Quality Sweet Spot", description: "For most photographs, 70-85% quality provides excellent visual results with significant file size reduction. Very high quality (90-100%) offers minimal visual improvement but much larger files." },
          { title: "Test Before Deploying", description: "Always preview compressed images at actual viewing size before using them in production. What looks acceptable zoomed out may show artifacts when viewed normally." },
          { title: "Compress Before Resizing", description: "For best results, resize images to their final display dimensions first, then compress. Compressing large images then resizing wastes processing and may reduce quality unnecessarily." },
          { title: "Keep Originals", description: "Always maintain original, uncompressed versions of important images. Repeated compression degrades quality, so compress from originals each time rather than recompressing already compressed images to avoid cumulative quality loss." }
        ]}
        faqs={[
          { question: "How much can I compress without visible quality loss?", answer: "For photographs, 70-85% quality typically provides excellent results with 50-70% file size reduction. For graphics and images with text, use 85-90% quality to maintain sharpness. The optimal setting depends on image content and viewing context." },
          { question: "What's the difference between compression and resizing?", answer: "Compression reduces file size by removing image data while keeping pixel dimensions the same. Resizing changes the actual width and height by removing pixels. Both reduce file size, but serve different purposes - use resizing for dimensions, compression for file size." },
          { question: "Can I compress images multiple times?", answer: "While possible, it's not recommended. Each compression pass degrades quality further, especially with lossy formats like JPEG. Always compress from original, high-quality sources rather than recompressing already compressed images to avoid cumulative quality loss." },
          { question: "Does compression work on all image formats?", answer: "This tool works best with JPEG images where quality adjustments are most effective. PNG compression is lossless and typically doesn't offer adjustable quality levels. For PNGs, consider converting to JPEG if transparency isn't needed, or use PNG optimization tools instead." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CompressImage;
