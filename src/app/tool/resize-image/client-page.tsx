'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Upload, Download, Maximize } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const ResizeImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            setOriginalImage(img);
            setWidth(img.width);
            setHeight(img.height);
        };
        img.src = event.target?.result as string;
        setImage(event.target?.result as string);
        setResizedImageUrl(null);
        toast({ title: "Success", description: "Image uploaded successfully!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResize = () => {
    if (!originalImage) {
      toast({ variant: "destructive", title: "Error", description: "Please upload an image first." });
      return;
    }
    
    if (width <= 0 || height <= 0) {
        toast({ variant: "destructive", title: "Error", description: "Width and height must be positive numbers." });
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        toast({ variant: "destructive", title: "Error", description: "Could not process image." });
        return;
    };
    
    ctx.drawImage(originalImage, 0, 0, width, height);

    setResizedImageUrl(canvas.toDataURL());
    toast({ title: "Success", description: "Image resized successfully! You can now download it." });
  };

  const handleDownload = () => {
    if (!resizedImageUrl) {
      toast({ variant: "destructive", title: "Error", description: "Please resize the image first." });
      return;
    };
    const link = document.createElement("a");
    link.download = "resized-image.png";
    link.href = resizedImageUrl;
    link.click();
    toast({ title: "Success", description: "Image downloaded!" });
  };

  return (
    <CalculatorLayout
      title="Image Resizer"
      description="Resize images to specific dimensions."
      canonicalUrl="/tool/resize-image"
    >
      <div className="max-w-4xl mx-auto">
        <Card className="p-6 space-y-6">
          {!image ? (
            <div className="space-y-4">
               <Label>Upload Image</Label>
               <div 
                  className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium mb-2">Click to upload an image</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
             <>
              <div className="space-y-2">
                <Button variant="outline" size="sm" onClick={() => setImage(null)}>Upload New Image</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="width">New Width (px)</Label>
                  <Input id="width" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">New Height (px)</Label>
                  <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Original</Label>
                  <div className="border rounded-lg overflow-hidden flex justify-center items-center bg-muted/30 p-2 min-h-[200px]">
                    <img src={image} alt="Original Preview" className="max-w-full h-auto max-h-[300px]" />
                  </div>
                </div>
                <div className="space-y-4">
                  <Label>Resized Preview</Label>
                  <div className="border rounded-lg overflow-hidden flex justify-center items-center bg-muted/30 p-2 min-h-[200px]">
                    {resizedImageUrl ? (
                      <img src={resizedImageUrl} alt="Resized Preview" className="max-w-full h-auto max-h-[300px]" />
                    ): (
                      <div className="text-muted-foreground text-sm">Resize the image to see a preview</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleResize} className="flex-1 gradient-button">
                  <Maximize className="w-4 h-4 mr-2" />
                  Resize Image
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1" disabled={!resizedImageUrl}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

       <CalculatorContentSection
        aboutContent="The Image Resizer tool allows you to change the dimensions of your images to specific width and height in pixels. This is useful for fitting images into website layouts, preparing them for social media, or reducing their size for emails and documents."
        useCases={[
          { title: "Social Media Posts", description: "Resize images to the optimal dimensions for platforms like Instagram, Facebook, and Twitter." },
          { title: "Website Banners", description: "Create banners and hero images with the exact pixel dimensions required by your website's design." },
          { title: "Email Newsletters", description: "Reduce image dimensions to keep email file sizes small and improve loading times for your subscribers." },
          { title: "Profile Pictures", description: "Resize your photo to fit the square or circular avatar requirements of various online platforms." }
        ]}
        tips={[
          { title: "Maintain Aspect Ratio", description: "To avoid distorting your image, calculate the new height or width proportionally if you change one of them. (e.g., if you halve the width, also halve the height)." },
          { title: "Start with High Resolution", description: "It's always better to downsize a large, high-resolution image than to upsize a small one. Upsizing can result in a blurry or pixelated image." },
          { title: "Consider Compression", description: "After resizing, you may also want to compress the image to further reduce its file size. Use an image compression tool for this." }
        ]}
        faqs={[
          { question: "Will resizing my image reduce its quality?", answer: "Downsizing (making the image smaller) generally preserves quality well. Upsizing (making it larger) will almost always result in a loss of quality, making the image look blurry or pixelated." },
          { question: "What are pixels?", answer: "Pixels are the tiny dots that make up a digital image. The width and height in pixels determine the image's dimensions." },
          { question: "What is aspect ratio?", answer: "Aspect ratio is the proportional relationship between an image's width and its height. For example, a 1920x1080 image and a 1280x720 image both have a 16:9 aspect ratio." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ResizeImage;
