"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export function ClientPage() {
    const { toast } = useToast();
    const [image, setImage] = useState<string | null>(null);
    const [ico, setIco] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
                toast({
                    variant: "destructive",
                    title: "Invalid File Type",
                    description: "Please upload a PNG, JPG, or WebP image.",
                });
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
                convertImageToIco(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const convertImageToIco = (imageDataUrl: string) => {
        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
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
                }
            }
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
                    <Input id="image-upload" type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} />
                </div>
                {image && (
                    <div>
                        <h3 className="font-semibold">Preview (32x32)</h3>
                        <canvas ref={canvasRef} className="mt-2 border rounded-md"></canvas>
                    </div>
                )}
                {ico && (
                    <a href={ico} download="favicon.ico">
                        <Button className="w-full">Download ICO</Button>
                    </a>
                )}
            </CardContent>
        </Card>
    );
}
