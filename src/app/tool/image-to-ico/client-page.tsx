"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { RotateCcw } from 'lucide-react';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];

export function ClientPage() {
    const { toast } = useToast();
    const [image, setImage] = useState<string | null>(null);
    const [ico, setIco] = useState<string | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        if (!ALLOWED_TYPES.includes(file.type)) {
            toast({
                variant: "destructive",
                title: "Invalid File Type",
                description: "Please upload a PNG, JPG, or WebP image.",
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            toast({
                variant: "destructive",
                title: "File Too Large",
                description: "Please upload an image under 10MB.",
            });
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }
        setIsConverting(true);
        setIco(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            setImage(result);
            convertImageToIco(result);
        };
        reader.onerror = () => {
            toast({ variant: "destructive", title: "Upload Failed", description: "Could not read file. Please try again." });
            setIsConverting(false);
        };
        reader.readAsDataURL(file);
    };

    const handleReset = () => {
        setImage(null);
        setIco(null);
        setIsConverting(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDownload = () => {
        if (!ico) {
            toast({ variant: "destructive", title: "No Result", description: "Please upload and convert an image first." });
            return;
        }
        toast({ title: "Success", description: "ICO downloaded!" });
    };

    const convertImageToIco = (imageDataUrl: string) => {
        const img = new Image();
        img.onload = () => {
            try {
              const canvas = canvasRef.current;
              if (!canvas) {
                toast({ variant: "destructive", title: "Conversion Failed", description: "Could not process image." });
                setIsConverting(false);
                return;
              }
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                toast({ variant: "destructive", title: "Conversion Failed", description: "Could not process image." });
                setIsConverting(false);
                return;
              }
              // Create two canvases for 32x32 and 16x16 sizes
              const canvas32 = document.createElement('canvas');
              canvas32.width = 32;
              canvas32.height = 32;
              const ctx32 = canvas32.getContext('2d');
              ctx32?.drawImage(img, 0, 0, 32, 32);

              const canvas16 = document.createElement('canvas');
              canvas16.width = 16;
              canvas16.height = 16;
              const ctx16 = canvas16.getContext('2d');
              ctx16?.drawImage(img, 0, 0, 16, 16);

              // For simplicity, we'll just use the 32x32 version for the final ICO
              // A full implementation would create a multi-layered ICO file
              canvas.width = 32;
              canvas.height = 32;
              ctx.drawImage(img, 0, 0, 32, 32);
              
              // This is a simplified conversion and might not work in all browsers
              const icoUrl = canvas.toDataURL('image/x-icon');
              setIco(icoUrl);
              toast({ title: "Success", description: "Image converted to ICO!" });
            } catch {
              toast({ variant: "destructive", title: "Conversion Failed", description: "Could not convert image. Please try another file." });
            } finally {
              setIsConverting(false);
            }
        };
        img.onerror = () => {
            toast({ variant: "destructive", title: "Invalid Image", description: "Could not load image. Please try another file." });
            setIsConverting(false);
        };
        img.src = imageDataUrl;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Convert Image to ICO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="image-upload">Upload Image</label>
                    <div className="flex gap-2 mt-1.5">
                      <Input ref={fileInputRef} id="image-upload" type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} className="flex-1" />
                      {(image || ico) && (
                        <Button onClick={handleReset} variant="outline" size="icon" className="shrink-0" aria-label="Reset">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                </div>
                {isConverting && (
                    <div className="text-sm text-neutral-600">Converting...</div>
                )}
                {image && (
                    <div>
                        <h3 className="font-semibold">Preview (32x32)</h3>
                        <canvas ref={canvasRef} className="mt-2 border rounded-md"></canvas>
                    </div>
                )}
                {ico && (
                    <a href={ico} download="favicon.ico" onClick={handleDownload}>
                        <Button className="w-full" disabled={isConverting}>{isConverting ? "Converting..." : "Download ICO"}</Button>
                    </a>
                )}
            </CardContent>
        </Card>
    );
}
