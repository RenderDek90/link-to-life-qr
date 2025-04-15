
import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import ColorPicker from "./ColorPicker";
import { defaultColors, downloadQRCode, formatTextAsUrl } from "@/utils/qrUtils";
import { Link, Download, Clipboard, Check } from "lucide-react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrType, setQrType] = useState("url");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleDownload = () => {
    if (!text.trim()) {
      toast({
        title: "No content to generate QR code",
        description: "Please enter some text or URL first.",
        variant: "destructive",
      });
      return;
    }

    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/png");
        downloadQRCode(dataUrl, "qrcode");
        
        toast({
          title: "QR Code Downloaded",
          description: "Your QR code has been downloaded successfully.",
        });
      }
    }
  };

  const copyToClipboard = () => {
    if (!text.trim()) {
      toast({
        title: "Nothing to copy",
        description: "Please enter some text or URL first.",
        variant: "destructive",
      });
      return;
    }
    
    navigator.clipboard.writeText(formatTextAsUrl(text)).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "The text has been copied to your clipboard.",
      });
    });
  };

  const getQrValue = () => {
    if (!text.trim()) return " "; // Empty space to prevent QR code error
    
    // Format as URL if in URL mode, otherwise use as is
    return qrType === "url" ? formatTextAsUrl(text) : text;
  };

  return (
    <Card className="w-full max-w-md shadow-lg border-none bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent pb-2">
          QR Code Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="url" onValueChange={setQrType}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="url">Enter URL</Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  placeholder="https://example.com"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={copyToClipboard}
                  disabled={!text.trim()}
                >
                  {copied ? <Check size={16} /> : <Clipboard size={16} />}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="text">Enter Text</Label>
              <Textarea
                id="text"
                placeholder="Your message here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>QR Code Size</Label>
            <Slider
              defaultValue={[qrSize]}
              min={100}
              max={300}
              step={10}
              onValueChange={(value) => setQrSize(value[0])}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <Label>QR Code Color</Label>
            <ColorPicker
              colors={defaultColors}
              selectedColor={fgColor}
              onChange={setFgColor}
            />
          </div>

          <div className="flex justify-center mt-6" ref={qrRef}>
            <QRCodeCanvas
              value={getQrValue()}
              size={qrSize}
              fgColor={fgColor}
              level="M"
              includeMargin
              className="rounded-md"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
          onClick={handleDownload}
          disabled={!text.trim()}
          className="gradient-btn flex-1"
        >
          <Download size={16} className="mr-2" />
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
