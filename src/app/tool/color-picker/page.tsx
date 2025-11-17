'use client';
import CalculatorLayout from "@/components/CalculatorLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useRef, useEffect } from "react";
import { Upload, Copy, Pipette, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CalculatorContentSection from "@/components/CalculatorContentSection";

const ColorPicker = () => {
  const [image, setImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
  const [hslColor, setHslColor] = useState({ h: 0, s: 0, l: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({ variant: "destructive", title: "Error", description: "Please upload a valid image file" });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        toast({ title: "Success", description: "Image uploaded successfully!"});
      };
      reader.onerror = () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to read image file" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImage(null);
    setSelectedColor("#000000");
    setRgbColor({ r: 0, g: 0, b: 0 });
    setHslColor({ h: 0, s: 0, l: 0 });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast({ title: "Success", description: "Image cleared"});
  };

  useEffect(() => {
    if (image && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      const loadImage = () => {
        // Set max dimensions to prevent performance issues
        const maxWidth = 1200;
        const maxHeight = 800;
        
        let width = img.naturalWidth;
        let height = img.naturalHeight;
        
        // Scale down if necessary
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
      };

      if (img.complete) {
        loadImage();
      } else {
        img.onload = loadImage;
      }
    }
  }, [image]);

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    
    // Calculate exact pixel coordinates accounting for scaling
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    // Make sure coordinates are within bounds
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
      return;
    }

    try {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];

      setRgbColor({ r, g, b });
      
      // Format hex color properly (ensure 6 digits)
      const hex = '#' + [r, g, b].map(val => {
        const hexVal = val.toString(16);
        return hexVal.length === 1 ? '0' + hexVal : hexVal;
      }).join('');
      
      setSelectedColor(hex);
      setHslColor(rgbToHsl(r, g, b));
      toast({ title: "Success", description: "Color picked!"});
    } catch (error) {
      console.error("Error picking color:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to pick color" });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Success", description: `${label} copied to clipboard!`});
  };

  return (
    <CalculatorLayout
      title="Color Picker"
      description="Pick colors from images and get HEX, RGB, and HSL values"
      keywords="color picker, image color picker, hex color picker, rgb color picker, color code generator"
      canonicalUrl="/tool/color-picker"
    >
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 space-y-6">
            {!image ? (
              <div className="space-y-4">
                <Label htmlFor="image-upload">Upload Image</Label>
                <div 
                  className="border-2 border-dashed border-primary/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer bg-muted/20"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium mb-2">Click to upload an image</p>
                  <p className="text-sm text-muted-foreground">or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-2">Supports: JPG, PNG, GIF, WebP</p>
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
              <div className="flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={handleClearImage}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Image
                </Button>
              </div>
            )}

          {image && (
            <>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <Pipette className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Click anywhere on the image to pick a color</span>
                </div>
                
                <div className="border-2 border-border rounded-lg overflow-hidden bg-muted/30 shadow-lg">
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      onClick={handleCanvasClick}
                      className="max-w-full h-auto cursor-crosshair hover:opacity-95 transition-opacity"
                      style={{ display: 'block' }}
                    />
                    <img
                      ref={imageRef}
                      src={image}
                      alt="Color picker source"
                      className="hidden"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Picked Color</h3>
                <div className="glass-card p-6 rounded-lg space-y-4">
                  <div className="flex items-center gap-6">
                    <div
                      className="w-32 h-32 rounded-lg border-4 border-border shadow-glow flex-shrink-0"
                      style={{ backgroundColor: selectedColor }}
                      aria-label={`Color preview: ${selectedColor}`}
                    />
                    <div className="flex-1 grid gap-3">
                      <div className="flex items-center justify-between gap-2 p-3 bg-background/50 rounded-lg">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">HEX</div>
                          <div className="font-mono font-bold text-lg">{selectedColor.toUpperCase()}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(selectedColor.toUpperCase(), "HEX")}
                          aria-label="Copy HEX color"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 p-3 bg-background/50 rounded-lg">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">RGB</div>
                          <div className="font-mono font-bold">
                            rgb({rgbColor.r}, {rgbColor.g}, {rgbColor.b})
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(`rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`, "RGB")}
                          aria-label="Copy RGB color"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2 p-3 bg-background/50 rounded-lg">
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">HSL</div>
                          <div className="font-mono font-bold">
                            hsl({hslColor.h}, {hslColor.s}%, {hslColor.l}%)
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(`hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`, "HSL")}
                          aria-label="Copy HSL color"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      <CalculatorContentSection
        aboutContent="The Color Picker tool allows you to extract exact color values from any uploaded image by clicking on any pixel. It displays the color in three common formats: HEX (hexadecimal), RGB (red-green-blue), and HSL (hue-saturation-lightness). This tool is invaluable for designers, developers, and digital artists who need to match colors precisely, create color palettes from photographs, or identify exact color codes for branding and design projects. Simply upload an image, click anywhere on it, and instantly get the color values ready to copy and use in your projects."
        useCases={[
          { title: "Brand Color Extraction", description: "Extract exact brand colors from logos, marketing materials, or competitor websites to ensure brand consistency across all design projects." },
          { title: "Web Design & Development", description: "Pick colors from design mockups or reference images to use in CSS, ensuring pixel-perfect color matching in your web projects." },
          { title: "Photo Color Palettes", description: "Create color schemes inspired by photographs - extract complementary colors from nature photos, artwork, or inspiring images for design projects." },
          { title: "UI Design Matching", description: "Match interface colors from screenshots or reference apps to ensure design consistency or recreate specific color schemes in your own projects." }
        ]}
        tips={[
          { title: "Understanding Color Formats", description: "HEX is most common for web design (#FF5733), RGB is intuitive for digital work (rgb(255, 87, 51)), and HSL is best for color adjustments (hsl(9, 100%, 60%)). Choose the format that fits your workflow." },
          { title: "Zoom for Precision", description: "For precise color selection from small details, consider enlarging the image before uploading or clicking carefully on the exact pixel you want to sample." },
          { title: "Multiple Color Extraction", description: "Need several colors from one image? Take notes of each color you pick or keep the tool open to extract multiple colors systematically for complete palettes." },
          { title: "Color Variations", description: "Colors on screen vary based on monitor calibration and display settings. For print projects, verify colors look correct across multiple displays before finalizing." }
        ]}
        faqs={[
          { question: "What's the difference between HEX, RGB, and HSL?", answer: "HEX is a 6-character code (#RRGGBB) commonly used in web design. RGB specifies Red, Green, Blue values from 0-255. HSL represents Hue (0-360°), Saturation (0-100%), and Lightness (0-100%), which is more intuitive for color adjustments. All three represent the same color, just in different formats." },
          { question: "Why do colors look different on different screens?", answer: "Monitor calibration, display technology (IPS, OLED, LCD), brightness settings, and color profiles all affect how colors appear. For professional work requiring exact color matching, use a calibrated monitor and consider testing on multiple displays." },
          { question: "Can I use this tool for print design?", answer: "While you can extract colors, note that screens use RGB color space while printing uses CMYK. RGB colors may not translate exactly to print. For print projects, convert extracted RGB values to CMYK using design software." },
          { question: "How accurate are the extracted colors?", answer: "The tool extracts pixel-perfect color values from your uploaded image. However, if your image has been compressed or processed, colors may differ from the original source. Use high-quality, uncompressed images for most accurate results." }
        ]}
      />
    </CalculatorLayout>
  );
};

export default ColorPicker;
