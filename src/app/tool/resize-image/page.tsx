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
        aboutContent="The Image Resizer tool allows you to change the dimensions of your images to a specific width and height in pixels. In the digital world, image size is critical. Large, high-resolution images are great for print but can drastically slow down websites, take up unnecessary storage space, and be difficult to share via email or social media. This tool provides a simple solution by allowing you to downscale images to the exact dimensions you need. Whether you're a web developer optimizing a site for performance, a blogger preparing images for a post, or just someone needing to resize a photo for a profile picture, this tool makes the process quick and easy. The resizing is done directly in your browser, ensuring your images remain private and are never uploaded to a server."
        useCases={[
          { title: "Web Performance Optimization", description: "Resize large images to the exact dimensions they will be displayed on your website. This reduces file size, which leads to faster page load times, improved user experience, and better SEO rankings." },
          { title: "Social Media and Profile Pictures", description: "Quickly resize your photos to meet the specific dimension requirements for profile pictures, banners, and posts on platforms like Instagram (e.g., 1080x1080 for posts), Facebook, Twitter, and LinkedIn." },
          { title: "Email and Document Attachments", description: "Reduce the dimensions of high-resolution photos before attaching them to emails to avoid exceeding file size limits and ensure faster sending and receiving." },
          { title: "Content Creation", description: "Prepare images for blogs, newsletters, and online articles by resizing them to fit your content layout perfectly, creating a clean and professional look." }
        ]}
        examples={[
          {
            title: "Preparing a Blog Post Image",
            description: "A blogger has a high-resolution photo (4000x3000 pixels) but their blog's content area is only 800 pixels wide.",
            steps: [
              "Upload the 4000x3000 image.",
              "The tool shows the original dimensions. The aspect ratio is 4:3.",
              "To maintain the aspect ratio, if the new width is 800, the new height should be 600 (since 800 / 4 * 3 = 600).",
              "Enter '800' for the New Width and '600' for the New Height.",
              "Click 'Resize Image'.",
              "The preview will show the downsized image, which can then be downloaded and used in the blog post."
            ]
          },
          {
            title: "Creating a Square Profile Picture",
            description: "A user wants to use a rectangular photo (e.g., 1200x800) as a profile picture, which requires a square format.",
            steps: [
              "Upload the rectangular photo.",
              "Decide on the desired square dimensions, for example, 500x500 pixels.",
              "Enter '500' for both New Width and New Height.",
              "Click 'Resize Image'. The preview will show the image squashed into a square.",
              "Note: For best results in this scenario, it's often better to first CROP the image to a square shape and then resize it if necessary. This resizer changes dimensions without regard to aspect ratio."
            ]
          }
        ]}
        tips={[
          { title: "Maintain the Aspect Ratio", description: "To avoid distorting or stretching your image, you should maintain its original aspect ratio. If you change the width, calculate the corresponding new height. Formula: New Height = (Original Height / Original Width) * New Width. This tool requires manual input, so be mindful of this." },
          { title: "Downsizing is Better than Upsizing", description: "Always start with the largest, highest-quality image you have. Making an image smaller (downsizing) usually looks fine. Making an image larger (upsizing) than its original dimensions will cause it to lose quality and appear blurry or pixelated." },
          { title: "Check Website Dimensions", description: "Before resizing for a website, use your browser's developer tools to inspect the image container and find the exact dimensions (width and height) it will be displayed at. Resize your image to match those dimensions for perfect clarity and performance." },
          { title: "Compress After Resizing", description: "Resizing an image reduces its dimensions, which also reduces its file size. However, for maximum optimization, you should also compress the resized image. Use a separate image compression tool after resizing to further reduce the file size without changing dimensions." }
        ]}
        faqs={[
          { question: "Will resizing my image reduce its file size?", answer: "Yes, reducing the dimensions (width and height) of an image will significantly reduce its file size because there are fewer pixels to store. This is one of the primary reasons for resizing images for the web." },
          { question: "What is the difference between resizing and cropping?", answer: "Resizing changes the overall dimensions of the entire image, potentially changing the scale of everything in it. Cropping, on the other hand, cuts out a portion of the image, removing the outer parts to change its frame. You often use both: first crop to frame the subject, then resize to the final dimensions." },
          { question: "What is aspect ratio?", answer: "Aspect ratio is the proportional relationship between an image's width and its height. A common aspect ratio for TVs and monitors is 16:9. A square image has an aspect ratio of 1:1. If you resize an image without maintaining its aspect ratio, it will look stretched or squashed." },
          { question: "Are my uploaded images saved on your server?", answer: "No. The entire resizing process is done directly in your web browser using JavaScript. Your images are never uploaded to our or any other server, ensuring your privacy and security." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ResizeImage;
