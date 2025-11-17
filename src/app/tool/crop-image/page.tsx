'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { Upload, Download, Crop, ImageDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const CropImage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => setOriginalImage(img);
    } else {
      setOriginalImage(null);
    }
  }, [image]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        setCroppedImageUrl(null);
        toast({ title: "Success", description: "Image uploaded successfully!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!originalImage) {
      toast({ variant: "destructive", title: "Error", description: "Please upload an image first." });
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        toast({ variant: "destructive", title: "Error", description: "Could not process image." });
        return;
    };

    const safeCropArea = {
      x: Math.max(0, cropArea.x),
      y: Math.max(0, cropArea.y),
      width: Math.min(originalImage.width - cropArea.x, cropArea.width),
      height: Math.min(originalImage.height - cropArea.y, cropArea.height),
    }

    if(safeCropArea.width <= 0 || safeCropArea.height <= 0){
      toast({ variant: "destructive", title: "Error", description: "Crop dimensions are invalid or out of bounds." });
      return;
    }
    
    canvas.width = safeCropArea.width;
    canvas.height = safeCropArea.height;
    
    ctx.drawImage(
      originalImage,
      safeCropArea.x,
      safeCropArea.y,
      safeCropArea.width,
      safeCropArea.height,
      0,
      0,
      safeCropArea.width,
      safeCropArea.height
    );

    setCroppedImageUrl(canvas.toDataURL());
    toast({ title: "Success", description: "Image cropped successfully! You can now download it." });
  };

  const handleDownload = () => {
    if (!croppedImageUrl) {
      toast({ variant: "destructive", title: "Error", description: "Please crop the image first." });
      return;
    };
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = croppedImageUrl;
    link.click();
    toast({ title: "Success", description: "Image downloaded!" });
  };

  return (
    <CalculatorLayout
      title="Crop Image"
      description="Upload and crop your images to the perfect size"
      keywords="crop image, image cropper, crop photo, cut image, trim image, image crop tool"
      canonicalUrl="/tool/crop-image"
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
                <Button variant="outline" size="sm" onClick={() => setImage(null)}>
                  Upload New Image
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="x-pos">X Position</Label>
                  <Input
                    id="x-pos"
                    type="number"
                    value={cropArea.x}
                    onChange={(e) => setCropArea({ ...cropArea, x: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="y-pos">Y Position</Label>
                  <Input
                    id="y-pos"
                    type="number"
                    value={cropArea.y}
                    onChange={(e) => setCropArea({ ...cropArea, y: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    type="number"
                    value={cropArea.width}
                    onChange={(e) => setCropArea({ ...cropArea, width: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    type="number"
                    value={cropArea.height}
                    onChange={(e) => setCropArea({ ...cropArea, height: Number(e.target.value) })}
                  />
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
                  <Label>Cropped Preview</Label>
                  <div className="border rounded-lg overflow-hidden flex justify-center items-center bg-muted/30 p-2 min-h-[200px]">
                    {croppedImageUrl ? (
                      <img src={croppedImageUrl} alt="Cropped Preview" className="max-w-full h-auto max-h-[300px]" />
                    ): (
                      <div className="text-muted-foreground text-sm">Crop the image to see a preview</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCrop} className="flex-1">
                  <Crop className="w-4 h-4 mr-2" />
                  Crop Image
                </Button>
                <Button onClick={handleDownload} variant="outline" className="flex-1" disabled={!croppedImageUrl}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Image Crop Tool allows you to precisely crop images by specifying exact pixel coordinates and dimensions. This tool gives you numerical control over the crop area, perfect for achieving pixel-perfect crops for specific design requirements. Simply upload an image, enter your desired crop coordinates (X, Y starting position) and dimensions (width, height), preview the result, and download the cropped image."
        useCases={[
          { title: "Social Media Image Sizing", description: "Crop images to exact dimensions required by different platforms - Instagram posts (1080×1080), Facebook covers (820×312), Twitter headers (1500×500)." },
          { title: "Product Photo Editing", description: "Create consistent product images for e-commerce by cropping all photos to identical dimensions for uniform appearance." },
          { title: "Avatar & Profile Pictures", description: "Crop profile pictures to perfect squares ensuring important features are centered and properly framed." },
          { title: "Web Design Assets", description: "Prepare images for specific website sections by cropping to exact pixel dimensions matching your design specifications." }
        ]}
        tips={[
          { title: "Understanding Coordinates", description: "X coordinate is horizontal pixels from the left edge, Y coordinate is vertical pixels from the top. (0,0) is the top-left corner." },
          { title: "Maintain Aspect Ratios", description: "For common aspect ratios like 16:9, 4:3, or 1:1 (square), calculate width and height accordingly." },
          { title: "Start with High Resolution", description: "Crop from high-resolution source images when possible to ensure the final crop maintains good quality." },
          { title: "Preview Before Download", description: "Always preview your crop to ensure you've captured the desired area before downloading." }
        ]}
        faqs={[
          { question: "What do the X and Y coordinates represent?", answer: "X is the horizontal distance in pixels from the left edge to where your crop starts. Y is the vertical distance in pixels from the top edge. For example, X=100, Y=50 means the crop starts 100 pixels from left and 50 from top." },
          { question: "How do I crop to a specific aspect ratio?", answer: "Calculate width and height to match your desired ratio. For 16:9, try 1600×900. For 1:1 (square), use equal width and height like 1000×1000. For 4:3, try 1600×1200." },
          { question: "Does cropping reduce image quality?", answer: "Cropping itself doesn't reduce quality - it simply removes pixels outside the crop area. However, if you later enlarge a cropped image, quality may suffer. Always crop from the highest quality source available." },
          { question: "What image formats are supported?", answer: "The tool supports common web formats including JPG, PNG, GIF, and WebP. The downloaded image will typically be in PNG format." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default CropImage;
