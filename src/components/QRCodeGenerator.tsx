
import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ColorPicker from "./ColorPicker";
import { defaultColors, downloadQRCode, formatTextAsUrl } from "@/utils/qrUtils";
import { ContactInfo, ErrorCorrectionLevel, generateVCard, errorLevelDescriptions, qrFrameStyles } from "@/utils/qrTypes";
import { Link, Download, Clipboard, Check, Contact, Share2 } from "lucide-react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrType, setQrType] = useState("url");
  const [qrSize, setQrSize] = useState(200);
  const [fgColor, setFgColor] = useState("#000000");
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>("M");
  const [frameStyle, setFrameStyle] = useState("none");
  const [contact, setContact] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
    organization: "",
    url: ""
  });
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
    if (!text.trim() && qrType !== "contact") return " ";
    
    switch (qrType) {
      case "url":
        return formatTextAsUrl(text);
      case "contact":
        return generateVCard(contact);
      default:
        return text;
    }
  };

  const handleShare = async () => {
    if (!text.trim() && qrType !== "contact") {
      toast({
        title: "Nothing to share",
        description: "Please enter some content first.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: "QR Code Content",
          text: getQrValue(),
        });
        toast({
          title: "Shared successfully",
          description: "The content has been shared.",
        });
      } else {
        throw new Error("Share not supported");
      }
    } catch (error) {
      copyToClipboard();
    }
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
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

          <TabsContent value="contact" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1234567890"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  placeholder="Company Name"
                  value={contact.organization}
                  onChange={(e) => setContact({ ...contact, organization: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://example.com"
                  value={contact.url}
                  onChange={(e) => setContact({ ...contact, url: e.target.value })}
                />
              </div>
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
            <Label>Error Correction</Label>
            <Select value={errorLevel} onValueChange={(value: ErrorCorrectionLevel) => setErrorLevel(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select error correction level" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(errorLevelDescriptions).map(([level, description]) => (
                  <SelectItem key={level} value={level}>
                    {description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Frame Style</Label>
            <Select value={frameStyle} onValueChange={setFrameStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select frame style" />
              </SelectTrigger>
              <SelectContent>
                {qrFrameStyles.map(style => (
                  <SelectItem key={style.id} value={style.id}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>QR Code Color</Label>
            <ColorPicker
              colors={defaultColors}
              selectedColor={fgColor}
              onChange={setFgColor}
            />
          </div>

          <div className={cn(
            "flex justify-center mt-6 p-4",
            frameStyle === 'dots' && "bg-dot-pattern rounded-lg",
            frameStyle === 'square' && "border-2 border-gray-200",
            frameStyle === 'rounded' && "bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl shadow-inner"
          )} ref={qrRef}>
            <QRCodeCanvas
              value={getQrValue()}
              size={qrSize}
              fgColor={fgColor}
              level={errorLevel}
              includeMargin
              className="rounded-md"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button 
          onClick={handleDownload}
          disabled={!text.trim() && qrType !== "contact"}
          className="gradient-btn flex-1"
        >
          <Download size={16} className="mr-2" />
          Download
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          disabled={!text.trim() && qrType !== "contact"}
        >
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QRCodeGenerator;
